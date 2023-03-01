import { Schema, model } from "mongoose";
import { IUser } from "../types/user";

const UserSchema = new Schema<IUser>({

    username: { type: String },

    email: { type: String },
    
    password: { type: String },

    accessToken: { type: String },

    refreshToken: { type: String }


} )

export default model<IUser>('User', UserSchema)
