const express=require("express")
const cors=require('cors')
const morgan=require("morgan")
const cookieParser=require('cookie-parser')
const server=express()
const productRoutes=require("./routes/Product")
const categoryRoutes=require("./routes/Category")
const brandRoutes=require("./routes/Brand")
const authRoutes=require("./routes/Auth")
const userRoutes=require("./routes/User")
const cartRoutes=require("./routes/Cart")
const OrderRoutes=require("./routes/Order")

// mongo db connection
require("./mongo/db")

// middlewares
server.use(express.json())
server.use(morgan('tiny'))
server.use(cookieParser())
server.use(cors({
    exposedHeaders:['X-Total-Count'],
    credentials:true,
    origin:'http://localhost:3000'
}))

// route middleware
server.use("/product",productRoutes)
server.use("/category",categoryRoutes)
server.use("/brand",brandRoutes)
server.use("/auth",authRoutes)
server.use("/users",userRoutes)
server.use("/cart",cartRoutes)
server.use("/orders",OrderRoutes)


server.get("/",(req,res)=>{
    res.json({"running":true})
})

server.listen(8000,()=>{
    console.log('server [STARTED] ~ http://localhost:8080')
})
