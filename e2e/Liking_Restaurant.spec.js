const assert = require('assert');

Feature('Liking Restaurant');

const IseeLikeButton = (I) => {
  I.seeAttributesOnElements('#likeButton', {
    'aria-label': 'Like this restaurant',
  });
};

const IseeLikedButton = (I) => {
  I.seeAttributesOnElements('#likeButton', {
    'aria-label': 'Unlike this restaurant',
  });
};

Scenario('Empty favorite page', ({ I }) => {
  I.amOnPage('/#/favorite');
  I.see('No Favorited Restaurant', '.error__content');
});

Scenario('Like one restaurant and check favorite pages', async ({ I }) => {
  I.amOnPage('/');
  I.seeElement('.resto-item__title a');

  const firstRestaurant = locate('.resto-item__title a').first();
  const firstRestaurantTitle = await I.grabTextFrom(firstRestaurant);
  I.click(firstRestaurant);

  IseeLikeButton(I);
  I.click('#likeButton');
  IseeLikedButton(I);

  I.amOnPage('/#/favorite');
  I.seeElement('.resto-item');

  const likedRestaurantTitle = await I.grabTextFrom('.resto-item__title');

  assert.strictEqual(firstRestaurantTitle, likedRestaurantTitle);
});

Scenario('Unliking a restaurant', ({ I }) => {
  I.amOnPage('/');
  const firstRestaurant = locate('.resto-item__title a').first();
  I.click(firstRestaurant);

  IseeLikeButton(I);
  I.click('#likeButton');

  IseeLikedButton(I);

  I.click('#likeButton');
  IseeLikeButton(I);

  I.amOnPage('/#/favorite');
  I.dontSeeElement('.resto-item');
});
