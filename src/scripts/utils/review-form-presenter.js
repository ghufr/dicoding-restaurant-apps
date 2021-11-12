import { createRestaurantDetailReviewForm } from '../views/templates/template-creator';

const FormReviewPresenter = {
  async init({ reviewFormContainer, restaurantModel, restaurant = {} }) {
    this._reviewFormContainer = reviewFormContainer;
    this._restaurantModel = restaurantModel;
    this._restaurant = restaurant;

    await this._renderForm();
  },

  async _renderForm() {
    this._reviewFormContainer.innerHTML = createRestaurantDetailReviewForm(
      this._restaurant.id
    );

    const form = document.querySelector('#form-review');
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const { id, name, review } = e.target;

      const data = {
        id: id.value,
        name: name.value,
        review: review.value,
      };

      if (!data.id || !data.name || !data.review) {
        return;
      }

      await this._restaurantModel.restaurantAddReview(data);

      name.value = '';
      review.value = '';
    });
  },
};

export default FormReviewPresenter;
