# Controlador de carteira

## Tecnologias
- Node
- Typescript

## Motivações

Esse projeto foi criado com um único propósito: Rebalanceamento de ativos dentro de uma carteira de investimento. Entretanto, os propósitos podem evoluir até se tornar um software que seja capaz
de entregar mais valor para seus usuários. Nunca se sabe onde podemos parar, mas um rebalanceador de ativos é sempre algo que falta em diversos controladores de carteira que utilizo.

## Filosofias e premissas

Inicialmente, foram utilizados os conceitos de [Clean Architecture](https://blog.cleancoder.com/uncle-bob/2012/08/13/the-clean-architecture.html) para estruturar o projeto, sem frameworks, libs ou qualquer coisa que gere forte acoplamento. Somente regras de negócio de forma pura.

## Como instalar?

Aqui você vai precisar do [nvm](https://github.com/nvm-sh/nvm), apenas.
Para instalar execute os seguintes passos:
- `nvm use`
    - Caso a versao correta do Node não esteja instalada, execute `nvm install`
- `npm i`

## Como executar?

Atualmente, só foi implementado via CLI o caso de uso de rebalanceamento de carteira. Para isso, renomeie o arquivo `products.json.example` para `products.json` e preencha a lista com os seus ativos. O campo `url` deve ser preenchido com a uri do ativo em questão dentro do site "Status Invest", ou seja, se você tiver um ativo na URL https://statusinvest.com.br/etfs/ivvb11, o campo deve ser preenchido com "etfs/ivvb11". É recomendado executar esse software com o pregão fechado, pois a atualização da fonte de dados não é ao vivo.
Para adicão de Fundos de investimentos em ações ou multimercados que não são cotizados, crie o ativo financeiro com preço (price) igual à `1` e adicione o valor atual alocado como quantidade `quantity`.
Para acessar o rebalanceamento via CLI, execute: `npm run cli VALOR_DE_APORTE`.
