#!/usr/bin/env node

/**
 * Script to upload new tools for existing platforms (batch)
 * Focus: High-traffic platforms that need more tools
 * Run: node scripts/upload-platform-expansion-batch1.mjs
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
    // === LINKEDIN (Currently 4 tools - expanding) ===
    {
        platform: 'linkedin',
        slug: 'connection-request',
        names: {
            en: 'Connection Request Message',
            es: 'Mensaje de Solicitud de Conexión',
            pt: 'Mensagem de Solicitação de Conexão',
            fr: 'Message de Demande de Connexion',
            de: 'Verbindungsanfrage-Nachricht',
            it: 'Messaggio di Richiesta Connessione'
        },
        descriptions: {
            en: 'Write connection requests that actually get accepted. No more "I\'d like to add you to my network" energy.',
            es: 'Escribe solicitudes de conexión que realmente se aceptan. Nada de energía "Me gustaría añadirte a mi red".',
            pt: 'Escreva solicitações de conexão que realmente são aceitas. Chega de energia "Gostaria de adicionar você à minha rede".',
            fr: 'Écrivez des demandes de connexion qui sont vraiment acceptées. Fini l\'énergie "J\'aimerais vous ajouter à mon réseau".',
            de: 'Schreibe Verbindungsanfragen, die tatsächlich akzeptiert werden. Keine "Ich möchte Sie zu meinem Netzwerk hinzufügen" Energie mehr.',
            it: 'Scrivi richieste di connessione che vengono effettivamente accettate. Basta con l\'energia "Vorrei aggiungerti alla mia rete".'
        },
        inputs: [
            { id: 'targetRole', label: 'Their Role/Position', type: 'text', placeholder: 'CEO, Marketing Manager, Developer...' },
            { id: 'purpose', label: 'Connection Purpose', type: 'select', options: 'Networking,Job opportunity,Collaboration,Learn from them,Shared industry,Mutual connection' },
            { id: 'sharedInterest', label: 'Shared Interest/Context', type: 'text', placeholder: 'Same industry, mutual connection, their post...' },
            { id: 'tone', label: 'Tone', type: 'select', options: 'Professional,Friendly,Direct,Casual-Professional' },
            { id: 'language', label: 'Output Language', type: 'language' }
        ],
        prompt_template: `You are a LinkedIn networking expert. Write a personalized connection request message that stands out and gets accepted.

INPUT:
- Their Role: {targetRole}
- Purpose: {purpose}
- Shared Interest/Context: {sharedInterest}
- Tone: {tone}
- Language: {language}

Generate 3 different connection request messages (each max 300 characters - LinkedIn limit):

## MESSAGE 1: [Style name]
[Message text]
Why it works: [Brief explanation]

## MESSAGE 2: [Style name]
[Message text]
Why it works: [Brief explanation]

## MESSAGE 3: [Style name]
[Message text]
Why it works: [Brief explanation]

RULES:
- Max 300 characters each (LinkedIn limit)
- Personalized, not generic
- No "I'd like to add you to my network"
- Include value proposition
- Write in {language}`
    },
    {
        platform: 'linkedin',
        slug: 'profile-summary',
        names: {
            en: 'Profile Summary Generator',
            es: 'Generador de Resumen de Perfil',
            pt: 'Gerador de Resumo de Perfil',
            fr: 'Générateur de Résumé de Profil',
            de: 'Profil-Zusammenfassung Generator',
            it: 'Generatore di Riepilogo Profilo'
        },
        descriptions: {
            en: 'Create a LinkedIn About section that makes recruiters stop scrolling. First impressions in 2,600 characters.',
            es: 'Crea una sección Acerca de que hace que los reclutadores dejen de hacer scroll. Primeras impresiones en 2,600 caracteres.',
            pt: 'Crie uma seção Sobre que faz recrutadores pararem de rolar. Primeiras impressões em 2.600 caracteres.',
            fr: 'Créez une section À propos qui fait arrêter les recruteurs de défiler. Premières impressions en 2 600 caractères.',
            de: 'Erstelle einen Über mich-Bereich, der Recruiter zum Stoppen bringt. Erster Eindruck in 2.600 Zeichen.',
            it: 'Crea una sezione Chi sono che fa fermare i recruiter. Prime impressioni in 2.600 caratteri.'
        },
        inputs: [
            { id: 'currentRole', label: 'Current Role', type: 'text', placeholder: 'Software Engineer, Marketing Director...' },
            { id: 'experience', label: 'Years of Experience', type: 'select', options: '0-2 years,3-5 years,5-10 years,10+ years' },
            { id: 'skills', label: 'Top Skills', type: 'text', placeholder: 'React, Leadership, Data Analysis...' },
            { id: 'achievements', label: 'Key Achievement', type: 'text', placeholder: 'Grew revenue 50%, Led team of 20...' },
            { id: 'goal', label: 'Career Goal', type: 'text', placeholder: 'Looking for leadership roles, Open to consulting...' },
            { id: 'personality', label: 'Personality Touch', type: 'select', options: 'Professional only,Add humor,Show passion,Story-driven' },
            { id: 'language', label: 'Output Language', type: 'language' }
        ],
        prompt_template: `You are a LinkedIn profile optimization expert. Create a compelling About section that gets noticed.

INPUT:
- Current Role: {currentRole}
- Experience: {experience}
- Top Skills: {skills}
- Key Achievement: {achievements}
- Career Goal: {goal}
- Personality: {personality}
- Language: {language}

Generate a LinkedIn About section (max 2,600 characters):

## SUMMARY

[Write the complete About section with:
- Hook opening line (attention-grabbing first sentence)
- Value proposition (what you bring)
- Key achievements with numbers
- Skills showcase
- Personal touch based on personality preference
- Call to action for connections]

## BREAKDOWN:
- Opening Hook: [The first line that appears in preview]
- Core Message: [What makes you unique]
- Proof Points: [Achievements mentioned]
- CTA: [How you end it]

## KEYWORDS INCLUDED:
[List 5-7 keywords for LinkedIn SEO]

Write in {language}. Make it scannable with line breaks. Front-load important info.`
    },
    
    // === REDDIT (Currently 4 tools - expanding) ===
    {
        platform: 'reddit',
        slug: 'title-generator',
        names: {
            en: 'Post Title Generator',
            es: 'Generador de Títulos',
            pt: 'Gerador de Títulos',
            fr: 'Générateur de Titres',
            de: 'Titel-Generator',
            it: 'Generatore di Titoli'
        },
        descriptions: {
            en: 'Create Reddit post titles that actually get upvotes. No clickbait, just click-worthy.',
            es: 'Crea títulos de posts de Reddit que realmente obtienen upvotes. Sin clickbait, solo dignos de clic.',
            pt: 'Crie títulos de posts do Reddit que realmente recebem upvotes. Sem clickbait, apenas dignos de clique.',
            fr: 'Créez des titres de posts Reddit qui obtiennent vraiment des upvotes. Pas de clickbait, juste digne de clic.',
            de: 'Erstelle Reddit-Posttitel, die tatsächlich Upvotes bekommen. Kein Clickbait, einfach klickwürdig.',
            it: 'Crea titoli di post Reddit che ottengono davvero upvotes. Niente clickbait, solo degni di clic.'
        },
        inputs: [
            { id: 'subreddit', label: 'Subreddit', type: 'text', placeholder: 'r/technology, r/AskReddit, r/gaming...' },
            { id: 'content', label: 'What is your post about?', type: 'textarea', placeholder: 'Describe what you want to share...' },
            { id: 'postType', label: 'Post Type', type: 'select', options: 'Question,Discussion,News/Share,Personal story,Tutorial/Guide,Opinion,Meme/Humor' },
            { id: 'language', label: 'Output Language', type: 'language' }
        ],
        prompt_template: `You are a Reddit power user who understands what makes posts go viral. Generate compelling titles for Reddit posts.

INPUT:
- Subreddit: {subreddit}
- Post Content: {content}
- Post Type: {postType}
- Language: {language}

Generate 5 different title options:

## TITLE 1: [Style - e.g., "Curiosity hook"]
[Title text]

## TITLE 2: [Style - e.g., "Direct statement"]
[Title text]

## TITLE 3: [Style - e.g., "Question format"]
[Title text]

## TITLE 4: [Style - e.g., "Personal angle"]
[Title text]

## TITLE 5: [Style - e.g., "Bold claim"]
[Title text]

## BEST CHOICE:
[Recommend which title and why]

RULES:
- Match subreddit culture and rules
- No excessive caps or clickbait
- Be specific over vague
- Questions work well on AskReddit-type subs
- Write in {language}`
    },
    
    // === WHATSAPP (Currently 3 tools - expanding) ===
    {
        platform: 'whatsapp',
        slug: 'group-description',
        names: {
            en: 'Group Description Generator',
            es: 'Generador de Descripción de Grupo',
            pt: 'Gerador de Descrição de Grupo',
            fr: 'Générateur de Description de Groupe',
            de: 'Gruppenbeschreibung Generator',
            it: 'Generatore di Descrizione Gruppo'
        },
        descriptions: {
            en: 'Create group descriptions that set the vibe and rules without sounding like a corporate handbook.',
            es: 'Crea descripciones de grupo que establezcan el ambiente y las reglas sin sonar como un manual corporativo.',
            pt: 'Crie descrições de grupo que definam o clima e as regras sem parecer um manual corporativo.',
            fr: 'Créez des descriptions de groupe qui définissent l\'ambiance et les règles sans ressembler à un manuel d\'entreprise.',
            de: 'Erstelle Gruppenbeschreibungen, die Stimmung und Regeln setzen, ohne wie ein Firmenhandbuch zu klingen.',
            it: 'Crea descrizioni di gruppo che stabiliscano l\'atmosfera e le regole senza sembrare un manuale aziendale.'
        },
        inputs: [
            { id: 'groupType', label: 'Group Type', type: 'select', options: 'Friends,Family,Work team,Community,Study group,Sports team,Event planning,Hobby/Interest' },
            { id: 'groupName', label: 'Group Name', type: 'text', placeholder: 'The Squad, Marketing Team, Book Club...' },
            { id: 'purpose', label: 'Main Purpose', type: 'text', placeholder: 'Plan trips, share memes, work updates...' },
            { id: 'tone', label: 'Tone', type: 'select', options: 'Fun/Casual,Professional,Friendly,Mixed' },
            { id: 'includeRules', label: 'Include Rules?', type: 'select', options: 'Yes - basic rules,Yes - detailed rules,No rules' },
            { id: 'language', label: 'Output Language', type: 'language' }
        ],
        prompt_template: `You are a community manager expert. Create an engaging WhatsApp group description.

INPUT:
- Group Type: {groupType}
- Group Name: {groupName}
- Purpose: {purpose}
- Tone: {tone}
- Include Rules: {includeRules}
- Language: {language}

Generate a WhatsApp group description (max 2,048 characters):

## DESCRIPTION

[Write description including:
- Welcome/intro line
- What the group is about
- What members can expect
- Rules if requested
- Relevant emojis for visual appeal]

## ALTERNATE VERSION (Shorter):
[A condensed 500-character version]

## SUGGESTED GROUP RULES (if applicable):
1. [Rule 1]
2. [Rule 2]
3. [Rule 3]

Write in {language}. Keep it scannable and engaging.`
    },
    {
        platform: 'whatsapp',
        slug: 'broadcast-message',
        names: {
            en: 'Broadcast Message Generator',
            es: 'Generador de Mensaje de Difusión',
            pt: 'Gerador de Mensagem de Transmissão',
            fr: 'Générateur de Message de Diffusion',
            de: 'Broadcast-Nachricht Generator',
            it: 'Generatore di Messaggio Broadcast'
        },
        descriptions: {
            en: 'Craft broadcast messages for announcements, promotions, or updates that don\'t get instantly muted.',
            es: 'Crea mensajes de difusión para anuncios, promociones o actualizaciones que no se silencian instantáneamente.',
            pt: 'Crie mensagens de transmissão para anúncios, promoções ou atualizações que não são silenciadas instantaneamente.',
            fr: 'Créez des messages de diffusion pour annonces, promotions ou mises à jour qui ne sont pas instantanément mis en sourdine.',
            de: 'Erstelle Broadcast-Nachrichten für Ankündigungen, Aktionen oder Updates, die nicht sofort stummgeschaltet werden.',
            it: 'Crea messaggi broadcast per annunci, promozioni o aggiornamenti che non vengono silenziati istantaneamente.'
        },
        inputs: [
            { id: 'messageType', label: 'Message Type', type: 'select', options: 'Announcement,Promotion/Sale,Event invitation,Update/News,Reminder,Holiday greeting' },
            { id: 'business', label: 'Business/Sender Name', type: 'text', placeholder: 'Your business or name...' },
            { id: 'content', label: 'Main Message Content', type: 'textarea', placeholder: 'What do you want to communicate?' },
            { id: 'callToAction', label: 'Call to Action', type: 'text', placeholder: 'Visit website, Reply to order, Call us...' },
            { id: 'urgency', label: 'Urgency Level', type: 'select', options: 'Low - informational,Medium - time-sensitive,High - urgent action needed' },
            { id: 'language', label: 'Output Language', type: 'language' }
        ],
        prompt_template: `You are a mobile marketing expert. Create a WhatsApp broadcast message that gets opened and acted upon.

INPUT:
- Message Type: {messageType}
- Business/Sender: {business}
- Main Content: {content}
- Call to Action: {callToAction}
- Urgency: {urgency}
- Language: {language}

Generate 2 broadcast message versions:

## VERSION 1: CONCISE (Under 200 characters)
[Short, punchy message with essential info and CTA]

## VERSION 2: DETAILED (Under 500 characters)
[More complete message with context, value proposition, and CTA]

## FORMATTING TIPS:
- Opening hook to grab attention
- Use emojis strategically (not excessively)
- Clear call to action
- Easy to read on mobile

## BEST SEND TIME:
[Recommend when to send based on message type]

Write in {language}. Make it personal, not spammy.`
    },
    
    // === TWITTER (Currently 5 tools - expanding) ===
    {
        platform: 'twitter',
        slug: 'reply-generator',
        names: {
            en: 'Reply Generator',
            es: 'Generador de Respuestas',
            pt: 'Gerador de Respostas',
            fr: 'Générateur de Réponses',
            de: 'Antwort-Generator',
            it: 'Generatore di Risposte'
        },
        descriptions: {
            en: 'Generate witty, engaging replies that get noticed in the comments. Building engagement one reply at a time.',
            es: 'Genera respuestas ingeniosas y atractivas que se notan en los comentarios. Construyendo engagement una respuesta a la vez.',
            pt: 'Gere respostas espirituosas e envolventes que são notadas nos comentários. Construindo engajamento uma resposta de cada vez.',
            fr: 'Générez des réponses spirituelles et engageantes qui se font remarquer. Construire l\'engagement une réponse à la fois.',
            de: 'Generiere witzige, ansprechende Antworten, die in den Kommentaren auffallen. Engagement aufbauen, eine Antwort nach der anderen.',
            it: 'Genera risposte argute e coinvolgenti che si fanno notare nei commenti. Costruire engagement una risposta alla volta.'
        },
        inputs: [
            { id: 'originalTweet', label: 'Original Tweet', type: 'textarea', placeholder: 'Paste the tweet you want to reply to...' },
            { id: 'replyIntent', label: 'Reply Intent', type: 'select', options: 'Agree and add value,Respectfully disagree,Ask a question,Add humor,Share experience,Offer help' },
            { id: 'tone', label: 'Tone', type: 'select', options: 'Witty,Professional,Friendly,Sarcastic (careful),Supportive,Curious' },
            { id: 'language', label: 'Output Language', type: 'language' }
        ],
        prompt_template: `You are a Twitter engagement expert. Generate replies that stand out and spark conversation.

INPUT:
- Original Tweet: {originalTweet}
- Reply Intent: {replyIntent}
- Tone: {tone}
- Language: {language}

Generate 4 reply options:

## REPLY 1: [Short and punchy - under 100 chars]
[Reply text]

## REPLY 2: [Conversational - adds to discussion]
[Reply text]

## REPLY 3: [Question-based - invites response]
[Reply text]

## REPLY 4: [Unique angle - unexpected perspective]
[Reply text]

## ENGAGEMENT TIP:
[Quick tip for maximizing reply visibility]

RULES:
- Stay relevant to original tweet
- Add value, don't just agree
- Be authentic, not try-hard
- Avoid controversial if not intended
- Write in {language}
- Max 280 characters each`
    },
    {
        platform: 'twitter',
        slug: 'poll-generator',
        names: {
            en: 'Poll Generator',
            es: 'Generador de Encuestas',
            pt: 'Gerador de Enquetes',
            fr: 'Générateur de Sondages',
            de: 'Umfrage-Generator',
            it: 'Generatore di Sondaggi'
        },
        descriptions: {
            en: 'Create Twitter polls that get votes, spark debates, and boost engagement. Democracy has never been this fun.',
            es: 'Crea encuestas de Twitter que obtienen votos, generan debates y aumentan el engagement. La democracia nunca fue tan divertida.',
            pt: 'Crie enquetes do Twitter que recebem votos, geram debates e aumentam o engajamento. A democracia nunca foi tão divertida.',
            fr: 'Créez des sondages Twitter qui obtiennent des votes, suscitent des débats et boostent l\'engagement. La démocratie n\'a jamais été aussi amusante.',
            de: 'Erstelle Twitter-Umfragen, die Stimmen bekommen, Debatten auslösen und Engagement steigern. Demokratie war noch nie so spaßig.',
            it: 'Crea sondaggi Twitter che ottengono voti, generano dibattiti e aumentano l\'engagement. La democrazia non è mai stata così divertente.'
        },
        inputs: [
            { id: 'topic', label: 'Poll Topic', type: 'text', placeholder: 'Tech, lifestyle, opinions, fun...' },
            { id: 'pollType', label: 'Poll Type', type: 'select', options: 'Opinion poll,This or that,Prediction,Fun/Humor,Industry-specific,Hot take' },
            { id: 'niche', label: 'Your Niche/Audience', type: 'text', placeholder: 'Tech, Marketing, Fitness, General...' },
            { id: 'language', label: 'Output Language', type: 'language' }
        ],
        prompt_template: `You are a social media engagement expert. Create Twitter polls that maximize participation.

INPUT:
- Topic: {topic}
- Poll Type: {pollType}
- Niche: {niche}
- Language: {language}

Generate 3 poll ideas:

## POLL 1:
**Question:** [Poll question - max 200 chars]
**Options:**
1. [Option 1 - max 25 chars]
2. [Option 2 - max 25 chars]
3. [Option 3 - max 25 chars] (optional)
4. [Option 4 - max 25 chars] (optional)

**Why it works:** [Brief explanation]

## POLL 2:
[Same format]

## POLL 3:
[Same format]

## ENGAGEMENT TIPS:
- Best time to post polls
- How to encourage comments beyond voting
- Follow-up tweet idea

RULES:
- Questions should be debatable but not divisive
- Options should be balanced (no obvious winner)
- Include a fun/unexpected option sometimes
- Write in {language}`
    }
];

async function uploadTools() {
    console.log('\\n🚀 Uploading Platform Expansion Tools (Batch 1)...\\n');
    
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
