import { NextFunction, Request, Response } from "express"
import { StatusCodes } from "http-status-codes"
import User from '../models/users'
import { createError } from "../utils/error"
import bcryptjs from 'bcryptjs'
import jwt from 'jsonwebtoken'
import {
    ACCESS_TOKEN_SECRET, REFRESH_TOKEN_SECRET, 
    ACCESS_TOKEN_EXPIRATION, REFRESH_TOKEN_EXPIRATION
} from '../config/environment'

const { OK, CREATED, BAD_REQUEST, UNAUTHORIZED } = StatusCodes

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

const login = async (req: Request, res: Response, next: NextFunction) => {
    try {

        const user = await User.findOne({username: req.body.username}).select('_id username email password')

        if (!user)
            return next(createError(BAD_REQUEST, "Wrong password or username"))

        const isPasswordCorrect = await bcryptjs.compare(req.body.password, String(user.password))

        if (isPasswordCorrect === false)
            return next(createError(BAD_REQUEST, "Wrong password or username"))

        const generatedRefreshToken = jwt.sign(
            { _id: user._id }, REFRESH_TOKEN_SECRET,
            { expiresIn: REFRESH_TOKEN_EXPIRATION }
        )

        const generatedAccessToken = jwt.sign(
            { _id: user._id }, ACCESS_TOKEN_SECRET,
            { expiresIn: ACCESS_TOKEN_EXPIRATION }
        )

        await User.findByIdAndUpdate(user._id, {
            refreshToken: generatedRefreshToken,
            accessToken: generatedAccessToken
        })

        res.status(OK)
        .cookie('refreshToken', generatedRefreshToken, { httpOnly: true })
        .cookie('accessToken', generatedAccessToken, { httpOnly: true })
        .json({username: user.username, email: user.email})

    } catch (error) {
        next(error)
    }
}

const logout = async (req: Request, res: Response, next: NextFunction) => {
    try {
        
        await User.findOneAndUpdate({ _id: req.user._id }, {
            accessToken: null, refreshToken: null
        })

        res.status(OK).json('logged out successfully')

    } catch (error) {
        next(error)
    }
}

const refreshAccessToken = async (req: Request, res: Response, next: NextFunction) => {
    try {

        const accessToken = req.cookies.accessToken

        const { exp } = jwt.decode(accessToken) as jwt.JwtPayload

        if (accessToken !== req.user.accessToken || !exp || exp * 1000 > Date.now()) {
            await User.findOneAndUpdate({ _id: req.user._id }, {
                accessToken: null, refreshToken: null
            })
            return next(createError(UNAUTHORIZED, 'you are not authorized to do this action'))
        }

        const generatedAccessToken = jwt.sign(
            { _id: req.user._id }, ACCESS_TOKEN_SECRET,
            { expiresIn: ACCESS_TOKEN_EXPIRATION }
        )

        await User.findByIdAndUpdate(req.user._id, {
            accessToken: generatedAccessToken
        })

        res.status(OK)
        .cookie('accessToken', generatedAccessToken, { httpOnly: true })
        .json('access token refreshed successfully')
        
    } catch (error) {
        next(error)
    }
}


export = {
    register, login, logout, refreshAccessToken
}