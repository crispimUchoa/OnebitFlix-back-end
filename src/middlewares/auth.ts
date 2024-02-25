import { NextFunction, Request, Response } from "express";
import { jwtServices } from "../services/jwtServices";
import { userServices } from "../services/userServices";
import { JwtPayload } from "jsonwebtoken";
import { User, UserInstance } from "../models/User";

export interface AuthenticatedRequest extends Request {
    user?: UserInstance | null
}

export function ensureAuth(req: AuthenticatedRequest, res: Response, next: NextFunction){
    const authorizationHeader = req.headers.authorization

    if(!authorizationHeader) return res.status(401).json({message: 'Não autorizado: nenhum token foi encontrado.'})
    

    const token = authorizationHeader.replace(/Bearer/, '').trim()

    jwtServices.verifyToken(token, async (err, decoded) => {
        if(err || typeof decoded === 'undefined') return res.status(401).json({
            message: 'Não autorizado: token inválido.'
        })

        const user = await userServices.findByEmail((decoded as JwtPayload).email)
            req.user = user
            next()

    })
}

export function ensureAuthViaQuery(req:AuthenticatedRequest, res: Response, next: NextFunction){
    const {token} = req.query

    if(!token) return res.status(401).json({message: 'Não autorizado: nenhum token foi encontrado.'})

    if(typeof token !== 'string') return res.status(400).json({message: 'Token deve ser do tipo string.'})

    jwtServices.verifyToken(token, async (err, decoded) => {
        if(err || typeof decoded === 'undefined') return res.status(401).json({
            message: 'Não autorizado: token inválido.'
        })

        const user = await userServices.findByEmail((decoded as JwtPayload).email)
        req.user = user
        next()
    })
}