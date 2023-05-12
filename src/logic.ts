import { Request, Response} from "express";
import { client } from "./database";
import { QueryConfig, QueryResult } from "pg";
import {iMovies, iMoviesRequest} from './interface'
import format from "pg-format";
const getMovies = async (req: Request, res: Response): Promise<Response>=>{
    const getQuery = String`
        select * from movies
    `
    const getRequest: QueryResult = await client.query(getQuery)
    return res.status(200).json(getRequest.rows)
}
const getMoviesById = async (req: Request, res:Response): Promise<Response>=>{
    const idParams: number = Number(req.params.id)

    const getQuery = String`
        select * from movies where id = ($1);
    ` 
    const getConfig: QueryConfig ={
        text: getQuery,
        values: [idParams]
    }
    const queryResult: QueryResult<iMovies> = await client.query(getConfig)
    if(queryResult.rowCount === 0){
        return res.status(404).json({error: 'Filme não encontrado'})
    }
    return res.status(200).json(queryResult.rows)
}
const createMovie = async (req: Request, res: Response): Promise<Response>=>{
    const reqData: iMoviesRequest = req.body

    console.log(reqData.name)
    
    const createQuery = String `
        insert into movies("nome", "category", "duration", "price")
        values ($1, $2, $3, $4)
        returning *;
    `
    const queryConfig: QueryConfig = {
        text: createQuery,
        values: Object.values(reqData)
    }
    const returnQuery: QueryResult<iMovies> = await client.query(queryConfig)
    console.log(returnQuery)
    return res.status(201).json({sucess: 'sipa q deu'})
}
const postMovie = async (req: Request, res: Response): Promise<Response> =>{
    const id: number = Number (req.params.id)
    const updateColumn = Object.keys(req.body)
    const updateValues = Object.values(req.body)
    console.log(req.body, req.params.id)
    const queryString: string = format(`
        UPDATE movies
        set (%I) = ROW(%L) 
        where id = $1
        returning *;
    `,
        updateColumn,
        updateValues
    )
    const queryConfig: QueryConfig = {
        text:queryString,
        values: [id]
    }
    const queryResult: QueryResult = await client.query(queryConfig)
    return res.status(201).json(queryResult.rows)
}
const deleteMovie = async (req: Request, res: Response): Promise<Response>=>{
    const id: number = Number(req.params.id)

    const queryString =String `
            DELETE from movies
            WHERE
                id = $1;
    `
    
    const queryConfig: QueryConfig = {
        text: queryString,
        values: [id]
    }
    await client.query(queryConfig)
    return res.status(201).json({sucess: 'deleted'})
}

export {getMovies, getMoviesById, createMovie, postMovie, deleteMovie}