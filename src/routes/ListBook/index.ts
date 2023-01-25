import { Router } from "express"
import { handleListBook } from "./controller"
import { uploadImage } from "./middleware"

const router = Router()

router.route('/listbook').post(uploadImage, handleListBook)

export default router
