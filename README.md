<p align="center">
  <img  src="https://camo.githubusercontent.com/8c13dc2618dbd7f76d1d574350b98fdee1335ce5/68747470733a2f2f726f636b6574736561742d63646e2e73332d73612d656173742d312e616d617a6f6e6177732e636f6d2f626f6f7463616d702d6865616465722e706e67">
</p>
</br>
<p align="center">
  <img src="https://github.com/TulioCaz/gobarber-web-aplication/blob/master/src/assets/logo.svg?sanitize=true">
</p>
</br>

<h2 align="center" style="font-weight: bold;">GoBarber - Web Aplication </h2>

</br>
<p align="center">
  <img src="https://camo.githubusercontent.com/dda2124efff062e38068943c6e848540387df6e5/68747470733a2f2f696d672e736869656c64732e696f2f62616467652f6c6963656e73652d4d49542d253233303444333631" alt="licenceMIT">
</p>
</br>

## :speech_balloon: Sobre

API GoBarber, aplicação que conecta prestadores de serviço (Barbeiros e Cabeleireiros) aos clientes em suas regiões. Aplicação
montada durante o bootcamp GoStack aplicando todo o conhecimento adquirido durante a jornada. Neste projeto foi utilizada as
melhores práticas na construção do projeto, com o uso das tecnologias TypeScript, Express, TypeORM em cima do Ambiente e execução
de javascript, o NodeJS.

Faz parte do projeto GoBarber

- [Web Aplication](https://github.com/tgmarinho/gobarber-web-aplication): Aplicação Web contruida em ReactJs
- [Mobile Aplication](https://github.com/tgmarinho/gobarber-mobile-aplication): Aplicação Mobile construida em React Native.

## :rocket: Tecnologias

- [TypeScript](https://www.typescriptlang.org/): Linguagem.
- [NodeJs](https://nodejs.org/en/): Ambiente de Execução.
- [Express](https://expressjs.com/): API Framework
- [JsonWebToken](https://github.com/auth0/node-jsonwebtoken): Autenticação JWT
- [Multer](https://github.com/expressjs/multer): Upload de Arquivos
- [Postgres](https://www.postgresql.org/): Banco de Dados
- [TypeORM](https://typeorm.io/#/): ORM
- [Eslint](https://eslint.org/): Padronização de código
- [Jest](https://jestjs.io/): Testes
- [tsyringe](https://github.com/microsoft/tsyringe): Lib de injeção de dependencias. -[uuidv4](https://github.com/thenativeweb/uuidv4#readme): uuid.

:warning: Durante o desenvolvimento irei atualizando a lista de tecnologia

## 🔖 Layout

Uma API Rest, que retorna o conteúdo em JSON que vai ser consumida tanto por um Front-end em [ReactJS](https://reactjs.org/) quanto por uma aplicação Mobile Hibrido com [React Native](https://reactnative.dev/).

### Base da Aplicação.

    Requisitos funcionais:
      [] 100% de cobertura de testes nos services da aplicação.
      [] Tratamento de exceções global

    Requisitos Não Funcionais:
      - Framework da API - Express
      - Linguagem de Programação - TypeScript
      - Banco de dados utilizado na aplicação - Postgres
      - ORM - TypeORM
      - Lib de testes - Jest
      - Utilizar Mailtrap para testar envios de email em ambiente de desenvolvimento
      - Utilizar Amazon SES para envios de email em ambiente de Produção.
      - Utilizar Eslint, Prettier e EditorConfig para padronizar o código em ambiente de desenvolvimento, com a style guide do AirBnb

### Criação de usuário

    Requisitos Funcionais:
      [x] Criação de conta com (Nome, Email, Senha);
      [] Envio de email confirmando criação de conta;

    Requisitos Não Funcionais:
      - Envio de email utilizando lib Nodemailer;

    Regras de Negócio:
      [] Não pode ser criado duas contas com o mesmo email;
      [] O usuário deve confirmar a senha ao criar uma conta.
      [] A senha deve ser Hasheada antes de ser gravada no banco de dados;

### Autenticação

    Requisitos Funcionais:
      [] O usuário deve poder se Autenticar utilizando email e senha;

    Requisitos Não Funcionais:
      - A autenticação deve ser feita com Json Web Token (JWT);

    Regras de Negócio:
      [x] No payload do token deve ser armazenado o ID do usuário;

### Recuperação de Senha

    Requisitos Funcionais:
      [x] O usuário deve poder recuperar sua senha informando o seu email;
      [x] O usuário de receber um email com instruções de recuperação de senha;
      [x] O usuário deve poder resetar sua senha ;

    Requisitos Não Funcionais:
      - Envio de email utilizando lib Nodemailer;
      - O envio de email deve acontecer em segundo plano (background job);


    Regras de Negócio:
      [x] O link enviado por email para resetar a senha, deve expirar em 2h;
      [x] O usuário precisa confirmar a nova senha ao resetar sua senha.

### Atualização de Perfil

    Requisitos Funcionais:
      [] O usuário deve poder atualizar seu perfil (nome, email, senha, Avatar);

    Regras de Negócio:
      [x] O usuário não pode alterar seu email para um email ja em uso na aplicação
      [x] Para atulizar sua senha, o usuário deve informar a senha antiga;
      [x] Para atulizar sua senha, o usuário precisa confirmar a senha;

### Painel de usuário (Prestador de serviço)

    Requisitos Funcionais:
      [] O prestador deve poder listar os seus agendamentos de um dia especifico;
      [] O prestador deve poder receber uma notificação sempre que houver um novo agendamento;
      [] O prestador deve poder visualizar as notificações não lidas;


    Requisitos Não Funcionais:
      - Os agendamentos devem ser armazenados em cache.
      - As notificações do prestador devem ser armazenadas no MongoDB;
      - As notificações do prestador devem ser enviadas em tempo-real utilizando Socket.io;

    Regras de Negócio:
      [] A notificação deve ter um status de lida ou não-lida para que o prestador possa controlar;

### Agendamento de serviço

    Requisitos Funcionais:
      [] O usuário deve poder listar todos os prestadores de serviço cadastrados;
      [] O usuário deve poder visualizar os dias de um mês com pelo menos um horário disponível de um prestador;
      [] O usuário deve poder visualizar os horários disponíveis de um dia especifico de um prestador;
      [] O usuário deve poder realizar um novo agendamento com um prestador;
      [] O usuário deve poder listar os agendamentos já marcados;
      [] O usuário deve poder cancelar um agendamento marcado.

    Requisitos Não Funcionais:
      - A listagem de prestadores devem ser armazenadas em cache.

    Regras de Negócio:
      [] Cada agendamento deve durar 1h exatamente;
      [] Os agendamentos devem estar disponíveis entre 8h às 18h sendo o último agendamento iniciado as 17h;
      [] O usuário não pode agendar em um horário já ocupado;
      [] O usuário não pode agendar em um horário que já passou;
      [] O usuário não pode agendar consigo mesmo;

---

## :book: **Thiago Marinho**

Desafio realizado por Thiago Marinho de Oliveira.

## tips/scripts

### criar migrations:

- Tem um script no package para auxiliar nisso, uma vez que estamos usando ts.

Terminal: `yarn typeorm migration:create -n CreateAppointments`

- Execugtar migration: `yarn typeorm migration:run`
- Rollback desfazer : `yarn typeorm migration:revert`

Ver quais migrations já foram executadas:

`yarn typeorm migration:show`