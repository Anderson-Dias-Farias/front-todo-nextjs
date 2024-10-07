# Projeto Next.js com Fastify e Swagger


## Front-Todo-NextJS

Este é o front-end de uma aplicação de tarefas (To-Do) desenvolvida com Next.js. O projeto está integrado com um back-end construído em Fastify, que pode ser encontrado neste repositório. A aplicação utiliza React Hook Form para gerenciamento de formulários, Radix UI para componentes acessíveis, e TailwindCSS para o estilo.

### Tecnologias Utilizadas

- Next.js 14
- React 18
- TypeScript 5
- TailwindCSS 3.4
- React Hook Form
- Radix UI
- Zod (para validação de esquemas)

Este é um projeto [Next.js](https://nextjs.org) criado com [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app) e integrado com um backend Fastify documentado com Swagger. O backend pode ser encontrado [aqui](https://github.com/Anderson-Dias-Farias/fastify-swagger-api).

## Começando

### Frontend

Para iniciar o servidor de desenvolvimento do frontend:

```bash
npm run dev
# ou
yarn dev
# ou
pnpm dev
# ou
bun dev
```

Abra [http://localhost:3000](http://localhost:3000) no seu navegador para ver o resultado.

Você pode começar a editar a página modificando `app/page.tsx`. A página atualiza automaticamente conforme você edita o arquivo.

Este projeto utiliza [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) para otimizar e carregar automaticamente a fonte [Geist](https://vercel.com/font), uma nova família de fontes para a Vercel.

### Backend

O backend deste projeto é uma aplicação de servidor utilizando Fastify e Swagger para documentação de API. Ele inclui rotas para operações CRUD em tarefas e um banco de dados rodando no Docker.

Para mais detalhes sobre como configurar e executar o backend, consulte o [repositório do backend](https://github.com/Anderson-Dias-Farias/fastify-swagger-api).

## Estrutura do Projeto

- `/pages`: Contém as páginas da aplicação Next.js.
- `/components`: Componentes reutilizáveis de UI.
- `/interfaces`: Interfaces para validação de dados.
- `/hooks`: Funções para gerenciamento de estados e requisições.

## Features

- **Formulários**: Gestão de formulários com React Hook Form e validações com Zod.
- **UI Acessível**: Utiliza Radix UI para fornecer componentes acessíveis e personalizáveis.
- **Estilização com TailwindCSS**: Layout moderno e responsivo usando Tailwind.
- **Autenticação**: Integração com o back-end para rotas protegidas, incluindo criação, listagem, atualização e exclusão de tarefas.

## Contribuição

Se você quiser contribuir para este projeto:

1. Faça um fork do repositório.
2. Crie uma branch para sua feature (`git checkout -b feature/nova-feature`).
3. Faça commit das suas alterações (`git commit -m 'Adiciona nova feature'`).
4. Faça o push para a branch (`git push origin feature/nova-feature`).
5. Abra um Pull Request.

## Licença

Este projeto está licenciado sob a licença MIT. Veja o arquivo LICENSE para mais detalhes.
