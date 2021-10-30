import UrlParser from '../../routes/url-parser';
import RestaurantSource from '../../data/restaurant-source';
import {
  createErrorMessageTemplate,
  createRestaurantDetailPlaceholder,
  createRestaurantDetailTemplate,
} from '../templates/template-creator';

import LikeButtonInitiator from '../../utils/like-button-initiator';

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
    LikeButtonInitiator.init({
      likeButtonContainer: document.querySelector('#likeButtonContainer'),
      restaurant,
    });

    const formReview = document.querySelector('#form-review');
    formReview.addEventListener('submit', async (e) => {
      e.preventDefault();
      const { id, name, review } = e.target;

      await RestaurantSource.restaurantAddReview({
        id: id.value,
        name: name.value,
        review: review.value,
      });
      name.value = '';
      review.value = '';
    });
  },
};

export default Detail;
