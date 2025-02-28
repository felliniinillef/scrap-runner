# Scrap Runner Asset Requirements

## Overview
This document outlines the asset requirements for the Scrap Runner game, including texture, audio, and fallback generation strategies.

## Asset Generation Guidelines

### Texture Generation
- All textures must support dynamic generation with `willReadFrequently: true`
- Fallback textures should be generated if original assets are missing
- Texture generation should use canvas context for maximum compatibility

### Required Textures
1. Game Textures
   - `player`: Player character sprite
   - `resource`: Collectible resource sprite
   - `ground`: Platform/ground texture
   - `background`: Game background

2. Menu Textures
   - `menu_background`: Main menu background
   - `start_button`: Start game button
   - `credits_button`: Credits button
   - `options_button`: Options button
   - `logo`: Game logo

3. Map Textures
   - `map_player_icon`: Player icon on map
   - `map_base_icon`: Base icon on map
   - `map_resource_icon`: Resource icon on map
   - `map_background`: Map background

### Required Audio Files
1. Menu Audio
   - `menu_music`: Background music for main menu
   - `button_click`: Button interaction sound

2. Game Audio
   - `game_music`: Background music during gameplay
   - `resource_collect`: Resource collection sound
   - `jump`: Player jump sound

3. Map Audio
   - `map_open`: Map opening sound
   - `map_ping`: Map interaction sound

## Fallback Asset Generation Strategy

### Texture Fallback
If an original texture is missing, generate a placeholder with:
- Unique color
- Minimal geometric representation
- Appropriate size for intended use

### Audio Fallback
If an original audio file is missing, generate a silent audio buffer with:
- 1-second duration
- Single audio channel
- Matching sample rate of the audio context

## Performance Considerations
- Use `willReadFrequently: true` for canvas contexts
- Minimize texture regeneration
- Cache generated assets when possible

## Error Handling
- Log warnings for missing assets
- Provide informative console messages
- Gracefully handle asset generation failures

## Future Improvements
- Implement asset preloading cache
- Add more detailed texture generation methods
- Create a centralized asset management system
