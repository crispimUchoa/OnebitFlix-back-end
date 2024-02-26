import { Response } from "express";
import path from "path";
import fs from 'fs'
import { WatchTime } from "../models";
import { WatchTimeAttributes } from "../models/WatchTime";
import { where } from "sequelize";

export const episodeServices = {
    streamEpisodeToResponse: (res: Response, videoUrl: string, range: string | undefined) => {
        const filePath = path.join(__dirname, '..', '..', 'uploads', videoUrl)
        const fileStat = fs.statSync(filePath)

        if(range) {
            const parts = range.replace(/bytes=/, '').split('-')

            const start = parseInt(parts[0], 10)
            const end = parts[1] ? parseInt(parts[1], 10): fileStat.size - 1

            const chunkSize = (end - start) + 1

            const file = fs.createReadStream(filePath, {start, end})

            const head = {
                'Content-Range': `bytes ${start}-${end}/${fileStat.size}`,
                'Accept-Ranges': 'bytes',
                'Content-Length': chunkSize,
                'Content-Type': 'video/mp4'
            }

            res.writeHead(206, head)

            file.pipe(res)
        } else {
            const head = {
                'Content-Length': fileStat.size,
                'Content-Type': 'video/mp4'
            }

            res.writeHead(200, head)

            fs.createReadStream(filePath).pipe(res)
        }
    },
    getWatchTime: async (userId:number, episodeId: number) => {
        const watchTime = await WatchTime.findOne({where: {userId, episodeId}, attributes: ['seconds']})
        return watchTime
    },
    setWatchTime: async ({seconds, userId, episodeId}: WatchTimeAttributes) => {
        const watchTimeAlreadyExists = await WatchTime.findOne({where: {userId, episodeId}})
        console.log('Aqui foi')
        if(watchTimeAlreadyExists){
            watchTimeAlreadyExists.seconds=seconds
            await watchTimeAlreadyExists.save()
            return watchTimeAlreadyExists
        }
        console.log('aqui tabmem')
        const watchTime = await WatchTime.create({seconds, userId, episodeId})
        console.log('e aqui')
        return watchTime
    }
}