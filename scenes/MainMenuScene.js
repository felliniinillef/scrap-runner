class MainMenuScene extends Phaser.Scene {
    constructor() {
        super('MainMenuScene');
    }

    preload() {
        // Create loading text
        this.loadingText = this.add.text(400, 300, 'Loading...', {
            font: '24px "Courier New"',
            fill: '#0ff'
        }).setOrigin(0.5);
        
        // Setup loading error handler
        this.load.on('loaderror', (fileObj) => {
            console.error('Error loading asset:', fileObj.key);
        });
        
        // Load main menu assets
        this.load.image('logo', 'assets/images/logo.png');
        this.load.image('menu_background', 'assets/images/menu_background.png');
        
        // Load audio assets
        this.load.audio('menu_music', 'assets/audio/menu_music.mp3');
        this.load.audio('button_click', 'assets/audio/button_click.mp3');
    }

    create() {
        console.log('MainMenuScene create started');
        
        // Remove loading text if it exists
        if (this.loadingText) {
            this.loadingText.destroy();
        }
        
        // Используем AssetGenerator для создания текстур при необходимости
        this.assetGenerator = new AssetGenerator(this);
        
        // Add background
        const background = this.add.image(400, 300, 'menu_background');
        if (!background.texture.key) {
            this.assetGenerator.createDefaultMenuBackgroundTexture();
            background.setTexture('menu_background');
        }
        
        // Add logo at the top
        const logo = this.add.image(400, 150, 'logo');
        if (!logo.texture.key) {
            this.assetGenerator.createDefaultLogoTexture();
            logo.setTexture('logo');
        }
        logo.setScale(0.8);
        
        // Add menu buttons
        const startButton = this.add.text(400, 350, 'START GAME', { 
            font: '24px "Courier New"', 
            fill: '#0ff' 
        }).setOrigin(0.5);
        
        const optionsButton = this.add.text(400, 400, 'OPTIONS', { 
            font: '24px "Courier New"', 
            fill: '#0ff' 
        }).setOrigin(0.5);
        
        const creditsButton = this.add.text(400, 450, 'CREDITS', { 
            font: '24px "Courier New"', 
            fill: '#0ff' 
        }).setOrigin(0.5);
        
        // Make buttons interactive
        startButton.setInteractive({ useHandCursor: true });
        optionsButton.setInteractive({ useHandCursor: true });
        creditsButton.setInteractive({ useHandCursor: true });
        
        // Add hover effects
        startButton.on('pointerover', () => {
            startButton.setStyle({ fill: '#ff0' });
        });
        
        startButton.on('pointerout', () => {
            startButton.setStyle({ fill: '#0ff' });
        });
        
        optionsButton.on('pointerover', () => {
            optionsButton.setStyle({ fill: '#ff0' });
        });
        
        optionsButton.on('pointerout', () => {
            optionsButton.setStyle({ fill: '#0ff' });
        });
        
        creditsButton.on('pointerover', () => {
            creditsButton.setStyle({ fill: '#ff0' });
        });
        
        creditsButton.on('pointerout', () => {
            creditsButton.setStyle({ fill: '#0ff' });
        });
        
        // Add click handlers
        startButton.on('pointerdown', () => {
            // Play button click sound if available
            try {
                if (this.cache.audio.exists('button_click')) {
                    this.sound.play('button_click');
                }
            } catch (error) {
                console.error('Error playing button click sound:', error);
            }
            
            // Start the game
            this.scene.start('GameScene');
        });
        
        optionsButton.on('pointerdown', () => {
            // Play button click sound if available
            try {
                if (this.cache.audio.exists('button_click')) {
                    this.sound.play('button_click');
                }
            } catch (error) {
                console.error('Error playing button click sound:', error);
            }
            
            // Show options (placeholder)
            console.log('Options button clicked');
        });
        
        creditsButton.on('pointerdown', () => {
            // Play button click sound if available
            try {
                if (this.cache.audio.exists('button_click')) {
                    this.sound.play('button_click');
                }
            } catch (error) {
                console.error('Error playing button click sound:', error);
            }
            
            // Show credits (placeholder)
            console.log('Credits button clicked');
        });
        
        // Background animation
        this.tweens.add({
            targets: logo,
            y: 170,
            duration: 1500,
            yoyo: true,
            repeat: -1,
            ease: 'Sine.easeInOut'
        });
        
        // Play background music
        this.playBackgroundMusic();
    }
    
    playBackgroundMusic() {
        try {
            if (this.cache.audio.exists('menu_music')) {
                this.menuMusic = this.sound.add('menu_music', {
                    loop: true,
                    volume: 0.5
                });
                this.menuMusic.play();
            } else {
                console.log('Menu music asset not found');
            }
        } catch (error) {
            console.error('Error playing menu music:', error);
        }
    }
    
    update() {
        // Update logic for main menu if needed
    }
}
