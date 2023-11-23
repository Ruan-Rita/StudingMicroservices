import { NextFunction, Request, Response } from "express";
import jwt from 'jsonwebtoken'

export interface UserPayload {
    id: number
    email: string
}



export const currentUserMiddleware = (request: Request, response: Response, next: NextFunction) => {
    if (!request.session?.jwt) {
        next()
    }

    try {
        const payload = jwt.verify(request.session?.jwt, process.env.JWT_KEY!) as UserPayload
        request.currentUser = payload
    } catch (error) { }

    next()
}