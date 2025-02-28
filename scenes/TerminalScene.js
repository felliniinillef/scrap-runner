class TerminalScene extends Phaser.Scene {
    constructor() {
        super('TerminalScene');
    }

    preload() {
        // Load terminal assets
        this.load.image('terminal_bg', 'assets/images/terminal_background.png');
        this.load.image('terminal_button', 'assets/images/terminal_button.png');
        
        // Load audio assets
        this.load.audio('terminal_beep', 'assets/audio/terminal_beep.mp3');
        this.load.audio('terminal_process', 'assets/audio/terminal_process.mp3');
    }

    create() {
        // Add terminal background
        this.add.image(400, 300, 'terminal_bg');
        
        // Initialize terminal module
        this.terminal = new Terminal(this);
        
        // Terminal header
        this.add.text(400, 100, 'TERMINAL INTERFACE', { 
            font: '28px "Courier New"', 
            fill: '#0ff'
        }).setOrigin(0.5);
        
        // Terminal menu options
        const craftButton = this.add.text(400, 200, 'CRAFT', { 
            font: '22px "Courier New"', 
            fill: '#0ff' 
        }).setOrigin(0.5);
        
        const processButton = this.add.text(400, 250, 'PROCESS RESOURCES', { 
            font: '22px "Courier New"', 
            fill: '#0ff' 
        }).setOrigin(0.5);
        
        const upgradeButton = this.add.text(400, 300, 'UPGRADE BASE', { 
            font: '22px "Courier New"', 
            fill: '#0ff' 
        }).setOrigin(0.5);
        
        const storageButton = this.add.text(400, 350, 'STORAGE', { 
            font: '22px "Courier New"', 
            fill: '#0ff' 
        }).setOrigin(0.5);
        
        // Close terminal button
        const closeButton = this.add.text(400, 450, 'RETURN TO GAME', { 
            font: '22px "Courier New"', 
            fill: '#f00' 
        }).setOrigin(0.5);
        
        // Make buttons interactive
        craftButton.setInteractive({ useHandCursor: true });
        processButton.setInteractive({ useHandCursor: true });
        upgradeButton.setInteractive({ useHandCursor: true });
        storageButton.setInteractive({ useHandCursor: true });
        closeButton.setInteractive({ useHandCursor: true });
        
        // Button hover effects
        craftButton.on('pointerover', () => {
            craftButton.setStyle({ fill: '#ff0' });
        });
        craftButton.on('pointerout', () => {
            craftButton.setStyle({ fill: '#0ff' });
        });
        
        processButton.on('pointerover', () => {
            processButton.setStyle({ fill: '#ff0' });
        });
        processButton.on('pointerout', () => {
            processButton.setStyle({ fill: '#0ff' });
        });
        
        upgradeButton.on('pointerover', () => {
            upgradeButton.setStyle({ fill: '#ff0' });
        });
        upgradeButton.on('pointerout', () => {
            upgradeButton.setStyle({ fill: '#0ff' });
        });
        
        storageButton.on('pointerover', () => {
            storageButton.setStyle({ fill: '#ff0' });
        });
        storageButton.on('pointerout', () => {
            storageButton.setStyle({ fill: '#0ff' });
        });
        
        closeButton.on('pointerover', () => {
            closeButton.setStyle({ fill: '#ff0' });
        });
        closeButton.on('pointerout', () => {
            closeButton.setStyle({ fill: '#f00' });
        });
        
        // Button click events
        closeButton.on('pointerdown', () => {
            this.sound.play('terminal_beep');
            this.scene.stop();
            this.scene.resume('GameScene');
        });
        
        // Also close on ESC key
        this.input.keyboard.on('keydown-ESC', () => {
            this.scene.stop();
            this.scene.resume('GameScene');
        });
        
        // Terminal sound effect
        this.sound.play('terminal_beep');
    }
    
    update() {
        // Update terminal logic if needed
        this.terminal.update();
    }
}
