const jwt = require('jsonwebtoken')

function jwtAutenticacao(req, res, next) {
	let token = req.headers['authorization']
	if (!token) {
		res.status(400).json({msg: 'Nenhum token foi enviado'})
	} else {	
		try {
			let decode = jwt.verify(token.split(' ')[1],'chaveSecreta')
			req.email = decode.email
			next()
		} catch (erro) {
			if(erro.message.includes('jwt expired')) {
				res.status(400).json({msg: 'Token expirado'})
			} else if(erro.message.includes('Unexpected token')) {
				res.status(400).json({msg: 'Token inválido'})
			} else {
				res.status(500).json({msg: 'Houve um erro durante sua requisição'})
			}
		}
	}
}

module.exports = jwtAutenticacao