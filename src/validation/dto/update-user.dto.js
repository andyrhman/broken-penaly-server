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
exports.UpdateUserDTO = void 0;
const class_validator_1 = require("class-validator");
class UpdateUserDTO {
    namaLengkap;
    foto;
    username;
    email;
    role_id;
}
exports.UpdateUserDTO = UpdateUserDTO;
__decorate([
    (0, class_validator_1.IsString)({ message: 'Nama Lengkap Harus String' }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateUserDTO.prototype, "namaLengkap", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateUserDTO.prototype, "foto", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.Length)(3, 30, { message: 'Username harus ada di antara 3 and 30 huruf' }),
    __metadata("design:type", String)
], UpdateUserDTO.prototype, "username", void 0);
__decorate([
    (0, class_validator_1.IsEmail)({}, { message: 'Email tidak valid' }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateUserDTO.prototype, "email", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], UpdateUserDTO.prototype, "role_id", void 0);