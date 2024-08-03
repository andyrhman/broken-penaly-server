"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DefaultProfile = exports.UploadUserImage = exports.UploadArticleImage = void 0;
const path_1 = require("path");
const multer_1 = __importDefault(require("multer"));
const UploadArticleImage = async (req, res) => {
    const storage = multer_1.default.diskStorage({
        destination: './uploads/articles',
        filename(_, file, callback) {
            const randomName = Math.random().toString(20).slice(2, 12);
            return callback(null, `${randomName}${(0, path_1.extname)(file.originalname)}`);
        }
    });
    const upload = (0, multer_1.default)({ storage }).single('image');
    upload(req, res, (err) => {
        if (err) {
            return res.status(400).send(err);
        }
        res.send({
            url: `http://localhost:8000/api/uploads/articles/${req.file.filename}`
        });
    });
};
exports.UploadArticleImage = UploadArticleImage;
const UploadUserImage = async (req, res) => {
    const storage = multer_1.default.diskStorage({
        destination: './uploads/users',
        filename(_, file, callback) {
            const randomName = Math.random().toString(20).slice(2, 12);
            return callback(null, `${randomName}${(0, path_1.extname)(file.originalname)}`);
        }
    });
    const upload = (0, multer_1.default)({ storage }).single('image');
    upload(req, res, (err) => {
        if (err) {
            return res.status(400).send(err);
        }
        res.send({
            url: `http://localhost:8000/api/uploads/users/${req.file.filename}`
        });
    });
};
exports.UploadUserImage = UploadUserImage;
const DefaultProfile = async (req, res) => {
    const storage = multer_1.default.diskStorage({
        destination: './uploads',
        filename(_, file, callback) {
            const randomName = Math.random().toString(20).slice(2, 12);
            return callback(null, `${randomName}${(0, path_1.extname)(file.originalname)}`);
        }
    });
    const upload = (0, multer_1.default)({ storage }).single('image');
    upload(req, res, (err) => {
        if (err) {
            return res.status(400).send(err);
        }
        res.send({
            url: `http://localhost:8000/api/uploads/${req.file.filename}`
        });
    });
};
exports.DefaultProfile = DefaultProfile;
