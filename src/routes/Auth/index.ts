import { Router } from "express"
import { handleGetUser, handleSignIn, handleSignUp } from "./controller"
import { hashPassword, validateToken } from "./middleware"

const router = Router()

router.route("/signin").post(handleSignIn)

router.route("/signup").post(hashPassword, handleSignUp)

router.route("/getuser").get(validateToken, handleGetUser)

export default router
