const {Builder, By} = require('selenium-webdriver');
const assert = require('assert');

describe('Bookly Functional Test', function() {
  this.timeout(30000);
  let driver;

  before(async () => {
    driver = await new Builder().forBrowser('chrome').build();
  });

  after(async () => {
    await driver.quit();
  });

  it('should add a book successfully', async () => {
    await driver.get('http://localhost:8080');
    await driver.findElement(By.id('book-title')).sendKeys('1984');
    await driver.findElement(By.css('form button')).click();
    const books = await driver.findElements(By.className('book-card'));
    assert(books.length > 0, 'No books added');
  });
});
