describe('todo login', function() {
  // https://github.com/sakshisingla/Protractor-Non-Angular-Tests/wiki/Creating-test-scripts-using-Protractor-for-non-angular-application

  beforeEach(function() {
    //browser().navigateTo('/services')
    browser.ignoreSynchronization = true; // Do not wait for Angular on this page
    browser.driver.get('https://localhost/logout');
    browser.driver.get('https://localhost/login');

    element(by.name('id')).sendKeys('tester');
    element(by.name('password')).sendKeys('tester');
    element(by.buttonText('Log in')).click();
  });

  it('should accept tester login', function() {
    expect(browser.driver.getCurrentUrl()).toBe('https://localhost/todos_jquery_view');
  });

  it('should accept tester logout', function() {
    browser.driver.get('https://localhost/logout');
    expect(browser.driver.getCurrentUrl()).toBe('https://localhost/');
  });

});
