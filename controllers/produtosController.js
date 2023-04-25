const database = require('../database/database')


async function get(req, res) {
	try {
		let produtos = await database.select('*').from('produtos')
		res.status(200).json({dados: produtos})
	} catch (erro) {
		res.status(500).json({msg: 'Houve um problema ao buscar os produtos'})
	}	
}

async function getId(req, res) {
	let { id } = req.params
	if (isNaN(id)) {
		res.status(400).json({msg: 'Parametro inválido'})
	} else {
		try {
			let produto = await database.select('*').from('produtos').where('id', id)
			if (produto.length !== 0) {
				res.status(200).json({dados: produto})
			} else {
				res.status(404).json({msg: 'Esse produto não existe'})
			}
		} catch (erro) {
			res.status(500).json({msg: 'Houve um problema ao buscar o produto'})
		}
	}
}

async function post(req, res) {
	let { nome, marca, preco } = req.body
	if (!nome || !marca || !preco) {
		res.status(400).json({msg: 'Sua requisição está faltando dados'})
	} else {
		try {
			let retorno = await database.insert({nome, marca, preco}).into('produtos')
			if (retorno.length !== 0) {
				res.status(201).json({msg: 'Produto inserido com sucesso'})
			}
		} catch (erro) {
			res.status(500).json({msg: 'Houve um problema ao salvar o produto'})
		}
	}
}

async function putId(req, res) {
	let { id } = req.params
	if (isNaN(id)) {
		res.status(400).json({msg: 'Parametro inválido'})
	} else {
		let { nome, preco, marca } = req.body
		if (!nome && !preco && !marca) {
			res.status(400).json({msg: 'Sua requisição está faltando dados'})
		} else {
			try {
				let retorno = await database('produtos').where('id', id).update({nome, marca, preco})
				if (retorno !== 0) {
					res.status(200).json({msg: 'Produto alterado com sucesso'})
				} else {
					res.status(404).json({msg: 'Esse produto não existe'})
				}
			} catch (erro) {
				res.status(500).json({msg: 'Houve um problema ao atualizar o produto'})
			}
		}
	}
}

async function deleteId(req, res) {
	let { id } = req.params
	if (isNaN(id)) {
		res.status(400).json({msg: 'Parametro inválido'})
	} else {
		try {
			let retornoDelete = await database('produtos').where('id', id).del()
			console.log(retornoDelete)
			if (retornoDelete !== 0) {
				res.status(200).json({msg: 'Produto deletado com sucesso'})
			} else {
				res.status(404).json({msg: 'Esse produto não existe'})
			}
		} catch (erro) {
			res.status(500).json({msg: 'Houve um problema ao deletar o produto'})
		}
	}
}

module.exports = {
	get,
	getId,
	post,
	putId,
	deleteId
}