class Graphics {
    constructor(scene) {
        this.scene = scene;
        this.effects = {};
        this.particles = {};
        
        // Initialize effects
        this.initializeEffects();
        
        console.log('Graphics system initialized');
    }
    
    initializeEffects() {
        // Create particle emitters for various effects
        if (this.scene && this.scene.add) {
            // Collect particle effect
            this.particles.collect = this.scene.add.particles('resource');
            this.effects.collect = this.particles.collect.createEmitter({
                speed: 100,
                scale: { start: 0.5, end: 0 },
                blendMode: 'ADD',
                lifespan: 500,
                on: false
            });
            
            // Jump dust effect
            this.particles.jump = this.scene.add.particles('ground');
            this.effects.jump = this.particles.jump.createEmitter({
                speed: { min: 20, max: 50 },
                angle: { min: 0, max: 360 },
                scale: { start: 0.2, end: 0 },
                alpha: { start: 0.5, end: 0 },
                lifespan: 300,
                on: false
            });
            
            // Damage effect
            this.particles.damage = this.scene.add.particles('player');
            this.effects.damage = this.particles.damage.createEmitter({
                speed: 50,
                scale: { start: 0.1, end: 0 },
                tint: 0xff0000,
                blendMode: 'ADD',
                lifespan: 300,
                on: false
            });
        }
    }
    
    playCollectEffect(x, y, color) {
        if (this.effects.collect) {
            this.effects.collect.setTint(color || 0xffffff);
            this.effects.collect.setPosition(x, y);
            this.effects.collect.explode(10);
        }
    }
    
    playJumpEffect(x, y) {
        if (this.effects.jump) {
            this.effects.jump.setPosition(x, y);
            this.effects.jump.explode(5);
        }
    }
    
    playDamageEffect(x, y) {
        if (this.effects.damage) {
            this.effects.damage.setPosition(x, y);
            this.effects.damage.explode(8);
        }
    }
    
    createExplosion(x, y, scale = 1) {
        if (!this.scene || !this.scene.add) return;
        
        // Create a one-time explosion effect
        const particles = this.scene.add.particles('resource');
        const emitter = particles.createEmitter({
            speed: { min: 50 * scale, max: 200 * scale },
            angle: { min: 0, max: 360 },
            scale: { start: 0.5 * scale, end: 0 },
            alpha: { start: 1, end: 0 },
            blendMode: 'ADD',
            lifespan: 800,
            on: false
        });
        
        emitter.setPosition(x, y);
        emitter.explode(15);
        
        // Destroy the particle system after the effect is complete
        this.scene.time.delayedCall(1000, () => {
            particles.destroy();
        });
    }
    
    createScreenShake(intensity = 0.01, duration = 100) {
        if (!this.scene || !this.scene.cameras) return;
        
        this.scene.cameras.main.shake(duration, intensity);
    }
    
    createFlash(color = 0xffffff, duration = 100, alpha = 0.2) {
        if (!this.scene || !this.scene.cameras) return;
        
        this.scene.cameras.main.flash(duration, color[0], color[1], color[2], alpha);
    }
    
    createFog(x, y, width, height, density = 0.5) {
        if (!this.scene || !this.scene.add) return;
        
        // Create a fog effect using a rectangle filled with a fog texture
        const fog = this.scene.add.rectangle(x, y, width, height, 0xcccccc);
        fog.setAlpha(density);
        fog.setDepth(100); // Make sure fog is on top
        
        // Add scrolling animation to simulate moving fog
        this.scene.tweens.add({
            targets: fog,
            x: x + 100, // Move the fog horizontally
            duration: 10000,
            ease: 'Linear',
            repeat: -1,
            yoyo: true
        });
        
        return fog;
    }
    
    createLightSource(x, y, radius = 100, intensity = 0.8) {
        if (!this.scene || !this.scene.add) return;
        
        // Create a light effect (simplified in this version)
        const light = this.scene.add.circle(x, y, radius, 0xffff88);
        light.setAlpha(intensity);
        light.setBlendMode('ADD');
        
        // Add pulsating animation
        this.scene.tweens.add({
            targets: light,
            alpha: intensity * 0.7,
            scale: 0.9,
            duration: 1000,
            ease: 'Sine.easeInOut',
            repeat: -1,
            yoyo: true
        });
        
        return light;
    }
}
