import express from "express"
import cors from "cors"
import { people } from "./people.js" 

const app = express()
const port = 3000;


app.use(cors())
app.use(express.json())

app.get("/", (request, response) => {
    response.json(people)
})

app.post("/cadastrar", (request, response) => {
    const { name, email, age, password } = request.body.user

    console.log(`
        Nome: ${name},
        E-mail: ${email},
        Age: ${age},
        Senha: ${password}
        `)

        response.status(201).json({ message: "Usuário cadastrado com sucesso!" })
})

app.listen(port,"0.0.0.0", () => {
    console.log(`Servidor rodando na porta: ${port}`)
}) 
