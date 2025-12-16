#!/usr/bin/env node

/**
 * Script to upload Suno Song Structure Generator tool to Appwrite
 * Run: node scripts/upload-suno-song-structure.mjs
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
    slug: 'song-structure',
    names: {
        en: 'Song Structure Generator',
        es: 'Generador de Estructura',
        pt: 'Gerador de Estrutura',
        fr: 'Générateur de Structure',
        de: 'Songstruktur-Generator',
        it: 'Generatore di Struttura'
    },
    descriptions: {
        en: 'Generate professional song structures with verse, chorus, bridge, and more. Stop guessing where the drop should go - let AI architect your next hit.',
        es: 'Genera estructuras de canciones profesionales con verso, estribillo, puente y más. Deja de adivinar dónde va el drop - deja que la IA arquitecte tu próximo hit.',
        pt: 'Gere estruturas de músicas profissionais com verso, refrão, ponte e mais. Pare de adivinhar onde o drop deve ir - deixe a IA arquitetar seu próximo hit.',
        fr: 'Générez des structures de chansons professionnelles avec couplet, refrain, pont et plus. Arrêtez de deviner où le drop doit aller - laissez l\'IA architecturer votre prochain hit.',
        de: 'Generiere professionelle Songstrukturen mit Strophe, Refrain, Bridge und mehr. Hör auf zu raten, wo der Drop hingehört - lass KI deinen nächsten Hit architektonieren.',
        it: 'Genera strutture di canzoni professionali con strofa, ritornello, ponte e altro. Smetti di indovinare dove deve andare il drop - lascia che l\'IA progetti il tuo prossimo hit.'
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
            options: 'Pop,Hip-Hop/Rap,R&B,EDM/Electronic,Rock,Indie,Country,Latin/Reggaeton,K-Pop,House,Trap,Lo-fi,Ballad,Punk,Metal'
        },
        {
            id: 'duration',
            label: 'Target Duration',
            labelEs: 'Duración Objetivo',
            labelPt: 'Duração Alvo',
            labelFr: 'Durée Cible',
            labelDe: 'Zieldauer',
            labelIt: 'Durata Target',
            type: 'select',
            options: 'Short (1:30-2:00) - TikTok/Shorts,Standard (2:30-3:30) - Radio,Extended (4:00-5:00) - Album,Long (5:00+) - EDM/Live'
        },
        {
            id: 'structureType',
            label: 'Structure Style',
            labelEs: 'Estilo de Estructura',
            labelPt: 'Estilo de Estrutura',
            labelFr: 'Style de Structure',
            labelDe: 'Strukturstil',
            labelIt: 'Stile di Struttura',
            type: 'select',
            options: 'Classic (Verse-Chorus-Verse),Modern Pop (Hook-first),Hip-Hop (Verse-heavy),EDM (Build-Drop),Ballad (Story arc),Experimental (Unconventional)'
        },
        {
            id: 'complexity',
            label: 'Complexity Level',
            labelEs: 'Nivel de Complejidad',
            labelPt: 'Nível de Complexidade',
            labelFr: 'Niveau de Complexité',
            labelDe: 'Komplexitätsgrad',
            labelIt: 'Livello di Complessità',
            type: 'select',
            options: 'Simple (3-4 sections),Medium (5-6 sections),Complex (7+ sections with variations)'
        },
        {
            id: 'specialElements',
            label: 'Special Elements (Optional)',
            labelEs: 'Elementos Especiales (Opcional)',
            labelPt: 'Elementos Especiais (Opcional)',
            labelFr: 'Éléments Spéciaux (Optionnel)',
            labelDe: 'Spezialelemente (Optional)',
            labelIt: 'Elementi Speciali (Opzionale)',
            type: 'text',
            placeholder: 'Key change, breakdown, outro solo, spoken word intro...',
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
    prompt_template: `You are a professional music producer and songwriter who has structured hundreds of hit songs. Create a detailed song structure blueprint for Suno AI.

INPUT:
- Genre: {genre}
- Target Duration: {duration}
- Structure Style: {structureType}
- Complexity: {complexity}
- Special Elements: {specialElements}
- Output Language: {language}

Generate a complete song structure with:

## SONG BLUEPRINT

**Total Duration:** [Estimated time]
**Key Signature:** [Suggested key for this genre]
**Tempo:** [BPM range]

---

### VISUAL TIMELINE
[Create a simple ASCII timeline showing the song flow]
Example: |Intro|--V1--|--PC--|==CHORUS==|--V2--|==CHORUS==|--BRIDGE--|==FINAL CHORUS==|Outro|

---

### DETAILED BREAKDOWN

For each section, provide:

**[SECTION NAME]** (Duration: XX seconds)
- Purpose: What this section achieves emotionally/musically
- Energy Level: 1-10
- Instrumentation: What should be present
- Vocal approach: Singing style, if any
- Suno prompt snippet for this section

---

### SECTION-BY-SECTION:

**1. INTRO** (0:00-0:XX)
[Details]

**2. VERSE 1** (0:XX-X:XX)
[Details]

[Continue for all sections...]

---

### TRANSITION GUIDE
How each section flows into the next:
- Intro → Verse 1: [Description]
- Verse 1 → Pre-Chorus: [Description]
[etc.]

---

### SUNO GENERATION TIPS
- Best way to prompt this structure in Suno
- Section markers to use: [Intro], [Verse], [Chorus], [Bridge], [Outro]
- How to maintain consistency across regenerations

---

### FULL SUNO PROMPT (Copy-Paste Ready)
A complete prompt that captures this entire structure for Suno, including genre, tempo, key sections, and special elements.

Write everything in {language}. Make the structure practical and genre-appropriate.`
};

async function uploadTool() {
    console.log('\\n🎵 Uploading Suno Song Structure Generator tool...\\n');
    
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
    
    console.log(`\\n🎉 Done! Created ${created} documents for song-structure`);
}

uploadTool().catch(console.error);
