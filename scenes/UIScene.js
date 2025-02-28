// Определение сцены пользовательского интерфейса
window.UIScene = class UIScene extends Phaser.Scene {
    constructor() {
        super('UIScene');
    }

    create() {
        console.log('UIScene created');
        
        // Создаем основные элементы интерфейса
        this.createUI();
        
        // Подписываемся на события от GameScene
        this.listenToGameEvents();
    }
    
    createUI() {
        // Создаем верхнюю панель
        this.topPanel = this.add.rectangle(400, 20, 780, 30, 0x000000, 0.7);
        
        // Создаем счетчик ресурсов
        this.resourcesText = this.add.text(20, 10, 'Ресурсы: 0', {
            font: '16px "Courier New"',
            fill: '#0ff'
        });
        
        // Создаем счетчик здоровья
        this.healthText = this.add.text(200, 10, 'Здоровье: 100%', {
            font: '16px "Courier New"',
            fill: '#0ff'
        });
        
        // Создаем счетчик энергии
        this.energyText = this.add.text(400, 10, 'Энергия: 100%', {
            font: '16px "Courier New"',
            fill: '#0ff'
        });
        
        // Создаем счетчик времени
        this.timeText = this.add.text(600, 10, 'Время: 00:00', {
            font: '16px "Courier New"',
            fill: '#0ff'
        });
    }
    
    listenToGameEvents() {
        // Получаем ссылку на GameScene
        const gameScene = this.scene.get('GameScene');
        
        // Подписываемся на события обновления ресурсов
        gameScene.events.on('updateResources', (resources) => {
            this.resourcesText.setText(`Ресурсы: ${resources}`);
        });
        
        // Подписываемся на события обновления здоровья
        gameScene.events.on('updateHealth', (health) => {
            this.healthText.setText(`Здоровье: ${health}%`);
        });
        
        // Подписываемся на события обновления энергии
        gameScene.events.on('updateEnergy', (energy) => {
            this.energyText.setText(`Энергия: ${energy}%`);
        });
        
        // Подписываемся на события обновления времени
        gameScene.events.on('updateTime', (time) => {
            this.timeText.setText(`Время: ${time}`);
        });
    }
    
    update() {
        // Обновление UI элементов
    }
};
