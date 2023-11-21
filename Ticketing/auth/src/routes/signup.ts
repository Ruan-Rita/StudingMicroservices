import express, { Request, Response } from "express";
import { body, validationResult } from "express-validator";
import jwt from "jsonwebtoken";
import { BadRequestError } from "../errors/bad-request-error";
import { DatabaseConnectionError } from "../errors/database-connection-error";
import { RequestValidationError } from "../errors/request-validation-error";
import { validateRequest } from "../middlewares/validate-request";
import { User } from "../models/user";

const router = express.Router();
router.post(`/api/user/signup`, [
    body('email').isEmail().withMessage('Email must be valid'),
    body('password').trim().isLength({ min: 4, max: 20 }).withMessage('Password must be between 4 and 20 characters')
], validateRequest, async (req: Request, res: Response) => {
    const { email, password } = req.body

    if (await User.findOne({ email })) {
        throw new BadRequestError('Email in use!')
    }

    const user = User.build({ email, password })
    await user.save()

    // Generate jwt
    const userJwt = jwt.sign({
        id: user.id,
        email: user.email,
    }, process.env.JWT_KEY!)

    console.log(' user token', userJwt);
    console.log(' process.env.JWT_KEY', process.env.JWT_KEY);

    // store in the session
    req.session = {
        jwt: userJwt
    }

    return res.status(201).json(user)

})

export { router as signupRoutes }