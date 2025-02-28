// Service Worker для Scrap Runner
const CACHE_NAME = 'scrap-runner-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/manifest.json',
  '/icon.js',
  '/game.js',
  '/modules/Audio.js',
  '/modules/Crafting.js',
  '/modules/Inventory.js',
  '/modules/Player.js',
  '/modules/Resources.js',
  '/scenes/BootScene.js',
  '/scenes/GameScene.js',
  '/scenes/MainMenuScene.js',
  '/scenes/UIScene.js',
  '/utils/AssetGenerator.js',
  '/utils/InputManager.js',
  '/utils/MapGenerator.js',
  '/utils/NameGenerator.js',
  '/utils/SaveManager.js',
  '/lib/phaser.min.js',
  '/lib/howler.min.js'
];

// Установка Service Worker и кэширование статических ресурсов
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
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
          return response;
        }
        
        // Если нет в кэше, делаем запрос к сети
        return fetch(event.request)
          .then(response => {
            // Проверяем, что ответ валидный
            if (!response || response.status !== 200 || response.type !== 'basic') {
              return response;
            }
            
            // Клонируем ответ, т.к. тело ответа может быть использовано только один раз
            const responseToCache = response.clone();
            
            // Добавляем ответ в кэш
            caches.open(CACHE_NAME)
              .then(cache => {
                cache.put(event.request, responseToCache);
              });
            
            return response;
          });
      })
  );
});

// Обновление Service Worker и удаление старых кэшей
self.addEventListener('activate', event => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});
