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
        // Ensure all assets are loaded
        if (!this.textures.exists('ground') || 
            !this.textures.exists('player_run') || 
            !this.textures.exists('resource')) {
            console.error('Critical assets missing. Reloading scene.');
            this.scene.restart();
            return;
        }

        // Set up world physics
        this.physics.world.setBounds(0, 0, this.game.config.width, this.game.config.height);

        // Create ground first
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

        // Initialize the world
        this.world = new World(this);
        
        // Create the player with safety checks
        try {
            this.player = new Player(this, 100, 450);
            
            // Add collision between player and ground
            if (this.player.sprite && this.groundGroup) {
                this.physics.add.collider(this.player.sprite, this.groundGroup);
            }

            // Ensure player stays within world bounds
            this.player.sprite.setCollideWorldBounds(true);
        } catch (error) {
            console.error('Player creation failed:', error);
            this.scene.restart();
            return;
        }
        
        // Create UI elements
        this.ui = new UI(this);
        
        // Set up keyboard input
        this.inputManager = new InputManager(this);
        
        // Set up terminal access key
        this.input.keyboard.on('keydown-T', () => {
            this.scene.pause();
            this.scene.launch('TerminalScene');
        });
        
        // Set up inventory access key
        this.input.keyboard.on('keydown-I', () => {
            this.scene.pause();
            this.scene.launch('InventoryScene');
        });
        
        // Set up map access key
        this.input.keyboard.on('keydown-M', () => {
            this.scene.pause();
            this.scene.launch('MapScene');
        });
        
        // Play game music with safety check
        try {
            this.gameMusic = this.sound.add('game_music', { loop: true, volume: 0.3 });
            this.gameMusic.play();
        } catch (error) {
            console.warn('Music playback failed:', error);
        }
    }
    
    update() {
        // Update the player
        this.player.update();
        
        // Update the world
        this.world.update();
        
        // Update UI
        this.ui.update();
    }
}
