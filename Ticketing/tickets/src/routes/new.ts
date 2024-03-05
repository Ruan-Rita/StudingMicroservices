import express, { Request, Response } from "express"
import { requireAuth } from '@sgticketing_2/common';

const router = express.Router();

router.post('/api/tickets', requireAuth, async (request: Request, response: Response) => {
    response.sendStatus(200)
})




export { router as createTicketRouter }