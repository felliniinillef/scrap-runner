// Этот файл создает заглушки для аудиофайлов
window.addEventListener('DOMContentLoaded', function() {
    // Создаем пустой аудиобуфер
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const emptyBuffer = audioContext.createBuffer(2, 44100, 44100);
    
    // Функция для сохранения буфера как аудиофайла
    function saveAudioFile(filename) {
        // Создаем источник из буфера
        const source = audioContext.createBufferSource();
        source.buffer = emptyBuffer;
        
        // Создаем объект для записи
        const dest = audioContext.createMediaStreamDestination();
        source.connect(dest);
        
        // Создаем MediaRecorder
        const mediaRecorder = new MediaRecorder(dest.stream);
        const chunks = [];
        
        mediaRecorder.ondataavailable = function(evt) {
            chunks.push(evt.data);
        };
        
        mediaRecorder.onstop = function() {
            const blob = new Blob(chunks, { type: 'audio/mp3' });
            const url = URL.createObjectURL(blob);
            
            // Создаем ссылку для скачивания
            const a = document.createElement('a');
            a.style.display = 'none';
            a.href = url;
            a.download = filename;
            document.body.appendChild(a);
            a.click();
            
            // Очищаем ресурсы
            setTimeout(function() {
                document.body.removeChild(a);
                window.URL.revokeObjectURL(url);
            }, 100);
        };
        
        // Начинаем запись
        mediaRecorder.start();
        
        // Запускаем источник
        source.start();
        
        // Останавливаем запись через 1 секунду
        setTimeout(function() {
            source.stop();
            mediaRecorder.stop();
        }, 1000);
    }
    
    // Создаем кнопки для генерации аудиофайлов
    const div = document.createElement('div');
    div.style.position = 'fixed';
    div.style.top = '10px';
    div.style.right = '10px';
    div.style.backgroundColor = 'rgba(0,0,0,0.7)';
    div.style.padding = '10px';
    div.style.borderRadius = '5px';
    div.style.zIndex = '9999';
    
    const title = document.createElement('h3');
    title.textContent = 'Создать аудиофайлы';
    title.style.color = '#00ffff';
    title.style.margin = '0 0 10px 0';
    div.appendChild(title);
    
    const files = ['menu_music.mp3', 'button_click.mp3', 'game_music.mp3', 'jump.mp3', 'collect.mp3'];
    
    files.forEach(function(file) {
        const button = document.createElement('button');
        button.textContent = 'Создать ' + file;
        button.style.display = 'block';
        button.style.margin = '5px 0';
        button.style.padding = '5px';
        button.style.backgroundColor = '#00ffff';
        button.style.border = 'none';
        button.style.borderRadius = '3px';
        button.style.cursor = 'pointer';
        
        button.onclick = function() {
            saveAudioFile(file);
        };
        
        div.appendChild(button);
    });
    
    document.body.appendChild(div);
});
