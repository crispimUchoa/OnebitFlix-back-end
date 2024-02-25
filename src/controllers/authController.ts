import { Request, Response } from "express";
import { userServices } from "../services/userServices";
import bcrypt from 'bcrypt'
import { jwtServices } from "../services/jwtServices";

export const authController = {
    //POST /auth/register
    register: async (req: Request, res: Response) => {
        const {firstName, lastName, email, password, phone, birth} = req.body

        try {
            const userAlreadyExists = await userServices.findByEmail(email)

            if(userAlreadyExists){
                throw new Error('Email já cadastrado!')
            }

            const user = await userServices.create({firstName, lastName, email, password, birth ,phone, role: 'user'})

            return res.status(201).json(user)
        } catch (err) {
            if (err instanceof Error){
                return res.status(400).json({message: err.message})
            }
        }
    },

    //POST /auth/login
    login: async (req: Request, res: Response) => {
        const {email, password} = req.body

        try {
            const user = await userServices.findByEmail(email)

            if(!user) return res.status(404).json({message: 'Email não registrado.'})

            user.checkPassword(password, (err, isSame) => {
                if (err) return res.status(400).json({message: err.message})

                if(!isSame) return res.status(401).json({message: 'Senha incorreta.'})

                const payload = {
                    id: user.id,
                    firstName: user.firstName,
                    email: user.email
                }
                const token = jwtServices.signToken(payload, '1d')

                return res.json({authenticated: true, ...payload, token})

            })
        } catch (err) {
            
        }
    }
}