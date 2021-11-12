import { createLikeButtonTemplate } from '../views/templates/template-creator';

const LikeButtonPresenter = {
  async init({ likeButtonContainer, favoriteRestaurant, restaurant }) {
    this._likeButtonContainer = likeButtonContainer;
    this._favoriteRestaurant = favoriteRestaurant;
    this._restaurant = restaurant;

    await this._renderButton();
  },

  async _isRestaurantExist(id) {
    const restaurant = await this._favoriteRestaurant.getRestaurant(id);
    return !!restaurant;
  },

  async _renderButton() {
    const { id } = this._restaurant;

    const isRestaurantExist = await this._isRestaurantExist(id);

    if (isRestaurantExist) {
      await this._renderLiked();
    } else {
      await this._renderLike();
    }
  },

  _renderLike() {
    this._likeButtonContainer.innerHTML = createLikeButtonTemplate(false);

    const likeButton = document.querySelector('#likeButton');
    likeButton.addEventListener('click', async () => {
      await this._favoriteRestaurant.putRestaurant(this._restaurant);
      await this._renderButton();
    });
  },
  _renderLiked() {
    this._likeButtonContainer.innerHTML = createLikeButtonTemplate(true);

    const likeButton = document.querySelector('#likeButton');
    likeButton.addEventListener('click', async () => {
      await this._favoriteRestaurant.deleteRestaurant(this._restaurant.id);
      await this._renderButton();
    });
  },
};

export default LikeButtonPresenter;
