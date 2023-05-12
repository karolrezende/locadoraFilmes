import express, { Application, json } from "express";
import { startDatabase } from "./database";
import { createMovie, getMoviesById, getMovies, postMovie, deleteMovie} from "./logic";
import { verifyName } from "./middleware";

const app: Application = express()
app.use(json())
app.post('/movies', verifyName, createMovie)
app.get('/movies', getMovies)
//app.get('/movies/?category=drama', getMoviesByCategory)
app.get('/movies/:id', getMoviesById)
app.patch('/movies/:id', verifyName, postMovie)
app.delete('/movies/:id', deleteMovie)
app.listen(3000, async ()=>{
    await startDatabase()
    console.log("Servidor iniciado!")
})