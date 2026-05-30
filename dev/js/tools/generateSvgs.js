const fs = require('fs');
const path = require('path');

const iconDir = path.join(__dirname, '..', '..', 'images');

function addFill(filename, fillColor) {
  const filepath = path.join(iconDir, filename);
  let content = fs.readFileSync(filepath, 'utf-8');
  // Insert fill after the opening <svg tag
  content = content.replace('<svg xmlns="http://www.w3.org/2000/svg" ', `<svg xmlns="http://www.w3.org/2000/svg" fill="${fillColor}" `);
  fs.writeFileSync(filepath, content, 'utf-8');
  console.log('Updated:', filename, '-> fill:', fillColor);
}

// Technology icons - fill with accent yellow #d8e700
const techIcons = [
  'icon-unity.svg',
  'icon-csharp.svg',
  'icon-litedb.svg',
  'icon-dotween.svg',
  'icon-blender.svg',
  'icon-dry.svg',
  'icon-git.svg',
];
techIcons.forEach(f => addFill(f, '#d8e700'));

// 3D design icon - fill with muted color
addFill('icon-3d-design.svg', '#8a8a9a');

// Social icons - fill with muted color
const socialIcons = ['icon-github.svg', 'icon-telegram.svg', 'icon-email.svg'];
socialIcons.forEach(f => addFill(f, '#8a8a9a'));

console.log('All SVG colors updated.');