const express = require('express')
const router = express.Router()
const autenticacaoController = require('../controllers/autenticacaoController')


router.post('/cadastro', autenticacaoController.register)
router.post('/login', autenticacaoController.login)

module.exports = router