import { AppPage } from './app.po';
import { by, element, browser } from 'protractor';

describe('frontend App', () => {

  it('should login', () => {
    browser.get('/login');
    element(by.id('username')).sendKeys('test');
    element(by.id('password')).sendKeys('zaq1@WSX');
    element(by.id('login-btn')).click();

    expect(element(by.id('header')).getText()).toEqual('Decks');
  });

  it('should fail login - incorrect credentials', () => {
    browser.get('/login');
    element(by.id('username')).sendKeys('test_fail');
    element(by.id('password')).sendKeys('zaq1@WSX');
    element(by.id('login-btn')).click();

    expect(element(by.id('error-message')).getText())
      .toEqual("Incorrect username or password.");
  });

  it('should fail login - no credentials', () => {
    browser.get('/login');
    element(by.id('login-btn')).click();

    expect(element(by.id('error-message')).getText())
      .toEqual("Fields cannot be empty.");
  });

  it('should create new user and login', () => {
    browser.get('/login');
    element(by.id('goto-create-user-btn')).click();
    element(by.id('username')).sendKeys('test_new');
    element(by.id('password')).sendKeys('zaq1@WSX');
    element(by.id('repeatedPassword')).sendKeys('zaq1@WSX');
    element(by.id('create-user-btn')).click();
    expect(element(by.id('create-user-success-message')).getText())
      .toEqual("Account created successfuly.");
    element(by.id('create-user-goback-btn')).click();
    element(by.id('username')).sendKeys('test_new');
    element(by.id('password')).sendKeys('zaq1@WSX');
    element(by.id('login-btn')).click();
    expect(element(by.id('header')).getText()).toEqual('Decks');
  });
});
