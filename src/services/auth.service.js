"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const abstract_service_1 = require("./abstract.service");
const user_entity_1 = require("../entity/user.entity");
const db_config_1 = __importDefault(require("../config/db.config"));
class AuthService extends abstract_service_1.AbstractService {
    constructor() {
        super(db_config_1.default.getRepository(user_entity_1.User));
    }
    // Find a user by their username or email
    async findByUsernameOrEmail(username, email) {
        return this.repository.findOne({
            where: [{ username }, { email }],
        });
    }
}
exports.AuthService = AuthService;
