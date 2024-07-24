import { Request, Response } from "express";
import myDataSource from "../config/db.config";
import { Article } from "../entity/article.entity";
import { plainToClass } from "class-transformer";
import { CreateArticleDto } from "../validation/dto/create-article.dto";
import { isUUID, validate } from "class-validator";
import { formatValidationErrors } from "../utility/validation.utility";
import { UpdateArticleDto } from "../validation/dto/update-article.dto";
import slugify from "slugify";
import { ArticlePublish, Status } from "../entity/article-publish.entity";
import { Likes } from "../entity/article-like.entity";
import { UpdateArticleStatusDTO } from "../validation/dto/update-article-status.dto";

// * Get all articles
export const Articles = async (req: Request, res: Response) => {
    const articleRepository = myDataSource.getRepository(Article);
    const articles = await articleRepository.find({ order: { dibuat_pada: "DESC" } });
    res.send(articles);
};

// * Get all articles publish only
export const ArticlesPublish = async (req: Request, res: Response) => {
    const articleRepository = myDataSource.getRepository(Article);

    const articles = await articleRepository
        .createQueryBuilder("article")
        .leftJoinAndSelect("article.status_publish", "status_publish")
        .where("status_publish.status = :status", { status: "Diterbitkan" })
        .orderBy("DESC")
        .getMany();

    res.send(articles);
};

// * Get all articles pending only
export const ArticlesPending = async (req: Request, res: Response) => {
    const articleRepository = myDataSource.getRepository(Article);

    const articles = await articleRepository
        .createQueryBuilder("article")
        .leftJoinAndSelect("article.status_publish", "status_publish")
        .where("status_publish.status = :status", { status: "Pending" })
        .orderBy("DESC")
        .getMany();

    res.send(articles);
};

// * Create Article
const generateUniqueSlug = async (title: string, articleRepository: any) => {
    let slug = slugify(title, {
        lower: true,
        strict: true,
        trim: true,
    });

    let uniqueSlug = slug;
    let count = 1;

    while (await articleRepository.findOne({ where: { slug: uniqueSlug } })) {
        uniqueSlug = `${slug}-${count}`;
        count++;
    }

    return uniqueSlug;
};

export const CreateArticle = async (req: Request, res: Response) => {
    const body = req.body;
    const input = plainToClass(CreateArticleDto, body);
    const validationErrors = await validate(input);

    if (validationErrors.length > 0) {
        return res.status(400).json(formatValidationErrors(validationErrors));
    }

    const articleRepository = myDataSource.getRepository(Article);

    const articlePublishRepository = myDataSource.getRepository(ArticlePublish);

    const articleLikesRepository = myDataSource.getRepository(Likes);

    const uniqueSlug = await generateUniqueSlug(body.title, articleRepository);

    const article = await articleRepository.save({
        ...body,
        penulis: req['user'],
        slug: uniqueSlug,
    });

    await articlePublishRepository.save({
        user_id: req['user'],
        article_id: article.id,
        status: Status.diterbitkan
    });

    await articleLikesRepository.save({
        article_id: article.id
    });

    const responseArticle = {
        ...article,
        penulis: article.penulis.id,
    };

    res.status(201).send(responseArticle);
};

// * Update Article
export const UpdateArticle = async (req: Request, res: Response) => {
    const body = req.body;
    const input = plainToClass(UpdateArticleDto, body);
    const validationErrors = await validate(input);

    if (validationErrors.length > 0) {
        return res.status(400).json(formatValidationErrors(validationErrors));
    }

    if (!isUUID(req.params.id)) {
        return res.status(400).send({ message: "Request tidak valid" });
    }

    const articleRepository = myDataSource.getRepository(Article);

    await articleRepository.update(req.params.id, {
        ...body
    });

    res.status(202).send(await articleRepository.findOne({ where: { id: req.params.id } }));
};

// * Like Article
export const LikeArticle = async (req: Request, res: Response) => {

    if (!isUUID(req.params.id)) {
        return res.status(400).send({ message: "Request tidak valid" });
    }

    const articleLikesRepository = myDataSource.getRepository(Likes);

    const article = await articleLikesRepository.findOneBy({ article_id: req.params.id, user_id: req['user'].id });

    if (article) {
        return res.status(409).send({ message: "Anda sudah like artikel ini" });
    }

    await articleLikesRepository.save({
        likes: +1,
        article_id: req.params.id,
        user_id: req['user'].id
    });

    res.status(202).send({ message: "Liked!" });
};

// * Get one Article
export const GetArticle = async (req: Request, res: Response) => {
    const articleRepository = myDataSource.getRepository(Article);
    const likesRepository = myDataSource.getRepository(Likes);

    const article = await articleRepository.findOne({
        where: { slug: req.params.slug },
        relations: ['user', 'tag', 'komentar', 'status_publish']
    });

    if (!article) {
        return res.status(404).send({ message: "Artikel tidak ditemukan" });
    }

    const likesCount = await likesRepository.count({
        where: {
            article_id: article.id,
            likes: 1
        }
    });

    const responseArticle = {
        ...article,
        user: article.user.namaLengkap,
        tag: article.tag.nama,
        likes: likesCount
    };

    res.send(responseArticle);
};

// * Delete Article
export const DeleteArticle = async (req: Request, res: Response) => {
    if (!isUUID(req.params.id)) {
        return res.status(400).send({ message: "Tidak Diizinkan" });
    }
    const articleRepository = myDataSource.getRepository(Article);

    await articleRepository.delete(req.params.id);

    res.status(204).send(null);
};

// * Create Article For User
export const CreateArticleUser = async (req: Request, res: Response) => {
    const body = req.body;
    const input = plainToClass(CreateArticleDto, body);
    const validationErrors = await validate(input);

    if (validationErrors.length > 0) {
        return res.status(400).json(formatValidationErrors(validationErrors));
    }

    const articleRepository = myDataSource.getRepository(Article);

    const articlePublishRepository = myDataSource.getRepository(ArticlePublish);

    const articleLikesRepository = myDataSource.getRepository(Likes);

    const uniqueSlug = await generateUniqueSlug(body.title, articleRepository);

    const article = await articleRepository.save({
        ...body,
        penulis: req['user'],
        slug: uniqueSlug,
    });

    await articlePublishRepository.save({
        user_id: req['user'],
        article_id: article.id
    });

    await articleLikesRepository.save({
        article_id: article.id
    });

    const responseArticle = {
        ...article,
        penulis: article.penulis.id,
    };

    res.status(201).send(responseArticle);
};

// * Update Article For User
export const UpdateArticleUser = async (req: Request, res: Response) => {
    const body = req.body;
    const input = plainToClass(UpdateArticleDto, body);
    const validationErrors = await validate(input);

    if (validationErrors.length > 0) {
        return res.status(400).json(formatValidationErrors(validationErrors));
    }

    if (!isUUID(req.params.id)) {
        return res.status(400).send({ message: "Request tidak valid" });
    }

    const articleRepository = myDataSource.getRepository(Article);

    const userArticle = await articleRepository.findOne({ where: { id: req.params.id, penulis: req['user'].id } });

    if (!userArticle) {
        return res.status(403).send({ message: "Akses Tidak Diizinkan" });
    }

    await articleRepository.update(req.params.id, {
        ...body
    });

    res.status(202).send();
};

// * Admin validate the article publish status
export const ChangeArticleStatus = async (req: Request, res: Response) => {
    const body = req.body;
    const input = plainToClass(UpdateArticleStatusDTO, body);
    const validationErrors = await validate(input);

    if (validationErrors.length > 0) {
        return res.status(400).json(formatValidationErrors(validationErrors));
    }

    if (!isUUID(req.params.id)) {
        return res.status(400).send({ message: "Request tidak valid" });
    }

    const articlePublishRepository = myDataSource.getRepository(ArticlePublish);

    const userArticle = await articlePublishRepository.findOne({ where: { article_id: req.params.id, user_id: body.user_id } });

    if (!userArticle) {
        return res.status(404).send({ message: "Artikel Tidak Ditemukan" });
    }

    userArticle.status = body.status;

    await articlePublishRepository.save(userArticle);

    res.status(202).send(userArticle);
};
