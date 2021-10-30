import RestaurantSource from '../../data/restaurant-source';
import {
  createErrorMessageTemplate,
  createRestaurantItemPlaceholder,
  createRestaurantItemTemplate,
} from '../templates/template-creator';

const Home = {
  async render() {
    return `
      <div>
        <div class="hero">
          <div class="hero__container">
            <div class="hero__overlay"></div>
            <div class="hero__img"></div>
            <div class="hero__inner">
              <h2 class="hero__title">Introducing dResto</h2>
              <p class="hero__description">
                Find <strong>Quality Restaurant</strong> with ease...
              </p>
              <a href="#content" class="btn btn-secondary">Explore Now</a>
            </div>
          </div>
        </div>
        <div class="container">
          <section id="content" class="content">
            <div class="container">
              <h2 class="explore__label">Explore Restaurant</h2>

              <div class="restos" id="restoContainer"></div>
            </div>
          </section>
        </div>
      </div>
    `;
  },
  async afterRender() {
    const restoContainer = document.querySelector('#restoContainer');

    Array(6)
      .fill(0)
      // eslint-disable-next-line array-callback-return
      .map(() => {
        restoContainer.innerHTML += createRestaurantItemPlaceholder();
      });

    const { restaurants, error } = await RestaurantSource.restaurantList();

    if (error) {
      restoContainer.innerHTML = createErrorMessageTemplate();
      return;
    }

    restoContainer.innerHTML = '';

    restaurants.forEach((resto) => {
      restoContainer.innerHTML += createRestaurantItemTemplate(resto);
    });
  },
};

export default Home;
