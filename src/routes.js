"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.routes = void 0;
const express_1 = __importDefault(require("express"));
const auth_middleware_1 = require("./middleware/auth.middleware");
const permission_middleware_1 = require("./middleware/permission.middleware");
const auth_controller_1 = require("./controller/auth.controller");
const user_controller_1 = require("./controller/user.controller");
const role_controller_1 = require("./controller/role.controller");
const permission_controller_1 = require("./controller/permission.controller");
const tag_controller_1 = require("./controller/tag.controller");
const upload_controller_1 = require("./controller/upload.controller");
const article_controller_1 = require("./controller/article.controller");
const komentar_controller_1 = require("./controller/komentar.controller");
const statistic_controller_1 = require("./controller/statistic.controller");
const routes = (router) => {
    // * Authentication
    router.post('/api/register', auth_controller_1.Register);
    router.post('/api/login', auth_controller_1.Login);
    router.get('/api/user', auth_middleware_1.AuthMiddleware, auth_controller_1.AuthenticatedUser);
    router.post('/api/logout', auth_middleware_1.AuthMiddleware, auth_controller_1.Logout);
    router.put('/api/user/info', auth_middleware_1.AuthMiddleware, auth_controller_1.UpdateInfo);
    router.put('/api/user/password', auth_middleware_1.AuthMiddleware, auth_controller_1.UpdatePassword);
    // * User   
    router.get('/api/users', auth_middleware_1.AuthMiddleware, (0, permission_middleware_1.PermissionMiddleware)('users'), user_controller_1.Users);
    router.post('/api/users', auth_middleware_1.AuthMiddleware, (0, permission_middleware_1.PermissionMiddleware)('users'), user_controller_1.CreateUser);
    router.get('/api/users/:id', auth_middleware_1.AuthMiddleware, (0, permission_middleware_1.PermissionMiddleware)('users'), user_controller_1.GetUser);
    router.put('/api/users/:id', auth_middleware_1.AuthMiddleware, (0, permission_middleware_1.PermissionMiddleware)('users'), user_controller_1.UpdateUser);
    router.delete('/api/users/:id', auth_middleware_1.AuthMiddleware, (0, permission_middleware_1.PermissionMiddleware)('users'), user_controller_1.DeleteUser);
    // * Peran dan Perizinan
    router.get('/api/permissions', auth_middleware_1.AuthMiddleware, permission_controller_1.Permissions);
    router.get('/api/roles', auth_middleware_1.AuthMiddleware, (0, permission_middleware_1.PermissionMiddleware)('roles'), role_controller_1.Roles);
    router.post('/api/roles', auth_middleware_1.AuthMiddleware, (0, permission_middleware_1.PermissionMiddleware)('roles'), role_controller_1.CreateRole);
    router.get('/api/roles/:id', auth_middleware_1.AuthMiddleware, (0, permission_middleware_1.PermissionMiddleware)('roles'), role_controller_1.GetRole);
    router.put('/api/roles/:id', auth_middleware_1.AuthMiddleware, (0, permission_middleware_1.PermissionMiddleware)('roles'), role_controller_1.UpdateRole);
    router.delete('/api/roles/:id', auth_middleware_1.AuthMiddleware, (0, permission_middleware_1.PermissionMiddleware)('roles'), role_controller_1.DeleteRole);
    // * Tag
    router.get('/api/tags', tag_controller_1.Tags);
    router.post('/api/tags', auth_middleware_1.AuthMiddleware, (0, permission_middleware_1.PermissionMiddleware)('categories'), tag_controller_1.CreateTag);
    router.get('/api/tags/:id', auth_middleware_1.AuthMiddleware, (0, permission_middleware_1.PermissionMiddleware)('categories'), tag_controller_1.GetTag);
    router.put('/api/tags/:id', auth_middleware_1.AuthMiddleware, (0, permission_middleware_1.PermissionMiddleware)('categories'), tag_controller_1.UpdateTag);
    router.delete('/api/tags/:id', auth_middleware_1.AuthMiddleware, (0, permission_middleware_1.PermissionMiddleware)('categories'), tag_controller_1.DeleteTag);
    // * Artikel
    router.get('/api/articles', auth_middleware_1.AuthMiddleware, (0, permission_middleware_1.PermissionMiddleware)('articles'), article_controller_1.Articles);
    router.get('/api/articles/pending', auth_middleware_1.AuthMiddleware, (0, permission_middleware_1.PermissionMiddleware)('articles'), article_controller_1.ArticlesPending);
    router.post('/api/articles', auth_middleware_1.AuthMiddleware, (0, permission_middleware_1.PermissionMiddleware)('articles'), article_controller_1.CreateArticle);
    router.put('/api/articles/:id', auth_middleware_1.AuthMiddleware, (0, permission_middleware_1.PermissionMiddleware)('articles'), article_controller_1.UpdateArticle);
    router.delete('/api/articles/:id', auth_middleware_1.AuthMiddleware, (0, permission_middleware_1.PermissionMiddleware)('articles'), article_controller_1.DeleteArticle);
    router.put('/api/articles/status/:id', auth_middleware_1.AuthMiddleware, (0, permission_middleware_1.PermissionMiddleware)('articles'), article_controller_1.ChangeArticleStatus);
    // * Artikel user managed
    router.get('/api/articles/published', article_controller_1.ArticlesPublish);
    router.get('/api/articles/published/new', article_controller_1.ArticlesPublishNew);
    router.get('/api/articles/mostlikes', article_controller_1.ArticlesMostLikes);
    router.get('/api/articles/:slug', article_controller_1.GetArticle);
    router.get('/api/artikelku', auth_middleware_1.AuthMiddleware, article_controller_1.GetUserOwnArticle);
    router.get('/api/artikelku/hitung', auth_middleware_1.AuthMiddleware, article_controller_1.GetArticleCounts);
    router.put('/api/articles/like/:id', auth_middleware_1.AuthMiddleware, article_controller_1.LikeArticle);
    router.put('/api/articles/dislike/:id', auth_middleware_1.AuthMiddleware, article_controller_1.DislikeArticle);
    router.get('/api/articles/like/:id', auth_middleware_1.AuthMiddleware, article_controller_1.CheckUserLikeArticle);
    router.post('/api/articles/create', auth_middleware_1.AuthMiddleware, article_controller_1.CreateArticleUser);
    router.put('/api/articles/update/:id', auth_middleware_1.AuthMiddleware, article_controller_1.UpdateArticleUser);
    router.delete('/api/articles/delete/:id', auth_middleware_1.AuthMiddleware, article_controller_1.DeleteArticleUser);
    router.get('/api/article/tags/:nama', tag_controller_1.GetTagArticle);
    // * Komentar
    router.get('/api/comments/:id', komentar_controller_1.GetComment);
    router.post('/api/comments/:id', auth_middleware_1.AuthMiddleware, komentar_controller_1.CreateComment);
    router.post('/api/balaskomentar', auth_middleware_1.AuthMiddleware, komentar_controller_1.ReplyComment);
    router.post('/api/comments/like/:id', auth_middleware_1.AuthMiddleware, komentar_controller_1.LikeComment);
    router.post('/api/comments/dislike/:id', auth_middleware_1.AuthMiddleware, komentar_controller_1.DislikeComment);
    router.get('/api/comments/like/:id', auth_middleware_1.AuthMiddleware, komentar_controller_1.CheckCommentLike);
    router.post('/api/komentar/like/balas', auth_middleware_1.AuthMiddleware, komentar_controller_1.LikeReplyComment);
    router.post('/api/komentar/dislike/balas', auth_middleware_1.AuthMiddleware, komentar_controller_1.DislikeReplyComment);
    router.get('/api/komentar/like/check', auth_middleware_1.AuthMiddleware, komentar_controller_1.CheckCommentLikeReply);
    router.delete('/api/admin/comments/:id/:user_id', auth_middleware_1.AuthMiddleware, (0, permission_middleware_1.PermissionMiddleware)('comments'), komentar_controller_1.AdminDeleteComment);
    router.delete('/api/admin/hapuskomentar/balas', auth_middleware_1.AuthMiddleware, (0, permission_middleware_1.PermissionMiddleware)('comments'), komentar_controller_1.AdminDeleteCommentReply);
    router.delete('/api/comments/:id', auth_middleware_1.AuthMiddleware, komentar_controller_1.DeleteComment);
    router.delete('/api/hapuskomentar/balas', auth_middleware_1.AuthMiddleware, komentar_controller_1.DeleteCommentReply);
    // * Statistic
    router.get("/api/admin/stats", auth_middleware_1.AuthMiddleware, (0, permission_middleware_1.PermissionMiddleware)('articles'), statistic_controller_1.Stats);
    router.get("/api/admin/user-chart", auth_middleware_1.AuthMiddleware, (0, permission_middleware_1.PermissionMiddleware)('articles'), statistic_controller_1.UsersStat);
    router.get("/api/admin/article-chart", auth_middleware_1.AuthMiddleware, (0, permission_middleware_1.PermissionMiddleware)('articles'), statistic_controller_1.ArticleStat);
    // * Upload Images
    router.post('/api/upload/articles', auth_middleware_1.AuthMiddleware, upload_controller_1.UploadArticleImage);
    router.use('/api/uploads/articles', express_1.default.static('./uploads/articles'));
    router.post('/api/upload/users', auth_middleware_1.AuthMiddleware, upload_controller_1.UploadUserImage);
    router.use('/api/uploads/users', express_1.default.static('./uploads/users'));
    router.use('/api/uploads', express_1.default.static('./uploads'));
};
exports.routes = routes;
