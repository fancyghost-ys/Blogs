const express = require('express')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const cors = require('cors')
// const http = require('http')
const config =require('./config/index')
const router = require('./router')
const app = express()
// middleware 
app.use(morgan('dev'))
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())
app.use(cors())
app.use(router)
const PORT = process.env.PORT || 8000
app.listen(PORT,()=> {
    console.log(`Server is running now on ${config.appURL}:${config.appPort}`)
})
