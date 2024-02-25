import { Request, Response } from "express";
import { userServices } from "../services/userServices";
import bcrypt from 'bcrypt'

export const authController = {
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
    }
}