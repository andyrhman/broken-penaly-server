"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeleteUser = exports.GetUser = exports.UpdateUser = exports.CreateUser = exports.Users = void 0;
const db_config_1 = __importDefault(require("../config/db.config"));
const user_entity_1 = require("../entity/user.entity");
const class_transformer_1 = require("class-transformer");
const create_user_dto_1 = require("../validation/dto/create-user.dto");
const class_validator_1 = require("class-validator");
const validation_utility_1 = require("../utility/validation.utility");
const argon2 = __importStar(require("argon2"));
const role_entity_1 = require("../entity/role.entity");
const update_user_dto_1 = require("../validation/dto/update-user.dto");
const Users = async (req, res) => {
    const userRepository = db_config_1.default.getRepository(user_entity_1.User);
    let users = await userRepository.find({ order: { dibuat_pada: "DESC" }, relations: ['role'] });
    if (req.query.search) {
        const search = req.query.search.toString().toLowerCase();
        users = users.filter(p => p.namaLengkap.toLowerCase().indexOf(search) >= 0 ||
            p.username.toLowerCase().indexOf(search) >= 0);
    }
    res.send(users);
};
exports.Users = Users;
const CreateUser = async (req, res) => {
    const body = req.body;
    const input = (0, class_transformer_1.plainToClass)(create_user_dto_1.CreateUserDTO, body);
    const validationErrors = await (0, class_validator_1.validate)(input);
    if (validationErrors.length > 0) {
        return res.status(400).json((0, validation_utility_1.formatValidationErrors)(validationErrors));
    }
    const userService = db_config_1.default.getRepository(user_entity_1.User);
    const emailExists = await userService.findOne({ where: { email: body.email.toLowerCase() } });
    const usernameExists = await userService.findOne({ where: { username: body.username.toLowerCase() } });
    if (emailExists || usernameExists) {
        return res.status(409).send({
            message: 'Email atau Username sudah terdaftar'
        });
    }
    const roleService = db_config_1.default.getRepository(role_entity_1.Role);
    const checkRole = await roleService.findOne({ where: { id: body.role_id } });
    if (!checkRole) {
        return res.status(409).send({
            message: 'Role tidak ditemukan'
        });
    }
    const hashedPassword = await argon2.hash('123456');
    const user = await userService.save({
        namaLengkap: body.namaLengkap,
        username: body.username.toLowerCase(),
        email: body.email.toLowerCase(),
        password: hashedPassword,
        role: {
            id: body.role_id
        }
    });
    delete user.password;
    res.status(201).send(user);
};
exports.CreateUser = CreateUser;
const UpdateUser = async (req, res) => {
    const body = req.body;
    const input = (0, class_transformer_1.plainToClass)(update_user_dto_1.UpdateUserDTO, body);
    const validationErrors = await (0, class_validator_1.validate)(input);
    if (validationErrors.length > 0) {
        return res.status(400).json((0, validation_utility_1.formatValidationErrors)(validationErrors));
    }
    if (!(0, class_validator_1.isUUID)(req.params.id)) {
        return res.status(400).send({ message: "Request tidak valid" });
    }
    const userService = db_config_1.default.getRepository(user_entity_1.User);
    const roleService = db_config_1.default.getRepository(role_entity_1.Role);
    const existingUser = await userService.findOne({ where: { id: req.params.id } });
    if (req.body.namaLengkap) {
        existingUser.namaLengkap = req.body.namaLengkap;
    }
    if (req.body.foto) {
        existingUser.foto = req.body.foto;
    }
    if (req.body.email && req.body.email !== existingUser.email) {
        const existingUserByEmail = await userService.findOne({ where: { email: req.body.email } });
        if (existingUserByEmail) {
            return res.status(409).send({ message: "Email sudah terdaftar" });
        }
        existingUser.email = req.body.email;
    }
    if (req.body.username && req.body.username !== existingUser.username) {
        const existingUserByUsername = await userService.findOne({ where: { username: req.body.username } });
        if (existingUserByUsername) {
            return res.status(409).send({ message: "Username sudah terdaftar" });
        }
        existingUser.username = req.body.username;
    }
    if (req.body.role_id) {
        const role = await roleService.findOne({ where: { id: req.body.role_id } });
        if (!role) {
            return res.status(404).send({ message: 'Role tidak ditemukan' });
        }
        existingUser.role_id = req.body.role_id;
    }
    await userService.update(req.params.id, existingUser);
    const data = await userService.findOne({ where: { id: req.params.id }, relations: ['role'] });
    res.status(202).send(data);
};
exports.UpdateUser = UpdateUser;
const GetUser = async (req, res) => {
    if (!(0, class_validator_1.isUUID)(req.params.id)) {
        return res.status(400).send({ message: "Tidak Diizinkan" });
    }
    const userService = db_config_1.default.getRepository(user_entity_1.User);
    const user = await userService.findOne({ where: { id: req.params.id }, relations: ['role'] });
    res.send(user);
};
exports.GetUser = GetUser;
const DeleteUser = async (req, res) => {
    if (!(0, class_validator_1.isUUID)(req.params.id)) {
        return res.status(400).send({ message: "Tidak Diizinkan" });
    }
    const userService = db_config_1.default.getRepository(user_entity_1.User);
    await userService.delete(req.params.id);
    res.status(204).send(null);
};
exports.DeleteUser = DeleteUser;
