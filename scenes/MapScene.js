class MapScene extends Phaser.Scene {
    constructor() {
        super('MapScene');
    }

    preload() {
        // Initialize asset generator
        const assetGenerator = new AssetGenerator(this);

        // Define all required assets
        const requiredTextures = [
            'map_player_icon', 
            'map_base_icon', 
            'map_resource_icon', 
            'map_background'
        ];

        const requiredAudio = [
            'map_open', 
            'map_ping'
        ];

        // Generate missing textures
        requiredTextures.forEach(textureName => {
            if (!this.textures.exists(textureName)) {
                console.warn(`Generating missing texture: ${textureName}`);
                assetGenerator.createDefaultTexture(this, textureName);
            }
        });

        // Generate missing audio
        requiredAudio.forEach(audioName => {
            if (!this.cache.audio.exists(audioName)) {
                console.warn(`Generating missing audio: ${audioName}`);
                const audioContext = new (window.AudioContext || window.webkitAudioContext)();
                const buffer = audioContext.createBuffer(1, audioContext.sampleRate * 1, audioContext.sampleRate);
                
                this.sound.add(audioName, {
                    buffer: buffer,
                    loop: false
                });
            }
        });

        // Attempt to load assets
        this.load.image('map_player_icon', 'assets/images/map_player_icon.png');
        this.load.image('map_base_icon', 'assets/images/map_base_icon.png');
        this.load.image('map_resource_icon', 'assets/images/map_resource_icon.png');
        this.load.image('map_background', 'assets/images/map_background.png');

        this.load.audio('map_open', 'assets/audio/map_open.mp3');
        this.load.audio('map_ping', 'assets/audio/map_ping.mp3');
    }

    create() {
        try {
            // Ensure map icons exist
            const requiredIcons = [
                'map_player_icon', 
                'map_base_icon', 
                'map_resource_icon', 
                'map_background'
            ];

            requiredIcons.forEach(icon => {
                if (!this.textures.exists(icon)) {
                    console.warn(`Missing map icon: ${icon}. Using placeholder.`);
                    const assetGenerator = new AssetGenerator(this);
                    assetGenerator.createDefaultTexture(this, icon);
                }
            });

            // Robust audio handling
            const requiredAudio = ['map_open', 'map_ping'];
            requiredAudio.forEach(audioKey => {
                if (!this.cache.audio.exists(audioKey)) {
                    console.warn(`Missing audio: ${audioKey}. Creating silent placeholder.`);
                    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
                    const buffer = audioContext.createBuffer(1, audioContext.sampleRate * 1, audioContext.sampleRate);
                    
                    this.sound.add(audioKey, {
                        buffer: buffer,
                        loop: false
                    });
                }
            });

            // Existing map initialization logic
            this.mapBackground = this.add.image(
                this.game.config.width / 2, 
                this.game.config.height / 2, 
                'map_background'
            );
            this.mapBackground.setDisplaySize(this.game.config.width, this.game.config.height);

            // Play map open sound with comprehensive error handling
            try {
                if (this.sound.exists('map_open')) {
                    this.sound.play('map_open', { 
                        volume: 0.5,
                        onend: () => console.log('Map open sound completed')
                    });
                } else {
                    console.warn('map_open sound not found in cache');
                }
            } catch (audioError) {
                console.error('Failed to play map_open sound:', audioError);
            }

            // Rest of the map scene initialization...
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
                // Play map ping sound with error handling
                try {
                    if (this.sound.exists('map_ping')) {
                        this.sound.play('map_ping');
                    } else {
                        console.warn('map_ping sound not found in cache');
                    }
                } catch (audioError) {
                    console.error('Failed to play map_ping sound:', audioError);
                }
                
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
            
            // Add map legend
            this.createMapLegend();
        } catch (error) {
            console.error('Map scene initialization failed:', error);
            this.scene.start('MainMenuScene');
        }
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
