import { Response } from "express";
import { AuthenticatedRequest } from "../middlewares/auth";
import { userServices } from "../services/userServices";

export const usersController = {
    //GET /user/current
    show: async (req: AuthenticatedRequest, res: Response) => {
         try {
            const currentUser = req.user!
            return res.json(currentUser)
        } catch (err) {
            if (err instanceof Error) return res.status(400).json({message: err.message})  
        }
    },
    //PUT users/current
    update: async (req: AuthenticatedRequest, res:Response)=>{
        const {id} = req.user!
        const {firstName, lastName, birth, email, phone} = req.body

        try {
            const updatedUser = await userServices.update(id, {firstName, lastName, phone, birth, email})
            return res.json(updatedUser)
        } catch (err) {
            if (err instanceof Error) return res.status(400).json({message: err.message}) 
        }
    },

    //PUT user/current/password
    updatePassword: async (req: AuthenticatedRequest, res:Response) => {
        const user = req.user!
        const {currentPassword, newPassword} = req.body

        user.checkPassword(currentPassword, async (err, isSame) => {

            try {
                if(err) return res.status(400).json({message: 'Erro de verificação.'})
                if(!isSame) return res.status(400).json({message: 'Senha incorreta.'})
                await userServices.updatePassword(user.id, newPassword)
                
                return res.status(204).send()
            } catch (err) {
                if (err instanceof Error) return res.status(400).json({message: err.message})
            }
        })
         },
    //GET /user/current/watching
    watching: async (req: AuthenticatedRequest, res: Response) => {
        const id = req.user!.id
        
        try {
            const watching = await userServices.getKeepWatchingList(id)
        return res.json(watching)
        } catch (err) {
            if (err instanceof Error) return res.status(400).json({message: err.message})
        }
    }
}