#!/usr/bin/env node

/**
 * Script to upload missing tools for platforms with few tools (batch 4)
 * Focus: Bluesky, Content, BeReal, Medium, Telegram
 * Run: node scripts/upload-platform-expansion-batch4.mjs
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
    // === BLUESKY (Currently 3 tools - expanding) ===
    {
        platform: 'bluesky',
        slug: 'thread-generator',
        names: {
            en: 'Thread Generator',
            es: 'Generador de Hilos',
            pt: 'Gerador de Threads',
            fr: 'Générateur de Threads',
            de: 'Thread-Generator',
            it: 'Generatore di Thread'
        },
        descriptions: {
            en: 'Create engaging Bluesky threads that people want to read to the end. The new kid on the block deserves great threads.',
            es: 'Crea hilos de Bluesky atractivos que la gente quiera leer hasta el final. El nuevo chico del bloque merece grandes hilos.',
            pt: 'Crie threads de Bluesky envolventes que as pessoas querem ler até o fim. O novato do pedaço merece ótimas threads.',
            fr: 'Créez des threads Bluesky captivants que les gens veulent lire jusqu\'au bout. Le petit nouveau mérite de super threads.',
            de: 'Erstelle fesselnde Bluesky-Threads, die Leute bis zum Ende lesen wollen. Der Neue verdient großartige Threads.',
            it: 'Crea thread di Bluesky coinvolgenti che le persone vogliono leggere fino alla fine. Il nuovo arrivato merita ottimi thread.'
        },
        inputs: [
            { id: 'topic', label: 'Thread Topic', type: 'textarea', placeholder: 'What do you want to share?' },
            { id: 'threadType', label: 'Thread Type', type: 'select', options: 'Story/Personal,Educational,Opinion/Hot take,Tips/Advice,News/Commentary,Behind the scenes,How I... (process),Thread of resources' },
            { id: 'length', label: 'Thread Length', type: 'select', options: '3-5 posts (short),6-10 posts (medium),10+ posts (long)' },
            { id: 'language', label: 'Output Language', type: 'language' }
        ],
        prompt_template: `You are a Bluesky content expert. Create threads that keep readers engaged through the whole story.

INPUT:
- Topic: {topic}
- Thread Type: {threadType}
- Length: {length}
- Language: {language}

Generate a Bluesky thread:

## THREAD

**1/ [Hook - Grab attention]**
[Opening post that makes people want to keep reading]

**2/ [Build on the hook]**
[Continue...]

**3/ [Core content starts]**
[Continue...]

[Continue for remaining posts based on length...]

**[LAST]/ [Strong finish + Call to Action]**
[End with impact - invite replies, reposts, or follows]

---

## THREAD NOTES:

**Hook strength:** [Why post 1 works]
**Pacing:** [How the thread flows]
**CTA suggestion:** [Best ending action]

## ENGAGEMENT TIPS:
- Best time to post
- How to encourage replies
- When to add to the thread later

Write in {language}. Each post should be under 300 characters (Bluesky limit).`
    },
    {
        platform: 'bluesky',
        slug: 'hashtag-finder',
        names: {
            en: 'Hashtag Finder',
            es: 'Buscador de Hashtags',
            pt: 'Encontrador de Hashtags',
            fr: 'Trouveur de Hashtags',
            de: 'Hashtag-Finder',
            it: 'Cercatore di Hashtag'
        },
        descriptions: {
            en: 'Find the right Bluesky hashtags to reach your audience. Because #everything is not a strategy.',
            es: 'Encuentra los hashtags correctos de Bluesky para llegar a tu audiencia. Porque #todo no es una estrategia.',
            pt: 'Encontre as hashtags certas do Bluesky para alcançar seu público. Porque #tudo não é uma estratégia.',
            fr: 'Trouvez les bons hashtags Bluesky pour atteindre votre audience. Parce que #tout n\'est pas une stratégie.',
            de: 'Finde die richtigen Bluesky-Hashtags, um dein Publikum zu erreichen. Weil #alles keine Strategie ist.',
            it: 'Trova gli hashtag Bluesky giusti per raggiungere il tuo pubblico. Perché #tutto non è una strategia.'
        },
        inputs: [
            { id: 'topic', label: 'Your Topic/Niche', type: 'text', placeholder: 'Tech, art, politics, gaming...' },
            { id: 'postContent', label: 'Post Content', type: 'textarea', placeholder: 'What are you posting about?' },
            { id: 'goal', label: 'Goal', type: 'select', options: 'Reach new audience,Join conversations,Build community,Topic visibility,Cross-platform growth' },
            { id: 'language', label: 'Output Language', type: 'language' }
        ],
        prompt_template: `You are a Bluesky hashtag strategist. Find hashtags that actually help discoverability.

INPUT:
- Topic/Niche: {topic}
- Post Content: {postContent}
- Goal: {goal}
- Language: {language}

Generate hashtag recommendations:

## PRIMARY HASHTAGS (Use these)
1. #[hashtag] - [Why: explanation]
2. #[hashtag] - [Why: explanation]
3. #[hashtag] - [Why: explanation]

## SECONDARY HASHTAGS (Mix in sometimes)
4. #[hashtag] - [Why: explanation]
5. #[hashtag] - [Why: explanation]

## NICHE HASHTAGS (Very specific)
6. #[hashtag] - [Why: explanation]
7. #[hashtag] - [Why: explanation]

## TRENDING/TIMELY
8. #[hashtag] - [Currently active because...]

## HASHTAG STRATEGY:

**Best combination for this post:**
[Suggest 2-3 hashtags to use together]

**Avoid these:**
[Hashtags that seem relevant but don't work]

**Bluesky-specific tips:**
- Hashtag culture on Bluesky
- How they differ from Twitter/X
- Community norms to follow

Write in {language}. Focus on actually active Bluesky hashtags.`
    },

    // === CONTENT (Generic content tools - Currently 4) ===
    {
        platform: 'content',
        slug: 'call-to-action',
        names: {
            en: 'CTA Generator',
            es: 'Generador de CTA',
            pt: 'Gerador de CTA',
            fr: 'Générateur de CTA',
            de: 'CTA-Generator',
            it: 'Generatore di CTA'
        },
        descriptions: {
            en: 'Create calls-to-action that actually get clicks. Because "Click Here" was never good advice.',
            es: 'Crea llamadas a la acción que realmente obtienen clics. Porque "Haz clic aquí" nunca fue un buen consejo.',
            pt: 'Crie chamadas para ação que realmente geram cliques. Porque "Clique Aqui" nunca foi um bom conselho.',
            fr: 'Créez des appels à l\'action qui obtiennent vraiment des clics. Parce que "Cliquez ici" n\'a jamais été un bon conseil.',
            de: 'Erstelle Handlungsaufforderungen, die wirklich Klicks bekommen. Weil "Hier klicken" nie ein guter Rat war.',
            it: 'Crea call-to-action che ottengono davvero clic. Perché "Clicca qui" non è mai stato un buon consiglio.'
        },
        inputs: [
            { id: 'product', label: 'Product/Service/Content', type: 'text', placeholder: 'What are you promoting?' },
            { id: 'ctaType', label: 'CTA Type', type: 'select', options: 'Button text,Email CTA,Landing page,Social media,Video end screen,Newsletter,Product page,Free trial/Demo' },
            { id: 'action', label: 'Desired Action', type: 'select', options: 'Sign up,Buy now,Download,Subscribe,Learn more,Start trial,Book demo,Join,Share,Contact' },
            { id: 'urgency', label: 'Urgency Level', type: 'select', options: 'None,Soft urgency,Strong urgency,Limited time,Scarcity' },
            { id: 'language', label: 'Output Language', type: 'language' }
        ],
        prompt_template: `You are a conversion copywriter. Create CTAs that compel action.

INPUT:
- Product/Service: {product}
- CTA Type: {ctaType}
- Desired Action: {action}
- Urgency: {urgency}
- Language: {language}

Generate CTA options:

## BUTTON CTAs (Short - 2-4 words)
1. [CTA]
2. [CTA]
3. [CTA]
4. [CTA]
5. [CTA]

## SENTENCE CTAs (Longer format)
6. [CTA sentence]
7. [CTA sentence]
8. [CTA sentence]

## WITH URGENCY
9. [CTA with time pressure]
10. [CTA with scarcity]

## BEST PICKS:

**Highest converting (likely):** [CTA] - Why: [reason]
**Most unique:** [CTA] - Why: [reason]
**Safest option:** [CTA] - Why: [reason]

## A/B TEST PAIR:
[CTA A] vs [CTA B]
What you're testing: [variable]

## CTA TIPS:
- Where to place it
- Supporting copy to add
- Common mistakes to avoid

Write in {language}. Keep button CTAs under 5 words.`
    },
    {
        platform: 'content',
        slug: 'hook-variations',
        names: {
            en: 'Hook Variations Generator',
            es: 'Generador de Variaciones de Ganchos',
            pt: 'Gerador de Variações de Ganchos',
            fr: 'Générateur de Variations d\'Accroches',
            de: 'Hook-Variationen Generator',
            it: 'Generatore di Variazioni di Hook'
        },
        descriptions: {
            en: 'Turn one hook into 10 variations for A/B testing. Find out which angle hits hardest.',
            es: 'Convierte un gancho en 10 variaciones para pruebas A/B. Descubre qué ángulo impacta más.',
            pt: 'Transforme um gancho em 10 variações para testes A/B. Descubra qual ângulo impacta mais.',
            fr: 'Transformez une accroche en 10 variations pour les tests A/B. Découvrez quel angle frappe le plus fort.',
            de: 'Verwandle einen Hook in 10 Variationen für A/B-Tests. Finde heraus, welcher Winkel am härtesten trifft.',
            it: 'Trasforma un hook in 10 variazioni per test A/B. Scopri quale angolazione colpisce più forte.'
        },
        inputs: [
            { id: 'originalHook', label: 'Original Hook', type: 'textarea', placeholder: 'Paste your current hook/headline' },
            { id: 'contentType', label: 'Content Type', type: 'select', options: 'Video hook,Ad headline,Email subject,Social post,Article title,Landing page headline' },
            { id: 'targetEmotion', label: 'Target Emotion', type: 'select', options: 'Curiosity,Fear of missing out,Excitement,Empathy,Shock,Humor,Aspiration,Urgency' },
            { id: 'language', label: 'Output Language', type: 'language' }
        ],
        prompt_template: `You are a hook specialist. Create variations to test what resonates most.

INPUT:
- Original Hook: {originalHook}
- Content Type: {contentType}
- Target Emotion: {targetEmotion}
- Language: {language}

Generate 10 hook variations:

## ORIGINAL ANALYSIS
**Original:** "{originalHook}"
**Strength:** [What works]
**Weakness:** [What could be better]
**Core message:** [The essence to preserve]

---

## VARIATIONS

**1. QUESTION FORMAT**
[Hook as a compelling question]

**2. STATEMENT FORMAT**
[Bold, declarative hook]

**3. "YOU" FOCUSED**
[Direct address to reader]

**4. NUMBER/LIST**
[Hook with specific number]

**5. CONTROVERSIAL/BOLD**
[Edgier angle]

**6. CURIOSITY GAP**
[Creates mystery]

**7. BENEFIT-LED**
[Focus on what they get]

**8. PAIN POINT**
[Addresses the problem]

**9. STORY OPENING**
[Narrative hook]

**10. SHORT & PUNCHY**
[Minimal words, max impact]

---

## TESTING STRATEGY:

**Test 1:** [Variation A] vs [Variation B]
Testing: [Variable]

**Test 2:** [Variation C] vs [Variation D]
Testing: [Variable]

**Predicted winner:** [Which and why]

Write in {language}. Keep each variation tight and testable.`
    },

    // === BEREAL (Currently 3 tools - expanding) ===
    {
        platform: 'bereal',
        slug: 'caption-generator',
        names: {
            en: 'BeReal Caption Generator',
            es: 'Generador de Captions para BeReal',
            pt: 'Gerador de Legendas para BeReal',
            fr: 'Générateur de Légendes BeReal',
            de: 'BeReal Beschriftungs-Generator',
            it: 'Generatore di Didascalie BeReal'
        },
        descriptions: {
            en: 'Write BeReal captions that match the authentic vibe. Be real about being real.',
            es: 'Escribe captions de BeReal que coincidan con la vibra auténtica. Sé real sobre ser real.',
            pt: 'Escreva legendas de BeReal que combinem com a vibe autêntica. Seja real sobre ser real.',
            fr: 'Écrivez des légendes BeReal qui correspondent à l\'ambiance authentique. Soyez réel sur le fait d\'être réel.',
            de: 'Schreibe BeReal-Beschriftungen, die zur authentischen Stimmung passen. Sei echt übers Echt-Sein.',
            it: 'Scrivi didascalie BeReal che corrispondano all\'atmosfera autentica. Sii reale sull\'essere reale.'
        },
        inputs: [
            { id: 'situation', label: 'Your Situation', type: 'text', placeholder: 'What were you doing when BeReal went off?' },
            { id: 'mood', label: 'Your Mood', type: 'select', options: 'Living my best life,Caught off guard,Boring moment,Actually doing something cool,Embarrassing but funny,Work/Study grind,Social moment,Solo vibes' },
            { id: 'captionStyle', label: 'Caption Style', type: 'select', options: 'Honest/Dry humor,Self-deprecating,Hype/Excited,Minimal/One word,Story time,Question for friends,Inside joke setup' },
            { id: 'language', label: 'Output Language', type: 'language' }
        ],
        prompt_template: `You are a BeReal expert who understands the platform's authentic culture.

INPUT:
- Situation: {situation}
- Mood: {mood}
- Caption Style: {captionStyle}
- Language: {language}

Generate BeReal caption options:

## CAPTIONS

**1. [The Honest One]**
[Straightforward caption about the moment]

**2. [The Funny One]**
[Adding humor to the situation]

**3. [The Minimal One]**
[Short, punchy, few words]

**4. [The Relatable One]**
[Something others will feel]

**5. [The Question]**
[Engages friends to respond]

**6. [The Context One]**
[Explains what's happening]

**7. [The Self-Aware One]**
[Acknowledging the BeReal culture]

---

## BEST PICKS:

**For your feed:** [Caption] - Why: [reason]
**For close friends:** [Caption] - Why: [reason]
**Most authentic:** [Caption] - Why: [reason]

## BEREAL CAPTION TIPS:
- Less curated = better
- Match the chaos of the moment
- Don't try too hard
- Late BeReal acknowledgment ideas

Write in {language}. Keep captions short and genuine.`
    },
    {
        platform: 'bereal',
        slug: 'reaction-ideas',
        names: {
            en: 'BeReal Reaction Ideas',
            es: 'Ideas de Reacciones para BeReal',
            pt: 'Ideias de Reações para BeReal',
            fr: 'Idées de Réactions BeReal',
            de: 'BeReal Reaktions-Ideen',
            it: 'Idee per Reazioni BeReal'
        },
        descriptions: {
            en: 'Creative reaction photo ideas for your friends\' BeReals. Stand out in the RealMoji section.',
            es: 'Ideas creativas de fotos de reacción para los BeReals de tus amigos. Destaca en la sección RealMoji.',
            pt: 'Ideias criativas de fotos de reação para os BeReals dos seus amigos. Destaque-se na seção RealMoji.',
            fr: 'Idées créatives de photos de réaction pour les BeReals de vos amis. Démarquez-vous dans la section RealMoji.',
            de: 'Kreative Reaktionsfoto-Ideen für die BeReals deiner Freunde. Steche in der RealMoji-Sektion hervor.',
            it: 'Idee creative per foto di reazione ai BeReal dei tuoi amici. Distinguiti nella sezione RealMoji.'
        },
        inputs: [
            { id: 'friendsPost', label: 'What Did They Post?', type: 'text', placeholder: 'Describe your friend\'s BeReal' },
            { id: 'yourLocation', label: 'Your Current Location', type: 'select', options: 'At home,At work/school,Outside,In bed,With others,In public,In transit,Eating/Drinking' },
            { id: 'vibe', label: 'Reaction Vibe', type: 'select', options: 'Supportive/Hype,Jealous/Envious (joking),Confused,Impressed,Matching their energy,Judging (lovingly),Random chaos' },
            { id: 'language', label: 'Output Language', type: 'language' }
        ],
        prompt_template: `You are a BeReal culture expert. Suggest creative reactions to friends' posts.

INPUT:
- Friend's Post: {friendsPost}
- Your Location: {yourLocation}
- Reaction Vibe: {vibe}
- Language: {language}

Generate reaction ideas:

## REACTION PHOTO IDEAS

**1. THE PERFECT MATCH**
Pose: [Description]
Expression: [What face to make]
Why it works: [Brief explanation]

**2. THE CONTRAST**
Pose: [Description]
Expression: [What face to make]
Why it works: [Brief explanation]

**3. THE CHAOTIC**
Pose: [Description]
Expression: [What face to make]
Why it works: [Brief explanation]

**4. THE SUBTLE**
Pose: [Description]
Expression: [What face to make]
Why it works: [Brief explanation]

**5. THE CREATIVE**
Pose: [Description]
Expression: [What face to make]
Why it works: [Brief explanation]

---

## BEST PICK FOR THIS SITUATION:
[Recommend one and explain why]

## REALMOJI TIPS:
- Lighting suggestions for your location
- Props to grab if available
- How to be quick before time runs out

Write in {language}. Keep it fun and authentic.`
    },

    // === MEDIUM (Currently 3 tools - expanding) ===
    {
        platform: 'medium',
        slug: 'article-outline',
        names: {
            en: 'Article Outline Generator',
            es: 'Generador de Esquemas de Artículos',
            pt: 'Gerador de Esboços de Artigos',
            fr: 'Générateur de Plans d\'Articles',
            de: 'Artikel-Gliederungs Generator',
            it: 'Generatore di Schemi per Articoli'
        },
        descriptions: {
            en: 'Create Medium article outlines that flow well and keep readers scrolling. Structure is half the battle.',
            es: 'Crea esquemas de artículos de Medium que fluyan bien y mantengan a los lectores leyendo. La estructura es la mitad de la batalla.',
            pt: 'Crie esboços de artigos do Medium que fluam bem e mantenham os leitores rolando. Estrutura é metade da batalha.',
            fr: 'Créez des plans d\'articles Medium qui coulent bien et gardent les lecteurs en lecture. La structure c\'est la moitié de la bataille.',
            de: 'Erstelle Medium-Artikelgliederungen, die gut fließen und Leser am Scrollen halten. Struktur ist die halbe Miete.',
            it: 'Crea schemi di articoli Medium che scorrano bene e tengano i lettori a leggere. La struttura è metà della battaglia.'
        },
        inputs: [
            { id: 'topic', label: 'Article Topic', type: 'textarea', placeholder: 'What do you want to write about?' },
            { id: 'articleType', label: 'Article Type', type: 'select', options: 'How-to guide,Opinion/Essay,Story/Personal experience,Listicle,Analysis/Deep dive,Tutorial,Case study,Thought leadership' },
            { id: 'targetLength', label: 'Target Length', type: 'select', options: 'Short (3-5 min read),Medium (6-10 min read),Long (11-15 min read),Epic (15+ min read)' },
            { id: 'targetAudience', label: 'Target Audience', type: 'text', placeholder: 'Who is this article for?' },
            { id: 'language', label: 'Output Language', type: 'language' }
        ],
        prompt_template: `You are a Medium content strategist. Create outlines that become successful articles.

INPUT:
- Topic: {topic}
- Article Type: {articleType}
- Target Length: {targetLength}
- Audience: {targetAudience}
- Language: {language}

Generate article outline:

## ARTICLE STRUCTURE

### HEADLINE OPTIONS
1. [Title option 1]
2. [Title option 2]
3. [Title option 3]

### SUBTITLE
[Supporting subtitle that adds context]

---

## OPENING (The Hook)
**Goal:** Grab attention in first 2 sentences
[Outline what the opening paragraph should accomplish]
- Hook approach: [Type of hook]
- Key point to establish: [What]

## SECTION 1: [Title]
**Goal:** [What this section accomplishes]
- Main point:
- Supporting detail:
- Example/Evidence:
- Transition to next section:

## SECTION 2: [Title]
**Goal:** [What this section accomplishes]
- Main point:
- Supporting detail:
- Example/Evidence:
- Transition to next section:

## SECTION 3: [Title]
**Goal:** [What this section accomplishes]
- Main point:
- Supporting detail:
- Example/Evidence:
- Transition to next section:

[Add more sections based on target length]

## CONCLUSION
**Goal:** Leave lasting impression
- Key takeaway to reinforce:
- Call to action:
- Closing thought:

---

## MEDIUM-SPECIFIC TIPS:
- Where to place pull quotes
- Image suggestions
- Subheading optimization
- Best publication to pitch

Write in {language}. Create a clear roadmap for writing.`
    },
    {
        platform: 'medium',
        slug: 'publication-pitch',
        names: {
            en: 'Publication Pitch Generator',
            es: 'Generador de Pitch para Publicaciones',
            pt: 'Gerador de Pitch para Publicações',
            fr: 'Générateur de Pitch pour Publications',
            de: 'Publikations-Pitch Generator',
            it: 'Generatore di Pitch per Pubblicazioni'
        },
        descriptions: {
            en: 'Write pitches to Medium publications that actually get accepted. Get your work in front of bigger audiences.',
            es: 'Escribe pitches para publicaciones de Medium que realmente sean aceptados. Pon tu trabajo frente a audiencias más grandes.',
            pt: 'Escreva pitches para publicações do Medium que realmente sejam aceitos. Coloque seu trabalho na frente de públicos maiores.',
            fr: 'Écrivez des pitches aux publications Medium qui sont vraiment acceptés. Mettez votre travail devant de plus grands publics.',
            de: 'Schreibe Pitches an Medium-Publikationen, die tatsächlich akzeptiert werden. Bringe deine Arbeit vor größere Zielgruppen.',
            it: 'Scrivi pitch alle pubblicazioni Medium che vengono effettivamente accettati. Metti il tuo lavoro davanti a pubblici più grandi.'
        },
        inputs: [
            { id: 'articleTopic', label: 'Article Topic/Title', type: 'text', placeholder: 'What is your article about?' },
            { id: 'publication', label: 'Target Publication (if known)', type: 'text', placeholder: 'e.g., Better Programming, The Startup, UX Collective...' },
            { id: 'uniqueAngle', label: 'Your Unique Angle', type: 'textarea', placeholder: 'What makes your take different?' },
            { id: 'credentials', label: 'Your Credentials', type: 'text', placeholder: 'Why are you qualified to write this?' },
            { id: 'language', label: 'Output Language', type: 'language' }
        ],
        prompt_template: `You are a Medium publication expert. Write pitches that editors actually respond to.

INPUT:
- Article Topic: {articleTopic}
- Target Publication: {publication}
- Unique Angle: {uniqueAngle}
- Your Credentials: {credentials}
- Language: {language}

Generate publication pitch:

## PITCH EMAIL

**Subject Line Options:**
1. [Subject line 1]
2. [Subject line 2]

---

**Pitch:**

Hi [Editor name/Team],

[Opening - brief intro and why you're reaching out]

[Article pitch - what it's about, the unique angle]

[Why it fits this publication]

[Brief credentials - 1-2 sentences max]

[What's ready - draft status]

[Closing]

[Your name]
[Profile link]

---

## SHORTER VERSION (For submission forms)

[Condensed version of pitch in 100-150 words]

---

## PITCH NOTES:

**Key selling points:**
- [Point 1]
- [Point 2]
- [Point 3]

**Potential objections and responses:**
- [Objection]: [Response]

**Follow-up timing:**
When to follow up if no response

**Publications to pitch:**
1. [Publication 1] - Why: [fit reason]
2. [Publication 2] - Why: [fit reason]
3. [Publication 3] - Why: [fit reason]

Write in {language}. Keep pitch concise and professional.`
    },

    // === TELEGRAM (Currently 3 tools - expanding) ===
    {
        platform: 'telegram',
        slug: 'channel-description',
        names: {
            en: 'Channel Description Generator',
            es: 'Generador de Descripción de Canal',
            pt: 'Gerador de Descrição de Canal',
            fr: 'Générateur de Description de Chaîne',
            de: 'Kanal-Beschreibungs Generator',
            it: 'Generatore di Descrizione Canale'
        },
        descriptions: {
            en: 'Write Telegram channel descriptions that make people want to join. First impressions at 255 characters.',
            es: 'Escribe descripciones de canales de Telegram que hagan que la gente quiera unirse. Primeras impresiones en 255 caracteres.',
            pt: 'Escreva descrições de canais do Telegram que façam as pessoas quererem entrar. Primeiras impressões em 255 caracteres.',
            fr: 'Écrivez des descriptions de chaînes Telegram qui donnent envie de rejoindre. Premières impressions en 255 caractères.',
            de: 'Schreibe Telegram-Kanalbeschreibungen, die Leute zum Beitreten bringen. Erster Eindruck in 255 Zeichen.',
            it: 'Scrivi descrizioni di canali Telegram che facciano venire voglia di unirsi. Prime impressioni in 255 caratteri.'
        },
        inputs: [
            { id: 'channelTopic', label: 'Channel Topic', type: 'text', placeholder: 'What is your channel about?' },
            { id: 'channelType', label: 'Channel Type', type: 'select', options: 'News/Updates,Educational,Entertainment,Business/Deals,Community,Tech,Crypto,Gaming,Lifestyle,Personal brand' },
            { id: 'uniqueValue', label: 'Unique Value', type: 'text', placeholder: 'What makes your channel special?' },
            { id: 'postingFrequency', label: 'Posting Frequency', type: 'select', options: 'Multiple daily,Daily,Few times/week,Weekly,As needed' },
            { id: 'language', label: 'Output Language', type: 'language' }
        ],
        prompt_template: `You are a Telegram growth expert. Write channel descriptions that convert views to subscribers.

INPUT:
- Channel Topic: {channelTopic}
- Channel Type: {channelType}
- Unique Value: {uniqueValue}
- Posting Frequency: {postingFrequency}
- Language: {language}

Generate channel description options:

## DESCRIPTIONS (Max 255 characters each)

**1. BENEFIT-FOCUSED**
[Description emphasizing what subscribers get]
Characters: [count]

**2. CURIOSITY-DRIVEN**
[Description that makes them want to know more]
Characters: [count]

**3. STRAIGHTFORWARD**
[Clear, direct description]
Characters: [count]

**4. WITH EMOJI**
[Description with strategic emoji use]
Characters: [count]

**5. MINIMAL**
[Short and punchy]
Characters: [count]

---

## BEST PICK:
[Recommendation and why]

## DESCRIPTION ELEMENTS TO INCLUDE:
- ✓ What content you share
- ✓ How often
- ✓ Why they should care
- ✓ Call to action (if space)

## COMPLEMENTARY ELEMENTS:
- Suggested channel username
- Pinned message idea
- Welcome message idea

Write in {language}. Stay under 255 characters.`
    },
    {
        platform: 'telegram',
        slug: 'bot-responses',
        names: {
            en: 'Bot Response Generator',
            es: 'Generador de Respuestas de Bot',
            pt: 'Gerador de Respostas de Bot',
            fr: 'Générateur de Réponses de Bot',
            de: 'Bot-Antwort Generator',
            it: 'Generatore di Risposte Bot'
        },
        descriptions: {
            en: 'Create Telegram bot responses that feel human. Because nobody likes talking to a robot that sounds like a robot.',
            es: 'Crea respuestas de bot de Telegram que se sientan humanas. Porque a nadie le gusta hablar con un robot que suena como robot.',
            pt: 'Crie respostas de bot do Telegram que pareçam humanas. Porque ninguém gosta de falar com um robô que parece um robô.',
            fr: 'Créez des réponses de bot Telegram qui semblent humaines. Parce que personne n\'aime parler à un robot qui sonne comme un robot.',
            de: 'Erstelle Telegram-Bot-Antworten, die menschlich wirken. Weil niemand gerne mit einem Roboter spricht, der wie ein Roboter klingt.',
            it: 'Crea risposte di bot Telegram che sembrino umane. Perché a nessuno piace parlare con un robot che sembra un robot.'
        },
        inputs: [
            { id: 'botPurpose', label: 'Bot Purpose', type: 'text', placeholder: 'What does your bot do?' },
            { id: 'botPersonality', label: 'Bot Personality', type: 'select', options: 'Friendly/Casual,Professional,Helpful assistant,Witty/Funny,Minimal/Efficient,Warm/Caring' },
            { id: 'responseTypes', label: 'Response Types Needed', type: 'select', options: 'Welcome/Onboarding,Commands help,Error messages,Success confirmations,FAQ responses,All of the above' },
            { id: 'language', label: 'Output Language', type: 'language' }
        ],
        prompt_template: `You are a UX writer for chatbots. Create responses that feel natural and helpful.

INPUT:
- Bot Purpose: {botPurpose}
- Bot Personality: {botPersonality}
- Response Types: {responseTypes}
- Language: {language}

Generate bot responses:

## WELCOME/START MESSAGE
[First message when user opens bot]

## HELP MENU
[Response to /help command]

## COMMAND RESPONSES

**/start**
[Welcome response]

**/help**
[Help menu response]

**[Custom command 1]**
[Response]

**[Custom command 2]**
[Response]

## ERROR MESSAGES

**Invalid input:**
[Response]

**Action failed:**
[Response]

**Rate limited:**
[Response]

**Not authorized:**
[Response]

## SUCCESS MESSAGES

**Action completed:**
[Response]

**Settings saved:**
[Response]

## CONVERSATIONAL RESPONSES

**User says thanks:**
[Response]

**User confused:**
[Response]

**User frustrated:**
[Response]

---

## BOT VOICE GUIDE:
- Tone: [Description]
- Emoji usage: [How much, what types]
- Length: [Short, medium, detailed]
- Personality traits to convey: [List]

Write in {language}. Keep responses appropriate for chat interface.`
    }
];

async function uploadTools() {
    console.log('\\n🚀 Uploading Platform Expansion Tools (Batch 4)...\\n');

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
