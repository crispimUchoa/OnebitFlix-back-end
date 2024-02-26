import { Like } from "../models/Like"

export const likeServices = {
    create: async (userId: number, courseId: number) => {
        const like = await Like.create({userId, courseId})
        return like
    },
    delete: async (userId: number, courseId: number) => {
        await Like.destroy({where: {userId, courseId}})
    }
}