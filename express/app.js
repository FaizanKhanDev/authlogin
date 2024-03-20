import dotenv from 'dotenv'
dotenv.config()
import express from 'express'
import cors from 'cors';
import connectDB from './config/connectdb.js'
import userRoutes from './routes/userRoutes.js'

const app = express()
const port = process.env.PORT
const DATABASE_URL = process.env.DATABASE_URL

// allowed origins
const allowedOrigins = ['http://localhost:3000', ''];

// CORS options
const corsOptions = {
  origin: function (origin, callback) {
    // Check if the origin is in the allowed list
    if (allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
};
// CORS Policy
app.use(cors(corsOptions))

// Database Connection
connectDB(DATABASE_URL)

// JSON
app.use(express.json())

// Load Routes
app.use("/api/user", userRoutes)

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`)
})