import { Builder, By, until } from "selenium-webdriver";
import * as chrome from "selenium-webdriver/chrome";

interface GitHubCredentials {
  email: string;
  password: string;
}

async function accessGitHub({ email, password }: GitHubCredentials) {
  // Configuração do WebDriver para o Chrome
  let driver = await new Builder().forBrowser("chrome").build();

  try {
    // Acessa a página de login do GitHub
    await driver.get("https://github.com/login");

    const header = await driver.wait(
      until.elementLocated(By.xpath("//h1[text()='Sign in to GitHub']")),
      10000
    );

    // Espera até que o texto dentro do elemento <h1> seja "Sign in to GitHub"
    await driver.wait(until.elementTextIs(header, "Sign in to GitHub"), 10000);

    console.log("Acessou a página de login do GitHub com sucesso!");

    // Localiza o campo de entrada de login e preenche com o email
    const loginInput = await driver.findElement(By.css("input#login_field"));
    await loginInput.sendKeys(email);

    console.log(`Preencheu o campo de login com "${email}" com sucesso!`);

    // Localiza o campo de entrada de senha e preenche com a senha
    const passwordInput = await driver.findElement(By.css("input#password"));
    await passwordInput.sendKeys(password);

    console.log(`Preencheu o campo de senha com "${password}" com sucesso!`);

    // Localiza e clica no botão de submit
    const submitButton = await driver.findElement(
      By.css("input[type='submit']")
    );
    await submitButton.click();

    console.log("Clicou no botão de envio com sucesso!");

    // Localiza e clica no botão "Show more"
    const showMoreButton = await driver.wait(
      until.elementLocated(By.xpath("//button[contains(text(), 'Show more')]")),
      10000
    );
    await showMoreButton.click();
  } catch (error) {
    console.error(
      "Erro ao acessar o GitHub ou preencher o campo de login:",
      error
    );
  }
  // finally {
  //   // Fecha o navegador
  //   await driver.quit();
  // }
}

accessGitHub();
