import Router from "express"
import { PrismaClient, Prisma } from "@prisma/client"
import { generateToken, authenticateToken } from "../utils/authentication"

const prisma = new PrismaClient()
const app = Router()

//da rivisitare perché si ordina per ogni singolo prodotto
app.put("/order/create/", authenticateToken, async (res, res) => {
    const { idClient, idProduct } = req.params
    try {
        const createOrd = await prisma.orders.update({
            where: {
                idClient,
                idProduct
            }
        })
        res.json({ result: true, client: createOrd })
        console.log("Order create.")
    } catch (error) {
        console.error("Creation failed!", error)
        res.status(500).json({ message: 'Errore durante la creazione!' })
    }
})

app.get("/order/create/: idClient/: idProduct", authenticateToken, async (res, res) => {
    const { orderId, idProduct } = req.params
    try {
        const findProd = await prisma.products.findmany({
            where: {
                orderId
            },
            select: {
                nameProd: true,
                price: true,
                quantity: true,
                description: true,
                orderId: true
            }
        });        
        res.json({ result: true, product: findProd })
        console.log("Prodotti trovati.")
    } catch (error) {
        console.error(" Prodotti non trovati!", error)
        res.status(500).json({ message: 'Errore durante la ricerca!' })
    }
})
//ordine eliminato dopo aver effettuato il reso
app.delete("/order/delete", authenticateToken, async (req, res) =>{
    const { orderId } = req.params.orderId
    try {
        const deleteOrd = await prisma.orders.delete({
            where: {
                orderId
            }
        })
        res.json({ result: true, client: deleteOrd })
        console.log("Ordine eliminato.")
    } catch (error) {
        console.error("Eliminazione fallita!", error)
        res.status(500).json({ message: 'Errore durante l\'eliminazione!' })
    }
})


export default orders