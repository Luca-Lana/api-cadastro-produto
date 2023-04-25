# Api cadastro de produtos

Esta é uma API de cadastro de produtos, na qual para ter acesso às rotas é necessário se cadastrar e fazer login para receber um token e, em seguida, conseguir acessar as rotas para criar, ler, atualizar e excluir os produtos.

Desenvolvi esse projeto do zero para praticar tudo o que aprendi sobre Node.js, incluindo padrões de projeto, bibliotecas e muito mais. Embora o projeto esteja concluído, continuarei a trabalhar nele para implementar novos recursos ou refatorar o código de maneira mais eficiente à medida que eu for aprendendo mais.d
	
### 📋 Pré-requisitos

Para rodar o projeto é necessário ter o [NodeJS](https://nodejs.org/en/download) ná sua máquina.

### 🔧 Instalação

Para ter o projeto em sua máquina basta fazer download dos arquivos extrair para uma pasta ou clonar o projeto com o comando:

```shell
	git clone https://github.com/Luca-Lana/api-cadastro-produto.git
```

Após clonar o projeto entre na pasta e instale todas as bibliotecas com o comando:

```shell
	npm i
```

É necessário tambem rodar as migrations para que as tabelas sejam criadas no banco de dados. Caso tenha alguma dúvida consulte a documentação do knex para saber como rodar as migrations.

### ROTAS

### POST /cadastro
Esta rota permite que um usuário se cadastre na API. É necessário enviar um nome, email e senha.

```
	POST /cadastro
	{	
		"nome": "user",
	    "email": "user@example.com",
	    "senha": "s3cr3t"
	}

```

Exemplo de resposta: 

```
	Status: 200 OK
	{
		"msg": "Usuario criado com sucesso"
	}
```

### POST /login
Esta rota permite que o usuário se logue e receba seu token. Se for a primeira vez logando vai ser criado o token e retornado pra ele caso ele ja tenha o token vai ser feita uma verifcação se token ainda é válido se for vai retornar o mesmo token caso não seja vai ser criado um novo token.

```
	POST /login
	{	
	    "email": "user@example.com",
	    "senha": "s3cr3t"
	}

```

Exemplo de resposta: 

```
	Status: 200 OK
	{
		"msg": "Token gerado com sucesso",
		"token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJ1c2VyQGV4YW1wbGUuY29tIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c"
	}
	{
		"token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJ1c2VyQGV4YW1wbGUuY29tIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c"
	}
```

### GET /produtos
Esta rota vai retornar todos os produtos cadastrados. É necessario envia o token pelo header.

```
	GET /produtos
```

Exemplo de resposta: 

```
	Status: 200 OK
	{
		dados: [
		    {
		        "id": 1,
		        "nome": "produto A",
		        "preco": 10.99,
		        "marca": "marca A"
		    },
		    {
		        "id": 2,
		        "nome": "produto B",
		        "preco": 9.99,
		        "marca": "marca B"
		    }
		]
	}
```

### GET /produtos/:id
Esta rota vai retornar o produto correspondente ao id passado se ele existir. É necessario envia o token pelo header.

```
	GET /produtos/2
```

Exemplo de resposta: 

```
	Status: 200 OK
	{
		dados: [
		    {
		        "id": 2,
		        "nome": "produto B",
		        "preco": 9.99,
		        "marca": "marca B"
		    }
		]
	}
```

### POST /produtos
Esta rota vai cadastrar o produto no banco de dados. É necessario passar o nome, preco e marca do produto junto com o token pelo header.
```
	POST /produtos/
	{	
		"nome": "caneta",
	    "preco": 2.44,
	    "marca": "bic"
	}
```

Exemplo de resposta: 

```
	Status: 200 OK
	{
		msg: 'Produto inserido com sucesso'
	}
```

### PUT /produtos/:id
Esta rota vai alterar o produto correspondente ao id se o produto existir. É necessario enviar algum campo para ser alterado junto com o token no cabeçalho.
```
	PUT /produtos/2
	{	
	    "marca": faber castel
	}
```

Exemplo de resposta: 

```
	Status: 200 OK
	{
		msg: 'Produto alterado com sucesso'
	}
```

### DELETE /produtos/:id
Esta rota vai deletar o produto correspondente ao id se o produto existir.É necessario enviar o token no cabeçalho.
```
```
	DELETE /produtos/2
	{	
	    "marca": faber castel
	}
```

Exemplo de resposta: 

```
	Status: 200 OK
	{
		msg: 'Produto deletado com sucesso'
	}
```


## 🛠️ Construído com

* [express]() - O framework web usado
* [bcrypt]() - Biblioteca para criptografar senhas
* [Jwt]() - Biblioteca para autenticação
* [Knex]() - Biblioteca para acessar o banco
* [MySQL]() - Usado para o banco de dados

⌨️ com ❤️ por [Luca Lana]() 😊