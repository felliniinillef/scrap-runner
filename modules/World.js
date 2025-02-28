class World {
    constructor(scene) {
        this.scene = scene;
        this.resources = [];
        this.platforms = [];
        this.enemies = [];
        
        // Create world boundaries and ground
        this.createPlatforms();
        
        // Set up collision handling
        this.setupCollisions();
        
        console.log('World created');
    }
    
    createPlatforms() {
        // Create platform group
        this.platforms = this.scene.physics.add.staticGroup();
        
        const groundWidth = this.scene.game.config.width;
        const groundHeight = 64;
        const groundY = this.scene.game.config.height - groundHeight/2;
        
        // Create multiple ground segments
        for (let x = 0; x < groundWidth; x += 256) {
            const ground = this.platforms.create(x, groundY, 'ground');
            ground.setScale(1);
            ground.refreshBody();
        }
        
        // Create elevated platforms
        const platformPositions = [
            { x: 400, y: 500 },   // Platform 1
            { x: 100, y: 400 },   // Platform 2
            { x: 700, y: 300 },   // Platform 3
            { x: 250, y: 200 }    // Platform 4
        ];
        
        platformPositions.forEach(pos => {
            const platform = this.platforms.create(pos.x, pos.y, 'ground');
            platform.setScale(0.5);
            platform.refreshBody();
        });
        
        console.log('World platforms created');
    }
    
    setupCollisions() {
        // Attempt to set up collisions with player sprite
        this.scene.time.delayedCall(1000, () => {
            try {
                if (this.scene.player && this.scene.player.sprite) {
                    // Add collider between player and platforms
                    this.scene.physics.add.collider(this.scene.player.sprite, this.platforms);
                    
                    // Spawn resources after collision setup
                    this.spawnResources(5);
                } else {
                    console.warn('Player sprite not available for collision setup');
                    this.createFallbackPlayer();
                }
            } catch (error) {
                console.error('Error setting up collisions:', error);
                this.createFallbackPlayer();
            }
        });
    }
    
    createFallbackPlayer() {
        // Create a fallback player sprite if none exists
        const fallbackPlayer = this.scene.physics.add.sprite(400, 300, 'player');
        fallbackPlayer.setBounce(0.2);
        fallbackPlayer.setCollideWorldBounds(true);
        
        // Add collider for fallback player
        this.scene.physics.add.collider(fallbackPlayer, this.platforms);
        
        // Update scene's player reference
        this.scene.player = { sprite: fallbackPlayer };
        
        // Spawn resources
        this.spawnResources(5);
    }
    
    spawnResources(count) {
        // Ensure scene and player are available
        if (!this.scene || !this.scene.player || !this.scene.player.sprite) {
            console.warn('Cannot spawn resources: Scene or player not ready');
            return;
        }

        // Create resources group
        this.resources = this.scene.physics.add.group({
            key: 'resource',
            repeat: count - 1,
            setXY: { x: 100, y: 0, stepX: 70 }
        });

        // Randomize resource properties
        this.resources.children.entries.forEach((resource, index) => {
            // Randomize position on platforms
            const platformPositions = [
                { x: 400, y: 500 },   // Platform 1
                { x: 100, y: 400 },   // Platform 2
                { x: 700, y: 300 },   // Platform 3
                { x: 250, y: 200 }    // Platform 4
            ];
            
            const platform = platformPositions[index % platformPositions.length];
            
            // Randomize position within platform
            resource.setPosition(
                platform.x + Phaser.Math.Between(-50, 50),
                platform.y - 50
            );
            
            // Resource properties
            resource.setBounceY(0.2);
            resource.setCollideWorldBounds(true);
            
            // Add resource type and value
            const resourceTypes = ['metal', 'plastic', 'electronics'];
            const resourceType = resourceTypes[Phaser.Math.Between(0, 2)];
            
            resource.setData('type', resourceType);
            resource.setData('value', Phaser.Math.Between(5, 15));
            
            // Tint based on resource type
            switch (resourceType) {
                case 'metal':
                    resource.setTint(0xcccccc); // Silver
                    break;
                case 'plastic':
                    resource.setTint(0x55aaff); // Blue
                    break;
                case 'electronics':
                    resource.setTint(0xff5555); // Red
                    break;
            }
            
            // Add collider between resources and platforms
            this.scene.physics.add.collider(resource, this.platforms);
        });
        
        console.log(`Spawned ${count} resources`);
    }
    
    collectResource(player, resource) {
        // Prevent multiple collections of the same resource
        if (resource.getData('collected')) return;
        
        const resourceType = resource.getData('type');
        const resourceValue = resource.getData('value');
        
        // Add resource to player's inventory
        if (this.scene.player && this.scene.player.inventory) {
            this.scene.player.inventory.addResource(resourceType, resourceValue);
        }
        
        // Play collection sound
        if (this.scene.sound) {
            const collectSound = this.scene.sound.add('collect');
            collectSound.play();
        }
        
        // Mark resource as collected and remove it
        resource.setData('collected', true);
        resource.destroy();
    }
    
    update() {
        // Update resources and enemies if needed
    }
}
