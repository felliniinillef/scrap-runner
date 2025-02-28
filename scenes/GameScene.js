class GameScene extends Phaser.Scene {
    constructor() {
        super('GameScene');
    }

    preload() {
        // Load game assets
        this.load.image('player', 'assets/images/player.png');
        this.load.image('ground', 'assets/images/ground.png');
        this.load.image('resource', 'assets/images/resource.png');
        
        // Load sprite sheets with correct frame configuration
        this.load.spritesheet('player_run', 'assets/images/player_run.png', { 
            frameWidth: 32, 
            frameHeight: 48,
            startFrame: 0,
            endFrame: 5
        });
        this.load.spritesheet('player_jump', 'assets/images/player_jump.png', { 
            frameWidth: 32, 
            frameHeight: 48,
            startFrame: 0,
            endFrame: 5
        });
        
        // Load audio assets
        this.load.audio('game_music', 'assets/audio/game_music.mp3');
        this.load.audio('jump_sound', 'assets/audio/jump.mp3');
        this.load.audio('collect_sound', 'assets/audio/collect.mp3');
    }

    create() {
        // Ensure all critical assets are loaded
        const criticalAssets = ['ground', 'player_run', 'player_jump', 'resource'];
        const missingAssets = criticalAssets.filter(asset => !this.textures.exists(asset));
        
        if (missingAssets.length > 0) {
            console.error('Missing critical assets:', missingAssets);
            this.scene.restart();
            return;
        }

        // Set up world physics with proper bounds
        this.physics.world.setBounds(0, 0, this.game.config.width, this.game.config.height);
        
        // Create ground first to ensure it's available
        this.groundGroup = this.physics.add.staticGroup();
        const groundWidth = this.game.config.width;
        const groundHeight = 64;
        const groundY = this.game.config.height - groundHeight/2;
        
        // Create multiple ground segments
        for (let x = 0; x < groundWidth; x += 256) {
            const ground = this.groundGroup.create(x, groundY, 'ground');
            ground.setScale(1);
            ground.refreshBody();
        }

        // Create the player with safety checks
        try {
            this.player = new Player(this, 100, 450);
            
            // Ensure player sprite is fully initialized
            if (!this.player.sprite) {
                throw new Error('Player sprite failed to initialize');
            }

            // Add collision between player and ground
            if (this.groundGroup) {
                this.physics.add.collider(this.player.sprite, this.groundGroup);
            }

            // Ensure player stays within world bounds
            this.player.sprite.setCollideWorldBounds(true);
        } catch (error) {
            console.error('Player creation failed:', error);
            this.scene.restart();
            return;
        }
        
        // Initialize world after player is created
        try {
            this.world = new World(this);
        } catch (error) {
            console.error('World initialization failed:', error);
            this.scene.restart();
            return;
        }
        
        // Create UI elements
        try {
            this.ui = new UI(this);
        } catch (error) {
            console.warn('UI initialization failed:', error);
        }
        
        // Set up keyboard input
        this.inputManager = new InputManager(this);
        
        // Set up scene-specific keys
        this.input.keyboard.on('keydown-T', () => {
            this.scene.pause();
            this.scene.launch('TerminalScene');
        });
        
        this.input.keyboard.on('keydown-I', () => {
            this.scene.pause();
            this.scene.launch('InventoryScene');
        });
        
        this.input.keyboard.on('keydown-M', () => {
            this.scene.pause();
            this.scene.launch('MapScene');
        });
        
        // Play game music with robust error handling
        this.playGameMusic();
    }

    resumeAudioContext() {
        if (this.sound && this.sound.context) {
            if (this.sound.context.state === 'suspended') {
                this.sound.context.resume().then(() => {
                    console.log('Audio context resumed');
                    this.playGameMusic();
                }).catch((error) => {
                    console.error('Failed to resume audio context:', error);
                });
            }
        }
    }

    playGameMusic() {
        // Ensure we have a sound system and audio context
        if (!this.sound || !this.sound.context) {
            console.warn('Sound system not initialized');
            return;
        }

        // Check audio context state
        if (this.sound.context.state === 'suspended') {
            console.log('Audio context suspended. Waiting for user interaction.');
            // Add a one-time listener to resume on first interaction
            this.input.once('pointerdown', () => {
                this.sound.context.resume().then(() => {
                    this.playGameMusic();
                });
            });
            return;
        }

        try {
            // Ensure game music asset exists
            if (!this.cache.audio.exists('game_music')) {
                console.warn('Game music asset not found');
                return;
            }

            // Create music if not already created
            if (!this.gameMusic) {
                this.gameMusic = this.sound.add('game_music', {
                    loop: true,
                    volume: 0.3
                });
            }

            // Play music if not already playing
            if (!this.gameMusic.isPlaying) {
                this.gameMusic.play({
                    loop: true,
                    volume: 0.3
                });
                console.log('Game music started');
            }
        } catch (error) {
            console.error('Error playing game music:', error);
        }
    }

    update() {
        // Update the player
        if (this.player) {
            this.player.update();
        }
        
        // Update the world
        if (this.world) {
            this.world.update();
        }
        
        // Update UI
        if (this.ui) {
            this.ui.update();
        }
    }
}
