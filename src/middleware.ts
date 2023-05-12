import { NextFunction, Request, Response } from "express";
import { QueryConfig, QueryResult } from "pg";
import { client } from "./database";

const verifyName = async (req:Request, res: Response, next: NextFunction): Promise<Response|void> =>{
    const name = req.body.nome
    const queryString = String`
        select * from movies
        where nome = $1;
    `
    const queryConfig: QueryConfig = {
        text: queryString,
        values: [name]
    }
    const queryResult: QueryResult = await client.query(queryConfig)
    if(queryResult.rowCount !==0){
        return res.status(209).json('nome já cadastrado')
    }
    next()
}
export {verifyName}