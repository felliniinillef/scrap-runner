class SaveManager {
    constructor() {
        this.saveKey = 'scrap_runner_save';
        
        console.log('Save manager initialized');
    }
    
    saveGame(gameData) {
        try {
            // Convert game data to JSON string
            const saveData = JSON.stringify(gameData);
            
            // Save to localStorage
            localStorage.setItem(this.saveKey, saveData);
            
            console.log('Game saved successfully');
            return true;
        } catch (error) {
            console.error('Error saving game:', error);
            return false;
        }
    }
    
    loadGame() {
        try {
            // Get save data from localStorage
            const saveData = localStorage.getItem(this.saveKey);
            
            // If no save data exists, return null
            if (!saveData) {
                console.log('No saved game found');
                return null;
            }
            
            // Parse the JSON data
            const gameData = JSON.parse(saveData);
            
            console.log('Game loaded successfully');
            return gameData;
        } catch (error) {
            console.error('Error loading game:', error);
            return null;
        }
    }
    
    deleteSave() {
        try {
            // Remove save data from localStorage
            localStorage.removeItem(this.saveKey);
            
            console.log('Save deleted successfully');
            return true;
        } catch (error) {
            console.error('Error deleting save:', error);
            return false;
        }
    }
    
    hasSaveGame() {
        return localStorage.getItem(this.saveKey) !== null;
    }
    
    // Create a save object from the current game state
    createSaveData(gameCore, player, map) {
        return {
            version: '1.0.0',
            timestamp: Date.now(),
            score: gameCore.score,
            resources: gameCore.resources,
            playerStats: {
                health: player.health,
                energy: player.energy,
                position: {
                    x: player.sprite.x,
                    y: player.sprite.y
                }
            },
            mapData: {
                playerPosition: map.playerPosition,
                discoveredTiles: map.discoveredTiles
            },
            terminalUpgrades: gameCore.terminalUpgrades || {}
        };
    }
    
    // Apply loaded data to the game
    applySaveData(saveData, gameCore, player, map) {
        // Update score and resources
        gameCore.score = saveData.score;
        gameCore.resources = saveData.resources;
        
        // Update player stats
        player.health = saveData.playerStats.health;
        player.energy = saveData.playerStats.energy;
        
        // Update player position if in same scene
        if (player.sprite) {
            player.sprite.x = saveData.playerStats.position.x;
            player.sprite.y = saveData.playerStats.position.y;
        }
        
        // Update map data
        if (map) {
            map.playerPosition = saveData.mapData.playerPosition;
            map.discoveredTiles = saveData.mapData.discoveredTiles;
        }
        
        // Update terminal upgrades if they exist
        if (saveData.terminalUpgrades) {
            gameCore.terminalUpgrades = saveData.terminalUpgrades;
        }
        
        console.log('Save data applied to game');
    }
}
