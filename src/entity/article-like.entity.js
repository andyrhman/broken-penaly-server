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
exports.Likes = void 0;
const typeorm_1 = require("typeorm");
const user_entity_1 = require("./user.entity");
const article_entity_1 = require("./article.entity");
let Likes = class Likes {
    id;
    likes;
    user_id;
    article_id;
    user;
    article;
};
exports.Likes = Likes;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], Likes.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Number)
], Likes.prototype, "likes", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "user_id", nullable: true }),
    __metadata("design:type", String)
], Likes.prototype, "user_id", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "article_id" }),
    __metadata("design:type", String)
], Likes.prototype, "article_id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User, user => user.likes, { onDelete: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)({ name: "user_id" }),
    __metadata("design:type", user_entity_1.User)
], Likes.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => article_entity_1.Article, article => article.likes, { onDelete: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)({ name: "article_id" }),
    __metadata("design:type", article_entity_1.Article)
], Likes.prototype, "article", void 0);
exports.Likes = Likes = __decorate([
    (0, typeorm_1.Entity)('article_likes')
], Likes);
