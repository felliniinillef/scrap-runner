class AssetGenerator {
    constructor(scene) {
        this.scene = scene;
    }
    
    createDefaultTextures() {
        this.createDefaultPlayerTexture();
        this.createDefaultResourceTextures();
        this.createDefaultPlatformTexture();
        this.createDefaultBackgroundTexture();
    }
    
    createDefaultPlayerTexture() {
        if (!this.scene.textures.exists('player')) {
            const graphics = this.scene.add.graphics();
            
            // Body
            graphics.fillStyle(0x00ffff, 1);
            graphics.fillRect(0, 0, 32, 48);
            
            // Head
            graphics.fillStyle(0xffffff, 1);
            graphics.fillRect(4, 4, 24, 16);
            
            // Eyes
            graphics.fillStyle(0x000000, 1);
            graphics.fillRect(10, 10, 4, 4);
            graphics.fillRect(18, 10, 4, 4);
            
            // Generate the texture
            graphics.generateTexture('player', 32, 48);
            graphics.destroy();
            
            console.log('Created default player texture');
        }
    }
    
    createDefaultResourceTextures() {
        if (!this.scene.textures.exists('resource')) {
            const graphics = this.scene.add.graphics();
            
            // Create a simple gear-like shape
            graphics.fillStyle(0xaaaaaa, 1);
            graphics.fillCircle(12, 12, 10);
            graphics.fillStyle(0x000000, 1);
            graphics.fillCircle(12, 12, 4);
            
            // Generate the texture
            graphics.generateTexture('resource', 24, 24);
            graphics.destroy();
            
            console.log('Created default resource texture');
        }
    }
    
    createDefaultPlatformTexture() {
        if (!this.scene.textures.exists('ground')) {
            const graphics = this.scene.add.graphics();
            
            // Create a simple platform
            graphics.fillStyle(0x555555, 1);
            graphics.fillRect(0, 0, 32, 32);
            
            // Add some texture lines
            graphics.lineStyle(1, 0x333333, 1);
            graphics.lineBetween(0, 8, 32, 8);
            graphics.lineBetween(0, 16, 32, 16);
            graphics.lineBetween(0, 24, 32, 24);
            
            // Generate the texture
            graphics.generateTexture('ground', 32, 32);
            graphics.destroy();
            
            console.log('Created default platform texture');
        }
    }
    
    createDefaultBackgroundTexture() {
        if (!this.scene.textures.exists('background')) {
            const graphics = this.scene.add.graphics();
            
            // Create a gradient background
            graphics.fillGradientStyle(0x000022, 0x000022, 0x000044, 0x000044, 1);
            graphics.fillRect(0, 0, 800, 600);
            
            // Add some stars
            graphics.fillStyle(0xffffff, 0.5);
            for (let i = 0; i < 50; i++) {
                const x = Math.random() * 800;
                const y = Math.random() * 600;
                const size = Math.random() * 2 + 1;
                graphics.fillCircle(x, y, size);
            }
            
            // Generate the texture
            graphics.generateTexture('background', 800, 600);
            graphics.destroy();
            
            console.log('Created default background texture');
        }
    }
}
