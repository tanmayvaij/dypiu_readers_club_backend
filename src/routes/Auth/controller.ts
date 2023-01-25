import { Request, Response } from "express"
import { sign } from "jsonwebtoken"
import { UserSchema } from "./schema"
import { compare } from "bcrypt"


// handler for user signup 
export const handleSignUp = async (req: Request, res: Response) => {

    // fetching user details
    const { name, email, number, address, password, account_type } = req.body

    // checking if fields are empty or not. Returning error message if fields are empty
    if ( name == "" || email == "" || number == "" || address == "" || account_type == "" ) 
        return res.json({ success: false, message: "Required fields missing" })

    // checking if user with the same email exists or not. Returning error if a user with same email already exists
    const userExists = await UserSchema.findOne({ email })
    if ( userExists ) return res.json({ success: false, message: "user with same email already exists" })

    try {

        // Saving details to database
        const user = await UserSchema.create({ name, email, number, address, password, account_type })

        // getting doc id
        const id = user.toObject()._id.toString()

        // creating payload object
        const payload = { id, name, email, number, address, account_type }

        // creating token
        const authtoken = sign(payload, process.env.JWT_SECRET as string)

        // sending token
        res.json({ success:true, authtoken })

    }

    catch (err) { res.json({ success: false, message: err }) }

}


// handler for user signin
export const handleSignIn = async (req: Request, res: Response) => {

    // getting email, password from user
    const { email, password } = req.body

    // checking if fields are empty or not. Returning error message if fields are missing
    if ( email == "" || password == "" ) return res.json({ success: false, message: "Missing fields" })

    // checking if user exists or not, if not then showing error message
    const user = await UserSchema.findOne({ email })
    if (!user) return res.json({ success: false, message: "Invalid Credentials" })

    // checking if password is correct or not. Returning error message if password is wrong
    const match = await compare(password, user.password)
    if (!match) return res.json({ success: false, message: "Invalid Credentials" })

    // getting user details
    const { _id, name, number, address, account_type } = user

    // creating payload
    const payload = { _id, name, email, number, address, account_type }

    // generating token
    const authtoken = sign(payload, process.env.JWT_SECRET as string)

    // sending token
    res.json({ success: true, authtoken })

}


// handler for getting user details
export const handleGetUser = (req: Request, res: Response) => {

    const user = req.user

    res.json({ user })

}
