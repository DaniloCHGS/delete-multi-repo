# Delete Multi Repo

Este projeto automatiza o processo de exclusão de repositórios do GitHub utilizando Selenium WebDriver com Node.js e TypeScript. O fluxo do código realiza login no GitHub, navega até as configurações de cada repositório e executa a exclusão conforme as etapas descritas.

## Requisitos

- [Node.js](https://nodejs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [Selenium WebDriver](https://www.selenium.dev/)
- [ChromeDriver](https://sites.google.com/a/chromium.org/chromedriver/)
- [dotenv](https://www.npmjs.com/package/dotenv)

## Instalação

1. **Clone o repositório:**

   ```bash
   git clone https://github.com/DaniloCHGS/delete-multi-repo
   cd github-delete-multi-repo

   ```

2. **Instale as dependências:**

   ```bash
   npm install

   ```

3. **Utilize um arquivo .env-example apenas como .env na raiz do projeto e adicione suas credenciais do GitHub:**

   ```bash
   GITHUB_EMAIL=seu-email@example.com
   GITHUB_PASSWORD=sua-senha
   GITHUB_USERNAME=seu-usuario

   ```

4. **Carregue o array repositories no index.ts com os nomes dos repositórios que deseja excluir:**

   ```bash
   const repositories: Repositories = ["repo-1", "repo-2", "repo-3"];

   ```

5. **Execute o código:**

   ```bash
   npm run start
   ```