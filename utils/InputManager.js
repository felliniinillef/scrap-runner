class InputManager {
    constructor(scene) {
        this.scene = scene;
        
        // Set up keyboard input using Keydrown.js
        this.keys = {
            up: kd.UP,
            down: kd.DOWN,
            left: kd.LEFT,
            right: kd.RIGHT,
            space: kd.SPACE,
            shift: kd.SHIFT,
            e: kd.E, // Interact key
        };
        
        // Set up touch controls for mobile
        if (this.scene.sys.game.device.input.touch) {
            this.setupTouchControls();
        }
        
        // Initialize key press handlers
        this.initKeyHandlers();
        
        console.log('Input manager initialized');
    }
    
    initKeyHandlers() {
        // Set up key press handlers
        this.keys.up.press(() => {
            if (this.scene.player) {
                this.scene.player.jump();
            }
        });
        
        this.keys.left.down(() => {
            if (this.scene.player) {
                this.scene.player.sprite.setVelocityX(-this.scene.player.speed);
                this.scene.player.sprite.flipX = true;
                
                if (this.scene.player.sprite.body.onFloor()) {
                    this.scene.player.sprite.anims.play('player_run', true);
                }
            }
        });
        
        this.keys.right.down(() => {
            if (this.scene.player) {
                this.scene.player.sprite.setVelocityX(this.scene.player.speed);
                this.scene.player.sprite.flipX = false;
                
                if (this.scene.player.sprite.body.onFloor()) {
                    this.scene.player.sprite.anims.play('player_run', true);
                }
            }
        });
        
        this.keys.e.press(() => {
            // Interact with nearby objects or NPCs
            if (this.scene.player) {
                console.log('Interact key pressed');
                // Add interaction logic here
            }
        });
    }
    
    setupTouchControls() {
        // Create a hammer.js instance for touch controls
        const hammertime = new Hammer(this.scene.sys.game.canvas);
        
        // Configure recognizers
        hammertime.get('swipe').set({ direction: Hammer.DIRECTION_ALL });
        
        // Handle swipe up (jump)
        hammertime.on('swipeup', () => {
            if (this.scene.player) {
                this.scene.player.jump();
            }
        });
        
        // Handle swipe left/right (movement)
        hammertime.on('swipeleft', () => {
            if (this.scene.player) {
                this.scene.player.sprite.setVelocityX(-this.scene.player.speed);
                this.scene.player.sprite.flipX = true;
            }
        });
        
        hammertime.on('swiperight', () => {
            if (this.scene.player) {
                this.scene.player.sprite.setVelocityX(this.scene.player.speed);
                this.scene.player.sprite.flipX = false;
            }
        });
        
        // Handle tap (interact)
        hammertime.on('tap', () => {
            // Simulate E key press for interaction
            if (this.scene.player) {
                console.log('Tap interaction');
                // Add interaction logic here
            }
        });
    }
    
    update() {
        // Update Keydrown (required for it to work)
        kd.tick();
        
        // Handle key up events for movement
        if (!this.keys.left.isDown() && !this.keys.right.isDown() && this.scene.player) {
            this.scene.player.sprite.setVelocityX(0);
            
            if (this.scene.player.sprite.body.onFloor()) {
                this.scene.player.sprite.anims.play('player_idle', true);
            }
        }
    }
}
