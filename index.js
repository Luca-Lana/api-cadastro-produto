const express = require('express')
const bodyParser = require('body-parser')
const database = require('./database/database.js')

const app = express()

app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.json())

app.get('/produtos', (req, res) => {
	res.send('Opa')
})

app.get('/produtos/:id', (req, res) => {
	let { id } = req.params
    res.send('Ops' + id)
})

app.listen(8080, () => {
	console.log('O servidor está rodando')
})