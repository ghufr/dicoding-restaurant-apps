import RestaurantSource from '../../src/scripts/data/restaurant-source';
import {
  createContainer,
  createReviewFormPresenterTest,
} from '../helpers/testFactories';

describe('Reviewing a restaurant', () => {
  let restaurant = {};

  beforeAll(async () => {
    const { restaurants } = await RestaurantSource.restaurantList();
    // eslint-disable-next-line prefer-destructuring
    restaurant = restaurants[0];
  });

  beforeEach(() => {
    createContainer('form-review-container');
  });

  it('should render a restaurant review form', async () => {
    await createReviewFormPresenterTest(restaurant);

    expect(document.querySelector('#form-review')).toBeTruthy();
  });

  it('should be able to review a restaurant', async () => {
    const reviewData = {
      id: restaurant.id,
      name: 'Integration Test',
      review: 'Rasanya ngoding banget',
    };
    const RestaurantSourceSpy = spyOnAllFunctions(RestaurantSource);

    await createReviewFormPresenterTest(restaurant, RestaurantSourceSpy);
    const form = document.querySelector('#form-review');

    form.name.value = reviewData.name;
    form.review.value = reviewData.review;

    form.dispatchEvent(new Event('submit'));

    expect(RestaurantSourceSpy.restaurantAddReview).toHaveBeenCalledWith(
      reviewData
    );
  });

  it('should not be able to review a restaurant with empty fields', async () => {
    const RestaurantSourceSpy = spyOnAllFunctions(RestaurantSource);

    await createReviewFormPresenterTest(restaurant, RestaurantSourceSpy);
    const form = document.querySelector('#form-review');

    form.name.value = 'A';
    form.review.value = '';

    form.dispatchEvent(new Event('submit'));
    expect(RestaurantSourceSpy.restaurantAddReview).not.toHaveBeenCalled();
  });
  it('should not be able to review a restaurant with no id', async () => {
    const RestaurantSourceSpy = spyOnAllFunctions(RestaurantSource);

    await createReviewFormPresenterTest({}, RestaurantSourceSpy);
    const form = document.querySelector('#form-review');

    form.name.value = 'A';
    form.review.value = 'B';
    form.dispatchEvent(new Event('submit'));

    expect(RestaurantSourceSpy.restaurantAddReview).not.toHaveBeenCalled();
  });
});
