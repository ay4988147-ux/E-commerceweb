import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config({path:'./.env'});
import cors from 'cors';
import authRou from './routes/authRou.js'
import productsRou from './routes/productsRou.js'
import cartRou from './routes/cartRou.js'
import addressRou from './routes/addressRou.js'
import orderRou from './routes/orderRou.js'


const app = express();


app.use(cors());
app.use(express.json());
app.use('/api/auth' , authRou);
app.use('/api/products' , productsRou)
app.use('/api/cart' , cartRou)
app.use('/api/address' , addressRou)
app.use('/api/order' , orderRou)

app.get('/' , (req , res) =>{
    res.send('API is running')
});

app.listen(process.env.PORT, ()=>{
    console.log(`server is running on ${process.env.PORT}`)
});

//database connection

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log("Database connected");
  })
  .catch((err) => {
    console.log("Database connection error:", err.message);
  });