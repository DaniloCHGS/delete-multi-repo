import { Builder, By, until } from "selenium-webdriver";

interface GitHubCredentials {
  email: string;
  password: string;
  userName: string;
}

export type Repositories = string[];

export async function accessGitHub(
  { email, password, userName }: GitHubCredentials,
  repositories: Repositories
) {
  let driver = await new Builder().forBrowser("chrome").build();

  try {
    await driver.get("https://github.com/login");

    const header = await driver.wait(
      until.elementLocated(By.xpath("//h1[text()='Sign in to GitHub']")),
      10000
    );
    await driver.wait(until.elementTextIs(header, "Sign in to GitHub"), 10000);

    const loginInput = await driver.findElement(By.css("input#login_field"));
    await loginInput.sendKeys(email);

    const passwordInput = await driver.findElement(By.css("input#password"));
    await passwordInput.sendKeys(password);

    const submitButton = await driver.findElement(
      By.css("input[type='submit']")
    );
    await submitButton.click();

    for (const repo of repositories) {
      const repositoryUrl = `https://github.com/${userName}/${repo}/settings`;
      await driver.get(repositoryUrl);

      const buttonDeleteThisRepository = await driver.findElement(
        By.css("button#dialog-show-repo-delete-menu-dialog")
      );
      await buttonDeleteThisRepository.click();

      const buttonIWantToDeleteThisRepository = await driver.findElement(
        By.css("button#repo-delete-proceed-button")
      );
      await buttonIWantToDeleteThisRepository.click();
      await driver.sleep(2000);

      const buttonModalIWantToDeleteThisRepository = await driver.findElement(
        By.css("button#repo-delete-proceed-button")
      );
      await buttonModalIWantToDeleteThisRepository.click();

      const inputToConfirm = await driver.findElement(
        By.css("input[data-repo-nwo]")
      );
      await inputToConfirm.sendKeys(`${userName}/${repo}`);

      await driver.sleep(2000);

      const buttonDelete = await driver.findElement(
        By.css("button#repo-delete-proceed-button")
      );
      await buttonDelete.click();

      await driver.sleep(2000);

      const finalUrl = await driver.getCurrentUrl();
      if (finalUrl === `https://github.com/${userName}?tab=repositories`) {
        console.log(`Repositório ${repo} deletado com sucesso!`);
      } else {
        console.error(`Falha ao deletar o repositório ${repo}.`);
      }
    }
  } catch (error) {
    console.error("Erro ao acessar o GitHub ou processar repositórios:", error);
  } finally {
    await driver.quit();
  }
}
