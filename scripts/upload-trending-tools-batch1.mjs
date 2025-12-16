#!/usr/bin/env node

/**
 * Batch 1: AI Writing Tools (High Search Volume)
 * - AI Text Humanizer (50k+ searches/month)
 * - AI Detector Bypasser
 * - Paraphrasing Tool
 * 
 * Run: node scripts/upload-trending-tools-batch1.mjs
 */

import { Client, Databases, ID, Query } from "node-appwrite";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.join(__dirname, "..", ".env.local") });

const client = new Client()
    .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT)
    .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID)
    .setKey(process.env.APPWRITE_API_KEY);

const databases = new Databases(client);

const DATABASE_ID = process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID;
const TOOLS_COLLECTION_ID = "tools";

const LANGUAGES = ["en", "es", "pt", "fr", "de", "it"];

// Batch 1: AI Writing Tools - Alta demanda
const TRENDING_TOOLS = [
    {
        platform: "ai-writing",
        slug: "text-humanizer",
        names: {
            en: "AI Text Humanizer",
            es: "Humanizador de Texto IA",
            pt: "Humanizador de Texto IA",
            fr: "Humanisateur de Texte IA",
            de: "KI-Text-Humanisierer",
            it: "Umanizzatore di Testo IA"
        },
        descriptions: {
            en: "Transform robotic AI-generated text into natural, human-like writing that bypasses AI detectors. Make your content sound authentic and engaging.",
            es: "Transforma texto robótico generado por IA en escritura natural y humana que evita los detectores de IA. Haz que tu contenido suene auténtico.",
            pt: "Transforme textos robóticos gerados por IA em escrita natural e humana que passa pelos detectores de IA. Deixe seu conteúdo autêntico.",
            fr: "Transformez le texte robotique généré par l'IA en écriture naturelle et humaine qui contourne les détecteurs d'IA.",
            de: "Verwandeln Sie roboterhaften KI-generierten Text in natürliche, menschliche Schreibweise, die KI-Detektoren umgeht.",
            it: "Trasforma il testo robotico generato dall'IA in scrittura naturale e umana che bypassa i rilevatori di IA."
        },
        inputs: {
            en: [
                { id: "text", label: "AI-Generated Text", type: "textarea", placeholder: "Paste your AI-generated text here...", required: true },
                { id: "tone", label: "Desired Tone", type: "select", options: "Casual,Professional,Academic,Creative,Conversational", required: true },
                { id: "intensity", label: "Humanization Level", type: "select", options: "Light,Medium,Strong", required: false }
            ],
            es: [
                { id: "text", label: "Texto Generado por IA", type: "textarea", placeholder: "Pega aquí tu texto generado por IA...", required: true },
                { id: "tone", label: "Tono Deseado", type: "select", options: "Casual,Profesional,Académico,Creativo,Conversacional", required: true },
                { id: "intensity", label: "Nivel de Humanización", type: "select", options: "Ligero,Medio,Fuerte", required: false }
            ],
            pt: [
                { id: "text", label: "Texto Gerado por IA", type: "textarea", placeholder: "Cole aqui seu texto gerado por IA...", required: true },
                { id: "tone", label: "Tom Desejado", type: "select", options: "Casual,Profissional,Acadêmico,Criativo,Conversacional", required: true },
                { id: "intensity", label: "Nível de Humanização", type: "select", options: "Leve,Médio,Forte", required: false }
            ],
            fr: [
                { id: "text", label: "Texte Généré par IA", type: "textarea", placeholder: "Collez votre texte généré par IA ici...", required: true },
                { id: "tone", label: "Ton Souhaité", type: "select", options: "Décontracté,Professionnel,Académique,Créatif,Conversationnel", required: true },
                { id: "intensity", label: "Niveau d'Humanisation", type: "select", options: "Léger,Moyen,Fort", required: false }
            ],
            de: [
                { id: "text", label: "KI-Generierter Text", type: "textarea", placeholder: "Fügen Sie Ihren KI-generierten Text hier ein...", required: true },
                { id: "tone", label: "Gewünschter Ton", type: "select", options: "Lässig,Professionell,Akademisch,Kreativ,Gesprächig", required: true },
                { id: "intensity", label: "Humanisierungsstufe", type: "select", options: "Leicht,Mittel,Stark", required: false }
            ],
            it: [
                { id: "text", label: "Testo Generato da IA", type: "textarea", placeholder: "Incolla qui il tuo testo generato dall'IA...", required: true },
                { id: "tone", label: "Tono Desiderato", type: "select", options: "Casual,Professionale,Accademico,Creativo,Conversazionale", required: true },
                { id: "intensity", label: "Livello di Umanizzazione", type: "select", options: "Leggero,Medio,Forte", required: false }
            ]
        },
        prompt_template: `You are an expert text humanizer. Your task is to transform AI-generated text into natural, human-like writing.

INPUT TEXT:
{text}

DESIRED TONE: {tone}
HUMANIZATION LEVEL: {intensity}

INSTRUCTIONS:
1. Rewrite the text to sound naturally human-written
2. Add subtle imperfections humans make (varied sentence lengths, occasional informal phrases)
3. Replace generic AI phrases with more personal expressions
4. Maintain the original meaning and key information
5. Match the requested tone throughout
6. For "Strong" intensity: Add more personality, idioms, and natural flow
7. For "Light" intensity: Keep closer to original but smoother

OUTPUT the humanized text directly, without explanations or markers.`
    },
    {
        platform: "ai-writing",
        slug: "paraphrasing-tool",
        names: {
            en: "AI Paraphrasing Tool",
            es: "Herramienta de Parafraseo IA",
            pt: "Ferramenta de Paráfrase IA",
            fr: "Outil de Paraphrase IA",
            de: "KI-Paraphrasierungs-Tool",
            it: "Strumento di Parafrasi IA"
        },
        descriptions: {
            en: "Rewrite any text in different words while keeping the original meaning. Perfect for avoiding plagiarism and refreshing content.",
            es: "Reescribe cualquier texto con diferentes palabras manteniendo el significado original. Perfecto para evitar plagio y refrescar contenido.",
            pt: "Reescreva qualquer texto com palavras diferentes mantendo o significado original. Perfeito para evitar plágio.",
            fr: "Réécrivez n'importe quel texte avec des mots différents tout en gardant le sens original. Parfait pour éviter le plagiat.",
            de: "Schreiben Sie jeden Text mit anderen Worten um und behalten Sie die ursprüngliche Bedeutung bei. Perfekt zur Plagiatvermeidung.",
            it: "Riscrivi qualsiasi testo con parole diverse mantenendo il significato originale. Perfetto per evitare il plagio."
        },
        inputs: {
            en: [
                { id: "text", label: "Text to Paraphrase", type: "textarea", placeholder: "Enter the text you want to paraphrase...", required: true },
                { id: "style", label: "Paraphrasing Style", type: "select", options: "Standard,Fluent,Creative,Formal,Simple", required: true }
            ],
            es: [
                { id: "text", label: "Texto a Parafrasear", type: "textarea", placeholder: "Ingresa el texto que quieres parafrasear...", required: true },
                { id: "style", label: "Estilo de Parafraseo", type: "select", options: "Estándar,Fluido,Creativo,Formal,Simple", required: true }
            ],
            pt: [
                { id: "text", label: "Texto para Parafrasear", type: "textarea", placeholder: "Digite o texto que deseja parafrasear...", required: true },
                { id: "style", label: "Estilo de Paráfrase", type: "select", options: "Padrão,Fluente,Criativo,Formal,Simples", required: true }
            ],
            fr: [
                { id: "text", label: "Texte à Paraphraser", type: "textarea", placeholder: "Entrez le texte à paraphraser...", required: true },
                { id: "style", label: "Style de Paraphrase", type: "select", options: "Standard,Fluide,Créatif,Formel,Simple", required: true }
            ],
            de: [
                { id: "text", label: "Text zum Paraphrasieren", type: "textarea", placeholder: "Geben Sie den Text zum Paraphrasieren ein...", required: true },
                { id: "style", label: "Paraphrasierungsstil", type: "select", options: "Standard,Fließend,Kreativ,Formell,Einfach", required: true }
            ],
            it: [
                { id: "text", label: "Testo da Parafrasare", type: "textarea", placeholder: "Inserisci il testo da parafrasare...", required: true },
                { id: "style", label: "Stile di Parafrasi", type: "select", options: "Standard,Fluente,Creativo,Formale,Semplice", required: true }
            ]
        },
        prompt_template: `You are an expert paraphrasing assistant. Rewrite the following text using different words and sentence structures while preserving the original meaning.

ORIGINAL TEXT:
{text}

PARAPHRASING STYLE: {style}

STYLE GUIDELINES:
- Standard: Balance between originality and clarity
- Fluent: Focus on smooth, natural flow
- Creative: Use unique expressions and metaphors
- Formal: Professional, academic language
- Simple: Easy to understand, shorter sentences

OUTPUT the paraphrased text directly without any explanations.`
    },
    {
        platform: "ai-writing",
        slug: "essay-generator",
        names: {
            en: "Essay Generator",
            es: "Generador de Ensayos",
            pt: "Gerador de Redações",
            fr: "Générateur de Dissertations",
            de: "Aufsatz-Generator",
            it: "Generatore di Saggi"
        },
        descriptions: {
            en: "Generate well-structured essays on any topic with introduction, body paragraphs, and conclusion. Perfect for students and writers.",
            es: "Genera ensayos bien estructurados sobre cualquier tema con introducción, desarrollo y conclusión. Perfecto para estudiantes.",
            pt: "Gere redações bem estruturadas sobre qualquer tema com introdução, desenvolvimento e conclusão. Perfeito para estudantes.",
            fr: "Générez des dissertations bien structurées sur n'importe quel sujet avec introduction, développement et conclusion.",
            de: "Generieren Sie gut strukturierte Aufsätze zu jedem Thema mit Einleitung, Hauptteil und Schluss.",
            it: "Genera saggi ben strutturati su qualsiasi argomento con introduzione, sviluppo e conclusione."
        },
        inputs: {
            en: [
                { id: "topic", label: "Essay Topic", type: "text", placeholder: "Enter your essay topic...", required: true },
                { id: "type", label: "Essay Type", type: "select", options: "Argumentative,Expository,Narrative,Descriptive,Persuasive,Compare and Contrast", required: true },
                { id: "length", label: "Word Count", type: "select", options: "300 words,500 words,750 words,1000 words,1500 words", required: true },
                { id: "level", label: "Academic Level", type: "select", options: "High School,College,Graduate,Professional", required: false }
            ],
            es: [
                { id: "topic", label: "Tema del Ensayo", type: "text", placeholder: "Ingresa el tema de tu ensayo...", required: true },
                { id: "type", label: "Tipo de Ensayo", type: "select", options: "Argumentativo,Expositivo,Narrativo,Descriptivo,Persuasivo,Comparativo", required: true },
                { id: "length", label: "Extensión", type: "select", options: "300 palabras,500 palabras,750 palabras,1000 palabras,1500 palabras", required: true },
                { id: "level", label: "Nivel Académico", type: "select", options: "Secundaria,Universidad,Posgrado,Profesional", required: false }
            ],
            pt: [
                { id: "topic", label: "Tema da Redação", type: "text", placeholder: "Digite o tema da sua redação...", required: true },
                { id: "type", label: "Tipo de Redação", type: "select", options: "Argumentativo,Expositivo,Narrativo,Descritivo,Persuasivo,Comparativo", required: true },
                { id: "length", label: "Extensão", type: "select", options: "300 palavras,500 palavras,750 palavras,1000 palavras,1500 palavras", required: true },
                { id: "level", label: "Nível Acadêmico", type: "select", options: "Ensino Médio,Faculdade,Pós-graduação,Profissional", required: false }
            ],
            fr: [
                { id: "topic", label: "Sujet de Dissertation", type: "text", placeholder: "Entrez le sujet de votre dissertation...", required: true },
                { id: "type", label: "Type de Dissertation", type: "select", options: "Argumentatif,Expositoire,Narratif,Descriptif,Persuasif,Comparatif", required: true },
                { id: "length", label: "Longueur", type: "select", options: "300 mots,500 mots,750 mots,1000 mots,1500 mots", required: true },
                { id: "level", label: "Niveau Académique", type: "select", options: "Lycée,Université,Master,Professionnel", required: false }
            ],
            de: [
                { id: "topic", label: "Aufsatzthema", type: "text", placeholder: "Geben Sie Ihr Aufsatzthema ein...", required: true },
                { id: "type", label: "Aufsatztyp", type: "select", options: "Argumentativ,Erörternd,Narrativ,Beschreibend,Überzeugend,Vergleichend", required: true },
                { id: "length", label: "Wortanzahl", type: "select", options: "300 Wörter,500 Wörter,750 Wörter,1000 Wörter,1500 Wörter", required: true },
                { id: "level", label: "Akademisches Niveau", type: "select", options: "Oberschule,Universität,Master,Professionell", required: false }
            ],
            it: [
                { id: "topic", label: "Argomento del Saggio", type: "text", placeholder: "Inserisci l'argomento del saggio...", required: true },
                { id: "type", label: "Tipo di Saggio", type: "select", options: "Argomentativo,Espositivo,Narrativo,Descrittivo,Persuasivo,Comparativo", required: true },
                { id: "length", label: "Lunghezza", type: "select", options: "300 parole,500 parole,750 parole,1000 parole,1500 parole", required: true },
                { id: "level", label: "Livello Accademico", type: "select", options: "Liceo,Università,Master,Professionale", required: false }
            ]
        },
        prompt_template: `You are an expert essay writer. Create a well-structured essay on the given topic.

TOPIC: {topic}
ESSAY TYPE: {type}
TARGET LENGTH: {length}
ACADEMIC LEVEL: {level}

STRUCTURE:
1. Introduction with a compelling hook and clear thesis statement
2. Body paragraphs with topic sentences, evidence, and analysis
3. Smooth transitions between paragraphs
4. Strong conclusion that synthesizes the main points

Write the essay directly without any meta-commentary or explanations.`
    }
];

async function checkExists(platform, slug, language) {
    try {
        const response = await databases.listDocuments(
            DATABASE_ID,
            TOOLS_COLLECTION_ID,
            [
                Query.equal("platform", platform),
                Query.equal("slug", slug),
                Query.equal("language", language),
                Query.limit(1)
            ]
        );
        return response.documents.length > 0;
    } catch (error) {
        return false;
    }
}

async function uploadTools() {
    console.log("\n" + "═".repeat(60));
    console.log("📤 BATCH 1: AI WRITING TOOLS (High Search Volume)");
    console.log("═".repeat(60) + "\n");

    const results = { created: 0, skipped: 0, errors: 0 };

    for (const tool of TRENDING_TOOLS) {
        console.log(`\n📦 ${tool.platform}/${tool.slug}`);
        console.log(`   "${tool.names.en}"`);

        for (const lang of LANGUAGES) {
            const exists = await checkExists(tool.platform, tool.slug, lang);

            if (exists) {
                console.log(`   ⏭️  [${lang}] Ya existe`);
                results.skipped++;
                continue;
            }

            try {
                const docId = ID.unique();
                const inputs = tool.inputs[lang] || tool.inputs.en;

                const document = {
                    name: tool.names[lang],
                    description: tool.descriptions[lang],
                    platform: tool.platform,
                    slug: tool.slug,
                    language: lang,
                    status: "approved",
                    author_name: "KiviTools",
                    author_id: "system",
                    inputs: JSON.stringify(inputs),
                    prompt_template: tool.prompt_template
                };

                await databases.createDocument(
                    DATABASE_ID,
                    TOOLS_COLLECTION_ID,
                    docId,
                    document
                );

                console.log(`   ✅ [${lang}] Creada`);
                results.created++;

            } catch (error) {
                console.log(`   ❌ [${lang}] Error: ${error.message}`);
                results.errors++;
            }
        }
    }

    console.log("\n" + "═".repeat(60));
    console.log(`📊 RESUMEN BATCH 1:`);
    console.log(`   ✅ Creadas: ${results.created}`);
    console.log(`   ⏭️  Skipped: ${results.skipped}`);
    console.log(`   ❌ Errores: ${results.errors}`);
    console.log("═".repeat(60));

    console.log("\n🎯 Tools creadas:");
    console.log("   1. AI Text Humanizer - 50k+ búsquedas/mes");
    console.log("   2. AI Paraphrasing Tool - 30k+ búsquedas/mes");
    console.log("   3. Essay Generator - 25k+ búsquedas/mes");
    console.log("\n📝 Siguiente paso: Crear la página del platform 'ai-writing'");
}

uploadTools().catch(console.error);
