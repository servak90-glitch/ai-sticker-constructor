// This is a Vercel Serverless Function
// It will be accessible at `/api/generate-prompt`
// Its code is NOT bundled with the client, ensuring the logic is secure.

import type { VercelRequest, VercelResponse } from '@vercel/node';
import { Settings, PromptData, StyleKey } from './_lib/types';
import { STYLE_LIBRARY, NEGATIVE_PROMPTS } from './_lib/constants';
import { translations } from './_lib/i18n';

// --- All logic from the original usePromptGenerator hook is now here ---

const getQualityDescription = (quality: string) => {
    const descriptions: Record<string, string> = {
        'STANDARD': 'Standard quality - acceptable detail level.',
        'PREMIUM': 'Premium quality - high detail retention, sharp edges.',
        'ULTRA': 'Ultra quality - maximum detail preservation, micro-textures.',
        'MASTER': 'Master quality - 8K studio-grade rendering.'
    };
    return descriptions[quality] || descriptions['PREMIUM'];
};

const generatePromptData = (settings: Settings): PromptData => {
    const { style, interpretationMode, stickerMode, stickerShape, quality, vector, outlineOnly, outlineWeight, customText, textMode } = settings;
    const styleConfig = STYLE_LIBRARY[style as StyleKey];

    if (!styleConfig) {
        // This check is critical. If it fails, the API will crash.
        throw new Error(`Invalid style key "${style}" - not found in STYLE_LIBRARY.`);
    }

    let prompt = "PRIORITY 0: ABSOLUTE DIRECTIVES\n- DO NOT MIRROR, FLIP, OR ROTATE THE INPUT IMAGE.\n- PRESERVE ORIGINAL ORIENTATION AND COMPOSITION.\n- DO NOT ADD, REMOVE, OR CHANGE OBJECTS UNLESS STYLE REQUIRES IT.\n\n";
    prompt += "PRIORITY 1: INTERPRETATION & COLOR POLICY\n";
    let negativePrompt = NEGATIVE_PROMPTS.BASE;

    if (interpretationMode === 'STRICT') {
        prompt += "- MODE: STRICT. This is a full-frame visual transformation. Apply the specified style to EVERY PIXEL of the reference image. No part of the original should remain un-stylized.\n- CONTENT POLICY: Do NOT alter content, objects, or proportions.\n- COLOR POLICY: 100% PRESERVATION. Reproduce original colors, hues, and saturation exactly within the new style's constraints (e.g., flat fills, specific line colors).\n\n";
        negativePrompt += `, ${NEGATIVE_PROMPTS.COLOR_PRESERVATION}, ${NEGATIVE_PROMPTS.STRICT_TRANSFORMATION}`;
    } else { // ARTISTIC
        prompt += "- MODE: ARTISTIC. Creatively interpret the subject in the chosen style. Simplification, stylization, and color transformation are permitted.\n\n";
    }

    prompt += "PRIORITY 2: OUTPUT FORMAT\n";
    if (stickerMode === 'ISOLATION') {
        prompt += `- FORMAT: ISOLATED STICKER.
- TASK: First, identify the primary subject or focal point of the image (e.g., a person, an animal, a central building, a prominent natural feature like a waterfall or a solitary tree).
- ACTION: Isolate this identified subject with high precision. Include minor, physically connected elements (e.g., the ground directly underfoot, a branch the subject is holding).
- OUTPUT: The isolated subject must be on a 100% transparent background.\n\n`;
        negativePrompt += `, ${NEGATIVE_PROMPTS.ISOLATION}`;
    } else { // CONTAINER
        const shapeName = stickerShape.charAt(0) + stickerShape.slice(1).toLowerCase();
        const backgroundInstruction = settings.styleBackground
            ? "The entire scene (subject and stylized background)"
            : "The subject, with the original background unchanged,";
        
        prompt += `- FORMAT: SHAPED CONTAINER STICKER.
- CANVAS: The final output MUST be masked into a perfect ${shapeName}.
- CONTENT: ${backgroundInstruction} must be fully contained within this shape. Nothing should extend beyond its boundaries.
- COMPOSITION: The main subject should be intelligently centered and scaled to fit well within the ${shapeName}.
- BACKGROUND: The area outside the ${shapeName} must be 100% transparent.\n\n`;
        negativePrompt += `, ${NEGATIVE_PROMPTS.CONTAINER}`;
    }
    
    prompt += "PRIORITY 3: CORE STYLE DIRECTIVES\n";
    prompt += interpretationMode === 'STRICT' ? styleConfig.strictPrompt : styleConfig.artisticPrompt;
    prompt += `\n\n`;
    negativePrompt += `, ${NEGATIVE_PROMPTS[style as StyleKey] || ''}`;

    if (settings.outlineOnly !== 'YES') {
        let vfxPrompt = "PRIORITY 4: MATERIAL & VFX DIRECTIVES\n";
        let vfxAdded = false;

        if (!styleConfig.locks?.includes('materialTexture') && settings.materialTexture !== 'STANDARD') {
            const materials: Record<string, string> = {
                'WET': 'Apply a physically-based rendering (PBR) material with a WET surface appearance to all objects.',
                'GLOSSY': 'Apply a HIGHLY GLOSSY PBR material with sharp, clear reflections.',
                'METALLIC': 'Apply a METALLIC PBR material (e.g., chrome, brushed steel) to all surfaces.',
                'GLASS': 'Apply a TRANSPARENT GLASS PBR material with realistic caustics and refraction.'
            };
            vfxPrompt += `- MATERIAL: ${materials[settings.materialTexture]}\n`;
            vfxAdded = true;
        }

        if (!styleConfig.locks?.includes('subsurfaceScattering') && settings.subsurfaceScattering) {
            vfxPrompt += `- SSS: Enable subsurface scattering (SSS) for all relevant materials to simulate light passing through translucent objects.\n`;
            vfxAdded = true;
        }

        if (!styleConfig.locks?.includes('particleEffects') && settings.particleEffects !== 'NONE') {
             const particles: Record<string, string> = {
                'DROPLETS': 'Incorporate realistic liquid DROPLETS and splashes as particle effects.',
                'MIST': 'Add a fine MIST or fog effect to the scene for atmosphere.',
                'SPARKLES': 'Add magical SPARKLES or glowing motes as a particle effect.',
                'GLOW': 'Add a soft ambient GLOW emanating from the subject.'
            };
            vfxPrompt += `- PARTICLES: ${particles[settings.particleEffects]}\n`;
            vfxAdded = true;
        }

        if (!styleConfig.locks?.includes('lightingPreset') && settings.lightingPreset !== 'STANDARD') {
             const lighting: Record<string, string> = {
                'RIM_LIGHT': 'Apply dramatic RIM LIGHTING with high contrast between highlights and deep shadows.',
                'STUDIO': 'Use professional STUDIO LIGHTING with softboxes and multiple light sources.',
                'DRAMATIC': 'Use DRAMATIC, high-contrast lighting with harsh shadows (chiaroscuro).',
                'CINEMATIC': 'Apply CINEMATIC LIGHTING with moody tones, color grading, and anamorphic lens flares.'
            };
            vfxPrompt += `- LIGHTING: ${lighting[settings.lightingPreset]}\n`;
            vfxAdded = true;
        }
         if (!styleConfig.locks?.includes('colorVibrance')) {
            vfxPrompt += `- COLOR GRADE: Adjust final image color vibrance to ${settings.colorVibrance}%.\n`;
            vfxAdded = true;
        }

        if (vfxAdded) {
            prompt += vfxPrompt + '\n';
        }
    }


    prompt += "PRIORITY 5: VISUAL REFINEMENTS\n";
    prompt += `- QUALITY: ${getQualityDescription(quality)}\n`;
    if (vector === 'YES') prompt += "- RENDER: Clean vector style with precise, scalable lines.\n";
    
    if (outlineOnly === 'YES') {
        prompt += `- VISUAL STYLE: Outlines ONLY with ${outlineWeight.toLowerCase()} weight. NO color fills, NO gradients, NO textures.\n`;
    } else {
         prompt += `- LINE WEIGHT: ${outlineWeight.toLowerCase()} outlines.\n`;
    }
    
    if (settings.cinematicAspect !== 'STANDARD') {
        const aspects: Record<string, string> = {
            'VERTICAL_9_16': '9:16 vertical aspect ratio.',
            'CINEMASCOPE': '2.35:1 cinemascope aspect ratio.'
        };
        prompt += `- ASPECT RATIO: The final image must have a ${aspects[settings.cinematicAspect]}\n`;
    }

    if (settings.cameraLock) prompt += "- CAMERA: The camera angle, perspective, and zoom are LOCKED to the original.\n";
    if (settings.detailLock) prompt += "- DETAILS: All original details, accessories, and textures are LOCKED.\n";
    if (settings.poseLock) prompt += "- POSE: The subject's pose, gestures, and facial expression are LOCKED.\n";
    if (settings.backgroundLock && settings.stickerMode === 'CONTAINER') {
        prompt += "- BACKGROUND: The background composition, objects, and colors are LOCKED to the original. If background styling is active, render this locked background in the target style.\n";
    }

    if (textMode === 'CUSTOM_TEXT' && customText) {
        prompt += "\nPRIORITY 6: TEXT INTEGRATION (NON-NEGOTIABLE)\n";
        prompt += `- TEXT CONTENT: Exactly "${customText}".\n`;
        prompt += `- TEXT COLOR: Must be ${settings.textColor}.\n`;
        prompt += `- TEXT SHAPE: Must be ${settings.textShape}.\n`;
        prompt += `- TEXT SIZE: Must be ${settings.textSize}.\n`;
        prompt += `- TEXT POSITION: Must be ${settings.textPosition}.\n`;
    } else {
        negativePrompt += `, ${NEGATIVE_PROMPTS.NO_TEXT}`;
        if (customText) {
             negativePrompt += `, "${customText}"`;
        }
    }

    const finalPromptData: PromptData = {
        prompt: prompt.trim().replace(/\n\n+/g, '\n\n'),
        negative_prompt: negativePrompt.split(',').map(s => s.trim()).filter(Boolean).join(', '),
        settings: { ...settings },
        metadata: {
            generator: "Sticker Prompt Constructor v10.0",
            timestamp: new Date().toISOString(),
            style: translations[styleConfig.nameKey]?.en || style,
            interpretation_mode: interpretationMode,
            priority_system_active: true,
        },
    };

    return finalPromptData;
};


// --- Vercel Serverless Function Handler ---

export default function handler(
  req: VercelRequest,
  res: VercelResponse,
) {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Only POST requests allowed' });
    }

    try {
        console.log('Received request to /api/generate-prompt');
        const settings: Settings = req.body;
        
        console.log('Request body (settings):', JSON.stringify(settings, null, 2));

        if (!settings || !settings.style) {
            console.error('Validation failed: Missing settings or style property.');
            return res.status(400).json({ message: 'Invalid settings provided: style is required.' });
        }
        
        console.log(`Attempting to generate prompt for style: "${settings.style}"`);

        const promptData = generatePromptData(settings);
        
        console.log('Successfully generated prompt data. Sending response.');
        res.status(200).json(promptData);

    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
        const errorStack = error instanceof Error ? error.stack : 'No stack trace available';
        
        console.error("CRITICAL ERROR in generate-prompt API:", {
            message: errorMessage,
            stack: errorStack,
            requestBody: req.body 
        });
        
        res.status(500).json({ 
            message: 'Internal Server Error', 
            error: `Failed to generate prompt. Server detail: ${errorMessage}` 
        });
    }
}