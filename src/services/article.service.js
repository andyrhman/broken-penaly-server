"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ArticleService = void 0;
const abstract_service_1 = require("./abstract.service");
const article_entity_1 = require("../entity/article.entity");
const db_config_1 = __importDefault(require("../config/db.config"));
class ArticleService extends abstract_service_1.AbstractService {
    constructor() {
        super(db_config_1.default.getRepository(article_entity_1.Article));
    }
    async chartPublishedArticles(time) {
        let groupByClause;
        switch (time) {
            case 'day':
                groupByClause = "TO_CHAR(a.dibuat_pada, 'YYYY-MM-DD')";
                break;
            case 'week':
                groupByClause = "TO_CHAR(a.dibuat_pada, 'IYYY-IW')"; // ISO Year-Week
                break;
            case 'month':
                groupByClause = "TO_CHAR(a.dibuat_pada, 'YYYY-MM')";
                break;
            default:
                groupByClause = "TO_CHAR(a.dibuat_pada, 'YYYY-MM-DD')";
                break;
        }
        const query = `
        SELECT
        ${groupByClause} as date,
        COUNT(a.id) as count
        FROM artikel a
        INNER JOIN publish_article_status aps ON a.id = aps.article_id
        WHERE aps.status = 'Diterbitkan'
        GROUP BY ${groupByClause}
        ORDER BY ${groupByClause} ASC;
        `;
        const result = await this.repository.query(query);
        return result;
    }
}
exports.ArticleService = ArticleService;
