const sharp = require('sharp');
const fs = require('fs')

function pngToJpeg(filename) {
  if (fs.existsSync(`${filename}.png`)) {
    sharp(`${filename}.png`)
  .resize(500,500)
  .jpeg()
  .toFile(`${filename}.jpg`)
  } else {
    console.log(`${filename}.png dosn't exist`)
  }
}

pngToJpeg('laptop')