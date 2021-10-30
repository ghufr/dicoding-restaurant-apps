import config from './config';

const API_ENDPOINT = {
  LIST: () => `${config.API_BASE_URL}/list`,
  DETAIL: (id) => `${config.API_BASE_URL}/detail/${id}`,
  SEARCH: (query) => `${config.API_BASE_URL}/search?q=${query}`,
  REVIEW: () => `${config.API_BASE_URL}/review`,
  PICTURE: () => `${config.API_BASE_URL}/images`,
};

export default API_ENDPOINT;
