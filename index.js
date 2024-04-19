import express from "express"
import Clients from "./routes/clients"
import Products from "./routes/products"
import Orders from "./routes/orders"
import Cart from "./routes/cart"
import * as crypto from "crypto"
import cookieSession from "cookie-session"
import cookieParser from "cookie-parser"


var app = express()

app.use(cookieParser())

app.use(cookieSession({
    genid: function(req){
        return crypto.randomUUID()
    },
    name: 'session',
    secret: "fheuhf98du9uh3rnfiu09808y96bt77tb987y9n7t7806nygb6r5ebnpm9è6rv£$%&/()=?^!puefheiuh",
    resave: false,
    saveUninitialized: true,
    cookie:{ secure: false, maxAge: 48*60*60*1000}
}))

app.use(express.json())

app.use("/clients", Clients)
app.use("/products", Products)
app.use("/orders", Orders)
app.use("/cart", Cart)


app.listen(80, ()=>{
    console.log("Web serve in ascolto sulla porta 80")
})
