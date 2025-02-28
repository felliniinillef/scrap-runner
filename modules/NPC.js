class NPC {
    constructor(scene, x, y, type) {
        this.scene = scene;
        this.type = type || 'neutral'; // neutral, friendly, hostile
        
        // Create NPC sprite
        this.sprite = scene.physics.add.sprite(x, y, 'player'); // Using player sprite as placeholder
        this.sprite.setTint(this.getNPCColor());
        this.sprite.setScale(0.8); // Slightly smaller than player
        
        // NPC properties
        this.speed = 100;
        this.health = 50;
        this.damage = 10;
        this.visionRange = 200;
        this.patrolRange = 100;
        this.startPosition = { x, y };
        this.lastDirectionChange = 0;
        this.currentDirection = { x: 0, y: 0 };
        
        // Configure physics
        this.sprite.setBounce(0.2);
        this.sprite.setCollideWorldBounds(true);
        
        // Add collision with platforms
        scene.physics.add.collider(this.sprite, scene.world.platforms);
        
        console.log(`NPC created: ${this.type}`);
    }
    
    getNPCColor() {
        switch(this.type) {
            case 'friendly':
                return 0x00ff00; // Green
            case 'hostile':
                return 0xff0000; // Red
            default:
                return 0xffff00; // Yellow for neutral
        }
    }
    
    update() {
        // Simple AI behavior based on NPC type
        switch(this.type) {
            case 'friendly':
                this.friendlyBehavior();
                break;
            case 'hostile':
                this.hostileBehavior();
                break;
            default:
                this.neutralBehavior();
                break;
        }
    }
    
    neutralBehavior() {
        // Neutral NPCs just patrol randomly
        this.patrol();
    }
    
    friendlyBehavior() {
        // Friendly NPCs follow the player if nearby
        const distanceToPlayer = Phaser.Math.Distance.Between(
            this.sprite.x, this.sprite.y,
            this.scene.player.sprite.x, this.scene.player.sprite.y
        );
        
        if (distanceToPlayer < this.visionRange) {
            // Move towards player
            this.moveTowards(this.scene.player.sprite.x, this.scene.player.sprite.y);
        } else {
            // Patrol normally
            this.patrol();
        }
    }
    
    hostileBehavior() {
        // Hostile NPCs chase the player if within range
        const distanceToPlayer = Phaser.Math.Distance.Between(
            this.sprite.x, this.sprite.y,
            this.scene.player.sprite.x, this.scene.player.sprite.y
        );
        
        if (distanceToPlayer < this.visionRange) {
            // Chase player
            this.moveTowards(this.scene.player.sprite.x, this.scene.player.sprite.y);
            
            // Attack if very close
            if (distanceToPlayer < 50) {
                this.attack();
            }
        } else {
            // Patrol normally
            this.patrol();
        }
    }
    
    patrol() {
        // Change direction occasionally
        const now = this.scene.time.now;
        if (now > this.lastDirectionChange + 2000) {
            this.lastDirectionChange = now;
            
            // Random direction
            this.currentDirection = {
                x: Phaser.Math.FloatBetween(-1, 1),
                y: 0 // Not moving vertically in patrol mode
            };
            
            // Occasionally stand still
            if (Math.random() < 0.3) {
                this.currentDirection.x = 0;
            }
        }
        
        // Check if NPC has gone too far from start position
        const distanceFromStart = Phaser.Math.Distance.Between(
            this.sprite.x, this.sprite.y,
            this.startPosition.x, this.startPosition.y
        );
        
        if (distanceFromStart > this.patrolRange) {
            // Head back toward start position
            this.moveTowards(this.startPosition.x, this.startPosition.y);
        } else {
            // Move in current direction
            this.sprite.setVelocityX(this.currentDirection.x * this.speed);
            
            // Flip sprite based on direction
            if (this.currentDirection.x < 0) {
                this.sprite.flipX = true;
            } else if (this.currentDirection.x > 0) {
                this.sprite.flipX = false;
            }
        }
    }
    
    moveTowards(targetX, targetY) {
        // Calculate direction to target
        const dx = targetX - this.sprite.x;
        const dy = targetY - this.sprite.y;
        
        // Normalize direction vector
        const distance = Math.sqrt(dx * dx + dy * dy);
        const directionX = dx / distance;
        
        // Move horizontally
        this.sprite.setVelocityX(directionX * this.speed);
        
        // Flip sprite based on direction
        if (directionX < 0) {
            this.sprite.flipX = true;
        } else {
            this.sprite.flipX = false;
        }
        
        // Jump if there's an obstacle in front
        if (this.sprite.body.blocked.left || this.sprite.body.blocked.right) {
            if (this.sprite.body.onFloor()) {
                this.sprite.setVelocityY(-200);
            }
        }
    }
    
    attack() {
        // Only attack once per second
        const now = this.scene.time.now;
        if (!this.lastAttackTime || now > this.lastAttackTime + 1000) {
            this.lastAttackTime = now;
            
            // Damage the player
            this.scene.player.takeDamage(this.damage);
            
            // Visual feedback
            this.scene.cameras.main.shake(100, 0.01);
            
            console.log(`NPC attacked player for ${this.damage} damage`);
        }
    }
    
    takeDamage(amount) {
        this.health -= amount;
        
        // Visual feedback
        this.sprite.setTint(0xffffff);
        this.scene.time.delayedCall(100, () => {
            this.sprite.setTint(this.getNPCColor());
        });
        
        if (this.health <= 0) {
            this.die();
        }
    }
    
    die() {
        // Visual effect
        this.scene.tweens.add({
            targets: this.sprite,
            alpha: 0,
            y: this.sprite.y - 20,
            duration: 800,
            ease: 'Power2',
            onComplete: () => {
                this.sprite.destroy();
            }
        });
        
        // Drop resources
        const resourcesSystem = new Resources();
        const resourceCount = Phaser.Math.Between(1, 3);
        resourcesSystem.spawnResourceCluster(this.scene, this.sprite.x, this.sprite.y, resourceCount);
        
        console.log(`NPC died and dropped ${resourceCount} resources`);
    }
}
