import { Schema, model } from "mongoose"

// model for users
export const UserSchema = model("user", new Schema({

    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    number: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    account_type: {
        type: String,
        required: true,
        enum: ['seller', 'buyer']
    }

}))
