import express, { Request, Response } from "express";
import { body } from "express-validator";

const router = express.Router();
router.get(`/api/user/signin`,
    [
        body('email')
            .isEmail()
            .withMessage('Must be email valid'),
        body('password').trim().notEmpty().withMessage('Password must be provided')
    ], (req: Request, res: Response) => {
        res.json({
            data: {
                name: {
                    first: "ruan",
                    last: "rita"
                }
            }
        })
    })

export { router as signinRoutes }