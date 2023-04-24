const database = require('../database/database')
const bcrypt = require('bcrypt')
const jwt = require("jsonwebtoken")


async function login(req, res) {
	let { email, senha } = req.body
	try {
		let usuario = await database.select('*').from('usuarios').where('email', email)
		if (usuario.length !== 0) {
			const { id, email, senha: senhaHash, token: tokenBanco, token_expira_em } = usuario[0]
			const senhaValida = await bcrypt.compare(senha, senhaHash)
			if (senhaValida) {
				if (tokenBanco && (Date.now() <= token_expira_em)) {
					res.status(200).json({token: tokenBanco})
				} else {
					token = jwt.sign({ id, email }, 'chaveSecreta', { expiresIn: '1h' })
					const novaData = new Date(Date.now() + (60 * 60 * 1000))
					let retornoUpdate = await database('usuarios').where('email', email).update({token: token, token_expira_em: novaData.getTime()})
					res.status(200).json({msg: 'Token gerado com sucesso', token})
				}
			} else{
				res.status(400).json({msg: 'A senha está incorreta'})
			}
		} else {
			res.status(400).json({msg: 'O email está incorreto'})
		}
	} catch (erro) {
		res.status(500).json({msg: 'Houve um problema durante o login'})
	}
}

async function register(req, res) {
	let {nome, email, senha } = req.body
	if (!nome || !email || !senha) {
		res.status(400).json({msg: 'Sua requisição está faltando parâmetros'})
	} else {
		try {
			senha = await bcrypt.hash(senha, 10)
			let resultado = await database.insert({nome, email, senha}).into('usuarios')
			if (resultado.length !== 0) {
				res.status(201).json({msg: 'Usuario criado com sucesso'})
			}
		} catch(erro) {
			if(erro.message.includes('Duplicate entry')) {
				res.status(400).json({msg: 'Esse email já existe'})
			} else {
				res.status(500).json({msg: 'Houve um problema durante a criação do usuário'})
			}
		}
	}
}

module.exports = {
	login,
	register
}