/* eslint-disable no-console */

const swRegister = async () => {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker
      .register('/sw.js')
      .then((registration) => {
        console.log(`Service Worker registered! Scope: ${registration.scope}`);
      })
      .catch((err) => {
        console.log(`Service Worker registration failed: ${err}`);
      });
  }
};

export default swRegister;
