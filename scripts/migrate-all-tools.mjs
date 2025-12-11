#!/usr/bin/env node

/**
 * 🚀 SCRIPT DE MIGRACIÓN UNIVERSAL
 * 
 * Migra TODAS las tools estáticas a Appwrite
 * 
 * Uso:
 *   node scripts/migrate-all-tools.mjs                    # Migrar todo
 *   node scripts/migrate-all-tools.mjs --platform=tiktok  # Solo una plataforma
 *   node scripts/migrate-all-tools.mjs --dry-run          # Ver qué haría sin ejecutar
 * 
 * Requisitos:
 * - Ejecutar extract-all-tools.mjs primero
 * - Tener .env.local con credenciales de Appwrite
 */

import { Client, Databases, ID, Permission, Role, Query } from "node-appwrite";
import dotenv from "dotenv";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, "..");

dotenv.config({ path: path.join(ROOT, ".env.local") });

// ============================================================================
// CONFIGURACIÓN
// ============================================================================

const client = new Client()
    .setEndpoint(process.env.APPWRITE_ENDPOINT || "https://cloud.appwrite.io/v1")
    .setProject(process.env.APPWRITE_PROJECT_ID || "")
    .setKey(process.env.APPWRITE_API_KEY || "");

const databases = new Databases(client);

const DATABASE_ID = process.env.APPWRITE_DATABASE_ID;
const TOOLS_COLLECTION_ID = "tools";

// Idiomas soportados
const LANGUAGES = ["en", "es", "pt", "fr", "de", "it"];

// Args
const args = process.argv.slice(2);
const DRY_RUN = args.includes("--dry-run");
const PLATFORM_FILTER = args.find(a => a.startsWith("--platform="))?.split("=")[1];

// ============================================================================
// TRADUCCIONES DE SLUGS POR IDIOMA
// ============================================================================

// Patrones comunes para traducir slugs
const SLUG_PATTERNS = {
    // Sufijos comunes
    "-generator": {
        en: "-generator", es: "-generador", pt: "-gerador",
        fr: "-generateur", de: "-generator", it: "-generatore"
    },
    "-calculator": {
        en: "-calculator", es: "-calculadora", pt: "-calculadora",
        fr: "-calculateur", de: "-rechner", it: "-calcolatore"
    },
    "-writer": {
        en: "-writer", es: "-escritor", pt: "-escritor",
        fr: "-redacteur", de: "-schreiber", it: "-scrittore"
    },
    "-ideas": {
        en: "-ideas", es: "-ideas", pt: "-ideias",
        fr: "-idees", de: "-ideen", it: "-idee"
    },
    "-maker": {
        en: "-maker", es: "-creador", pt: "-criador",
        fr: "-createur", de: "-ersteller", it: "-creatore"
    },
    // Prefijos comunes
    "bio-": {
        en: "bio-", es: "bio-", pt: "bio-",
        fr: "bio-", de: "bio-", it: "bio-"
    },
    "caption-": {
        en: "caption-", es: "subtitulo-", pt: "legenda-",
        fr: "legende-", de: "untertitel-", it: "didascalia-"
    },
    "hashtag-": {
        en: "hashtag-", es: "hashtag-", pt: "hashtag-",
        fr: "hashtag-", de: "hashtag-", it: "hashtag-"
    },
    "username-": {
        en: "username-", es: "nombre-", pt: "nome-",
        fr: "nom-", de: "benutzername-", it: "nome-"
    },
    "hook-": {
        en: "hook-", es: "gancho-", pt: "gancho-",
        fr: "accroche-", de: "hook-", it: "hook-"
    },
    "script-": {
        en: "script-", es: "guion-", pt: "roteiro-",
        fr: "script-", de: "skript-", it: "script-"
    },
    "video-": {
        en: "video-", es: "video-", pt: "video-",
        fr: "video-", de: "video-", it: "video-"
    },
    "reel-": {
        en: "reel-", es: "reel-", pt: "reel-",
        fr: "reel-", de: "reel-", it: "reel-"
    },
    "engagement-": {
        en: "engagement-", es: "engagement-", pt: "engagement-",
        fr: "engagement-", de: "engagement-", it: "engagement-"
    },
    "money-": {
        en: "money-", es: "dinero-", pt: "dinheiro-",
        fr: "argent-", de: "geld-", it: "soldi-"
    },
    "coins-": {
        en: "coins-", es: "monedas-", pt: "moedas-",
        fr: "pieces-", de: "munzen-", it: "monete-"
    },
    "shop-": {
        en: "shop-", es: "tienda-", pt: "loja-",
        fr: "boutique-", de: "shop-", it: "negozio-"
    },
    "name-": {
        en: "name-", es: "nombre-", pt: "nome-",
        fr: "nom-", de: "name-", it: "nome-"
    },
};

/**
 * Traducir un slug a otro idioma
 */
function translateSlug(baseSlug, lang) {
    if (lang === "en") return baseSlug;
    
    let translated = baseSlug;
    
    // Aplicar patrones de traducción
    for (const [pattern, translations] of Object.entries(SLUG_PATTERNS)) {
        if (translated.includes(pattern.replace(/-$/, "").replace(/^-/, ""))) {
            const enPattern = translations.en;
            const langPattern = translations[lang] || enPattern;
            translated = translated.replace(
                new RegExp(pattern.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g'),
                langPattern
            );
        }
    }
    
    return translated;
}

// ============================================================================
// TRADUCCIONES DE NOMBRES Y DESCRIPCIONES
// ============================================================================

// Nombres de plataformas traducidos
const PLATFORM_NAMES = {
    tiktok: { en: "TikTok", es: "TikTok", pt: "TikTok", fr: "TikTok", de: "TikTok", it: "TikTok" },
    instagram: { en: "Instagram", es: "Instagram", pt: "Instagram", fr: "Instagram", de: "Instagram", it: "Instagram" },
    youtube: { en: "YouTube", es: "YouTube", pt: "YouTube", fr: "YouTube", de: "YouTube", it: "YouTube" },
    twitter: { en: "Twitter", es: "Twitter", pt: "Twitter", fr: "Twitter", de: "Twitter", it: "Twitter" },
    twitch: { en: "Twitch", es: "Twitch", pt: "Twitch", fr: "Twitch", de: "Twitch", it: "Twitch" },
    snapchat: { en: "Snapchat", es: "Snapchat", pt: "Snapchat", fr: "Snapchat", de: "Snapchat", it: "Snapchat" },
    reddit: { en: "Reddit", es: "Reddit", pt: "Reddit", fr: "Reddit", de: "Reddit", it: "Reddit" },
    discord: { en: "Discord", es: "Discord", pt: "Discord", fr: "Discord", de: "Discord", it: "Discord" },
    linkedin: { en: "LinkedIn", es: "LinkedIn", pt: "LinkedIn", fr: "LinkedIn", de: "LinkedIn", it: "LinkedIn" },
    pinterest: { en: "Pinterest", es: "Pinterest", pt: "Pinterest", fr: "Pinterest", de: "Pinterest", it: "Pinterest" },
    telegram: { en: "Telegram", es: "Telegram", pt: "Telegram", fr: "Telegram", de: "Telegram", it: "Telegram" },
    suno: { en: "Suno", es: "Suno", pt: "Suno", fr: "Suno", de: "Suno", it: "Suno" },
    elevenlabs: { en: "ElevenLabs", es: "ElevenLabs", pt: "ElevenLabs", fr: "ElevenLabs", de: "ElevenLabs", it: "ElevenLabs" },
    amazon: { en: "Amazon", es: "Amazon", pt: "Amazon", fr: "Amazon", de: "Amazon", it: "Amazon" },
    etsy: { en: "Etsy", es: "Etsy", pt: "Etsy", fr: "Etsy", de: "Etsy", it: "Etsy" },
    onlyfans: { en: "OnlyFans", es: "OnlyFans", pt: "OnlyFans", fr: "OnlyFans", de: "OnlyFans", it: "OnlyFans" },
    patreon: { en: "Patreon", es: "Patreon", pt: "Patreon", fr: "Patreon", de: "Patreon", it: "Patreon" },
    medium: { en: "Medium", es: "Medium", pt: "Medium", fr: "Medium", de: "Medium", it: "Medium" },
    bluesky: { en: "Bluesky", es: "Bluesky", pt: "Bluesky", fr: "Bluesky", de: "Bluesky", it: "Bluesky" },
    bereal: { en: "BeReal", es: "BeReal", pt: "BeReal", fr: "BeReal", de: "BeReal", it: "BeReal" },
    kick: { en: "Kick", es: "Kick", pt: "Kick", fr: "Kick", de: "Kick", it: "Kick" },
    forocoches: { en: "Forocoches", es: "Forocoches", pt: "Forocoches", fr: "Forocoches", de: "Forocoches", it: "Forocoches" },
};

// Tipos de herramienta traducidos
const TOOL_TYPE_NAMES = {
    generator: { en: "Generator", es: "Generador", pt: "Gerador", fr: "Générateur", de: "Generator", it: "Generatore" },
    calculator: { en: "Calculator", es: "Calculadora", pt: "Calculadora", fr: "Calculateur", de: "Rechner", it: "Calcolatore" },
    writer: { en: "Writer", es: "Escritor", pt: "Escritor", fr: "Rédacteur", de: "Schreiber", it: "Scrittore" },
    maker: { en: "Maker", es: "Creador", pt: "Criador", fr: "Créateur", de: "Ersteller", it: "Creatore" },
    ideas: { en: "Ideas", es: "Ideas", pt: "Ideias", fr: "Idées", de: "Ideen", it: "Idee" },
};

// Conceptos traducidos para nombres y descripciones
const CONCEPTS = {
    bio: { en: "Bio", es: "Bio", pt: "Bio", fr: "Bio", de: "Bio", it: "Bio" },
    caption: { en: "Caption", es: "Subtítulo", pt: "Legenda", fr: "Légende", de: "Untertitel", it: "Didascalia" },
    hashtag: { en: "Hashtag", es: "Hashtag", pt: "Hashtag", fr: "Hashtag", de: "Hashtag", it: "Hashtag" },
    username: { en: "Username", es: "Nombre de Usuario", pt: "Nome de Usuário", fr: "Nom d'utilisateur", de: "Benutzername", it: "Nome Utente" },
    hook: { en: "Hook", es: "Gancho", pt: "Gancho", fr: "Accroche", de: "Hook", it: "Hook" },
    script: { en: "Script", es: "Guión", pt: "Roteiro", fr: "Script", de: "Skript", it: "Script" },
    video: { en: "Video", es: "Video", pt: "Vídeo", fr: "Vidéo", de: "Video", it: "Video" },
    reel: { en: "Reel", es: "Reel", pt: "Reel", fr: "Reel", de: "Reel", it: "Reel" },
    engagement: { en: "Engagement", es: "Engagement", pt: "Engagement", fr: "Engagement", de: "Engagement", it: "Engagement" },
    money: { en: "Money", es: "Dinero", pt: "Dinheiro", fr: "Argent", de: "Geld", it: "Soldi" },
    coins: { en: "Coins", es: "Monedas", pt: "Moedas", fr: "Pièces", de: "Münzen", it: "Monete" },
    shop: { en: "Shop", es: "Tienda", pt: "Loja", fr: "Boutique", de: "Shop", it: "Negozio" },
    name: { en: "Name", es: "Nombre", pt: "Nome", fr: "Nom", de: "Name", it: "Nome" },
    thread: { en: "Thread", es: "Hilo", pt: "Thread", fr: "Fil", de: "Thread", it: "Thread" },
    post: { en: "Post", es: "Publicación", pt: "Publicação", fr: "Publication", de: "Beitrag", it: "Post" },
    title: { en: "Title", es: "Título", pt: "Título", fr: "Titre", de: "Titel", it: "Titolo" },
    description: { en: "Description", es: "Descripción", pt: "Descrição", fr: "Description", de: "Beschreibung", it: "Descrizione" },
    lyrics: { en: "Lyrics", es: "Letra", pt: "Letra", fr: "Paroles", de: "Text", it: "Testo" },
    prompt: { en: "Prompt", es: "Prompt", pt: "Prompt", fr: "Prompt", de: "Prompt", it: "Prompt" },
    music: { en: "Music", es: "Música", pt: "Música", fr: "Musique", de: "Musik", it: "Musica" },
    voice: { en: "Voice", es: "Voz", pt: "Voz", fr: "Voix", de: "Stimme", it: "Voce" },
    text: { en: "Text", es: "Texto", pt: "Texto", fr: "Texte", de: "Text", it: "Testo" },
    comment: { en: "Comment", es: "Comentario", pt: "Comentário", fr: "Commentaire", de: "Kommentar", it: "Commento" },
    reply: { en: "Reply", es: "Respuesta", pt: "Resposta", fr: "Réponse", de: "Antwort", it: "Risposta" },
    review: { en: "Review", es: "Reseña", pt: "Avaliação", fr: "Avis", de: "Bewertung", it: "Recensione" },
    product: { en: "Product", es: "Producto", pt: "Produto", fr: "Produit", de: "Produkt", it: "Prodotto" },
    clip: { en: "Clip", es: "Clip", pt: "Clip", fr: "Clip", de: "Clip", it: "Clip" },
    stream: { en: "Stream", es: "Stream", pt: "Stream", fr: "Stream", de: "Stream", it: "Stream" },
    chat: { en: "Chat", es: "Chat", pt: "Chat", fr: "Chat", de: "Chat", it: "Chat" },
    ai: { en: "AI", es: "IA", pt: "IA", fr: "IA", de: "KI", it: "IA" },
};

/**
 * Generar nombre traducido para una tool
 */
function generateToolName(platform, baseSlug, lang) {
    const platformName = PLATFORM_NAMES[platform]?.[lang] || platform;
    
    // Detectar tipo de herramienta
    let toolType = "";
    let concept = "";
    
    if (baseSlug.includes("-generator")) {
        toolType = TOOL_TYPE_NAMES.generator[lang];
        concept = baseSlug.replace("-generator", "");
    } else if (baseSlug.includes("-calculator")) {
        toolType = TOOL_TYPE_NAMES.calculator[lang];
        concept = baseSlug.replace("-calculator", "");
    } else if (baseSlug.includes("-writer")) {
        toolType = TOOL_TYPE_NAMES.writer[lang];
        concept = baseSlug.replace("-writer", "");
    } else if (baseSlug.includes("-maker")) {
        toolType = TOOL_TYPE_NAMES.maker[lang];
        concept = baseSlug.replace("-maker", "");
    } else if (baseSlug.includes("-ideas")) {
        toolType = TOOL_TYPE_NAMES.ideas[lang];
        concept = baseSlug.replace("-ideas", "");
    } else {
        // Fallback: capitalizar
        return `${platformName} ${baseSlug.split("-").map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(" ")}`;
    }
    
    // Traducir concepto
    const conceptKey = concept.replace(/-/g, "");
    const translatedConcept = CONCEPTS[conceptKey]?.[lang] || concept.charAt(0).toUpperCase() + concept.slice(1);
    
    // Construir nombre según idioma
    if (lang === "es") {
        return `${toolType} de ${translatedConcept} ${platformName}`;
    } else if (lang === "pt") {
        return `${toolType} de ${translatedConcept} ${platformName}`;
    } else if (lang === "fr") {
        return `${toolType} de ${translatedConcept} ${platformName}`;
    } else if (lang === "de") {
        return `${platformName} ${translatedConcept} ${toolType}`;
    } else if (lang === "it") {
        return `${toolType} di ${translatedConcept} ${platformName}`;
    }
    
    // English default
    return `${platformName} ${translatedConcept} ${toolType}`;
}

/**
 * Generar descripción traducida
 */
function generateDescription(platform, baseSlug, lang) {
    const platformName = PLATFORM_NAMES[platform]?.[lang] || platform;
    
    const descriptions = {
        en: `Generate amazing ${baseSlug.replace(/-/g, " ")} for ${platformName} with AI. Free and easy to use.`,
        es: `Genera ${baseSlug.replace(/-/g, " ")} increíbles para ${platformName} con IA. Gratis y fácil de usar.`,
        pt: `Gere ${baseSlug.replace(/-/g, " ")} incríveis para ${platformName} com IA. Grátis e fácil de usar.`,
        fr: `Générez des ${baseSlug.replace(/-/g, " ")} incroyables pour ${platformName} avec l'IA. Gratuit et facile.`,
        de: `Erstelle erstaunliche ${baseSlug.replace(/-/g, " ")} für ${platformName} mit KI. Kostenlos und einfach.`,
        it: `Genera ${baseSlug.replace(/-/g, " ")} incredibili per ${platformName} con IA. Gratis e facile da usare.`,
    };
    
    return descriptions[lang] || descriptions.en;
}

// ============================================================================
// INPUTS Y PROMPTS GENÉRICOS
// ============================================================================

/**
 * Generar inputs genéricos basados en el tipo de herramienta
 */
function generateInputs(baseSlug) {
    // Inputs básicos que funcionan para cualquier tool
    const basicInputs = [
        { id: "topic", label: "Topic", type: "text", placeholder: "Describe your content...", required: true },
    ];
    
    // Detectar si necesita selector de tono
    if (baseSlug.includes("generator") || baseSlug.includes("writer") || baseSlug.includes("maker")) {
        basicInputs.push({
            id: "tone",
            label: "Tone",
            type: "select",
            options: "Professional,Casual,Friendly,Humorous,Inspirational,Formal",
            required: true
        });
    }
    
    // Añadir selector de idioma para output
    basicInputs.push({
        id: "language",
        label: "Output Language",
        type: "language",
        required: true
    });
    
    return basicInputs;
}

/**
 * Generar prompt template genérico
 */
function generatePromptTemplate(platform, baseSlug) {
    const platformName = PLATFORM_NAMES[platform]?.en || platform;
    const toolDescription = baseSlug.replace(/-/g, " ");
    
    return `You are an expert ${platformName} content creator. Generate high-quality ${toolDescription} based on the user's input.

Topic: {{topic}}
${baseSlug.includes("generator") || baseSlug.includes("writer") ? "Tone: {{tone}}" : ""}
Language: Write ONLY in {{language}}

Requirements:
- Be creative and engaging
- Follow ${platformName} best practices
- Make it relevant to the topic provided
- Ensure the content is appropriate and helpful

Generate the content directly without explanations or meta-commentary.`;
}

// ============================================================================
// APPWRITE FUNCTIONS
// ============================================================================

/**
 * Verificar si una tool ya existe
 */
async function toolExists(name, platform, language) {
    try {
        const response = await databases.listDocuments(
            DATABASE_ID,
            TOOLS_COLLECTION_ID,
            [
                Query.equal("name", name),
                Query.equal("platform", platform),
                Query.equal("language", language),
                Query.limit(1),
            ]
        );
        return response.documents.length > 0;
    } catch (error) {
        return false;
    }
}

/**
 * Crear tool en Appwrite
 */
async function createTool(data) {
    if (DRY_RUN) {
        console.log(`   [DRY-RUN] Would create: ${data.name} (${data.language})`);
        return { $id: "dry-run-id" };
    }
    
    const docId = ID.unique();
    
    await databases.createDocument(
        DATABASE_ID,
        TOOLS_COLLECTION_ID,
        docId,
        {
            name: data.name,
            description: data.description,
            platform: data.platform,
            slug: data.slug,
            language: data.language,
            icon: data.icon,
            inputs: JSON.stringify(data.inputs),
            prompt_template: data.promptTemplate,
            status: "approved",
            author_name: "KiviTools",
            author_id: "admin",
        },
        [Permission.read(Role.any())]
    );
    
    return { $id: docId };
}

// ============================================================================
// MAIN MIGRATION
// ============================================================================

async function migrate() {
    console.log("\n" + "═".repeat(70));
    console.log("🚀 MIGRACIÓN UNIVERSAL DE TOOLS A APPWRITE");
    console.log("═".repeat(70));
    
    if (DRY_RUN) {
        console.log("⚠️  MODO DRY-RUN: No se crearán documentos reales\n");
    }
    
    if (PLATFORM_FILTER) {
        console.log(`🎯 Filtrando por plataforma: ${PLATFORM_FILTER}\n`);
    }
    
    // Cargar JSON de tools extraídas
    const jsonPath = path.join(__dirname, "data", "all-tools.json");
    
    if (!fs.existsSync(jsonPath)) {
        console.error("❌ No se encontró scripts/data/all-tools.json");
        console.error("   Ejecuta primero: node scripts/extract-all-tools.mjs");
        process.exit(1);
    }
    
    const data = JSON.parse(fs.readFileSync(jsonPath, "utf-8"));
    const { platforms } = data;
    
    console.log(`📦 Plataformas: ${Object.keys(platforms).length}`);
    console.log(`🌍 Idiomas: ${LANGUAGES.join(", ")}`);
    console.log("-".repeat(70));
    
    let totalCreated = 0;
    let totalSkipped = 0;
    let totalErrors = 0;
    
    // Procesar cada plataforma
    for (const [platform, platformData] of Object.entries(platforms)) {
        if (PLATFORM_FILTER && platform !== PLATFORM_FILTER) {
            continue;
        }
        
        const { tools } = platformData;
        
        console.log(`\n📱 ${platform.toUpperCase()} (${tools.length} tools)`);
        
        for (const tool of tools) {
            const { baseSlug, icon } = tool;
            console.log(`   🔧 ${baseSlug}`);
            
            // Generar inputs y prompt
            const inputs = generateInputs(baseSlug);
            const promptTemplate = generatePromptTemplate(platform, baseSlug);
            
            // Crear para cada idioma
            for (const lang of LANGUAGES) {
                const slug = translateSlug(baseSlug, lang);
                const name = generateToolName(platform, baseSlug, lang);
                const description = generateDescription(platform, baseSlug, lang);
                
                try {
                    // Verificar si existe
                    const exists = await toolExists(name, platform, lang);
                    
                    if (exists) {
                        console.log(`      ⏭️  [${lang}] Skipped (exists): ${name}`);
                        totalSkipped++;
                        continue;
                    }
                    
                    // Crear tool
                    await createTool({
                        name,
                        description,
                        platform,
                        slug,
                        language: lang,
                        icon: icon || "🛠️",
                        inputs,
                        promptTemplate,
                    });
                    
                    console.log(`      ✅ [${lang}] Created: ${name}`);
                    totalCreated++;
                    
                    // Delay para evitar rate limiting
                    await new Promise(resolve => setTimeout(resolve, 100));
                    
                } catch (error) {
                    console.error(`      ❌ [${lang}] Error: ${error.message}`);
                    totalErrors++;
                }
            }
        }
    }
    
    // Resumen final
    console.log("\n" + "═".repeat(70));
    console.log("📊 RESUMEN DE MIGRACIÓN");
    console.log("═".repeat(70));
    console.log(`   ✅ Creados:  ${totalCreated}`);
    console.log(`   ⏭️  Skipped: ${totalSkipped}`);
    console.log(`   ❌ Errores:  ${totalErrors}`);
    console.log(`   📈 Total:    ${totalCreated + totalSkipped + totalErrors}`);
    
    if (DRY_RUN) {
        console.log("\n⚠️  Esto fue un DRY-RUN. Ejecuta sin --dry-run para migrar realmente.");
    } else {
        console.log("\n🎉 Migración completada!");
    }
    
    console.log("═".repeat(70) + "\n");
}

// Ejecutar
migrate().catch(console.error);
