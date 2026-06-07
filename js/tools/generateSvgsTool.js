const fs = require('fs');
const path = require('path');

const iconDir = path.join(__dirname, '..', '..', 'images');

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

techIcons.forEach(filename => {
  const filepath = path.join(iconDir, filename);
  let content = fs.readFileSync(filepath, 'utf-8');
  // Remove any existing fill attribute, add fill="#d8e700" after viewBox
  content = content.replace(/<svg /, '<svg ');
  content = content.replace(/ viewBox="/, ` fill="#d8e700" viewBox="`);
  fs.writeFileSync(filepath, content, 'utf-8');
  console.log('Updated:', filename);
});

// 3D design icon - fill with muted color #8a8a9a
const aboutIcon = path.join(iconDir, 'icon-3d-design.svg');
let aboutContent = fs.readFileSync(aboutIcon, 'utf-8');
aboutContent = aboutContent.replace(/ viewBox="/, ` fill="#8a8a9a" viewBox="`);
fs.writeFileSync(aboutIcon, aboutContent, 'utf-8');
console.log('Updated: icon-3d-design.svg');

// Social icons - fill with muted color #8a8a9a
const socialIcons = [
  'icon-github.svg',
  'icon-telegram.svg',
  'icon-email.svg',
];

socialIcons.forEach(filename => {
  const filepath = path.join(iconDir, filename);
  let content = fs.readFileSync(filepath, 'utf-8');
  content = content.replace(/ viewBox="/, ` fill="#8a8a9a" viewBox="`);
  fs.writeFileSync(filepath, content, 'utf-8');
  console.log('Updated:', filename);
});

console.log('All SVG colors updated.');