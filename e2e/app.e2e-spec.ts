import { InternsheepPage } from './app.po';

describe('internsheep App', function() {
  let page: InternsheepPage;

  beforeEach(() => {
    page = new InternsheepPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
