#!/bin/bash
echo "Запуск Scrap Runner..."

# Проверяем наличие http-server
if command -v npx &> /dev/null; then
    echo "Запуск через http-server"
    npx http-server -p 8080 &
    open http://localhost:8080
elif command -v python3 &> /dev/null; then
    echo "Запуск через Python"
    python3 -m http.server 8080 &
    open http://localhost:8080
elif command -v python &> /dev/null; then
    echo "Запуск через Python"
    python -m http.server 8080 &
    open http://localhost:8080
else
    echo "Не удалось найти способ запустить сервер. Установите Node.js или Python."
    exit 1
fi
