import express, { Request, Response } from "express";
import { body } from "express-validator";
import { BadRequestError } from "../errors/bad-request-error";
import { validateRequest } from "../middlewares/validate-request";
import { User } from "../models/user";
import { Password } from "../services/password-service";
import jwt from 'jsonwebtoken'

const router = express.Router();
router.post(`/api/user/signin`,
    [
        body('email')
            .isEmail()
            .withMessage('Must be email valid'),
        body('password').trim().notEmpty().withMessage('Password must be provided')
    ], validateRequest, async (req: Request, res: Response) => {
        const { email, password } = req.body

        const user = await User.findOne({ email })
        if (!user) {
            throw new BadRequestError('Invalid credentials!')
        }
        if (!await Password.compare(user.password, password)) {
            throw new BadRequestError('Invalid credentials!')
        }

        // Generate jwt
        const userJwt = jwt.sign({
            id: user.id,
            email: user.email,
        }, process.env.JWT_KEY!)

        // store in the session
        req.session = {
            jwt: userJwt
        }

        return res.status(200).json(user)
    })

export { router as signinRoutes }