import { AppPage } from './app.po';
import { by, element, browser } from 'protractor';

describe('MemoRay frontend test', () => {

  // it('should fail login with no credentials', () => {
  //   browser.get('/login');
  //   element(by.id('login-btn')).click();

  //   expect(element(by.css('.alert-danger')).getText())
  //     .toEqual("Fields cannot be empty.");
  // });

  // it('should fail login with incorrect credentials', () => {
  //   browser.get('/login');
  //   element(by.id('username')).sendKeys('test');
  //   element(by.id('password')).sendKeys('zaq1@WSX');
  //   element(by.id('login-btn')).click();

  //   expect(element(by.css('.alert-danger')).getText())
  //     .toEqual("Incorrect username or password.");
  // });

  it('should create new user and login', () => {
    browser.get('/login');
    element(by.id('goto-create-user-btn')).click();
    element(by.id('username')).sendKeys('test');
    element(by.id('password')).sendKeys('zaq1@WSX');
    element(by.id('repeatedPassword')).sendKeys('zaq1@WSX');
    element(by.id('create-user-btn')).click();

    expect(element(by.css('.alert-success')).getText())
      .toEqual("Account created successfuly.");

    element(by.id('create-user-goback-btn')).click();

    expect(element(by.id('login-header')).getText()).toEqual('Login');

    element(by.id('username')).sendKeys('test');
    element(by.id('password')).sendKeys('zaq1@WSX');
    element(by.id('login-btn')).click();

    expect(element(by.id('deck-list-header')).getText()).toEqual('Decks');
  });

  // it('should fail creating deck with no name', () => {
  //   browser.get('/menu/deck-list');
  //   element(by.id('deck-list-create-deck-btn')).click();
  //   element(by.id('name')).sendKeys('');
  //   element(by.id('add-deck-btn')).click();

  //   expect(element(by.css('.alert-danger')).getText())
  //     .toEqual("Name cannot be left empty.");
  // });

  it('should successfuly create new deck', () => {
    browser.get('/menu/deck-list');
    element(by.id('deck-list-create-deck-btn')).click();
    element(by.id('name')).sendKeys('deck1');
    element(by.id('add-deck-btn')).click();

    expect(element(by.css('.alert-success')).getText())
      .toEqual("Deck added successfuly.");
  });

  // it('should reject duplicate deck', () => {
  //   browser.get('/menu/deck-list');
  //   element(by.id('deck-list-create-deck-btn')).click();
  //   element(by.id('name')).sendKeys('deck1');
  //   element(by.id('add-deck-btn')).click();

  //   expect(element(by.css('.alert-danger')).getText())
  //     .toEqual("Deck already exist.");
  // });

  it('should reject card with no data', () => {
    browser.get('/menu/deck-list');
    element(by.id('menu-add-link')).click();
    element(by.id('deck')).sendKeys('');
    element(by.id('front')).sendKeys('');
    element(by.id('back')).sendKeys('');
    element(by.id('create-card-btn')).click();
    expect(element(by.css('.alert-danger')).getText())
      .toEqual("Fields cannot be left empty.");
  });

  it('should add card', () => {
    browser.get('/menu/deck-list');
    element(by.id('menu-add-link')).click();
    element(by.id('deck')).sendKeys('deck1');
    element(by.id('front')).sendKeys('front1');
    element(by.id('back')).sendKeys('back1');
    element(by.id('create-card-btn')).click();
    expect(element(by.css('.alert-success')).getText())
      .toEqual("Card added successfuly.");
  });

  it('should reject duplicate card', () => {
    browser.get('/menu/deck-list');
    element(by.id('menu-add-link')).click();
    element(by.id('deck')).sendKeys('deck1');
    element(by.id('front')).sendKeys('front1');
    element(by.id('back')).sendKeys('back1');
    element(by.id('create-card-btn')).click();
    expect(element(by.css('.alert-danger')).getText())
      .toEqual("Card already exist.");
  });

  it('should reject duplicate card', () => {
    browser.get('/menu/deck-list');
    element(by.binding('deck.name')).click();
    expect(element(by.id('deck-header')).getText()).toEqual('Deck1');
  });

  it('should delete user', () => {
    element(by.id('menu-settings-link')).click();
    element(by.id('delete-user-btn')).click();
    browser.switchTo().alert().accept();

    expect(element(by.id('login-header')).getText()).toEqual('Login');
  });
});
