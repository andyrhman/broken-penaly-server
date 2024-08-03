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
exports.UpdateRoleDTO = void 0;
// ? https://www.phind.com/search?cache=aww4upilaldpb6wgjnpww7lu
const class_validator_1 = require("class-validator");
class UpdateRoleDTO {
    nama;
    permissions;
}
exports.UpdateRoleDTO = UpdateRoleDTO;
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: "Nama harus diisi" }),
    (0, class_validator_1.IsString)({ message: "Nama harus string" }),
    __metadata("design:type", String)
], UpdateRoleDTO.prototype, "nama", void 0);
__decorate([
    (0, class_validator_1.ArrayNotEmpty)({ message: 'Permission harus diisi' }),
    (0, class_validator_1.ArrayMinSize)(1, { message: 'Permission harus minimal punya 1 item' }),
    (0, class_validator_1.IsInt)({ each: true, message: 'Permission harus huruf' }),
    __metadata("design:type", Array)
], UpdateRoleDTO.prototype, "permissions", void 0);
