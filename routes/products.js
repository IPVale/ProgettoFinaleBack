import express from "express"
import { PrismaClient, Prisma } from "@prisma/client"

const prisma = new PrismaClient()
const app = express()

app.get("/order/create/: idClient/: idProduct", async (res, res) => {
    const { nameProd } = req.params
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
app.post("/create/product", async (res, req)=>{
    const{namePrd, price, quantity, description} = req.body
    try{
        const createPrd = await prisma.products.create({
            data:{
                namePrd,
                price,
                quantity,
                description
            }
        })
        res.json({ result: true, products: createPrd })
        console.log("Prodotti trovati.")
    }catch (error) {
        console.error(" Prodotti non trovati!", error)
        res.status(500).json({ message: 'Errore durante la ricerca!' })
    }
})

//per l'admin nel db di deposit
app.put("/update/deposit", async (req,res)=>{
    const{depId, namePrd, price, quantity, description} = req.body
    try{
        const updatePrd = await prisma.products.update({
            where:{
                depId
            },
            data:{
                namePrd,
                price,
                quantity,
                description
            }
        })
        res.json({ result: true, products: updatePrd })
        console.log("Prodotto trovato.")
    }catch (error) {
        console.error(" Prodotto non modificato!", error)
        res.status(500).json({ message: 'Errore durante la modifica!' })
    }
})

//per l'admin nel db di deposit
app.delete("/delete/deposit", async (req, res)=>{
    const{depId} = req.body.depId
    try{
        const deletePrd =await prisma.products.delete({
            where:{
                depId
            }
        })
        res.json({ result: true, products: deletePrd })
        console.log("Prodotto eliminato.")
    }catch (error) {
        console.error(" Prodotto non eliminato!", error)
        res.status(500).json({ message: 'Errore durante l\'eliminazione!' })
    }
})


export default products