class BootScene extends Phaser.Scene {
    constructor() {
        super('BootScene');
    }

    preload() {
        // Создаем текст загрузки
        this.loadingText = this.add.text(400, 300, 'Загрузка...', {
            font: '24px "Courier New"',
            fill: '#0ff'
        }).setOrigin(0.5);
        
        // Добавляем индикатор загрузки
        const progressBar = this.add.graphics();
        const progressBox = this.add.graphics();
        progressBox.fillStyle(0x222222, 0.8);
        progressBox.fillRect(240, 320, 320, 30);
        
        // Обработчики событий загрузки
        this.load.on('progress', (value) => {
            progressBar.clear();
            progressBar.fillStyle(0x00ffff, 1);
            progressBar.fillRect(250, 325, 300 * value, 20);
        });
        
        this.load.on('complete', () => {
            progressBar.destroy();
            progressBox.destroy();
            this.loadingText.destroy();
        });
        
        // Инициализируем генератор ассетов
        this.assetGenerator = new AssetGenerator(this);
        
        // Предзагрузка минимальных ресурсов
        this.load.image('logo', 'assets/images/logo.png');
        this.load.image('background', 'assets/images/menu_background.png');
    }

    create() {
        // Создаем дефолтные текстуры на случай отсутствия файлов
        this.assetGenerator.createDefaultTextures();
        
        // Переходим в главное меню
        this.scene.start('MainMenuScene');
    }
}
