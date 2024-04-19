import Router from "express"
import { PrismaClient, Prisma } from "@prisma/client"
import { generateToken, authenticateToken } from "../utils/authentication"

const prisma = new PrismaClient()
const app = Router()

app.get("/find/product/", async (res, res) => {
    const { nameProd } = req.params.namePrd
    try {
        const findProd = await prisma.products.findmany({
            where: {
                nameProd
            },
            select: {
                nameProd: true,
                price: true,
                quantity: true,
                description: true,
            }
        });
        res.json({ result: true, product: findProd })
        console.log("Prodotti trovati.")
    } catch (error) {
        console.error(" Prodotti non trovati!", error)
        res.status(500).json({ message: 'Errore durante la ricerca!' })
    }
})

//per l'admin nel db di deposit
app.post("/create/product", authenticateToken, async (res, req) => {
    const { namePrd, price, quantity, description } = req.body
    try {
        var decoded = jwt.verify(token, TOKEN_SECRET);
        if (decoded == null) return res.sendStatus(401)
        const admin = await prisma.clients.findUnique({
            where: {
                email: decoded,
                admin: true
            },
        })
        if (admin) {
            const createPrd = await prisma.products.create({
                data: {
                    namePrd,
                    price,
                    quantity,
                    description
                }
            })
            res.json({ result: true, products: createPrd })
            console.log("Prodotti trovati.")
        }
    } catch (error) {
        console.error(" Prodotti non trovati!", error)
        res.status(500).json({ message: 'Errore durante la ricerca!' })
    }
})

//per l'admin nel db di deposit
app.put("/update/product", authenticateToken, async (req, res) => {
    const { depId, namePrd, price, quantity, description } = req.body
    try {
        const em = {}
        const refreshToken = req.body.email
        if (refreshToken == null) return res.sendStatus(401)
        jwt.verify(refreshToken, process.env.TOKEN_SECRET, (err, user) => {
            if (err) return res.sendStatus(403)
            em = res.json({ mail: email })
        })
        const admin = await prisma.clients.findUnique({
            where: {
                email: em,
                admin: true
            },
        })
        if (admin) {
            const updatePrd = await prisma.products.update({
                where: {
                    depId
                },
                data: {
                    namePrd,
                    price,
                    quantity,
                    description
                }
            })
            res.json({ result: true, products: updatePrd })
            console.log("Prodotto trovato.")
        }
    } catch (error) {
        console.error(" Prodotto non modificato!", error)
        res.status(500).json({ message: 'Errore durante la modifica!' })
    }
})

//per l'admin nel db di deposit
app.delete("/delete/product", authenticateToken, async (req, res) => {
    const { depId } = req.body.depId
    try {
        const em = {}
        const refreshToken = req.body.email
        if (refreshToken == null) return res.sendStatus(401)
        jwt.verify(refreshToken, process.env.TOKEN_SECRET, (err, user) => {
            if (err) return res.sendStatus(403)
            em = res.json({ mail: email })
        })
        const admin = await prisma.clients.findUnique({
            where: {
                email: em,
                admin: true
            },
        })
        if (admin) {
            const deletePrd = await prisma.products.delete({
                where: {
                    depId
                }
            })
            res.json({ result: true, products: deletePrd })
            console.log("Prodotto eliminato.")
        }
    } catch (error) {
        console.error(" Prodotto non eliminato!", error)
        res.status(500).json({ message: 'Errore durante l\'eliminazione!' })
    }
})


export default products