#!/usr/bin/env node

/**
 * Script to upload Suno Hook Generator tool to Appwrite
 * Run: node scripts/upload-suno-hook-generator.mjs
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
    slug: 'hook-generator',
    names: {
        en: 'Hook Generator',
        es: 'Generador de Hooks',
        pt: 'Gerador de Hooks',
        fr: 'Générateur de Hooks',
        de: 'Hook-Generator',
        it: 'Generatore di Hook'
    },
    descriptions: {
        en: 'Create catchy hooks that get stuck in people\'s heads for weeks. The kind that makes listeners replay the song 47 times before they even know the artist\'s name.',
        es: 'Crea hooks pegadizos que se quedan en la cabeza de la gente por semanas. El tipo que hace que los oyentes reproduzcan la canción 47 veces antes de saber el nombre del artista.',
        pt: 'Crie hooks cativantes que ficam na cabeça das pessoas por semanas. O tipo que faz os ouvintes reproduzirem a música 47 vezes antes de saberem o nome do artista.',
        fr: 'Créez des hooks accrocheurs qui restent dans la tête des gens pendant des semaines. Le genre qui fait rejouer la chanson 47 fois avant même de connaître le nom de l\'artiste.',
        de: 'Erstelle eingängige Hooks, die wochenlang im Kopf bleiben. Die Art, die Hörer dazu bringt, den Song 47 Mal abzuspielen, bevor sie den Künstlernamen kennen.',
        it: 'Crea hook orecchiabili che restano in testa alle persone per settimane. Il tipo che fa riascoltare la canzone 47 volte prima ancora di conoscere il nome dell\'artista.'
    },
    inputs: [
        {
            id: 'genre',
            label: 'Music Genre',
            labelEs: 'Género Musical',
            labelPt: 'Gênero Musical',
            labelFr: 'Genre Musical',
            labelDe: 'Musikgenre',
            labelIt: 'Genere Musicale',
            type: 'select',
            options: 'Pop,Hip-Hop,R&B,Electronic/EDM,Rock,Indie,Latin/Reggaeton,Country,K-Pop,Afrobeats,House,Trap,Lo-fi,Jazz,Soul,Funk'
        },
        {
            id: 'hookType',
            label: 'Hook Type',
            labelEs: 'Tipo de Hook',
            labelPt: 'Tipo de Hook',
            labelFr: 'Type de Hook',
            labelDe: 'Hook-Typ',
            labelIt: 'Tipo di Hook',
            type: 'select',
            options: 'Melodic (singable melody),Lyrical (catchy phrase),Instrumental (riff/loop),Vocal chant (oh-oh/na-na),Drop hook (build-up),Whistle/Hum hook'
        },
        {
            id: 'theme',
            label: 'Song Theme',
            labelEs: 'Tema de la Canción',
            labelPt: 'Tema da Música',
            labelFr: 'Thème de la Chanson',
            labelDe: 'Song-Thema',
            labelIt: 'Tema della Canzone',
            type: 'text',
            placeholder: 'Love, party, heartbreak, motivation, summer vibes...'
        },
        {
            id: 'energy',
            label: 'Energy Level',
            labelEs: 'Nivel de Energía',
            labelPt: 'Nível de Energia',
            labelFr: 'Niveau d\'Énergie',
            labelDe: 'Energielevel',
            labelIt: 'Livello di Energia',
            type: 'select',
            options: 'High (explosive/hype),Medium-High (upbeat),Medium (balanced),Low-Medium (smooth),Low (intimate/soft)'
        },
        {
            id: 'reference',
            label: 'Reference Artist/Song (Optional)',
            labelEs: 'Artista/Canción de Referencia (Opcional)',
            labelPt: 'Artista/Música de Referência (Opcional)',
            labelFr: 'Artiste/Chanson de Référence (Optionnel)',
            labelDe: 'Referenzkünstler/Song (Optional)',
            labelIt: 'Artista/Canzone di Riferimento (Opzionale)',
            type: 'text',
            placeholder: 'e.g., "like Dua Lipa - Levitating" or "Daft Punk vibes"',
            required: false
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
    prompt_template: `You are a legendary hit songwriter and music producer known for creating unforgettable hooks. Your job is to generate hook concepts for Suno AI that will make songs instantly memorable.

INPUT:
- Genre: {genre}
- Hook Type: {hookType}
- Song Theme: {theme}
- Energy Level: {energy}
- Reference (if any): {reference}
- Output Language: {language}

Generate 3 DIFFERENT hook concepts. For each hook, provide:

## HOOK #1: [Creative Name]

**THE HOOK (Write it out):**
- If melodic: Write the melody with syllables/sounds (la-la-la, ooh-ooh, da-da-dum)
- If lyrical: Write the catchy phrase/line (max 8-12 words)
- If instrumental: Describe the riff pattern and instrument
- If vocal chant: Write the chant pattern

**SUNO PROMPT:**
A 25-40 word prompt describing exactly how this hook should sound, including:
- The vocal delivery style
- The melodic pattern (rising, falling, repetitive)
- The rhythm feel
- Production elements that support the hook

**WHAT MAKES IT CATCHY:**
- Why this hook works psychologically
- The earworm element

**WHERE IT FITS:**
- Chorus hook / Pre-chorus build / Post-chorus payoff / Intro hook

---

## HOOK #2: [Creative Name]
[Same format]

---

## HOOK #3: [Creative Name]
[Same format]

---

## BONUS: HOOK COMBINATION
How to use multiple hooks together in one song for maximum catchiness.

RULES:
1. Make hooks SIMPLE and MEMORABLE - complexity kills catchiness
2. Think repetition - great hooks repeat or have repeatable elements
3. Consider the "singalong factor" - can a crowd chant this?
4. Write in {language}
5. Be specific enough for Suno to understand

Reference iconic hooks mentally: "Bad Guy" bass line, "Blinding Lights" synth, "Old Town Road" lyrics, "Uptown Funk" rhythm. Aim for that level of memorability.`
};

async function uploadTool() {
    console.log('\\n🎵 Uploading Suno Hook Generator tool...\\n');

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
                placeholder: input.placeholder,
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

    console.log(`\\n🎉 Done! Created ${created} documents for hook-generator`);
}

uploadTool().catch(console.error);
