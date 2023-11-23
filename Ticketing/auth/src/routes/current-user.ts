import express, { Request, Response } from "express";
import { currentUserMiddleware } from "../middlewares/current-user";

const router = express.Router();
router.get(`/api/user/currentuser`, currentUserMiddleware, (req: Request, res: Response) => {
    res.json({ currentUser: req.currentUser || null })
})

export { router as currentUserRoutes }