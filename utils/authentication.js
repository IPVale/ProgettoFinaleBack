import * as jwt from "jsonwebtoken"
import dotenv from "dotenv"
//require('crypto').randomBytes(64).toString('hex')
// '09f26e402586e2faa8da4c98a35f1b20d6b033c6097befa8be3486a829587fe2f90a832bd3ff9d42710a4da095a2ce285b009f0c3730cd9b8e1af3eb84df6611'

// get config vars
dotenv.config();

// access config var
process.env.TOKEN_SECRET;

export function generateToken(data) {
    return jwt.sign(data, process.env.TOKEN_SECRET, { expiresIn: "2d" })
}

export async function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    if (token == null) return res.sendStatus(401)
  
    jwt.verify(token, process.env.TOKEN_SECRET, (err, client) => {
      console.log(err)
      if (err) return res.sendStatus(403)
      req.client = client
      next()
    })
  }