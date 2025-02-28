class Player {
    constructor(scene, x, y) {
        this.scene = scene;
        
        // Create player sprite
        this.sprite = scene.physics.add.sprite(x, y, 'player');
        this.sprite.setBounce(0.2);
        this.sprite.setCollideWorldBounds(true);
        
        // Player properties
        this.speed = 160;
        this.jumpStrength = 330;
        this.health = 100;
        this.maxHealth = 100;
        this.energy = 100;
        this.maxEnergy = 100;
        this.isJumping = false;
        
        // Set up animations
        if (scene.anims.get('player_run') === undefined) {
            scene.anims.create({
                key: 'player_run',
                frames: scene.anims.generateFrameNumbers('player_run', { start: 0, end: 5 }),
                frameRate: 10,
                repeat: -1
            });
            
            scene.anims.create({
                key: 'player_idle',
                frames: [{ key: 'player', frame: 0 }],
                frameRate: 10
            });
            
            scene.anims.create({
                key: 'player_jump',
                frames: scene.anims.generateFrameNumbers('player_jump', { start: 0, end: 3 }),
                frameRate: 10,
                repeat: 0
            });
        }
        
        // Set up input
        this.cursors = scene.input.keyboard.createCursorKeys();
        
        // Jump sound
        this.jumpSound = scene.sound.add('jump_sound');
        
        console.log('Player created');
    }
    
    update() {
        // Handle horizontal movement
        if (this.cursors.left.isDown) {
            this.sprite.setVelocityX(-this.speed);
            this.sprite.flipX = true;
            
            if (this.sprite.body.onFloor()) {
                this.sprite.anims.play('player_run', true);
            }
        } else if (this.cursors.right.isDown) {
            this.sprite.setVelocityX(this.speed);
            this.sprite.flipX = false;
            
            if (this.sprite.body.onFloor()) {
                this.sprite.anims.play('player_run', true);
            }
        } else {
            this.sprite.setVelocityX(0);
            
            if (this.sprite.body.onFloor()) {
                this.sprite.anims.play('player_idle', true);
            }
        }
        
        // Handle jumping
        if (this.cursors.up.isDown && this.sprite.body.onFloor()) {
            this.jump();
        }
        
        // Play jump animation if in the air
        if (!this.sprite.body.onFloor()) {
            this.sprite.anims.play('player_jump', true);
        }
        
        // Energy regeneration when standing still
        if (this.sprite.body.velocity.x === 0 && this.sprite.body.onFloor()) {
            this.regenerateEnergy(0.1);
        }
    }
    
    jump() {
        if (this.energy >= 10) {
            this.sprite.setVelocityY(-this.jumpStrength);
            this.isJumping = true;
            this.jumpSound.play();
            this.useEnergy(10);
        }
    }
    
    takeDamage(amount) {
        this.health -= amount;
        if (this.health <= 0) {
            this.health = 0;
            this.die();
        }
        console.log(`Player took ${amount} damage, health: ${this.health}`);
    }
    
    heal(amount) {
        this.health = Math.min(this.health + amount, this.maxHealth);
        console.log(`Player healed ${amount}, health: ${this.health}`);
    }
    
    useEnergy(amount) {
        if (this.energy >= amount) {
            this.energy -= amount;
            return true;
        }
        return false;
    }
    
    regenerateEnergy(amount) {
        this.energy = Math.min(this.energy + amount, this.maxEnergy);
    }
    
    collectResource(resourceType, amount) {
        return window.gameCore.addResource(resourceType, amount);
    }
    
    die() {
        console.log('Player died');
        // Logic for player death, like respawning or game over
        this.scene.scene.restart();
    }
}
