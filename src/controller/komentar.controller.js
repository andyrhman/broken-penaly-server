"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeleteCommentReply = exports.DeleteComment = exports.AdminDeleteCommentReply = exports.AdminDeleteComment = exports.CheckCommentLikeReply = exports.DislikeReplyComment = exports.LikeReplyComment = exports.CheckCommentLike = exports.DislikeComment = exports.LikeComment = exports.ReplyComment = exports.CreateComment = exports.GetComment = void 0;
const db_config_1 = __importDefault(require("../config/db.config"));
const class_validator_1 = require("class-validator");
const komentar_entity_1 = require("../entity/komentar.entity");
const create_comment_dto_1 = require("../validation/dto/create-comment.dto");
const class_transformer_1 = require("class-transformer");
const validation_utility_1 = require("../utility/validation.utility");
const komentar_like_entity_1 = require("../entity/komentar-like.entity");
const balas_komentar_like_entity_1 = require("../entity/balas-komentar-like.entity");
const reply_comment_dto_1 = require("../validation/dto/reply-comment.dto");
const balas_komentar_entity_1 = require("../entity/balas-komentar.entity");
// * Get comment from an article
const GetComment = async (req, res) => {
    if (!(0, class_validator_1.isUUID)(req.params.id)) {
        return res.status(400).send({ message: "Request tidak valid" });
    }
    const komentarRepository = db_config_1.default.getRepository(komentar_entity_1.Komentar);
    const komentar = await komentarRepository.find({
        where: { article_id: req.params.id },
        relations: ['user', 'balasKomentar', 'komentarLike', 'balasKomentar.komentarBalasLike', 'balasKomentar.user']
    });
    if (!komentar) {
        return res.status(404).send({ message: "Komentar tidak ditemukan" });
    }
    const komentarWithLikes = komentar.map(k => {
        const komentarLikeCount = k.komentarLike.reduce((acc, like) => acc + like.likes, 0);
        const balasKomentarWithLikeCount = k.balasKomentar.map(balas => {
            const komentarBalasLikeCount = balas.komentarBalasLike.reduce((acc, like) => acc + like.likes, 0);
            return {
                ...balas,
                komentarBalasLikeCount
            };
        });
        return {
            ...k,
            komentarLikeCount,
            balasKomentar: balasKomentarWithLikeCount
        };
    });
    res.send(komentarWithLikes);
};
exports.GetComment = GetComment;
// * Create comment from an article 
const CreateComment = async (req, res) => {
    const body = req.body;
    const input = (0, class_transformer_1.plainToClass)(create_comment_dto_1.CreateCommentDto, body);
    const validationErrors = await (0, class_validator_1.validate)(input);
    if (validationErrors.length > 0) {
        return res.status(400).json((0, validation_utility_1.formatValidationErrors)(validationErrors));
    }
    const komentarRepository = db_config_1.default.getRepository(komentar_entity_1.Komentar);
    const komentar = await komentarRepository.save({
        ...body,
        user_id: req['user'].id,
        article_id: req.params.id
    });
    res.status(201).send(komentar);
};
exports.CreateComment = CreateComment;
// * Reply a comment from an article
const ReplyComment = async (req, res) => {
    const body = req.body;
    const input = (0, class_transformer_1.plainToClass)(reply_comment_dto_1.ReplyCommentDto, body);
    const validationErrors = await (0, class_validator_1.validate)(input);
    if (validationErrors.length > 0) {
        return res.status(400).json((0, validation_utility_1.formatValidationErrors)(validationErrors));
    }
    const komentarReplyRepository = db_config_1.default.getRepository(balas_komentar_entity_1.BalasKomentar);
    const komentarRepository = db_config_1.default.getRepository(komentar_entity_1.Komentar);
    const checkKomentar = await komentarRepository.findOneBy({ id: body.komentar_id });
    if (!checkKomentar) {
        return res.status(404).send({ message: "Terjadi kesalahan..." });
    }
    const komentar = await komentarReplyRepository.save({
        ...body,
        user_id: req['user'].id
    });
    res.status(201).send(komentar);
};
exports.ReplyComment = ReplyComment;
// * Like Comment (Parent)
const LikeComment = async (req, res) => {
    if (!(0, class_validator_1.isUUID)(req.params.id)) {
        return res.status(400).send({ message: "Request tidak valid" });
    }
    const komentarLikesRepository = db_config_1.default.getRepository(komentar_like_entity_1.KomentarLikes);
    const article = await komentarLikesRepository.findOneBy({ komentar_id: req.params.id, user_id: req['user'].id });
    if (article) {
        return res.status(409).send({ message: "Anda sudah like komentar ini" });
    }
    await komentarLikesRepository.save({
        likes: +1,
        komentar_id: req.params.id,
        user_id: req['user'].id
    });
    res.status(202).send({ message: "Liked!" });
};
exports.LikeComment = LikeComment;
// * Dislike Comment (Parent)
const DislikeComment = async (req, res) => {
    if (!(0, class_validator_1.isUUID)(req.params.id)) {
        return res.status(400).send({ message: "Request tidak valid" });
    }
    const komentarLikesRepository = db_config_1.default.getRepository(komentar_like_entity_1.KomentarLikes);
    await komentarLikesRepository.findOneBy({ komentar_id: req.params.id, user_id: req['user'].id });
    await komentarLikesRepository.delete({ komentar_id: req.params.id });
    res.status(202).send({ message: "Dislike!" });
};
exports.DislikeComment = DislikeComment;
// * Check comment like (Parent)
const CheckCommentLike = async (req, res) => {
    if (!(0, class_validator_1.isUUID)(req.params.id)) {
        return res.status(400).send({ message: "Request tidak valid" });
    }
    const komentarLikesRepository = db_config_1.default.getRepository(komentar_like_entity_1.KomentarLikes);
    const komentar = await komentarLikesRepository.findOneBy({ komentar_id: req.params.id, user_id: req['user'].id });
    if (!komentar) {
        return res.send({ message: "False" });
    }
    res.status(200).send({ message: "True" });
};
exports.CheckCommentLike = CheckCommentLike;
// * Like Reply Comment (Child)
const LikeReplyComment = async (req, res) => {
    if (!(0, class_validator_1.isUUID)(req.body.komentar_id) || !req.body.komentar_id) {
        return res.status(400).send({ message: "Request tidak valid" });
    }
    const komentarReplyRepository = db_config_1.default.getRepository(balas_komentar_like_entity_1.BalasKomentarLikes);
    const article = await komentarReplyRepository.findOneBy({ komentar_id: req.body.komentar_id, user_id: req['user'].id });
    if (article) {
        return res.status(409).send({ message: "Anda sudah like komentar ini" });
    }
    await komentarReplyRepository.save({
        likes: +1,
        komentar_id: req.body.komentar_id,
        user_id: req['user'].id
    });
    res.status(202).send({ message: "Liked!" });
};
exports.LikeReplyComment = LikeReplyComment;
// * Dislike Reply Comment (Child)
const DislikeReplyComment = async (req, res) => {
    if (!(0, class_validator_1.isUUID)(req.body.komentar_id) || !req.body.komentar_id) {
        return res.status(400).send({ message: "Request tidak valid" });
    }
    const komentarReplyRepository = db_config_1.default.getRepository(balas_komentar_like_entity_1.BalasKomentarLikes);
    const komentar = await komentarReplyRepository.findOneBy({ komentar_id: req.body.komentar_id, user_id: req['user'].id });
    await komentarReplyRepository.delete(komentar.id);
    res.status(202).send({ message: "Disliked!" });
};
exports.DislikeReplyComment = DislikeReplyComment;
// * Check comment like (Parent)
const CheckCommentLikeReply = async (req, res) => {
    if (!(0, class_validator_1.isUUID)(req.params.id)) {
        return res.status(400).send({ message: "Request tidak valid" });
    }
    const komentarReplyRepository = db_config_1.default.getRepository(balas_komentar_like_entity_1.BalasKomentarLikes);
    const komentar = await komentarReplyRepository.findOneBy({ komentar_id: req.body.komentar_id, user_id: req['user'].id });
    if (!komentar) {
        return res.send({ message: "False" });
    }
    res.status(200).send({ message: "True" });
};
exports.CheckCommentLikeReply = CheckCommentLikeReply;
// * Admin Delete Comment
const AdminDeleteComment = async (req, res) => {
    if (!(0, class_validator_1.isUUID)(req.params.id) || !(0, class_validator_1.isUUID)(req.params.user_id)) {
        return res.status(400).send({ message: "Tidak Diizinkan" });
    }
    const komentarRepository = db_config_1.default.getRepository(komentar_entity_1.Komentar);
    const checkKomentar = await komentarRepository.findOneBy({ id: req.params.id, user_id: req.params.user_id });
    await komentarRepository.delete(checkKomentar.id);
    res.status(204).send(null);
};
exports.AdminDeleteComment = AdminDeleteComment;
// * Admin Delete Comment Reply
const AdminDeleteCommentReply = async (req, res) => {
    if (!(0, class_validator_1.isUUID)(req.body.komentar_id) || !req.body.komentar_id) {
        return res.status(400).send({ message: "Request tidak valid" });
    }
    const komentarReplyRepository = db_config_1.default.getRepository(balas_komentar_entity_1.BalasKomentar);
    const checkUser = await komentarReplyRepository.findOneBy({ id: req.body.komentar_id, user_id: req.body.user_id });
    if (!checkUser) {
        return res.status(403).send({ message: "Tidak Diizinkan" });
    }
    await komentarReplyRepository.delete(req.body.komentar_id);
    res.status(204).send(null);
};
exports.AdminDeleteCommentReply = AdminDeleteCommentReply;
// * Delete Comment
const DeleteComment = async (req, res) => {
    if (!(0, class_validator_1.isUUID)(req.params.id)) {
        return res.status(400).send({ message: "Tidak Diizinkan" });
    }
    const komentarRepository = db_config_1.default.getRepository(komentar_entity_1.Komentar);
    const checkKomentar = await komentarRepository.findOneBy({ article_id: req.params.id, user_id: req['user'].id });
    if (!checkKomentar) {
        return res.status(403).send({ message: "Tidak Diizinkan" });
    }
    await komentarRepository.delete(checkKomentar.id);
    res.status(204).send(null);
};
exports.DeleteComment = DeleteComment;
// * Delete Comment Reply
const DeleteCommentReply = async (req, res) => {
    if (!(0, class_validator_1.isUUID)(req.body.komentar_id) || !req.body.komentar_id) {
        return res.status(400).send({ message: "Request tidak valid" });
    }
    const komentarReplyRepository = db_config_1.default.getRepository(balas_komentar_entity_1.BalasKomentar);
    const checkUser = await komentarReplyRepository.findOneBy({ id: req.body.komentar_id, user_id: req['user'].id });
    if (!checkUser) {
        return res.status(403).send({ message: "Tidak Diizinkan" });
    }
    await komentarReplyRepository.delete(req.body.komentar_id);
    res.status(204).send(null);
};
exports.DeleteCommentReply = DeleteCommentReply;
