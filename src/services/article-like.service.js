"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ArticleLikeService = void 0;
const abstract_service_1 = require("./abstract.service");
const db_config_1 = __importDefault(require("../config/db.config"));
const article_like_entity_1 = require("../entity/article-like.entity");
class ArticleLikeService extends abstract_service_1.AbstractService {
    constructor() {
        super(db_config_1.default.getRepository(article_like_entity_1.Likes));
    }
    async totalLikes() {
        const likesRepository = db_config_1.default.getRepository(article_like_entity_1.Likes);
        const likesCount = await likesRepository.count({
            where: {
                likes: 1
            }
        });
        return likesCount;
    }
}
exports.ArticleLikeService = ArticleLikeService;
