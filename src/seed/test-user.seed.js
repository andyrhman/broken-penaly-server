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
const user_entity_1 = require("../entity/user.entity");
const seeder_config_1 = __importDefault(require("../config/seeder.config"));
const argon2 = __importStar(require("argon2"));
seeder_config_1.default.initialize().then(async () => {
    const password = await argon2.hash("123123");
    let addCount = 1;
    for (let i = 0; i < 15; i++) {
        const roleId = (i % 3) + 1; // This will cycle through 1, 2, 3
        await seeder_config_1.default.getRepository(user_entity_1.User).save({
            namaLengkap: `test${addCount}`,
            username: `test${addCount}`,
            email: `test${addCount}@mail.com`,
            password,
            is_verified: true,
            role_id: roleId
        });
    }
    console.log("🌱 Seeding has been completed");
    process.exit(0);
}).catch((err) => {
    console.error(err);
});
