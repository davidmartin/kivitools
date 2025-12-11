#!/usr/bin/env node

/**
 * Script to upload TikTok tools to Appwrite
 * Creates one tool per language for each tool definition
 * 
 * Run: node scripts/upload-tiktok-tools.mjs
 * 
 * This script:
 * 1. Defines all TikTok tools with their inputs and prompt templates
 * 2. Creates a document in Appwrite for each language
 * 3. Uses translated slugs for each language
 * 4. Checks for existing tools by name to avoid duplicates
 */

import { Client, Databases, ID, Permission, Role, Query } from "node-appwrite";
import dotenv from "dotenv";

dotenv.config({ path: ".env.local" });

const client = new Client()
    .setEndpoint(process.env.APPWRITE_ENDPOINT || "https://cloud.appwrite.io/v1")
    .setProject(process.env.APPWRITE_PROJECT_ID || "")
    .setKey(process.env.APPWRITE_API_KEY || "");

const databases = new Databases(client);

const DATABASE_ID = process.env.APPWRITE_DATABASE_ID;
const TOOLS_COLLECTION_ID = "tools";

// Supported UI languages
const LANGUAGES = ["en", "es", "pt", "fr", "de", "it"];

// Slug translations for each language (from RUTAS_ALIAS.md)
const SLUG_TRANSLATIONS = {
    "script-writer": {
        en: "script-writer",
        es: "escritor-de-guiones",
        pt: "escritor-de-roteiros",
        fr: "generateur-scripts",
        de: "skript-generator",
        it: "generatore-script",
    },
    "video-ideas": {
        en: "video-ideas",
        es: "ideas-de-videos",
        pt: "ideias-de-videos",
        fr: "idees-videos",
        de: "video-ideen",
        it: "idee-video",
    },
    "hook-generator": {
        en: "hook-generator",
        es: "generador-de-ganchos",
        pt: "gerador-de-ganchos",
        fr: "generateur-accroches",
        de: "hook-generator",
        it: "generatore-hook",
    },
    "hashtag-generator": {
        en: "hashtag-generator",
        es: "generador-de-hashtags",
        pt: "gerador-de-hashtags",
        fr: "generateur-hashtags",
        de: "hashtag-generator",
        it: "generatore-hashtag",
    },
    "caption-generator": {
        en: "caption-generator",
        es: "generador-subtitulos",
        pt: "gerador-legendas",
        fr: "generateur-legendes",
        de: "untertitel-generator",
        it: "generatore-didascalie",
    },
    "username-generator": {
        en: "username-generator",
        es: "generador-de-nombres",
        pt: "gerador-de-nomes",
        fr: "generateur-noms",
        de: "benutzername-generator",
        it: "generatore-nomi",
    },
    "bio-generator": {
        en: "bio-generator",
        es: "generador-bio",
        pt: "gerador-bio",
        fr: "generateur-bio",
        de: "bio-generator",
        it: "generatore-bio",
    },
};

// Tool name translations
const NAME_TRANSLATIONS = {
    "script-writer": {
        en: "TikTok Script Writer",
        es: "Escritor de Guiones TikTok",
        pt: "Escritor de Roteiros TikTok",
        fr: "Générateur de Scripts TikTok",
        de: "TikTok Skript Generator",
        it: "Generatore Script TikTok",
    },
    "video-ideas": {
        en: "TikTok Video Ideas Generator",
        es: "Generador de Ideas de Videos TikTok",
        pt: "Gerador de Ideias de Vídeos TikTok",
        fr: "Générateur d'Idées Vidéo TikTok",
        de: "TikTok Video-Ideen Generator",
        it: "Generatore di Idee Video TikTok",
    },
    "hook-generator": {
        en: "TikTok Hook Generator",
        es: "Generador de Ganchos TikTok",
        pt: "Gerador de Ganchos TikTok",
        fr: "Générateur d'Accroches TikTok",
        de: "TikTok Hook Generator",
        it: "Generatore di Hook TikTok",
    },
    "hashtag-generator": {
        en: "TikTok Hashtag Generator",
        es: "Generador de Hashtags TikTok",
        pt: "Gerador de Hashtags TikTok",
        fr: "Générateur de Hashtags TikTok",
        de: "TikTok Hashtag Generator",
        it: "Generatore di Hashtag TikTok",
    },
    "caption-generator": {
        en: "TikTok Caption Generator",
        es: "Generador de Subtítulos TikTok",
        pt: "Gerador de Legendas TikTok",
        fr: "Générateur de Légendes TikTok",
        de: "TikTok Untertitel Generator",
        it: "Generatore di Didascalie TikTok",
    },
    "username-generator": {
        en: "TikTok Username Generator",
        es: "Generador de Nombres TikTok",
        pt: "Gerador de Nomes TikTok",
        fr: "Générateur de Noms TikTok",
        de: "TikTok Benutzername Generator",
        it: "Generatore di Nomi Utente TikTok",
    },
    "bio-generator": {
        en: "TikTok Bio Generator",
        es: "Generador de Bio TikTok",
        pt: "Gerador de Bio TikTok",
        fr: "Générateur de Bio TikTok",
        de: "TikTok Bio Generator",
        it: "Generatore di Bio TikTok",
    },
};

// Description translations
const DESCRIPTION_TRANSLATIONS = {
    "script-writer": {
        en: "Create viral TikTok scripts with AI. Generate engaging hooks and compelling content for your videos.",
        es: "Crea guiones virales para TikTok con IA. Genera ganchos atractivos y contenido convincente para tus videos.",
        pt: "Crie roteiros virais para TikTok com IA. Gere ganchos atraentes e conteúdo envolvente para seus vídeos.",
        fr: "Créez des scripts TikTok viraux avec l'IA. Générez des accroches captivantes et du contenu engageant.",
        de: "Erstelle virale TikTok-Skripte mit KI. Generiere fesselnde Hooks und überzeugende Inhalte.",
        it: "Crea script TikTok virali con l'IA. Genera hook coinvolgenti e contenuti accattivanti.",
    },
    "video-ideas": {
        en: "Get creative TikTok video ideas tailored to your niche. Never run out of content inspiration again!",
        es: "Obtén ideas creativas para videos TikTok adaptadas a tu nicho. ¡Nunca más te quedarás sin inspiración!",
        pt: "Obtenha ideias criativas de vídeos TikTok adaptadas ao seu nicho. Nunca mais fique sem inspiração!",
        fr: "Obtenez des idées créatives de vidéos TikTok adaptées à votre niche. Ne manquez plus jamais d'inspiration!",
        de: "Erhalte kreative TikTok-Videoideen für deine Nische. Dir gehen nie wieder die Ideen aus!",
        it: "Ottieni idee creative per video TikTok su misura per la tua nicchia. Non rimanere mai più senza ispirazione!",
    },
    "hook-generator": {
        en: "Generate attention-grabbing hooks that stop scrollers. Perfect for viral TikTok videos.",
        es: "Genera ganchos que captan la atención. Perfectos para videos TikTok virales.",
        pt: "Gere ganchos que captam a atenção. Perfeitos para vídeos TikTok virais.",
        fr: "Générez des accroches captivantes qui arrêtent le scroll. Parfait pour des vidéos TikTok virales.",
        de: "Generiere aufmerksamkeitsstarke Hooks. Perfekt für virale TikTok-Videos.",
        it: "Genera hook accattivanti che fermano lo scroll. Perfetti per video TikTok virali.",
    },
    "hashtag-generator": {
        en: "Find the best hashtags to boost your TikTok reach and discoverability.",
        es: "Encuentra los mejores hashtags para aumentar el alcance de tus TikToks.",
        pt: "Encontre as melhores hashtags para aumentar o alcance dos seus TikToks.",
        fr: "Trouvez les meilleurs hashtags pour booster la portée de vos TikToks.",
        de: "Finde die besten Hashtags um deine TikTok-Reichweite zu steigern.",
        it: "Trova i migliori hashtag per aumentare la portata dei tuoi TikTok.",
    },
    "caption-generator": {
        en: "Create engaging captions that complement your TikTok videos perfectly.",
        es: "Crea subtítulos atractivos que complementen perfectamente tus videos TikTok.",
        pt: "Crie legendas envolventes que complementem perfeitamente seus vídeos TikTok.",
        fr: "Créez des légendes engageantes qui complètent parfaitement vos vidéos TikTok.",
        de: "Erstelle fesselnde Untertitel, die deine TikTok-Videos perfekt ergänzen.",
        it: "Crea didascalie coinvolgenti che completano perfettamente i tuoi video TikTok.",
    },
    "username-generator": {
        en: "Generate unique and memorable TikTok usernames that stand out.",
        es: "Genera nombres de usuario TikTok únicos y memorables que destacan.",
        pt: "Gere nomes de usuário TikTok únicos e memoráveis que se destacam.",
        fr: "Générez des noms d'utilisateur TikTok uniques et mémorables qui se démarquent.",
        de: "Generiere einzigartige und einprägsame TikTok-Benutzernamen die herausstechen.",
        it: "Genera nomi utente TikTok unici e memorabili che si distinguono.",
    },
    "bio-generator": {
        en: "Create the perfect TikTok bio that showcases your personality and attracts followers.",
        es: "Crea la bio TikTok perfecta que muestre tu personalidad y atraiga seguidores.",
        pt: "Crie a bio TikTok perfeita que mostre sua personalidade e atraia seguidores.",
        fr: "Créez la bio TikTok parfaite qui met en valeur votre personnalité et attire des abonnés.",
        de: "Erstelle die perfekte TikTok-Bio, die deine Persönlichkeit zeigt und Follower anzieht.",
        it: "Crea la bio TikTok perfetta che mostri la tua personalità e attiri follower.",
    },
};

// TikTok Tools definitions
const TIKTOK_TOOLS = [
    {
        baseSlug: "script-writer",
        icon: "🎬",
        inputs: [
            { id: "topic", label: "Topic", type: "text", placeholder: "e.g. Morning routine, Life hacks", required: true },
            { id: "tone", label: "Tone", type: "select", options: "Friendly,Professional,Casual,Humorous,Inspirational", required: true },
            { id: "duration", label: "Duration", type: "select", options: "30s,60s,30-60s", required: true },
            { id: "language", label: "Output Language", type: "language", required: true },
        ],
        promptTemplate: `You are an expert TikTok scriptwriter. Create engaging, viral-worthy scripts that:
- Hook viewers in the first 3 seconds
- Use short, punchy sentences
- Include natural pauses for emphasis
- Are optimized for voiceover recording
- Follow TikTok best practices
- Use line breaks to separate different ideas

Write a TikTok script about: {{topic}}

Requirements:
- Tone: {{tone}}
- Duration: {{duration}} (adjust word count accordingly: 30s=75 words, 60s=150 words)
- Language: Write ONLY in the language specified by {{language}}
- Start with a strong hook
- End with a call-to-action

Write ONLY the script text, no titles or extra formatting.`,
    },
    {
        baseSlug: "video-ideas",
        icon: "💡",
        inputs: [
            { id: "topic", label: "Topic/Niche", type: "text", placeholder: "e.g. Fitness, Cooking, Tech reviews", required: true },
            { id: "language", label: "Output Language", type: "language", required: true },
        ],
        promptTemplate: `You are a creative TikTok content strategist. Generate 8 creative and unique TikTok video ideas about: {{topic}}

Requirements:
- Language: Write ONLY in {{language}}
- Make each idea specific and actionable
- Include different content angles (educational, entertaining, storytelling)
- Each idea should be 1-2 sentences
- Have viral potential
- Format: Return each idea on a new line, numbered (1., 2., 3., etc.)

Generate only the list of ideas, no extra text.`,
    },
    {
        baseSlug: "hook-generator",
        icon: "🎣",
        inputs: [
            { id: "topic", label: "Video Topic", type: "text", placeholder: "e.g. Productivity tips for students", required: true },
            { id: "tone", label: "Tone", type: "select", options: "Shocking,Curious,Controversial,Relatable,Urgent", required: true },
            { id: "language", label: "Output Language", type: "language", required: true },
        ],
        promptTemplate: `You are a TikTok hook specialist. Create 5 attention-grabbing hooks for a video about: {{topic}}

Requirements:
- Tone: {{tone}}
- Language: Write ONLY in {{language}}
- Each hook must stop the scroll in 3 seconds or less
- Use pattern interrupts, curiosity gaps, or emotional triggers
- Format: One hook per line, numbered (1., 2., 3., etc.)

Generate only the hooks, no explanations.`,
    },
    {
        baseSlug: "hashtag-generator",
        icon: "#️⃣",
        inputs: [
            { id: "keyword", label: "Main Keyword/Topic", type: "text", placeholder: "e.g. Fitness, Travel, Food", required: true },
        ],
        promptTemplate: `You are a TikTok hashtag expert. Generate relevant hashtags for content about: {{keyword}}

Requirements:
- Mix of popular (high competition) and niche (low competition) hashtags
- Include 10-15 hashtags
- Format: Return as a list with each hashtag on a new line
- Include a mix of broad and specific hashtags
- Add estimated reach level: (🔥 High, 📈 Medium, 🎯 Niche)

Example format:
#keyword 🔥 High
#specifickeyword 🎯 Niche`,
    },
    {
        baseSlug: "caption-generator",
        icon: "📝",
        inputs: [
            { id: "topic", label: "Video Topic", type: "textarea", placeholder: "Describe what your video is about...", required: true },
            { id: "tone", label: "Tone", type: "select", options: "Casual,Funny,Informative,Inspirational,Engaging", required: true },
            { id: "language", label: "Output Language", type: "language", required: true },
        ],
        promptTemplate: `You are a TikTok caption writer. Create an engaging caption for a video about: {{topic}}

Requirements:
- Tone: {{tone}}
- Language: Write ONLY in {{language}}
- Keep it under 150 characters for optimal visibility
- Include a call-to-action or engaging question
- Add 3-5 relevant emojis
- Make it complement the video, not describe it

Write ONLY the caption, no explanations.`,
    },
    {
        baseSlug: "username-generator",
        icon: "👤",
        inputs: [
            { id: "keywords", label: "Keywords/Interests", type: "text", placeholder: "e.g. gaming, travel, art", required: true },
            { id: "style", label: "Style", type: "select", options: "Professional,Creative,Funny,Aesthetic,Edgy", required: true },
        ],
        promptTemplate: `You are a username creativity expert. Generate 10 unique TikTok username ideas based on:

Keywords: {{keywords}}
Style: {{style}}

Requirements:
- Must be under 24 characters (TikTok limit)
- Easy to remember and spell
- No special characters except underscore and period
- Mix of available patterns: word combinations, word + numbers, aesthetic styles
- Format: One username per line, numbered (1., 2., 3., etc.)

Generate only the usernames, no explanations.`,
    },
    {
        baseSlug: "bio-generator",
        icon: "✨",
        inputs: [
            { id: "description", label: "About You", type: "textarea", placeholder: "Tell us about yourself, your content, interests...", required: true },
            { id: "tone", label: "Tone", type: "select", options: "Professional,Casual,Funny,Mysterious,Inspirational", required: true },
            { id: "language", label: "Output Language", type: "language", required: true },
        ],
        promptTemplate: `You are a TikTok bio specialist. Create a perfect TikTok bio based on:

About: {{description}}
Tone: {{tone}}

Requirements:
- Language: Write ONLY in {{language}}
- Maximum 80 characters (TikTok limit)
- Include 1-3 relevant emojis
- Capture personality and content focus
- Can include a mini call-to-action

Generate only the bio text, nothing else.`,
    },
];

/**
 * Check if a tool with the same name, platform, and language already exists
 * @param {string} name - Tool name
 * @param {string} platform - Platform (e.g., "tiktok")
 * @param {string} language - Language code (e.g., "en", "es")
 * @returns {Promise<boolean>} - True if exists, false otherwise
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
        console.error(`   ⚠️  Error checking if tool exists: ${error.message}`);
        return false;
    }
}

async function uploadTools() {
    if (!DATABASE_ID) {
        console.error("❌ APPWRITE_DATABASE_ID not found in .env.local");
        return;
    }

    console.log("🚀 Starting TikTok tools upload to Appwrite...\n");
    console.log(`📋 Database ID: ${DATABASE_ID}`);
    console.log(`📚 Collection: ${TOOLS_COLLECTION_ID}`);
    console.log(`🌍 Languages: ${LANGUAGES.join(", ")}`);
    console.log(`🛠️  Total tools: ${TIKTOK_TOOLS.length}`);
    console.log(`📊 Expected documents: ${TIKTOK_TOOLS.length * LANGUAGES.length}\n`);
    console.log("-".repeat(50));

    let created = 0;
    let skipped = 0;
    let errors = 0;

    for (const tool of TIKTOK_TOOLS) {
        console.log(`\n📦 Processing: ${tool.baseSlug}`);
        console.log(`   Icon: ${tool.icon}`);
        console.log(`   Inputs: ${tool.inputs.length} fields`);

        for (const lang of LANGUAGES) {
            const slug = SLUG_TRANSLATIONS[tool.baseSlug]?.[lang] || tool.baseSlug;
            const name = NAME_TRANSLATIONS[tool.baseSlug]?.[lang] || tool.baseSlug;
            const description = DESCRIPTION_TRANSLATIONS[tool.baseSlug]?.[lang] || "";

            try {
                console.log(`   🔄 [${lang}] Checking: ${name}...`);

                // Check if tool already exists
                const exists = await toolExists(name, "tiktok", lang);
                if (exists) {
                    console.log(`   ⚠️  [${lang.toUpperCase()}] SKIPPED: "${name}" (already exists in database)`);
                    skipped++;
                    continue;
                }

                // Generate unique document ID
                const docId = ID.unique();
                console.log(`   🔄 [${lang}] Creating: ${slug}-${docId}...`);

                await databases.createDocument(
                    DATABASE_ID,
                    TOOLS_COLLECTION_ID,
                    docId,
                    {
                        name,
                        description,
                        platform: "tiktok",
                        slug,
                        language: lang,
                        icon: tool.icon,
                        inputs: JSON.stringify(tool.inputs),
                        prompt_template: tool.promptTemplate,
                        status: "approved", // Pre-approved since these are official tools
                        author_name: "KiviTools",
                        author_id: "admin",
                    },
                    [
                        Permission.read(Role.any()),
                    ]
                );

                console.log(`   ✅ [${lang.toUpperCase()}] SUCCESS: ${slug}-${docId}`);
                console.log(`      Name: ${name}`);
                console.log(`      Status: approved | Author: KiviTools`);
                created++;
            } catch (error) {
                if (error.code === 409) {
                    console.log(`   ⚠️ [${lang.toUpperCase()}] SKIPPED: ${slug} (already exists)`);
                    skipped++;
                } else {
                    console.error(`   ❌ [${lang.toUpperCase()}] ERROR: ${error.message}`);
                    console.error(`      Slug: ${slug}`);
                    console.error(`      Code: ${error.code || 'unknown'}`);
                    errors++;
                }
            }

            // Small delay to avoid rate limiting
            if (lang !== LANGUAGES[LANGUAGES.length - 1]) {
                await new Promise(resolve => setTimeout(resolve, 200));
            }
        }
    }

    console.log("\n" + "=".repeat(50));
    console.log(`📊 Upload Summary:`);
    console.log(`   ✅ Created: ${created}`);
    console.log(`   ⚠️ Skipped: ${skipped}`);
    console.log(`   ❌ Errors: ${errors}`);
    console.log(`   📈 Total processed: ${created + skipped + errors}`);
    console.log(`   🎯 Success rate: ${created > 0 ? Math.round((created / (created + errors)) * 100) : 0}%`);
    console.log("=".repeat(50));

    if (errors > 0) {
        console.log("\n⚠️  Upload completed with errors. Check logs above.");
    } else if (created === 0 && skipped > 0) {
        console.log("\n✅ All tools already exist in database!");
    } else {
        console.log("\n🎉 TikTok tools upload complete!");
    }
}

uploadTools();
