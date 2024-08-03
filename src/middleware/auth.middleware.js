"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthMiddleware = void 0;
const db_config_1 = __importDefault(require("../config/db.config"));
const user_entity_1 = require("../entity/user.entity");
const jsonwebtoken_1 = require("jsonwebtoken");
const AuthMiddleware = async (req, res, next) => {
    try {
        const jwt = req.cookies['user_session'];
        const payload = (0, jsonwebtoken_1.verify)(jwt, process.env.JWT_SECRET_ACCESS);
        if (!payload) {
            return res.status(401).send({
                message: "Unauthenticated"
            });
        }
        ;
        const repository = db_config_1.default.getRepository(user_entity_1.User);
        req["user"] = await repository.findOne({ where: { id: payload.id }, relations: ['role', 'role.permissions'] });
        next();
    }
    catch (error) {
        return res.status(401).send({
            message: "Unauthenticated"
        });
    }
};
exports.AuthMiddleware = AuthMiddleware;
