import { Types } from "mongoose"

export interface IUser {
    _id: Types.ObjectId
    username: string
    email: string
    password?: string
    accessToken?: string
    refreshToken?: string
}

export interface UserDto extends Omit<IUser, '_id' | 'accessToken' | 'refreshToken'> {}

export interface UpdateUserDto extends Partial<UserDto> {}
