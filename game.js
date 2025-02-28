// Scrap Runner - Main Game Configuration

// Import scenes
import BootScene from './scenes/BootScene.js';
import MainMenuScene from './scenes/MainMenuScene.js';
import GameScene from './scenes/GameScene.js';
import TerminalScene from './scenes/TerminalScene.js';
import InventoryScene from './scenes/InventoryScene.js';
import MapScene from './scenes/MapScene.js';

// Ensure GameCore is imported
import GameCore from './modules/GameCore.js';

window.onload = function() {
    // Phaser game configuration
    const config = {
        type: Phaser.AUTO,
        width: 800,
        height: 600,
        parent: 'game-container',
        backgroundColor: '#000033',
        pixelArt: true,
        physics: {
            default: 'arcade',
            arcade: {
                gravity: { y: 300 },
                debug: false
            }
        },
        scene: [
            BootScene,
            MainMenuScene,
            GameScene,
            TerminalScene,
            InventoryScene,
            MapScene
        ],
        render: {
            antialias: false,
            pixelArt: true,
            roundPixels: true,
            powerPreference: 'high-performance',
            batchSize: 2048,
            clearBeforeRender: true,
            premultipliedAlpha: false,
            failIfMajorPerformanceCaveat: false,
            desynchronized: true,
            autoResize: true,
            willReadFrequently: true
        }
    };

    // Create Phaser game instance
    const game = new Phaser.Game(config);
    
    // Store game reference globally for modules to access
    window.game = game;
    
    // Initialize game core
    window.gameCore = new GameCore(game);
};
