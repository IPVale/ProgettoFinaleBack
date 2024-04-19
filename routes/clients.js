import Router from "express"
import { PrismaClient, Prisma } from "@prisma/client"
import { generateToken, authenticateToken } from "../utils/authentication"

const prisma = new PrismaClient()
const app = Router()

app.post("/client/login", async (req, res) => {
    const { email, password } = req.body;
    try {
        if (email == "" || password == "") {
            throw new Error(1001)
        }
        const loginClient = await prisma.client.findUnique({
            where: {
                email,
                password
            },
        })
        if (loginClient) {
            const token = generateToken({ email: req.body.email })
            res.cookie("token", token, { secure: false, httpOnly: true, maxAge: 100000 })
            console.log(req.cookie.token)
        } else {
            req.json({ result: false })
        }
    } catch (error) {
        console.error("Email e/o Password non corrispondono!", error)
        res.status(500).json({ message: 'Errore durante il login!' })
    }
})

app.get("/client/logout", async (req, res) => {
    try {
        req.cookie.destroy(function (err) {
            err.message("Sessione terminata.")
        })
        res.clearCookie("token")
        res.send(true)
    } catch (error) {
        console.error("Logout failed!", error)
        res.status(500).json({ message: 'Errore durante il logout!' })
    }
})

app.post("/client/register", async (req, res) => {
    const { name, surname, email, password } = req.body
    try {
        const regClient = await prisma.clients.create({
            data: {
                name,
                surname,
                email,
                password,
                lastLogin: new Date()
            },
        });
        res.json({ result: true, client: regClient })
        console.log("Cliente registrato.")
    } catch (error) {
        console.error("Registrazione failed!", error)
        res.status(500).json({ message: 'Errore durante la registrazione!' })
    }
})

app.put("/client/update/:email", authenticateToken, async (req, res) => {
    const { name, surname, email, password } = req.body
    try {
        var decoded = jwt.verify(token, TOKEN_SECRET);
        const regEdit = await prisma.clients.update({
            where: {
                email: decoded.email
            },
            data: {
                name,
                surname,
                email,
                password
            }
        })
        if (email) {
            res.json({ result: true, client: regEdit, accessToken: accessToken, refreshToken: refreshToken })
            console.log("Editor registrato.")
        }
    } catch (error) {
        console.error("Registrazione failed!", error)
        res.status(500).json({ message: 'Errore durante la registrazione!' })
    }
})


//per l'admin
app.put("/client/update/", authenticateToken, async (req, res) => {
    const email = req.body.email
    try {
        const refreshToken = req.body.email
        if (refreshToken == null) return res.sendStatus(401)
        jwt.verify(refreshToken, process.env.TOKEN_SECRET, (err, user) => {
            if (err) return res.sendStatus(403)
            res.json({ mail: email })
        })
        const em = await prisma.clients.findUnique({
            where: {
                email: email,
                admin: true
            }
        })
        if (em) {
            const regEdit = await prisma.clients.update({
                where: {
                    email
                },
                data: {
                    editor: true
                }
            })
            res.json({ result: true, client: regEdit })
            console.log("Editor registrato.")
        }
    } catch (error) {
        console.error("Registrazione failed!", error)
        res.status(500).json({ message: 'Errore durante la registrazione!' })
    }
})

export default clients