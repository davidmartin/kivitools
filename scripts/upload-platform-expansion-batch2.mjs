#!/usr/bin/env node

/**
 * Script to upload new tools for TikTok & Instagram (batch 2)
 * Run: node scripts/upload-platform-expansion-batch2.mjs
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
    // === TIKTOK (Currently 15 tools - expanding to 18+) ===
    {
        platform: 'tiktok',
        slug: 'duet-script',
        names: {
            en: 'Duet Script Generator',
            es: 'Generador de Scripts para Duet',
            pt: 'Gerador de Scripts para Dueto',
            fr: 'Générateur de Scripts Duet',
            de: 'Duett-Script Generator',
            it: 'Generatore di Script Duetto'
        },
        descriptions: {
            en: 'Create duet scripts that add value to the original video without just pointing and nodding like a backup dancer.',
            es: 'Crea scripts para duets que añaden valor al video original sin solo señalar y asentir como bailarín de apoyo.',
            pt: 'Crie scripts para duetos que adicionam valor ao vídeo original sem apenas apontar e acenar como dançarino de apoio.',
            fr: 'Créez des scripts de duos qui ajoutent de la valeur à la vidéo originale sans juste pointer et hocher la tête.',
            de: 'Erstelle Duett-Skripte, die dem Originalvideo Mehrwert hinzufügen, ohne nur zu zeigen und zu nicken.',
            it: 'Crea script per duetti che aggiungono valore al video originale senza solo indicare e annuire.'
        },
        inputs: [
            { id: 'originalVideo', label: 'Original Video Topic', type: 'text', placeholder: 'What is the video about?' },
            { id: 'duetStyle', label: 'Duet Style', type: 'select', options: 'React and comment,Add information,Counter-argument,Humor/Parody,Story continuation,Expert take,Agree and amplify' },
            { id: 'yourNiche', label: 'Your Niche', type: 'text', placeholder: 'Your area of expertise or content style...' },
            { id: 'duration', label: 'Your Part Duration', type: 'select', options: '15 seconds,30 seconds,60 seconds' },
            { id: 'language', label: 'Output Language', type: 'language' }
        ],
        prompt_template: `You are a TikTok duet expert. Create a script that adds genuine value to the original video and stands out.

INPUT:
- Original Video Topic: {originalVideo}
- Duet Style: {duetStyle}
- Your Niche: {yourNiche}
- Duration: {duration}
- Language: {language}

Generate a duet script:

## DUET CONCEPT:
[Brief description of your duet approach]

## SCRIPT:

**[INTRO - First 3 seconds]**
[Hook to grab attention]

**[MAIN CONTENT]**
[Your duet content - what you say/do while original plays]

**[OUTRO]**
[Call to action or closing]

## TIMING NOTES:
- When to react to key moments
- Pause points for original video
- Where to add your commentary

## ENGAGEMENT TIPS:
- How to encourage comments
- Hashtag suggestions
- Caption idea

Write in {language}. Make it add value, not just react.`
    },
    {
        platform: 'tiktok',
        slug: 'live-title',
        names: {
            en: 'LIVE Title Generator',
            es: 'Generador de Títulos LIVE',
            pt: 'Gerador de Títulos LIVE',
            fr: 'Générateur de Titres LIVE',
            de: 'LIVE-Titel Generator',
            it: 'Generatore di Titoli LIVE'
        },
        descriptions: {
            en: 'Create LIVE stream titles that make people tap in. Because "Going LIVE" is not a title, it\'s a cry for help.',
            es: 'Crea títulos de LIVE que hacen que la gente entre. Porque "Estoy en LIVE" no es un título, es un grito de ayuda.',
            pt: 'Crie títulos de LIVE que fazem as pessoas entrarem. Porque "Estou ao VIVO" não é um título, é um pedido de socorro.',
            fr: 'Créez des titres LIVE qui font cliquer les gens. Parce que "Je suis en LIVE" n\'est pas un titre, c\'est un appel à l\'aide.',
            de: 'Erstelle LIVE-Titel, die Leute zum Einschalten bringen. Weil "Ich bin LIVE" kein Titel ist, sondern ein Hilferuf.',
            it: 'Crea titoli LIVE che fanno entrare le persone. Perché "Sono in LIVE" non è un titolo, è una richiesta d\'aiuto.'
        },
        inputs: [
            { id: 'liveContent', label: 'What is your LIVE about?', type: 'text', placeholder: 'Q&A, Gaming, Chatting, Tutorial...' },
            { id: 'liveType', label: 'LIVE Type', type: 'select', options: 'Casual chat,Q&A session,Gaming,Tutorial/Teaching,Product showcase,Giveaway,Collab,Special event' },
            { id: 'hook', label: 'Special Hook', type: 'text', placeholder: 'Any giveaway, special guest, announcement...', required: false },
            { id: 'language', label: 'Output Language', type: 'language' }
        ],
        prompt_template: `You are a TikTok LIVE expert. Create titles that maximize LIVE viewership.

INPUT:
- LIVE Content: {liveContent}
- LIVE Type: {liveType}
- Special Hook: {hook}
- Language: {language}

Generate 6 LIVE title options (max 32 characters each):

## TITLE 1: [Curiosity hook]
[Title text]

## TITLE 2: [Value proposition]
[Title text]

## TITLE 3: [Urgency/FOMO]
[Title text]

## TITLE 4: [Question format]
[Title text]

## TITLE 5: [Fun/Personality]
[Title text]

## TITLE 6: [Direct/Clear]
[Title text]

## BEST CHOICE:
[Recommend which title and why]

## PRO TIPS:
- Best time to go LIVE
- How to announce your LIVE beforehand
- First 5 minutes strategy

Write in {language}. Keep titles SHORT and attention-grabbing.`
    },
    {
        platform: 'tiktok',
        slug: 'comment-reply',
        names: {
            en: 'Comment Reply Generator',
            es: 'Generador de Respuestas a Comentarios',
            pt: 'Gerador de Respostas a Comentários',
            fr: 'Générateur de Réponses aux Commentaires',
            de: 'Kommentar-Antwort Generator',
            it: 'Generatore di Risposte ai Commenti'
        },
        descriptions: {
            en: 'Generate witty replies to comments that boost engagement and make people want to comment more.',
            es: 'Genera respuestas ingeniosas a comentarios que aumentan el engagement y hacen que la gente quiera comentar más.',
            pt: 'Gere respostas espirituosas para comentários que aumentam o engajamento e fazem as pessoas quererem comentar mais.',
            fr: 'Générez des réponses spirituelles aux commentaires qui boostent l\'engagement et donnent envie de commenter.',
            de: 'Generiere witzige Antworten auf Kommentare, die das Engagement steigern und Leute zum Kommentieren bringen.',
            it: 'Genera risposte argute ai commenti che aumentano l\'engagement e fanno venire voglia di commentare di più.'
        },
        inputs: [
            { id: 'comment', label: 'The Comment', type: 'textarea', placeholder: 'Paste the comment you received...' },
            { id: 'commentType', label: 'Comment Type', type: 'select', options: 'Positive/Supportive,Question,Criticism,Joke/Humor,Troll/Hate,Request,Confused' },
            { id: 'yourVibe', label: 'Your Brand Vibe', type: 'select', options: 'Funny/Witty,Professional,Friendly,Sarcastic,Wholesome,Edgy' },
            { id: 'language', label: 'Output Language', type: 'language' }
        ],
        prompt_template: `You are a TikTok community management expert. Generate replies that boost engagement and build community.

INPUT:
- Comment: {comment}
- Comment Type: {commentType}
- Your Vibe: {yourVibe}
- Language: {language}

Generate 4 reply options:

## REPLY 1: [Short and sweet]
[Reply text - under 100 chars]

## REPLY 2: [Engaging/Conversational]
[Reply text - invites further discussion]

## REPLY 3: [Witty/Memorable]
[Reply text - the kind that gets screenshot]

## REPLY 4: [Question back]
[Reply text - flips conversation back to them]

## BEST FOR ENGAGEMENT:
[Which reply and why]

## VIDEO REPLY IDEA:
[If this comment is worth a video reply, suggest the concept]

RULES:
- Match comment energy
- Don't feed trolls (but witty deflection is okay)
- Encourage more comments
- Write in {language}`
    },

    // === INSTAGRAM (Currently 13 tools - expanding) ===
    {
        platform: 'instagram',
        slug: 'notes-generator',
        names: {
            en: 'Notes Generator',
            es: 'Generador de Notas',
            pt: 'Gerador de Notas',
            fr: 'Générateur de Notes',
            de: 'Notes Generator',
            it: 'Generatore di Note'
        },
        descriptions: {
            en: 'Create Instagram Notes that make people tap your profile. 60 characters to make an impression.',
            es: 'Crea Notas de Instagram que hacen que la gente entre a tu perfil. 60 caracteres para causar impresión.',
            pt: 'Crie Notas do Instagram que fazem as pessoas tocarem no seu perfil. 60 caracteres para causar impressão.',
            fr: 'Créez des Notes Instagram qui font cliquer sur votre profil. 60 caractères pour faire impression.',
            de: 'Erstelle Instagram Notes, die Leute auf dein Profil bringen. 60 Zeichen für einen Eindruck.',
            it: 'Crea Note Instagram che fanno toccare il tuo profilo. 60 caratteri per fare colpo.'
        },
        inputs: [
            { id: 'noteType', label: 'Note Type', type: 'select', options: 'Status update,Question,Mood,Promotion,Inside joke,Cryptic/Mysterious,Motivational,Current activity' },
            { id: 'context', label: 'Context/Topic', type: 'text', placeholder: 'What is the note about?' },
            { id: 'vibe', label: 'Vibe', type: 'select', options: 'Funny,Chill,Deep,Random,Relatable,Mysterious,Excited' },
            { id: 'language', label: 'Output Language', type: 'language' }
        ],
        prompt_template: `You are an Instagram Notes expert. Create notes that spark curiosity and get DMs.

INPUT:
- Note Type: {noteType}
- Context: {context}
- Vibe: {vibe}
- Language: {language}

Generate 8 Instagram Notes options (MAX 60 characters each - this is strict):

## NOTE 1:
[Note text + appropriate emoji]

## NOTE 2:
[Note text + appropriate emoji]

## NOTE 3:
[Note text + appropriate emoji]

## NOTE 4:
[Note text + appropriate emoji]

## NOTE 5:
[Note text + appropriate emoji]

## NOTE 6:
[Note text + appropriate emoji]

## NOTE 7:
[Note text + appropriate emoji]

## NOTE 8:
[Note text + appropriate emoji]

## BEST FOR DMs:
[Which note is most likely to get replies]

## TIMING TIP:
[When to post for max visibility]

RULES:
- STRICTLY under 60 characters (Instagram limit)
- Include 1-2 relevant emojis
- Be intriguing, not complete
- Write in {language}`
    },
    {
        platform: 'instagram',
        slug: 'collab-post-caption',
        names: {
            en: 'Collab Post Caption Generator',
            es: 'Generador de Caption para Collab',
            pt: 'Gerador de Legenda para Collab',
            fr: 'Générateur de Légende Collab',
            de: 'Collab-Post Untertitel Generator',
            it: 'Generatore di Caption per Collab'
        },
        descriptions: {
            en: 'Create captions for collaboration posts that give credit to both creators and maximize reach.',
            es: 'Crea captions para posts colaborativos que den crédito a ambos creadores y maximicen el alcance.',
            pt: 'Crie legendas para posts de colaboração que dêem crédito a ambos criadores e maximizem o alcance.',
            fr: 'Créez des légendes pour posts collaboratifs qui créditent les deux créateurs et maximisent la portée.',
            de: 'Erstelle Untertitel für Collab-Posts, die beiden Creators Credit geben und Reichweite maximieren.',
            it: 'Crea caption per post collaborativi che diano credito a entrambi i creatori e massimizzino la portata.'
        },
        inputs: [
            { id: 'collabPartner', label: 'Collab Partner', type: 'text', placeholder: '@username or name' },
            { id: 'collabType', label: 'Collab Type', type: 'select', options: 'Brand partnership,Creator collab,Giveaway,Joint project,Event,Friendship feature' },
            { id: 'content', label: 'What is the post about?', type: 'textarea', placeholder: 'Describe the collab content...' },
            { id: 'tone', label: 'Caption Tone', type: 'select', options: 'Professional,Fun/Casual,Grateful,Excited,Storytelling' },
            { id: 'language', label: 'Output Language', type: 'language' }
        ],
        prompt_template: `You are an Instagram collaboration expert. Create captions that work for both creators and their audiences.

INPUT:
- Collab Partner: {collabPartner}
- Collab Type: {collabType}
- Content: {content}
- Tone: {tone}
- Language: {language}

Generate 3 collab caption options:

## CAPTION 1: [Story-driven]
[Full caption with hook, story, credit to partner, CTA]

## CAPTION 2: [Straight to the point]
[Concise caption that clearly explains the collab]

## CAPTION 3: [Fun/Engaging]
[More casual, personality-driven caption]

Each caption should include:
- Clear mention/tag of partner
- Explanation of what the collab is
- Call to action for both audiences
- Relevant hashtags (5-10)

## HASHTAG STRATEGY:
[Mix of both creators' niches]

## ENGAGEMENT TIP:
[How to maximize engagement on collab posts]

Write in {language}. Make both creators look good.`
    },
    {
        platform: 'instagram',
        slug: 'broadcast-content',
        names: {
            en: 'Broadcast Channel Content',
            es: 'Contenido para Canal de Difusión',
            pt: 'Conteúdo para Canal de Transmissão',
            fr: 'Contenu Chaîne de Diffusion',
            de: 'Broadcast-Kanal Inhalt',
            it: 'Contenuto Canale Broadcast'
        },
        descriptions: {
            en: 'Generate content ideas and messages for your Instagram Broadcast Channel that keep subscribers engaged.',
            es: 'Genera ideas de contenido y mensajes para tu Canal de Difusión de Instagram que mantengan a los suscriptores enganchados.',
            pt: 'Gere ideias de conteúdo e mensagens para seu Canal de Transmissão do Instagram que mantenham os assinantes engajados.',
            fr: 'Générez des idées de contenu et messages pour votre Chaîne de Diffusion Instagram qui gardent les abonnés engagés.',
            de: 'Generiere Content-Ideen und Nachrichten für deinen Instagram Broadcast-Kanal, die Abonnenten bei der Stange halten.',
            it: 'Genera idee di contenuto e messaggi per il tuo Canale Broadcast Instagram che mantengano gli iscritti coinvolti.'
        },
        inputs: [
            { id: 'channelTopic', label: 'Channel Topic/Niche', type: 'text', placeholder: 'Fashion tips, behind the scenes, daily life...' },
            { id: 'contentType', label: 'Content Type', type: 'select', options: 'Behind the scenes,Exclusive tips,Personal updates,Polls/Questions,Announcements,Daily thoughts,Exclusive content preview' },
            { id: 'frequency', label: 'Posting Frequency', type: 'select', options: 'Multiple per day,Daily,Few times a week,Weekly' },
            { id: 'language', label: 'Output Language', type: 'language' }
        ],
        prompt_template: `You are an Instagram Broadcast Channel expert. Create engaging content that keeps subscribers coming back.

INPUT:
- Channel Topic: {channelTopic}
- Content Type: {contentType}
- Posting Frequency: {frequency}
- Language: {language}

Generate a week's worth of Broadcast Channel content:

## DAY 1:
**Message Type:** [Type]
**Content:** [The actual message to send]
**Engagement element:** [Poll, question, reaction prompt]

## DAY 2:
[Same format]

## DAY 3:
[Same format]

## DAY 4:
[Same format]

## DAY 5:
[Same format]

## DAY 6:
[Same format]

## DAY 7:
[Same format]

## CONTENT CALENDAR TIPS:
- Best times to send
- How to vary content types
- How to encourage reactions
- When to use polls vs. questions

## SUBSCRIBER GROWTH TIP:
[How to promote your broadcast channel]

Write in {language}. Keep messages conversational and exclusive-feeling.`
    }
];

async function uploadTools() {
    console.log('\\n🚀 Uploading Platform Expansion Tools (Batch 2 - TikTok & Instagram)...\\n');

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
