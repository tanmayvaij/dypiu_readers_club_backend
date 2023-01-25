import { Schema, model } from "mongoose"

export const ListedBookSchema = model('listedBook', new Schema({
    
    bookname: {
        type: String,
        required: true
    },
    desc: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    image_url: {
        type: String,
        required: true
    },
    seller_id: {
        type: String,
        required: true
    }

}))
