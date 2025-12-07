export type StyleKey = '80S_CARTOON' | 'CYBERPUNK' | 'KAWAII' | 'ANIME' | '90S_ANIME' | '70S_PSYCHEDELIC' | 'ART_DECO' | 'VINTAGE_POSTER' | 'BRUTALISM' | 'LIQUID' | 'WOODCUT' | 'STAINED_GLASS' | 'EMBROIDERY' | 'PAPER_CUT' | 'PAPER_CUT_ART' | 'BOTANICAL_ILLUSTRATION' | 'WATERCOLOR_NATURE' | 'POP_ART' | 'PIXEL_ART' | 'SCANDINAVIAN' | 'STEAMPUNK' | 'UFO_PSYCHEDELIC' | 'LYRICAL_GRAPHIC' | 'NEO_POP' | 'HIGH_TECH' | 'CHILD_DRAWING' | 'NEON_COSMIC_CGI' | 'SCRATCHBOARD_POSTER' | 'GRAPHITE_SKETCH' | 'VIBRANT_DIGITAL_COMIC';

export type Quality = 'STANDARD' | 'PREMIUM' | 'ULTRA' | 'MASTER';
export type Vector = 'YES' | 'NO';
export type OutlineOnly = 'YES' | 'NO';
export type OutlineWeight = 'THIN' | 'MEDIUM' | 'THICK';
export type TextMode = 'NO_TEXT' | 'CUSTOM_TEXT';
export type TextPosition = 'BOTTOM' | 'TOP' | 'AROUND' | 'INTEGRATED';
export type TextColor = 'BLACK' | 'WHITE' | 'RED' | 'BLUE' | 'GREEN' | 'YELLOW';
export type TextShape = 'STRAIGHT' | 'ARCH_UP' | 'ARCH_DOWN' | 'CIRCULAR';
export type TextSize = 'SMALL' | 'MEDIUM' | 'LARGE';
export type StickerMode = 'ISOLATION' | 'CONTAINER';
export type StickerShape = 'NONE' | 'CIRCLE' | 'SQUARE' | 'TRIANGLE' | 'OCTAHEDRON';
export type InterpretationMode = 'STRICT' | 'ARTISTIC';
export type MaterialTexture = 'STANDARD' | 'WET' | 'GLOSSY' | 'METALLIC' | 'GLASS';
export type ParticleEffect = 'NONE' | 'DROPLETS' | 'MIST' | 'SPARKLES' | 'GLOW';
export type LightingPreset = 'STANDARD' | 'RIM_LIGHT' | 'STUDIO' | 'DRAMATIC' | 'CINEMATIC';
export type CinematicAspect = 'STANDARD' | 'VERTICAL_9_16' | 'CINEMASCOPE';
export type Category = 'style' | 'format' | 'quality' | 'background' | 'text' | 'vfx';
export type StyleCategoryKey = 'GRAPHICS_AND_DESIGN' | 'ANIME_AND_CARTOONS' | 'ART_TECHNIQUES' | 'TECHNO_AND_FUTURISM' | 'ABSTRACTION_AND_PSYCHEDELIA' | 'ARCHITECTURE_AND_MINIMALISM';


export interface Settings {
    style: StyleKey;
    quality: Quality;
    vector: Vector;
    outlineOnly: OutlineOnly;
    outlineWeight: OutlineWeight;
    textMode: TextMode;
    customText: string;
    textPosition: TextPosition;
    textColor: TextColor;
    textShape: TextShape;
    textSize: TextSize;
    cameraLock: boolean;
    detailLock: boolean;
    poseLock: boolean;
    backgroundLock: boolean;
    styleBackground: boolean;
    stickerMode: StickerMode;
    stickerShape: StickerShape;
    interpretationMode: InterpretationMode;
    materialTexture: MaterialTexture;
    subsurfaceScattering: boolean;
    particleEffects: ParticleEffect;
    lightingPreset: LightingPreset;
    cinematicAspect: CinematicAspect;
    colorVibrance: number;
}

export interface StyleInfo {
    nameKey: string;
    emoji: string;
    badgeKey: string;
    category: StyleCategoryKey;
    tagKeys: string[];
    strictPrompt: string;
    artisticPrompt: string;
    locks?: (keyof Settings)[];
}

export type StyleLibrary = Record<StyleKey, StyleInfo>;

export interface PromptData {
    prompt: string;
    negative_prompt: string;
    settings: Settings;
    metadata: {
        generator: string;
        timestamp: string;
        style: string;
        interpretation_mode: InterpretationMode;
        priority_system_active: boolean;
    };
}

export interface Preset {
    id: string;
    name: string;
    settings: Settings;
}

export type NotificationType = 'success' | 'error' | 'info' | 'warning';