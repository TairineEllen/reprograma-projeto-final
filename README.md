# Reprograma - Projeto Final - Gira o Livro

<p align="center">
<img src="./assets/books.png" alt="livro entre duas setas em direção oposta" border="0" width = "400" />
</p>

Para o meu projeto, me inspirei em iniciativas como Esqueça Um Livro e Livro Viajante. Ou seja, livros que transitam entre leitores, tornando-se objetos vivos que estão sempre sendo lidos.

### Como funciona?

- O leitor se cadastra no sistema fornecendo obrigatoriamente nome, email e senha.
- Na etapa do cadastro, o leitor pode ou não optar por cadastrar um ou quantos livros ele quiser.
- Ao cadastrar o livro, além de título e autoria, o leitor deve indicar em que bairro se encontra e, claro, indicar que está livre para empréstimo.
- Um usuário **não** cadastrado tem acesso a todos os livros disponíveis para empréstimo, podendo filtrá-los por bairro e/ou buscar direamente por título e/ou autoria.
- Porém, para realizar o empréstimo, o usuário precisa se cadastrar e realizar o login.
- Ao escolher o livro desejado, o usuário entra em contato como o dono solicitando o empréstimo e marcando um ponto de encontro para receber o livro.
- Com o livro em mãos, o usuário altera o bairro cadastrado para o seu próprio bairro e altera o status do livro para não disponível.
- Quando o usuário terminar a leitura, o status é alterado novamente para disponível e o livro volta para a lista de empréstimos.

##### Schemas

| Leitores	   | Livros			  |
| ------------ | ------------ |
| nome         | título		    |
| email        | autoria      |
| senha        | disponível   |
| livros       | bairro       |


------------

#### Tecnologias utilizadas
- Node.js
- MongoDB
- Git

#### Pacotes utilizados

- express
- nodemon
- dotenv-safe
- mongoose
- bcrypt
- jsonwebtoken

#### Instruções de instalação

```bash
# Clonar o repositório
$ git clone https://github.com/TairineEllen/reprograma-projeto-final

# Entrar na pasta do repositório
$ cd reprograma-projeto-final

# Instalar as dependências
$ npm install

# Executar o servidor
$ npm start

```

#### Rotas

| Rotas                                   |                                                    |
| --------------------------------------- | -------------------------------------------------- | 
| GET/leitores                            | Listar todos os leitores                           |
| GET/leitores/idLeitor                   | Acessar um leitor por seu id                       |
| GET/leitores/idLeitor/livros            | Listar livros de um determinado leitor             |
| GET/livros                              | Listar todos os livros                             |
| GET/livros/disponivel                   | Listar todos os livros disponíveis pra empréstimo  |
| POST/leitores                           | Cadastrar um novo leitor                           |
| POST/leitores/login                     | Login do leitor                                    |
| POST/leitores/idLeitor/livros           | Cadastrar novo livro                               |
| PUT/leitores/idLeitor                   | Alterar dados de um leitor                         |
| PUT/leitores/idLeitor/livros/idLivro    | Alterar dados de um livro                          |
| PATCH/livros/idLivro                    | Alterar status do livro (bairro e disponibilidade) |
| DELETE/leitores/idLeitor                | Excluir um leitor                                  |
| DELETE/leitores/idLeitor/livros/idLivro | Excluir um livro                                   |

Na rota GET/livros/disponivel, é possível filtrar e buscar os livros por até três parâmetros:

| Exemplo                                                                                                      |
| ------------------------------------------------------------------------------------------------------------ |
| https://projeto-final-tairine.herokuapp.com/livros/disponivel?titulo=Emma&autoria=Jane%20Austen&bairro=Derby |

------------

### Gostaria de contribuir?

1. Fork o projeto;
2. Crie uma branch para realizar suas alterações: `git checkout -b feature/nome-da-sua-branch`
3. Commit suas alterações e abra um pull request


------------

<p align="center">
<img src="./assets/logo.png" alt="menina em frente a janela" border="0" width = "120" />
</p>

<p align="center">
Desenvolvido com :black_heart: por Tairine Ellen com o apoio da {reprograma} 
</p>

<p align="center">

<img src="./assets/logo-reprograma.png" alt="logo da reprograma" border="0" width = "200" />

</p>





