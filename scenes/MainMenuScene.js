class MainMenuScene extends Phaser.Scene {
    constructor() {
        super('MainMenuScene');
    }

    preload() {
        // Initialize asset generator
        const assetGenerator = new AssetGenerator(this);

        // Define all required assets
        const requiredTextures = [
            'menu_background', 
            'credits_button', 
            'start_button',
            'map_player_icon', 
            'map_base_icon', 
            'map_resource_icon', 
            'map_background'
        ];

        const requiredAudio = [
            'menu_music', 
            'button_click', 
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

        // Existing preload logic
        this.load.image('menu_background', 'assets/images/menu_background.png');
        this.load.image('credits_button', 'assets/images/credits_button.png');
        this.load.image('start_button', 'assets/images/start_button.png');

        // Map scene assets
        this.load.image('map_player_icon', 'assets/images/map_player_icon.png');
        this.load.image('map_base_icon', 'assets/images/map_base_icon.png');
        this.load.image('map_resource_icon', 'assets/images/map_resource_icon.png');
        this.load.image('map_background', 'assets/images/map_background.png');

        // Audio files
        this.load.audio('menu_music', 'assets/audio/menu_music.mp3');
        this.load.audio('button_click', 'assets/audio/button_click.mp3');
        this.load.audio('map_open', 'assets/audio/map_open.mp3');
        this.load.audio('map_ping', 'assets/audio/map_ping.mp3');
    }

    create() {
        // Robust error handling for asset loading
        try {
            // Check if critical assets are loaded
            const criticalTextures = ['menu_background', 'credits_button', 'start_button'];
            const missingTextures = criticalTextures.filter(tex => !this.textures.exists(tex));

            if (missingTextures.length > 0) {
                console.error('Missing critical textures:', missingTextures);
                const assetGenerator = new AssetGenerator(this);
                missingTextures.forEach(textureName => {
                    assetGenerator.createDefaultTexture(this, textureName);
                });
            }

            // Rest of the create method remains the same
            this.cameras.main.setBackgroundColor('#2C3E50');

            // Background
            this.add.image(400, 300, 'menu_background')
                .setDisplaySize(800, 600);

            // Logo
            const logo = this.add.text(400, 150, 'SCRAP RUNNER', {
                fontFamily: 'Arial Black',
                fontSize: '64px',
                color: '#ffffff',
                stroke: '#000000',
                strokeThickness: 8
            }).setOrigin(0.5);

            // Start Button
            const startButton = this.add.image(400, 300, 'start_button')
                .setInteractive({ useHandCursor: true });

            startButton.on('pointerdown', () => {
                // Play click sound
                try {
                    this.sound.play('button_click', { volume: 0.5 });
                } catch (audioError) {
                    console.warn('Button click sound failed:', audioError);
                }

                // Start game scene
                this.scene.start('GameScene');
            });

            // Credits Button
            const creditsButton = this.add.image(400, 400, 'credits_button')
                .setInteractive({ useHandCursor: true });

            creditsButton.on('pointerdown', () => {
                // Play click sound
                try {
                    this.sound.play('button_click', { volume: 0.5 });
                } catch (audioError) {
                    console.warn('Button click sound failed:', audioError);
                }

                // Start credits scene
                this.scene.start('CreditsScene');
            });

            // Background Music
            try {
                if (!this.sound.get('menu_music')) {
                    this.sound.add('menu_music', { loop: true });
                }
                
                if (!this.sound.get('menu_music').isPlaying) {
                    this.sound.play('menu_music', { 
                        loop: true, 
                        volume: 0.3 
                    });
                }
            } catch (musicError) {
                console.warn('Background music failed:', musicError);
            }

            // Audio Context Handling
            this.input.on('pointerdown', this.resumeAudioContext, this);
        } catch (error) {
            console.error('MainMenuScene initialization failed:', error);
        }
    }

    resumeAudioContext() {
        if (this.sound && this.sound.context && this.sound.context.state === 'suspended') {
            this.sound.context.resume().then(() => {
                console.log('Audio context resumed');
            }).catch((error) => {
                console.error('Failed to resume audio context:', error);
            });
        }
    }
}
