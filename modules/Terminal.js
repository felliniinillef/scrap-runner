class Terminal {
    constructor(scene) {
        this.scene = scene;
        this.level = 1;
        this.upgrades = {
            storage: 1,
            processor: 1,
            crafting: 1
        };
        
        console.log('Terminal initialized');
    }
    
    processResources(type, amount) {
        // Convert one resource type to another with some efficiency based on processor level
        const efficiency = 0.5 + (this.upgrades.processor * 0.1);
        const output = Math.floor(amount * efficiency);
        
        if (window.gameCore.useResource(type, amount)) {
            if (type === 'metal') {
                window.gameCore.addResource('electronics', output);
                console.log(`Processed ${amount} metal into ${output} electronics`);
            } else if (type === 'plastic') {
                window.gameCore.addResource('energy', output);
                console.log(`Processed ${amount} plastic into ${output} energy`);
            } else if (type === 'electronics') {
                window.gameCore.addResource('metal', output);
                console.log(`Processed ${amount} electronics into ${output} metal`);
            }
            return true;
        }
        
        return false;
    }
    
    craftItem(item) {
        // Simple crafting system
        const recipes = {
            'energyCell': {
                metal: 5,
                plastic: 10,
                electronics: 2
            },
            'armorPlate': {
                metal: 15,
                plastic: 5,
                electronics: 0
            },
            'circuitBoard': {
                metal: 2,
                plastic: 5,
                electronics: 10
            }
        };
        
        if (!recipes[item]) {
            console.log(`Unknown item: ${item}`);
            return false;
        }
        
        const recipe = recipes[item];
        
        // Check if player has enough resources
        for (const resource in recipe) {
            if (window.gameCore.resources[resource] < recipe[resource]) {
                console.log(`Not enough ${resource} to craft ${item}`);
                return false;
            }
        }
        
        // Consume resources
        for (const resource in recipe) {
            window.gameCore.useResource(resource, recipe[resource]);
        }
        
        // Add the crafted item (in a full game, this would add to inventory)
        console.log(`Crafted ${item}`);
        window.gameCore.addScore(50);
        
        return true;
    }
    
    upgradeTerminal(system) {
        // Upgrade terminal systems
        const costs = {
            storage: {
                level2: { metal: 20, plastic: 10, electronics: 5 },
                level3: { metal: 40, plastic: 20, electronics: 10 }
            },
            processor: {
                level2: { metal: 10, plastic: 20, electronics: 15 },
                level3: { metal: 20, plastic: 40, electronics: 30 }
            },
            crafting: {
                level2: { metal: 15, plastic: 15, electronics: 10 },
                level3: { metal: 30, plastic: 30, electronics: 20 }
            }
        };
        
        if (!this.upgrades[system]) {
            console.log(`Unknown system: ${system}`);
            return false;
        }
        
        const currentLevel = this.upgrades[system];
        if (currentLevel >= 3) {
            console.log(`${system} is already at maximum level`);
            return false;
        }
        
        const nextLevel = currentLevel + 1;
        const cost = costs[system][`level${nextLevel}`];
        
        // Check if player has enough resources
        for (const resource in cost) {
            if (window.gameCore.resources[resource] < cost[resource]) {
                console.log(`Not enough ${resource} to upgrade ${system}`);
                return false;
            }
        }
        
        // Consume resources
        for (const resource in cost) {
            window.gameCore.useResource(resource, cost[resource]);
        }
        
        // Upgrade the system
        this.upgrades[system] = nextLevel;
        console.log(`Upgraded ${system} to level ${nextLevel}`);
        window.gameCore.addScore(100);
        
        return true;
    }
}
