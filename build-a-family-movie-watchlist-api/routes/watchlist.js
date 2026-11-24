import express from "express"
const router = express.Router()
import { getWatchlist, addMovie,
     updateMovie, deleteMovie } from "../utils/db.js"
import { authenticate } from "../middleware/authenticate.js"
import { authorizeModification } from "../middleware/authorize.js"

router.get("/:userId", authenticate, (req, res)=>{
    const {userId }= req.params
  
    const watchlist= getWatchlist(Number(userId))
    return res.status(200).json(watchlist)
})

router.post("/:userId/movies", authenticate , authorizeModification, (req, res)=>{
     const {userId}=req.params
     const {id, title, genre, watched}= req.body

    const movie={
        id,
        title,
        genre,
        watched
    }
    
    addMovie(Number(userId), movie)
    return res.status(201).json(movie)
})

router.put("/:userId/movies/:movieId", authenticate, authorizeModification, (req, res)=>{
    const {userId, movieId}= req.params
    const {title, genre, watched}=req.body
   
    const updated={
        id: movieId,
        title,
        genre,
        watched
    }
    updateMovie(Number(userId),movieId,updated)
    return res.status(200).json(updated)
})

router.delete("/:userId/movies/:movieId", authenticate, authorizeModification, (req, res)=>{
    const {userId, movieId}= req.params

    deleteMovie(Number(userId), Number(movieId))
    return res.status(200).json({message: "movie removed"})
})

export default router