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
exports.RegisterDto = void 0;
const class_validator_1 = require("class-validator");
const check_password_decorator_1 = require("../decorator/check-password.decorator");
class RegisterDto {
    namaLengkap;
    username;
    email;
    password;
    password_confirm;
}
exports.RegisterDto = RegisterDto;
__decorate([
    (0, class_validator_1.IsString)({ message: 'Nama lengkap harus string' }),
    (0, class_validator_1.IsNotEmpty)({ message: "Nama lengkap tidak boleh kosong" }),
    __metadata("design:type", String)
], RegisterDto.prototype, "namaLengkap", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)({ message: "Username tidak boleh kosong" }),
    (0, class_validator_1.Length)(3, 30, { message: 'Username harus ada di antara 3 and 30 huruf' }),
    __metadata("design:type", String)
], RegisterDto.prototype, "username", void 0);
__decorate([
    (0, class_validator_1.IsEmail)({}, { message: 'Email tidak valid' }),
    (0, class_validator_1.IsNotEmpty)({ message: "Email tidak boleh kosong" }),
    __metadata("design:type", String)
], RegisterDto.prototype, "email", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Length)(6, undefined, { message: '    ' }),
    __metadata("design:type", String)
], RegisterDto.prototype, "password", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, check_password_decorator_1.IsEqualTo)('password', { message: 'Konfirmasi Password harus sama dengan Password' }),
    __metadata("design:type", String)
], RegisterDto.prototype, "password_confirm", void 0);
