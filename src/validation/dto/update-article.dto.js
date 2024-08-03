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
exports.UpdateArticleDto = void 0;
const class_validator_1 = require("class-validator");
class UpdateArticleDto {
    title;
    deskripsi_kecil;
    deskripsi_panjang;
    estimasi_membaca;
    gambar;
    tag_id;
}
exports.UpdateArticleDto = UpdateArticleDto;
__decorate([
    (0, class_validator_1.IsString)({ message: 'Nama Artikel harus string' }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateArticleDto.prototype, "title", void 0);
__decorate([
    (0, class_validator_1.IsString)({ message: 'Deskripsi harus string' }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateArticleDto.prototype, "deskripsi_kecil", void 0);
__decorate([
    (0, class_validator_1.IsString)({ message: 'Konten harus string' }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateArticleDto.prototype, "deskripsi_panjang", void 0);
__decorate([
    (0, class_validator_1.IsString)({ message: 'Estimasi baca harus string' }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateArticleDto.prototype, "estimasi_membaca", void 0);
__decorate([
    (0, class_validator_1.IsString)({ message: 'Gambar harus string' }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateArticleDto.prototype, "gambar", void 0);
__decorate([
    (0, class_validator_1.IsUUID)('4', { message: 'Request tidak valid' }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateArticleDto.prototype, "tag_id", void 0);
