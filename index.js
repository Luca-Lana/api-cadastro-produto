const express = require('express')
const bodyParser = require('body-parser')

const app = express()

app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.json())

// ROTAS 
const produtosRoute = require('./routes/produtosRoute')
const autenticacaoRoute = require('./routes/autenticacaoRoute')

app.use(produtosRoute)
app.use(autenticacaoRoute)


app.listen(8080, () => {
	console.log('O servidor está rodando')
})