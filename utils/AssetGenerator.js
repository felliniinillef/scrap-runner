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
    
    createDefaultTexture(key, width = 256, height = 256, fillStyle = 0x000000) {
        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        
        const context = canvas.getContext('2d', { 
            willReadFrequently: true,  // Explicitly set this for performance
            alpha: true 
        });
        
        context.fillStyle = `#${fillStyle.toString(16).padStart(6, '0')}`;
        context.fillRect(0, 0, width, height);
        
        return this.scene.textures.addCanvas(key, canvas);
    }
    
    createDefaultPlayerTexture() {
        if (!this.scene.textures.exists('player')) {
            const canvas = document.createElement('canvas');
            canvas.width = 32;
            canvas.height = 48;
            
            const context = canvas.getContext('2d', { 
                willReadFrequently: true,  // Explicitly set this for performance
                alpha: true 
            });
            
            // Body
            context.fillStyle = '#00ffff';
            context.fillRect(0, 0, 32, 48);
            
            // Head
            context.fillStyle = '#ffffff';
            context.fillRect(4, 4, 24, 16);
            
            // Eyes
            context.fillStyle = '#000000';
            context.fillRect(10, 10, 4, 4);
            context.fillRect(18, 10, 4, 4);
            
            this.scene.textures.addCanvas('player', canvas);
            console.log('Created default player texture');
        }
    }
    
    createDefaultResourceTextures() {
        if (!this.scene.textures.exists('resource')) {
            const canvas = document.createElement('canvas');
            canvas.width = 24;
            canvas.height = 24;
            
            const context = canvas.getContext('2d', { 
                willReadFrequently: true,  // Explicitly set this for performance
                alpha: true 
            });
            
            // Create a simple gear-like shape
            context.fillStyle = '#aaaaaa';
            context.fillCircle(12, 12, 10);
            context.fillStyle = '#000000';
            context.fillCircle(12, 12, 4);
            
            this.scene.textures.addCanvas('resource', canvas);
            console.log('Created default resource texture');
        }
    }
    
    createDefaultPlatformTexture() {
        if (!this.scene.textures.exists('ground')) {
            const canvas = document.createElement('canvas');
            canvas.width = 256;
            canvas.height = 64;
            
            const context = canvas.getContext('2d', { 
                willReadFrequently: true,  // Explicitly set this for performance
                alpha: true 
            });
            
            // Ground texture
            context.fillStyle = '#8B4513';  // Brown color
            context.fillRect(0, 0, 256, 64);
            
            // Add some texture details
            context.fillStyle = '#5D3A1A';  // Darker brown
            for (let i = 0; i < 256; i += 20) {
                context.fillRect(i, 0, 10, 64);
            }
            
            this.scene.textures.addCanvas('ground', canvas);
            console.log('Created default ground texture');
        }
    }
    
    createDefaultBackgroundTexture() {
        if (!this.scene.textures.exists('background')) {
            const canvas = document.createElement('canvas');
            canvas.width = 800;
            canvas.height = 600;
            
            const context = canvas.getContext('2d', { 
                willReadFrequently: true,  // Explicitly set this for performance
                alpha: true 
            });
            
            // Create a gradient background using Phaser's gradient fill
            const gradient = context.createLinearGradient(0, 0, 0, 600);
            gradient.addColorStop(0, '#87CEEB');  // Top colors (sky blue)
            gradient.addColorStop(1, '#E0F8FF');  // Bottom colors (light blue)
            
            context.fillStyle = gradient;
            context.fillRect(0, 0, 800, 600);
            
            // Add some cloud-like shapes
            context.fillStyle = 'rgba(255, 255, 255, 0.7)';
            context.fillCircle(200, 100, 50);
            context.fillCircle(250, 120, 60);
            context.fillCircle(600, 150, 40);
            
            this.scene.textures.addCanvas('background', canvas);
            console.log('Created default background texture');
        }
    }
    
    createDefaultLogoTexture() {
        if (!this.scene.textures.exists('logo')) {
            const canvas = document.createElement('canvas');
            canvas.width = 300;
            canvas.height = 100;
            
            const context = canvas.getContext('2d', { 
                willReadFrequently: true,  // Explicitly set this for performance
                alpha: true 
            });
            
            // Logo background
            context.fillStyle = '#2C3E50';  // Dark blue-gray
            context.fillRect(0, 0, 300, 100);
            
            // Logo text using Phaser's text rendering
            const text = this.scene.add.text(20, 40, 'SCRAP RUNNER', {
                font: 'bold 48px Arial',
                color: '#FFFFFF'
            });
            
            // Generate the texture using snapshot method
            this.scene.renderer.snapshot((image) => {
                if (!this.scene.textures.exists('logo')) {
                    this.scene.textures.addImage('logo', image);
                    console.log('Created default logo texture');
                }
                text.destroy();
            });
            
            context.clearRect(0, 0, canvas.width, canvas.height);
        }
    }
    
    createDefaultMenuBackgroundTexture() {
        if (!this.scene.textures.exists('menu_background')) {
            const canvas = document.createElement('canvas');
            canvas.width = 800;
            canvas.height = 600;
            
            const context = canvas.getContext('2d', { 
                willReadFrequently: true,  // Performance optimization
                alpha: true 
            });
            
            // Create gradient background
            const gradient = context.createLinearGradient(0, 0, 0, 600);
            gradient.addColorStop(0, '#34495E');
            gradient.addColorStop(1, '#2C3E50');
            
            context.fillStyle = gradient;
            context.fillRect(0, 0, 800, 600);
            
            // Add some geometric shapes for depth
            context.fillStyle = 'rgba(52, 73, 94, 0.5)';
            context.fillRect(50, 50, 700, 500);
            
            this.scene.textures.addCanvas('menu_background', canvas);
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
                const canvas = document.createElement('canvas');
                canvas.width = 200;
                canvas.height = 50;
                
                const context = canvas.getContext('2d', { 
                    willReadFrequently: true,
                    alpha: true 
                });
                
                // Button background
                context.fillStyle = `#${style.color.toString(16).padStart(6, '0')}`;
                context.fillRoundedRect(0, 0, 200, 50, 10);
                
                // Button text using Phaser's text rendering
                const text = this.scene.add.text(50, 15, style.text, {
                    font: 'bold 24px Arial',
                    color: '#FFFFFF'
                });
                
                // Generate the texture using snapshot method
                this.scene.renderer.snapshot((image) => {
                    if (!this.scene.textures.exists(style.name)) {
                        this.scene.textures.addImage(style.name, image);
                        console.log(`Created default ${style.name} texture`);
                    }
                    text.destroy();
                });
                
                context.clearRect(0, 0, canvas.width, canvas.height);
            }
        });
    }
    
    createDefaultAudioFiles() {
        // Audio file generation logic (if needed)
        console.log('Audio file generation not implemented');
    }
    
    generateDefaultMapAssets() {
        // Generate default map icons if they don't exist
        const mapIcons = [
            'map_player_icon', 
            'map_base_icon', 
            'map_resource_icon', 
            'map_background'
        ];

        mapIcons.forEach(iconName => {
            if (!this.scene.textures.exists(iconName)) {
                const canvas = document.createElement('canvas');
                canvas.width = 64;
                canvas.height = 64;
                
                const context = canvas.getContext('2d', { 
                    willReadFrequently: true,
                    alpha: true 
                });
                
                // Simple colored placeholder
                context.fillStyle = this.getRandomColor();
                context.fillRect(0, 0, 64, 64);
                
                this.scene.textures.addCanvas(iconName, canvas);
                console.log(`Generated default ${iconName}`);
            }
        });
    }

    generateDefaultAudioAssets() {
        // Generate placeholder audio files
        const audioFiles = [
            'map_open', 
            'map_ping'
        ];

        audioFiles.forEach(audioName => {
            if (!this.scene.cache.audio.exists(audioName)) {
                // Create a silent audio buffer
                const audioContext = new (window.AudioContext || window.webkitAudioContext)();
                const buffer = audioContext.createBuffer(1, audioContext.sampleRate * 1, audioContext.sampleRate);
                
                this.scene.sound.add(audioName, {
                    buffer: buffer,
                    loop: false
                });
                
                console.log(`Generated default ${audioName} audio`);
            }
        });
    }

    getRandomColor() {
        const letters = '0123456789ABCDEF';
        let color = '#';
        for (let i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    }
}
