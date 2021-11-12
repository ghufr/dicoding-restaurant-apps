import API_ENDPOINT from '../../globals/api-endpoint';

const SIZES = {
  SMALL: 'small',
  MEDIUM: 'medium',
  LARGE: 'large',
};

const createRestaurantInfo = (props) => {
  const { rating, location } = props;

  return `
  <div class="resto-item__info">
  <p class="resto-item__rating">
    <span>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 20 20"
        fill="currentColor"
      >
        <path
          d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
        />
      </svg>
    </span>
    <span class="sr-only">Rating </span>
    <span>${rating}</span>
  </p>
  <p class="resto-item__location">
    <span class="sr-only">Lokasi di</span>
    <span
      ><svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 20 20"
        fill="currentColor"
      >
        <path
          fill-rule="evenodd"
          d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
          clip-rule="evenodd"
        /></svg
    ></span>
    <span class="resto-item__location_label">${location}</span>
  </p>
</div>
  `;
};

const _createPictureUrl = (size, pictureId) =>
  `${API_ENDPOINT.PICTURE()}/${size}/${pictureId}`;

const createRestaurantItemTemplate = (props) => {
  const { name, description, pictureId, city, rating, id } = props;

  /* eslint-disable indent */
  return `
    <article class="resto-item">
      <picture>
        <source media="(max-width: 1024px)" srcset="${_createPictureUrl(
          SIZES.SMALL,
          pictureId
        )}">

        <img
          class="lazyload resto-item__thumbnail"
          data-src="${_createPictureUrl(SIZES.MEDIUM, pictureId)}"
          alt="Foto interior restoran"
        />
      </picture>
      <div class="resto-item__content">
        <h3 class="resto-item__title">
          <a href="/#/detail/${id}">${name}</a>
        </h3>
        ${createRestaurantInfo({ location: city, rating })}

        <p class="resto-item__description">${description.slice(0, 100)}</p>
      </div>
    </article>
  `;
  /* eslint-enable indent */
};

const _createRestaurantDetailMenus = (title, menus) => {
  const menuItems = menus.map((menu) => `<li>${menu.name}</li>`).join('');

  return `
    <div>
      <h3 class="resto-detail__menu-label">${title}</h3>
      <ul class="resto-detail__menu-list">
        ${menuItems}
      </ul>
    </div>
  `;
};

const _createRestaurantDetailReviews = (reviews) => {
  const reviewItems = reviews
    .map(
      ({ review, name, date }) => `
      <div class="resto-detail__review-item">
        <h4>${name}</h4>
        <p class="review-item__description">${review}</p>
        <p class="review-item__date">${date}</p>
      </div>
  `
    )
    .join('');

  return `<div class="resto-detail__review-list">
    ${reviewItems}
  </div>`;
};

const createRestaurantDetailReviewForm = (id = '') => `
    <form id="form-review">
      <input name="id" value="${id}" hidden required/>
      <div class="form__item">
        <label for="name">Name</label>
        <input class="input" name="name" type="text" required/>
      </div>

      <div class="form__item">
        <label for="review">Comment</label>
        <textarea rows="4" class="textarea" name="review" required></textarea>
      </div>
      <div class="form__footer">
        <button type="submit" class="btn btn-primary">Submit</button>
      </div>
    </form>
  `;

const createRestaurantDetailTemplate = (props) => {
  const {
    name,
    description,
    pictureId,
    city,
    rating,
    address,
    menus,
    customerReviews,
  } = props;

  const location = `${city}, ${address}`;
  /* eslint-disable indent */
  return `
    <div>
      <div class="resto-detail__container">
        <picture>
          <source media="(max-width: 600px)" srcset="${_createPictureUrl(
            SIZES.SMALL,
            pictureId
          )}">
          <source media="(max-width: 1024px)" srcset="${_createPictureUrl(
            SIZES.MEDIUM,
            pictureId
          )}">

          <img
            class="resto-detail__picture"
            src="${_createPictureUrl(SIZES.LARGE, pictureId)}"
            alt="Foto interior restoran"
          />
        </picture>
        <div class="resto-detail__content-container">
          <div class="resto-detail__header">
            <h2 class="resto-detail__title">${name}</h2>
            <div class="resto-detail__like-container" id="likeButtonContainer">

            </div>
          </div>
          ${createRestaurantInfo({ location, rating })}
          <p class="resto-detail__description">${description}</p>
        </div>
      </div>
      <div>
        <h3 class="resto-detail__menus-label">Menus</h3>
        <hr></hr>
        <div class="resto-detail__menus-container">
          ${_createRestaurantDetailMenus('Foods', menus.foods)}
          ${_createRestaurantDetailMenus('Drinks', menus.drinks)}
        </div>
        <hr></hr>
      </div>
      <div>
        <h3 class="resto-detail__reviews-label">Reviews</h3>
        <div class="resto-detail__reviews-container">
          ${_createRestaurantDetailReviews(customerReviews)}
        </div>
        <h3 class="resto-detail__reviews-label">Add Your Review</h3>
        <div id="form-review-container"></div>
      </div>
    </div>
  `;
  /* eslint-enable indent */
};

const createLikeButtonTemplate = (isActive = false) => {
  const buttonProps = {
    className: isActive ? 'active' : '',
    label: isActive ? 'Unlike this restaurant' : 'Like this restaurant',
  };

  return `
    <button id="likeButton" aria-label="${buttonProps.label}"
      class="btn-icon ${buttonProps.className}">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
        <path fill-rule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clip-rule="evenodd" />
      </svg>
    </button>`;
};

// TODO: Create Proper placeholder
const createRestaurantDetailPlaceholder = () => `
  <div>
    <div class="resto-detail__container">
      <div class="placeholder placeholder-image"></div>
      <div>
        <div class="placeholder placeholder-title"></div>
        <div class="placeholder placeholder-description"></div>
        <div class="placeholder placeholder-description"></div>
        <div class="placeholder placeholder-description"></div>
      </div>
    </div>
  </div>

`;

const createRestaurantItemPlaceholder = () => `
    <div class="resto-item">
      <div class="placeholder placeholder-thumbnail"></div>
      <div class="resto-item__content">
        <div class="placeholder placeholder-title"></div>
        <div class="placeholder placeholder-description"></div>
        <div class="placeholder placeholder-description"></div>
        <div class="placeholder placeholder-description"></div>
        <div class="placeholder placeholder-description"></div>
      </div>
    </div>
  `;

const createErrorMessageTemplate = (msg = 'Failed to load content') => `
  <div class="error__container">
    <div class="error__content">
      <p>${msg}</p>
    </div>
  </div>
`;

export {
  createRestaurantItemTemplate,
  createRestaurantDetailTemplate,
  createLikeButtonTemplate,
  createRestaurantDetailPlaceholder,
  createRestaurantItemPlaceholder,
  createErrorMessageTemplate,
  createRestaurantDetailReviewForm,
};
