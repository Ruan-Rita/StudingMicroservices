import { NextFunction, Request, Response } from "express";
import { NotAuthorizedError } from "../errors/not-authorized-error";

export const requeireAuth = (request: Request, response: Response, next: NextFunction) => {

    if (!request.currentUser) {
        throw new NotAuthorizedError()
    }

    next()
}