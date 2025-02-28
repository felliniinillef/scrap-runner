// Service Worker для Scrap Runner
const CACHE_NAME = 'scrap-runner-v1';

// Получаем базовый путь для GitHub Pages
const scope = self.registration.scope;
const basePath = scope.slice(0, scope.lastIndexOf('/') + 1);

// Основные файлы для кэширования
const BASE_URLS = [
  './',
  './index.html',
  './manifest.json',
  './icon.js',
  './game.js',
  './404.html'
];

// Добавляем динамические пути для ассетов
const DYNAMIC_ASSETS = [
  '/assets/images/player_run.png',
  '/assets/images/player_jump.png',
  '/assets/images/ground.png',
  '/assets/images/resource.png',
  '/assets/images/icon.png'
];

// Установка Service Worker и кэширование статических ресурсов
self.addEventListener('install', event => {
  console.log('Service Worker установлен');
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Кэширование файлов');
        return cache.addAll(BASE_URLS);
      })
      .catch(error => {
        console.error('Ошибка при кэшировании:', error);
      })
  );
});

// Перехват запросов и возврат из кэша, если доступно
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Возвращаем кэшированный ответ, если он есть
        if (response) {
          console.log('Найдено в кэше:', event.request.url);
          return response;
        }
        
        // Для динамических ассетов пытаемся загрузить из сети и кэшировать
        if (DYNAMIC_ASSETS.some(asset => event.request.url.includes(asset))) {
          return fetch(event.request)
            .then(networkResponse => {
              // Проверяем, что ответ валидный
              if (!networkResponse || networkResponse.status !== 200) {
                console.log('Получен невалидный ответ:', networkResponse ? networkResponse.status : 'null');
                return networkResponse;
              }
              
              // Клонируем ответ, чтобы можно было и использовать, и кэшировать
              const responseClone = networkResponse.clone();
              
              caches.open(CACHE_NAME)
                .then(cache => {
                  console.log('Кэширую ответ:', event.request.url);
                  try {
                    cache.put(event.request, responseClone);
                  } catch (error) {
                    console.error('Ошибка при кэшировании ответа:', error);
                  }
                });
              
              return networkResponse;
            })
            .catch(error => {
              console.error('Не удалось загрузить динамический ассет:', event.request.url, error);
              // Возвращаем резервное изображение или обработчик ошибок
              return caches.match('/assets/images/placeholder.png');
            });
        }
        
        // Для остальных запросов - стандартная логика
        return fetch(event.request)
          .then(response => {
            // Проверяем, что ответ валидный
            if (!response || response.status !== 200) {
              console.log('Получен невалидный ответ:', response ? response.status : 'null');
              return response;
            }
            
            // Клонируем ответ, т.к. тело ответа может быть использовано только один раз
            const responseToCache = response.clone();
            
            // Добавляем ответ в кэш
            caches.open(CACHE_NAME)
              .then(cache => {
                console.log('Кэширую ответ:', event.request.url);
                try {
                  cache.put(event.request, responseToCache);
                } catch (error) {
                  console.error('Ошибка при кэшировании ответа:', error);
                }
              });
            
            return response;
          })
          .catch(error => {
            console.error('Ошибка при получении из сети:', error);
            // Если это запрос на изображение или аудио, возвращаем placeholder
            if (event.request.url.match(/\.(jpg|jpeg|png|gif|bmp|webp)$/i)) {
              return caches.match('./assets/images/placeholder.png');
            }
            
            if (event.request.url.match(/\.(mp3|ogg|wav)$/i)) {
              return new Response(null, { status: 200, statusText: 'OK' });
            }
            
            // Для других ресурсов возвращаем страницу 404
            return caches.match('./404.html');
          });
      })
  );
});

// Обновление Service Worker и удаление старых кэшей
self.addEventListener('activate', event => {
  console.log('Service Worker активирован');
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            console.log('Удаляю старый кэш:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});
