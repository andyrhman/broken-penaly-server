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
exports.UpdateArticleStatusDTO = void 0;
const class_validator_1 = require("class-validator");
const article_publish_entity_1 = require("../../entity/article-publish.entity");
class UpdateArticleStatusDTO {
    status;
    user_id;
}
exports.UpdateArticleStatusDTO = UpdateArticleStatusDTO;
__decorate([
    (0, class_validator_1.IsEnum)(article_publish_entity_1.Status, { message: 'Status artikel tidak valid' }),
    (0, class_validator_1.IsNotEmpty)({ message: "Status tidak boleh kosong" }),
    __metadata("design:type", String)
], UpdateArticleStatusDTO.prototype, "status", void 0);
__decorate([
    (0, class_validator_1.IsUUID)('4', { message: 'Request tidak valid' }),
    (0, class_validator_1.IsNotEmpty)({ message: "User tidak boleh kosong" }),
    __metadata("design:type", String)
], UpdateArticleStatusDTO.prototype, "user_id", void 0);
