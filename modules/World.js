class World {
    constructor(scene) {
        this.scene = scene;
        this.resources = [];
        this.platforms = [];
        this.enemies = [];
        
        // Create world boundaries and ground
        this.createWorld();
        
        // Add resources to collect
        this.spawnResources(10);
        
        // Collect sound
        this.collectSound = scene.sound.add('collect_sound');
        
        console.log('World created');
    }
    
    createWorld() {
        // Create ground platforms
        this.platforms = this.scene.physics.add.staticGroup();
        
        // Create main ground
        this.platforms.create(400, 580, 'ground').setScale(2).refreshBody();
        
        // Create some platforms
        this.platforms.create(600, 450, 'ground');
        this.platforms.create(50, 350, 'ground');
        this.platforms.create(750, 300, 'ground');
        this.platforms.create(450, 200, 'ground');
        
        // Add collision between player and platforms
        if (this.scene.player && this.scene.player.sprite) {
            this.scene.physics.add.collider(this.scene.player.sprite, this.platforms);
        } else {
            console.warn('Player sprite not available for collision setup');
        }
        
        console.log('World platforms created');
    }
    
    spawnResources(count) {
        this.resources = this.scene.physics.add.group();
        
        // Create resources at random positions on platforms
        for (let i = 0; i < count; i++) {
            // Create a resource at a random x position
            const x = Phaser.Math.Between(50, 750);
            // Resource types: metal, plastic, electronics
            const resourceTypes = ['metal', 'plastic', 'electronics'];
            const resourceType = resourceTypes[Phaser.Math.Between(0, 2)];
            
            const resource = this.resources.create(x, 0, 'resource');
            resource.setBounceY(0.4);
            resource.setData('type', resourceType);
            resource.setData('value', Phaser.Math.Between(5, 15));
            
            // Tint the resource based on type
            if (resourceType === 'metal') {
                resource.setTint(0xcccccc); // Silver
            } else if (resourceType === 'plastic') {
                resource.setTint(0x55aaff); // Blue
            } else {
                resource.setTint(0x55ff55); // Green
            }
        }
        
        // Add collision between resources and platforms
        this.scene.physics.add.collider(this.resources, this.platforms);
        
        // Add overlap between player and resources for collection
        this.scene.physics.add.overlap(
            this.scene.player.sprite, 
            this.resources, 
            this.collectResource, 
            null, 
            this
        );
        
        console.log(`Spawned ${count} resources`);
    }
    
    collectResource(player, resource) {
        // Get resource type and value
        const type = resource.getData('type');
        const value = resource.getData('value');
        
        // Add resource to player
        if (this.scene.player.collectResource(type, value)) {
            // Play collection sound
            this.collectSound.play();
            
            // Hide and deactivate the resource
            resource.disableBody(true, true);
            
            // Add some score
            window.gameCore.addScore(value);
            
            console.log(`Collected ${value} ${type}`);
            
            // Respawn the resource after a delay
            this.scene.time.delayedCall(5000, () => {
                if (this.resources.countActive(true) < 10) {
                    // Choose a random x position
                    const x = Phaser.Math.Between(50, 750);
                    resource.enableBody(true, x, 0, true, true);
                }
            });
        }
    }
    
    update() {
        // Update resources and enemies if needed
    }
}
