#!/usr/bin/env node

/**
 * Script to upload missing tools for platforms with few tools (batch 3)
 * Focus: Snapchat, Discord, Bluesky, YouTube expansion, AI-Writing expansion
 * Run: node scripts/upload-platform-expansion-batch3.mjs
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

const TOOLS = [
    // === SNAPCHAT (Currently 4 tools - expanding) ===
    {
        platform: 'snapchat',
        slug: 'story-planner',
        names: {
            en: 'Story Planner',
            es: 'Planificador de Historias',
            pt: 'Planejador de Stories',
            fr: 'Planificateur de Stories',
            de: 'Story-Planer',
            it: 'Pianificatore di Storie'
        },
        descriptions: {
            en: 'Plan a full day of Snap Stories that keep your friends engaged. From morning vibes to late-night thoughts.',
            es: 'Planifica un día completo de Snap Stories que mantengan a tus amigos enganchados. Desde vibes matutinas hasta pensamientos nocturnos.',
            pt: 'Planeje um dia inteiro de Snap Stories que mantenham seus amigos engajados. Das vibes matinais aos pensamentos noturnos.',
            fr: 'Planifiez une journée complète de Snap Stories qui gardent vos amis engagés. Des vibes du matin aux pensées nocturnes.',
            de: 'Plane einen ganzen Tag Snap Stories, die deine Freunde bei der Stange halten. Von Morgen-Vibes bis Spät-Nacht-Gedanken.',
            it: 'Pianifica un\'intera giornata di Snap Stories che tengano i tuoi amici coinvolti. Dalle vibes mattutine ai pensieri notturni.'
        },
        inputs: [
            { id: 'dayType', label: 'Type of Day', type: 'select', options: 'Regular day,Special event,Travel day,Weekend vibes,Work/School day,Lazy day' },
            { id: 'vibe', label: 'Overall Vibe', type: 'select', options: 'Fun/Energetic,Chill/Relaxed,Aesthetic,Funny/Chaotic,Deep/Thoughtful,Mixed' },
            { id: 'storyCount', label: 'Number of Stories', type: 'select', options: '5-7 snaps,8-12 snaps,15+ snaps (heavy user)' },
            { id: 'language', label: 'Output Language', type: 'language' }
        ],
        prompt_template: `You are a Snapchat content expert. Plan an engaging day of Stories that keeps friends watching.

INPUT:
- Day Type: {dayType}
- Vibe: {vibe}
- Story Count: {storyCount}
- Language: {language}

Generate a Snap Story day plan:

## MORNING (Wake up to noon)

**SNAP 1:** [Time - e.g., 8am]
Type: [Photo/Video/Bitmoji]
Content: [What to capture]
Caption/Text: [What to write]
Lens/Filter: [Suggestion if any]

**SNAP 2:** [Continue...]

## AFTERNOON (Noon to 6pm)

**SNAP 3-5:** [Continue format...]

## EVENING (6pm to midnight)

**SNAP 6+:** [Continue format...]

## STORY ARC:
[How the day's story flows together]

## ENGAGEMENT TIPS:
- Best times to post
- When to use polls/questions
- How to get replies

Write in {language}. Keep it authentic and engaging.`
    },
    {
        platform: 'snapchat',
        slug: 'filter-ideas',
        names: {
            en: 'Filter & Lens Ideas',
            es: 'Ideas de Filtros y Lentes',
            pt: 'Ideias de Filtros e Lentes',
            fr: 'Idées de Filtres et Lentilles',
            de: 'Filter & Lens Ideen',
            it: 'Idee per Filtri e Lenti'
        },
        descriptions: {
            en: 'Get creative filter and lens suggestions for any occasion. Never use that basic dog filter again (unless ironically).',
            es: 'Obtén sugerencias creativas de filtros y lentes para cualquier ocasión. Nunca uses ese filtro básico de perro de nuevo (a menos que sea irónico).',
            pt: 'Obtenha sugestões criativas de filtros e lentes para qualquer ocasião. Nunca use aquele filtro básico de cachorro novamente (a menos que seja irônico).',
            fr: 'Obtenez des suggestions créatives de filtres et lentilles pour toute occasion. N\'utilisez plus jamais ce filtre de chien basique (sauf ironiquement).',
            de: 'Erhalte kreative Filter- und Lens-Vorschläge für jeden Anlass. Nie wieder diesen Basic-Hundefilter benutzen (außer ironisch).',
            it: 'Ottieni suggerimenti creativi per filtri e lenti per ogni occasione. Non usare mai più quel filtro base del cane (a meno che non sia ironico).'
        },
        inputs: [
            { id: 'occasion', label: 'Occasion', type: 'select', options: 'Selfie,Group photo,Sunset/Scenic,Food,Pet,Mirror selfie,Outfit check,Night out,Random/Casual' },
            { id: 'mood', label: 'Mood', type: 'select', options: 'Cute,Funny,Aesthetic,Weird/Cursed,Glam,Natural,Artistic' },
            { id: 'language', label: 'Output Language', type: 'language' }
        ],
        prompt_template: `You are a Snapchat filter expert. Suggest creative filters and lenses for any situation.

INPUT:
- Occasion: {occasion}
- Mood: {mood}
- Language: {language}

Generate filter/lens recommendations:

## TOP PICKS FOR THIS OCCASION:

**1. [Filter/Lens Name or Type]**
- Why it works: [Explanation]
- Pro tip: [How to use it best]

**2. [Filter/Lens Name or Type]**
- Why it works: [Explanation]
- Pro tip: [How to use it best]

**3. [Filter/Lens Name or Type]**
- Why it works: [Explanation]
- Pro tip: [How to use it best]

## TRENDING RIGHT NOW:
[3 currently popular filters/lenses to try]

## UNDERRATED GEMS:
[2 lesser-known filters that are actually great]

## AVOID:
[1-2 overused or cringey options for this situation]

## CREATIVE COMBO:
[Suggest combining a filter with an editing style]

Write in {language}. Be specific about filter types.`
    },

    // === DISCORD (Currently 5 tools - expanding) ===
    {
        platform: 'discord',
        slug: 'server-name-generator',
        names: {
            en: 'Server Name Generator',
            es: 'Generador de Nombres de Servidor',
            pt: 'Gerador de Nomes de Servidor',
            fr: 'Générateur de Noms de Serveur',
            de: 'Server-Namen Generator',
            it: 'Generatore di Nomi Server'
        },
        descriptions: {
            en: 'Create Discord server names that people actually want to join. First impressions start at the invite link.',
            es: 'Crea nombres de servidores de Discord a los que la gente realmente quiera unirse. Las primeras impresiones empiezan en el enlace de invitación.',
            pt: 'Crie nomes de servidores do Discord aos quais as pessoas realmente querem entrar. Primeiras impressões começam no link do convite.',
            fr: 'Créez des noms de serveurs Discord auxquels les gens veulent vraiment rejoindre. Les premières impressions commencent au lien d\'invitation.',
            de: 'Erstelle Discord-Servernamen, denen Leute wirklich beitreten wollen. Der erste Eindruck beginnt beim Einladungslink.',
            it: 'Crea nomi di server Discord a cui le persone vogliono davvero unirsi. Le prime impressioni iniziano dal link di invito.'
        },
        inputs: [
            { id: 'serverType', label: 'Server Type', type: 'select', options: 'Gaming,Community,Content creator,Study/Learning,Friends,Business/Brand,Music,Art/Creative,Tech,Anime/Fandoms' },
            { id: 'vibe', label: 'Server Vibe', type: 'select', options: 'Professional,Casual/Chill,Energetic,Mysterious,Funny,Aesthetic,Welcoming' },
            { id: 'keywords', label: 'Keywords/Theme', type: 'text', placeholder: 'Game name, topic, group identity...' },
            { id: 'language', label: 'Output Language', type: 'language' }
        ],
        prompt_template: `You are a Discord community expert. Create server names that attract the right members.

INPUT:
- Server Type: {serverType}
- Vibe: {vibe}
- Keywords: {keywords}
- Language: {language}

Generate 10 server name options:

## CLASSIC STYLE (Clear & Descriptive)
1. [Name]
2. [Name]
3. [Name]

## CREATIVE STYLE (Unique & Memorable)
4. [Name]
5. [Name]
6. [Name]

## MINIMAL STYLE (Short & Clean)
7. [Name]
8. [Name]

## COMMUNITY-FOCUSED (Inclusive & Welcoming)
9. [Name]
10. [Name]

## BEST OVERALL:
[Pick one and explain why]

## MATCHING ICON SUGGESTION:
[What kind of server icon would match]

## URL-FRIENDLY VERSION:
[discord.gg/ suggestion]

Write in {language}. Names should be memorable and easy to type.`
    },
    {
        platform: 'discord',
        slug: 'role-names',
        names: {
            en: 'Role Names Generator',
            es: 'Generador de Nombres de Roles',
            pt: 'Gerador de Nomes de Cargos',
            fr: 'Générateur de Noms de Rôles',
            de: 'Rollen-Namen Generator',
            it: 'Generatore di Nomi Ruoli'
        },
        descriptions: {
            en: 'Create role names and hierarchies that make sense and look good. Because "Admin" and "Member" is boring.',
            es: 'Crea nombres de roles y jerarquías que tengan sentido y se vean bien. Porque "Admin" y "Miembro" es aburrido.',
            pt: 'Crie nomes de cargos e hierarquias que façam sentido e pareçam bons. Porque "Admin" e "Membro" é chato.',
            fr: 'Créez des noms de rôles et hiérarchies qui ont du sens et sont beaux. Parce que "Admin" et "Membre" c\'est ennuyeux.',
            de: 'Erstelle Rollennamen und Hierarchien, die Sinn ergeben und gut aussehen. Weil "Admin" und "Mitglied" langweilig ist.',
            it: 'Crea nomi di ruoli e gerarchie che abbiano senso e siano belli. Perché "Admin" e "Membro" è noioso.'
        },
        inputs: [
            { id: 'serverTheme', label: 'Server Theme', type: 'text', placeholder: 'Gaming, anime, business, community...' },
            { id: 'roleStyle', label: 'Role Naming Style', type: 'select', options: 'Fantasy/RPG,Modern/Professional,Casual/Fun,Themed to content,Military ranks,Mythological,Custom hierarchy' },
            { id: 'roleCount', label: 'Number of Roles Needed', type: 'select', options: '5 basic roles,8-10 roles,15+ detailed hierarchy' },
            { id: 'language', label: 'Output Language', type: 'language' }
        ],
        prompt_template: `You are a Discord server organization expert. Create role hierarchies that are both functional and thematic.

INPUT:
- Server Theme: {serverTheme}
- Role Style: {roleStyle}
- Role Count: {roleCount}
- Language: {language}

Generate a complete role hierarchy:

## ROLE HIERARCHY (Top to Bottom)

### STAFF ROLES
1. **[Owner Role Name]** - Color suggestion: [hex]
   Description: [What this role does]
   
2. **[Admin Role Name]** - Color: [hex]
   Description: [What this role does]
   
3. **[Moderator Role Name]** - Color: [hex]
   Description: [What this role does]

### SPECIAL ROLES
4. **[VIP/Special Role]** - Color: [hex]
   For: [Who gets this]

5. **[Contributor Role]** - Color: [hex]
   For: [Who gets this]

### MEMBER ROLES (Level/Activity Based)
6. **[Active Member]** - Color: [hex]
7. **[Regular Member]** - Color: [hex]
8. **[New Member]** - Color: [hex]

### OPTIONAL/FUN ROLES
9. **[Optional Role 1]**
10. **[Optional Role 2]**

## COLOR PALETTE:
[Suggested color scheme that looks cohesive]

## PERMISSION SUGGESTIONS:
[Key permissions for each tier]

Write in {language}. Make roles themed but still clear in purpose.`
    },

    // === YOUTUBE (Currently 12 tools - expanding) ===
    {
        platform: 'youtube',
        slug: 'chapter-generator',
        names: {
            en: 'Chapter/Timestamp Generator',
            es: 'Generador de Capítulos/Timestamps',
            pt: 'Gerador de Capítulos/Timestamps',
            fr: 'Générateur de Chapitres/Horodatages',
            de: 'Kapitel/Zeitstempel Generator',
            it: 'Generatore di Capitoli/Timestamp'
        },
        descriptions: {
            en: 'Create YouTube chapters that improve watch time and help viewers find what they need. SEO-friendly timestamps.',
            es: 'Crea capítulos de YouTube que mejoran el tiempo de visualización y ayudan a los espectadores a encontrar lo que necesitan.',
            pt: 'Crie capítulos do YouTube que melhoram o tempo de exibição e ajudam os espectadores a encontrar o que precisam.',
            fr: 'Créez des chapitres YouTube qui améliorent le temps de visionnage et aident les spectateurs à trouver ce qu\'ils cherchent.',
            de: 'Erstelle YouTube-Kapitel, die die Wiedergabezeit verbessern und Zuschauern helfen, das Gesuchte zu finden.',
            it: 'Crea capitoli YouTube che migliorano il tempo di visualizzazione e aiutano gli spettatori a trovare ciò che cercano.'
        },
        inputs: [
            { id: 'videoTopic', label: 'Video Topic', type: 'text', placeholder: 'What is your video about?' },
            { id: 'videoType', label: 'Video Type', type: 'select', options: 'Tutorial/How-to,Review,Vlog,List video,Interview,Gaming,Podcast,Educational' },
            { id: 'duration', label: 'Approximate Duration', type: 'select', options: 'Under 10 minutes,10-20 minutes,20-30 minutes,30+ minutes,1 hour+' },
            { id: 'keyPoints', label: 'Key Points/Sections', type: 'textarea', placeholder: 'List the main sections or points covered...' },
            { id: 'language', label: 'Output Language', type: 'language' }
        ],
        prompt_template: `You are a YouTube SEO expert. Create chapters that improve viewer experience and searchability.

INPUT:
- Video Topic: {videoTopic}
- Video Type: {videoType}
- Duration: {duration}
- Key Points: {keyPoints}
- Language: {language}

Generate YouTube chapters:

## CHAPTERS (Copy-Paste Ready)

0:00 - [Intro/Hook title]
0:XX - [Chapter 2 title]
X:XX - [Chapter 3 title]
X:XX - [Chapter 4 title]
[Continue based on duration and content]

## CHAPTER BREAKDOWN:

**0:00 - [Title]**
- What happens: [Brief description]
- Keywords included: [SEO terms]

[Continue for each chapter...]

## SEO TIPS:
- Keywords naturally included in chapters
- Why these chapter names help searchability
- Most clickable chapter (what people seek)

## BEST PRACTICES APPLIED:
- First chapter at 0:00 (required by YouTube)
- Descriptive but concise titles
- Logical flow and pacing

Write in {language}. Make chapters descriptive but under 50 characters each.`
    },
    {
        platform: 'youtube',
        slug: 'pinned-comment',
        names: {
            en: 'Pinned Comment Generator',
            es: 'Generador de Comentario Fijado',
            pt: 'Gerador de Comentário Fixado',
            fr: 'Générateur de Commentaire Épinglé',
            de: 'Angepinnter Kommentar Generator',
            it: 'Generatore di Commento Fissato'
        },
        descriptions: {
            en: 'Create pinned comments that boost engagement and add value to your video. The first comment everyone sees.',
            es: 'Crea comentarios fijados que aumentan el engagement y añaden valor a tu video. El primer comentario que todos ven.',
            pt: 'Crie comentários fixados que aumentam o engajamento e adicionam valor ao seu vídeo. O primeiro comentário que todos veem.',
            fr: 'Créez des commentaires épinglés qui boostent l\'engagement et ajoutent de la valeur. Le premier commentaire que tout le monde voit.',
            de: 'Erstelle angepinnte Kommentare, die Engagement steigern und Mehrwert bieten. Der erste Kommentar, den alle sehen.',
            it: 'Crea commenti fissati che aumentano l\'engagement e aggiungono valore al tuo video. Il primo commento che tutti vedono.'
        },
        inputs: [
            { id: 'videoTopic', label: 'Video Topic', type: 'text', placeholder: 'What is the video about?' },
            { id: 'commentGoal', label: 'Comment Goal', type: 'select', options: 'Boost engagement,Provide extra info,Correct something,Promote related content,Ask a question,Add context,Timestamps summary' },
            { id: 'tone', label: 'Tone', type: 'select', options: 'Friendly,Professional,Funny,Casual,Grateful' },
            { id: 'language', label: 'Output Language', type: 'language' }
        ],
        prompt_template: `You are a YouTube engagement expert. Create pinned comments that add value and drive interaction.

INPUT:
- Video Topic: {videoTopic}
- Comment Goal: {commentGoal}
- Tone: {tone}
- Language: {language}

Generate 3 pinned comment options:

## COMMENT 1: [Short & Punchy]
[Comment text - under 200 characters]
Why it works: [Brief explanation]

## COMMENT 2: [Detailed & Valuable]
[Comment text - with extra info, links structure, or resources]
Why it works: [Brief explanation]

## COMMENT 3: [Engagement-Focused]
[Comment text - designed to get replies]
Why it works: [Brief explanation]

## ENGAGEMENT BOOSTERS:
- Question to ask viewers
- Call to action that works
- How to encourage replies

## BEST PRACTICE TIPS:
- When to post the pinned comment
- How to respond to replies
- When to update/change it

Write in {language}. Make it valuable, not just promotional.`
    },

    // === AI-WRITING (Currently 3 tools - expanding) ===
    {
        platform: 'ai-writing',
        slug: 'summary-generator',
        names: {
            en: 'Summary Generator',
            es: 'Generador de Resúmenes',
            pt: 'Gerador de Resumos',
            fr: 'Générateur de Résumés',
            de: 'Zusammenfassungs-Generator',
            it: 'Generatore di Riassunti'
        },
        descriptions: {
            en: 'Turn long texts into concise summaries. Perfect for articles, documents, or when you just don\'t want to read all that.',
            es: 'Convierte textos largos en resúmenes concisos. Perfecto para artículos, documentos, o cuando simplemente no quieres leer todo eso.',
            pt: 'Transforme textos longos em resumos concisos. Perfeito para artigos, documentos, ou quando você simplesmente não quer ler tudo isso.',
            fr: 'Transformez de longs textes en résumés concis. Parfait pour les articles, documents, ou quand vous ne voulez pas tout lire.',
            de: 'Verwandle lange Texte in prägnante Zusammenfassungen. Perfekt für Artikel, Dokumente, oder wenn du einfach nicht alles lesen willst.',
            it: 'Trasforma testi lunghi in riassunti concisi. Perfetto per articoli, documenti, o quando semplicemente non vuoi leggere tutto.'
        },
        inputs: [
            { id: 'text', label: 'Text to Summarize', type: 'textarea', placeholder: 'Paste the text you want to summarize...' },
            { id: 'summaryLength', label: 'Summary Length', type: 'select', options: 'One sentence,Short paragraph (50 words),Medium (100-150 words),Detailed (200-300 words)' },
            { id: 'summaryStyle', label: 'Summary Style', type: 'select', options: 'Key points only,Narrative summary,Executive summary,Bullet points,Academic abstract' },
            { id: 'language', label: 'Output Language', type: 'language' }
        ],
        prompt_template: `You are a professional summarizer. Create clear, accurate summaries that capture the essence of the original text.

INPUT:
- Text: {text}
- Length: {summaryLength}
- Style: {summaryStyle}
- Language: {language}

Generate a summary:

## SUMMARY

[The summary based on specified length and style]

## KEY POINTS:
1. [Main point 1]
2. [Main point 2]
3. [Main point 3]
[Add more if relevant]

## NOTABLE QUOTES (if any):
[Any important direct quotes worth preserving]

## WHAT'S NOT INCLUDED:
[Brief note on what was left out and why]

RULES:
- Maintain accuracy - don't add information not in original
- Use clear, simple language
- Write in {language}
- Match the requested length closely`
    },
    {
        platform: 'ai-writing',
        slug: 'headline-writer',
        names: {
            en: 'Headline Writer',
            es: 'Escritor de Titulares',
            pt: 'Escritor de Manchetes',
            fr: 'Rédacteur de Titres',
            de: 'Schlagzeilen-Schreiber',
            it: 'Scrittore di Titoli'
        },
        descriptions: {
            en: 'Generate attention-grabbing headlines for articles, blogs, ads, and more. The first line that makes or breaks your content.',
            es: 'Genera titulares que captan la atención para artículos, blogs, anuncios y más. La primera línea que hace o rompe tu contenido.',
            pt: 'Gere manchetes chamativas para artigos, blogs, anúncios e mais. A primeira linha que faz ou desfaz seu conteúdo.',
            fr: 'Générez des titres accrocheurs pour articles, blogs, publicités et plus. La première ligne qui fait ou défait votre contenu.',
            de: 'Generiere aufmerksamkeitsstarke Schlagzeilen für Artikel, Blogs, Anzeigen und mehr. Die erste Zeile, die deinen Content macht oder bricht.',
            it: 'Genera titoli accattivanti per articoli, blog, annunci e altro. La prima riga che fa o rompe il tuo contenuto.'
        },
        inputs: [
            { id: 'topic', label: 'Content Topic', type: 'textarea', placeholder: 'What is your content about?' },
            { id: 'contentType', label: 'Content Type', type: 'select', options: 'Blog post,News article,Ad copy,Email subject,Social media,Landing page,YouTube video' },
            { id: 'headlineStyle', label: 'Headline Style', type: 'select', options: 'How-to,List (number-based),Question,Bold statement,Curiosity gap,Benefit-focused,News/Announcement' },
            { id: 'targetAudience', label: 'Target Audience', type: 'text', placeholder: 'Who is this for?' },
            { id: 'language', label: 'Output Language', type: 'language' }
        ],
        prompt_template: `You are a copywriting expert specializing in headlines. Create headlines that demand attention and drive clicks.

INPUT:
- Topic: {topic}
- Content Type: {contentType}
- Style: {headlineStyle}
- Audience: {targetAudience}
- Language: {language}

Generate 10 headline options:

## POWER HEADLINES (Proven formulas)
1. [Headline]
2. [Headline]
3. [Headline]

## CURIOSITY-DRIVEN
4. [Headline]
5. [Headline]

## BENEFIT-FOCUSED
6. [Headline]
7. [Headline]

## BOLD/CONTROVERSIAL (Use carefully)
8. [Headline]

## SIMPLE/DIRECT
9. [Headline]
10. [Headline]

## TOP 3 PICKS:
1. **Best Overall:** [Headline] - Why: [Reason]
2. **Best for Clicks:** [Headline] - Why: [Reason]  
3. **Safest Option:** [Headline] - Why: [Reason]

## A/B TEST PAIR:
[Two headlines to test against each other]

Write in {language}. Headlines should be under 70 characters when possible.`
    },

    // === VOICE (Currently 2 tools - expanding) ===
    {
        platform: 'voice',
        slug: 'voiceover-script',
        names: {
            en: 'Voiceover Script Writer',
            es: 'Escritor de Scripts para Voiceover',
            pt: 'Escritor de Scripts para Locução',
            fr: 'Rédacteur de Scripts Voix Off',
            de: 'Voiceover-Script Schreiber',
            it: 'Scrittore di Script per Voiceover'
        },
        descriptions: {
            en: 'Write professional voiceover scripts for videos, ads, explainers, and more. Words that sound as good as they read.',
            es: 'Escribe scripts profesionales de voiceover para videos, anuncios, explicadores y más. Palabras que suenan tan bien como se leen.',
            pt: 'Escreva scripts profissionais de locução para vídeos, anúncios, explicadores e mais. Palavras que soam tão bem quanto se leem.',
            fr: 'Écrivez des scripts de voix off professionnels pour vidéos, pubs, explicatifs et plus. Des mots qui sonnent aussi bien qu\'ils se lisent.',
            de: 'Schreibe professionelle Voiceover-Skripte für Videos, Werbung, Erklärvideos und mehr. Worte, die so gut klingen, wie sie sich lesen.',
            it: 'Scrivi script professionali di voiceover per video, annunci, spiegazioni e altro. Parole che suonano bene quanto si leggono.'
        },
        inputs: [
            { id: 'projectType', label: 'Project Type', type: 'select', options: 'Commercial/Ad,Explainer video,Documentary,E-learning,Corporate video,Podcast intro,YouTube video,Audiobook' },
            { id: 'topic', label: 'Topic/Content', type: 'textarea', placeholder: 'What is the voiceover about?' },
            { id: 'duration', label: 'Target Duration', type: 'select', options: '15 seconds,30 seconds,60 seconds,2 minutes,5 minutes,10+ minutes' },
            { id: 'voiceStyle', label: 'Voice Style', type: 'select', options: 'Conversational,Professional,Energetic,Warm/Friendly,Authoritative,Casual,Dramatic,Inspirational' },
            { id: 'language', label: 'Output Language', type: 'language' }
        ],
        prompt_template: `You are a professional voiceover scriptwriter. Create scripts optimized for spoken delivery.

INPUT:
- Project Type: {projectType}
- Topic: {topic}
- Duration: {duration}
- Voice Style: {voiceStyle}
- Language: {language}

Generate a voiceover script:

## SCRIPT

[Full script with natural pacing, written for spoken delivery]

---

## SCRIPT WITH DIRECTION

[Same script but with performance notes]

**[Pause]** - Where to pause
**[Emphasis]** - Words to stress
**[Slower/Faster]** - Pace changes
**[Tone: warm/serious/excited]** - Emotional direction

---

## TIMING BREAKDOWN:
- Estimated read time: [X minutes X seconds]
- Words per minute: [Based on style]
- Suggested pacing notes

## PRONUNCIATION NOTES:
[Any tricky words or names with pronunciation guides]

## SCRIPT TIPS:
- Key moments to nail
- Where emotion peaks
- Breathing spots

Write in {language}. Optimize for natural spoken delivery.`
    },
    {
        platform: 'voice',
        slug: 'narration-script',
        names: {
            en: 'Narration Script Generator',
            es: 'Generador de Scripts de Narración',
            pt: 'Gerador de Scripts de Narração',
            fr: 'Générateur de Scripts de Narration',
            de: 'Erzählungs-Script Generator',
            it: 'Generatore di Script di Narrazione'
        },
        descriptions: {
            en: 'Create compelling narration scripts for documentaries, stories, and video essays. The voice that guides the journey.',
            es: 'Crea scripts de narración convincentes para documentales, historias y video ensayos. La voz que guía el viaje.',
            pt: 'Crie scripts de narração convincentes para documentários, histórias e video ensaios. A voz que guia a jornada.',
            fr: 'Créez des scripts de narration convaincants pour documentaires, histoires et essais vidéo. La voix qui guide le voyage.',
            de: 'Erstelle überzeugende Erzählskripte für Dokumentationen, Geschichten und Video-Essays. Die Stimme, die die Reise führt.',
            it: 'Crea script di narrazione avvincenti per documentari, storie e video saggi. La voce che guida il viaggio.'
        },
        inputs: [
            { id: 'narrativeType', label: 'Narrative Type', type: 'select', options: 'Documentary,Video essay,Story/Fiction,True crime,History,Nature/Wildlife,Biography,Travel,Explainer' },
            { id: 'subject', label: 'Subject/Topic', type: 'textarea', placeholder: 'What is being narrated?' },
            { id: 'tone', label: 'Narrative Tone', type: 'select', options: 'Serious/Dramatic,Curious/Wonder,Mysterious,Educational,Emotional,Neutral/Journalistic,Humorous,Epic' },
            { id: 'length', label: 'Script Length', type: 'select', options: 'Short (1-2 min),Medium (5 min),Long (10 min),Extended (20+ min)' },
            { id: 'language', label: 'Output Language', type: 'language' }
        ],
        prompt_template: `You are a documentary scriptwriter. Create narration that captivates and informs.

INPUT:
- Type: {narrativeType}
- Subject: {subject}
- Tone: {tone}
- Length: {length}
- Language: {language}

Generate a narration script:

## OPENING HOOK
[Strong opening that grabs attention - 2-3 sentences]

---

## ACT 1: SETUP
[Establish the subject, context, and stakes]

---

## ACT 2: DEVELOPMENT
[The main content, story progression, or argument]

---

## ACT 3: CLIMAX/RESOLUTION
[Peak moment and conclusion]

---

## CLOSING
[Final thought that resonates]

---

## VISUAL NOTES:
[Suggestions for what could be shown during each section]

## PACING GUIDE:
- Where to slow down for impact
- Where to build energy
- Moments for music/silence

## KEY QUOTES TO INTEGRATE:
[If applicable, powerful quotes that could be included]

Write in {language}. Create narration that complements visuals.`
    }
];

async function uploadTools() {
    console.log('\\n🚀 Uploading Platform Expansion Tools (Batch 3)...\\n');

    const languages = ['en', 'es', 'pt', 'fr', 'de', 'it'];
    let totalCreated = 0;

    for (const tool of TOOLS) {
        console.log(`\\n📦 Processing: ${tool.platform}/${tool.slug}`);

        for (const lang of languages) {
            // Check if already exists
            const existing = await databases.listDocuments(DATABASE_ID, COLLECTION_ID, [
                Query.equal('platform', tool.platform),
                Query.equal('slug', tool.slug),
                Query.equal('language', lang)
            ]);

            if (existing.total > 0) {
                console.log(`   ⚠️  ${lang.toUpperCase()}: Already exists`);
                continue;
            }

            // Create localized inputs
            const localizedInputs = tool.inputs.map(input => ({
                id: input.id,
                label: input.label,
                type: input.type,
                options: input.options,
                placeholder: input.placeholder,
                required: input.required !== false
            }));

            const doc = {
                name: tool.names[lang],
                description: tool.descriptions[lang],
                platform: tool.platform,
                slug: tool.slug,
                language: lang,
                status: 'approved',
                author_name: 'KiviTools',
                author_id: 'system',
                inputs: JSON.stringify(localizedInputs),
                prompt_template: tool.prompt_template
            };

            await databases.createDocument(DATABASE_ID, COLLECTION_ID, ID.unique(), doc);
            console.log(`   ✅ ${lang.toUpperCase()}: Created`);
            totalCreated++;
        }
    }

    console.log(`\\n🎉 Done! Created ${totalCreated} documents across ${TOOLS.length} tools`);
    console.log('\\nTools created:');
    TOOLS.forEach(t => console.log(`  - ${t.platform}/${t.slug}`));
}

uploadTools().catch(console.error);
