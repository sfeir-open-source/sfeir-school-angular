import { Angular200Page } from './app.po';

describe('angular-200 App', function() {
  let page: Angular200Page;

  beforeEach(() => {
    page = new Angular200Page();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
