// Определение сцены загрузки
export default class BootScene extends Phaser.Scene {
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
            this.loadingText.setText(`Загрузка... ${Math.floor(value * 100)}%`);
        });
        
        this.load.on('complete', () => {
            progressBar.destroy();
            progressBox.destroy();
            this.loadingText.destroy();
        });
        
        // Пытаемся загрузить ресурсы
        try {
            // Изображения
            this.load.image('logo', 'assets/images/logo.png');
            this.load.image('background', 'assets/images/menu_background.png');
            this.load.image('player', 'assets/images/player.png');
            this.load.image('ground', 'assets/images/ground.png');
            this.load.image('resource', 'assets/images/resource.png');
            this.load.image('button', 'assets/images/button.png');
            this.load.image('button_hover', 'assets/images/button_hover.png');
            
            // Звуки
            this.load.audio('menu_music', 'assets/audio/menu_music.mp3');
            this.load.audio('button_click', 'assets/audio/button_click.mp3');
            this.load.audio('game_music', 'assets/audio/game_music.mp3');
            this.load.audio('jump', 'assets/audio/jump.mp3');
            this.load.audio('collect', 'assets/audio/collect.mp3');
        } catch (error) {
            console.error('Error loading assets:', error);
        }
    }

    create() {
        // Создаем дефолтные текстуры с помощью AssetGenerator
        this.assetGenerator = new AssetGenerator(this);
        this.assetGenerator.createDefaultTextures();
        
        // Даем немного времени для рендеринга
        this.time.delayedCall(500, () => {
            // Переходим в главное меню
            this.scene.start('MainMenuScene');
        });
    }
};
