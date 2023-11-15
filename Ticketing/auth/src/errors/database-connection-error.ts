import { ValidationError } from "express-validator";

export class DatabaseConnectionError extends Error {
    reason = 'Error connecting to database'

    constructor(public errors: ValidationError[]) {
        super()
        // 
        Object.setPrototypeOf(this, DatabaseConnectionError.prototype)
    }
}