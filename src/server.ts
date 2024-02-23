import express from "express"
import { sequelize } from "../database"
const app = express()

const PORT = process.env.PORT || 3000

app.listen(PORT, ()=>{
    sequelize.authenticate().then(()=>{
        console.log('DB connections sucessfull')
    })
    console.log(`Server started sucessfuly at port ${PORT}`)
})