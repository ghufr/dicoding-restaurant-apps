import FavoriteRestaurantIdb from '../../src/scripts/data/favourite-restaurant-idb';

import LikeButtonPresenter from '../../src/scripts/utils/like-button-presenter';
import FormReviewPresenter from '../../src/scripts/utils/review-form-presenter';

const createLikeButtonPresenterTest = async (restaurant) => {
  await LikeButtonPresenter.init({
    likeButtonContainer: document.querySelector('#likeButtonContainer'),
    favoriteRestaurant: FavoriteRestaurantIdb,
    restaurant,
  });
};

const createReviewFormPresenterTest = async (
  restaurant,
  restaurantModel = {}
) => {
  await FormReviewPresenter.init({
    reviewFormContainer: document.querySelector('#form-review-container'),
    restaurantModel,
    restaurant,
  });
};

const createContainer = (id) => {
  document.body.innerHTML = `<div id="${id}"></div>`;
};

export {
  createLikeButtonPresenterTest,
  createReviewFormPresenterTest,
  createContainer,
};
