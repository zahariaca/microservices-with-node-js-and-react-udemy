import {ValidationError} from 'express-validator';
import {CustomError} from "./custom-error";

export class RequestValidationError extends CustomError {
    statusCode = 400;

    constructor(public errors: ValidationError[]) {
        super('Invalid request parameters');

        // only because we are extending a builtin class
        Object.setPrototypeOf(this, RequestValidationError.prototype);
    }

    serializeErrors() {
        return this.errors.map(error => {
            return {message: error.msg as string, field: error.type === "field" ? error.path : ""};
        });
    }
}