class NameGenerator {
    constructor() {
        // Prefixes for various items
        this.prefixes = {
            modules: [
                'Quantum', 'Cyber', 'Scrap', 'Junk', 'Salvaged', 'Rusty', 'Reinforced',
                'Experimental', 'Modified', 'Improvised', 'Upgraded', 'Advanced', 'Primitive',
                'Hacked', 'Jury-rigged', 'Cobbled', 'Recycled', 'Makeshift', 'Tactical'
            ],
            resources: [
                'Rare', 'Common', 'Damaged', 'Pristine', 'Contaminated', 'Pure', 'Refined',
                'Raw', 'Processed', 'Synthetic', 'Organic', 'Radioactive', 'Volatile',
                'Stable', 'Heavy', 'Light', 'Compressed', 'Dense', 'Fragile'
            ],
            bases: [
                'Outpost', 'Hideout', 'Sanctuary', 'Bunker', 'Shelter', 'Camp', 'Fortress',
                'Den', 'Hub', 'Safehouse', 'Stronghold', 'Haven', 'Refuge', 'Compound',
                'Headquarters', 'Lab', 'Workshop', 'Garage', 'Warehouse'
            ]
        };
        
        // Suffixes for various items
        this.suffixes = {
            modules: [
                'Module', 'Component', 'Device', 'Unit', 'System', 'Apparatus', 'Gadget',
                'Contraption', 'Machine', 'Mechanism', 'Tool', 'Enhancer', 'Accelerator',
                'Converter', 'Processor', 'Matrix', 'Core', 'Node', 'Interface'
            ],
            resources: [
                'Metal', 'Alloy', 'Composite', 'Plastic', 'Polymer', 'Circuit', 'Crystal',
                'Chip', 'Scrap', 'Fragment', 'Material', 'Element', 'Substance', 'Compound',
                'Component', 'Residue', 'Concentrate', 'Extract', 'Essence'
            ],
            bases: [
                'Alpha', 'Beta', 'Gamma', 'Delta', 'Epsilon', 'Omega', 'Zero',
                'Prime', 'Central', 'Main', 'Secondary', 'Backup', 'Forward',
                'Hidden', 'Secret', 'Exposed', 'Forgotten', 'Abandoned', 'Reclaimed'
            ]
        };
        
        // Adjectives for various descriptions
        this.adjectives = [
            'Broken', 'Glitching', 'Malfunctioning', 'Overclocked', 'Optimized',
            'Unstable', 'Reliable', 'Dangerous', 'Safe', 'Efficient', 'Powerful',
            'Weak', 'Corrupted', 'Clean', 'Ancient', 'Modern', 'Futuristic',
            'Primitive', 'High-tech', 'Low-tech', 'Alien', 'Mysterious'
        ];
        
        console.log('Name generator initialized');
    }
    
    generateModuleName() {
        const prefix = this.getRandomElement(this.prefixes.modules);
        const suffix = this.getRandomElement(this.suffixes.modules);
        return `${prefix} ${suffix}`;
    }
    
    generateResourceName() {
        const prefix = this.getRandomElement(this.prefixes.resources);
        const suffix = this.getRandomElement(this.suffixes.resources);
        return `${prefix} ${suffix}`;
    }
    
    generateBaseName() {
        const prefix = this.getRandomElement(this.prefixes.bases);
        const suffix = this.getRandomElement(this.suffixes.bases);
        return `${prefix} ${suffix}`;
    }
    
    generateDescription(type) {
        const adjective = this.getRandomElement(this.adjectives);
        
        switch (type) {
            case 'module':
                return `A ${adjective.toLowerCase()} module salvaged from the wasteland. Functions may vary.`;
            case 'resource':
                return `A ${adjective.toLowerCase()} resource found in the ruins. Useful for crafting.`;
            case 'base':
                return `A ${adjective.toLowerCase()} base of operations in the wasteland. It provides shelter and safety.`;
            default:
                return `A ${adjective.toLowerCase()} item of unknown origin or purpose.`;
        }
    }
    
    generateUpgradeName() {
        const prefixes = [
            'Enhanced', 'Improved', 'Advanced', 'Superior', 'Optimized',
            'Overcharged', 'Reinforced', 'Augmented', 'Refined', 'Boosted'
        ];
        
        const systems = [
            'Storage', 'Processing', 'Navigation', 'Defense', 'Crafting',
            'Recycling', 'Scanning', 'Communication', 'Power', 'Cooling'
        ];
        
        const prefix = this.getRandomElement(prefixes);
        const system = this.getRandomElement(systems);
        
        return `${prefix} ${system} System`;
    }
    
    getRandomElement(array) {
        return array[Math.floor(Math.random() * array.length)];
    }
}
