import { Request, Response } from "express";
import fs from "fs";
import path from "path";
import { episodeServices } from "../services/episodeServices";
import { AuthenticatedRequest } from "../middlewares/auth";

export const episodesController = {
    //GET /episodes/stream?videoUrl=
    stream: async (req: Request, res: Response) => {
        const {videoUrl} = req.query

        try {
            if (typeof videoUrl !== 'string') throw new Error('videoUrl param must be of type string')

            const range = req.headers.range

            episodeServices.streamEpisodeToResponse(res,videoUrl, range)

            
        } catch (err) {
            if (err instanceof Error){
                return res.status(400).json({message: err.message})
            }   
        }
    },
    //GET /episodes/:id/watchTime
    getWatchTime: async (req: AuthenticatedRequest, res: Response) => {
        const userId = req.user!.id
        const episodeId = +req.params.id

        try {
            const watchTime = await episodeServices.getWatchTime(userId, episodeId)
            return res.json(watchTime)
        } catch (err) {
            if (err instanceof Error) return res.status(400).json({message: err.message})
        }
    },
    //POST /episodes/:id/watchTime
    setWatchTime: async (req: AuthenticatedRequest, res: Response) => {
        const userId = req.user!.id
        const episodeId = +req.params.id
        const {seconds} = req.body

        try {
            const watchTime = await episodeServices.setWatchTime({seconds,userId, episodeId})
            return res.json(watchTime)
        } catch (err) {
            if (err instanceof Error) return res.status(400).json({message: err.message})
        }
    }
}