import { NextFunction, Request, Response } from "express";
import { CustomError } from "../errors/custom-error";

export function errorHandler(error: Error, request: Request, response: Response, next: NextFunction) {
    console.log('heellooo');
    if (error instanceof CustomError) {
        return response.status(error.statusCode).json({ errors: error.serializeErrors() })
    }

    response.status(400).send({ errors: [{ message: 'Something went wrong' }] });
}