#!/usr/bin/env node

/**
 * Script para subir las nuevas tools a Appwrite
 * Plataformas: AI Art, WhatsApp, Career, SEO, Marketing, Email
 * 
 * Run: node scripts/upload-new-platforms-tools.mjs
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

// Inputs genéricos por idioma
function getGenericInputs(lang) {
    const inputs = {
        en: [{ name: "topic", label: "Topic or Theme", type: "text", placeholder: "Enter your topic...", required: true }],
        es: [{ name: "topic", label: "Tema", type: "text", placeholder: "Ingresa tu tema...", required: true }],
        pt: [{ name: "topic", label: "Tema", type: "text", placeholder: "Digite seu tema...", required: true }],
        fr: [{ name: "topic", label: "Sujet", type: "text", placeholder: "Entrez votre sujet...", required: true }],
        de: [{ name: "topic", label: "Thema", type: "text", placeholder: "Geben Sie Ihr Thema ein...", required: true }],
        it: [{ name: "topic", label: "Argomento", type: "text", placeholder: "Inserisci il tuo argomento...", required: true }]
    };
    return inputs[lang] || inputs.en;
}

function getGenericPrompt(toolName, platform) {
    return `You are an expert ${platform} content creator. Generate high-quality ${toolName} content based on the user's input. Be creative, engaging, and optimized for the platform.`;
}

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

// New platform tools with translations
const NEW_TOOLS = [
    // AI Art Platform
    {
        platform: "ai-art",
        slug: "prompt-generator",
        names: {
            en: "AI Art Prompt Generator",
            es: "Generador de Prompts de Arte IA",
            pt: "Gerador de Prompts de Arte IA",
            fr: "Générateur de Prompts Art IA",
            de: "KI-Kunst Prompt-Generator",
            it: "Generatore di Prompt Arte AI"
        },
        descriptions: {
            en: "Create detailed prompts for Midjourney, DALL-E, or Stable Diffusion that produce stunning images",
            es: "Crea prompts detallados para Midjourney, DALL-E o Stable Diffusion que producen imágenes impresionantes",
            pt: "Crie prompts detalhados para Midjourney, DALL-E ou Stable Diffusion que produzem imagens impressionantes",
            fr: "Créez des prompts détaillés pour Midjourney, DALL-E ou Stable Diffusion qui produisent des images époustouflantes",
            de: "Erstellen Sie detaillierte Prompts für Midjourney, DALL-E oder Stable Diffusion, die atemberaubende Bilder produzieren",
            it: "Crea prompt dettagliati per Midjourney, DALL-E o Stable Diffusion che producono immagini straordinarie"
        }
    },
    {
        platform: "ai-art",
        slug: "image-describer",
        names: {
            en: "Image Describer",
            es: "Descriptor de Imágenes",
            pt: "Descritor de Imagens",
            fr: "Descripteur d'Images",
            de: "Bildbeschreiber",
            it: "Descrittore di Immagini"
        },
        descriptions: {
            en: "Generate detailed visual descriptions perfect for recreating images with AI art tools",
            es: "Genera descripciones visuales detalladas perfectas para recrear imágenes con herramientas de arte IA",
            pt: "Gere descrições visuais detalhadas perfeitas para recriar imagens com ferramentas de arte IA",
            fr: "Générez des descriptions visuelles détaillées parfaites pour recréer des images avec des outils d'art IA",
            de: "Generieren Sie detaillierte visuelle Beschreibungen, perfekt zum Nachbilden von Bildern mit KI-Kunst-Tools",
            it: "Genera descrizioni visive dettagliate perfette per ricreare immagini con strumenti di arte AI"
        }
    },
    {
        platform: "ai-art",
        slug: "negative-prompt",
        names: {
            en: "Negative Prompt Generator",
            es: "Generador de Prompts Negativos",
            pt: "Gerador de Prompts Negativos",
            fr: "Générateur de Prompts Négatifs",
            de: "Negativ-Prompt Generator",
            it: "Generatore di Prompt Negativi"
        },
        descriptions: {
            en: "Create effective negative prompts to avoid unwanted elements in your AI-generated art",
            es: "Crea prompts negativos efectivos para evitar elementos no deseados en tu arte generado por IA",
            pt: "Crie prompts negativos eficazes para evitar elementos indesejados na sua arte gerada por IA",
            fr: "Créez des prompts négatifs efficaces pour éviter les éléments indésirables dans votre art généré par IA",
            de: "Erstellen Sie effektive Negativ-Prompts, um unerwünschte Elemente in Ihrer KI-generierten Kunst zu vermeiden",
            it: "Crea prompt negativi efficaci per evitare elementi indesiderati nella tua arte generata da AI"
        }
    },

    // WhatsApp Platform
    {
        platform: "whatsapp",
        slug: "business-message",
        names: {
            en: "Business Message Generator",
            es: "Generador de Mensajes de Negocio",
            pt: "Gerador de Mensagens de Negócio",
            fr: "Générateur de Messages Business",
            de: "Business-Nachrichten Generator",
            it: "Generatore di Messaggi Business"
        },
        descriptions: {
            en: "Create professional WhatsApp messages for customer service, sales, and follow-ups",
            es: "Crea mensajes profesionales de WhatsApp para atención al cliente, ventas y seguimiento",
            pt: "Crie mensagens profissionais de WhatsApp para atendimento ao cliente, vendas e follow-ups",
            fr: "Créez des messages WhatsApp professionnels pour le service client, les ventes et les suivis",
            de: "Erstellen Sie professionelle WhatsApp-Nachrichten für Kundenservice, Verkauf und Follow-ups",
            it: "Crea messaggi WhatsApp professionali per servizio clienti, vendite e follow-up"
        }
    },
    {
        platform: "whatsapp",
        slug: "status-ideas",
        names: {
            en: "Status Ideas Generator",
            es: "Generador de Ideas para Estados",
            pt: "Gerador de Ideias para Status",
            fr: "Générateur d'Idées de Statut",
            de: "Status-Ideen Generator",
            it: "Generatore di Idee per Stato"
        },
        descriptions: {
            en: "Generate creative and engaging WhatsApp status updates that get views",
            es: "Genera actualizaciones de estado de WhatsApp creativas y atractivas que consiguen vistas",
            pt: "Gere atualizações de status de WhatsApp criativas e envolventes que conseguem visualizações",
            fr: "Générez des mises à jour de statut WhatsApp créatives et engageantes qui obtiennent des vues",
            de: "Generieren Sie kreative und ansprechende WhatsApp-Status-Updates, die Views bekommen",
            it: "Genera aggiornamenti di stato WhatsApp creativi e coinvolgenti che ottengono visualizzazioni"
        }
    },
    {
        platform: "whatsapp",
        slug: "quick-replies",
        names: {
            en: "Quick Replies Generator",
            es: "Generador de Respuestas Rápidas",
            pt: "Gerador de Respostas Rápidas",
            fr: "Générateur de Réponses Rapides",
            de: "Schnellantworten Generator",
            it: "Generatore di Risposte Rapide"
        },
        descriptions: {
            en: "Create efficient quick reply templates for common customer questions",
            es: "Crea plantillas de respuestas rápidas eficientes para preguntas comunes de clientes",
            pt: "Crie templates de respostas rápidas eficientes para perguntas comuns de clientes",
            fr: "Créez des modèles de réponses rapides efficaces pour les questions courantes des clients",
            de: "Erstellen Sie effiziente Schnellantwort-Vorlagen für häufige Kundenfragen",
            it: "Crea template di risposte rapide efficienti per domande comuni dei clienti"
        }
    },

    // Career Platform
    {
        platform: "career",
        slug: "resume-summary",
        names: {
            en: "Resume Summary Generator",
            es: "Generador de Resumen de CV",
            pt: "Gerador de Resumo de Currículo",
            fr: "Générateur de Résumé CV",
            de: "Lebenslauf-Zusammenfassung Generator",
            it: "Generatore di Sommario CV"
        },
        descriptions: {
            en: "Create a powerful professional summary that highlights your value in seconds",
            es: "Crea un resumen profesional poderoso que destaca tu valor en segundos",
            pt: "Crie um resumo profissional poderoso que destaca seu valor em segundos",
            fr: "Créez un résumé professionnel puissant qui met en valeur votre valeur en secondes",
            de: "Erstellen Sie eine kraftvolle professionelle Zusammenfassung, die Ihren Wert in Sekunden hervorhebt",
            it: "Crea un sommario professionale potente che evidenzia il tuo valore in secondi"
        }
    },
    {
        platform: "career",
        slug: "cover-letter",
        names: {
            en: "Cover Letter Generator",
            es: "Generador de Carta de Presentación",
            pt: "Gerador de Carta de Apresentação",
            fr: "Générateur de Lettre de Motivation",
            de: "Anschreiben Generator",
            it: "Generatore di Lettera di Presentazione"
        },
        descriptions: {
            en: "Generate personalized cover letters tailored to specific job descriptions",
            es: "Genera cartas de presentación personalizadas adaptadas a descripciones de trabajo específicas",
            pt: "Gere cartas de apresentação personalizadas adaptadas a descrições de vagas específicas",
            fr: "Générez des lettres de motivation personnalisées adaptées à des offres d'emploi spécifiques",
            de: "Generieren Sie personalisierte Anschreiben, die auf spezifische Stellenbeschreibungen zugeschnitten sind",
            it: "Genera lettere di presentazione personalizzate adattate a specifiche descrizioni di lavoro"
        }
    },

    // SEO Platform
    {
        platform: "seo",
        slug: "meta-description",
        names: {
            en: "Meta Description Generator",
            es: "Generador de Meta Descripciones",
            pt: "Gerador de Meta Descrições",
            fr: "Générateur de Méta Descriptions",
            de: "Meta-Beschreibungen Generator",
            it: "Generatore di Meta Descrizioni"
        },
        descriptions: {
            en: "Create click-worthy meta descriptions that improve CTR and rankings",
            es: "Crea meta descripciones atractivas que mejoran el CTR y los rankings",
            pt: "Crie meta descrições atraentes que melhoram o CTR e os rankings",
            fr: "Créez des méta descriptions attrayantes qui améliorent le CTR et les classements",
            de: "Erstellen Sie klickwürdige Meta-Beschreibungen, die CTR und Rankings verbessern",
            it: "Crea meta descrizioni accattivanti che migliorano CTR e ranking"
        }
    },
    {
        platform: "seo",
        slug: "title-generator",
        names: {
            en: "SEO Title Generator",
            es: "Generador de Títulos SEO",
            pt: "Gerador de Títulos SEO",
            fr: "Générateur de Titres SEO",
            de: "SEO-Titel Generator",
            it: "Generatore di Titoli SEO"
        },
        descriptions: {
            en: "Generate optimized page titles that rank well and attract clicks",
            es: "Genera títulos de página optimizados que rankean bien y atraen clics",
            pt: "Gere títulos de página otimizados que rankeiam bem e atraem cliques",
            fr: "Générez des titres de page optimisés qui se classent bien et attirent les clics",
            de: "Generieren Sie optimierte Seitentitel, die gut ranken und Klicks anziehen",
            it: "Genera titoli di pagina ottimizzati che si posizionano bene e attirano clic"
        }
    },
    {
        platform: "seo",
        slug: "schema-markup",
        names: {
            en: "Schema Markup Generator",
            es: "Generador de Schema Markup",
            pt: "Gerador de Schema Markup",
            fr: "Générateur de Schema Markup",
            de: "Schema-Markup Generator",
            it: "Generatore di Schema Markup"
        },
        descriptions: {
            en: "Create JSON-LD schema markup for rich snippets in search results",
            es: "Crea schema markup JSON-LD para rich snippets en resultados de búsqueda",
            pt: "Crie schema markup JSON-LD para rich snippets nos resultados de busca",
            fr: "Créez du schema markup JSON-LD pour les rich snippets dans les résultats de recherche",
            de: "Erstellen Sie JSON-LD Schema-Markup für Rich Snippets in Suchergebnissen",
            it: "Crea schema markup JSON-LD per rich snippet nei risultati di ricerca"
        }
    },

    // Marketing Platform
    {
        platform: "marketing",
        slug: "product-review",
        names: {
            en: "Product Review Generator",
            es: "Generador de Reseñas de Productos",
            pt: "Gerador de Resenhas de Produtos",
            fr: "Générateur d'Avis Produits",
            de: "Produktbewertungs Generator",
            it: "Generatore di Recensioni Prodotto"
        },
        descriptions: {
            en: "Generate authentic-sounding product reviews for any item or service",
            es: "Genera reseñas de productos con sonido auténtico para cualquier artículo o servicio",
            pt: "Gere resenhas de produtos com som autêntico para qualquer item ou serviço",
            fr: "Générez des avis produits au son authentique pour n'importe quel article ou service",
            de: "Generieren Sie authentisch klingende Produktbewertungen für jeden Artikel oder Service",
            it: "Genera recensioni prodotto dal suono autentico per qualsiasi articolo o servizio"
        }
    },
    {
        platform: "marketing",
        slug: "slogan-generator",
        names: {
            en: "Slogan Generator",
            es: "Generador de Eslóganes",
            pt: "Gerador de Slogans",
            fr: "Générateur de Slogans",
            de: "Slogan Generator",
            it: "Generatore di Slogan"
        },
        descriptions: {
            en: "Create memorable brand slogans and taglines that stick in people's minds",
            es: "Crea eslóganes y taglines de marca memorables que se quedan en la mente de la gente",
            pt: "Crie slogans e taglines de marca memoráveis que ficam na mente das pessoas",
            fr: "Créez des slogans et taglines de marque mémorables qui restent dans la tête des gens",
            de: "Erstellen Sie einprägsame Marken-Slogans und Taglines, die im Kopf bleiben",
            it: "Crea slogan e tagline di marca memorabili che rimangono in mente"
        }
    },

    // Email Platform - Subject Line
    {
        platform: "email",
        slug: "subject-line",
        names: {
            en: "Email Subject Line Generator",
            es: "Generador de Asuntos de Email",
            pt: "Gerador de Assuntos de Email",
            fr: "Générateur d'Objets d'Email",
            de: "E-Mail-Betreff Generator",
            it: "Generatore di Oggetti Email"
        },
        descriptions: {
            en: "Craft subject lines that boost open rates and avoid the spam folder",
            es: "Crea líneas de asunto que mejoran las tasas de apertura y evitan la carpeta de spam",
            pt: "Crie linhas de assunto que melhoram as taxas de abertura e evitam a pasta de spam",
            fr: "Créez des lignes d'objet qui améliorent les taux d'ouverture et évitent le dossier spam",
            de: "Erstellen Sie Betreffzeilen, die Öffnungsraten verbessern und den Spam-Ordner vermeiden",
            it: "Crea righe oggetto che migliorano i tassi di apertura ed evitano la cartella spam"
        }
    }
];

async function uploadTools() {
    console.log("\n" + "═".repeat(60));
    console.log("📤 UPLOADING NEW PLATFORM TOOLS TO APPWRITE");
    console.log("═".repeat(60) + "\n");

    const results = { created: 0, skipped: 0, errors: 0 };
    const createdTools = [];

    for (const tool of NEW_TOOLS) {
        console.log(`\n📦 ${tool.platform}/${tool.slug}`);

        for (const lang of LANGUAGES) {
            const exists = await checkExists(tool.platform, tool.slug, lang);

            if (exists) {
                console.log(`   ⏭️  [${lang}] Already exists`);
                results.skipped++;
                continue;
            }

            try {
                const docId = ID.unique();
                const document = {
                    name: tool.names[lang],
                    description: tool.descriptions[lang],
                    platform: tool.platform,
                    slug: tool.slug,
                    language: lang,
                    status: "approved",
                    author_name: "KiviTools",
                    author_id: "system",
                    inputs: JSON.stringify(getGenericInputs(lang)),
                    prompt_template: getGenericPrompt(tool.names.en, tool.platform)
                };

                await databases.createDocument(
                    DATABASE_ID,
                    TOOLS_COLLECTION_ID,
                    docId,
                    document
                );

                console.log(`   ✅ [${lang}] Created (${docId})`);
                results.created++;

                if (lang === "en") {
                    createdTools.push({
                        platform: tool.platform,
                        slug: tool.slug,
                        id: docId
                    });
                }

            } catch (error) {
                console.log(`   ❌ [${lang}] Error: ${error.message}`);
                results.errors++;
            }
        }
    }

    console.log("\n" + "═".repeat(60));
    console.log(`📊 Summary:`);
    console.log(`   ✅ Created: ${results.created}`);
    console.log(`   ⏭️  Skipped: ${results.skipped}`);
    console.log(`   ❌ Errors: ${results.errors}`);
    console.log("═".repeat(60));

    return createdTools;
}

uploadTools().catch(console.error);
