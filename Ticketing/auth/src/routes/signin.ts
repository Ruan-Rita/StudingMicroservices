import express, { Request, Response } from "express";
import { body, validationResult } from "express-validator";
import { RequestValidationError } from "../errors/request-validation-error";
import { validateRequest } from "../middlewares/validate-request";

const router = express.Router();
router.post(`/api/user/signin`,
    [
        body('email')
            .isEmail()
            .withMessage('Must be email valid'),
        body('password').trim().notEmpty().withMessage('Password must be provided')
    ], validateRequest, async (req: Request, res: Response) => {
        const { email, password } = req.body

        res.send({})
    })

export { router as signinRoutes }