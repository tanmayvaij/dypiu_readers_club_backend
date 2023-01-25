import { genSalt, hash } from "bcrypt"
import { Request, Response, NextFunction } from "express"
import { verify } from "jsonwebtoken"


// declaring additional property ( user ) in Request interface
declare global {
    namespace Express {
      interface Request {
        user: Object
      }
    }
}


// middleware for hashing passwords
export const hashPassword = async (req: Request, res: Response, next: NextFunction) => {

    // getting password, cpassword from body
    const { password, cpassword } = req.body

    // Checking is password fields are empty or not, returning error message if fields are empty or passwords missmatch
    if ( password == "" || cpassword == "" || password != cpassword )
        return res.json({ success: false, message: "Passwords missing or mismatch" })

    // Generating salt and creating a hashed password
    const salt = await genSalt(10)
    const hashedPassword = await hash(password, salt)

    // replacing user given plain text password with hashed password
    req.body.password = hashedPassword

    next()

}


// middleware for validating user token
export const validateToken = (req: Request, res: Response, next: NextFunction) => {

    // reading authtoken from header
    const authtoken = req.header("authtoken")

    // checking if authtoken exists, else throwing error message
    if (!authtoken) return res.json({ success: false, message: "Verify using a valid token" })

    try {

        // verifying the token and getting user details
        const user = verify(authtoken, process.env.JWT_SECRET as string)
        req.user = user
        next()

    }

    catch (err) { res.json({ success: false, message: err }) }

}
