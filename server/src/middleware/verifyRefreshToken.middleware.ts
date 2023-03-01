import { NextFunction, Request, Response } from "express"
import { createError } from "../utils/error"
import { StatusCodes } from 'http-status-codes'
import jwt from 'jsonwebtoken'
import { ACCESS_TOKEN_SECRET, REFRESH_TOKEN_SECRET } from "../config/environment"
import User from '../models/users'
import { tokenPayload } from "../types/token"

const { UNAUTHORIZED, NOT_FOUND } = StatusCodes

export const verifyRefreshToken = async (req: Request, res: Response, next: NextFunction) => {

    try {
        const refreshToken = req.cookies.refreshToken

        if (!refreshToken)
            return next(createError(UNAUTHORIZED, 'you are not authenticated'))
        
        const { _id: userId } = jwt.verify(refreshToken, REFRESH_TOKEN_SECRET) as tokenPayload

        const user = await User.findById(userId)

        if (!user)
            return next(createError(NOT_FOUND, "user Not Found"))
        
        if (!user.refreshToken)
            return next(createError(UNAUTHORIZED, 'you are not authenticated'))
        
        req.user = user
        next()
        
    } catch (error) {
        next(error)
    }

}