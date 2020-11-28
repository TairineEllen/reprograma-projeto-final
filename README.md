# Reprograma - Projeto Final

<img src="https://i.ibb.co/5Gr2mFr/undraw-a-better-world-9xfd.png" alt="mulher em pé em frente a uma janela" border="0" width = "200" />

Para o meu projeto, me inspirei em iniciativas como Esqueça Um Livro e Livro Viajante. Ou seja, livros que transitam entre leitores, tornando-se objetos vivos que estão sempre sendo lidos.

Um leitor se cadastra no sistema fornecendo nome, email, bairro e livros que pretende compartilhar. O bairro é uma informação obrigatória, pois o usuário poderá filtrar os livros por bairro.
Ao cadastrar o livro, além de título e autoria, o leitor deve indicar que se ele está disponível para empréstimo e se quer que o usuário o devolva ou o repasse para um outro usuário.

A API terá dois schemas:

| Leitores	   | Livros			  |
| ------------ | ------------ |
| nome         | título		    |
| email        | autoria      |
| bairro       | disponível   |
| livros       | devolver (?) |

O usuário que entra na API em busca de um livro, poderá filtrá-los por livros disponíveis, por bairro ou buscar diretamente pelo título. Ao escolher o livro, o usuário entra em contato com o dono do livro solicitando o empréstimo e marcando um ponto de encontro para receber o livro (por isso a informação do bairro é importante). Com o livro em mãos, o status do livro passa a ser não disponível; quando o usuário terminar a leitura, o status é alterado novamente para disponível e o livro volta para a lista de empréstimos.

------------

#### Tecnologias utilizadas
- Node.js
- MongoDB
- Git

#### Pacotes utilizados

#### Instruções de instalação

#### Rotas