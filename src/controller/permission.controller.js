"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Permissions = void 0;
const permission_entity_1 = require("../entity/permission.entity");
const db_config_1 = __importDefault(require("../config/db.config"));
const Permissions = async (req, res) => {
    const repository = db_config_1.default.getRepository(permission_entity_1.Permission);
    res.send(await repository.find());
};
exports.Permissions = Permissions;
