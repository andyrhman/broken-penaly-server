"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.formatValidationErrors = formatValidationErrors;
function formatValidationErrors(validationErrors) {
    const message = validationErrors.map(error => {
        // This will return only the first error message for each field
        return error.constraints ? Object.values(error.constraints)[0] : null;
    }).filter(error => error !== null); // Remove null values (fields without errors)
    return { message };
}
