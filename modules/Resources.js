class Resources {
    constructor() {
        // Define resource types
        this.resourceTypes = [
            { name: 'metal', color: 0xcccccc, value: 10 },
            { name: 'plastic', color: 0x55aaff, value: 8 },
            { name: 'electronics', color: 0x55ff55, value: 15 }
        ];
        
        // Resource spawn chances
        this.spawnChances = {
            metal: 0.5,       // 50% chance
            plastic: 0.3,     // 30% chance
            electronics: 0.2  // 20% chance
        };
        
        console.log('Resources system initialized');
    }
    
    getRandomResourceType() {
        // Select a random resource type based on spawn chances
        const rand = Math.random();
        let cumulativeProbability = 0;
        
        for (const type of this.resourceTypes) {
            cumulativeProbability += this.spawnChances[type.name];
            if (rand <= cumulativeProbability) {
                return type;
            }
        }
        
        // Default to metal if something goes wrong
        return this.resourceTypes[0];
    }
    
    createResourceSprite(scene, x, y) {
        // Select a random resource type
        const resourceType = this.getRandomResourceType();
        
        // Create resource sprite
        const resourceSprite = scene.physics.add.sprite(x, y, 'resource');
        resourceSprite.setBounceY(0.4);
        resourceSprite.setData('type', resourceType.name);
        resourceSprite.setData('value', resourceType.value);
        resourceSprite.setTint(resourceType.color);
        
        // Add some simple animation
        scene.tweens.add({
            targets: resourceSprite,
            y: y - 5,
            duration: 1000,
            yoyo: true,
            repeat: -1,
            ease: 'Sine.easeInOut'
        });
        
        return resourceSprite;
    }
    
    getResourceInfo(type) {
        return this.resourceTypes.find(resource => resource.name === type);
    }
    
    spawnResourceCluster(scene, x, y, count) {
        const resources = [];
        
        // Spawn a cluster of resources at the given location
        for (let i = 0; i < count; i++) {
            // Add some random offset
            const offsetX = Phaser.Math.Between(-30, 30);
            const offsetY = Phaser.Math.Between(-20, 20);
            
            const resource = this.createResourceSprite(scene, x + offsetX, y + offsetY);
            resources.push(resource);
        }
        
        return resources;
    }
}
