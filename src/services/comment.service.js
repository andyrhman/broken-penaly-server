"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommentService = void 0;
const abstract_service_1 = require("./abstract.service");
const db_config_1 = __importDefault(require("../config/db.config"));
const komentar_entity_1 = require("../entity/komentar.entity");
const balas_komentar_entity_1 = require("../entity/balas-komentar.entity");
class CommentService extends abstract_service_1.AbstractService {
    constructor() {
        super(db_config_1.default.getRepository(komentar_entity_1.Komentar));
    }
    async totalComments() {
        const komentarRepository = db_config_1.default.getRepository(komentar_entity_1.Komentar);
        const balasKomentarRepository = db_config_1.default.getRepository(balas_komentar_entity_1.BalasKomentar);
        const [komentarCount, balasKomentarCount] = await Promise.all([
            komentarRepository.count(),
            balasKomentarRepository.count()
        ]);
        return komentarCount + balasKomentarCount;
    }
}
exports.CommentService = CommentService;
