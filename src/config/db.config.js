"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const myDataSource = new typeorm_1.DataSource({
    type: "postgres",
    url: process.env.DATABASE_URL,
    entities: [
        "src/entity/*.ts"
    ],
    logging: false,
    synchronize: true
});
exports.default = myDataSource;
