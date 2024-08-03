"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChangeArticleStatus = exports.DeleteArticleUser = exports.UpdateArticleUser = exports.CreateArticleUser = exports.GetArticleCounts = exports.GetUserOwnArticle = exports.DeleteArticle = exports.GetArticle = exports.CheckUserLikeArticle = exports.DislikeArticle = exports.LikeArticle = exports.UpdateArticle = exports.CreateArticle = exports.ArticlesPending = exports.ArticlesPublish = exports.ArticlesMostLikes = exports.ArticlesPublishNew = exports.Articles = void 0;
const db_config_1 = __importDefault(require("../config/db.config"));
const article_entity_1 = require("../entity/article.entity");
const class_transformer_1 = require("class-transformer");
const create_article_dto_1 = require("../validation/dto/create-article.dto");
const class_validator_1 = require("class-validator");
const validation_utility_1 = require("../utility/validation.utility");
const update_article_dto_1 = require("../validation/dto/update-article.dto");
const slugify_1 = __importDefault(require("slugify"));
const article_publish_entity_1 = require("../entity/article-publish.entity");
const article_like_entity_1 = require("../entity/article-like.entity");
const update_article_status_dto_1 = require("../validation/dto/update-article-status.dto");
const komentar_entity_1 = require("../entity/komentar.entity");
const balas_komentar_entity_1 = require("../entity/balas-komentar.entity");
// * Get all articles
const Articles = async (req, res) => {
    const articleRepository = db_config_1.default.getRepository(article_entity_1.Article);
    const filter = req.query.filter;
    const search = req.query.search ? req.query.search.toString().toLowerCase() : null;
    let status = null;
    if (filter === "pending") {
        status = "Pending";
    }
    else if (filter === "publish") {
        status = "Diterbitkan";
    }
    else if (filter === "ditolak") {
        status = "Ditolak";
    }
    const queryBuilder = articleRepository
        .createQueryBuilder("article")
        .leftJoinAndSelect("article.status_publish", "status_publish")
        .orderBy("article.dibuat_pada", "DESC");
    if (status) {
        queryBuilder.where("status_publish.status = :status", { status });
    }
    if (search) {
        queryBuilder.andWhere("(LOWER(article.title) LIKE :search OR LOWER(article.deskripsi_kecil) LIKE :search OR LOWER(article.deskripsi_panjang) LIKE :search)", { search: `%${search}%` });
    }
    const articles = await queryBuilder.getMany();
    res.send(articles);
};
exports.Articles = Articles;
// * Get all articles New
const ArticlesPublishNew = async (req, res) => {
    const articleRepository = db_config_1.default.getRepository(article_entity_1.Article);
    const articles = await articleRepository
        .createQueryBuilder("article")
        .leftJoinAndSelect("article.status_publish", "status_publish")
        .where("status_publish.status = :status", { status: "Diterbitkan" })
        .orderBy("article.dibuat_pada", "DESC")
        .getMany();
    res.send(articles);
};
exports.ArticlesPublishNew = ArticlesPublishNew;
// * Get all by most likes
const ArticlesMostLikes = async (req, res) => {
    const articleRepository = db_config_1.default.getRepository(article_entity_1.Article);
    const articles = await articleRepository.find({ relations: ['likes', 'status_publish', 'user'] });
    const filteredArticles = articles
        .filter(article => article.status_publish.some(status => status.status === "Diterbitkan"))
        .map(article => {
        const validLikes = article.likes ? article.likes.filter(like => like.likes !== null).length : 0;
        return {
            ...article,
            likes: validLikes,
        };
    });
    res.send(filteredArticles);
};
exports.ArticlesMostLikes = ArticlesMostLikes;
// * Get all articles publish only
const ArticlesPublish = async (req, res) => {
    const articleRepository = db_config_1.default.getRepository(article_entity_1.Article);
    const komentarRepository = db_config_1.default.getRepository(komentar_entity_1.Komentar);
    const balasKomentarRepository = db_config_1.default.getRepository(balas_komentar_entity_1.BalasKomentar);
    const articles = await articleRepository.find({
        relations: ['likes', 'status_publish', 'user', 'tag'],
        select: [
            'id', 'title', 'slug', 'deskripsi_kecil', 'estimasi_membaca', 'gambar',
            'dibuat_pada', 'penulis', 'tag', 'user'
        ],
        order: {
            dibuat_pada: 'DESC'
        }
    });
    const filteredArticles = await Promise.all(articles
        .filter(article => article.status_publish.some(status => status.status === "Diterbitkan"))
        .map(async (article) => {
        const validLikes = article.likes ? article.likes.filter(like => like.likes !== null).length : 0;
        // Count comments for the article
        const komentarCount = await komentarRepository.count({ where: { article_id: article.id } });
        // Count reply comments for the article
        const balasKomentarCount = await balasKomentarRepository.createQueryBuilder('balasKomentar')
            .innerJoin('balasKomentar.komentar', 'komentar')
            .where('komentar.article_id = :articleId', { articleId: article.id })
            .getCount();
        // Combine the counts into komentarTotal
        const komentarTotal = komentarCount + balasKomentarCount;
        return {
            id: article.id,
            title: article.title,
            slug: article.slug,
            deskripsi_kecil: article.deskripsi_kecil,
            estimasi_membaca: article.estimasi_membaca,
            gambar: article.gambar,
            dibuat_pada: article.dibuat_pada,
            penulis: article.penulis,
            tag: article.tag,
            user: article.user,
            status_publish: article.status_publish,
            likes: validLikes,
            komentarTotal
        };
    }));
    res.send(filteredArticles);
};
exports.ArticlesPublish = ArticlesPublish;
// * Get all articles pending only
const ArticlesPending = async (req, res) => {
    const articleRepository = db_config_1.default.getRepository(article_entity_1.Article);
    const articles = await articleRepository
        .createQueryBuilder("article")
        .leftJoinAndSelect("article.status_publish", "status_publish")
        .where("status_publish.status = :status", { status: "Pending" })
        .orderBy("article.dibuat_pada", "DESC")
        .getMany();
    res.send(articles);
};
exports.ArticlesPending = ArticlesPending;
// * Create Article
const generateUniqueSlug = async (title, articleRepository) => {
    let slug = (0, slugify_1.default)(title, {
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
const CreateArticle = async (req, res) => {
    const body = req.body;
    const input = (0, class_transformer_1.plainToClass)(create_article_dto_1.CreateArticleDto, body);
    const validationErrors = await (0, class_validator_1.validate)(input);
    if (validationErrors.length > 0) {
        return res.status(400).json((0, validation_utility_1.formatValidationErrors)(validationErrors));
    }
    const articleRepository = db_config_1.default.getRepository(article_entity_1.Article);
    const articlePublishRepository = db_config_1.default.getRepository(article_publish_entity_1.ArticlePublish);
    const articleLikesRepository = db_config_1.default.getRepository(article_like_entity_1.Likes);
    const uniqueSlug = await generateUniqueSlug(body.title, articleRepository);
    const article = await articleRepository.save({
        ...body,
        penulis: req['user'],
        slug: uniqueSlug,
    });
    await articlePublishRepository.save({
        user_id: req['user'],
        article_id: article.id,
        status: article_publish_entity_1.Status.diterbitkan
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
exports.CreateArticle = CreateArticle;
// * Update Article
const UpdateArticle = async (req, res) => {
    const body = req.body;
    const input = (0, class_transformer_1.plainToClass)(update_article_dto_1.UpdateArticleDto, body);
    const validationErrors = await (0, class_validator_1.validate)(input);
    if (validationErrors.length > 0) {
        return res.status(400).json((0, validation_utility_1.formatValidationErrors)(validationErrors));
    }
    if (!(0, class_validator_1.isUUID)(req.params.id)) {
        return res.status(400).send({ message: "Request tidak valid" });
    }
    const articleRepository = db_config_1.default.getRepository(article_entity_1.Article);
    await articleRepository.update(req.params.id, {
        ...body
    });
    res.status(202).send(await articleRepository.findOne({ where: { id: req.params.id } }));
};
exports.UpdateArticle = UpdateArticle;
// * Like Article
const LikeArticle = async (req, res) => {
    if (!(0, class_validator_1.isUUID)(req.params.id)) {
        return res.status(400).send({ message: "Request tidak valid" });
    }
    const articleLikesRepository = db_config_1.default.getRepository(article_like_entity_1.Likes);
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
exports.LikeArticle = LikeArticle;
// * Dislike Article
const DislikeArticle = async (req, res) => {
    if (!(0, class_validator_1.isUUID)(req.params.id)) {
        return res.status(400).send({ message: "Request tidak valid" });
    }
    const articleLikesRepository = db_config_1.default.getRepository(article_like_entity_1.Likes);
    const article = await articleLikesRepository.findOneBy({ article_id: req.params.id, user_id: req['user'].id });
    await articleLikesRepository.delete(article.id);
    res.status(202).send({ message: "Dislike!" });
};
exports.DislikeArticle = DislikeArticle;
// * Check User Like Article
const CheckUserLikeArticle = async (req, res) => {
    if (!(0, class_validator_1.isUUID)(req.params.id)) {
        return res.status(400).send({ message: "Request tidak valid" });
    }
    const articleLikesRepository = db_config_1.default.getRepository(article_like_entity_1.Likes);
    const article = await articleLikesRepository.findOneBy({ article_id: req.params.id, user_id: req['user'].id });
    if (!article) {
        return res.send({ message: "False" });
    }
    res.status(200).send({ message: "True" });
};
exports.CheckUserLikeArticle = CheckUserLikeArticle;
// * Get one Article
const GetArticle = async (req, res) => {
    const articleRepository = db_config_1.default.getRepository(article_entity_1.Article);
    const likesRepository = db_config_1.default.getRepository(article_like_entity_1.Likes);
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
        user: article.user,
        tag: article.tag.nama,
        likes: likesCount
    };
    res.send(responseArticle);
};
exports.GetArticle = GetArticle;
// * Delete Article
const DeleteArticle = async (req, res) => {
    if (!(0, class_validator_1.isUUID)(req.params.id)) {
        return res.status(400).send({ message: "Tidak Diizinkan" });
    }
    const articleRepository = db_config_1.default.getRepository(article_entity_1.Article);
    await articleRepository.delete(req.params.id);
    res.status(204).send(null);
};
exports.DeleteArticle = DeleteArticle;
// * Get User Own Article
const GetUserOwnArticle = async (req, res) => {
    const articleRepository = db_config_1.default.getRepository(article_entity_1.Article);
    const komentarRepository = db_config_1.default.getRepository(komentar_entity_1.Komentar);
    const balasKomentarRepository = db_config_1.default.getRepository(balas_komentar_entity_1.BalasKomentar);
    const filter = req.query.filter;
    const search = req.query.search ? req.query.search.toString().toLowerCase() : null;
    let status = null;
    if (filter === "pending") {
        status = "Pending";
    }
    else if (filter === "publish") {
        status = "Diterbitkan";
    }
    else if (filter === "ditolak") {
        status = "Ditolak";
    }
    const queryBuilder = articleRepository
        .createQueryBuilder("article")
        .leftJoinAndSelect("article.likes", "likes")
        .leftJoinAndSelect("article.status_publish", "status_publish")
        .leftJoinAndSelect("article.user", "user")
        .leftJoinAndSelect("article.tag", "tag")
        .where("article.penulis = :penulisId", { penulisId: req['user'].id })
        .orderBy("article.dibuat_pada", "DESC");
    if (status) {
        queryBuilder.andWhere("status_publish.status = :status", { status });
    }
    if (search) {
        queryBuilder.andWhere("(LOWER(article.title) LIKE :search OR LOWER(article.deskripsi_kecil) LIKE :search OR LOWER(article.deskripsi_panjang) LIKE :search)", { search: `%${search}%` });
    }
    const articles = await queryBuilder.getMany();
    const result = await Promise.all(articles.map(async (article) => {
        const validLikes = article.likes ? article.likes.filter(like => like.likes !== null).length : 0;
        // Count comments for the article
        const komentarCount = await komentarRepository.count({ where: { article_id: article.id } });
        // Count reply comments for the article
        const balasKomentarCount = await balasKomentarRepository.createQueryBuilder('balasKomentar')
            .innerJoin('balasKomentar.komentar', 'komentar')
            .where('komentar.article_id = :articleId', { articleId: article.id })
            .getCount();
        // Combine the counts into komentarTotal
        const komentarTotal = komentarCount + balasKomentarCount;
        return {
            id: article.id,
            title: article.title,
            slug: article.slug,
            deskripsi_kecil: article.deskripsi_kecil,
            estimasi_membaca: article.estimasi_membaca,
            gambar: article.gambar,
            dibuat_pada: article.dibuat_pada,
            penulis: article.penulis,
            tag: article.tag,
            user: article.user,
            status_publish: article.status_publish,
            likes: validLikes,
            komentarTotal
        };
    }));
    res.send(result);
};
exports.GetUserOwnArticle = GetUserOwnArticle;
const GetArticleCounts = async (req, res) => {
    const articlePublishRepository = db_config_1.default.getRepository(article_publish_entity_1.ArticlePublish);
    const countsQuery = articlePublishRepository
        .createQueryBuilder("articlePublish")
        .select("articlePublish.status", "status")
        .addSelect("COUNT(articlePublish.article_id)", "count")
        .innerJoin("articlePublish.article", "article")
        .where("article.penulis = :penulis", { penulis: req['user'].id })
        .groupBy("articlePublish.status");
    const counts = await countsQuery.getRawMany();
    const countMap = {
        all: 0,
        publish: 0,
        pending: 0,
        ditolak: 0
    };
    counts.forEach(count => {
        if (count.status === "Diterbitkan") {
            countMap.publish = parseInt(count.count, 10);
        }
        else if (count.status === "Pending") {
            countMap.pending = parseInt(count.count, 10);
        }
        else if (count.status === "Ditolak") {
            countMap.ditolak = parseInt(count.count, 10);
        }
        countMap.all += parseInt(count.count, 10);
    });
    res.send(countMap);
};
exports.GetArticleCounts = GetArticleCounts;
// * Create Article For User
const CreateArticleUser = async (req, res) => {
    const body = req.body;
    const input = (0, class_transformer_1.plainToClass)(create_article_dto_1.CreateArticleDto, body);
    const validationErrors = await (0, class_validator_1.validate)(input);
    if (validationErrors.length > 0) {
        return res.status(400).json((0, validation_utility_1.formatValidationErrors)(validationErrors));
    }
    const articleRepository = db_config_1.default.getRepository(article_entity_1.Article);
    const articlePublishRepository = db_config_1.default.getRepository(article_publish_entity_1.ArticlePublish);
    const articleLikesRepository = db_config_1.default.getRepository(article_like_entity_1.Likes);
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
exports.CreateArticleUser = CreateArticleUser;
// * Update Article For User
const UpdateArticleUser = async (req, res) => {
    const body = req.body;
    const input = (0, class_transformer_1.plainToClass)(update_article_dto_1.UpdateArticleDto, body);
    const validationErrors = await (0, class_validator_1.validate)(input);
    if (validationErrors.length > 0) {
        return res.status(400).json((0, validation_utility_1.formatValidationErrors)(validationErrors));
    }
    if (!(0, class_validator_1.isUUID)(req.params.id)) {
        return res.status(400).send({ message: "Request tidak valid" });
    }
    const articleRepository = db_config_1.default.getRepository(article_entity_1.Article);
    const userArticle = await articleRepository.findOne({ where: { id: req.params.id, penulis: req['user'].id } });
    if (!userArticle) {
        return res.status(403).send({ message: "Akses Tidak Diizinkan" });
    }
    await articleRepository.update(req.params.id, {
        ...body
    });
    res.status(202).send();
};
exports.UpdateArticleUser = UpdateArticleUser;
// * Delete Article
const DeleteArticleUser = async (req, res) => {
    if (!(0, class_validator_1.isUUID)(req.params.id)) {
        return res.status(400).send({ message: "Request tidak valid" });
    }
    const articleRepository = db_config_1.default.getRepository(article_entity_1.Article);
    const userArticle = await articleRepository.findOne({ where: { id: req.params.id, penulis: req['user'].id } });
    if (!userArticle) {
        return res.status(403).send({ message: "Akses Tidak Diizinkan" });
    }
    await articleRepository.delete(req.params.id);
    res.status(202).send();
};
exports.DeleteArticleUser = DeleteArticleUser;
// * Admin validate the article publish status
const ChangeArticleStatus = async (req, res) => {
    const body = req.body;
    const input = (0, class_transformer_1.plainToClass)(update_article_status_dto_1.UpdateArticleStatusDTO, body);
    const validationErrors = await (0, class_validator_1.validate)(input);
    if (validationErrors.length > 0) {
        return res.status(400).json((0, validation_utility_1.formatValidationErrors)(validationErrors));
    }
    if (!(0, class_validator_1.isUUID)(req.params.id)) {
        return res.status(400).send({ message: "Request tidak valid" });
    }
    const articlePublishRepository = db_config_1.default.getRepository(article_publish_entity_1.ArticlePublish);
    const userArticle = await articlePublishRepository.findOne({ where: { article_id: req.params.id, user_id: body.user_id } });
    if (!userArticle) {
        return res.status(404).send({ message: "Artikel Tidak Ditemukan" });
    }
    userArticle.status = body.status;
    await articlePublishRepository.save(userArticle);
    res.status(202).send(userArticle);
};
exports.ChangeArticleStatus = ChangeArticleStatus;
