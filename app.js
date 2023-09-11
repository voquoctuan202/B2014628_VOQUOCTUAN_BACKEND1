const express = require("express")
const ApiError = require("./app/api-error")
const contactsRouter = require("./app/routes/contact.route")
const cors = require("cors")

const app = express()

app.use(cors())
app.use(express.json())

app.get("/",(req,res)=>{
    res.json({ message: "Welcome to contact book application." })
})
app.use("/api/contact", contactsRouter)

app.use((req,res,next)=>{
    return next(new ApiError(404, "Resource not found"))
})

app.use((err, req, res, next)=>{
    return res.status(ApiError.statusCode || 500).json({
        message : ApiError.message || "Internal Server Error"
    })
})


module.exports = app