// Service Worker для Scrap Runner
const CACHE_NAME = 'scrap-runner-v1';

// Получаем базовый путь для GitHub Pages
const scope = self.registration.scope;
const basePath = scope.slice(0, scope.lastIndexOf('/') + 1);

const urlsToCache = [
  './',
  './index.html',
  './manifest.json',
  './icon.js',
  './game.js',
  './modules/Audio.js',
  './modules/Crafting.js',
  './modules/Inventory.js',
  './modules/Player.js',
  './modules/Resources.js',
  './scenes/BootScene.js',
  './scenes/GameScene.js',
  './scenes/MainMenuScene.js',
  './scenes/UIScene.js',
  './utils/AssetGenerator.js',
  './utils/InputManager.js',
  './utils/MapGenerator.js',
  './utils/NameGenerator.js',
  './utils/SaveManager.js',
  './lib/phaser.min.js',
  './lib/howler.min.js'
];

// Установка Service Worker и кэширование статических ресурсов
self.addEventListener('install', event => {
  console.log('Service Worker установлен');
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Кэширование файлов');
        return cache.addAll(urlsToCache.map(url => url.startsWith('./') ? url.substring(1) : url));
      })
  );
});

// Перехват запросов и возврат из кэша, если доступно
self.addEventListener('fetch', event => {
  console.log('Запрос перехвачен:', event.request.url);
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Возвращаем кэшированный ответ, если он есть
        if (response) {
          console.log('Найдено в кэше:', event.request.url);
          return response;
        }
        
        console.log('Не найдено в кэше, запрашиваю из сети:', event.request.url);
        // Если нет в кэше, делаем запрос к сети
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
                cache.put(event.request, responseToCache);
              });
            
            return response;
          })
          .catch(error => {
            console.error('Ошибка при получении из сети:', error);
            // Если не удалось получить из сети, возвращаем страницу 404
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
