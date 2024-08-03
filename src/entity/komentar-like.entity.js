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
exports.KomentarLikes = void 0;
const typeorm_1 = require("typeorm");
const user_entity_1 = require("./user.entity");
const komentar_entity_1 = require("./komentar.entity");
let KomentarLikes = class KomentarLikes {
    id;
    likes;
    user_id;
    komentar_id;
    user;
    komentar;
};
exports.KomentarLikes = KomentarLikes;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], KomentarLikes.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Number)
], KomentarLikes.prototype, "likes", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "user_id", nullable: true }),
    __metadata("design:type", String)
], KomentarLikes.prototype, "user_id", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "komentar_id" }),
    __metadata("design:type", String)
], KomentarLikes.prototype, "komentar_id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User, { onDelete: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)({ name: "user_id" }),
    __metadata("design:type", user_entity_1.User)
], KomentarLikes.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => komentar_entity_1.Komentar, komentar => komentar.komentarLike, { onDelete: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)({ name: "komentar_id" }),
    __metadata("design:type", komentar_entity_1.Komentar)
], KomentarLikes.prototype, "komentar", void 0);
exports.KomentarLikes = KomentarLikes = __decorate([
    (0, typeorm_1.Entity)('komentar_likes')
], KomentarLikes);
