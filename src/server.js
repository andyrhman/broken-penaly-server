"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv").config();
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const db_config_1 = __importDefault(require("./config/db.config"));
const routes_1 = require("./routes");
const validation_middleware_1 = require("./middleware/validation.middleware");
const apperror_utility_1 = require("./utility/apperror.utility");
const error_middleware_1 = require("./middleware/error.middleware");
// export const eventEmitter = new EventEmitter();
// import "./event/auth.listener"
// import "./event/order.listener"
process.on('uncaughtException', (err) => {
    console.error('UNCAUGHT EXCEPTION! Continuing...');
    if (process.env.NODE_ENV === 'development') {
        console.error(err);
    }
});
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cookie_parser_1.default)());
app.use(validation_middleware_1.ValidationMiddleware);
app.use((0, cors_1.default)({
    credentials: true,
    origin: [`${process.env.ORIGIN_1}`, `${process.env.ORIGIN_2}`],
}));
db_config_1.default
    .initialize()
    .then(async () => {
    (0, routes_1.routes)(app);
    // Handle undefined routes
    app.all('*', (req, res, next) => {
        next(new apperror_utility_1.AppError(`Can't find ${req.originalUrl} on this server!`, 404));
    });
    // Global error handling middleware
    app.use(error_middleware_1.globalErrorHandler);
    console.log("Database has been initialized!");
    const server = app.listen(8000, () => {
        console.log("Server listening on port 8000");
    });
    // Handle unhandled promise rejections
    process.on('unhandledRejection', (err) => {
        console.error('UNHANDLED REJECTION! Continuing...');
        if (process.env.NODE_ENV === 'development') {
            console.error(err);
        }
        // Manually trigger the global error handler
        app.use((req, res, next) => {
            next(err);
        });
    });
})
    .catch((err) => {
    console.error(err);
});
exports.default = app;
