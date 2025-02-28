// Скрипт для создания физического файла icon.png
// Запустите этот скрипт с помощью Node.js перед загрузкой на GitHub

const fs = require('fs');
const { createCanvas } = require('canvas');

// Создаем канвас для иконки
const canvas = createCanvas(192, 192);
const ctx = canvas.getContext('2d');

// Фон
ctx.fillStyle = '#000033';
ctx.fillRect(0, 0, 192, 192);

// Внешний круг
ctx.fillStyle = '#00ffff';
ctx.beginPath();
ctx.arc(96, 96, 80, 0, Math.PI * 2);
ctx.fill();

// Внутренний круг
ctx.fillStyle = '#000033';
ctx.beginPath();
ctx.arc(96, 96, 60, 0, Math.PI * 2);
ctx.fill();

// Буква "S"
ctx.fillStyle = '#00ffff';
ctx.font = 'bold 100px Arial';
ctx.textAlign = 'center';
ctx.textBaseline = 'middle';
ctx.fillText('S', 96, 96);

// Сохраняем как PNG
const buffer = canvas.toBuffer('image/png');
fs.writeFileSync('icon.png', buffer);

console.log('Файл icon.png успешно создан!');
