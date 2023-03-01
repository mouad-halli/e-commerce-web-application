import { NextFunction, Request, Response } from "express"
import { StatusCodes } from "http-status-codes"

const { OK, CREATED } = StatusCodes

const register = (req: Request, res: Response, next: NextFunction) => {
    try {
        
        res.status(OK).json('register called')

    } catch (error) {
        next(error)
    }
}

const login = (req: Request, res: Response, next: NextFunction) => {
    try {
        
        res.status(CREATED).json('login called')

    } catch (error) {
        next(error)
    }
}

export = {
    register, login
}