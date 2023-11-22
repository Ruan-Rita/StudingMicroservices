import express, { Request, Response } from "express";
import jwt from 'jsonwebtoken'

const router = express.Router();
router.get(`/api/user/currentuser`, (req: Request, res: Response) => {
    if (req.session?.jwt) {

        return res.json({ currentUser: {} })
    }

    try {
        const payload = jwt.verify(req.session?.jwt, process.env.JWT_KEY!)
        res.json({ currentUser: payload })

    } catch (error) {
        return res.json({ currentUser: {} })
    }

})

export { router as currentUserRoutes }