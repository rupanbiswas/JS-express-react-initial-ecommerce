import express from 'express';
const app = express();
import cors from "cors";
import dotenv from "dotenv";
import connectDB from './config/db.js'
import productRoutes from './routes/productRoutes.js'
import userRoutes from './routes/userRoutes.js'
import orderRoutes from './routes/orderRoutes.js'

import { notFound, errorHandler } from './middleware/errorMiddleware.js'
import bodyParser from 'body-parser'





app.use(cors());
dotenv.config();
app.use(express.json());
app.use(bodyParser.urlencoded({ extended:true}))

app.use(bodyParser.json({ extended:true}))

connectDB()
app.use((req, res, next) => {
    console.log(req.originalUrl);
    next();
})
app.use("/api/products", productRoutes)
app.use("/api/users", userRoutes)
app.use("/api/orders", orderRoutes)
app.get('/api/config/paypal',(req,res)=>
res.send(process.env.PAYPAL_CLIENT_ID))



app.use(notFound)
app.use(errorHandler)

app.get('/', (req, res) => {
    res.send("api is running");
})


const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
    console.log(`server started on port 5000${PORT}`)
})