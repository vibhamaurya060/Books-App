import express from'express'
import {config} from 'dotenv';
import ConnectToDb from './config/db.js';
import userRouter from './routes/userRoute.js';
import bookRouter from './routes/bookRoute.js';
import auth from './middlewares/auth.js';
import cors from 'cors';


config();
const app=express();

const PORT=process.env.PORT 
const db_uri=process.env.DB_URI 
app.use(cors({origin:process.env.FRONTEND_URL,credentials: true}))
app.use(express.json());

// home route
app.get('/',(req, res)=>{
  res.send('This is home route');
})

//  user and books route
app.use('/users', userRouter)
app.use('/books', auth ,bookRouter)


app.listen(PORT, async()=>{
  try{
    await ConnectToDb(db_uri);
    console.log(`Server is running at port ${PORT}`)
    console.log('Database is connected.')
  }
  catch(err){
    console.log('Database is not connected.')
  }
})