class MapGenerator {
    constructor() {
        // Initialize noise generator for map generation
        this.noise = new SimplexNoise();
        
        // Map settings
        this.mapWidth = 50;  // tiles wide
        this.mapHeight = 15; // tiles high
        this.tileSize = 32;  // pixels per tile
        
        // Tile types
        this.tileTypes = {
            EMPTY: 0,
            GROUND: 1,
            PLATFORM: 2,
            HAZARD: 3,
            RESOURCE: 4
        };
        
        console.log('Map generator initialized');
    }
    
    generateLevel(scene, difficulty = 1) {
        // Create the tile map
        const map = Array(this.mapHeight).fill().map(() => Array(this.mapWidth).fill(this.tileTypes.EMPTY));
        
        // Generate terrain using simplex noise
        this.generateTerrain(map, difficulty);
        
        // Add platforms
        this.addPlatforms(map, difficulty);
        
        // Add resources
        this.addResources(map, difficulty);
        
        // Add hazards
        this.addHazards(map, difficulty);
        
        // Create game objects from the map
        return this.createGameObjects(scene, map);
    }
    
    generateTerrain(map, difficulty) {
        // Create ground terrain with noise
        const groundHeightVariation = 3;
        const baseTerrain = 3;
        
        for (let x = 0; x < this.mapWidth; x++) {
            // Use noise to create a varied terrain
            const noiseValue = this.noise.noise2D(x * 0.1, 0) * groundHeightVariation;
            const groundHeight = Math.floor(this.mapHeight - baseTerrain - noiseValue);
            
            // Fill in ground
            for (let y = groundHeight; y < this.mapHeight; y++) {
                map[y][x] = this.tileTypes.GROUND;
            }
        }
    }
    
    addPlatforms(map, difficulty) {
        // Number of platforms depends on difficulty
        const platformCount = 5 + difficulty * 2;
        
        for (let i = 0; i < platformCount; i++) {
            // Random platform position
            const platformX = Math.floor(Math.random() * (this.mapWidth - 4));
            const platformY = Math.floor(Math.random() * (this.mapHeight - 8)) + 2;
            const platformLength = Math.floor(Math.random() * 5) + 3;
            
            // Add platform
            for (let x = platformX; x < platformX + platformLength && x < this.mapWidth; x++) {
                if (map[platformY][x] === this.tileTypes.EMPTY) {
                    map[platformY][x] = this.tileTypes.PLATFORM;
                }
            }
        }
    }
    
    addResources(map, difficulty) {
        // Number of resource spots
        const resourceCount = 5 + difficulty;
        
        for (let i = 0; i < resourceCount; i++) {
            // Find a suitable location for resources (on platforms or ground)
            let x, y;
            let attempts = 0;
            
            // Try to find a good spot (limited attempts to avoid infinite loop)
            while (attempts < 100) {
                x = Math.floor(Math.random() * this.mapWidth);
                y = Math.floor(Math.random() * (this.mapHeight - 2));
                
                // Check if it's on top of a platform or ground
                if (y + 1 < this.mapHeight && 
                    (map[y + 1][x] === this.tileTypes.GROUND || map[y + 1][x] === this.tileTypes.PLATFORM) && 
                    map[y][x] === this.tileTypes.EMPTY) {
                    map[y][x] = this.tileTypes.RESOURCE;
                    break;
                }
                attempts++;
            }
        }
    }
    
    addHazards(map, difficulty) {
        // Number of hazards increases with difficulty
        const hazardCount = Math.floor(difficulty * 1.5);
        
        for (let i = 0; i < hazardCount; i++) {
            // Find a location for hazards
            let y;
            let x = Math.floor(Math.random() * this.mapWidth);
            
            // Find the top of the ground at this x position
            for (y = 0; y < this.mapHeight; y++) {
                if (map[y][x] === this.tileTypes.GROUND) {
                    // Place hazard just above ground
                    if (y > 0) {
                        map[y - 1][x] = this.tileTypes.HAZARD;
                    }
                    break;
                }
            }
        }
    }
    
    createGameObjects(scene, map) {
        // Create groups for game objects
        const platforms = scene.physics.add.staticGroup();
        const resources = scene.physics.add.group();
        const hazards = scene.physics.add.group();
        
        // Create objects from map
        for (let y = 0; y < this.mapHeight; y++) {
            for (let x = 0; x < this.mapWidth; x++) {
                const tileX = x * this.tileSize;
                const tileY = y * this.tileSize;
                
                switch (map[y][x]) {
                    case this.tileTypes.GROUND:
                    case this.tileTypes.PLATFORM:
                        const platform = platforms.create(tileX, tileY, 'ground');
                        platform.setOrigin(0);
                        platform.refreshBody();
                        break;
                        
                    case this.tileTypes.RESOURCE:
                        const resource = resources.create(tileX, tileY, 'resource');
                        resource.setOrigin(0);
                        
                        // Randomly assign resource type
                        const resourceTypes = ['metal', 'plastic', 'electronics'];
                        const type = resourceTypes[Math.floor(Math.random() * resourceTypes.length)];
                        resource.setData('type', type);
                        resource.setData('value', Math.floor(Math.random() * 10) + 5);
                        
                        // Color based on type
                        switch(type) {
                            case 'metal':
                                resource.setTint(0xcccccc);
                                break;
                            case 'plastic':
                                resource.setTint(0x55aaff);
                                break;
                            case 'electronics':
                                resource.setTint(0x55ff55);
                                break;
                        }
                        break;
                        
                    case this.tileTypes.HAZARD:
                        // Use player sprite as placeholder for hazard
                        const hazard = hazards.create(tileX, tileY, 'player');
                        hazard.setOrigin(0);
                        hazard.setTint(0xff0000);
                        break;
                }
            }
        }
        
        return {
            platforms,
            resources,
            hazards,
            mapWidth: this.mapWidth * this.tileSize,
            mapHeight: this.mapHeight * this.tileSize
        };
    }
}
