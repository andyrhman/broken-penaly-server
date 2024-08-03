"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Article = void 0;
require("dotenv/config");
const typeorm_1 = require("typeorm");
const user_entity_1 = require("./user.entity");
const tag_entity_1 = require("./tag.entity");
const komentar_entity_1 = require("./komentar.entity");
const article_publish_entity_1 = require("./article-publish.entity");
const article_like_entity_1 = require("./article-like.entity");
let Article = class Article {
    id;
    title;
    slug;
    deskripsi_kecil;
    deskripsi_panjang;
    estimasi_membaca;
    gambar;
    dibuat_pada;
    penulis;
    tag_id;
    user;
    tag;
    komentar;
    status_publish;
    likes;
};
exports.Article = Article;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], Article.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Article.prototype, "title", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Article.prototype, "slug", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Article.prototype, "deskripsi_kecil", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text' }),
    __metadata("design:type", String)
], Article.prototype, "deskripsi_panjang", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Article.prototype, "estimasi_membaca", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: `${process.env.SERVER_ENDPOINT}uploads/default-article.jpg` }),
    __metadata("design:type", String)
], Article.prototype, "gambar", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", String)
], Article.prototype, "dibuat_pada", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "penulis" }),
    __metadata("design:type", String)
], Article.prototype, "penulis", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "tag_id" }),
    __metadata("design:type", String)
], Article.prototype, "tag_id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User, user => user.article, { onDelete: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)({ name: 'penulis' }),
    __metadata("design:type", user_entity_1.User)
], Article.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => tag_entity_1.Tag, tag => tag.article, { onDelete: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)({ name: "tag_id" }),
    __metadata("design:type", tag_entity_1.Tag)
], Article.prototype, "tag", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => komentar_entity_1.Komentar, (komentar) => komentar.article),
    __metadata("design:type", Array)
], Article.prototype, "komentar", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => article_publish_entity_1.ArticlePublish, (status_publish) => status_publish.article),
    __metadata("design:type", Array)
], Article.prototype, "status_publish", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => article_like_entity_1.Likes, (likes) => likes.article),
    __metadata("design:type", Array)
], Article.prototype, "likes", void 0);
exports.Article = Article = __decorate([
    (0, typeorm_1.Entity)('artikel')
], Article);
