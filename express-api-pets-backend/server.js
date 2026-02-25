const dotenv = require('dotenv')
dotenv.config()
const express= require('express')
const app = express()
const mongoose = require('mongoose')
const logger = require('morgan')
const cors=require('cors')


const petRouter = require('./controllers/pets')
const testRouter = require('./controllers/test-jwt')
const authRouter = require('./controllers/auth')

app.use(cors({origin: 'http://localhost:5173'}))
mongoose.connect(process.env.MONGODB_URI);

mongoose.connection.on('connected', () => {
    console.log(`Connected to MongoDB ${mongoose.connection.name}`)
})
app.use(express.json())
app.use(logger('dev'))

app.use('/pets', petRouter)
app.use('/test', testRouter)
app.use('/auth', authRouter)

app.listen(3000,()=> {
    console.log("Listening on port 3000")
})
