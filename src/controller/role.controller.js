"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeleteRole = exports.UpdateRole = exports.GetRole = exports.CreateRole = exports.Roles = void 0;
const class_transformer_1 = require("class-transformer");
const role_entity_1 = require("../entity/role.entity");
const db_config_1 = __importDefault(require("../config/db.config"));
const update_role_dto_1 = require("../validation/dto/update-role.dto");
const class_validator_1 = require("class-validator");
const validation_utility_1 = require("../utility/validation.utility");
const parameters_utility_1 = require("../utility/parameters.utility");
const Roles = async (req, res) => {
    const repository = db_config_1.default.getRepository(role_entity_1.Role);
    let roles = await repository.find();
    if (req.query.search) {
        const search = req.query.search.toString().toLowerCase();
        roles = roles.filter(p => p.nama.toLowerCase().indexOf(search) >= 0);
    }
    res.send(roles);
};
exports.Roles = Roles;
const CreateRole = async (req, res) => {
    const { nama, permissions } = req.body;
    const input = (0, class_transformer_1.plainToClass)(update_role_dto_1.UpdateRoleDTO, req.body);
    const validationErrors = await (0, class_validator_1.validate)(input);
    if (validationErrors.length > 0) {
        return res.status(400).json((0, validation_utility_1.formatValidationErrors)(validationErrors));
    }
    const repository = db_config_1.default.getRepository(role_entity_1.Role);
    const role = await repository.save({
        nama,
        permissions: permissions.map((id) => {
            return {
                id: id
            };
        })
    });
    res.status(201).send(role);
};
exports.CreateRole = CreateRole;
const GetRole = async (req, res) => {
    const repository = db_config_1.default.getRepository(role_entity_1.Role);
    const id = parseInt(req.params.id, 10);
    res.send(await repository.findOne({ where: { id }, relations: ['permissions'] }));
};
exports.GetRole = GetRole;
const UpdateRole = async (req, res) => {
    const repository = db_config_1.default.getRepository(role_entity_1.Role);
    const { name, permissions } = req.body;
    const input = (0, class_transformer_1.plainToClass)(update_role_dto_1.UpdateRoleDTO, req.body);
    const validationErrors = await (0, class_validator_1.validate)(input);
    if (validationErrors.length > 0) {
        return res.status(400).json((0, validation_utility_1.formatValidationErrors)(validationErrors));
    }
    const role = await repository.save({
        id: parseInt(req.params.id),
        name,
        permissions: permissions.map((id) => {
            return {
                id: id
            };
        })
    });
    res.status(202).send(role);
};
exports.UpdateRole = UpdateRole;
const DeleteRole = async (req, res) => {
    if (!(0, parameters_utility_1.isInteger)(req.params.id)) {
        return res.status(400).send({ message: "Invalid Request" });
    }
    const repository = db_config_1.default.getRepository(role_entity_1.Role);
    await repository.delete(req.params.id);
    res.status(204).send(null);
};
exports.DeleteRole = DeleteRole;
