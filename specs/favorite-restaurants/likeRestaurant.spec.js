import FavoriteRestaurantIdb from '../../src/scripts/data/favourite-restaurant-idb';
import {
  createContainer,
  createLikeButtonPresenterTest,
} from '../helpers/testFactories';

describe('Liking a restaurant', () => {
  beforeEach(() => {
    createContainer('likeButtonContainer');
  });

  afterEach(async () => {
    await FavoriteRestaurantIdb.deleteRestaurant(1);
  });

  it('should render like button', async () => {
    await createLikeButtonPresenterTest({ id: 1 });

    expect(
      document.querySelector('[aria-label="Like this restaurant"]')
    ).toBeTruthy();
  });

  it('should render unlike button before been liked', async () => {
    await createLikeButtonPresenterTest({ id: 1 });

    expect(
      document.querySelector('[aria-label="Unlike this restaurant"]')
    ).toBeFalsy();
  });

  it('should able to like a restaurant', async () => {
    await createLikeButtonPresenterTest({ id: 1 });

    document.querySelector('#likeButton').dispatchEvent(new Event('click'));

    const restaurant = await FavoriteRestaurantIdb.getRestaurant(1);

    expect(restaurant).toEqual({ id: 1 });
  });

  it('should not be able to like a restaurant twice', async () => {
    await createLikeButtonPresenterTest({ id: 1 });
    await FavoriteRestaurantIdb.putRestaurant({ id: 1 });

    document.querySelector('#likeButton').dispatchEvent(new Event('click'));

    expect(await FavoriteRestaurantIdb.getAllRestaurants()).toEqual([
      { id: 1 },
    ]);
  });

  it('should not be able to like a restaurant without id', async () => {
    await createLikeButtonPresenterTest({ invalidProperty: 1 });

    document.querySelector('#likeButton').dispatchEvent(new Event('click'));

    expect(await FavoriteRestaurantIdb.getAllRestaurants()).toEqual([]);
  });
});
