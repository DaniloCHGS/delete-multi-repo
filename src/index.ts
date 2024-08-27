import { Builder, By, Key, until } from "selenium-webdriver";
import * as chrome from "selenium-webdriver/chrome";

async function example() {
  let driver = await new Builder().forBrowser("chrome").build();

  try {
    await driver.get("http://www.google.com");
    await driver
      .findElement(By.name("q"))
      .sendKeys("Selenium WebDriver", Key.RETURN);
    await driver.wait(
      until.titleIs("Selenium WebDriver - Google Search"),
      1000
    );
  } finally {
    await driver.quit();
  }
}

example();
