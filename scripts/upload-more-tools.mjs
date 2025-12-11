#!/usr/bin/env node

/**
 * Script para subir más tools a Appwrite
 * Añade tools adicionales a plataformas que tienen pocas
 * 
 * Run: node scripts/upload-more-tools.mjs
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

// NEW TOOLS - Adding more tools to platforms with few
const NEW_TOOLS = [
    // ============================================================================
    // Email Platform - More tools
    // ============================================================================
    {
        platform: "email",
        slug: "newsletter-intro",
        names: {
            en: "Newsletter Intro Generator",
            es: "Generador de Intros de Newsletter",
            pt: "Gerador de Intros de Newsletter",
            fr: "Générateur d'Intros de Newsletter",
            de: "Newsletter-Intro Generator",
            it: "Generatore di Intro Newsletter"
        },
        descriptions: {
            en: "Create engaging newsletter opening lines that hook readers from the first sentence",
            es: "Crea líneas de apertura de newsletter atractivas que enganchan desde la primera frase",
            pt: "Crie linhas de abertura de newsletter envolventes que prendem os leitores desde a primeira frase",
            fr: "Créez des lignes d'ouverture de newsletter captivantes qui accrochent dès la première phrase",
            de: "Erstellen Sie ansprechende Newsletter-Eröffnungszeilen, die Leser von Anfang an fesseln",
            it: "Crea righe di apertura newsletter coinvolgenti che catturano i lettori dalla prima frase"
        }
    },
    {
        platform: "email",
        slug: "cold-email",
        names: {
            en: "Cold Email Generator",
            es: "Generador de Emails en Frío",
            pt: "Gerador de Emails Frios",
            fr: "Générateur d'Emails à Froid",
            de: "Kalt-E-Mail Generator",
            it: "Generatore di Email a Freddo"
        },
        descriptions: {
            en: "Write persuasive cold emails that get responses and open doors",
            es: "Escribe emails en frío persuasivos que obtienen respuestas y abren puertas",
            pt: "Escreva emails frios persuasivos que obtêm respostas e abrem portas",
            fr: "Rédigez des emails à froid persuasifs qui obtiennent des réponses",
            de: "Schreiben Sie überzeugende Kalt-E-Mails, die Antworten erhalten",
            it: "Scrivi email a freddo persuasive che ottengono risposte"
        }
    },
    {
        platform: "email",
        slug: "follow-up-email",
        names: {
            en: "Follow-Up Email Generator",
            es: "Generador de Emails de Seguimiento",
            pt: "Gerador de Emails de Follow-Up",
            fr: "Générateur d'Emails de Suivi",
            de: "Follow-Up E-Mail Generator",
            it: "Generatore di Email di Follow-Up"
        },
        descriptions: {
            en: "Create effective follow-up emails that keep the conversation going",
            es: "Crea emails de seguimiento efectivos que mantienen la conversación",
            pt: "Crie emails de follow-up eficazes que mantêm a conversa",
            fr: "Créez des emails de suivi efficaces qui maintiennent la conversation",
            de: "Erstellen Sie effektive Follow-Up-E-Mails, die das Gespräch am Laufen halten",
            it: "Crea email di follow-up efficaci che mantengono la conversazione"
        }
    },

    // ============================================================================
    // Career Platform - More tools
    // ============================================================================
    {
        platform: "career",
        slug: "linkedin-headline",
        names: {
            en: "LinkedIn Headline Generator",
            es: "Generador de Titulares LinkedIn",
            pt: "Gerador de Headlines LinkedIn",
            fr: "Générateur de Titres LinkedIn",
            de: "LinkedIn-Überschrift Generator",
            it: "Generatore di Headline LinkedIn"
        },
        descriptions: {
            en: "Create attention-grabbing LinkedIn headlines that make recruiters click",
            es: "Crea titulares de LinkedIn llamativos que hacen que los reclutadores hagan clic",
            pt: "Crie headlines do LinkedIn chamativas que fazem os recrutadores clicarem",
            fr: "Créez des titres LinkedIn accrocheurs qui font cliquer les recruteurs",
            de: "Erstellen Sie aufmerksamkeitsstarke LinkedIn-Überschriften",
            it: "Crea headline LinkedIn accattivanti che fanno cliccare i recruiter"
        }
    },
    {
        platform: "career",
        slug: "interview-prep",
        names: {
            en: "Interview Answer Generator",
            es: "Generador de Respuestas de Entrevista",
            pt: "Gerador de Respostas de Entrevista",
            fr: "Générateur de Réponses d'Entretien",
            de: "Interview-Antwort Generator",
            it: "Generatore di Risposte Colloquio"
        },
        descriptions: {
            en: "Generate compelling answers for common interview questions using STAR method",
            es: "Genera respuestas convincentes para preguntas comunes de entrevista usando el método STAR",
            pt: "Gere respostas convincentes para perguntas comuns de entrevista usando o método STAR",
            fr: "Générez des réponses convaincantes pour les questions d'entretien courantes",
            de: "Generieren Sie überzeugende Antworten auf häufige Interviewfragen",
            it: "Genera risposte convincenti per domande comuni di colloquio usando il metodo STAR"
        }
    },
    {
        platform: "career",
        slug: "skill-summary",
        names: {
            en: "Skills Summary Generator",
            es: "Generador de Resumen de Habilidades",
            pt: "Gerador de Resumo de Habilidades",
            fr: "Générateur de Résumé de Compétences",
            de: "Kompetenz-Zusammenfassung Generator",
            it: "Generatore di Riepilogo Competenze"
        },
        descriptions: {
            en: "Create professional skills summaries that highlight your expertise",
            es: "Crea resúmenes profesionales de habilidades que destacan tu experiencia",
            pt: "Crie resumos profissionais de habilidades que destacam sua expertise",
            fr: "Créez des résumés de compétences professionnels qui mettent en valeur votre expertise",
            de: "Erstellen Sie professionelle Kompetenz-Zusammenfassungen",
            it: "Crea riepiloghi professionali di competenze che evidenziano la tua esperienza"
        }
    },

    // ============================================================================
    // Marketing Platform - More tools
    // ============================================================================
    {
        platform: "marketing",
        slug: "ad-headline",
        names: {
            en: "Ad Headline Generator",
            es: "Generador de Titulares de Anuncios",
            pt: "Gerador de Headlines de Anúncios",
            fr: "Générateur de Titres Publicitaires",
            de: "Werbe-Überschrift Generator",
            it: "Generatore di Titoli Pubblicitari"
        },
        descriptions: {
            en: "Create high-converting ad headlines that grab attention and drive clicks",
            es: "Crea titulares de anuncios de alta conversión que captan atención y generan clics",
            pt: "Crie headlines de anúncios de alta conversão que captam atenção e geram cliques",
            fr: "Créez des titres publicitaires à haute conversion qui captent l'attention",
            de: "Erstellen Sie hochkonvertierende Werbe-Überschriften",
            it: "Crea titoli pubblicitari ad alta conversione che catturano l'attenzione"
        }
    },
    {
        platform: "marketing",
        slug: "usp-generator",
        names: {
            en: "Unique Selling Point Generator",
            es: "Generador de Propuesta de Valor Única",
            pt: "Gerador de Proposta de Valor Única",
            fr: "Générateur de Proposition de Valeur Unique",
            de: "USP Generator",
            it: "Generatore di Proposta di Valore Unica"
        },
        descriptions: {
            en: "Craft compelling unique selling propositions that differentiate your brand",
            es: "Crea propuestas de valor únicas convincentes que diferencian tu marca",
            pt: "Crie propostas de valor únicas convincentes que diferenciam sua marca",
            fr: "Créez des propositions de valeur uniques qui différencient votre marque",
            de: "Erstellen Sie überzeugende USPs, die Ihre Marke differenzieren",
            it: "Crea proposte di valore uniche che differenziano il tuo brand"
        }
    },
    {
        platform: "marketing",
        slug: "cta-generator",
        names: {
            en: "Call-to-Action Generator",
            es: "Generador de Llamadas a la Acción",
            pt: "Gerador de Chamadas para Ação",
            fr: "Générateur d'Appels à l'Action",
            de: "Call-to-Action Generator",
            it: "Generatore di Call-to-Action"
        },
        descriptions: {
            en: "Generate powerful CTAs that drive conversions and user action",
            es: "Genera CTAs poderosos que impulsan conversiones y acción del usuario",
            pt: "Gere CTAs poderosos que impulsionam conversões e ação do usuário",
            fr: "Générez des CTA puissants qui stimulent les conversions",
            de: "Generieren Sie wirkungsvolle CTAs, die Conversions fördern",
            it: "Genera CTA potenti che guidano conversioni e azione dell'utente"
        }
    },

    // ============================================================================
    // Amazon - More tools
    // ============================================================================
    {
        platform: "amazon",
        slug: "bullet-points",
        names: {
            en: "Product Bullet Points Generator",
            es: "Generador de Viñetas de Producto",
            pt: "Gerador de Bullet Points de Produto",
            fr: "Générateur de Points Clés Produit",
            de: "Produkt-Aufzählungspunkte Generator",
            it: "Generatore di Bullet Points Prodotto"
        },
        descriptions: {
            en: "Create persuasive Amazon bullet points that highlight key features and benefits",
            es: "Crea viñetas de Amazon persuasivas que destacan características y beneficios clave",
            pt: "Crie bullet points da Amazon persuasivos que destacam características e benefícios",
            fr: "Créez des points clés Amazon persuasifs qui mettent en valeur les caractéristiques",
            de: "Erstellen Sie überzeugende Amazon-Aufzählungspunkte",
            it: "Crea bullet points Amazon persuasivi che evidenziano caratteristiche e benefici"
        }
    },
    {
        platform: "amazon",
        slug: "backend-keywords",
        names: {
            en: "Backend Keywords Generator",
            es: "Generador de Palabras Clave Backend",
            pt: "Gerador de Palavras-Chave Backend",
            fr: "Générateur de Mots-Clés Backend",
            de: "Backend-Keywords Generator",
            it: "Generatore di Parole Chiave Backend"
        },
        descriptions: {
            en: "Generate optimized Amazon backend search terms to improve product visibility",
            es: "Genera términos de búsqueda backend de Amazon optimizados para mejorar la visibilidad",
            pt: "Gere termos de busca backend da Amazon otimizados para melhorar a visibilidade",
            fr: "Générez des termes de recherche backend Amazon optimisés",
            de: "Generieren Sie optimierte Amazon-Backend-Suchbegriffe",
            it: "Genera termini di ricerca backend Amazon ottimizzati per migliorare la visibilità"
        }
    },

    // ============================================================================
    // Discord - More tools
    // ============================================================================
    {
        platform: "discord",
        slug: "channel-description",
        names: {
            en: "Channel Description Generator",
            es: "Generador de Descripciones de Canal",
            pt: "Gerador de Descrições de Canal",
            fr: "Générateur de Descriptions de Canal",
            de: "Kanal-Beschreibung Generator",
            it: "Generatore di Descrizioni Canale"
        },
        descriptions: {
            en: "Create clear and engaging Discord channel descriptions that guide users",
            es: "Crea descripciones de canal de Discord claras y atractivas que guían a los usuarios",
            pt: "Crie descrições de canal Discord claras e envolventes que guiam os usuários",
            fr: "Créez des descriptions de canal Discord claires et engageantes",
            de: "Erstellen Sie klare und ansprechende Discord-Kanalbeschreibungen",
            it: "Crea descrizioni di canale Discord chiare e coinvolgenti che guidano gli utenti"
        }
    },
    {
        platform: "discord",
        slug: "event-announcement",
        names: {
            en: "Event Announcement Generator",
            es: "Generador de Anuncios de Eventos",
            pt: "Gerador de Anúncios de Eventos",
            fr: "Générateur d'Annonces d'Événements",
            de: "Event-Ankündigung Generator",
            it: "Generatore di Annunci Eventi"
        },
        descriptions: {
            en: "Create exciting Discord event announcements that boost participation",
            es: "Crea anuncios de eventos de Discord emocionantes que impulsan la participación",
            pt: "Crie anúncios de eventos Discord emocionantes que impulsionam a participação",
            fr: "Créez des annonces d'événements Discord excitantes qui stimulent la participation",
            de: "Erstellen Sie spannende Discord-Event-Ankündigungen",
            it: "Crea annunci di eventi Discord emozionanti che aumentano la partecipazione"
        }
    },

    // ============================================================================
    // Twitter/X - More tools
    // ============================================================================
    {
        platform: "twitter",
        slug: "quote-tweet",
        names: {
            en: "Quote Tweet Generator",
            es: "Generador de Quote Tweets",
            pt: "Gerador de Quote Tweets",
            fr: "Générateur de Citations Tweet",
            de: "Zitat-Tweet Generator",
            it: "Generatore di Quote Tweet"
        },
        descriptions: {
            en: "Create witty and engaging quote tweets that add value to conversations",
            es: "Crea quote tweets ingeniosos y atractivos que añaden valor a las conversaciones",
            pt: "Crie quote tweets espirituosos e envolventes que adicionam valor às conversas",
            fr: "Créez des citations tweet spirituelles et engageantes",
            de: "Erstellen Sie witzige und ansprechende Zitat-Tweets",
            it: "Crea quote tweet spiritosi e coinvolgenti che aggiungono valore alle conversazioni"
        }
    },
    {
        platform: "twitter",
        slug: "viral-hook",
        names: {
            en: "Viral Hook Generator",
            es: "Generador de Ganchos Virales",
            pt: "Gerador de Ganchos Virais",
            fr: "Générateur de Hooks Viraux",
            de: "Viraler Hook Generator",
            it: "Generatore di Hook Virali"
        },
        descriptions: {
            en: "Create attention-grabbing opening lines that make people stop scrolling",
            es: "Crea líneas de apertura llamativas que hacen que la gente deje de hacer scroll",
            pt: "Crie linhas de abertura chamativas que fazem as pessoas pararem de scrollar",
            fr: "Créez des lignes d'ouverture accrocheuses qui font arrêter le scroll",
            de: "Erstellen Sie aufmerksamkeitsstarke Eröffnungszeilen",
            it: "Crea righe di apertura accattivanti che fanno smettere di scrollare"
        }
    },

    // ============================================================================
    // LinkedIn - More tools
    // ============================================================================
    {
        platform: "linkedin",
        slug: "post-generator",
        names: {
            en: "LinkedIn Post Generator",
            es: "Generador de Posts de LinkedIn",
            pt: "Gerador de Posts do LinkedIn",
            fr: "Générateur de Posts LinkedIn",
            de: "LinkedIn-Post Generator",
            it: "Generatore di Post LinkedIn"
        },
        descriptions: {
            en: "Create engaging LinkedIn posts that drive engagement and grow your network",
            es: "Crea posts de LinkedIn atractivos que impulsan el engagement y hacen crecer tu red",
            pt: "Crie posts do LinkedIn envolventes que impulsionam o engajamento",
            fr: "Créez des posts LinkedIn engageants qui stimulent l'engagement",
            de: "Erstellen Sie ansprechende LinkedIn-Posts",
            it: "Crea post LinkedIn coinvolgenti che guidano l'engagement e fanno crescere il network"
        }
    },
    {
        platform: "linkedin",
        slug: "recommendation",
        names: {
            en: "Recommendation Generator",
            es: "Generador de Recomendaciones",
            pt: "Gerador de Recomendações",
            fr: "Générateur de Recommandations",
            de: "Empfehlungs-Generator",
            it: "Generatore di Raccomandazioni"
        },
        descriptions: {
            en: "Write professional LinkedIn recommendations that highlight colleagues' strengths",
            es: "Escribe recomendaciones profesionales de LinkedIn que destacan las fortalezas de colegas",
            pt: "Escreva recomendações profissionais do LinkedIn que destacam os pontos fortes",
            fr: "Rédigez des recommandations LinkedIn professionnelles",
            de: "Schreiben Sie professionelle LinkedIn-Empfehlungen",
            it: "Scrivi raccomandazioni LinkedIn professionali che evidenziano i punti di forza"
        }
    },

    // ============================================================================
    // Reddit - More tools
    // ============================================================================
    {
        platform: "reddit",
        slug: "comment-generator",
        names: {
            en: "Reddit Comment Generator",
            es: "Generador de Comentarios de Reddit",
            pt: "Gerador de Comentários do Reddit",
            fr: "Générateur de Commentaires Reddit",
            de: "Reddit-Kommentar Generator",
            it: "Generatore di Commenti Reddit"
        },
        descriptions: {
            en: "Create insightful Reddit comments that add value and earn karma",
            es: "Crea comentarios de Reddit perspicaces que añaden valor y ganan karma",
            pt: "Crie comentários do Reddit perspicazes que adicionam valor e ganham karma",
            fr: "Créez des commentaires Reddit perspicaces qui ajoutent de la valeur",
            de: "Erstellen Sie aufschlussreiche Reddit-Kommentare",
            it: "Crea commenti Reddit perspicaci che aggiungono valore e guadagnano karma"
        }
    },
    {
        platform: "reddit",
        slug: "ama-question",
        names: {
            en: "AMA Question Generator",
            es: "Generador de Preguntas AMA",
            pt: "Gerador de Perguntas AMA",
            fr: "Générateur de Questions AMA",
            de: "AMA-Fragen Generator",
            it: "Generatore di Domande AMA"
        },
        descriptions: {
            en: "Generate thoughtful questions for Reddit AMAs that get noticed and answered",
            es: "Genera preguntas reflexivas para AMAs de Reddit que son notadas y respondidas",
            pt: "Gere perguntas reflexivas para AMAs do Reddit que são notadas e respondidas",
            fr: "Générez des questions réfléchies pour les AMA Reddit",
            de: "Generieren Sie durchdachte Fragen für Reddit AMAs",
            it: "Genera domande riflessive per AMA Reddit che vengono notate e risposte"
        }
    },

    // ============================================================================
    // Snapchat - More tools  
    // ============================================================================
    {
        platform: "snapchat",
        slug: "spotlight-caption",
        names: {
            en: "Spotlight Caption Generator",
            es: "Generador de Captions de Spotlight",
            pt: "Gerador de Captions de Spotlight",
            fr: "Générateur de Captions Spotlight",
            de: "Spotlight-Caption Generator",
            it: "Generatore di Caption Spotlight"
        },
        descriptions: {
            en: "Create catchy captions for Snapchat Spotlight that boost views and engagement",
            es: "Crea captions llamativos para Snapchat Spotlight que aumentan vistas y engagement",
            pt: "Crie captions chamativas para Snapchat Spotlight que aumentam visualizações",
            fr: "Créez des captions accrocheurs pour Snapchat Spotlight",
            de: "Erstellen Sie einprägsame Captions für Snapchat Spotlight",
            it: "Crea caption accattivanti per Snapchat Spotlight che aumentano visualizzazioni"
        }
    },
    {
        platform: "snapchat",
        slug: "story-ideas",
        names: {
            en: "Story Ideas Generator",
            es: "Generador de Ideas para Stories",
            pt: "Gerador de Ideias para Stories",
            fr: "Générateur d'Idées de Stories",
            de: "Story-Ideen Generator",
            it: "Generatore di Idee per Stories"
        },
        descriptions: {
            en: "Get creative Snapchat story ideas that keep your audience engaged",
            es: "Obtén ideas creativas de stories de Snapchat que mantienen a tu audiencia enganchada",
            pt: "Obtenha ideias criativas de stories do Snapchat que mantêm sua audiência engajada",
            fr: "Obtenez des idées créatives de stories Snapchat",
            de: "Erhalten Sie kreative Snapchat-Story-Ideen",
            it: "Ottieni idee creative per stories Snapchat che mantengono il pubblico coinvolto"
        }
    },

    // ============================================================================
    // Pinterest - More tools
    // ============================================================================
    {
        platform: "pinterest",
        slug: "board-description",
        names: {
            en: "Board Description Generator",
            es: "Generador de Descripciones de Tableros",
            pt: "Gerador de Descrições de Painéis",
            fr: "Générateur de Descriptions de Tableaux",
            de: "Board-Beschreibung Generator",
            it: "Generatore di Descrizioni Bacheche"
        },
        descriptions: {
            en: "Create SEO-optimized Pinterest board descriptions that attract followers",
            es: "Crea descripciones de tableros de Pinterest optimizadas para SEO que atraen seguidores",
            pt: "Crie descrições de painéis do Pinterest otimizadas para SEO",
            fr: "Créez des descriptions de tableaux Pinterest optimisées SEO",
            de: "Erstellen Sie SEO-optimierte Pinterest-Board-Beschreibungen",
            it: "Crea descrizioni di bacheche Pinterest ottimizzate SEO che attirano follower"
        }
    },
    {
        platform: "pinterest",
        slug: "idea-pin-script",
        names: {
            en: "Idea Pin Script Generator",
            es: "Generador de Scripts para Idea Pins",
            pt: "Gerador de Scripts para Idea Pins",
            fr: "Générateur de Scripts Idea Pin",
            de: "Idea-Pin Skript Generator",
            it: "Generatore di Script Idea Pin"
        },
        descriptions: {
            en: "Create engaging scripts for Pinterest Idea Pins that tell compelling stories",
            es: "Crea scripts atractivos para Idea Pins de Pinterest que cuentan historias convincentes",
            pt: "Crie scripts envolventes para Idea Pins do Pinterest",
            fr: "Créez des scripts engageants pour les Idea Pins Pinterest",
            de: "Erstellen Sie ansprechende Skripte für Pinterest Idea Pins",
            it: "Crea script coinvolgenti per Idea Pin Pinterest che raccontano storie avvincenti"
        }
    },

    // ============================================================================
    // YouTube - More tools
    // ============================================================================
    {
        platform: "youtube",
        slug: "thumbnail-text",
        names: {
            en: "Thumbnail Text Generator",
            es: "Generador de Texto para Miniaturas",
            pt: "Gerador de Texto para Miniaturas",
            fr: "Générateur de Texte Miniature",
            de: "Thumbnail-Text Generator",
            it: "Generatore di Testo Miniature"
        },
        descriptions: {
            en: "Create short, punchy text for YouTube thumbnails that maximize CTR",
            es: "Crea texto corto e impactante para miniaturas de YouTube que maximiza el CTR",
            pt: "Crie texto curto e impactante para miniaturas do YouTube que maximiza o CTR",
            fr: "Créez du texte court et percutant pour les miniatures YouTube",
            de: "Erstellen Sie kurzen, prägnanten Text für YouTube-Thumbnails",
            it: "Crea testo breve e incisivo per miniature YouTube che massimizza il CTR"
        }
    },
    {
        platform: "youtube",
        slug: "shorts-hook",
        names: {
            en: "Shorts Hook Generator",
            es: "Generador de Ganchos para Shorts",
            pt: "Gerador de Ganchos para Shorts",
            fr: "Générateur de Hooks Shorts",
            de: "Shorts-Hook Generator",
            it: "Generatore di Hook per Shorts"
        },
        descriptions: {
            en: "Create attention-grabbing hooks for YouTube Shorts in the first 3 seconds",
            es: "Crea ganchos llamativos para YouTube Shorts en los primeros 3 segundos",
            pt: "Crie ganchos chamativas para YouTube Shorts nos primeiros 3 segundos",
            fr: "Créez des hooks accrocheurs pour YouTube Shorts dans les 3 premières secondes",
            de: "Erstellen Sie aufmerksamkeitsstarke Hooks für YouTube Shorts",
            it: "Crea hook accattivanti per YouTube Shorts nei primi 3 secondi"
        }
    },

    // ============================================================================
    // Instagram - More tools
    // ============================================================================
    {
        platform: "instagram",
        slug: "reels-script",
        names: {
            en: "Reels Script Generator",
            es: "Generador de Scripts para Reels",
            pt: "Gerador de Scripts para Reels",
            fr: "Générateur de Scripts Reels",
            de: "Reels-Skript Generator",
            it: "Generatore di Script per Reels"
        },
        descriptions: {
            en: "Create viral Instagram Reels scripts with trending hooks and engaging content",
            es: "Crea scripts virales de Instagram Reels con ganchos de tendencia y contenido atractivo",
            pt: "Crie scripts virais de Instagram Reels com ganchos de tendência",
            fr: "Créez des scripts de Reels Instagram viraux avec des hooks tendance",
            de: "Erstellen Sie virale Instagram Reels-Skripte mit trendigen Hooks",
            it: "Crea script virali per Instagram Reels con hook di tendenza e contenuti coinvolgenti"
        }
    },
    {
        platform: "instagram",
        slug: "story-poll",
        names: {
            en: "Story Poll Ideas Generator",
            es: "Generador de Ideas para Encuestas",
            pt: "Gerador de Ideias para Enquetes",
            fr: "Générateur d'Idées de Sondages",
            de: "Story-Umfrage Ideen Generator",
            it: "Generatore di Idee per Sondaggi"
        },
        descriptions: {
            en: "Generate engaging Instagram story poll questions that boost interaction",
            es: "Genera preguntas de encuestas de stories atractivas que impulsan la interacción",
            pt: "Gere perguntas de enquetes de stories envolventes que impulsionam a interação",
            fr: "Générez des questions de sondage Stories engageantes",
            de: "Generieren Sie ansprechende Instagram Story-Umfragefragen",
            it: "Genera domande di sondaggio per stories coinvolgenti che aumentano l'interazione"
        }
    }
];

async function main() {
    console.log("🚀 Uploading more tools to Appwrite...\n");

    let created = 0;
    let skipped = 0;
    let errors = 0;

    for (const tool of NEW_TOOLS) {
        for (const lang of LANGUAGES) {
            const exists = await checkExists(tool.platform, tool.slug, lang);

            if (exists) {
                console.log(`⏭️  Skipping ${tool.platform}/${tool.slug} (${lang}) - already exists`);
                skipped++;
                continue;
            }

            try {
                await databases.createDocument(
                    DATABASE_ID,
                    TOOLS_COLLECTION_ID,
                    ID.unique(),
                    {
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
                    }
                );
                console.log(`✅ Created: ${tool.platform}/${tool.slug} (${lang})`);
                created++;
            } catch (error) {
                console.error(`❌ Error creating ${tool.platform}/${tool.slug} (${lang}):`, error.message);
                errors++;
            }
        }
    }

    console.log("\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
    console.log(`📊 Upload Summary`);
    console.log(`   ✅ Created: ${created}`);
    console.log(`   ⏭️  Skipped: ${skipped}`);
    console.log(`   ❌ Errors: ${errors}`);
    console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n");
}

main();
