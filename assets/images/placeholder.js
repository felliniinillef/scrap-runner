// Скрипт для создания placeholder.png
document.addEventListener('DOMContentLoaded', function() {
    // Создаем canvas
    const canvas = document.createElement('canvas');
    canvas.width = 64;
    canvas.height = 64;
    const ctx = canvas.getContext('2d', { willReadFrequently: true });
    
    // Рисуем заглушку
    ctx.fillStyle = '#222222';
    ctx.fillRect(0, 0, 64, 64);
    
    // Добавляем крестик
    ctx.strokeStyle = '#ff0000';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(10, 10);
    ctx.lineTo(54, 54);
    ctx.moveTo(54, 10);
    ctx.lineTo(10, 54);
    ctx.stroke();
    
    // Создаем блок для обозначения заглушки
    ctx.fillStyle = '#ffffff';
    ctx.font = '10px Arial';
    ctx.textAlign = 'center';
    ctx.fillText('MISSING', 32, 32);
    ctx.fillText('ASSET', 32, 44);
    
    // Создаем ссылку для скачивания
    const link = document.createElement('a');
    link.href = canvas.toDataURL('image/png');
    link.download = 'placeholder.png';
    
    // Создаем кнопку для скачивания
    const button = document.createElement('button');
    button.textContent = 'Скачать placeholder.png';
    button.style.position = 'fixed';
    button.style.bottom = '40px';
    button.style.right = '10px';
    button.style.zIndex = '9999';
    button.style.padding = '10px';
    button.style.backgroundColor = '#ff0000';
    button.style.color = '#ffffff';
    button.style.border = 'none';
    button.style.borderRadius = '5px';
    button.style.cursor = 'pointer';
    
    button.addEventListener('click', function() {
        link.click();
    });
    
    document.body.appendChild(button);
});
