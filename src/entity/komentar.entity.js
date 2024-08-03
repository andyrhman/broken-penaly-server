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
exports.Komentar = void 0;
const typeorm_1 = require("typeorm");
const article_entity_1 = require("./article.entity");
const user_entity_1 = require("./user.entity");
const balas_komentar_entity_1 = require("./balas-komentar.entity");
const komentar_like_entity_1 = require("./komentar-like.entity");
let Komentar = class Komentar {
    id;
    komentar;
    user_id;
    article_id;
    dibuat_pada;
    article;
    user;
    balasKomentar;
    komentarLike;
};
exports.Komentar = Komentar;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], Komentar.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text' }),
    __metadata("design:type", String)
], Komentar.prototype, "komentar", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "user_id" }),
    __metadata("design:type", String)
], Komentar.prototype, "user_id", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "article_id" }),
    __metadata("design:type", String)
], Komentar.prototype, "article_id", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", String)
], Komentar.prototype, "dibuat_pada", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => article_entity_1.Article, (article) => article.komentar, { onDelete: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)({ name: "article_id" }),
    __metadata("design:type", article_entity_1.Article)
], Komentar.prototype, "article", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User, (user) => user.komentar, { onDelete: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)({ name: 'user_id' }),
    __metadata("design:type", user_entity_1.User)
], Komentar.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => balas_komentar_entity_1.BalasKomentar, balasKomentar => balasKomentar.komentar),
    __metadata("design:type", Array)
], Komentar.prototype, "balasKomentar", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => komentar_like_entity_1.KomentarLikes, komentarLike => komentarLike.komentar),
    __metadata("design:type", Array)
], Komentar.prototype, "komentarLike", void 0);
exports.Komentar = Komentar = __decorate([
    (0, typeorm_1.Entity)('komentar')
], Komentar);
