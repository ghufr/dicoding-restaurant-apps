import FavoriteRestaurantIdb from '../../src/scripts/data/favourite-restaurant-idb';
import { itActsAsFavoriteRestaurantModel } from '../contract/favoriteRestaurantContract.spec';

describe('FavoriteRestaurantIdb implements FavoriteRestaurantModel', () => {
  afterEach(async () => {
    const restaurants = await FavoriteRestaurantIdb.getAllRestaurants();
    restaurants.forEach(async (restaurant) => {
      await FavoriteRestaurantIdb.deleteRestaurant(restaurant.id);
    });
  });

  itActsAsFavoriteRestaurantModel(FavoriteRestaurantIdb);
});
