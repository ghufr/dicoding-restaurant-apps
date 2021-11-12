const itActsAsFavoriteRestaurantModel = (favoriteRestaurant) => {
  it('should be able to get all favorited restaurant', async () => {
    favoriteRestaurant.putRestaurant({ id: 1 });
    favoriteRestaurant.putRestaurant({ id: 2 });
    favoriteRestaurant.putRestaurant({ id: 3 });

    expect(await favoriteRestaurant.getRestaurant(1)).toEqual({ id: 1 });
    expect(await favoriteRestaurant.getRestaurant(2)).toEqual({ id: 2 });
    expect(await favoriteRestaurant.getRestaurant(3)).toEqual({ id: 3 });
    expect(await favoriteRestaurant.getRestaurant(3)).toEqual({ id: 3 });

    expect(await favoriteRestaurant.getAllRestaurants()).toEqual([
      { id: 1 },
      { id: 2 },
      { id: 3 },
    ]);
  });

  it('should be able to remove favorited restaurant', async () => {
    favoriteRestaurant.putRestaurant({ id: 1 });
    favoriteRestaurant.putRestaurant({ id: 2 });
    favoriteRestaurant.putRestaurant({ id: 3 });

    favoriteRestaurant.deleteRestaurant(3);

    expect(await favoriteRestaurant.getAllRestaurants()).toEqual([
      { id: 1 },
      { id: 2 },
    ]);
  });

  it('should handle remove request even if restaurant not exist', async () => {
    favoriteRestaurant.putRestaurant({ id: 1 });

    favoriteRestaurant.deleteRestaurant(2);

    expect(await favoriteRestaurant.getAllRestaurants()).toEqual([{ id: 1 }]);
  });

  it('should not add restaurant with invalid property', async () => {
    favoriteRestaurant.putRestaurant({ invalidProperty: 1 });
    expect(await favoriteRestaurant.getAllRestaurants()).toEqual([]);
  });
};

// eslint-disable-next-line import/prefer-default-export
export { itActsAsFavoriteRestaurantModel };
