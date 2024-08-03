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
exports.BalasKomentarLikes = void 0;
const typeorm_1 = require("typeorm");
const user_entity_1 = require("./user.entity");
const balas_komentar_entity_1 = require("./balas-komentar.entity");
let BalasKomentarLikes = class BalasKomentarLikes {
    id;
    likes;
    user_id;
    komentar_id;
    user;
    komentarBalas;
};
exports.BalasKomentarLikes = BalasKomentarLikes;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], BalasKomentarLikes.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Number)
], BalasKomentarLikes.prototype, "likes", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "user_id", nullable: true }),
    __metadata("design:type", String)
], BalasKomentarLikes.prototype, "user_id", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "komentar_id" }),
    __metadata("design:type", String)
], BalasKomentarLikes.prototype, "komentar_id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User, { onDelete: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)({ name: "user_id" }),
    __metadata("design:type", user_entity_1.User)
], BalasKomentarLikes.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => balas_komentar_entity_1.BalasKomentar, komentarBalas => komentarBalas.komentarBalasLike, { onDelete: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)({ name: "komentar_id" }),
    __metadata("design:type", balas_komentar_entity_1.BalasKomentar)
], BalasKomentarLikes.prototype, "komentarBalas", void 0);
exports.BalasKomentarLikes = BalasKomentarLikes = __decorate([
    (0, typeorm_1.Entity)('balas_komentar_likes')
], BalasKomentarLikes);
