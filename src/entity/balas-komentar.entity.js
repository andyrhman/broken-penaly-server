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
exports.BalasKomentar = void 0;
const typeorm_1 = require("typeorm");
const komentar_entity_1 = require("./komentar.entity");
const user_entity_1 = require("./user.entity");
const balas_komentar_like_entity_1 = require("./balas-komentar-like.entity");
let BalasKomentar = class BalasKomentar {
    id;
    reply;
    komentar_id;
    user_id;
    dibuat_pada;
    komentar;
    user;
    komentarBalasLike;
};
exports.BalasKomentar = BalasKomentar;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], BalasKomentar.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text' }),
    __metadata("design:type", String)
], BalasKomentar.prototype, "reply", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "komentar_id" }),
    __metadata("design:type", String)
], BalasKomentar.prototype, "komentar_id", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "user_id" }),
    __metadata("design:type", String)
], BalasKomentar.prototype, "user_id", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", String)
], BalasKomentar.prototype, "dibuat_pada", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => komentar_entity_1.Komentar, (komentar) => komentar.balasKomentar, { onDelete: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)({ name: "komentar_id" }),
    __metadata("design:type", komentar_entity_1.Komentar)
], BalasKomentar.prototype, "komentar", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User, (user) => user.balasKomentar, { onDelete: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)({ name: "user_id" }),
    __metadata("design:type", user_entity_1.User)
], BalasKomentar.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => balas_komentar_like_entity_1.BalasKomentarLikes, komentarBalasLike => komentarBalasLike.komentarBalas),
    __metadata("design:type", Array)
], BalasKomentar.prototype, "komentarBalasLike", void 0);
exports.BalasKomentar = BalasKomentar = __decorate([
    (0, typeorm_1.Entity)('balas_komentar')
], BalasKomentar);
