const database = require('../database/database')
const bcrypt = require('bcrypt')


function login(req, res) {
	let { email, senha } = req.body
	database.select('*').from('usuarios').where('email', email)
	.then(usuario => {
		if (usuario.length !== 0) {
			const senhaHash = usuario[0]['senha']
			const senhaValida = bcrypt.compareSync(senha, senhaHash)
			if (senhaValida) {
				// se usuario tiver um token verificar se faz mais de uma hora e gerar outro
				// se não tiver um token criar e inserir no banco junto com a hora 	
			} else{
				res.status(400).json({msg: 'A senha está incorreta'})
			}
		} else {
			res.status(404).json({msg: 'O email está incorreto'})
		}
	})
	.catch(err => {
		res.status(500).json({msg: 'Houve um problema ao verificar usuário'})
	})
}

function register(req, res) {
	let {nome, email, senha } = req.body
	if (!nome || !email || !senha) {
		res.status(400).json({msg: 'Sua requisição está faltando parâmetros'})
	} else {
		senha = bcrypt.hashSync(senha, 10)
		database.insert({nome, email, senha}).into('usuarios')
		.then(resultado => {
			res.status(201).json({msg: 'Usuario criado com sucesso'})
		})
		.catch(err => {
			if(err.message.includes('Duplicate entry')) {
				res.status(400).json({msg: 'Esse email já existe'})
			} else {
				res.status(500).json({msg: 'Houve um problema durante a criação do usuário'})
			}
		})
	}
}

module.exports = {
	login,
	register
}