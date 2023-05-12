import express, { Application, json } from "express";
import { startDatabase } from "./database";
import { createMovie, getMoviesById, getMovies, postMovie, deleteMovie } from "./logic";

const app: Application = express()
app.use(json())
app.post('/movies', createMovie)
app.get('/movies', getMovies)
app.get('/movies/:id', getMoviesById)
app.patch('/movies/:id', postMovie)
app.delete('/movies/:id', deleteMovie)
app.listen(3000, async ()=>{
    await startDatabase()
    console.log("Servidor iniciado!")
})