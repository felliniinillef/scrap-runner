class GameScene extends Phaser.Scene {
    constructor() {
        super('GameScene');
    }

    preload() {
        // Load game assets
        this.load.image('player', 'assets/images/player.png');
        this.load.image('ground', 'assets/images/ground.png');
        this.load.image('resource', 'assets/images/resource.png');
        this.load.spritesheet('player_run', 'assets/images/player_run.png', { frameWidth: 32, frameHeight: 48 });
        this.load.spritesheet('player_jump', 'assets/images/player_jump.png', { frameWidth: 32, frameHeight: 48 });
        
        // Load audio assets
        this.load.audio('game_music', 'assets/audio/game_music.mp3');
        this.load.audio('jump_sound', 'assets/audio/jump.mp3');
        this.load.audio('collect_sound', 'assets/audio/collect.mp3');
    }

    create() {
        // Initialize the world
        this.world = new World(this);
        
        // Create the player
        this.player = new Player(this, 100, 450);
        
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
        
        // Play game music
        this.gameMusic = this.sound.add('game_music', { loop: true, volume: 0.3 });
        this.gameMusic.play();
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
