import express, { Request, Response } from "express";

const router = express.Router();
router.get(`/api/user/signup`, (req: Request, res: Response) => {
    const { email, password } = req.body

    if (!email || typeof email !== 'string') {
        res.status(400).json({
            data: 'Please, provide a valid email'
        })
    }
})

export { router as signupRoutes }