"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RoleService = void 0;
const abstract_service_1 = require("./abstract.service");
const role_entity_1 = require("../entity/role.entity");
const db_config_1 = __importDefault(require("../config/db.config"));
class RoleService extends abstract_service_1.AbstractService {
    constructor() {
        super(db_config_1.default.getRepository(role_entity_1.Role));
    }
}
exports.RoleService = RoleService;
