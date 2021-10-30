import API_ENDPOINT from '../globals/api-endpoint';
import { errorFetchHandler } from '../utils/error-handler';

const RestaurantSource = {
  async restaurantList() {
    const response = await fetch(API_ENDPOINT.LIST())
      .then((res) => res.json())
      .catch(errorFetchHandler);

    return response;
  },

  async restaurantDetail(id) {
    const response = await fetch(API_ENDPOINT.DETAIL(id))
      .then((res) => res.json())
      .catch(errorFetchHandler);

    return response;
  },

  async restaurantAddReview({ id, name, review }) {
    const response = await fetch(API_ENDPOINT.REVIEW(), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id, name, review }),
    })
      .then((res) => res.json())
      .catch(errorFetchHandler);
    return response;
  },
};

export default RestaurantSource;
