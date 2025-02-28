class AssetGenerator {
    constructor(scene) {
        this.scene = scene;
    }
    
    createDefaultTextures() {
        this.createDefaultPlayerTexture();
        this.createDefaultResourceTextures();
        this.createDefaultPlatformTexture();
        this.createDefaultBackgroundTexture();
        this.createDefaultLogoTexture();
        this.createDefaultMenuBackgroundTexture();
        this.createDefaultButtonTextures();
        this.createDefaultAudioFiles();
    }
    
    createDefaultPlayerTexture() {
        if (!this.scene.textures.exists('player')) {
            const graphics = this.scene.add.graphics({ willReadFrequently: true });
            
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
            const graphics = this.scene.add.graphics({ willReadFrequently: true });
            
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
            const graphics = this.scene.add.graphics({ willReadFrequently: true });
            
            // Ground texture
            graphics.fillStyle(0x8B4513, 1);  // Brown color
            graphics.fillRect(0, 0, 256, 64);
            
            // Add some texture details
            graphics.fillStyle(0x5D3A1A, 1);  // Darker brown
            for (let i = 0; i < 256; i += 20) {
                graphics.fillRect(i, 0, 10, 64);
            }
            
            // Generate the texture
            graphics.generateTexture('ground', 256, 64);
            graphics.destroy();
            
            console.log('Created default ground texture');
        }
    }
    
    createDefaultBackgroundTexture() {
        if (!this.scene.textures.exists('background')) {
            const graphics = this.scene.add.graphics({ willReadFrequently: true });
            
            // Create a gradient background
            const gradient = graphics.createLinearGradient(0, 0, 0, 600);
            gradient.addColorStop(0, '#87CEEB');    // Sky blue
            gradient.addColorStop(1, '#E0F8FF');    // Light blue
            
            graphics.fillStyle(gradient);
            graphics.fillRect(0, 0, 800, 600);
            
            // Add some cloud-like shapes
            graphics.fillStyle('rgba(255, 255, 255, 0.7)');
            graphics.fillCircle(200, 100, 50);
            graphics.fillCircle(250, 120, 60);
            graphics.fillCircle(600, 150, 40);
            
            // Generate the texture
            graphics.generateTexture('background', 800, 600);
            graphics.destroy();
            
            console.log('Created default background texture');
        }
    }
    
    createDefaultLogoTexture() {
        if (!this.scene.textures.exists('logo')) {
            const graphics = this.scene.add.graphics({ willReadFrequently: true });
            
            // Logo background
            graphics.fillStyle(0x2C3E50, 1);  // Dark blue-gray
            graphics.fillRect(0, 0, 300, 100);
            
            // Logo text
            const text = graphics.text('SCRAP RUNNER', 20, 40, {
                font: 'bold 48px Arial',
                fill: '#FFFFFF'
            });
            
            // Generate the texture
            graphics.generateTexture('logo', 300, 100);
            graphics.destroy();
            
            console.log('Created default logo texture');
        }
    }
    
    createDefaultMenuBackgroundTexture() {
        if (!this.scene.textures.exists('menu_background')) {
            const graphics = this.scene.add.graphics({ willReadFrequently: true });
            
            // Create a gradient background
            const gradient = graphics.createLinearGradient(0, 0, 0, 600);
            gradient.addColorStop(0, '#34495E');    // Dark blue-gray
            gradient.addColorStop(1, '#2C3E50');    // Slightly lighter blue-gray
            
            graphics.fillStyle(gradient);
            graphics.fillRect(0, 0, 800, 600);
            
            // Add some geometric shapes for depth
            graphics.fillStyle('rgba(52, 73, 94, 0.5)');
            graphics.fillRect(50, 50, 700, 500);
            
            // Generate the texture
            graphics.generateTexture('menu_background', 800, 600);
            graphics.destroy();
            
            console.log('Created default menu background texture');
        }
    }
    
    createDefaultButtonTextures() {
        const buttonStyles = [
            { name: 'start_button', color: 0x2ECC71, text: 'START' },
            { name: 'options_button', color: 0x3498DB, text: 'OPTIONS' },
            { name: 'credits_button', color: 0xE74C3C, text: 'CREDITS' }
        ];
        
        buttonStyles.forEach(style => {
            if (!this.scene.textures.exists(style.name)) {
                const graphics = this.scene.add.graphics({ willReadFrequently: true });
                
                // Button background
                graphics.fillStyle(style.color, 1);
                graphics.fillRoundedRect(0, 0, 200, 50, 10);
                
                // Button text
                graphics.fillStyle(0xFFFFFF, 1);
                const text = graphics.text(style.text, 50, 15, {
                    font: 'bold 24px Arial',
                    fill: '#FFFFFF'
                });
                
                // Generate the texture
                graphics.generateTexture(style.name, 200, 50);
                graphics.destroy();
                
                console.log(`Created default ${style.name} texture`);
            }
        });
    }
    
    createDefaultAudioFiles() {
        // Audio file generation logic (if needed)
        console.log('Audio file generation not implemented');
    }
}
