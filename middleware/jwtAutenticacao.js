const jwt = require("jsonwebtoken")

function jwtAutenticacao(req, res, next) {
	let token = req.headers['authorization'].split(' ')[1]
	try {
		let decode = jwt.verify(token,'chaveSecreta')
		res.email = decode.email
		next()
	} catch (err) {
		if(err.message.includes('jwt expired')) {
			res.status(400).json({msg: 'Token expirado'})
		} else if(err.message.includes('Unexpected token')) {
			res.status(400).json({msg: 'Token inválido'})
		} else {
			res.status(500).json({msg: 'Houve um erro durante sua requisição'})
		}
	}
}

module.exports = jwtAutenticacao