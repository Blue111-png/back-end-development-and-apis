import express from "express"
const router = express.Router()
import { findByUsername } from "../utils/db.js"
import {signToken} from "../utils/jwt.js"

router.post("/login", (req, res)=>{
    const {username, password}= req.body
    if(!username || !password){
        return res.status(400).json({message: "username and password required"})
    }

    const user= findByUsername(username)
    if(!user){
        return res.status(401).json({message: "user not found"})
    }

    if(user._password !== password){
        return res.status(401).json({message: "Invalid credentials"})
    }

    return res.status(200).json({token: signToken({id: user.id, role: user.role})})
})

export default router