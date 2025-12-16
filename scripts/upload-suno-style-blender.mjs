#!/usr/bin/env node

/**
 * Script to upload Suno Style Blender tool to Appwrite
 * Run: node scripts/upload-suno-style-blender.mjs
 */

import { Client, Databases, ID, Query } from 'node-appwrite';
import dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

const client = new Client()
    .setEndpoint(process.env.APPWRITE_ENDPOINT)
    .setProject(process.env.APPWRITE_PROJECT_ID)
    .setKey(process.env.APPWRITE_API_KEY);

const databases = new Databases(client);
const DATABASE_ID = process.env.APPWRITE_DATABASE_ID;
const COLLECTION_ID = 'tools';

const TOOL = {
    platform: 'suno',
    slug: 'style-blender',
    names: {
        en: 'Style Blender',
        es: 'Mezclador de Estilos',
        pt: 'Misturador de Estilos',
        fr: 'Mélangeur de Styles',
        de: 'Stilmixer',
        it: 'Mixer di Stili'
    },
    descriptions: {
        en: 'Blend 2 or more music genres into a unique hybrid style that even Spotify algorithms couldn\'t predict. Perfect for creating prompts that make Suno go "wait, that actually works?"',
        es: 'Mezcla 2 o más géneros musicales en un estilo híbrido único que ni los algoritmos de Spotify podrían predecir. Perfecto para crear prompts que hacen que Suno diga "espera, ¿eso funciona?"',
        pt: 'Misture 2 ou mais gêneros musicais em um estilo híbrido único que nem os algoritmos do Spotify poderiam prever. Perfeito para criar prompts que fazem o Suno dizer "espera, isso funciona?"',
        fr: 'Mélangez 2 genres musicaux ou plus dans un style hybride unique que même les algorithmes de Spotify ne pourraient pas prédire. Parfait pour créer des prompts qui font dire à Suno "attends, ça marche vraiment?"',
        de: 'Mische 2 oder mehr Musikgenres zu einem einzigartigen Hybridstil, den selbst Spotify-Algorithmen nicht vorhersagen könnten. Perfekt für Prompts, die Suno sagen lassen "Moment, das funktioniert?"',
        it: 'Mescola 2 o più generi musicali in uno stile ibrido unico che nemmeno gli algoritmi di Spotify potrebbero prevedere. Perfetto per creare prompt che fanno dire a Suno "aspetta, funziona davvero?"'
    },
    inputs: [
        {
            id: 'genre1',
            label: 'First Genre',
            labelEs: 'Primer Género',
            labelPt: 'Primeiro Gênero',
            labelFr: 'Premier Genre',
            labelDe: 'Erstes Genre',
            labelIt: 'Primo Genere',
            type: 'select',
            options: 'Pop,Rock,Hip-Hop,R&B,Electronic,Jazz,Classical,Country,Reggae,Metal,Folk,Punk,Blues,Soul,Funk,Disco,House,Techno,Trap,Lo-fi,Indie,Alternative,Latin,K-Pop,Afrobeats'
        },
        {
            id: 'genre2',
            label: 'Second Genre',
            labelEs: 'Segundo Género',
            labelPt: 'Segundo Gênero',
            labelFr: 'Deuxième Genre',
            labelDe: 'Zweites Genre',
            labelIt: 'Secondo Genere',
            type: 'select',
            options: 'Pop,Rock,Hip-Hop,R&B,Electronic,Jazz,Classical,Country,Reggae,Metal,Folk,Punk,Blues,Soul,Funk,Disco,House,Techno,Trap,Lo-fi,Indie,Alternative,Latin,K-Pop,Afrobeats'
        },
        {
            id: 'genre3',
            label: 'Third Genre (Optional)',
            labelEs: 'Tercer Género (Opcional)',
            labelPt: 'Terceiro Gênero (Opcional)',
            labelFr: 'Troisième Genre (Optionnel)',
            labelDe: 'Drittes Genre (Optional)',
            labelIt: 'Terzo Genere (Opzionale)',
            type: 'select',
            options: 'None,Pop,Rock,Hip-Hop,R&B,Electronic,Jazz,Classical,Country,Reggae,Metal,Folk,Punk,Blues,Soul,Funk,Disco,House,Techno,Trap,Lo-fi,Indie,Alternative,Latin,K-Pop,Afrobeats',
            required: false
        },
        {
            id: 'mood',
            label: 'Target Mood',
            labelEs: 'Estado de Ánimo Objetivo',
            labelPt: 'Humor Alvo',
            labelFr: 'Ambiance Cible',
            labelDe: 'Zielstimmung',
            labelIt: 'Umore Target',
            type: 'select',
            options: 'Energetic,Chill,Dark,Uplifting,Melancholic,Aggressive,Dreamy,Nostalgic,Romantic,Mysterious,Euphoric,Introspective'
        },
        {
            id: 'era',
            label: 'Musical Era',
            labelEs: 'Era Musical',
            labelPt: 'Era Musical',
            labelFr: 'Ère Musicale',
            labelDe: 'Musik-Ära',
            labelIt: 'Era Musicale',
            type: 'select',
            options: 'Modern (2020s),2010s,2000s,90s,80s,70s,60s,Timeless/No Era'
        },
        {
            id: 'language',
            label: 'Output Language',
            labelEs: 'Idioma de Salida',
            labelPt: 'Idioma de Saída',
            labelFr: 'Langue de Sortie',
            labelDe: 'Ausgabesprache',
            labelIt: 'Lingua di Output',
            type: 'language'
        }
    ],
    prompt_template: `You are an expert music producer and genre specialist. Your task is to blend multiple music genres into a cohesive, unique hybrid style description for Suno AI.

INPUT:
- Genre 1: {genre1}
- Genre 2: {genre2}
- Genre 3 (if provided): {genre3}
- Target Mood: {mood}
- Musical Era: {era}
- Output Language: {language}

Generate a detailed Suno-ready style blend that includes:

1. **FUSION NAME**: A creative name for this hybrid genre (e.g., "Trap-Jazz Noir", "Electro-Folk Revival")

2. **SUNO PROMPT** (copy-paste ready):
   Write a 30-50 word prompt for Suno that captures the essence of this blend. Include:
   - The dominant genre characteristics
   - Key instrumental elements from each genre
   - Production style (vintage, modern, lo-fi, polished)
   - Tempo/energy descriptor
   - The mood adjectives

3. **STYLE BREAKDOWN**:
   - What percentage/influence each genre contributes
   - Which elements to take from each genre (instruments, rhythms, vocal styles, production techniques)

4. **REFERENCE ARTISTS** (if this blend existed):
   - 2-3 real artists whose style is closest to this blend

5. **WHAT MAKES IT WORK**:
   - Why these genres complement each other
   - The unexpected element that makes it unique

Format the output cleanly with clear sections. Make it practical and immediately usable in Suno.

IMPORTANT: Write in {language}. Be creative but practical - the blend should actually sound good!`
};

async function uploadTool() {
    console.log('\\n🎵 Uploading Suno Style Blender tool...\\n');
    
    const languages = ['en', 'es', 'pt', 'fr', 'de', 'it'];
    let created = 0;
    
    for (const lang of languages) {
        // Check if already exists
        const existing = await databases.listDocuments(DATABASE_ID, COLLECTION_ID, [
            Query.equal('platform', TOOL.platform),
            Query.equal('slug', TOOL.slug),
            Query.equal('language', lang)
        ]);
        
        if (existing.total > 0) {
            console.log(`⚠️  ${lang.toUpperCase()}: Already exists, skipping`);
            continue;
        }
        
        // Create localized inputs
        const localizedInputs = TOOL.inputs.map(input => {
            const labelKey = `label${lang.charAt(0).toUpperCase() + lang.slice(1)}`;
            return {
                id: input.id,
                label: input[labelKey] || input.label,
                type: input.type,
                options: input.options,
                required: input.required !== false
            };
        });
        
        const doc = {
            name: TOOL.names[lang],
            description: TOOL.descriptions[lang],
            platform: TOOL.platform,
            slug: TOOL.slug,
            language: lang,
            status: 'approved',
            author_name: 'KiviTools',
            author_id: 'system',
            inputs: JSON.stringify(localizedInputs),
            prompt_template: TOOL.prompt_template
        };
        
        await databases.createDocument(DATABASE_ID, COLLECTION_ID, ID.unique(), doc);
        console.log(`✅ ${lang.toUpperCase()}: Created ${TOOL.names[lang]}`);
        created++;
    }
    
    console.log(`\\n🎉 Done! Created ${created} documents for style-blender`);
}

uploadTool().catch(console.error);
