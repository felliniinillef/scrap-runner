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
        this.load.image('background', 'assets/images/menu_background.png');
        
        // Create default graphics for missing assets
        this.load.on('filecomplete-image-logo', () => {}, this);
        this.load.on('filecomplete-image-background', () => {}, this);
        
        // If logo fails to load, create a default one
        if (!this.textures.exists('logo')) {
            const logoGraphics = this.add.graphics();
            logoGraphics.fillStyle(0x00ffff, 1);
            logoGraphics.fillRect(0, 0, 200, 100);
            
            // Создаем текстуру из графики
            logoGraphics.generateTexture('logo', 200, 100);
            logoGraphics.destroy();
            
            // Добавляем текст отдельно
            this.add.text(400, 200, 'SCRAP RUNNER', {
                font: 'bold 24px "Courier New"',
                fill: '#000000'
            }).setOrigin(0.5);
        }
        
        // Load audio assets
        this.load.audio('menu_music', 'assets/audio/menu_music.mp3');
        this.load.audio('button_click', 'assets/audio/button_click.mp3');
    }

    create() {
        // Remove loading text if it exists
        if (this.loadingText) {
            this.loadingText.destroy();
        }
        
        // Create default background if missing
        if (!this.textures.exists('background')) {
            const bgGraphics = this.add.graphics();
            bgGraphics.fillGradientStyle(0x000033, 0x000033, 0x000066, 0x000066, 1);
            bgGraphics.fillRect(0, 0, 800, 600);
            bgGraphics.generateTexture('background', 800, 600);
            bgGraphics.destroy();
        }
        
        // Create default logo if missing
        if (!this.textures.exists('logo')) {
            const logoGraphics = this.add.graphics();
            logoGraphics.fillStyle(0x00ffff, 1);
            logoGraphics.fillRect(0, 0, 300, 100);
            logoGraphics.generateTexture('logo', 300, 100);
            logoGraphics.destroy();
            
            // Add text on top of the default logo
            this.add.text(400, 200, 'SCRAP RUNNER', {
                font: 'bold 32px "Courier New"',
                fill: '#000000'
            }).setOrigin(0.5);
        }
    
        // Add background
        this.add.image(400, 300, 'background');
        
        // Add logo
        const logo = this.add.image(400, 200, 'logo');
        logo.setScale(0.5);
        
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
            y: 210,
            duration: 2000,
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
