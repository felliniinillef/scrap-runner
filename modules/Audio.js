class Audio {
    constructor() {
        // Initialize Howler for sound management
        this.sounds = {};
        this.music = {};
        
        // Default volumes
        this.musicVolume = 0.5;
        this.soundVolume = 0.7;
        
        // Flags
        this.musicMuted = false;
        this.soundMuted = false;
        
        this.initializeSounds();
        
        console.log('Audio system initialized');
    }
    
    initializeSounds() {
        // Initialize common sound effects
        this.sounds = {
            jump: new Howl({
                src: ['assets/audio/jump.mp3'],
                volume: this.soundVolume
            }),
            collect: new Howl({
                src: ['assets/audio/collect.mp3'],
                volume: this.soundVolume
            }),
            hit: new Howl({
                src: ['assets/audio/hit.mp3'],
                volume: this.soundVolume
            }),
            upgrade: new Howl({
                src: ['assets/audio/upgrade.mp3'],
                volume: this.soundVolume
            }),
            error: new Howl({
                src: ['assets/audio/error.mp3'],
                volume: this.soundVolume
            }),
            craft: new Howl({
                src: ['assets/audio/craft.mp3'],
                volume: this.soundVolume
            }),
            buttonClick: new Howl({
                src: ['assets/audio/button_click.mp3'],
                volume: this.soundVolume
            })
        };
        
        // Initialize music tracks
        this.music = {
            menu: new Howl({
                src: ['assets/audio/menu_music.mp3'],
                volume: this.musicVolume,
                loop: true
            }),
            game: new Howl({
                src: ['assets/audio/game_music.mp3'],
                volume: this.musicVolume,
                loop: true
            }),
            terminal: new Howl({
                src: ['assets/audio/terminal_music.mp3'],
                volume: this.musicVolume * 0.7,
                loop: true
            })
        };
    }
    
    playSound(soundName) {
        if (this.soundMuted || !this.sounds[soundName]) {
            return;
        }
        
        this.sounds[soundName].play();
    }
    
    playMusic(musicName) {
        if (this.musicMuted || !this.music[musicName]) {
            return;
        }
        
        // Stop all currently playing music
        this.stopAllMusic();
        
        // Play the requested music
        this.music[musicName].play();
    }
    
    stopAllMusic() {
        Object.values(this.music).forEach(track => {
            track.stop();
        });
    }
    
    pauseAllMusic() {
        Object.values(this.music).forEach(track => {
            track.pause();
        });
    }
    
    resumeMusic(musicName) {
        if (this.musicMuted || !this.music[musicName]) {
            return;
        }
        
        this.music[musicName].play();
    }
    
    setMusicVolume(volume) {
        this.musicVolume = Math.max(0, Math.min(1, volume));
        
        Object.values(this.music).forEach(track => {
            track.volume(this.musicVolume);
        });
    }
    
    setSoundVolume(volume) {
        this.soundVolume = Math.max(0, Math.min(1, volume));
        
        Object.values(this.sounds).forEach(sound => {
            sound.volume(this.soundVolume);
        });
    }
    
    toggleMusicMute() {
        this.musicMuted = !this.musicMuted;
        
        if (this.musicMuted) {
            this.pauseAllMusic();
        } else {
            // If unmuting, we'd typically resume the music that was playing
            // but we don't track that here, so we'll just leave it paused
        }
        
        return this.musicMuted;
    }
    
    toggleSoundMute() {
        this.soundMuted = !this.soundMuted;
        return this.soundMuted;
    }
}
