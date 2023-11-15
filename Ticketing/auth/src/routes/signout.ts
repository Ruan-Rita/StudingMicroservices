import express, { Request, Response } from "express";

const router = express.Router();
router.get(`/api/user/signout`, (req: Request, res: Response) => {
    res.json({
        data: {
            name: {
                first: "ruan",
                last: "rita"
            }
        }
    })
})

export { router as signoutRoutes }