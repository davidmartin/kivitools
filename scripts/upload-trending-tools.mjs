#!/usr/bin/env node
/**
 * Upload Trending AI Tools to Appwrite
 * Based on market research of most searched AI tools in 2024-2025
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

// High-demand trending tools based on search volume research
const TRENDING_TOOLS = [
    // AI Writing & Content
    {
        platform: "content",
        slug: "blog-intro-generator",
        names: {
            en: "Blog Intro Generator",
            es: "Generador de Introducciones para Blog",
            pt: "Gerador de Introduções para Blog",
            fr: "Générateur d'Introductions de Blog",
            de: "Blog-Intro-Generator",
            it: "Generatore di Introduzioni per Blog",
        },
        descriptions: {
            en: "Create captivating blog introductions that hook readers from the first sentence and keep them reading",
            es: "Crea introducciones de blog cautivadoras que enganchen a los lectores desde la primera frase",
            pt: "Crie introduções de blog cativantes que prendam os leitores desde a primeira frase",
            fr: "Créez des introductions de blog captivantes qui accrochent les lecteurs dès la première phrase",
            de: "Erstellen Sie fesselnde Blog-Intros, die Leser ab dem ersten Satz fesseln",
            it: "Crea introduzioni per blog accattivanti che catturano i lettori dalla prima frase",
        },
    },
    {
        platform: "content",
        slug: "article-outline-generator",
        names: {
            en: "Article Outline Generator",
            es: "Generador de Esquemas de Artículos",
            pt: "Gerador de Esboços de Artigos",
            fr: "Générateur de Plans d'Articles",
            de: "Artikel-Gliederungs-Generator",
            it: "Generatore di Schemi per Articoli",
        },
        descriptions: {
            en: "Generate structured article outlines with headings and subheadings for organized content creation",
            es: "Genera esquemas estructurados de artículos con títulos y subtítulos para crear contenido organizado",
            pt: "Gere esboços estruturados de artigos com títulos e subtítulos para criação de conteúdo organizado",
            fr: "Générez des plans d'articles structurés avec titres et sous-titres pour une création de contenu organisée",
            de: "Generieren Sie strukturierte Artikelgliederungen mit Überschriften für organisierte Inhaltserstellung",
            it: "Genera schemi strutturati di articoli con titoli e sottotitoli per la creazione di contenuti organizzati",
        },
    },
    {
        platform: "content",
        slug: "paragraph-rewriter",
        names: {
            en: "Paragraph Rewriter",
            es: "Reescritor de Párrafos",
            pt: "Reescritor de Parágrafos",
            fr: "Réécriveur de Paragraphes",
            de: "Absatz-Umschreiber",
            it: "Riscrittore di Paragrafi",
        },
        descriptions: {
            en: "Rewrite paragraphs to improve clarity, tone, and engagement while maintaining the original meaning",
            es: "Reescribe párrafos para mejorar claridad, tono y engagement manteniendo el significado original",
            pt: "Reescreva parágrafos para melhorar clareza, tom e engajamento mantendo o significado original",
            fr: "Réécrivez des paragraphes pour améliorer la clarté, le ton et l'engagement tout en conservant le sens original",
            de: "Schreiben Sie Absätze um, um Klarheit, Ton und Engagement zu verbessern",
            it: "Riscrivi paragrafi per migliorare chiarezza, tono e coinvolgimento mantenendo il significato originale",
        },
    },
    {
        platform: "content",
        slug: "sentence-expander",
        names: {
            en: "Sentence Expander",
            es: "Expansor de Oraciones",
            pt: "Expansor de Frases",
            fr: "Développeur de Phrases",
            de: "Satz-Erweiterer",
            it: "Espansore di Frasi",
        },
        descriptions: {
            en: "Transform short sentences into detailed, engaging paragraphs with more context and depth",
            es: "Transforma oraciones cortas en párrafos detallados y atractivos con más contexto y profundidad",
            pt: "Transforme frases curtas em parágrafos detalhados e envolventes com mais contexto e profundidade",
            fr: "Transformez des phrases courtes en paragraphes détaillés et engageants avec plus de contexte",
            de: "Verwandeln Sie kurze Sätze in detaillierte, ansprechende Absätze mit mehr Kontext",
            it: "Trasforma frasi brevi in paragrafi dettagliati e coinvolgenti con più contesto e profondità",
        },
    },
    // AI SEO Tools (High demand)
    {
        platform: "seo",
        slug: "meta-title-generator",
        names: {
            en: "Meta Title Generator",
            es: "Generador de Meta Títulos",
            pt: "Gerador de Meta Títulos",
            fr: "Générateur de Meta Titres",
            de: "Meta-Titel-Generator",
            it: "Generatore di Meta Titoli",
        },
        descriptions: {
            en: "Create SEO-optimized meta titles that improve click-through rates and search rankings",
            es: "Crea meta títulos optimizados para SEO que mejoran las tasas de clics y rankings de búsqueda",
            pt: "Crie meta títulos otimizados para SEO que melhoram taxas de clique e rankings de busca",
            fr: "Créez des meta titres optimisés pour le SEO qui améliorent les taux de clics et les classements",
            de: "Erstellen Sie SEO-optimierte Meta-Titel, die Klickraten und Suchrankings verbessern",
            it: "Crea meta titoli ottimizzati per SEO che migliorano i tassi di clic e i ranking di ricerca",
        },
    },
    {
        platform: "seo",
        slug: "keyword-cluster-generator",
        names: {
            en: "Keyword Cluster Generator",
            es: "Generador de Clusters de Palabras Clave",
            pt: "Gerador de Clusters de Palavras-chave",
            fr: "Générateur de Clusters de Mots-clés",
            de: "Keyword-Cluster-Generator",
            it: "Generatore di Cluster di Parole Chiave",
        },
        descriptions: {
            en: "Group related keywords into topical clusters for better content strategy and SEO planning",
            es: "Agrupa palabras clave relacionadas en clusters temáticos para mejor estrategia de contenido y SEO",
            pt: "Agrupe palavras-chave relacionadas em clusters temáticos para melhor estratégia de conteúdo e SEO",
            fr: "Regroupez les mots-clés associés en clusters thématiques pour une meilleure stratégie de contenu",
            de: "Gruppieren Sie verwandte Keywords in thematische Cluster für bessere Content-Strategie",
            it: "Raggruppa parole chiave correlate in cluster tematici per una migliore strategia di contenuto e SEO",
        },
    },
    {
        platform: "seo",
        slug: "faq-schema-generator",
        names: {
            en: "FAQ Schema Generator",
            es: "Generador de Esquema FAQ",
            pt: "Gerador de Schema FAQ",
            fr: "Générateur de Schéma FAQ",
            de: "FAQ-Schema-Generator",
            it: "Generatore di Schema FAQ",
        },
        descriptions: {
            en: "Generate structured FAQ schema markup for rich snippets and improved search visibility",
            es: "Genera marcado de esquema FAQ estructurado para fragmentos enriquecidos y mejor visibilidad en búsquedas",
            pt: "Gere marcação de schema FAQ estruturada para rich snippets e melhor visibilidade nas buscas",
            fr: "Générez un balisage de schéma FAQ structuré pour les extraits enrichis et une meilleure visibilité",
            de: "Generieren Sie strukturiertes FAQ-Schema-Markup für Rich Snippets und bessere Sichtbarkeit",
            it: "Genera markup di schema FAQ strutturato per rich snippet e migliore visibilità nelle ricerche",
        },
    },
    // AI Presentation Tools
    {
        platform: "presentation",
        slug: "slide-content-generator",
        names: {
            en: "Slide Content Generator",
            es: "Generador de Contenido para Diapositivas",
            pt: "Gerador de Conteúdo para Slides",
            fr: "Générateur de Contenu pour Diapositives",
            de: "Folien-Inhalt-Generator",
            it: "Generatore di Contenuti per Slide",
        },
        descriptions: {
            en: "Generate compelling bullet points and content for presentation slides that engage your audience",
            es: "Genera puntos clave y contenido convincente para diapositivas de presentación que cautiven a tu audiencia",
            pt: "Gere pontos-chave e conteúdo convincente para slides de apresentação que envolvam seu público",
            fr: "Générez des points clés et du contenu convaincant pour des diapositives qui captent votre audience",
            de: "Generieren Sie überzeugende Aufzählungspunkte und Inhalte für Präsentationsfolien",
            it: "Genera punti elenco e contenuti convincenti per slide di presentazione che coinvolgano il pubblico",
        },
    },
    {
        platform: "presentation",
        slug: "presentation-outline-generator",
        names: {
            en: "Presentation Outline Generator",
            es: "Generador de Esquemas de Presentación",
            pt: "Gerador de Esboços de Apresentação",
            fr: "Générateur de Plans de Présentation",
            de: "Präsentations-Gliederungs-Generator",
            it: "Generatore di Schemi di Presentazione",
        },
        descriptions: {
            en: "Create structured presentation outlines with sections, key points, and talking points",
            es: "Crea esquemas estructurados de presentación con secciones, puntos clave y notas para hablar",
            pt: "Crie esboços estruturados de apresentação com seções, pontos-chave e notas de fala",
            fr: "Créez des plans de présentation structurés avec sections, points clés et notes de discussion",
            de: "Erstellen Sie strukturierte Präsentationsgliederungen mit Abschnitten und Schlüsselpunkten",
            it: "Crea schemi di presentazione strutturati con sezioni, punti chiave e note per parlare",
        },
    },
    {
        platform: "presentation",
        slug: "pitch-deck-generator",
        names: {
            en: "Pitch Deck Generator",
            es: "Generador de Pitch Deck",
            pt: "Gerador de Pitch Deck",
            fr: "Générateur de Pitch Deck",
            de: "Pitch-Deck-Generator",
            it: "Generatore di Pitch Deck",
        },
        descriptions: {
            en: "Create compelling startup pitch deck content that attracts investors and tells your story",
            es: "Crea contenido de pitch deck convincente para startups que atraiga inversores y cuente tu historia",
            pt: "Crie conteúdo de pitch deck convincente para startups que atraia investidores e conte sua história",
            fr: "Créez du contenu de pitch deck convaincant pour startups qui attire les investisseurs",
            de: "Erstellen Sie überzeugende Startup-Pitch-Deck-Inhalte, die Investoren anziehen",
            it: "Crea contenuti per pitch deck convincenti per startup che attraggano investitori e raccontino la tua storia",
        },
    },
    // AI Email Templates (High demand)
    {
        platform: "email",
        slug: "meeting-request-email",
        names: {
            en: "Meeting Request Email Generator",
            es: "Generador de Emails para Solicitar Reuniones",
            pt: "Gerador de Emails para Solicitar Reuniões",
            fr: "Générateur d'Emails de Demande de Réunion",
            de: "Meeting-Anfrage-Email-Generator",
            it: "Generatore di Email per Richiedere Riunioni",
        },
        descriptions: {
            en: "Write professional meeting request emails that get accepted and scheduled quickly",
            es: "Escribe emails profesionales para solicitar reuniones que sean aceptados y agendados rápidamente",
            pt: "Escreva emails profissionais para solicitar reuniões que sejam aceitos e agendados rapidamente",
            fr: "Écrivez des emails professionnels de demande de réunion qui sont acceptés et programmés rapidement",
            de: "Schreiben Sie professionelle Meeting-Anfrage-E-Mails, die schnell akzeptiert werden",
            it: "Scrivi email professionali per richiedere riunioni che vengano accettate e programmate rapidamente",
        },
    },
    {
        platform: "email",
        slug: "thank-you-email",
        names: {
            en: "Thank You Email Generator",
            es: "Generador de Emails de Agradecimiento",
            pt: "Gerador de Emails de Agradecimento",
            fr: "Générateur d'Emails de Remerciement",
            de: "Dankes-Email-Generator",
            it: "Generatore di Email di Ringraziamento",
        },
        descriptions: {
            en: "Create thoughtful thank you emails for interviews, meetings, and business relationships",
            es: "Crea emails de agradecimiento reflexivos para entrevistas, reuniones y relaciones comerciales",
            pt: "Crie emails de agradecimento atenciosos para entrevistas, reuniões e relacionamentos comerciais",
            fr: "Créez des emails de remerciement réfléchis pour entretiens, réunions et relations professionnelles",
            de: "Erstellen Sie durchdachte Dankes-E-Mails für Interviews, Meetings und Geschäftsbeziehungen",
            it: "Crea email di ringraziamento premurosi per colloqui, riunioni e relazioni commerciali",
        },
    },
    {
        platform: "email",
        slug: "apology-email",
        names: {
            en: "Apology Email Generator",
            es: "Generador de Emails de Disculpa",
            pt: "Gerador de Emails de Desculpas",
            fr: "Générateur d'Emails d'Excuses",
            de: "Entschuldigungs-Email-Generator",
            it: "Generatore di Email di Scuse",
        },
        descriptions: {
            en: "Write sincere apology emails that rebuild trust and maintain professional relationships",
            es: "Escribe emails de disculpa sinceros que reconstruyan la confianza y mantengan relaciones profesionales",
            pt: "Escreva emails de desculpas sinceros que reconstruam a confiança e mantenham relacionamentos profissionais",
            fr: "Écrivez des emails d'excuses sincères qui reconstruisent la confiance et maintiennent les relations professionnelles",
            de: "Schreiben Sie aufrichtige Entschuldigungs-E-Mails, die Vertrauen wiederherstellen",
            it: "Scrivi email di scuse sincere che ricostruiscano la fiducia e mantengano le relazioni professionali",
        },
    },
    // AI Resume/Career (Very High demand)
    {
        platform: "career",
        slug: "cover-letter-generator",
        names: {
            en: "Cover Letter Generator",
            es: "Generador de Cartas de Presentación",
            pt: "Gerador de Cartas de Apresentação",
            fr: "Générateur de Lettres de Motivation",
            de: "Anschreiben-Generator",
            it: "Generatore di Lettere di Presentazione",
        },
        descriptions: {
            en: "Create personalized cover letters that highlight your skills and match job requirements",
            es: "Crea cartas de presentación personalizadas que destaquen tus habilidades y coincidan con los requisitos del trabajo",
            pt: "Crie cartas de apresentação personalizadas que destaquem suas habilidades e correspondam aos requisitos da vaga",
            fr: "Créez des lettres de motivation personnalisées qui mettent en valeur vos compétences",
            de: "Erstellen Sie personalisierte Anschreiben, die Ihre Fähigkeiten hervorheben",
            it: "Crea lettere di presentazione personalizzate che evidenzino le tue competenze e corrispondano ai requisiti del lavoro",
        },
    },
    {
        platform: "career",
        slug: "resume-bullet-generator",
        names: {
            en: "Resume Bullet Point Generator",
            es: "Generador de Puntos para Currículum",
            pt: "Gerador de Pontos para Currículo",
            fr: "Générateur de Points pour CV",
            de: "Lebenslauf-Aufzählungspunkt-Generator",
            it: "Generatore di Punti Elenco per CV",
        },
        descriptions: {
            en: "Transform job duties into impactful resume bullet points that showcase achievements",
            es: "Transforma tareas laborales en puntos de currículum impactantes que muestren logros",
            pt: "Transforme tarefas de trabalho em pontos de currículo impactantes que mostrem conquistas",
            fr: "Transformez les tâches professionnelles en points de CV percutants qui mettent en valeur les réalisations",
            de: "Verwandeln Sie Arbeitsaufgaben in wirkungsvolle Lebenslauf-Punkte, die Erfolge zeigen",
            it: "Trasforma le mansioni lavorative in punti elenco per CV di impatto che mostrino i risultati",
        },
    },
    {
        platform: "career",
        slug: "resignation-letter-generator",
        names: {
            en: "Resignation Letter Generator",
            es: "Generador de Cartas de Renuncia",
            pt: "Gerador de Cartas de Demissão",
            fr: "Générateur de Lettres de Démission",
            de: "Kündigungsschreiben-Generator",
            it: "Generatore di Lettere di Dimissioni",
        },
        descriptions: {
            en: "Write professional resignation letters that maintain good relationships with employers",
            es: "Escribe cartas de renuncia profesionales que mantengan buenas relaciones con los empleadores",
            pt: "Escreva cartas de demissão profissionais que mantenham bons relacionamentos com empregadores",
            fr: "Écrivez des lettres de démission professionnelles qui maintiennent de bonnes relations avec les employeurs",
            de: "Schreiben Sie professionelle Kündigungsschreiben, die gute Beziehungen zu Arbeitgebern bewahren",
            it: "Scrivi lettere di dimissioni professionali che mantengano buoni rapporti con i datori di lavoro",
        },
    },
    // AI Video Content (High demand)
    {
        platform: "youtube",
        slug: "video-intro-script",
        names: {
            en: "Video Intro Script Generator",
            es: "Generador de Guiones de Intro para Videos",
            pt: "Gerador de Scripts de Introdução para Vídeos",
            fr: "Générateur de Scripts d'Intro Vidéo",
            de: "Video-Intro-Skript-Generator",
            it: "Generatore di Script di Intro per Video",
        },
        descriptions: {
            en: "Create engaging video introduction scripts that hook viewers in the first 10 seconds",
            es: "Crea guiones de introducción de video atractivos que enganchen a los espectadores en los primeros 10 segundos",
            pt: "Crie scripts de introdução de vídeo envolventes que prendam os espectadores nos primeiros 10 segundos",
            fr: "Créez des scripts d'introduction vidéo engageants qui accrochent les spectateurs dans les 10 premières secondes",
            de: "Erstellen Sie ansprechende Video-Intro-Skripte, die Zuschauer in den ersten 10 Sekunden fesseln",
            it: "Crea script di introduzione video coinvolgenti che catturino gli spettatori nei primi 10 secondi",
        },
    },
    {
        platform: "youtube",
        slug: "video-outro-script",
        names: {
            en: "Video Outro Script Generator",
            es: "Generador de Guiones de Outro para Videos",
            pt: "Gerador de Scripts de Outro para Vídeos",
            fr: "Générateur de Scripts d'Outro Vidéo",
            de: "Video-Outro-Skript-Generator",
            it: "Generatore di Script di Outro per Video",
        },
        descriptions: {
            en: "Create compelling video outro scripts with call-to-actions that drive subscriptions and engagement",
            es: "Crea guiones de outro de video convincentes con llamadas a la acción que impulsen suscripciones y engagement",
            pt: "Crie scripts de outro de vídeo convincentes com CTAs que impulsionem inscrições e engajamento",
            fr: "Créez des scripts d'outro vidéo convaincants avec des CTA qui stimulent les abonnements et l'engagement",
            de: "Erstellen Sie überzeugende Video-Outro-Skripte mit CTAs, die Abonnements und Engagement fördern",
            it: "Crea script di outro video convincenti con CTA che stimolino iscrizioni e coinvolgimento",
        },
    },
    {
        platform: "youtube",
        slug: "youtube-shorts-script",
        names: {
            en: "YouTube Shorts Script Generator",
            es: "Generador de Guiones para YouTube Shorts",
            pt: "Gerador de Scripts para YouTube Shorts",
            fr: "Générateur de Scripts YouTube Shorts",
            de: "YouTube-Shorts-Skript-Generator",
            it: "Generatore di Script per YouTube Shorts",
        },
        descriptions: {
            en: "Create viral-worthy short-form video scripts optimized for YouTube Shorts format",
            es: "Crea guiones de videos cortos dignos de viralidad optimizados para el formato YouTube Shorts",
            pt: "Crie scripts de vídeos curtos virais otimizados para o formato YouTube Shorts",
            fr: "Créez des scripts de vidéos courtes virales optimisés pour le format YouTube Shorts",
            de: "Erstellen Sie virale Kurzform-Video-Skripte, optimiert für das YouTube Shorts-Format",
            it: "Crea script per video brevi virali ottimizzati per il formato YouTube Shorts",
        },
    },
    // AI Image/Art Prompts (Very High demand)
    {
        platform: "ai-art",
        slug: "midjourney-prompt-generator",
        names: {
            en: "Midjourney Prompt Generator",
            es: "Generador de Prompts para Midjourney",
            pt: "Gerador de Prompts para Midjourney",
            fr: "Générateur de Prompts Midjourney",
            de: "Midjourney-Prompt-Generator",
            it: "Generatore di Prompt per Midjourney",
        },
        descriptions: {
            en: "Create detailed Midjourney prompts with style parameters, aspect ratios, and artistic directions",
            es: "Crea prompts detallados para Midjourney con parámetros de estilo, proporciones y direcciones artísticas",
            pt: "Crie prompts detalhados para Midjourney com parâmetros de estilo, proporções e direções artísticas",
            fr: "Créez des prompts Midjourney détaillés avec paramètres de style, ratios et directions artistiques",
            de: "Erstellen Sie detaillierte Midjourney-Prompts mit Stilparametern, Seitenverhältnissen und künstlerischen Richtungen",
            it: "Crea prompt Midjourney dettagliati con parametri di stile, proporzioni e direzioni artistiche",
        },
    },
    {
        platform: "ai-art",
        slug: "stable-diffusion-prompt",
        names: {
            en: "Stable Diffusion Prompt Generator",
            es: "Generador de Prompts para Stable Diffusion",
            pt: "Gerador de Prompts para Stable Diffusion",
            fr: "Générateur de Prompts Stable Diffusion",
            de: "Stable-Diffusion-Prompt-Generator",
            it: "Generatore di Prompt per Stable Diffusion",
        },
        descriptions: {
            en: "Generate optimized Stable Diffusion prompts with negative prompts and style weights",
            es: "Genera prompts optimizados para Stable Diffusion con prompts negativos y pesos de estilo",
            pt: "Gere prompts otimizados para Stable Diffusion com prompts negativos e pesos de estilo",
            fr: "Générez des prompts Stable Diffusion optimisés avec prompts négatifs et poids de style",
            de: "Generieren Sie optimierte Stable Diffusion-Prompts mit negativen Prompts und Stil-Gewichten",
            it: "Genera prompt Stable Diffusion ottimizzati con prompt negativi e pesi di stile",
        },
    },
    {
        platform: "ai-art",
        slug: "dall-e-prompt-generator",
        names: {
            en: "DALL-E Prompt Generator",
            es: "Generador de Prompts para DALL-E",
            pt: "Gerador de Prompts para DALL-E",
            fr: "Générateur de Prompts DALL-E",
            de: "DALL-E-Prompt-Generator",
            it: "Generatore di Prompt per DALL-E",
        },
        descriptions: {
            en: "Create effective DALL-E prompts for stunning AI-generated images with detailed descriptions",
            es: "Crea prompts efectivos para DALL-E para imágenes generadas por IA impresionantes con descripciones detalladas",
            pt: "Crie prompts eficazes para DALL-E para imagens geradas por IA impressionantes com descrições detalhadas",
            fr: "Créez des prompts DALL-E efficaces pour des images IA époustouflantes avec des descriptions détaillées",
            de: "Erstellen Sie effektive DALL-E-Prompts für atemberaubende KI-generierte Bilder",
            it: "Crea prompt DALL-E efficaci per immagini generate dall'IA straordinarie con descrizioni dettagliate",
        },
    },
    // AI Social Media (High demand)
    {
        platform: "instagram",
        slug: "instagram-reel-script",
        names: {
            en: "Instagram Reel Script Generator",
            es: "Generador de Guiones para Reels de Instagram",
            pt: "Gerador de Scripts para Reels do Instagram",
            fr: "Générateur de Scripts de Reels Instagram",
            de: "Instagram-Reels-Skript-Generator",
            it: "Generatore di Script per Reels di Instagram",
        },
        descriptions: {
            en: "Create engaging Instagram Reel scripts with hooks, main content, and call-to-actions",
            es: "Crea guiones atractivos para Reels de Instagram con ganchos, contenido principal y llamadas a la acción",
            pt: "Crie scripts envolventes para Reels do Instagram com ganchos, conteúdo principal e CTAs",
            fr: "Créez des scripts de Reels Instagram engageants avec accroches, contenu principal et CTA",
            de: "Erstellen Sie ansprechende Instagram-Reels-Skripte mit Hooks, Hauptinhalt und CTAs",
            it: "Crea script coinvolgenti per Reels di Instagram con hook, contenuto principale e CTA",
        },
    },
    {
        platform: "instagram",
        slug: "carousel-content-generator",
        names: {
            en: "Instagram Carousel Content Generator",
            es: "Generador de Contenido para Carrusel de Instagram",
            pt: "Gerador de Conteúdo para Carrossel do Instagram",
            fr: "Générateur de Contenu Carrousel Instagram",
            de: "Instagram-Karussell-Inhalt-Generator",
            it: "Generatore di Contenuti per Carosello di Instagram",
        },
        descriptions: {
            en: "Create educational carousel post content with slide-by-slide text for maximum engagement",
            es: "Crea contenido educativo para posts de carrusel con texto diapositiva por diapositiva para máximo engagement",
            pt: "Crie conteúdo educacional para posts de carrossel com texto slide por slide para máximo engajamento",
            fr: "Créez du contenu éducatif pour posts carrousel avec texte slide par slide pour un engagement maximum",
            de: "Erstellen Sie lehrreiche Karussell-Post-Inhalte mit Folie-für-Folie-Text für maximales Engagement",
            it: "Crea contenuti educativi per post carosello con testo slide per slide per massimo coinvolgimento",
        },
    },
    // AI Business/Marketing (High demand)
    {
        platform: "marketing",
        slug: "product-description-generator",
        names: {
            en: "Product Description Generator",
            es: "Generador de Descripciones de Productos",
            pt: "Gerador de Descrições de Produtos",
            fr: "Générateur de Descriptions de Produits",
            de: "Produktbeschreibungs-Generator",
            it: "Generatore di Descrizioni di Prodotti",
        },
        descriptions: {
            en: "Create compelling product descriptions that highlight features, benefits, and drive sales",
            es: "Crea descripciones de productos convincentes que destaquen características, beneficios e impulsen ventas",
            pt: "Crie descrições de produtos convincentes que destaquem características, benefícios e impulsionem vendas",
            fr: "Créez des descriptions de produits convaincantes qui mettent en valeur les caractéristiques et stimulent les ventes",
            de: "Erstellen Sie überzeugende Produktbeschreibungen, die Funktionen und Vorteile hervorheben",
            it: "Crea descrizioni di prodotti convincenti che evidenzino caratteristiche, vantaggi e stimolino le vendite",
        },
    },
    {
        platform: "marketing",
        slug: "landing-page-copy",
        names: {
            en: "Landing Page Copy Generator",
            es: "Generador de Copy para Landing Pages",
            pt: "Gerador de Copy para Landing Pages",
            fr: "Générateur de Copie pour Pages d'Atterrissage",
            de: "Landing-Page-Copy-Generator",
            it: "Generatore di Copy per Landing Page",
        },
        descriptions: {
            en: "Write persuasive landing page copy that converts visitors into customers",
            es: "Escribe copy persuasivo para landing pages que convierta visitantes en clientes",
            pt: "Escreva copy persuasivo para landing pages que converta visitantes em clientes",
            fr: "Écrivez du copy persuasif pour pages d'atterrissage qui convertit les visiteurs en clients",
            de: "Schreiben Sie überzeugenden Landing-Page-Text, der Besucher in Kunden verwandelt",
            it: "Scrivi copy persuasivo per landing page che converta i visitatori in clienti",
        },
    },
    {
        platform: "marketing",
        slug: "testimonial-request-email",
        names: {
            en: "Testimonial Request Email Generator",
            es: "Generador de Emails para Solicitar Testimonios",
            pt: "Gerador de Emails para Solicitar Depoimentos",
            fr: "Générateur d'Emails de Demande de Témoignages",
            de: "Testimonial-Anfrage-Email-Generator",
            it: "Generatore di Email per Richiedere Testimonianze",
        },
        descriptions: {
            en: "Create friendly emails that encourage customers to share their positive experiences",
            es: "Crea emails amigables que animen a los clientes a compartir sus experiencias positivas",
            pt: "Crie emails amigáveis que incentivem os clientes a compartilhar suas experiências positivas",
            fr: "Créez des emails amicaux qui encouragent les clients à partager leurs expériences positives",
            de: "Erstellen Sie freundliche E-Mails, die Kunden ermutigen, ihre positiven Erfahrungen zu teilen",
            it: "Crea email amichevoli che incoraggino i clienti a condividere le loro esperienze positive",
        },
    },
    // AI ChatGPT Prompts (Extremely High demand)
    {
        platform: "ai-art",
        slug: "chatgpt-prompt-generator",
        names: {
            en: "ChatGPT Prompt Generator",
            es: "Generador de Prompts para ChatGPT",
            pt: "Gerador de Prompts para ChatGPT",
            fr: "Générateur de Prompts ChatGPT",
            de: "ChatGPT-Prompt-Generator",
            it: "Generatore di Prompt per ChatGPT",
        },
        descriptions: {
            en: "Create effective ChatGPT prompts with context, instructions, and formatting for better AI responses",
            es: "Crea prompts efectivos para ChatGPT con contexto, instrucciones y formato para mejores respuestas de IA",
            pt: "Crie prompts eficazes para ChatGPT com contexto, instruções e formatação para melhores respostas de IA",
            fr: "Créez des prompts ChatGPT efficaces avec contexte, instructions et formatage pour de meilleures réponses IA",
            de: "Erstellen Sie effektive ChatGPT-Prompts mit Kontext, Anweisungen und Formatierung für bessere KI-Antworten",
            it: "Crea prompt ChatGPT efficaci con contesto, istruzioni e formattazione per migliori risposte dell'IA",
        },
    },
    // AI Voice/Audio (High demand)
    {
        platform: "voice",
        slug: "podcast-intro-script",
        names: {
            en: "Podcast Intro Script Generator",
            es: "Generador de Guiones de Intro para Podcast",
            pt: "Gerador de Scripts de Intro para Podcast",
            fr: "Générateur de Scripts d'Intro Podcast",
            de: "Podcast-Intro-Skript-Generator",
            it: "Generatore di Script di Intro per Podcast",
        },
        descriptions: {
            en: "Create engaging podcast intro scripts that hook listeners and introduce your show",
            es: "Crea guiones de intro de podcast atractivos que enganchen a los oyentes e introduzcan tu programa",
            pt: "Crie scripts de intro de podcast envolventes que prendam os ouvintes e apresentem seu programa",
            fr: "Créez des scripts d'intro podcast engageants qui accrochent les auditeurs et présentent votre émission",
            de: "Erstellen Sie ansprechende Podcast-Intro-Skripte, die Hörer fesseln und Ihre Show vorstellen",
            it: "Crea script di intro per podcast coinvolgenti che catturino gli ascoltatori e presentino il tuo programma",
        },
    },
    {
        platform: "voice",
        slug: "podcast-episode-outline",
        names: {
            en: "Podcast Episode Outline Generator",
            es: "Generador de Esquemas de Episodios de Podcast",
            pt: "Gerador de Esboços de Episódios de Podcast",
            fr: "Générateur de Plans d'Épisodes de Podcast",
            de: "Podcast-Episoden-Gliederungs-Generator",
            it: "Generatore di Schemi di Episodi di Podcast",
        },
        descriptions: {
            en: "Create structured podcast episode outlines with segments, talking points, and time allocations",
            es: "Crea esquemas estructurados de episodios de podcast con segmentos, puntos a tratar y tiempos",
            pt: "Crie esboços estruturados de episódios de podcast com segmentos, pontos de discussão e tempos",
            fr: "Créez des plans d'épisodes de podcast structurés avec segments, points de discussion et allocations de temps",
            de: "Erstellen Sie strukturierte Podcast-Episoden-Gliederungen mit Segmenten, Gesprächspunkten und Zeitvorgaben",
            it: "Crea schemi strutturati di episodi di podcast con segmenti, punti di discussione e allocazioni di tempo",
        },
    },
];

async function checkToolExists(platform, slug, language) {
    try {
        const response = await databases.listDocuments(DATABASE_ID, TOOLS_COLLECTION_ID, [
            Query.equal("platform", platform),
            Query.equal("slug", slug),
            Query.equal("language", language),
            Query.limit(1),
        ]);
        return response.documents.length > 0;
    } catch (error) {
        console.error(`Error checking tool: ${error.message}`);
        return false;
    }
}

async function createTool(tool, language) {
    const document = {
        name: tool.names[language],
        description: tool.descriptions[language],
        platform: tool.platform,
        slug: tool.slug,
        language: language,
        status: "approved",
        author_name: "KiviTools",
        author_id: "system",
        inputs: JSON.stringify([
            { name: "topic", type: "text", required: true },
            { name: "tone", type: "select", options: ["professional", "casual", "creative"] },
        ]),
        prompt_template: `Generate content for ${tool.slug} about {{topic}} in a {{tone}} tone.`,
    };

    try {
        await databases.createDocument(DATABASE_ID, TOOLS_COLLECTION_ID, ID.unique(), document);
        return true;
    } catch (error) {
        console.error(`Error creating ${tool.slug} (${language}): ${error.message}`);
        return false;
    }
}

async function main() {
    console.log("🚀 Starting Trending AI Tools Upload...\n");
    console.log(`📊 Tools to upload: ${TRENDING_TOOLS.length} tools × ${LANGUAGES.length} languages = ${TRENDING_TOOLS.length * LANGUAGES.length} documents\n`);

    let created = 0;
    let skipped = 0;
    let errors = 0;

    for (const tool of TRENDING_TOOLS) {
        console.log(`\n📦 Processing: ${tool.platform}/${tool.slug}`);

        for (const lang of LANGUAGES) {
            const exists = await checkToolExists(tool.platform, tool.slug, lang);

            if (exists) {
                console.log(`  ⏭️  Skipped ${lang}: already exists`);
                skipped++;
                continue;
            }

            const success = await createTool(tool, lang);
            if (success) {
                console.log(`  ✅ Created ${lang}: ${tool.names[lang]}`);
                created++;
            } else {
                errors++;
            }
        }
    }

    console.log("\n" + "=".repeat(50));
    console.log("📊 UPLOAD SUMMARY");
    console.log("=".repeat(50));
    console.log(`✅ Created: ${created}`);
    console.log(`⏭️  Skipped: ${skipped}`);
    console.log(`❌ Errors: ${errors}`);
    console.log(`📦 Total: ${created + skipped + errors}`);
}

main().catch(console.error);
