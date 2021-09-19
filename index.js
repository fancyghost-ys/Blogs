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

if (process.env.NODE_ENV === 'production'){
	app.use(express.static('client/build'));
	const path = require('path');
	app.get('*',(req,res) =>{
	res.sendFile(path.resolve(__dirname,'client','build','index.html'))
	})

}

app.listen(process.env.PORT || 8000,()=> {
    console.log(`Server is running now on ${config.appURL}:${config.appPort}`)
})
