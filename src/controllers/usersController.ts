import { Response } from "express";
import { AuthenticatedRequest } from "../middlewares/auth";
import { userServices } from "../services/userServices";

export const usersController = {
    //GET /user/current/watching
    watching: async (req: AuthenticatedRequest, res: Response) => {
        const id = req.user!.id
        const watching = await userServices.getKeepWatchingList(id)
        return res.json(watching)
    }
}