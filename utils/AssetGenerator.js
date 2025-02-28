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
            const graphics = this.scene.add.graphics({ willReadFrequently: true });
            
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
    
    createDefaultLogoTexture() {
        if (!this.scene.textures.exists('logo')) {
            const graphics = this.scene.add.graphics({ willReadFrequently: true });
            
            // Create a background
            graphics.fillStyle(0x000033, 1);
            graphics.fillRect(0, 0, 400, 200);
            
            // Create a border
            graphics.lineStyle(4, 0x00ffff, 1);
            graphics.strokeRect(10, 10, 380, 180);
            
            // Add game title
            const textStyle = {
                font: 'bold 48px "Courier New"',
                fill: '#00ffff',
                align: 'center'
            };
            
            const text = this.scene.add.text(200, 60, 'SCRAP', textStyle);
            text.setOrigin(0.5);
            
            const text2 = this.scene.add.text(200, 120, 'RUNNER', textStyle);
            text2.setOrigin(0.5);
            
            // Generate the texture
            this.scene.renderer.snapshot((image) => {
                if (this.scene.textures.exists('logo')) {
                    return;
                }
                this.scene.textures.addImage('logo', image);
                console.log('Created default logo texture');
            });
            
            graphics.destroy();
            text.destroy();
            text2.destroy();
        }
    }
    
    createDefaultMenuBackgroundTexture() {
        if (!this.scene.textures.exists('menu_background')) {
            const graphics = this.scene.add.graphics({ willReadFrequently: true });
            
            // Create a gradient background
            graphics.fillGradientStyle(0x000022, 0x000022, 0x000044, 0x000044, 1);
            graphics.fillRect(0, 0, 800, 600);
            
            // Add some grid lines
            graphics.lineStyle(1, 0x00ffff, 0.2);
            
            // Horizontal grid lines
            for (let y = 0; y < 600; y += 20) {
                graphics.lineBetween(0, y, 800, y);
            }
            
            // Vertical grid lines
            for (let x = 0; x < 800; x += 20) {
                graphics.lineBetween(x, 0, x, 600);
            }
            
            // Add some glow points
            for (let i = 0; i < 30; i++) {
                const x = Math.random() * 800;
                const y = Math.random() * 600;
                const radius = Math.random() * 100 + 50;
                
                graphics.fillStyle(0x00ffff, 0.1);
                graphics.fillCircle(x, y, radius);
            }
            
            // Generate the texture
            graphics.generateTexture('menu_background', 800, 600);
            graphics.destroy();
            
            console.log('Created default menu background texture');
        }
    }
    
    createDefaultButtonTextures() {
        if (!this.scene.textures.exists('button')) {
            const graphics = this.scene.add.graphics({ willReadFrequently: true });
            
            // Normal button
            graphics.fillStyle(0x003333, 1);
            graphics.fillRect(0, 0, 200, 50);
            graphics.lineStyle(2, 0x00ffff, 1);
            graphics.strokeRect(0, 0, 200, 50);
            
            // Generate the texture
            graphics.generateTexture('button', 200, 50);
            
            // Hover button
            graphics.clear();
            graphics.fillStyle(0x004444, 1);
            graphics.fillRect(0, 0, 200, 50);
            graphics.lineStyle(2, 0x00ffdd, 1);
            graphics.strokeRect(0, 0, 200, 50);
            
            // Generate the texture
            graphics.generateTexture('button_hover', 200, 50);
            
            graphics.destroy();
            
            console.log('Created default button textures');
        }
    }
    
    createDefaultAudioFiles() {
        // Создаем пустой звуковой буфер для menu_music
        if (!this.scene.cache.audio.exists('menu_music')) {
            try {
                // Создаем AudioContext
                const AudioContext = window.AudioContext || window.webkitAudioContext;
                const audioContext = new AudioContext();
                
                // Создаем пустой буфер
                const buffer = audioContext.createBuffer(2, 44100, 44100);
                
                // Добавляем в кэш Phaser
                this.scene.cache.audio.add('menu_music', buffer);
                
                console.log('Created empty audio buffer for menu_music');
            } catch (e) {
                console.error('Failed to create audio buffer:', e);
            }
        }
        
        // Создаем пустой звуковой буфер для button_click
        if (!this.scene.cache.audio.exists('button_click')) {
            try {
                // Создаем AudioContext
                const AudioContext = window.AudioContext || window.webkitAudioContext;
                const audioContext = new AudioContext();
                
                // Создаем пустой буфер
                const buffer = audioContext.createBuffer(2, 22050, 44100);
                
                // Добавляем в кэш Phaser
                this.scene.cache.audio.add('button_click', buffer);
                
                console.log('Created empty audio buffer for button_click');
            } catch (e) {
                console.error('Failed to create audio buffer:', e);
            }
        }
    }
}
