// Script to be run locally to resize images
const path = require("path");
const sharp = require("sharp");

const imgPath = path.resolve("img");

const args = process.argv.slice(2);
const [filePath] = args;

if (filePath) {
  const [fileName, extension] = filePath.split(".");
  Object.entries({ 1: 210, 2: 320, 3: 640, 4: 1024 }).forEach(
    ([index, width]) => {
      sharp(imgPath + `/${filePath}`)
        .resize(width)
        .toFile(imgPath + `/${fileName}@${index}x.${extension}`)
        .then(() => {
          console.log(`🥳 Yay! ${filePath} resized to: ${width}`);
        })
        .catch((err) => {
          console.log(`😨 Oh no, something bad happened: `, err);
        });
    }
  );
} else {
  console.log("😨 Please input the file path with its extension.");
}
