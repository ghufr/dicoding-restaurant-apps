import FavoriteRestaurantIdb from '../../data/favourite-restaurant-idb';
import {
  createErrorMessageTemplate,
  createRestaurantItemPlaceholder,
  createRestaurantItemTemplate,
} from '../templates/template-creator';

const Favorite = {
  async render() {
    return `
      <div class="container">
        <section id="content" class="content">
          <div class="container">
            <div class="restos" id="restoFavoriteContainer">
            </div>
          </div>
        </section>
      </div>
    `;
  },
  async afterRender() {
    const restoFavoriteContainer = document.querySelector(
      '#restoFavoriteContainer'
    );

    // Loading
    Array(6)
      .fill(0)
      // eslint-disable-next-line array-callback-return
      .map(() => {
        restoFavoriteContainer.innerHTML += createRestaurantItemPlaceholder();
      });

    const restos = await FavoriteRestaurantIdb.getAllRestaurants();

    // Empty
    if (restos.length === 0) {
      restoFavoriteContainer.innerHTML = createErrorMessageTemplate(
        'No Favorited Restaurant'
      );
      return;
    }

    restoFavoriteContainer.innerHTML = '';
    restos.forEach((resto) => {
      restoFavoriteContainer.innerHTML += createRestaurantItemTemplate(resto);
    });
  },
};

export default Favorite;
