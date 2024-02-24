import { Request, Response } from "express";
import { categoryServices } from "../services/categoryServices";
import { getPaginationParams } from "../helpers/getPaginationParams";

export const categoriesController = {
    index: async (req: Request, res: Response) => {

        const [page, perPage] = getPaginationParams(req.query)
        
        try {
            const paginetedCategories = await categoryServices.findAllPagineted(page, perPage)
            
            return res.json(paginetedCategories)
        } catch (err) {
            if (err instanceof Error){
                return res.status(400).json({message: err.message})
            }
        }
    }
}