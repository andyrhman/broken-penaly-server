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
exports.ArticlePublish = exports.Status = void 0;
const typeorm_1 = require("typeorm");
const article_entity_1 = require("./article.entity");
const user_entity_1 = require("./user.entity");
var Status;
(function (Status) {
    Status["pending"] = "Pending";
    Status["diterbitkan"] = "Diterbitkan";
    Status["ditolak"] = "Ditolak";
})(Status || (exports.Status = Status = {}));
let ArticlePublish = class ArticlePublish {
    id;
    user_id;
    article_id;
    status;
    dibuat_pada;
    article;
    user;
};
exports.ArticlePublish = ArticlePublish;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], ArticlePublish.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'user_id' }),
    __metadata("design:type", String)
], ArticlePublish.prototype, "user_id", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "article_id" }),
    __metadata("design:type", String)
], ArticlePublish.prototype, "article_id", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: Status,
        default: Status.pending
    }),
    __metadata("design:type", String)
], ArticlePublish.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", String)
], ArticlePublish.prototype, "dibuat_pada", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => article_entity_1.Article, article => article.status_publish, { onDelete: "CASCADE" }),
    (0, typeorm_1.JoinColumn)({ name: "article_id" }),
    __metadata("design:type", article_entity_1.Article)
], ArticlePublish.prototype, "article", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User, user => user.status_publish, { onDelete: "CASCADE" }),
    (0, typeorm_1.JoinColumn)({ name: 'user_id' }),
    __metadata("design:type", user_entity_1.User)
], ArticlePublish.prototype, "user", void 0);
exports.ArticlePublish = ArticlePublish = __decorate([
    (0, typeorm_1.Entity)('publish_article_status')
], ArticlePublish);
