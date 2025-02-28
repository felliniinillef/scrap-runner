class UI {
    constructor(scene) {
        this.scene = scene;
        
        // UI elements
        this.scoreText = scene.add.text(16, 16, 'Score: 0', { 
            fontSize: '18px', 
            fill: '#0ff',
            fontFamily: 'Courier New' 
        });
        
        // Resource counters
        this.metalText = scene.add.text(16, 40, 'Metal: 0', { 
            fontSize: '18px', 
            fill: '#ccc',
            fontFamily: 'Courier New' 
        });
        
        this.plasticText = scene.add.text(16, 64, 'Plastic: 0', { 
            fontSize: '18px', 
            fill: '#55aaff',
            fontFamily: 'Courier New' 
        });
        
        this.electronicsText = scene.add.text(16, 88, 'Electronics: 0', { 
            fontSize: '18px', 
            fill: '#55ff55',
            fontFamily: 'Courier New' 
        });
        
        // Health and energy bars
        this.healthBar = new StatusBar(scene, 600, 20, 150, 15, 0xff0000);
        this.energyBar = new StatusBar(scene, 600, 45, 150, 15, 0x0088ff);
        
        // Help text
        this.helpText = scene.add.text(400, 16, 'T: Terminal | I: Inventory | M: Map', { 
            fontSize: '14px', 
            fill: '#ffffff',
            fontFamily: 'Courier New'
        }).setOrigin(0.5, 0);
        
        console.log('UI created');
    }
    
    update() {
        // Update score
        this.scoreText.setText(`Score: ${window.gameCore.score}`);
        
        // Update resource counters
        this.metalText.setText(`Metal: ${window.gameCore.resources.metal}`);
        this.plasticText.setText(`Plastic: ${window.gameCore.resources.plastic}`);
        this.electronicsText.setText(`Electronics: ${window.gameCore.resources.electronics}`);
        
        // Update health and energy bars
        this.healthBar.setValue(this.scene.player.health / this.scene.player.maxHealth);
        this.energyBar.setValue(this.scene.player.energy / this.scene.player.maxEnergy);
    }
}

// Helper class for health and energy bars
class StatusBar {
    constructor(scene, x, y, width, height, fillColor) {
        this.bar = scene.add.graphics();
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.fillColor = fillColor;
        
        // Draw the initial bar
        this.setValue(1.0);
    }
    
    setValue(value) {
        // Clear the bar
        this.bar.clear();
        
        // Background (black)
        this.bar.fillStyle(0x000000);
        this.bar.fillRect(this.x, this.y, this.width, this.height);
        
        // Health or energy (colored)
        this.bar.fillStyle(this.fillColor);
        this.bar.fillRect(this.x + 2, this.y + 2, (this.width - 4) * Math.max(0, value), this.height - 4);
    }
}
