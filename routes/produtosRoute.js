const express = require('express')
const router = express.Router()
const produtosController = require('../controller/produtosController')

router.get('/produtos', produtosController.get)
router.get('/produtos/:id', produtosController.getId)

router.post('/produtos', produtosController.post)

router.put('/produtos/:id', produtosController.putId)

router.delete('/produtos/:id', produtosController.deleteId)

module.exports = router