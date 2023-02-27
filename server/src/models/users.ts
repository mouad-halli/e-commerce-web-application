import { Schema, model } from "mongoose";
import { IUser } from "../types/user";

const UserSchema = new Schema<IUser>({

    username: { type: String },

    // firstname: { type: String },

    // lastname: { type: String },

    // imgPath: { type: String },
    
    email: { type: String },
    
    password: { type: String },

    // googleId: { type: Number },

    // phone: { type: Number },


} )

export default model<IUser>('User', UserSchema)
