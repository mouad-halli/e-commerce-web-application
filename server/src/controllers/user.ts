import { NextFunction, Request, Response } from "express"
import { StatusCodes } from "http-status-codes"

const { OK, CREATED } = StatusCodes

export const getUser = (req: Request, res: Response, next: NextFunction) => {
    try {
        
        res.status(OK).json('get user called')

    } catch (error) {
        next(error)
    }
}

export const createUser = (req: Request, res: Response, next: NextFunction) => {
    try {
        
        res.status(CREATED).json('create user called')

    } catch (error) {
        next(error)
    }
}

export const updateUser = (req: Request, res: Response, next: NextFunction) => {
    try {
        
        res.status(OK).json('update user called')

    } catch (error) {
        next(error)
    }
}

export const deleteUser = (req: Request, res: Response, next: NextFunction) => {
    try {
        
        res.status(OK).json('delete user called')

    } catch (error) {
        next(error)
    }
}