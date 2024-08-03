"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const seeder_config_1 = __importDefault(require("../config/seeder.config"));
const tag_entity_1 = require("../entity/tag.entity");
seeder_config_1.default.initialize().then(async () => {
    const tagNames = [
        'Kesehatan', 'Produktivitas', 'Marketing', 'Artificial Intelligence', 'Programming', 'Gaming', 'Data Science', 'Edukasi', 'Religion', 'Ekonomi', 'Marketing', 'Travel'
    ];
    for (let i = 0; i < 12; i++) {
        await seeder_config_1.default.getRepository(tag_entity_1.Tag).save({
            nama: tagNames[i]
        });
    }
    console.log("🌱 Seeding has been completed");
    process.exit(0);
}).catch((err) => {
    console.error(err);
});
