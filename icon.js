// Скрипт для создания иконки
document.addEventListener('DOMContentLoaded', function() {
    // Создаем канвас для иконки
    const canvas = document.createElement('canvas');
    canvas.width = 192;
    canvas.height = 192;
    
    // Получаем контекст с атрибутом willReadFrequently
    const ctx = canvas.getContext('2d', { willReadFrequently: true });
    
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
    
    // Создаем ссылку на иконку для манифеста
    const iconUrl = canvas.toDataURL('image/png');
    
    // Создаем физический файл icon.png
    const link = document.createElement('a');
    link.download = 'icon.png';
    link.href = iconUrl;
    
    // Добавляем кнопку для скачивания иконки
    const iconButton = document.createElement('button');
    iconButton.textContent = 'Скачать иконку';
    iconButton.style.position = 'fixed';
    iconButton.style.bottom = '10px';
    iconButton.style.right = '10px';
    iconButton.style.zIndex = '9999';
    iconButton.style.padding = '10px';
    iconButton.style.backgroundColor = '#00ffff';
    iconButton.style.color = '#000033';
    iconButton.style.border = 'none';
    iconButton.style.borderRadius = '5px';
    iconButton.style.cursor = 'pointer';
    
    iconButton.addEventListener('click', function() {
        link.click();
    });
    
    document.body.appendChild(iconButton);
    
    // Создаем иконку для манифеста
    const iconLink = document.createElement('link');
    iconLink.rel = 'icon';
    iconLink.href = iconUrl;
    document.head.appendChild(iconLink);
    
    // Добавляем иконку для Apple устройств
    const appleIconLink = document.createElement('link');
    appleIconLink.rel = 'apple-touch-icon';
    appleIconLink.href = iconUrl;
    document.head.appendChild(appleIconLink);
});
