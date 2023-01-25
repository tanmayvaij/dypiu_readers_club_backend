import express from "express"
import { config } from "dotenv"
import path from "path"
import { connectDB } from "./db/db"


// Initialized environment variables
config()


const app = express()
const PORT = (process.env.PORT || 5000) as number


// Express configurations
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use('/static', express.static(path.join(__dirname, 'uploads')))


// Importing routers from ./routes
import ListBookRouter from "./routes/ListBook"
import AuthRouter from "./routes/Auth"


// Using routers
app.use("/api/book", ListBookRouter)
app.use("/api/auth", AuthRouter)


// Starting the server
const start = async () => {

    try {

        // Connecting to database
        connectDB()

        app.listen(PORT, () => {
            console.log("Server started succesfully at 5000")
        })
        
    }

    catch (err) { console.log(err) }
    
}

start()
