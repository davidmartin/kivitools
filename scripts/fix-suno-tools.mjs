#!/usr/bin/env node

/**
 * Script to fix Suno tools quality in Appwrite
 * Updates: description, inputs, and prompt_template
 * 
 * Run: node scripts/fix-suno-tools.mjs
 */

import { Client, Databases, Query } from "node-appwrite";
import dotenv from "dotenv";

dotenv.config({ path: ".env.local" });

const client = new Client()
    .setEndpoint(process.env.APPWRITE_ENDPOINT || "https://cloud.appwrite.io/v1")
    .setProject(process.env.APPWRITE_PROJECT_ID || "")
    .setKey(process.env.APPWRITE_API_KEY || "");

const databases = new Databases(client);
const DATABASE_ID = process.env.APPWRITE_DATABASE_ID;
const COLLECTION_ID = "tools";

// Fixed tool configurations with proper descriptions, inputs, and prompts
const SUNO_TOOLS_FIX = {
    "lyric-generator": {
        descriptions: {
            en: "Create song lyrics that'll make listeners hit repeat until their thumbs hurt. From heartbreak ballads to club bangers, generate lyrics that actually slap.",
            es: "Crea letras de canciones que harán que los oyentes le den a repetir hasta que les duelan los pulgares. Desde baladas de desamor hasta temazos de club.",
            pt: "Crie letras de músicas que farão os ouvintes apertar o repeat até doer os polegares. De baladas de coração partido a hits de clube.",
            fr: "Créez des paroles de chansons qui feront appuyer sur repeat jusqu'à l'usure. Des ballades mélancoliques aux tubes de club.",
            de: "Erstelle Songtexte, die Hörer auf Repeat drücken lassen, bis die Daumen schmerzen. Von Herzschmerz-Balladen bis Club-Hits.",
            it: "Crea testi di canzoni che faranno premere repeat fino allo sfinimento. Dalle ballate strappalacrime ai tormentoni da club."
        },
        inputs: JSON.stringify([
            { id: "genre", label: "Music Genre", type: "select", options: "Pop,Rock,Hip-Hop,R&B,Country,Electronic,Jazz,Folk,Reggaeton,Indie,Metal,Soul,Funk,Blues,Classical", required: true },
            { id: "mood", label: "Song Mood", type: "select", options: "Happy,Sad,Romantic,Angry,Chill,Energetic,Nostalgic,Melancholic,Empowering,Dreamy", required: true },
            { id: "theme", label: "Song Theme", type: "text", placeholder: "Love, heartbreak, party, life journey, summer vibes...", required: true },
            { id: "language", label: "Lyrics Language", type: "language", required: true }
        ]),
        prompt_template: `You are a professional songwriter and lyricist with experience writing hit songs across all genres.

Create original song lyrics based on:
- Genre: {genre}
- Mood: {mood}  
- Theme: {theme}
- Language: {language}

Generate complete lyrics with this structure:
1. **Verse 1** (4-6 lines) - Set the scene, introduce the story
2. **Pre-Chorus** (2 lines) - Build tension
3. **Chorus** (4 lines) - The hook, catchy and memorable
4. **Verse 2** (4-6 lines) - Develop the story
5. **Chorus** (repeat)
6. **Bridge** (2-4 lines) - New perspective or emotional peak
7. **Final Chorus** (with slight variation)

Requirements:
- Natural rhyme schemes (ABAB or AABB)
- Singable syllable patterns
- Emotionally resonant imagery
- Match the {mood} mood perfectly
- Genre-appropriate vocabulary and style
- Create a memorable hook in the chorus

Output ONLY the lyrics with section headers. No explanations.`
    },

    "prompt-generator": {
        descriptions: {
            en: "Generate Suno AI prompts that actually work. Stop getting generic elevator music and start creating bangers that sound like they cost $10k to produce.",
            es: "Genera prompts para Suno AI que realmente funcionan. Deja de obtener música de ascensor genérica y empieza a crear temazos que suenan como si costaran 10k.",
            pt: "Gere prompts para Suno AI que realmente funcionam. Pare de obter música genérica de elevador e comece a criar hits que parecem custar 10k.",
            fr: "Générez des prompts Suno AI qui fonctionnent vraiment. Arrêtez la musique d'ascenseur générique et créez des tubes qui sonnent comme s'ils coûtaient 10k.",
            de: "Erstelle Suno AI Prompts die wirklich funktionieren. Schluss mit generischer Fahrstuhlmusik - erstelle Hits die klingen wie 10k Produktionen.",
            it: "Genera prompt Suno AI che funzionano davvero. Smetti di ottenere musica da ascensore e inizia a creare hit che sembrano costare 10k."
        },
        inputs: JSON.stringify([
            { id: "genre", label: "Music Genre", type: "select", options: "Pop,Rock,Hip-Hop,Electronic,Jazz,Classical,Country,R&B,Reggae,Metal,Ambient,Lo-fi,Synthwave,Phonk,Trap", required: true },
            { id: "instruments", label: "Key Instruments", type: "text", placeholder: "Piano, synths, 808s, guitar, strings, drums...", required: true },
            { id: "vibe", label: "Overall Vibe", type: "select", options: "Upbeat & Energetic,Chill & Relaxed,Dark & Moody,Emotional & Dramatic,Funky & Groovy,Epic & Cinematic,Nostalgic & Dreamy,Aggressive & Powerful", required: true },
            { id: "bpm", label: "Tempo (BPM)", type: "select", options: "Slow (60-80 BPM),Medium (80-110 BPM),Upbeat (110-130 BPM),Fast (130-150 BPM),Very Fast (150+ BPM)", required: false },
            { id: "reference", label: "Reference Artist/Song (Optional)", type: "text", placeholder: "Sounds like Daft Punk, similar to Blinding Lights...", required: false }
        ]),
        prompt_template: `You are an expert music producer who specializes in creating detailed prompts for Suno AI.

Create a Suno AI prompt based on:
- Genre: {genre}
- Key Instruments: {instruments}
- Overall Vibe: {vibe}
- Tempo: {bpm}
- Reference: {reference}

Generate a detailed prompt following this format:

**SUNO PROMPT:**
[Main prompt with genre, style, mood, and production details]

**STYLE TAGS:**
[Comma-separated tags for the music style]

**STRUCTURE SUGGESTION:**
[Intro/Verse/Chorus structure recommendation]

Requirements for the prompt:
- Be specific about instrumentation and production style
- Include dynamics (build-ups, drops, transitions)
- Mention vocal style if applicable (male/female, raspy, smooth, etc.)
- Reference specific production techniques (reverb, compression, etc.)
- Keep it under 200 characters for Suno's limit
- Make it sound professional and produce high-quality results

Output the prompt ready to paste into Suno.`
    },

    "description-generator": {
        descriptions: {
            en: "Write song descriptions that make people actually click play. Because 'just a song I made' isn't cutting it anymore.",
            es: "Escribe descripciones de canciones que hagan que la gente realmente le dé a play. Porque 'solo una canción que hice' ya no funciona.",
            pt: "Escreva descrições de músicas que façam as pessoas clicarem em play. Porque 'só uma música que fiz' não funciona mais.",
            fr: "Écrivez des descriptions de chansons qui donnent envie d'appuyer sur play. Parce que 'juste une chanson que j'ai faite' ne suffit plus.",
            de: "Schreibe Song-Beschreibungen die Leute zum Klicken bringen. Weil 'nur ein Song den ich gemacht habe' nicht mehr reicht.",
            it: "Scrivi descrizioni di canzoni che fanno cliccare play. Perché 'solo una canzone che ho fatto' non basta più."
        },
        inputs: JSON.stringify([
            { id: "songTitle", label: "Song Title", type: "text", placeholder: "Enter your song title...", required: true },
            { id: "genre", label: "Genre", type: "select", options: "Pop,Rock,Hip-Hop,Electronic,Jazz,Classical,Country,R&B,Reggae,Metal,Ambient,Lo-fi,Synthwave,Indie", required: true },
            { id: "mood", label: "Song Mood/Vibe", type: "text", placeholder: "Nostalgic summer nights, intense workout energy, peaceful meditation...", required: true },
            { id: "story", label: "Story/Inspiration Behind the Song", type: "textarea", placeholder: "What inspired this song? What's the story?", required: false },
            { id: "language", label: "Description Language", type: "language", required: true }
        ]),
        prompt_template: `You are a music marketing expert who writes compelling song descriptions for streaming platforms.

Write a captivating description for:
- Song Title: {songTitle}
- Genre: {genre}
- Mood/Vibe: {mood}
- Story/Inspiration: {story}
- Language: {language}

Create a description that:
1. Opens with a hook that captures attention
2. Describes the sonic landscape and production
3. Connects emotionally with potential listeners
4. Includes relevant keywords for discovery
5. Ends with a call-to-action or memorable line

Format:
**SHORT VERSION** (2-3 sentences for social media)
**FULL VERSION** (4-6 sentences for streaming platforms)
**HASHTAGS** (5-7 relevant hashtags)

Requirements:
- Make it engaging, not generic
- Avoid clichés like "this song is about..."
- Use sensory language (sounds like, feels like)
- Match the tone to the music genre
- Be authentic and intriguing

Output in {language}.`
    },

    "song-title-generator": {
        descriptions: {
            en: "Generate song titles that stick in people's heads like that one song you can't stop humming. Creative, catchy, and actually memorable.",
            es: "Genera títulos de canciones que se quedan en la cabeza como esa canción que no puedes dejar de tararear. Creativos, pegadizos y memorables.",
            pt: "Gere títulos de músicas que grudam na cabeça como aquela música que você não para de cantarolar. Criativos, cativantes e memoráveis.",
            fr: "Générez des titres de chansons qui restent en tête comme cette chanson qu'on ne peut pas arrêter de fredonner. Créatifs et mémorables.",
            de: "Generiere Songtitel die im Kopf bleiben wie dieser eine Song den man nicht aufhören kann zu summen. Kreativ und einprägsam.",
            it: "Genera titoli di canzoni che rimangono in testa come quella canzone che non riesci a smettere di canticchiare. Creativi e memorabili."
        },
        inputs: JSON.stringify([
            { id: "theme", label: "Song Theme/Topic", type: "text", placeholder: "Love, heartbreak, summer party, self-discovery...", required: true },
            { id: "genre", label: "Music Genre", type: "select", options: "Pop,Rock,Hip-Hop,Electronic,Jazz,Country,R&B,Reggaeton,Indie,Metal,Folk,Ambient,Lo-fi", required: true },
            { id: "style", label: "Title Style", type: "select", options: "One Word (Powerful),Two Words (Classic),Full Phrase,Question,Metaphorical,Abstract/Artistic,Direct/Literal", required: true },
            { id: "mood", label: "Mood", type: "select", options: "Happy/Uplifting,Sad/Melancholic,Romantic,Angry/Intense,Chill/Relaxed,Mysterious,Empowering", required: true },
            { id: "language", label: "Title Language", type: "language", required: true }
        ]),
        prompt_template: `You are a creative director at a major record label, known for coming up with iconic song titles.

Generate song titles based on:
- Theme/Topic: {theme}
- Genre: {genre}
- Title Style: {style}
- Mood: {mood}
- Language: {language}

Create 10 unique song titles that are:
1. Memorable and catchy
2. Evocative (create imagery or emotion)
3. Original (not copies of existing famous songs)
4. Appropriate for the genre
5. Easy to search and discover

Format your response as:
🎵 **TOP PICKS** (3 best options with brief explanation)
1. [Title] - Why it works
2. [Title] - Why it works
3. [Title] - Why it works

📝 **MORE OPTIONS** (7 alternatives)
4-10. [Titles listed]

Requirements:
- Mix literal and metaphorical options
- Consider how the title looks visually
- Think about searchability (SEO)
- Avoid overused clichés
- Make them sound like actual hit songs

Output in {language}.`
    },

    "song-tag-generator": {
        descriptions: {
            en: "Generate the perfect tags so your Suno masterpiece doesn't get buried under 10 million 'lo-fi beats to study to'. Get discovered, finally.",
            es: "Genera las etiquetas perfectas para que tu obra maestra de Suno no quede enterrada bajo 10 millones de 'lo-fi beats para estudiar'. Que te descubran, por fin.",
            pt: "Gere as tags perfeitas para que sua obra-prima do Suno não fique enterrada sob 10 milhões de 'lo-fi beats para estudar'. Seja descoberto, finalmente.",
            fr: "Générez les tags parfaits pour que votre chef-d'œuvre Suno ne soit pas enterré sous 10 millions de 'lo-fi beats'. Soyez enfin découvert.",
            de: "Generiere die perfekten Tags damit dein Suno-Meisterwerk nicht unter 10 Millionen 'lo-fi beats' begraben wird. Endlich entdeckt werden.",
            it: "Genera i tag perfetti così il tuo capolavoro Suno non finisce sepolto sotto 10 milioni di 'lo-fi beats'. Fatti scoprire, finalmente."
        },
        inputs: JSON.stringify([
            { id: "genre", label: "Primary Genre", type: "select", options: "Pop,Rock,Hip-Hop,Electronic,EDM,Jazz,Classical,Country,R&B,Reggae,Metal,Ambient,Lo-fi,Synthwave,Phonk,Trap,House,Techno", required: true },
            { id: "subgenre", label: "Sub-genre/Style", type: "text", placeholder: "Indie pop, melodic dubstep, neo-soul, future bass...", required: false },
            { id: "mood", label: "Mood/Vibe Tags", type: "text", placeholder: "Chill, energetic, melancholic, uplifting, dark...", required: true },
            { id: "instruments", label: "Key Instruments/Sounds", type: "text", placeholder: "Piano, synths, 808s, acoustic guitar...", required: false },
            { id: "useCase", label: "Use Case/Playlist Fit", type: "select", options: "Workout/Gym,Study/Focus,Party/Club,Relaxation,Driving,Gaming,Romance,Sleep,Morning Routine", required: false }
        ]),
        prompt_template: `You are a music metadata specialist who optimizes songs for discovery on streaming platforms.

Generate optimized tags for a Suno song:
- Primary Genre: {genre}
- Sub-genre/Style: {subgenre}
- Mood/Vibe: {mood}
- Key Instruments: {instruments}
- Use Case: {useCase}

Create a comprehensive tag strategy:

**PRIMARY TAGS** (5-7 most important)
[Genre and style tags that define the track]

**MOOD/VIBE TAGS** (5-7 tags)
[Emotional and atmospheric descriptors]

**DISCOVERY TAGS** (5-7 tags)
[Tags that help with playlist placement and search]

**SUNO-SPECIFIC TAGS** (comma-separated, ready to paste)
[Optimized tag string for Suno's tagging system]

Requirements:
- Mix popular tags (for discovery) with specific ones (for accuracy)
- Include tempo descriptors (slow, upbeat, fast)
- Add production style tags (lo-fi, polished, raw, etc.)
- Consider playlist algorithm optimization
- Avoid overly generic tags that won't help discovery
- Maximum 20 total tags for Suno

Output the tags ready to use.`
    },

    "album-name-generator": {
        descriptions: {
            en: "Create album names that belong on a Spotify billboard, not scribbled on a napkin. Your music deserves an album name that matches its energy.",
            es: "Crea nombres de álbumes que pertenecen a un cartel de Spotify, no garabateados en una servilleta. Tu música merece un nombre que iguale su energía.",
            pt: "Crie nomes de álbuns que pertencem a um outdoor do Spotify, não rabiscados em um guardanapo. Sua música merece um nome à altura.",
            fr: "Créez des noms d'albums dignes d'un panneau Spotify, pas griffonnés sur une serviette. Votre musique mérite un nom à la hauteur.",
            de: "Erstelle Albumnamen die auf eine Spotify-Werbetafel gehören, nicht auf eine Serviette gekritzelt. Deine Musik verdient einen passenden Namen.",
            it: "Crea nomi di album degni di un cartellone Spotify, non scarabocchiati su un tovagliolo. La tua musica merita un nome all'altezza."
        },
        inputs: JSON.stringify([
            { id: "theme", label: "Album Theme/Concept", type: "textarea", placeholder: "What's the overall theme? A journey, emotions, a story, a vibe...", required: true },
            { id: "genre", label: "Music Genre", type: "select", options: "Pop,Rock,Hip-Hop,Electronic,Jazz,Classical,Country,R&B,Reggae,Metal,Ambient,Indie,Alternative", required: true },
            { id: "trackCount", label: "Number of Tracks", type: "select", options: "EP (3-6 tracks),Short Album (7-10 tracks),Full Album (11-15 tracks),Double Album (16+ tracks)", required: false },
            { id: "artistVibe", label: "Artist Persona/Vibe", type: "text", placeholder: "Mysterious, fun, serious, experimental, mainstream...", required: true },
            { id: "language", label: "Album Name Language", type: "language", required: true }
        ]),
        prompt_template: `You are a creative director at a major record label who has named platinum-selling albums.

Generate album name concepts for:
- Theme/Concept: {theme}
- Genre: {genre}
- Format: {trackCount}
- Artist Vibe: {artistVibe}
- Language: {language}

Create compelling album names:

**🏆 TOP 3 RECOMMENDATIONS**
1. **[Album Name]**
   - Meaning/concept explanation
   - Why it works for this project
   
2. **[Album Name]**
   - Meaning/concept explanation
   - Why it works for this project
   
3. **[Album Name]**
   - Meaning/concept explanation
   - Why it works for this project

**💡 ALTERNATIVE OPTIONS** (7 more)
4-10. [Album names with brief notes]

**🎨 VISUAL DIRECTION**
[Brief suggestion for album art style that matches the name]

Requirements:
- Create names that are memorable and meaningful
- Consider visual/typographic appeal
- Mix abstract and literal options
- Avoid clichés and overused phrases
- Think about how it sounds when spoken
- Consider the cultural context

Output in {language}.`
    },

    "cover-art-prompt-generator": {
        descriptions: {
            en: "Generate AI art prompts for album covers that'll make people screenshot your track just to share how cool it looks. Visual identity matters.",
            es: "Genera prompts de arte AI para portadas que harán que la gente haga screenshot de tu canción solo para compartir lo genial que se ve. La identidad visual importa.",
            pt: "Gere prompts de arte AI para capas que farão as pessoas tirarem print da sua música só para compartilhar como é legal. Identidade visual importa.",
            fr: "Générez des prompts d'art AI pour des pochettes qui feront faire des captures d'écran juste pour partager le visuel. L'identité visuelle compte.",
            de: "Generiere AI-Art Prompts für Albumcover die Leute screenshotten lassen nur um zu zeigen wie cool es aussieht. Visuelle Identität zählt.",
            it: "Genera prompt di arte AI per copertine che faranno fare screenshot solo per condividere quanto è figa. L'identità visiva conta."
        },
        inputs: JSON.stringify([
            { id: "songMood", label: "Song Mood/Vibe", type: "text", placeholder: "Dreamy, aggressive, nostalgic, futuristic, romantic...", required: true },
            { id: "genre", label: "Music Genre", type: "select", options: "Pop,Rock,Hip-Hop,Electronic,Jazz,Classical,Country,R&B,Metal,Ambient,Lo-fi,Synthwave,Indie", required: true },
            { id: "artStyle", label: "Art Style", type: "select", options: "Photorealistic,Illustrated/Cartoon,Abstract,Minimalist,Surrealist,Retro/Vintage,Cyberpunk/Futuristic,Dark/Gothic,Anime/Manga,Collage/Mixed Media", required: true },
            { id: "colors", label: "Color Palette", type: "text", placeholder: "Neon pink and blue, earth tones, black and gold, pastel...", required: true },
            { id: "elements", label: "Key Visual Elements", type: "text", placeholder: "City skyline, ocean waves, abstract shapes, portrait, nature...", required: false },
            { id: "aiTool", label: "AI Tool", type: "select", options: "Midjourney,DALL-E,Stable Diffusion,Leonardo AI,Ideogram,General (works for all)", required: false }
        ]),
        prompt_template: `You are a visual artist specializing in album artwork and AI-generated imagery for music.

Create an AI art prompt for album/song cover:
- Song Mood: {songMood}
- Genre: {genre}
- Art Style: {artStyle}
- Color Palette: {colors}
- Key Elements: {elements}
- AI Tool: {aiTool}

Generate prompts optimized for the selected AI tool:

**🎨 MAIN PROMPT**
[Detailed prompt with style, composition, lighting, mood]

**📐 TECHNICAL SPECS**
- Aspect Ratio: [1:1 for album art]
- Style modifiers: [specific to the AI tool]
- Quality tags: [8k, detailed, professional, etc.]

**🔄 VARIATIONS**
1. [Alternative prompt - different angle/composition]
2. [Alternative prompt - different lighting/mood]
3. [Alternative prompt - different elements emphasized]

**❌ NEGATIVE PROMPT**
[What to avoid: text, watermarks, blurry, etc.]

Requirements:
- Create visually striking imagery
- Match the music's emotional tone
- Consider the square format for streaming
- Include specific artistic references if helpful
- Optimize for the selected AI tool's syntax
- Make it eye-catching at thumbnail size

Output ready-to-use prompts.`
    },

    "remix-idea-generator": {
        descriptions: {
            en: "Get remix ideas that'll make the original artist wish they thought of it first. Transform any track into something fresh and unexpected.",
            es: "Obtén ideas de remix que harán que el artista original desee haberlo pensado primero. Transforma cualquier canción en algo fresco e inesperado.",
            pt: "Obtenha ideias de remix que farão o artista original desejar ter pensado primeiro. Transforme qualquer faixa em algo fresco e inesperado.",
            fr: "Obtenez des idées de remix qui feront regretter à l'artiste original de ne pas y avoir pensé. Transformez tout morceau en quelque chose de frais.",
            de: "Hole dir Remix-Ideen die den Originalartist wünschen lassen er hätte es zuerst gedacht. Verwandle jeden Track in etwas Frisches.",
            it: "Ottieni idee remix che faranno desiderare all'artista originale di averci pensato prima. Trasforma qualsiasi traccia in qualcosa di fresco."
        },
        inputs: JSON.stringify([
            { id: "originalSong", label: "Original Song/Style", type: "text", placeholder: "Song name, or describe the original track's style...", required: true },
            { id: "originalGenre", label: "Original Genre", type: "select", options: "Pop,Rock,Hip-Hop,Electronic,Jazz,Classical,Country,R&B,Reggae,Metal,Indie,Folk", required: true },
            { id: "targetGenre", label: "Target Remix Genre", type: "select", options: "House,Techno,Drum & Bass,Dubstep,Future Bass,Lo-fi,Trap,Phonk,Synthwave,Ambient,Acoustic,Orchestral,Jazz,Rock,Latin/Reggaeton", required: true },
            { id: "remixStyle", label: "Remix Approach", type: "select", options: "Club Banger (high energy),Chill/Downtempo,VIP/Flip (same genre elevated),Bootleg/Mashup Style,Complete Genre Transformation,Stripped Back/Acoustic,Extended/DJ Edit", required: true },
            { id: "keepElements", label: "Elements to Keep from Original", type: "text", placeholder: "Vocals, melody, hook, bass line, drums...", required: false }
        ]),
        prompt_template: `You are a remix producer who has created viral remixes and bootlegs across all genres.

Generate remix concepts for:
- Original Song/Style: {originalSong}
- Original Genre: {originalGenre}
- Target Genre: {targetGenre}
- Remix Approach: {remixStyle}
- Elements to Keep: {keepElements}

Create detailed remix ideas:

**🎧 MAIN REMIX CONCEPT**
**Title:** [Remix Title Format]
**Concept:** [Detailed description of the remix direction]
**Key Changes:**
- BPM: [Original → New]
- Key elements transformed
- New elements added
- Production style

**🎹 PRODUCTION BREAKDOWN**
**Intro:** [How it starts]
**Build:** [Tension building techniques]
**Drop/Chorus:** [The main payoff]
**Breakdown:** [Mid-song moment]
**Outro:** [How it ends]

**🔊 SOUND DESIGN NOTES**
- Synths/Instruments to use
- Drum patterns/sounds
- Effects and processing
- Reference tracks for vibe

**💡 ALTERNATIVE REMIX IDEAS** (3 variations)
1. [Different approach]
2. [Different approach]
3. [Different approach]

**📝 SUNO PROMPT FOR THIS REMIX**
[Ready-to-use Suno prompt to create this remix style]

Requirements:
- Make it fresh but recognizable
- Consider danceability and energy flow
- Suggest specific production techniques
- Include Suno-ready prompts
- Think about DJ playability`
    },

    "music-prompt-generator": {
        descriptions: {
            en: "Create Suno prompts so detailed that the AI basically reads your mind. Stop getting random results and start getting exactly what you hear in your head.",
            es: "Crea prompts de Suno tan detallados que la IA básicamente lee tu mente. Deja de obtener resultados random y empieza a obtener exactamente lo que escuchas en tu cabeza.",
            pt: "Crie prompts Suno tão detalhados que a IA basicamente lê sua mente. Pare de obter resultados aleatórios e comece a obter exatamente o que você ouve na sua cabeça.",
            fr: "Créez des prompts Suno si détaillés que l'IA lit pratiquement dans vos pensées. Arrêtez les résultats aléatoires et obtenez exactement ce que vous entendez.",
            de: "Erstelle Suno Prompts so detailliert dass die AI quasi deine Gedanken liest. Schluss mit Random-Ergebnissen - bekomme genau was du hörst.",
            it: "Crea prompt Suno così dettagliati che l'AI praticamente legge la tua mente. Smetti di ottenere risultati random e inizia a ottenere esattamente quello che senti."
        },
        inputs: JSON.stringify([
            { id: "genre", label: "Music Genre", type: "select", options: "Pop,Rock,Hip-Hop,Electronic,EDM,Jazz,Classical,Country,R&B,Reggae,Metal,Ambient,Lo-fi,Synthwave,Phonk,Trap,House,Techno,Indie,Folk", required: true },
            { id: "mood", label: "Mood/Atmosphere", type: "select", options: "Euphoric,Melancholic,Aggressive,Peaceful,Mysterious,Romantic,Empowering,Nostalgic,Anxious,Dreamy,Dark,Playful", required: true },
            { id: "tempo", label: "Tempo", type: "select", options: "Very Slow (< 70 BPM),Slow (70-90 BPM),Medium (90-120 BPM),Upbeat (120-140 BPM),Fast (140-160 BPM),Very Fast (> 160 BPM)", required: true },
            { id: "vocals", label: "Vocal Style", type: "select", options: "No Vocals (Instrumental),Male Vocals,Female Vocals,Mixed/Duet,Choir/Group,Rap/Spoken Word,Whispered/Soft,Powerful/Belting", required: true },
            { id: "instruments", label: "Key Instruments", type: "text", placeholder: "Piano, synths, 808s, strings, guitar, brass...", required: true },
            { id: "reference", label: "Reference (Optional)", type: "text", placeholder: "Sounds like The Weeknd, similar to Stranger Things soundtrack...", required: false }
        ]),
        prompt_template: `You are a Suno AI expert who knows exactly how to craft prompts that produce professional-quality music.

Create an optimized Suno prompt for:
- Genre: {genre}
- Mood: {mood}
- Tempo: {tempo}
- Vocals: {vocals}
- Instruments: {instruments}
- Reference: {reference}

Generate a comprehensive prompt package:

**🎵 OPTIMIZED SUNO PROMPT** (under 200 chars)
[The main prompt, refined for Suno's character limit]

**📝 EXTENDED DESCRIPTION** (for context)
[Detailed description of what the prompt will produce]

**🏷️ STYLE TAGS**
[Comma-separated tags to add]

**🎼 SONG STRUCTURE SUGGESTION**
Intro → Verse → Chorus → Verse → Chorus → Bridge → Final Chorus
[With timing suggestions]

**🔄 PROMPT VARIATIONS** (3 alternatives)
1. [Variation emphasizing different elements]
2. [Variation with different production style]
3. [Variation with different energy level]

**💡 PRO TIPS FOR THIS STYLE**
- What works well with this prompt
- Common mistakes to avoid
- Settings recommendations

Requirements:
- Respect Suno's 200-character limit for main prompt
- Use specific musical terminology
- Include production style descriptors
- Balance creativity with clarity
- Make prompts reproducible`
    },

    "song-description-generator": {
        descriptions: {
            en: "Write song descriptions that don't sound like they were written by a robot or your uncle. Make people curious enough to actually press play.",
            es: "Escribe descripciones de canciones que no suenen como escritas por un robot o tu tío. Haz que la gente tenga curiosidad suficiente para darle play.",
            pt: "Escreva descrições de músicas que não pareçam escritas por um robô ou seu tio. Faça as pessoas ficarem curiosas o suficiente para dar play.",
            fr: "Écrivez des descriptions de chansons qui ne sonnent pas comme écrites par un robot. Rendez les gens assez curieux pour appuyer sur play.",
            de: "Schreibe Song-Beschreibungen die nicht klingen wie von einem Roboter oder deinem Onkel geschrieben. Mach Leute neugierig genug zum Play drücken.",
            it: "Scrivi descrizioni di canzoni che non sembrino scritte da un robot o da tuo zio. Fai incuriosire le persone abbastanza da premere play."
        },
        inputs: JSON.stringify([
            { id: "songTitle", label: "Song Title", type: "text", placeholder: "Your song's title...", required: true },
            { id: "genre", label: "Genre", type: "select", options: "Pop,Rock,Hip-Hop,Electronic,Jazz,Classical,Country,R&B,Reggae,Metal,Ambient,Lo-fi,Synthwave,Indie,Folk", required: true },
            { id: "moodVibe", label: "Mood & Vibe", type: "text", placeholder: "Late night drive vibes, summer beach energy, rainy day melancholy...", required: true },
            { id: "inspiration", label: "What Inspired This Song?", type: "textarea", placeholder: "A memory, a feeling, a story, a person...", required: true },
            { id: "targetAudience", label: "Who Is This For?", type: "text", placeholder: "Workout enthusiasts, hopeless romantics, night owls...", required: false },
            { id: "language", label: "Description Language", type: "language", required: true }
        ]),
        prompt_template: `You are a music journalist and copywriter who writes compelling descriptions for independent artists.

Create an engaging description for:
- Song Title: {songTitle}
- Genre: {genre}
- Mood & Vibe: {moodVibe}
- Inspiration: {inspiration}
- Target Audience: {targetAudience}
- Language: {language}

Generate multiple description versions:

**📱 SOCIAL MEDIA VERSION** (1-2 sentences, punchy)
[Perfect for Instagram caption, Twitter, TikTok]

**🎧 STREAMING PLATFORM VERSION** (3-4 sentences)
[For Spotify, Apple Music, Suno, SoundCloud]

**📰 PRESS/BLOG VERSION** (Full paragraph)
[For music blogs, press releases, longer features]

**#️⃣ HASHTAGS & KEYWORDS**
[10-15 relevant tags for discovery]

**💬 ARTIST QUOTE**
[A quote "from the artist" about the song]

Requirements:
- Avoid generic phrases ("this song is about...")
- Use sensory language (sounds like, feels like)
- Create intrigue without giving everything away
- Match the tone to the music style
- Make it shareable and quotable
- Include emotional hooks
- Be authentic, not salesy

Output in {language}.`
    }
};

async function fixSunoTools() {
    console.log("\n🔧 FIXING SUNO TOOLS IN APPWRITE\n");
    console.log("=".repeat(70));

    let fixed = 0;
    let errors = 0;

    for (const [slug, fixes] of Object.entries(SUNO_TOOLS_FIX)) {
        console.log(`\n📦 Processing: ${slug}`);

        // Find all language versions of this tool
        const result = await databases.listDocuments(DATABASE_ID, COLLECTION_ID, [
            Query.equal("platform", "suno"),
            Query.equal("slug", slug),
            Query.limit(10)
        ]);

        if (result.documents.length === 0) {
            console.log(`   ⚠️  Not found in database, skipping...`);
            continue;
        }

        for (const doc of result.documents) {
            const lang = doc.language;
            const description = fixes.descriptions[lang] || fixes.descriptions.en;

            try {
                await databases.updateDocument(DATABASE_ID, COLLECTION_ID, doc.$id, {
                    description: description,
                    inputs: fixes.inputs,
                    prompt_template: fixes.prompt_template
                });
                console.log(`   ✅ Updated ${lang.toUpperCase()} version`);
                fixed++;

                // Small delay to avoid rate limiting
                await new Promise(resolve => setTimeout(resolve, 100));
            } catch (error) {
                console.log(`   ❌ Error updating ${lang.toUpperCase()}: ${error.message}`);
                errors++;
            }
        }
    }

    console.log("\n" + "=".repeat(70));
    console.log("📊 SUMMARY:");
    console.log(`   ✅ Fixed: ${fixed} tool versions`);
    console.log(`   ❌ Errors: ${errors}`);
    console.log("=".repeat(70));
    console.log("\n🎉 Done! Run audit-suno-tools.mjs to verify.\n");
}

fixSunoTools().catch(console.error);
