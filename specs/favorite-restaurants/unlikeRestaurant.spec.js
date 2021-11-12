import FavoriteRestaurantIdb from '../../src/scripts/data/favourite-restaurant-idb';
import {
  createContainer,
  createLikeButtonPresenterTest,
} from '../helpers/testFactories';

describe('Unliking a restaurant', () => {
  beforeEach(async () => {
    createContainer('likeButtonContainer');
    await FavoriteRestaurantIdb.putRestaurant({ id: 1 });
  });

  afterEach(async () => {
    await FavoriteRestaurantIdb.deleteRestaurant(1);
  });

  it('should render unlike button', async () => {
    await createLikeButtonPresenterTest({ id: 1 });

    expect(
      document.querySelector('[aria-label="Unlike this restaurant"]')
    ).toBeTruthy();
  });

  it('should not render unlike button if restaurant not liked', async () => {
    await createLikeButtonPresenterTest({});

    expect(
      document.querySelector('[aria-label="Unlike this restaurant"]')
    ).toBeFalsy();
  });

  it('should be able to unlike a restaurant', async () => {
    await createLikeButtonPresenterTest({ id: 1 });
    document.querySelector('#likeButton').dispatchEvent(new Event('click'));

    expect(await FavoriteRestaurantIdb.getAllRestaurants()).toEqual([]);
  });

  it('should not error to unlike a restaurant if its not on the list', async () => {
    await createLikeButtonPresenterTest({ id: 1 });

    FavoriteRestaurantIdb.deleteRestaurant(1);

    document.querySelector('#likeButton').dispatchEvent(new Event('click'));
    expect(await FavoriteRestaurantIdb.getAllRestaurants()).toEqual([]);
  });
});
