# ProjectCashBank

Esse repositório contém uma aplicação desenvolvida para ser a API de um banco digital. É formado por um banco de dados Postgres, um back end desenvolvido em TypeScript com Express e manipulando o banco através da ORM TypeORM.

---

## Tecnologias

* Docker

* Postgres

* Node.js

* Express

* TypeScript

* TypeORM

* jsonwebtoken

* bcryptjs

* Mocha/Chai

---

## Instalação

Inicialmente, abra o terminal e cole o seguinte código para clonar o repositório em sua máquina:

```
git clone git@github.com:rafaeldejesusl/ProjectCashBank.git
```

Após clonado, entre na pasta do projeto. Na pasta raiz do projeto, instale as dependências

```
npm install
```

Execute o comando a seguir para inicializar os contâineres da aplicação

```
docker-compose up
```

Execute as migrations para criar as tabelas no banco de dados:

```
npm run migration:up
```

Após isso, a api estará rodando no seguinte endereço:

```
http://localhost:3000/
```

---

## Banco de Dados

O banco de dados roda num contâiner Postgres, e a interação com o backend é realizada através da ORM TypeORM. O nome do banco é cash_db, e contém três tabelas:

* "Accounts" que contém as informações das contas registradas;

* "Users" que contém as informações dos usuários registrados;

* "Transactions" que contém as informações das transações registradas.

---

## Back End

O back end roda num contâiner criado a partir do Dockerfile na pasta "backend", e realiza as operações das tabelas do banco de dados através do TypeORM. As rotas disponíveis são:

* Método POST `/login`, verifica o usuário e a senha e retorna o token;

* Método POST `/user`, cria um novo usuário através do usuário (username) e da senha(password);

* Método GET `/user`, retorna o saldo do usuário autenticado;

* Método POST `/transaction`, cria uma nova transação através do valor (value) e da conta que irá receber (creditedUserUsername);

* Método GET `/transaction/cashout`, retorna a lista de transações feitas pelo usuário autenticado;

* Método GET `/transaction/cashin`, retorna a lista de transações recebidas pelo usuário autenticado;

* Método GET `/transaction`, retorna a lista de todas as transações do usuário autenticado;

* Método POST `/transaction/date`, através da data fornecida no corpo da requisição (dateString), retorna a lista de todas as transações do usuário autenticado naquela data;

---

## Testes

Para verificar a funcionalidade da aplicação, foram realizados testes de integração utilizando Mocha/Chai. Os testes cobrem aproximadamente 94% das linhas de código, e podem ser executados através do seguinte comando:

```
npm test
```

---

## Feedbacks

Caso tenha alguma sugestão ou tenha encontrado algum erro no código, estou disponível para contato no meu [LinkedIn](https://www.linkedin.com/in/rafael-de-jesus-lima/)
