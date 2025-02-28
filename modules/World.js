class World {
    constructor(scene) {
        this.scene = scene;
        this.resources = [];
        this.platforms = [];
        this.enemies = [];
        
        // Create world boundaries and ground
        this.createWorld();
        
        // Collect sound
        this.collectSound = scene.sound.add('collect_sound');
        
        // Use a delayed call to set up player-dependent features
        scene.time.delayedCall(100, this.initializePlayerDependentFeatures, [], this);
        
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
        
        console.log('World platforms created');
    }
    
    initializePlayerDependentFeatures() {
        // Ensure player exists
        if (!this.scene.player || !this.scene.player.sprite) {
            console.warn('Player not ready, retrying...');
            this.scene.time.delayedCall(100, this.initializePlayerDependentFeatures, [], this);
            return;
        }
        
        // Add collision between player and platforms
        this.scene.physics.add.collider(this.scene.player.sprite, this.platforms);
        console.log('Player collision setup complete');
        
        // Spawn resources
        this.spawnResources(10);
    }
    
    spawnResources(count) {
        // Ensure player exists
        if (!this.scene.player || !this.scene.player.sprite) {
            console.warn('Cannot spawn resources: Player not ready');
            return;
        }

        this.resources = this.scene.physics.add.group();
        
        // Define platform positions for resource spawning
        const platformPositions = [
            { x: 400, y: 580 },   // Main ground
            { x: 600, y: 450 },   // Platform 1
            { x: 50, y: 350 },    // Platform 2
            { x: 750, y: 300 },   // Platform 3
            { x: 450, y: 200 }    // Platform 4
        ];
        
        // Create resources at random positions on platforms
        for (let i = 0; i < count; i++) {
            // Select a random platform
            const platform = platformPositions[Phaser.Math.Between(0, platformPositions.length - 1)];
            
            // Spawn resource within platform's horizontal bounds
            const x = Phaser.Math.Between(
                platform.x - 100, 
                platform.x + 100
            );
            
            // Resource types: metal, plastic, electronics
            const resourceTypes = ['metal', 'plastic', 'electronics'];
            const resourceType = resourceTypes[Phaser.Math.Between(0, 2)];
            
            const resource = this.resources.create(x, platform.y - 50, 'resource');
            resource.setBounceY(0.2);
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
        }
    }
    
    update() {
        // Update resources and enemies if needed
    }
}
