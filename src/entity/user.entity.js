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
exports.User = void 0;
require("dotenv/config");
const typeorm_1 = require("typeorm");
const role_entity_1 = require("./role.entity");
const article_entity_1 = require("./article.entity");
const komentar_entity_1 = require("./komentar.entity");
const article_publish_entity_1 = require("./article-publish.entity");
const article_like_entity_1 = require("./article-like.entity");
const balas_komentar_entity_1 = require("./balas-komentar.entity");
const komentar_like_entity_1 = require("./komentar-like.entity");
let User = class User {
    id;
    namaLengkap;
    foto;
    bio;
    username;
    email;
    password;
    dibuat_pada;
    diupdate_pada;
    role_id;
    role;
    article;
    komentar;
    status_publish;
    likes;
    balasKomentar;
    komentarLikes;
};
exports.User = User;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)("uuid"),
    __metadata("design:type", String)
], User.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], User.prototype, "namaLengkap", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: `${process.env.SERVER_ENDPOINT}uploads/default-profile.jpg` }),
    __metadata("design:type", String)
], User.prototype, "foto", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: "Pengguna website penaly yang ingin mengetahui lebih banyak tentang website ini.", nullable: true }),
    __metadata("design:type", String)
], User.prototype, "bio", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], User.prototype, "username", void 0);
__decorate([
    (0, typeorm_1.Column)({ unique: true }),
    __metadata("design:type", String)
], User.prototype, "email", void 0);
__decorate([
    (0, typeorm_1.Column)({ select: false }),
    __metadata("design:type", String)
], User.prototype, "password", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", String)
], User.prototype, "dibuat_pada", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", String)
], User.prototype, "diupdate_pada", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "role_id" }),
    __metadata("design:type", Number)
], User.prototype, "role_id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => role_entity_1.Role),
    (0, typeorm_1.JoinColumn)({ name: "role_id" }),
    __metadata("design:type", role_entity_1.Role)
], User.prototype, "role", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => article_entity_1.Article, article => article.user),
    __metadata("design:type", Array)
], User.prototype, "article", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => komentar_entity_1.Komentar, (komentar) => komentar.article),
    __metadata("design:type", Array)
], User.prototype, "komentar", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => article_publish_entity_1.ArticlePublish, (status_publish) => status_publish.user),
    __metadata("design:type", Array)
], User.prototype, "status_publish", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => article_like_entity_1.Likes, (likes) => likes.user),
    __metadata("design:type", Array)
], User.prototype, "likes", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => balas_komentar_entity_1.BalasKomentar, balasKomentar => balasKomentar.user),
    __metadata("design:type", Array)
], User.prototype, "balasKomentar", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => komentar_like_entity_1.KomentarLikes, komentarLikes => komentarLikes.user),
    __metadata("design:type", Array)
], User.prototype, "komentarLikes", void 0);
exports.User = User = __decorate([
    (0, typeorm_1.Entity)("pengguna")
], User);
