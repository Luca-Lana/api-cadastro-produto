const express = require('express')
const bodyParser = require('body-parser')
const database = require('./database/database')

const app = express()

app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.json())

// ROTAS 
const produtosRoute = require('./routes/produtosRoute')

app.use(produtosRoute)


app.listen(8080, () => {
	console.log('O servidor está rodando')
})