"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const db_config_1 = __importDefault(require("../config/db.config"));
const user_entity_1 = require("../entity/user.entity");
const abstract_service_1 = require("./abstract.service");
class UserService extends abstract_service_1.AbstractService {
    constructor() {
        super(db_config_1.default.getRepository(user_entity_1.User));
    }
    async chart(time) {
        let groupByClause;
        switch (time) {
            case 'day':
                groupByClause = "TO_CHAR(u.dibuat_pada, 'YYYY-MM-DD')";
                break;
            case 'week':
                groupByClause = "TO_CHAR(u.dibuat_pada, 'IYYY-IW')";
                break;
            case 'month':
                groupByClause = "TO_CHAR(u.dibuat_pada, 'YYYY-MM')";
                break;
            default:
                groupByClause = "TO_CHAR(u.dibuat_pada, 'YYYY-MM-DD')";
                break;
        }
        const query = `
        SELECT
        ${groupByClause} as date,
        COUNT(u.id) as count
        FROM pengguna u
        GROUP BY ${groupByClause}
        ORDER BY ${groupByClause} ASC;
        `;
        const result = await this.repository.query(query);
        return result;
    }
}
exports.UserService = UserService;
