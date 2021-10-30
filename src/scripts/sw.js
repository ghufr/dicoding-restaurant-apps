/* eslint-disable no-restricted-globals */
/* eslint-disable import/no-extraneous-dependencies */

import {
  pageCache,
  imageCache,
  staticResourceCache,
  googleFontsCache,
} from 'workbox-recipes';

import { StaleWhileRevalidate } from 'workbox-strategies';
import config from './globals/config';

pageCache();

googleFontsCache();

staticResourceCache();

imageCache();

self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);
  if (url.origin === config.API_BASE_URL) {
    event.respondWith(
      new StaleWhileRevalidate({ cacheName: 'api-request' }).handle({
        event,
        request,
      })
    );
  }
});