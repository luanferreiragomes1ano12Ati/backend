import express from "express"
import cors from "cors"
import mysql from "mysql2"

const { DATABASE_HOST, DATABASE_NAME, DATABASE_USER, DATABASE_PASSWORD } = process.env

const app = express()
const port = 3000

app.use(cors())
app.use(express.json())

const database = mysql.createPool({
    database: DATABASE_NAME,
    host: DATABASE_HOST,
    user: DATABASE_USER,
    password: DATABASE_PASSWORD,
    connectionLimit: 10
})


app.get("/", (request, response) => {
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


app.post("/login", (request, response) => {
    const { email, password } = request.body.user

    const selectCommand = "SELECT * FROM luanferreira_02mc WHERE email = ?"

    database.query(selectCommand, [email], (error, users) => {
        if (error) {
            console.log(error)
            return response.status(500).json({ message: "Erro ao buscar usuário" })
        }

       if (users.length === 0 || password !== users[0].password) {
            return response.json({ message: "Email ou senha incorretos!" })
        }

        response.json({ id: users[0].id, name: users[0].name })
    })
})

app.listen(port, () => {
    console.log(`Servidor rodando na porta: ${port}`)
})
