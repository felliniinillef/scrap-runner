// Скрипт для создания иконки игры
window.onload = function() {
    // Создаем канвас для иконки
    const canvas = document.createElement('canvas');
    canvas.width = 192;
    canvas.height = 192;
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
    
    // Преобразуем канвас в изображение
    const dataUrl = canvas.toDataURL('image/png');
    
    // Создаем ссылку на favicon
    const link = document.createElement('link');
    link.rel = 'icon';
    link.type = 'image/png';
    link.href = dataUrl;
    document.head.appendChild(link);
    
    // Создаем элемент изображения для icon.png
    const iconImg = document.createElement('img');
    iconImg.src = dataUrl;
    iconImg.style.display = 'none';
    document.body.appendChild(iconImg);
    
    // Сохраняем как base64 в localStorage
    localStorage.setItem('scrapRunnerIcon', dataUrl);
    
    // Обновляем манифест
    const manifestLink = document.querySelector('link[rel="manifest"]');
    if (manifestLink) {
        fetch(manifestLink.href)
            .then(response => response.json())
            .then(manifest => {
                manifest.icons = [{
                    src: dataUrl,
                    sizes: "192x192",
                    type: "image/png"
                }];
                
                const manifestBlob = new Blob([JSON.stringify(manifest)], {type: 'application/json'});
                const manifestURL = URL.createObjectURL(manifestBlob);
                manifestLink.href = manifestURL;
            })
            .catch(error => console.error('Ошибка обновления манифеста:', error));
    }
};
