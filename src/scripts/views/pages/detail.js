import UrlParser from '../../routes/url-parser';
import RestaurantSource from '../../data/restaurant-source';
import {
  createErrorMessageTemplate,
  createRestaurantDetailPlaceholder,
  createRestaurantDetailTemplate,
} from '../templates/template-creator';

import LikeButtonPresenter from '../../utils/like-button-presenter';
import FavoriteRestaurantIdb from '../../data/favourite-restaurant-idb';
import FormReviewPresenter from '../../utils/review-form-presenter';

const Detail = {
  async render() {
    return `
      <div class="container">
        <section id="content" class="content">
          <div class="container">
            <div id="restoDetailContainer">
            </div>
          </div>
        </section>
      </div>
    `;
  },
  async afterRender() {
    const restoDetailContainer = document.querySelector(
      // eslint-disable-next-line comma-dangle
      '#restoDetailContainer'
    );

    const url = UrlParser.parseActiveUrlWithoutCombiner();
    const { restaurant, error } = await RestaurantSource.restaurantDetail(
      url.id
    );

    // Loading
    const placeholder = createRestaurantDetailPlaceholder();
    restoDetailContainer.innerHTML = placeholder;

    if (error) {
      restoDetailContainer.innerHTML = createErrorMessageTemplate();
    }

    restoDetailContainer.innerHTML = createRestaurantDetailTemplate(restaurant);

    LikeButtonPresenter.init({
      likeButtonContainer: document.querySelector('#likeButtonContainer'),
      favoriteRestaurant: FavoriteRestaurantIdb,
      restaurant,
    });

    FormReviewPresenter.init({
      reviewFormContainer: document.querySelector('#form-review-container'),
      restaurantModel: RestaurantSource,
      restaurant,
    });
  },
};

export default Detail;
