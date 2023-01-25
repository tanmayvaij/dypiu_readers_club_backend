import multer from "multer"

// Storage settings
const storage = multer.diskStorage({

    destination: "./src/uploads",

    filename: ( _, file, cb) => {
        cb(null, Date.now() + file.originalname)
    }
    
})

export const uploadImage = multer({ storage }).single("imageFile")
