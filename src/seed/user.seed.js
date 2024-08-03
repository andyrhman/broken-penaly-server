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
const faker_1 = require("@faker-js/faker");
const user_entity_1 = require("../entity/user.entity");
const seeder_config_1 = __importDefault(require("../config/seeder.config"));
const argon2 = __importStar(require("argon2"));
seeder_config_1.default.initialize().then(async () => {
    const password = await argon2.hash("123123");
    for (let i = 0; i < 30; i++) {
        await seeder_config_1.default.getRepository(user_entity_1.User).save({
            namaLengkap: faker_1.fakerID_ID.person.fullName(),
            username: faker_1.fakerID_ID.internet.userName().toLowerCase(),
            email: faker_1.fakerID_ID.internet.email().toLowerCase(),
            password,
            role_id: 3
        });
    }
    console.log("🌱 Seeding has been completed");
    process.exit(0);
}).catch((err) => {
    console.error(err);
});
