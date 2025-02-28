class Map {
    constructor(scene) {
        this.scene = scene;
        this.mapSize = 12; // 12x12 grid
        this.tileSize = 50; // Pixels per tile
        this.mapData = [];
        this.playerPosition = { x: 6, y: 6 }; // Center of the map
        this.discoveredTiles = {}; // Tiles the player has discovered
        
        // Map tile types
        this.tileTypes = {
            'empty': 0,
            'scrapyard': 1,
            'city': 2,
            'factory': 3,
            'base': 4,
            'danger': 5
        };
        
        // Generate the map data
        this.generateMap();
        
        console.log('Map system initialized');
    }
    
    generateMap() {
        // Create a 2D array to store map data
        this.mapData = Array(this.mapSize).fill().map(() => Array(this.mapSize).fill(0));
        
        // Place the player's base in the center
        const centerX = Math.floor(this.mapSize / 2);
        const centerY = Math.floor(this.mapSize / 2);
        this.mapData[centerY][centerX] = this.tileTypes.base;
        this.playerPosition = { x: centerX, y: centerY };
        this.discoveredTiles[`${centerX},${centerY}`] = true;
        
        // Generate some scrapyards (source of metal)
        this.generateFeature(this.tileTypes.scrapyard, 6);
        
        // Generate some abandoned cities (source of electronics)
        this.generateFeature(this.tileTypes.city, 4);
        
        // Generate some factories (source of plastic)
        this.generateFeature(this.tileTypes.factory, 5);
        
        // Generate some danger zones
        this.generateFeature(this.tileTypes.danger, 8);
        
        console.log('Map generated');
    }
    
    generateFeature(tileType, count) {
        for (let i = 0; i < count; i++) {
            let x, y;
            
            // Find an empty spot
            do {
                x = Phaser.Math.Between(0, this.mapSize - 1);
                y = Phaser.Math.Between(0, this.mapSize - 1);
            } while (this.mapData[y][x] !== 0);
            
            // Place the feature
            this.mapData[y][x] = tileType;
        }
    }
    
    movePlayer(dx, dy) {
        // Calculate new position
        const newX = this.playerPosition.x + dx;
        const newY = this.playerPosition.y + dy;
        
        // Check bounds
        if (newX < 0 || newX >= this.mapSize || newY < 0 || newY >= this.mapSize) {
            console.log("Can't move outside the map!");
            return false;
        }
        
        // Update player position
        this.playerPosition = { x: newX, y: newY };
        
        // Discover tiles in a 1-tile radius around player
        for (let y = -1; y <= 1; y++) {
            for (let x = -1; x <= 1; x++) {
                const discoverX = newX + x;
                const discoverY = newY + y;
                
                if (discoverX >= 0 && discoverX < this.mapSize && discoverY >= 0 && discoverY < this.mapSize) {
                    this.discoveredTiles[`${discoverX},${discoverY}`] = true;
                }
            }
        }
        
        // Return the type of tile player moved to
        return this.mapData[newY][newX];
    }
    
    isTileDiscovered(x, y) {
        return this.discoveredTiles[`${x},${y}`] === true;
    }
    
    getTileAt(x, y) {
        if (x < 0 || x >= this.mapSize || y < 0 || y >= this.mapSize) {
            return null;
        }
        return this.mapData[y][x];
    }
    
    getResourcesForLocation() {
        // Get the type of tile the player is on
        const tileType = this.mapData[this.playerPosition.y][this.playerPosition.x];
        
        // Return resource multipliers based on location
        switch(tileType) {
            case this.tileTypes.scrapyard:
                return { metal: 3, plastic: 1, electronics: 1 };
            case this.tileTypes.city:
                return { metal: 1, plastic: 1, electronics: 3 };
            case this.tileTypes.factory:
                return { metal: 1, plastic: 3, electronics: 1 };
            case this.tileTypes.danger:
                return { metal: 2, plastic: 2, electronics: 2 };
            default:
                return { metal: 1, plastic: 1, electronics: 1 };
        }
    }
    
    getLocationName() {
        // Get the type of tile the player is on
        const tileType = this.mapData[this.playerPosition.y][this.playerPosition.x];
        
        // Return a name based on the tile type
        switch(tileType) {
            case this.tileTypes.scrapyard:
                return "Scrapyard";
            case this.tileTypes.city:
                return "Abandoned City";
            case this.tileTypes.factory:
                return "Old Factory";
            case this.tileTypes.danger:
                return "Danger Zone";
            case this.tileTypes.base:
                return "Your Base";
            default:
                return "Wasteland";
        }
    }
}
