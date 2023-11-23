import express, { Request, Response } from "express";

const router = express.Router();
router.post(`/api/user/signout`, (req: Request, res: Response) => {
    req.session = null
    res.json({})
})

export { router as signoutRoutes }