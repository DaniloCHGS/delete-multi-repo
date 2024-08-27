import * as dotenv from "dotenv";
import { accessGitHub, Repositories } from "./accessGitHub";

dotenv.config();

const email = process.env.GITHUB_EMAIL;
const password = process.env.GITHUB_PASSWORD;
const userName = process.env.GITHUB_USERNAME;

const repositories: Repositories = [];

if (email && password && userName) {
  accessGitHub({ email, password, userName }, repositories);
} else {
  console.error(
    "Credenciais do GitHub não encontradas nas variáveis de ambiente."
  );
}
