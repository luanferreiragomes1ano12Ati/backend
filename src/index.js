import express from "express"
import cors from "cors"
import mysql from "mysql2"

const { DATABASE_HOST, DATABASE_NAME, DATABASE_USER, DATABASE_PASSWORD } = process.env

const app = express()
const port = 3000

app.use(cors())
app.use(express.json())

// 🔹 Cria a pool ANTES das rotas
const database = mysql.createPool({
    database: DATABASE_NAME,
    host: DATABASE_HOST,
    user: DATABASE_USER,
    password: DATABASE_PASSWORD,
    connectionLimit: 10
})

app.get("/", (request, response) => {
    // ⚠️ Remova a vírgula extra depois de "email"
    const selectCommand = "SELECT name, email, age FROM luanferreira_02mc"

    database.query(selectCommand, (error, users) => {
        if (error) {
            console.log(error)
            return response.status(500).json({ message: "Erro ao buscar usuários" })
        }

        response.json(users)
    })
})

app.post("/cadastrar", (request, response) => {
    const { name, email, age, password } = request.body.user

    const insertCommand = `
       INSERT INTO luanferreira_02mc(name, email, age, password)
       VALUES(?, ?, ?, ?)
    `
    database.query(insertCommand, [name, email, age, password], (error) => {
        if (error) {
            console.log(error)
            return response.status(500).json({ message: "Erro ao cadastrar usuário" })
        }

        response.status(201).json({ message: "Usuário cadastrado com sucesso!" })
    })
})

app.listen(port, () => {
    console.log(`Servidor rodando na porta: ${port}`)
})
