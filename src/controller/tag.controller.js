"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeleteTag = exports.GetTagArticle = exports.GetTag = exports.UpdateTag = exports.CreateTag = exports.Tags = void 0;
const db_config_1 = __importDefault(require("../config/db.config"));
const tag_entity_1 = require("../entity/tag.entity");
const class_transformer_1 = require("class-transformer");
const create_tag_dto_1 = require("../validation/dto/create-tag.dto");
const class_validator_1 = require("class-validator");
const validation_utility_1 = require("../utility/validation.utility");
const update_tag_dto_copy_1 = require("../validation/dto/update-tag.dto copy");
// * Get all tags
const Tags = async (req, res) => {
    const tagRepository = db_config_1.default.getRepository(tag_entity_1.Tag);
    let tags = await tagRepository.find();
    if (req.query.search) {
        const search = req.query.search.toString().toLowerCase();
        tags = tags.filter(p => p.nama.toLowerCase().indexOf(search) >= 0);
    }
    res.send(tags);
};
exports.Tags = Tags;
// * Create Tag
const CreateTag = async (req, res) => {
    const body = req.body;
    const input = (0, class_transformer_1.plainToClass)(create_tag_dto_1.CreateTagDto, body);
    const validationErrors = await (0, class_validator_1.validate)(input);
    if (validationErrors.length > 0) {
        return res.status(400).json((0, validation_utility_1.formatValidationErrors)(validationErrors));
    }
    const repository = db_config_1.default.getRepository(tag_entity_1.Tag);
    const checkTag = await repository.findOne({ where: { nama: body.nama } });
    if (checkTag) {
        return res.status(409).send({
            message: 'Tag dengan nama ini sudah ada'
        });
    }
    const tag = await repository.save(body);
    res.status(201).send(tag);
};
exports.CreateTag = CreateTag;
// * Update Tag
const UpdateTag = async (req, res) => {
    const body = req.body;
    const input = (0, class_transformer_1.plainToClass)(update_tag_dto_copy_1.UpdateTagDto, body);
    const validationErrors = await (0, class_validator_1.validate)(input);
    if (validationErrors.length > 0) {
        return res.status(400).json((0, validation_utility_1.formatValidationErrors)(validationErrors));
    }
    if (!(0, class_validator_1.isUUID)(req.params.id)) {
        return res.status(400).send({ message: "Request tidak valid" });
    }
    const repository = db_config_1.default.getRepository(tag_entity_1.Tag);
    const checkTag = await repository.findOne({ where: { id: req.params.id } });
    if (req.body.nama && req.body.nama !== checkTag.nama) {
        const checkNamaTag = await repository.findOne({ where: { nama: req.body.nama } });
        if (checkNamaTag) {
            return res.status(409).send({ message: "Tag dengan nama ini sudah ada" });
        }
        checkTag.nama = req.body.nama;
    }
    await repository.update(req.params.id, checkTag);
    const data = await repository.findOne({ where: { id: req.params.id } });
    res.status(202).send(data);
};
exports.UpdateTag = UpdateTag;
// * Get Tag
const GetTag = async (req, res) => {
    if (!(0, class_validator_1.isUUID)(req.params.id)) {
        return res.status(400).send({ message: "Tidak Diizinkan" });
    }
    const tagService = db_config_1.default.getRepository(tag_entity_1.Tag);
    const tag = await tagService.findOne({ where: { id: req.params.id } });
    res.send(tag);
};
exports.GetTag = GetTag;
// * Get tag with article
const GetTagArticle = async (req, res) => {
    const tagService = db_config_1.default.getRepository(tag_entity_1.Tag);
    const tag = await tagService.findOne({ where: { nama: req.params.nama }, relations: ['article'] });
    if (!tag) {
        return res.status(404).send({ message: "Tag tidak ditemukan" });
    }
    res.send(tag);
};
exports.GetTagArticle = GetTagArticle;
// * Hapus Tag
const DeleteTag = async (req, res) => {
    if (!(0, class_validator_1.isUUID)(req.params.id)) {
        return res.status(400).send({ message: "Tidak Diizinkan" });
    }
    const tagService = db_config_1.default.getRepository(tag_entity_1.Tag);
    await tagService.delete(req.params.id);
    res.status(204).send(null);
};
exports.DeleteTag = DeleteTag;
