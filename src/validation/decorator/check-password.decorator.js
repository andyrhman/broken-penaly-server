"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IsEqualTo = IsEqualTo;
const class_validator_1 = require("class-validator");
function IsEqualTo(property, validationOptions) {
    return function (object, propertyName) {
        (0, class_validator_1.registerDecorator)({
            name: 'isEqualTo',
            target: object.constructor,
            propertyName: propertyName,
            constraints: [property],
            options: validationOptions,
            validator: {
                validate(value, args) {
                    const [relatedPropertyName] = args.constraints;
                    const relatedValue = args.object[relatedPropertyName];
                    return value === relatedValue;
                },
            },
        });
    };
}
