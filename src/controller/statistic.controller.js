"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ArticleStat = exports.UsersStat = exports.Stats = void 0;
const user_service_1 = require("../services/user.service");
const article_service_1 = require("../services/article.service");
const comment_service_1 = require("../services/comment.service");
const article_like_service_1 = require("../services/article-like.service");
// * Get and count the total statistic
const Stats = async (req, res) => {
    const userService = new user_service_1.UserService();
    const articleService = new article_service_1.ArticleService();
    const commentService = new comment_service_1.CommentService();
    const articleLikeService = new article_like_service_1.ArticleLikeService();
    const user_total = await userService.total({});
    const article_total = await articleService.total({});
    const comment_total = await commentService.totalComments();
    const articleLike_total = await articleLikeService.totalLikes();
    res.send({
        user_total: user_total.total,
        article_total: article_total.total,
        comment_total: comment_total,
        articleLike_total: articleLike_total
    });
};
exports.Stats = Stats;
// * User Chart
const UsersStat = async (req, res) => {
    const userService = new user_service_1.UserService();
    const time = req.query.time || 'day';
    res.send(await userService.chart(time));
};
exports.UsersStat = UsersStat;
// * Article Chart
const ArticleStat = async (req, res) => {
    const articleService = new article_service_1.ArticleService();
    const time = req.query.time || 'day';
    res.send(await articleService.chartPublishedArticles(time));
};
exports.ArticleStat = ArticleStat;
