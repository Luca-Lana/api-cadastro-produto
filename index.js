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

app.post('/produtos', (req, res) => { 
	let dados = { ...req.body }
	res.send(dados)
})

app.patch('/produtos/:id', (req, res) => {
	let { id } = req.params
	let dados = { ...req.body }
	res.send({id, dados})
})

app.put('/produtos/:id', (req, res) => {
	let { id } = req.params
	let dados = { ...req.body }
	res.send({id, dados})
})

app.delete('/produtos/:id', (req, res) => {
	let { id } = req.params
	res.send(id)
})

app.listen(8080, () => {
	console.log('O servidor está rodando')
})