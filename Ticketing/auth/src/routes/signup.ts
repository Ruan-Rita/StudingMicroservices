import express, { Request, Response } from "express";
import { body, validationResult } from "express-validator";

const router = express.Router();
router.post(`/api/user/signup`, [
    body('email').isEmail().withMessage('Email must be valid'),
    body('password').trim().isLength({ min: 4, max: 20 }).withMessage('Password must be between 4 and 20 characters')
], (req: Request, res: Response) => {
    const { email, password } = req.body
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
        throw new Error('Something went wrong')
        // return res.status(400).json({
        //     status: 400,
        //     data: errors.array()
        // })
    }


})

export { router as signupRoutes }