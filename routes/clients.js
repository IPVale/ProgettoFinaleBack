import express from "express"
import { PrismaClient, Prisma } from "@prisma/client"

const prisma = new PrismaClient()
const app = express()

app.post("/login", async (req, res) => {
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
        res.status(500).json({message: 'Errore durante il login!'})
    }
})

app.get("/logout", async(req, res)=>{
    try{
        req.cookie.destroy(function (err){
            err.message("Sessione terminata.")
        })
        res.clearCookie("token")
        res.send(true)
    }catch (error) {
        console.error("Logout failed!", error)
        res.status(500).json({message: 'Errore durante il logout!'})
    }
})

app.post("/register", async(req, res)=>{
    const {name, surname, email, password} = req.body
    try{
        const regClient = await prisma.clients.create({
            data: {
                name,
                surname,
                email,
                password,
                lastLogin: new Date()
            },
        });
        res.json({result:true, client: regClient})
        console.log("Cliente registrato.")
    }catch (error) {
        console.error("Registrazione failed!", error)
        res.status(500).json({message: 'Errore durante la registrazione!'})
    }
})

app.get("/editor/:email", async(req, res)=>{
    const {email} = req.params
    try{
        const regEdit = await prisma.clients.update({
            where:{
                email
            },
            data:{
                editor: true
            }
        })
        res.json({result:true, client: regEdit})
        console.log("Editor registrato.")
    }catch (error) {
        console.error("Registrazione failed!", error)
        res.status(500).json({message: 'Errore durante la registrazione!'})
    }    
})

export default clients