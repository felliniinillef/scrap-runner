@echo off
echo Запуск Scrap Runner...

REM Переходим в директорию проекта
cd /d "%~dp0"

REM Запускаем Python HTTP сервер
start "" cmd /c "python -m http.server 8080 --bind 127.0.0.1"

REM Открываем браузер
start "" http://127.0.0.1:8080

pause
