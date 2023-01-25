import { Request, Response } from "express"
import { ListedBookSchema } from "./schema"

export const handleListBook = async (req: Request, res: Response) => {

    try {

        const book = await ListedBookSchema.create({
            bookname: req.body.bookname,
            desc: req.body.desc,
            price: req.body.price,
            image_url: process.env.HOST_STATIC_PATH! + req.file?.filename,
            seller_id: req.body.seller_id
        })
    
        res.status(200).json({ success: true, book })

    }

    catch (err) { res.json({ success: false, message: err }) }


}
