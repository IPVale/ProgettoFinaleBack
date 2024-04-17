import express from "express"
import Clients from "./routes/clients"
import Products from "./routes/products"
import Orders from "./routes/orders"
import Cart from "./routes/cart"
import * as crypto from "crypto"
import session from "express-session"
import cookieParser from "cookie-parser"


var app = express()

app.use(cookieParser())

app.use(session({
    genid: function(req){
        return crypto.randomUUID()
    },
    secret: "fheuhf98du9uh3rnfiupuefheiuh",
    resave: false,
    saveUninitialized: true,
    cookie:{ secure: false, maxAge: 8640000}
}))

app.use(express.json())

app.use("/clients", Clients)
app.use("/products", Products)
app.use("/orders", Orders)
app.use("/cart", Cart)


app.listen(80, ()=>{
    console.log("Web serve in ascolto sulla porta 80")
})
