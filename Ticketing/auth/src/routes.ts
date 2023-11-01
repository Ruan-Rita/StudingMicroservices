import { Request, Response, Router } from "express"

const defaultPrefix = '/api'

function getPrefix(prefix?: string) {
    return `${defaultPrefix}${(prefix && prefix.length > 0) ? prefix : ""}`
}

const Routes = (app: Router, prefix?: string) => {
    app.get(`${getPrefix(prefix)}/currentuser`, (req: Request, res: Response) => {
        res.json({
            data: {
                name: {
                    first: "ruan",
                    last: "rita"
                }
            }
        })
    })
    app.post(`${getPrefix(prefix)}/signup`, (req: Request, res: Response) => {
        res.json({
            data: {
                name: {
                    first: "ruan",
                    last: "rita"
                }
            }
        })
    })
    app.post(`${getPrefix(prefix)}/signin`, (req: Request, res: Response) => {
        res.json({
            data: {
                name: {
                    first: "ruan",
                    last: "rita"
                }
            }
        })
    })
    app.post(`${getPrefix(prefix)}/signout`, (req: Request, res: Response) => {
        res.json({
            data: {
                name: {
                    first: "ruan",
                    last: "rita"
                }
            }
        })
    })
}

export { Routes };
