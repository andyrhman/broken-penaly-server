"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require('dotenv').config();
const typeorm_1 = require("typeorm");
const seederSource = new typeorm_1.DataSource({
    type: "postgres",
    url: process.env.DATABASE_URL,
    entities: [
        "src/entity/*.ts"
    ],
    logging: false,
    synchronize: process.env.NODE_ENV === 'development'
    // ssl: true,
});
exports.default = seederSource;
