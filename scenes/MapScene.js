class MapScene extends Phaser.Scene {
    constructor() {
        super('MapScene');
    }

    preload() {
        // Load map assets
        this.load.image('map_bg', 'assets/images/map_background.png');
        this.load.image('map_player', 'assets/images/map_player_icon.png');
        this.load.image('map_base', 'assets/images/map_base_icon.png');
        this.load.image('map_resource', 'assets/images/map_resource_icon.png');
        
        // Load audio assets
        this.load.audio('map_open', 'assets/audio/map_open.mp3');
        this.load.audio('map_ping', 'assets/audio/map_ping.mp3');
    }

    create() {
        // Add map background
        this.add.image(400, 300, 'map_bg');
        
        // Map header
        this.add.text(400, 80, 'WORLD MAP', { 
            font: '28px "Courier New"', 
            fill: '#0ff'
        }).setOrigin(0.5);
        
        // Initialize map module
        this.mapModule = new Map(this);
        
        // Generate and display the map
        this.mapModule.generateMap();
        
        // Map controls text
        this.add.text(400, 520, 'ZOOM: +/- | MOVE: ARROWS', { 
            font: '16px "Courier New"', 
            fill: '#0ff'
        }).setOrigin(0.5);
        
        // Close map button
        const closeButton = this.add.text(700, 520, 'CLOSE MAP', { 
            font: '18px "Courier New"', 
            fill: '#f00' 
        }).setOrigin(0.5);
        
        closeButton.setInteractive({ useHandCursor: true });
        
        closeButton.on('pointerover', () => {
            closeButton.setStyle({ fill: '#ff0' });
        });
        closeButton.on('pointerout', () => {
            closeButton.setStyle({ fill: '#f00' });
        });
        
        closeButton.on('pointerdown', () => {
            this.sound.play('map_ping');
            this.scene.stop();
            this.scene.resume('GameScene');
        });
        
        // Also close on ESC or M key
        this.input.keyboard.on('keydown-ESC', () => {
            this.scene.stop();
            this.scene.resume('GameScene');
        });
        
        this.input.keyboard.on('keydown-M', () => {
            this.scene.stop();
            this.scene.resume('GameScene');
        });
        
        // Set up keyboard controls for map navigation
        this.cursors = this.input.keyboard.createCursorKeys();
        
        // Map zoom controls
        this.input.keyboard.on('keydown-PLUS', () => {
            this.mapModule.zoomIn();
        });
        
        this.input.keyboard.on('keydown-MINUS', () => {
            this.mapModule.zoomOut();
        });
        
        // Map open sound effect
        this.sound.play('map_open');
        
        // Add map legend
        this.createMapLegend();
    }
    
    createMapLegend() {
        // Legend background
        this.add.rectangle(120, 300, 180, 160, 0x000000, 0.8)
            .setStrokeStyle(2, 0x00ffff);
        
        // Legend title
        this.add.text(120, 230, 'LEGEND', { 
            font: '18px "Courier New"', 
            fill: '#0ff'
        }).setOrigin(0.5);
        
        // Legend items
        const startY = 260;
        const spacing = 30;
        const iconX = 60;
        const textX = 140;
        
        // Player icon
        this.add.image(iconX, startY, 'map_player').setScale(0.5);
        this.add.text(textX, startY, 'YOU', { 
            font: '14px "Courier New"', 
            fill: '#0ff'
        }).setOrigin(0, 0.5);
        
        // Base icon
        this.add.image(iconX, startY + spacing, 'map_base').setScale(0.5);
        this.add.text(textX, startY + spacing, 'BASE', { 
            font: '14px "Courier New"', 
            fill: '#0ff'
        }).setOrigin(0, 0.5);
        
        // Resource icon
        this.add.image(iconX, startY + spacing * 2, 'map_resource').setScale(0.5);
        this.add.text(textX, startY + spacing * 2, 'RESOURCES', { 
            font: '14px "Courier New"', 
            fill: '#0ff'
        }).setOrigin(0, 0.5);
        
        // Unexplored indication
        this.add.rectangle(iconX, startY + spacing * 3, 16, 16, 0x333333);
        this.add.text(textX, startY + spacing * 3, 'UNEXPLORED', { 
            font: '14px "Courier New"', 
            fill: '#0ff'
        }).setOrigin(0, 0.5);
    }
    
    update() {
        // Update map navigation based on keyboard input
        if (this.cursors.left.isDown) {
            this.mapModule.moveLeft();
        }
        else if (this.cursors.right.isDown) {
            this.mapModule.moveRight();
        }
        
        if (this.cursors.up.isDown) {
            this.mapModule.moveUp();
        }
        else if (this.cursors.down.isDown) {
            this.mapModule.moveDown();
        }
        
        // Update map module
        this.mapModule.update();
    }
}
