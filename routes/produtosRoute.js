const express = require('express')
const router = express.Router()

router.get('/produtos', (req, res) => {
	res.send('Opa')
})

router.get('/produtos/:id', (req, res) => {
	let { id } = req.params
    res.send('Ops' + id)
})

router.post('/produtos', (req, res) => { 
	let dados = { ...req.body }
	res.send(dados)
})

router.patch('/produtos/:id', (req, res) => {
	let { id } = req.params
	let dados = { ...req.body }
	res.send({id, dados})
})

router.put('/produtos/:id', (req, res) => {
	let { id } = req.params
	let dados = { ...req.body }
	res.send({id, dados})
})

router.delete('/produtos/:id', (req, res) => {
	let { id } = req.params
	res.send(id)
})

module.exports = router