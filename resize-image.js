/* eslint-disable import/no-extraneous-dependencies */
const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const target = path.resolve(__dirname, 'src/public/images');
const destination = path.resolve(__dirname, 'src/public/resized-images');

if (!fs.existsSync(destination)) {
  fs.mkdirSync(destination);
}

fs.readdirSync(target).forEach((image) => {
  const [fileName] = image.split('.');

  fs.copyFileSync(path.resolve(target, image), `${destination}/${image}`);

  sharp(`${target}/${image}`)
    .resize(800)
    .webp()
    .toFile(`${destination}/${fileName}-large.webp`);

  sharp(`${target}/${image}`)
    .resize(480)
    .webp()
    .toFile(`${destination}/${fileName}-small.webp`);
});
