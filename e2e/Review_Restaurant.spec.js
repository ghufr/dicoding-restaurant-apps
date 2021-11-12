Feature('Review Restaurant');

Scenario('Review one restaurant', async ({ I }) => {
  I.amOnPage('/');
  const firstRestaurant = locate('.resto-item__title a').first();
  I.click(firstRestaurant);

  I.fillField('name', 'Test Codecept');
  I.fillField('review', 'Value');
  I.click('Submit');
  // no guarantee comment will be shown
  I.seeInField('name', '');
  I.seeInField('review', '');
});
