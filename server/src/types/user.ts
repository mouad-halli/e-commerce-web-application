import { Types } from "mongoose"

export interface IUser {
    _id?: Types.ObjectId
    username: string
    // firstname: String
    // lastname: String
    // imgPath: string
    email: string
    password?: string
    // googleId?: number
    // phone?: number
}