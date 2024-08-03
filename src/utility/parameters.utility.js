"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isInteger = isInteger;
function isInteger(value) {
    const num = parseInt(value, 10);
    // Check if the number is an integer and within the range of PostgreSQL integer
    return !isNaN(num) && value === num.toString() && num >= -2147483648 && num <= 2147483647;
}
