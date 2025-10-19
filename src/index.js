import express from "express"
import cors from "cors"
import { people } from "./people.js" 

const app = express()
const port = 3000;


app.use(cors())

app.get("/", (request, response) => {
    response.json(people)
})

app.listen(port,"0.0.0.0", () => {
    console.log(`Servidor rodando na porta: ${port}`)
}) 
