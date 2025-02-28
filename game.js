// Scrap Runner - Main Game Configuration
window.onload = function() {
    // Phaser game configuration
    const config = {
        type: Phaser.AUTO,
        width: 800,
        height: 600,
        parent: 'game-container',
        pixelArt: true,
        physics: {
            default: 'arcade',
            arcade: {
                gravity: { y: 300 },
                debug: false
            }
        },
        scene: [
            MainMenuScene,
            GameScene,
            TerminalScene,
            InventoryScene,
            MapScene
        ]
    };

    // Create Phaser game instance
    const game = new Phaser.Game(config);
    
    // Store game reference globally for modules to access
    window.game = game;
    
    // Initialize game core
    window.gameCore = new GameCore(game);
};
