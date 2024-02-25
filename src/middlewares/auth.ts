import { NextFunction, Request, Response } from "express";
import { jwtServices } from "../services/jwtServices";
import { userServices } from "../services/userServices";
import { JwtPayload } from "jsonwebtoken";
import { UserInstance } from "../models/User";

export interface AuthenticatedRequest extends Request {
    user?: UserInstance | null
}

export function ensureAuth(req: AuthenticatedRequest, res: Response, next: NextFunction){
    const authorizationHeader = req.headers.authorization

    if(!authorizationHeader) return res.status(401).json({message: 'Não autorizado: nenhum token foi encontrado.'})
    

    const token = authorizationHeader.replace(/Bearer/, '').trim()

    jwtServices.verifyToken(token, (err, decoded) => {
        if(err || typeof decoded === 'undefined') return res.status(401).json({
            message: 'Não autorizado: token inválido.'
        })

        userServices.findByEmail((decoded as JwtPayload).email).then(user=>{
            req.user = user
            next()
        })
    })
}