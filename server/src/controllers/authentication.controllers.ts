import { NextFunction, Request, Response } from "express"
import { StatusCodes } from "http-status-codes"
import User from '../models/users'
import { createError } from "../utils/error"
import bcryptjs from 'bcryptjs'

const { OK, CREATED, BAD_REQUEST } = StatusCodes

const register = async (req: Request, res: Response, next: NextFunction) => {
    try {

        if (req.body.password !== req.body.passwordConfirmation)
            return next(createError(BAD_REQUEST, "password and password confirmation must be identical"))

        const duplicatedData = await User.findOne({
            $or: [{ username: req.body.username }, { email: req.body.email }]
        }).select('username email')

        if (duplicatedData) {
            if (duplicatedData.username === req.body.username)
                return next(createError(BAD_REQUEST, "this username is already in use"))
            if (duplicatedData.email === req.body.email)
                return next(createError(BAD_REQUEST, "this email is already in use"))
        }

        const salt = await bcryptjs.genSalt(10)
        const hash = await bcryptjs.hash(req.body.password, salt)

        await new User({
            username: req.body.username,
            email: req.body.email,
            password: hash
        }).save()

        res.status(CREATED).json(`${req.body.username} registered successfully`)
        
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