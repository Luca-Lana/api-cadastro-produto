const database = require('../database/database')


async function get(req, res) {
	try {
		let produtos = await database.select('*').from('produtos')
		res.status(200).json({dados: produtos})
	} catch (erro) {
		res.status(500).json({msg: 'Houve um problema ao buscar os produtos'})
	}	
}

function getId(req, res) {
	let { id } = req.params

	if (isNaN(id)) {
		res.status(400).json({msg: 'Parametro inválido'})
	} else {
		database.select('*').from('produtos').where('id', id)
		.then(produto => {
			if (produto.length !== 0) {
				res.status(200).json({dados: produto})
			} else {
				res.status(404).json({msg: 'Esse produto não existe'})
			}
		})
		.catch(err => {
			res.status(500).json({msg: 'Houve um problema ao buscar o produto'})
			console.log(err)
		})
	}
}

function post(req, res) {
	let { nome, marca, preco } = req.body

	if (!nome || !marca || !preco) {
		res.status(400).json({msg: 'Sua requisição está faltando dados'})
	} else {
		database.insert({nome, marca, preco}).into('produtos')
		.then(retorno => {
			res.status(201).json({msg: 'Produto inserido com sucesso'})
		})
		.catch(err => {
			res.status(500).json({msg: 'Houve um problema ao salvar o produto'})
		})
	}
}

function putId(req, res) {
	let { id } = req.params

	if (isNaN(id)) {
		res.status(400).json({msg: 'Parametro inválido'})
	} else {
		let { nome, preco, marca } = req.body
		if (!nome && !preco && !marca) {
			res.status(400).json({msg: 'Sua requisição está faltando dados'})
		} else {
			database('produtos').where('id', id).update({nome, marca, preco})
			.then(retorno => {
				if (retorno !== 0) {
					res.status(200).json({msg: 'Produto alterado com sucesso'})
				} else {
					res.status(404).json({msg: 'Esse produto não existe'})
				}
			})
			.catch(err => {
				res.status(500).json({msg: 'Houve um problema ao atualizar o produto'})
			})
		}
	}
}

function deleteId(req, res) {
	let { id } = req.params
	
	if (isNaN(id)) {
		res.status(400).json({msg: 'Parametro inválido'})
	} else {
		database('produtos').where('id', id).del()
		.then(retorno => {
			if (retorno !== 0) {
				res.status(204)
			} else {
				res.status(404).json({msg: 'Esse produto não existe'})
			}
		})
		.catch(err => {
			res.status(500).json({msg: 'Houve um problema ao deletar o produto'})
		})
	}
}

module.exports = {
	get,
	getId,
	post,
	putId,
	deleteId
}