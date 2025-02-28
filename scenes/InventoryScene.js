class InventoryScene extends Phaser.Scene {
    constructor() {
        super('InventoryScene');
    }

    preload() {
        // Load inventory assets
        this.load.image('inventory_bg', 'assets/images/inventory_background.png');
        this.load.image('item_slot', 'assets/images/item_slot.png');
        
        // Load audio assets
        this.load.audio('inventory_open', 'assets/audio/inventory_open.mp3');
        this.load.audio('inventory_select', 'assets/audio/inventory_select.mp3');
    }

    create() {
        // Add inventory background
        this.add.image(400, 300, 'inventory_bg');
        
        // Inventory header
        this.add.text(400, 80, 'INVENTORY', { 
            font: '28px "Courier New"', 
            fill: '#0ff'
        }).setOrigin(0.5);
        
        // Create inventory slots grid
        this.createInventoryGrid();
        
        // Create tab buttons for different categories
        this.createCategoryTabs();
        
        // Close inventory button
        const closeButton = this.add.text(400, 520, 'CLOSE INVENTORY', { 
            font: '22px "Courier New"', 
            fill: '#f00' 
        }).setOrigin(0.5);
        
        closeButton.setInteractive({ useHandCursor: true });
        
        closeButton.on('pointerover', () => {
            closeButton.setStyle({ fill: '#ff0' });
        });
        closeButton.on('pointerout', () => {
            closeButton.setStyle({ fill: '#f00' });
        });
        
        closeButton.on('pointerdown', () => {
            this.sound.play('inventory_select');
            this.scene.stop();
            this.scene.resume('GameScene');
        });
        
        // Also close on ESC or I key
        this.input.keyboard.on('keydown-ESC', () => {
            this.scene.stop();
            this.scene.resume('GameScene');
        });
        
        this.input.keyboard.on('keydown-I', () => {
            this.scene.stop();
            this.scene.resume('GameScene');
        });
        
        // Inventory open sound effect
        this.sound.play('inventory_open');
    }
    
    createInventoryGrid() {
        const startX = 180;
        const startY = 180;
        const spacing = 60;
        
        // Create a 5x5 grid of item slots
        for (let y = 0; y < 5; y++) {
            for (let x = 0; x < 5; x++) {
                const slot = this.add.image(startX + (x * spacing), startY + (y * spacing), 'item_slot');
                slot.setInteractive({ useHandCursor: true });
                
                slot.on('pointerover', () => {
                    slot.setTint(0xffff00);
                });
                
                slot.on('pointerout', () => {
                    slot.clearTint();
                });
                
                slot.on('pointerdown', () => {
                    this.sound.play('inventory_select');
                    // Show item details when clicked
                });
            }
        }
        
        // Item details panel
        this.add.rectangle(600, 300, 200, 400, 0x000000, 0.8).setStrokeStyle(2, 0x00ffff);
        this.add.text(600, 140, 'ITEM DETAILS', { 
            font: '20px "Courier New"', 
            fill: '#0ff'
        }).setOrigin(0.5);
        
        // Placeholder for item details
        this.itemNameText = this.add.text(600, 180, '', { 
            font: '18px "Courier New"', 
            fill: '#0ff'
        }).setOrigin(0.5);
        
        this.itemDescText = this.add.text(600, 240, '', { 
            font: '14px "Courier New"', 
            fill: '#0ff',
            wordWrap: { width: 180 }
        }).setOrigin(0.5, 0);
    }
    
    createCategoryTabs() {
        const categories = ['ALL', 'RESOURCES', 'MODULES', 'MISC'];
        const startX = 180;
        const tabWidth = 100;
        
        for (let i = 0; i < categories.length; i++) {
            const tabX = startX + (i * tabWidth);
            
            // Tab background
            const tabBg = this.add.rectangle(tabX, 130, tabWidth - 5, 30, 0x000000, 0.8)
                .setStrokeStyle(2, 0x00ffff);
            
            // Tab text
            const tabText = this.add.text(tabX, 130, categories[i], { 
                font: '16px "Courier New"', 
                fill: '#0ff'
            }).setOrigin(0.5);
            
            // Make tab interactive
            tabBg.setInteractive({ useHandCursor: true });
            
            tabBg.on('pointerover', () => {
                tabBg.setStrokeStyle(2, 0xffff00);
                tabText.setStyle({ fill: '#ff0' });
            });
            
            tabBg.on('pointerout', () => {
                tabBg.setStrokeStyle(2, 0x00ffff);
                tabText.setStyle({ fill: '#0ff' });
            });
            
            tabBg.on('pointerdown', () => {
                this.sound.play('inventory_select');
                // Filter inventory by category
            });
        }
    }
    
    update() {
        // Update inventory logic if needed
    }
}
