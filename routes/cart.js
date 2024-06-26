import Router from "express"
import { PrismaClient, Prisma } from "@prisma/client"
import { authenticateToken } from "../utils/authentication"

const prisma = new PrismaClient()
const app = Router()

app.put("/add/cart", authenticateToken, async (req, res) => {
    const { productId, quantity } = req.body.productId
    try {
        const findProd = await prisma.products.findUnique({
            where: {
                productId
            },
            select: {
                productId: true,
                nameProd: true,
                price: true,
                description: true
            }
        })
        findProd = findProd + { quantity: quantity }
        const addCart = await prisma.cart.upsert({
            where: {
                productId
            },
            update: {
                quantity: findProd.quantity
            },
            create: {
                productId: true,
                namePrd: true,
                price: true,
                quantity: true,
                description: true
            }
        })
        res.json({ result: true, cart: findProd })
        console.log("Prodotto caricato.")
    } catch (error) {
        console.error(" Prodotto non caricato!", error)
        res.status(500).json({ message: 'Errore durante il caricamento!' })
    }
})


app.patch("/update/cart", authenticateToken, async (req, res)=>{
    const {productId, quantity} = req.body.quantity
    try{
        const updateCart = await prisma.cart.update({
            where:{
                productId
            },
            data:{
                quantity: quantity
            }
        })
        res.json({ result: true, cart: updateCart })
        console.log("Quantità aggiornata.")
    }catch (error) {
        console.error(" Quantità non aggiornata!", error)
        res.status(500).json({ message: 'Errore durante l\'aggiornamento!' })
    }
})

app.delete("/delete/cart", authenticateToken, async (req, res)=>{
    const { productId } = req.body.productId
    try{
        const  deleteCart = await prisma.cart.delete({
            where:{
                productId
            }
        })
        res.json({ result: true, cart: deleteCart })
        console.log("Prodotto eliminato.")
    }catch (error) {
        console.error("Prodotto non eliminato!", error)
        res.status(500).json({ message: 'Errore durante l\'eliminazione!' })
    }
})

//svuotamento carrello dopo evasione ordine
app.delete("/deleteAll/cart", authenticateToken, async (req, res)=>{
    try{
        const  clearCart = await prisma.cart.deleteMany({})
        res.json({ result: true, cart: clearCart })
        console.log("Carrello svuotato.")
    }catch (error) {
        console.error("Carrello non svuotato!", error)
        res.status(500).json({ message: 'Errore durante l\'eliminazione!' })
    }
})


export default carts