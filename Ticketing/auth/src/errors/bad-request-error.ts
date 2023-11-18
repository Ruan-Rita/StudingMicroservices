import { CustomError } from "./custom-error"

export class BadRequestError extends CustomError {
    statusCode = 400

    constructor(public message: string) {
        super('Error connecting to database')
        // 
        Object.setPrototypeOf(this, BadRequestError.prototype)
    }

    serializeErrors() {
        return [{ message: this.message }]
    }
}