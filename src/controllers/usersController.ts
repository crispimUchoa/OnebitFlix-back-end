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