import { NextFunction, Request, Response } from "express"
import { StatusCodes } from "http-status-codes"

const { OK, CREATED } = StatusCodes

const getUser = (req: Request, res: Response, next: NextFunction) => {
    try {
        
        res.status(OK).json('get user called')

    } catch (error) {
        next(error)
    }
}

const createUser = (req: Request, res: Response, next: NextFunction) => {
    try {
        
        res.status(CREATED).json('create user called')

    } catch (error) {
        next(error)
    }
}

const updateUser = (req: Request, res: Response, next: NextFunction) => {
    try {
        
        res.status(OK).json('update user called')

    } catch (error) {
        next(error)
    }
}

const deleteUser = (req: Request, res: Response, next: NextFunction) => {
    try {
        
        res.status(OK).json('delete user called')

    } catch (error) {
        next(error)
    }
}

export = {
    getUser, createUser,
    updateUser, deleteUser
}