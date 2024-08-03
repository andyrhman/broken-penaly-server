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
exports.UpdatePassword = exports.UpdateInfo = exports.Logout = exports.AuthenticatedUser = exports.Login = exports.Register = void 0;
const db_config_1 = __importDefault(require("../config/db.config"));
const auth_service_1 = require("../services/auth.service");
const argon2 = __importStar(require("argon2"));
const user_entity_1 = require("../entity/user.entity");
const jsonwebtoken_1 = require("jsonwebtoken");
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
const register_dto_1 = require("../validation/dto/register.dto");
const validation_utility_1 = require("../utility/validation.utility");
const update_info_dto_1 = require("../validation/dto/update-info.dto");
const pengikut_entity_1 = require("../entity/pengikut.entity");
const Register = async (req, res) => {
    const body = req.body;
    const input = (0, class_transformer_1.plainToClass)(register_dto_1.RegisterDto, body);
    const validationErrors = await (0, class_validator_1.validate)(input);
    if (validationErrors.length > 0) {
        return res.status(400).json((0, validation_utility_1.formatValidationErrors)(validationErrors));
    }
    const userService = new auth_service_1.AuthService();
    const repositoryPengikut = db_config_1.default.getRepository(pengikut_entity_1.Pengikut);
    const emailExists = await userService.findByEmail(body.email.toLowerCase());
    const usernameExists = await userService.findByUsername(body.username.toLowerCase());
    if (emailExists || usernameExists) {
        return res.status(409).send({
            message: 'Email atau Username sudah terdaftar'
        });
    }
    const hashPassword = await argon2.hash(body.password);
    const user = await userService.create({
        namaLengkap: body.namaLengkap,
        username: body.username.toLowerCase(),
        email: body.email.toLowerCase(),
        password: hashPassword,
        role_id: 3
    });
    delete user.password;
    res.send(user);
};
exports.Register = Register;
const Login = async (req, res) => {
    const body = req.body;
    const repository = db_config_1.default.getRepository(user_entity_1.User);
    let user;
    // Check whether to find the user by email or username based on input.
    if (body.email) {
        user = await repository.findOne({
            where: { email: body.email },
            select: ["id", "password"],
        });
    }
    else if (body.username) {
        user = await repository.findOne({
            where: { username: body.username },
            select: ["id", "password"],
        });
    }
    if (!user) {
        return res.status(400).send({
            message: "Username atau Email tidak valid"
        });
    }
    if (!body.password) {
        return res.status(400).send({
            message: "Password tidak valid"
        });
    }
    if (!(await argon2.verify(user.password, body.password))) {
        return res.status(400).send({ message: "Password tidak valid" });
    }
    const rememberMe = body.rememberMe; // Assuming rememberMe is sent as a boolean in the body
    const maxAge = rememberMe ? 365 * 24 * 60 * 60 * 1000 : 24 * 60 * 60 * 1000; // 1 year or 1 day
    const token = (0, jsonwebtoken_1.sign)({ id: user.id }, process.env.JWT_SECRET_ACCESS, { expiresIn: '1d' });
    res.cookie('user_session', token, {
        httpOnly: true,
        maxAge: maxAge, // Set the maxAge based on rememberMe
        sameSite: 'strict',
        // secure: process.env.NODE_ENV === 'production' // Set secure if in production
        // domain: 'yourdomain.com', // If cookie was set with specific domain
    });
    return res.send({
        message: "Berhasil Masuk!"
    });
};
exports.Login = Login;
const AuthenticatedUser = async (req, res) => {
    if (!req["user"]) {
        // Handle the case where user is not set
        return res.status(401).send({ message: "Unauthenticated" });
    }
    const { password, ...user } = req["user"];
    res.send(user);
};
exports.AuthenticatedUser = AuthenticatedUser;
const Logout = async (req, res) => {
    res.cookie('user_session', '', {
        sameSite: 'strict',
        maxAge: 0,
        // secure: process.env.NODE_ENV === 'production' // Set secure if in production
        // domain: 'yourdomain.com', // If cookie was set with specific domain
    });
    res.send({
        message: "Success"
    });
};
exports.Logout = Logout;
const UpdateInfo = async (req, res) => {
    const user = req["user"];
    const body = req.body;
    const input = (0, class_transformer_1.plainToClass)(update_info_dto_1.UpdateInfoDTO, body);
    const validationErrors = await (0, class_validator_1.validate)(input);
    if (validationErrors.length > 0) {
        return res.status(400).json((0, validation_utility_1.formatValidationErrors)(validationErrors));
    }
    const userService = db_config_1.default.getRepository(user_entity_1.User);
    const existingUser = await userService.findOne({ where: { id: user.id } });
    if (req.body.namaLengkap) {
        existingUser.namaLengkap = req.body.namaLengkap;
    }
    if (req.body.foto) {
        existingUser.foto = req.body.foto;
    }
    if (req.body.bio) {
        existingUser.bio = req.body.bio;
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
    await userService.update(user.id, existingUser);
    const { password, ...data } = await userService.findOne({ where: { id: user.id } });
    res.send(data);
};
exports.UpdateInfo = UpdateInfo;
const UpdatePassword = async (req, res) => {
    const user = req["user"];
    if (req.body.password !== req.body.password_confirm) {
        return res.status(400).send({
            message: "Password tidak sama"
        });
    }
    else if (!req.body.password || !req.body.password_confirm) {
        return res.status(400).send({
            message: "Password tidak sama"
        });
    }
    const repository = db_config_1.default.getRepository(user_entity_1.User);
    await repository.update(user.id, {
        password: await argon2.hash(req.body.password)
    });
    const { password, ...data } = await repository.findOne({ where: { id: user.id } });
    res.send(data);
};
exports.UpdatePassword = UpdatePassword;
