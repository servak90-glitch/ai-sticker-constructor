import { Settings, StyleLibrary, StyleKey, StyleCategoryKey } from './types';

export const APP_VERSION = '1.2.0';

export const INITIAL_SETTINGS: Settings = {
    style: '80S_CARTOON',
    quality: 'PREMIUM',
    vector: 'YES',
    outlineOnly: 'NO',
    outlineWeight: 'MEDIUM',
    textMode: 'NO_TEXT',
    customText: '',
    textPosition: 'BOTTOM',
    textColor: 'BLACK',
    textShape: 'STRAIGHT',
    textSize: 'MEDIUM',
    cameraLock: true,
    detailLock: true,
    poseLock: true,
    backgroundLock: true,
    styleBackground: false,
    stickerMode: 'ISOLATION',
    stickerShape: 'NONE',
    interpretationMode: 'STRICT',
    materialTexture: 'STANDARD',
    subsurfaceScattering: false,
    particleEffects: 'NONE',
    lightingPreset: 'STANDARD',
    cinematicAspect: 'STANDARD',
    colorVibrance: 85,
};

export const ARTISTIC_STYLES: string[] = ['GRAPHITE_SKETCH', 'PAPER_CUT_ART', 'WATERCOLOR_NATURE', 'LYRICAL_GRAPHIC', 'CHILD_DRAWING', 'LIQUID', '70S_PSYCHEDELIC', 'NEON_COSMIC_CGI', 'SCRATCHBOARD_POSTER'];
export const ALWAYS_ARTISTIC_STYLES: string[] = ['NEON_COSMIC_CGI', '70S_PSYCHEDELIC', 'POP_ART', 'CYBERPUNK', 'STAINED_GLASS', 'UFO_PSYCHEDELIC', 'NEO_POP', 'LIQUID', 'SCRATCHBOARD_POSTER'];
export const REQUIRES_ISOLATION_STYLES: string[] = ['BRUTALISM', 'GRAPHITE_SKETCH', 'BOTANICAL_ILLUSTRATION', 'HIGH_TECH'];
export const REQUIRES_CONTAINER_STYLES: string[] = ['NEON_COSMIC_CGI', '70S_PSYCHEDELIC', 'VINTAGE_POSTER', 'VIBRANT_DIGITAL_COMIC'];

export const STYLE_CATEGORIES_ORDER: StyleCategoryKey[] = [
    'GRAPHICS_AND_DESIGN',
    'ANIME_AND_CARTOONS',
    'ART_TECHNIQUES',
    'TECHNO_AND_FUTURISM',
    'ABSTRACTION_AND_PSYCHEDELIA',
    'ARCHITECTURE_AND_MINIMALISM',
];

export const STYLE_LIBRARY: StyleLibrary = {
    '80S_CARTOON': { 
        nameKey: 'style.80s_cartoon.name', emoji: '🎸', badgeKey: 'style.80s_cartoon.badge', category: 'GRAPHICS_AND_DESIGN',
        tagKeys: ['tags.retro', 'tags.vibrant', 'tags.graphic', 'tags.universal', 'tags.pop_culture', 'tags.nostalgia'], 
        strictPrompt: `80s vintage cartoon aesthetic with bold graphic style - Bold black outlines with uniform weight - Flat vibrant color fills with high saturation - Simplified shapes with clean geometric forms - Retro color palette, hand-drawn feel`,
        artisticPrompt: `80s retro cartoon interpretation - Convert reference into bold graphic cartoon style - Thick black outlines with uniform weight - Vibrant flat color fills - Simplify forms into clean geometric shapes - Retro color scheme - Hand-drawn aesthetic`
    },
    'POP_ART': { 
        nameKey: 'style.pop_art.name', emoji: '🟡', badgeKey: 'style.pop_art.badge', category: 'GRAPHICS_AND_DESIGN',
        tagKeys: ['tags.pop_art', 'tags.vibrant', 'tags.contrast', 'tags.comics', 'tags.mass_culture', 'tags.1960s'], 
        strictPrompt: `Pop art style with bold colors and comic aesthetic - Bold primary colors with high contrast - Ben-day dots printing technique - Comic book style outlines and halftones - Graphic poster-like composition`,
        artisticPrompt: `Pop art artistic interpretation - Transform reference into bold pop art style - Primary colors with high contrast - Ben-day dots printing technique - Comic book outlines and halftones - Graphic poster composition`
    },
    'VINTAGE_POSTER': { 
        nameKey: 'style.vintage_poster.name', emoji: '📜', badgeKey: 'style.vintage_poster.badge', category: 'GRAPHICS_AND_DESIGN',
        tagKeys: ['tags.retro', 'tags.poster', 'tags.advertisement', 'tags.travel', 'tags.typography', 'tags.vintage'], 
        strictPrompt: `Vintage travel poster style with nostalgic advertising aesthetic - Limited color palette with bold contrasts - Hand-lettered typography and illustrations - Sun-faded colors and paper texture - Simplified shapes with graphic impact`,
        artisticPrompt: `Vintage poster artistic style - Transform reference into nostalgic travel poster aesthetic - Limited color palette with bold contrasts - Hand-lettered typography style - Sun-faded colors and paper texture - Simplified graphic shapes`
    },
    'NEO_POP': { 
        nameKey: 'style.neo_pop.name', emoji: '🎨', badgeKey: 'style.neo_pop.badge', category: 'GRAPHICS_AND_DESIGN',
        tagKeys: ['tags.graphic', 'tags.modern', 'tags.vibrant', 'tags.vector', 'tags.design', 'tags.pop_art', 'tags.digital'], 
        strictPrompt: `Modern neo-pop art illustration style with technical precision - STRICT COLOR PALETTE: yellow (#FFD23F), red (#FF3A4D), dark blue (#0F3B72), cyan (#1CA7FF), orange (#FF7A00), near-black (#0B1D35) - Bold 3px black outlines with rounded corner joins - Cel-shading technique with sharp shadow boundaries - Temperature-based shading: warm shadows on left side, cool shadows on right side - Multi-layer graphic composition`,
        artisticPrompt: `Neo-pop artistic interpretation - Transform reference into modern neo-pop art - Bold 3px black outlines with rounded corners - Cel-shading with sharp shadow boundaries - Strict color palette: yellow, red, dark blue, cyan, orange - Multi-layer graphic composition - Paint splashes and geometric elements`
    },
     'VIBRANT_DIGITAL_COMIC': {
        nameKey: 'style.vibrant_digital_comic.name', emoji: '🎨', badgeKey: 'style.vibrant_digital_comic.badge', category: 'GRAPHICS_AND_DESIGN',
        tagKeys: [ "tags.neon", "tags.outlines", "tags.vector", "tags.contrast", "tags.comics", "tags.flat_composition" ],
        strictPrompt: "Digital comic illustration in a vibrant poster style. Use a triadic color harmony: bright yellow (#FFFF00), turquoise (#00CED1), or orange-red (#FF4500) backgrounds, deep blue-gray (#2E4053) for main objects, orange-red (#FF4500) accents. All outlines must be clear, black, of constant thickness. Hatching and cross-hatching for texture, especially on organic forms. Matte surface, high contrast, no halftones. Flat composition, frontal lighting. Bright, energetic, cheerful energy.",
        artisticPrompt: "Create a modern digital illustration with the energy of a comic book poster. Use juicy, neon colors—yellow, blue, or orange-red backgrounds contrast with dark objects. Clear black lines define every shape. Add organic hatching for texture and expressiveness. The mood should be optimistic and slightly ironic, like pop art. Details are emphasized, composition is flat and graphic.",
        locks: ['colorVibrance', 'materialTexture', 'cinematicAspect', 'subsurfaceScattering', 'particleEffects', 'lightingPreset']
    },
    'ANIME': { 
        nameKey: 'style.anime.name', emoji: '🎭', badgeKey: 'style.anime.badge', category: 'ANIME_AND_CARTOONS',
        tagKeys: ['tags.anime', 'tags.characters', 'tags.emotions', 'tags.dynamic', 'tags.modern', 'tags.japan', 'tags.expressive'], 
        strictPrompt: `Modern anime style with expressive eyes and dynamic poses - Expressive large eyes with detailed reflections - Dynamic hair with flowing strands and highlights - Cel-shading with sharp shadow transitions - Emotional expressions and dramatic poses`,
        artisticPrompt: `Anime artistic interpretation - Convert reference into modern anime style - Expressive large eyes with detailed reflections - Dynamic hair with flowing strands - Cel-shading with sharp shadow transitions - Dramatic emotional expressions - Anime aesthetic proportions`
    },
    '90S_ANIME': { 
        nameKey: 'style.90s_anime.name', emoji: '📺', badgeKey: 'style.90s_anime.badge', category: 'ANIME_AND_CARTOONS',
        tagKeys: ['tags.retro', 'tags.anime', 'tags.grunge', 'tags.nostalgia', 'tags.vhs', 'tags.1990s', 'tags.texture'], 
        strictPrompt: `90s anime aesthetic with gritty texture and nostalgic feel - Grainy texture with scan lines effect - Limited color palette with muted tones - Sharp angular character designs - VHS tape visual artifacts`,
        artisticPrompt: `90s anime artistic style - Transform reference into nostalgic 90s anime aesthetic - Grainy texture with scan lines effect - Muted color palette - Sharp angular designs - VHS tape artifacts and retro feel`
    },
    'KAWAII': { 
        nameKey: 'style.kawaii.name', emoji: '🌸', badgeKey: 'style.kawaii.badge', category: 'ANIME_AND_CARTOONS',
        tagKeys: ['tags.cute', 'tags.soft', 'tags.pastel', 'tags.anime', 'tags.feminine', 'tags.joyful', 'tags.japan'], 
        strictPrompt: `Japanese kawaii cute aesthetic with soft adorable style - Soft rounded shapes with no sharp edges - Pastel color palette with gentle gradients - Cute blush marks and sparkling eyes - Sparkle and heart motifs integrated into color scheme - Chibi-inspired proportions while preserving original forms - Cute aesthetic details that enhance without transforming - Soft glow effects and gentle visual sweetness - Gentle soft-focus effect with diffused lighting - Smooth rounded contours without sharp angles - Warm inviting color temperature and mood - Soft matte surfaces with minimal texture - Balanced composition with cute aesthetic appeal`,
        artisticPrompt: `Kawaii cute artistic style - Transform reference into adorable Japanese cute aesthetic - Soft rounded shapes, no sharp edges - Pastel color palette with gentle gradients - Add cute blush marks, sparkling eyes, and decorative elements like sparkles and hearts - Chibi-style proportions - Soft glow effects and visual sweetness - Warm inviting colors and mood`
    },
    'CHILD_DRAWING': { 
        nameKey: 'style.child_drawing.name', emoji: '🖍️', badgeKey: 'style.child_drawing.badge', category: 'ANIME_AND_CARTOONS',
        tagKeys: ['tags.childlike', 'tags.handmade', 'tags.crayons', 'tags.naive', 'tags.simple', 'tags.toy', 'tags.cheerful', 'tags.school', 'tags.artistic'], 
        strictPrompt: `Child-like naive drawing style with crayon and marker aesthetic - Uneven crayon outlines with visible pressure variation and paper texture - Bold primary colors with uneven fills and visible paper - Simplified forms with disproportionate features - Playful, joyful, and optimistic mood`,
        artisticPrompt: `Child drawing artistic interpretation - Transform reference into naive child's drawing style - Uneven crayon outlines with pressure variation - Bold primary colors with uneven fills - Simplified disproportionate forms: oversized head, tiny body - Playful, joyful mood`,
        locks: ['lightingPreset']
    },
    'GRAPHITE_SKETCH': {
        nameKey: 'style.graphite_sketch.name', emoji: '✏️', badgeKey: 'style.graphite_sketch.badge', category: 'ART_TECHNIQUES',
        tagKeys: ['tags.bw', 'tags.sketch', 'tags.graphite', 'tags.handmade', 'tags.hatching', 'tags.paper', 'tags.artistic'],
        strictPrompt: `REALISTIC GRAPHITE PENCIL SKETCH - Render the subject as a highly detailed, realistic graphite pencil drawing on textured paper - Use a full range of graphite pencils (HB to 8B) for tonal variation - Visible paper texture, smudging, and eraser marks - Focus on realistic proportions, shading, and texture rendering`,
        artisticPrompt: `ARTISTIC GRAPHITE PENCIL SKETCH - Interpret the reference as an expressive graphite pencil sketch - Use energetic, loose pencil strokes and cross-hatching - Emphasize emotion and form over photorealism - Allow for visible construction lines, smudging, and an unfinished, spontaneous quality - Textured paper background`,
        locks: ['colorVibrance']
    },
    'WOODCUT': { 
        nameKey: 'style.woodcut.name', emoji: '🌳', badgeKey: 'style.woodcut.badge', category: 'ART_TECHNIQUES',
        tagKeys: ['tags.engraving', 'tags.texture', 'tags.bw', 'tags.contrast', 'tags.handmade', 'tags.traditional'], 
        strictPrompt: `Woodcut printing style with carved texture and bold contrasts - Carved wood texture with grain visible - High contrast black and white composition - Bold lines and simplified forms - Handcrafted imperfect quality`,
        artisticPrompt: `Woodcut print artistic style - Convert reference into carved woodcut aesthetic - Visible wood grain texture - High contrast black and white - Bold simplified lines and forms - Handcrafted imperfect quality`,
        locks: ['colorVibrance']
    },
    'EMBROIDERY': { 
        nameKey: 'style.embroidery.name', emoji: '🧵', badgeKey: 'style.embroidery.badge', category: 'ART_TECHNIQUES',
        tagKeys: ['tags.textile', 'tags.embroidery', 'tags.handmade', 'tags.patterns', 'tags.soft', 'tags.traditional'], 
        strictPrompt: `Embroidery style with stitch texture and thread colors - Visible stitch patterns and thread texture - Fabric background with weave visible - Thread colors with slight sheen - Traditional embroidery motifs`,
        artisticPrompt: `Embroidery artistic style - Convert reference into stitched embroidery aesthetic - Visible stitch patterns and thread texture - Fabric weave background - Thread colors with slight sheen - Traditional embroidery motifs`
    },
    'WATERCOLOR_NATURE': { 
        nameKey: 'style.watercolor_nature.name', emoji: '🎨', badgeKey: 'style.watercolor_nature.badge', category: 'ART_TECHNIQUES',
        tagKeys: ['tags.watercolor', 'tags.nature', 'tags.soft', 'tags.transparent', 'tags.airy', 'tags.gentle', 'tags.artistic'], 
        strictPrompt: `Watercolor nature illustration with soft transparent layers - Delicate color transitions and bloom effects - Visible paper texture and brush strokes - Soft edges with pigment dispersion - Light and airy composition`,
        artisticPrompt: `Watercolor nature artistic interpretation - Convert reference into soft watercolor illustration - Delicate color transitions and bloom effects - Visible paper texture and brush strokes - Soft edges with pigment dispersion - Light airy composition`
    },
    'PAPER_CUT': { 
        nameKey: 'style.paper_cut.name', emoji: '📰', badgeKey: 'style.paper_cut.badge', category: 'ART_TECHNIQUES',
        tagKeys: ['tags.newspaper', 'tags.monochrome', 'tags.typography', 'tags.retro', 'tags.bw', 'tags.grunge'], 
        strictPrompt: `Monochrome press printing aesthetic with high contrast - Black and white halftone reproduction - Newsprint paper texture and grain - High contrast graphic representation - Bold simplified forms with clean edges - Vintage printing press appearance - Paper texture and material feel`,
        artisticPrompt: `Newspaper cutout artistic style - Transform reference into vintage press printing aesthetic - Black and white halftone reproduction - Newsprint paper texture and grain - High contrast graphic representation - Bold simplified forms`,
        locks: ['colorVibrance']
    },
    'PAPER_CUT_ART': { 
        nameKey: 'style.paper_cut_art.name', emoji: '✂️', badgeKey: 'style.paper_cut_art.badge', category: 'ART_TECHNIQUES',
        tagKeys: ['tags.paper', 'tags.collage', 'tags.handmade', 'tags.layers', 'tags.pastel', 'tags.warm', 'tags.artistic'], 
        strictPrompt: `Hand-cut paper collage art — every visual element rendered as a physically cut piece of colored paper — Layered construction with visible paper edges, slight elevation, and subtle cast shadows between layers — Warm muted palette ONLY: ochre, cream, terracotta, teal, soft rust — Matte paper surface with zero gloss, zero gradients, zero texture noise — Organic, slightly uneven cut edges`,
        artisticPrompt: `Interpret the reference image as a handcrafted paper-cut collage. All elements rendered as flat, layered pieces of colored paper. Visible paper cut edges with slight organic irregularity. Warm, muted paper palette: ochre, cream, terracotta, teal, soft rust. Original colors mapped to nearest paper tone. Subtle cast shadows between layers to suggest depth. Matte paper surface. Simplify complex details into clean paper shapes. Slightly adjust proportions for better paper-cut silhouette.`
    },
    'SCRATCHBOARD_POSTER': {
        nameKey: 'style.scratchboard_poster.name', emoji: '🗡️', badgeKey: 'style.scratchboard_poster.badge', category: 'ART_TECHNIQUES',
        tagKeys: ['tags.punk', 'tags.grunge', 'tags.engraving', 'tags.hatching', 'tags.metal', 'tags.poster', 'tags.monochrome', 'tags.artistic'],
        strictPrompt: `PUNK SCRATCHBOARD POSTER AESTHETIC - Emulate scratchboard art style by rendering the subject as if scratched from a black ink-coated surface to reveal a white layer beneath - High-contrast black and white ONLY - Dense, energetic cross-hatching, stippling, and sharp incised lines for texture and value - Retain ALL original forms and details, translated into the scratchboard technique - Grunge, punk rock, metal music poster feel - NO color`,
        artisticPrompt: `PUNK SCRATCHBOARD POSTER INTERPRETATION - Transform the reference into a high-energy scratchboard art piece - Render as if scratching from a black ink surface to reveal a white layer - High-contrast black and white ONLY - Use dense cross-hatching, stippling, and sharp incised lines for texture and value - Embrace a grunge, punk rock, or metal music poster aesthetic - Simplify complex forms for graphic impact, while retaining the subject's essence`,
        locks: ['colorVibrance']
    },
    'LYRICAL_GRAPHIC': { 
        nameKey: 'style.lyrical_graphic.name', emoji: '📜', badgeKey: 'style.lyrical_graphic.badge', category: 'ART_TECHNIQUES',
        tagKeys: ['tags.poetry', 'tags.melancholy', 'tags.hatching', 'tags.bw', 'tags.documentary', 'tags.nostalgia', 'tags.soviet', 'tags.artistic'], 
        strictPrompt: `Lyrical graphic illustration style with melancholic poetic atmosphere - Expressive trembling pen lines with variable weight - Active cross-hatching and line texture for volume and material feel - Subdued color palette: shades of gray, sepia, ochre, dirty blue, pale green - Selective detailing: detailed rendering of key elements, secondary elements suggested with minimal strokes - Hand-drawn sketch quality with intentional line imperfections and organic flow`,
        artisticPrompt: `Lyrical graphic artistic interpretation - Transform reference into melancholic poetic illustration - Expressive trembling pen lines with variable weight - Active cross-hatching for texture and volume - Subdued color palette: grays, sepia, ochre, dirty blues - Hand-drawn sketch quality with intentional imperfections - Melancholic, nostalgic, contemplative atmosphere`
    },
    'BOTANICAL_ILLUSTRATION': { 
        nameKey: 'style.botanical_illustration.name', emoji: '🌿', badgeKey: 'style.botanical_illustration.badge', category: 'ART_TECHNIQUES',
        tagKeys: ['tags.science', 'tags.botany', 'tags.detailed', 'tags.educational', 'tags.nature', 'tags.accurate'], 
        strictPrompt: `Scientific botanical illustration style with educational accuracy - Precise plant morphology and anatomical details - Clean line work with subtle color washes - Neutral background with specimen-like presentation - Educational labeling style when needed`,
        artisticPrompt: `Botanical illustration artistic style - Transform reference into scientific botanical illustration - Precise plant morphology and anatomical details - Clean line work with subtle color washes - Specimen-like presentation`
    },
    'CYBERPUNK': { 
        nameKey: 'style.cyberpunk.name', emoji: '🔮', badgeKey: 'style.cyberpunk.badge', category: 'TECHNO_AND_FUTURISM',
        tagKeys: ['tags.futurism', 'tags.technology', 'tags.night', 'tags.neon', 'tags.cyber', 'tags.dark', 'tags.urban'], 
        strictPrompt: `Cyberpunk futuristic aesthetic with tech-inspired visuals - Neon glow effects and vibrant electric colors - Holographic displays and circuit-like patterns - High contrast with dark dystopian cityscapes and bright accents - Metallic surfaces with reflective properties`,
        artisticPrompt: `Cyberpunk artistic reinterpretation - Transform reference into futuristic tech aesthetic - Neon glow effects and electric colors - Holographic displays, circuit-like patterns - Dark dystopian backgrounds with bright neon accents - Metallic reflective surfaces`
    },
    'STEAMPUNK': { 
        nameKey: 'style.steampunk.name', emoji: '⚙️', badgeKey: 'style.steampunk.badge', category: 'TECHNO_AND_FUTURISM',
        tagKeys: ['tags.steampunk', 'tags.victorian', 'tags.mechanisms', 'tags.bronze', 'tags.retro-futurism', 'tags.detailed'], 
        strictPrompt: `Steampunk aesthetic with Victorian machinery - Brass and copper metallic surfaces - Gear mechanisms and mechanical details - Victorian era design with tech elements - Industrial revolution inspired visuals`,
        artisticPrompt: `Steampunk artistic interpretation - Convert reference into Victorian steampunk aesthetic - Brass and copper metallic surfaces - Gear mechanisms and mechanical details - Victorian era design with tech elements`
    },
    'HIGH_TECH': { 
        nameKey: 'style.high_tech.name', emoji: '⚡', badgeKey: 'style.high_tech.badge', category: 'TECHNO_AND_FUTURISM',
        tagKeys: ['tags.high-tech', 'tags.technology', 'tags.future', 'tags.metal', 'tags.glass', 'tags.urban', 'tags.digital', 'tags.engineering', 'tags.futurism'], 
        strictPrompt: `High-tech visual treatment applied to the reference object - Render all surfaces with brushed stainless steel, anodized aluminum, glass, or precision-engineered materials - Apply clean geometric lines, precise technical detailing, and cool blue-white LED accent lighting`,
        artisticPrompt: `High-tech artistic interpretation - Transform reference into futuristic high-tech aesthetic - Brushed stainless steel, anodized aluminum, glass surfaces - Clean geometric lines and technical detailing - Cool blue-white LED accent lighting`
    },
    'NEON_COSMIC_CGI': {
        nameKey: 'style.neon_cosmic_cgi.name', emoji: '🪐', badgeKey: 'style.neon_cosmic_cgi.badge', category: 'TECHNO_AND_FUTURISM',
        tagKeys: ['tags.cosmos', 'tags.neon', 'tags.3d', 'tags.vfx', 'tags.cinematic', 'tags.wet', 'tags.photorealism', 'tags.artistic'],
        strictPrompt: `ULTRA-REALISTIC 3D CGI CINEMATIC TRANSFORMATION - TRANSFORM reference into high-budget 3D CGI visual effects shot - Apply PHYSICALLY-BASED RENDERING (PBR) materials - Cosmic neon fluid paint material with WET SURFACE appearance - Wet paint FLOWS ALONG CONTOURS of objects with REALISTIC PHYSICS - SUBSURFACE SCATTERING enabled for realistic material depth - PAINT DROPLETS and SUSPENDED MIST particles around subject - DRAMATIC RIM LIGHTING: 90% deep cinematic shadows, 10% bright highlights - Colored NEON GLOW emanating from paint with light emission - Pure PITCH-BLACK VOID BACKGROUND - 8K STUDIO-QUALITY render`,
        artisticPrompt: `Cinematic 3D VFX transformation into neon cosmic universe - Reimagine reference as high-budget 3D CGI visual effects shot - Apply ultra-realistic physically-based rendering (PBR) - Create wet cosmic neon paint material flowing along contours - Neon color palette: electric blue, deep pink, vibrant orange, yellow, violet - Add realistic paint physics with droplets and mist particles - Dramatic cinematic rim lighting with intense contrast - Pure black void background for cosmic atmosphere - Professional VFX quality with subsurface scattering`,
        locks: ['materialTexture', 'subsurfaceScattering', 'particleEffects', 'lightingPreset']
    },
    '70S_PSYCHEDELIC': { 
        nameKey: 'style.70s_psychedelic.name', emoji: '🌀', badgeKey: 'style.70s_psychedelic.badge', category: 'ABSTRACTION_AND_PSYCHEDELIA',
        tagKeys: ['tags.psychedelia', 'tags.abstraction', 'tags.colors', 'tags.patterns', 'tags.1970s', 'tags.optical'], 
        strictPrompt: `70s psychedelic art with swirling patterns and vibrant colors - Swirling organic patterns and fractals - Vibrant neon colors with optical illusions - Liquid light effects and color shifting - Tie-dye textures and mandala patterns`,
        artisticPrompt: `70s psychedelic artistic interpretation - Transform reference into swirling psychedelic art - Organic fractal patterns and mandalas - Vibrant neon colors with optical illusions - Liquid light effects and color shifting - Tie-dye textures and trippy visuals`
    },
    'LIQUID': { 
        nameKey: 'style.liquid.name', emoji: '💧', badgeKey: 'style.liquid.badge', category: 'ABSTRACTION_AND_PSYCHEDELIA',
        tagKeys: ['tags.liquid', 'tags.abstraction', 'tags.reflections', 'tags.flowing', 'tags.metal', 'tags.dynamic'], 
        strictPrompt: `Liquid abstract style - Render as if sculpted from iridescent, flowing chrome or mercury - Liquid texture and reflective surfaces with realistic caustics and light refraction applied to ORIGINAL OBJECTS - Color shifts and iridescent effects on EXISTING ELEMENTS - Water surface distortions as visual treatment ONLY`,
        artisticPrompt: `Liquid abstract artistic interpretation - Transform reference into flowing liquid aesthetic - Render as if sculpted from iridescent, flowing chrome or mercury - Liquid textures and reflective surfaces with realistic caustics and light refraction - Color shifts and iridescent effects - Water-like distortions and flowing forms`
    },
    'UFO_PSYCHEDELIC': { 
        nameKey: 'style.ufo_psychedelic.name', emoji: '🛸', badgeKey: 'style.ufo_psychedelic.badge', category: 'ABSTRACTION_AND_PSYCHEDELIA',
        tagKeys: ['tags.ufo', 'tags.cosmos', 'tags.conspiracy', 'tags.psychedelia', 'tags.poster', 'tags.grunge'], 
        strictPrompt: `UFO conspiracy psychedelic art style - Alien abduction poster aesthetics - Government document grain and texture - Cosmic colors with conspiracy themes - Retro-futuristic alien visual language`,
        artisticPrompt: `UFO psychedelic artistic style - Transform reference into conspiracy poster aesthetic - Alien abduction poster style - Government document grain and texture - Cosmic colors with conspiracy themes`
    },
    'PIXEL_ART': { 
        nameKey: 'style.pixel_art.name', emoji: '👾', badgeKey: 'style.pixel_art.badge', category: 'GRAPHICS_AND_DESIGN',
        tagKeys: ['tags.pixel', 'tags.retro', 'tags.games', 'tags.8bit', 'tags.digital', 'tags.squares'], 
        strictPrompt: `Pixel art style with retro video game aesthetic - Clean pixel grid with visible squares - Limited color palette like 8-bit games - Dithered shading and color transitions - Retro gaming visual language`,
        artisticPrompt: `Pixel art artistic style - Convert reference into retro pixel art aesthetic - Clean pixel grid with visible squares - Limited 8-bit color palette - Dithered shading and transitions - Retro gaming visual style`
    },
    'ART_DECO': { 
        nameKey: 'style.art_deco.name', emoji: '🏛️', badgeKey: 'style.art_deco.badge', category: 'ARCHITECTURE_AND_MINIMALISM',
        tagKeys: ['tags.elegant', 'tags.geometry', 'tags.luxury', 'tags.architecture', 'tags.1920s', 'tags.symmetry'], 
        strictPrompt: `Art Deco style with geometric elegance and luxury materials - Strong vertical lines and geometric patterns - Symmetrical designs with rich ornamentation - Luxury materials - gold, marble, ivory - Sunburst motifs and zigzag patterns - Streamlined modern elegance`,
        artisticPrompt: `Art Deco artistic reinterpretation - Convert reference into geometric Art Deco style - Strong vertical lines and symmetrical geometric patterns - Rich ornamentation - Luxury materials: gold, marble, ivory accents - Sunburst motifs and zigzag patterns - Streamlined elegant aesthetic`
    },
    'BRUTALISM': { 
        nameKey: 'style.brutalism.name', emoji: '🏗️', badgeKey: 'style.brutalism.badge', category: 'ARCHITECTURE_AND_MINIMALISM',
        tagKeys: ['tags.architecture', 'tags.minimalism', 'tags.concrete', 'tags.geometry', 'tags.strict', 'tags.urban', 'tags.raw'], 
        strictPrompt: `Brutalist architecture style with raw concrete and geometric forms - Raw concrete texture with rough surfaces - Monolithic geometric forms and sharp angles - Minimal color palette - grays, browns - Exposed structural elements`,
        artisticPrompt: `Brutalist architectural interpretation - Convert reference into raw brutalist aesthetic - Raw concrete textures and rough surfaces - Monolithic geometric forms with sharp angles - Minimal color palette: grays, browns - Exposed structural elements`
    },
    'SCANDINAVIAN': { 
        nameKey: 'style.scandinavian.name', emoji: '🪵', badgeKey: 'style.scandinavian.badge', category: 'ARCHITECTURE_AND_MINIMALISM',
        tagKeys: ['tags.minimalism', 'tags.scandinavian', 'tags.nature', 'tags.cozy', 'tags.simple', 'tags.functional'], 
        strictPrompt: `Scandinavian minimalist design with clean aesthetics - Clean lines and geometric simplicity - Natural color palette with wood tones - Functional forms with negative space - Hygge-inspired warmth and simplicity`,
        artisticPrompt: `Scandinavian minimalist artistic interpretation - Transform reference into clean Scandinavian design - Geometric simplicity and clean lines - Natural color palette with wood tones - Functional forms with negative space`
    },
    'STAINED_GLASS': { 
        nameKey: 'style.stained_glass.name', emoji: '🔮', badgeKey: 'style.stained_glass.badge', category: 'ART_TECHNIQUES',
        tagKeys: ['tags.stained_glass', 'tags.colors', 'tags.glass', 'tags.religion', 'tags.light', 'tags.ornament'], 
        strictPrompt: `Stained glass style with lead lines and vibrant colors - Black lead lines separating color areas - Vibrant translucent colors like glass - Glowing light from behind, simulating light transmission - Biblical or floral motifs`,
        artisticPrompt: `Stained glass artistic interpretation - Transform reference into vibrant stained glass aesthetic - Black lead lines separating color areas - Translucent glass-like colors - Glowing light from behind to simulate light transmission - Ornamental motifs`
    },
};

export const NEGATIVE_PROMPTS: Record<string, string> = {
    BASE: 'text, signature, watermark, username, artist name, blurry, fuzzy, grainy, noisy, jpeg artifacts, compression artifacts, low quality, low-res, messy, chaotic, poorly drawn',
    COLOR_PRESERVATION: 'color change, color shift, hue shift, desaturated, oversaturated, grayscale, monochrome, dull colors',
    STRICT_TRANSFORMATION: 'stylistic changes, simplification, abstraction, artistic interpretation, changing proportions, altering content',
    ISOLATION: 'background, environment, scenery, context, full scene, frame, border, ground, floor, table',
    CONTAINER: 'extending beyond the shape, bleeding edges, uncontained elements, elements outside the border',
    NO_TEXT: 'text, letters, words, writing, signature, watermark, typography, font, captions, labels',
    VIBRANT_DIGITAL_COMIC: "soft blurred edges, pastel or muted colors, realistic shading and 3D depth, complex perspective, minimalist design, thin lines, water effects or transparency, natural textures (stone, wood), cinematic lighting, highly detailed background, halftones and gradients, soft transitions between colors, pale or desaturated shades",
};