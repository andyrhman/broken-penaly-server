"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const nodemailer_1 = require("nodemailer");
const transporter = (0, nodemailer_1.createTransport)({
    // service: "gmail",
    // host: "smtp.gmail.com",
    // port: 465,
    // secure: true,
    // auth: {
    //     user: process.env.GMAIL_EMAIL,
    //     pass: process.env.GMAIL_PASSWORD,
    // },
    host: '0.0.0.0',
    port: 1025
});
exports.default = transporter;
