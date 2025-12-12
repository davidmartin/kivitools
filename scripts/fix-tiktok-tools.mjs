import { Client, Databases, Query } from "node-appwrite";
import dotenv from "dotenv";
dotenv.config({ path: ".env.local" });

const client = new Client()
    .setEndpoint(process.env.APPWRITE_ENDPOINT)
    .setProject(process.env.APPWRITE_PROJECT_ID)
    .setKey(process.env.APPWRITE_API_KEY);

const databases = new Databases(client);
const DATABASE_ID = process.env.APPWRITE_DATABASE_ID;

// TikTok tools with proper quality content
const TIKTOK_TOOLS_FIX = {
    "script-writer": {
        descriptions: {
            en: "Write TikTok scripts that keep viewers hooked from second one to the final call-to-action. Get viral-ready scripts with hooks, story beats, and engagement triggers.",
            es: "Escribe guiones de TikTok que mantienen a los espectadores enganchados desde el segundo uno hasta la llamada a la acción final. Obtén guiones virales con ganchos, ritmo narrativo y triggers de engagement.",
            pt: "Escreva roteiros de TikTok que mantêm os espectadores grudados do primeiro segundo até o call-to-action final. Obtenha roteiros virais com ganchos, batidas narrativas e gatilhos de engajamento.",
            fr: "Écrivez des scripts TikTok qui captivent les spectateurs de la première seconde jusqu'à l'appel à l'action final. Obtenez des scripts viraux avec des accroches et des déclencheurs d'engagement.",
            de: "Schreiben Sie TikTok-Skripte, die Zuschauer von der ersten Sekunde bis zum letzten Call-to-Action fesseln. Erhalten Sie virale Skripte mit Hooks und Engagement-Triggern.",
            it: "Scrivi script TikTok che tengono gli spettatori incollati dal primo secondo all'ultima call-to-action. Ottieni script virali con hook, ritmo narrativo e trigger di engagement."
        },
        inputs: JSON.stringify([
            {
                id: "videoType",
                label: "Video Type",
                type: "select",
                options: "Educational/Tutorial,Storytelling,Comedy/Entertainment,Product Review,Day in My Life,Trend Participation,Behind the Scenes,Transformation,Challenge,Opinion/Hot Take"
            },
            {
                id: "topic",
                label: "Topic/Subject",
                type: "text",
                placeholder: "e.g., Morning routine, cooking hack, life advice..."
            },
            {
                id: "duration",
                label: "Video Duration",
                type: "select",
                options: "15 seconds,30 seconds,60 seconds,90 seconds,3 minutes"
            },
            {
                id: "tone",
                label: "Tone/Vibe",
                type: "select",
                options: "Energetic & Fun,Calm & Informative,Dramatic & Intense,Casual & Relatable,Professional & Polished"
            },
            {
                id: "callToAction",
                label: "Call to Action",
                type: "select",
                options: "Follow for more,Comment below,Save this,Share with a friend,Check link in bio,None"
            },
            {
                id: "language",
                label: "Output Language",
                type: "language"
            }
        ]),
        prompt_template: `You are a viral TikTok content strategist. Create an engaging script based on:

**Video Type:** {videoType}
**Topic:** {topic}
**Duration:** {duration}
**Tone:** {tone}
**Call to Action:** {callToAction}
**Language:** {language}

Generate a complete TikTok script with:

1. **HOOK (0-3 seconds)** - The most critical part. Options:
   - Pattern interrupt ("Stop scrolling if...")
   - Bold statement or hot take
   - Intriguing question
   - Visual action that grabs attention

2. **TENSION/BUILD-UP (next 20-30%)** - Create anticipation:
   - Tease what's coming
   - Build curiosity
   - Establish the problem or setup

3. **MAIN CONTENT (middle 40-50%)** - Deliver value:
   - Clear, concise information
   - Visual cues and actions
   - Keep energy consistent with tone

4. **PAYOFF (next 15-20%)** - Deliver the promise:
   - Satisfying conclusion
   - The "aha" moment
   - Transformation reveal

5. **CTA (final 3-5 seconds)** - Drive action:
   - Natural, not pushy
   - Tie back to content

Format the script with:
- [VISUAL] cues for actions
- [TEXT ON SCREEN] for overlays
- Spoken dialogue clearly marked
- Timing markers for each section`
    },

    "hashtag-generator": {
        descriptions: {
            en: "Find the perfect hashtag mix: trending tags for reach, niche tags for targeting, and branded tags for community building. Get 30 hashtags optimized for TikTok's algorithm.",
            es: "Encuentra la mezcla perfecta de hashtags: tags trending para alcance, tags de nicho para targeting, y tags de marca para construir comunidad. Obtén 30 hashtags optimizados para el algoritmo de TikTok.",
            pt: "Encontre a mistura perfeita de hashtags: tags em alta para alcance, tags de nicho para segmentação, e tags de marca para construir comunidade. Obtenha 30 hashtags otimizadas para o algoritmo do TikTok.",
            fr: "Trouvez le mélange parfait de hashtags: tags tendance pour la portée, tags de niche pour le ciblage, et tags de marque pour la communauté. Obtenez 30 hashtags optimisés pour l'algorithme TikTok.",
            de: "Finden Sie die perfekte Hashtag-Mischung: Trend-Tags für Reichweite, Nischen-Tags für Targeting und Marken-Tags für Community-Building. Erhalten Sie 30 für den TikTok-Algorithmus optimierte Hashtags.",
            it: "Trova il mix perfetto di hashtag: tag trending per la reach, tag di nicchia per il targeting, e tag brandizzati per costruire community. Ottieni 30 hashtag ottimizzati per l'algoritmo di TikTok."
        },
        inputs: JSON.stringify([
            {
                id: "contentType",
                label: "Content Category",
                type: "select",
                options: "Comedy/Entertainment,Dance/Music,Beauty/Fashion,Food/Cooking,Fitness/Health,Education/Tips,Business/Finance,Travel/Lifestyle,Gaming,DIY/Crafts,Pets/Animals,Tech/Reviews"
            },
            {
                id: "videoDescription",
                label: "Video Description",
                type: "text",
                placeholder: "Briefly describe your video content..."
            },
            {
                id: "targetAudience",
                label: "Target Audience",
                type: "select",
                options: "Gen Z (13-24),Young Adults (25-34),Adults (35-44),Broad Audience,Professionals,Parents,Students"
            },
            {
                id: "goal",
                label: "Primary Goal",
                type: "select",
                options: "Maximum Reach,Targeted Niche,Trend Participation,Brand Building,Local Discovery"
            },
            {
                id: "language",
                label: "Hashtag Language",
                type: "language"
            }
        ]),
        prompt_template: `You are a TikTok hashtag strategist. Generate optimized hashtags based on:

**Content Category:** {contentType}
**Video Description:** {videoDescription}
**Target Audience:** {targetAudience}
**Primary Goal:** {goal}
**Language:** {language}

Generate 30 hashtags organized in 4 tiers:

**TIER 1: Mega Hashtags (5 tags)** - 10M+ posts
- High competition, high volume
- Use 2-3 max per video
- Examples of format: #fyp, #viral, #tiktok

**TIER 2: Trending Hashtags (8 tags)** - 1M-10M posts
- Currently popular in your niche
- Changes weekly, time-sensitive
- Great for discovery

**TIER 3: Niche Hashtags (12 tags)** - 100K-1M posts
- Specific to your content type
- Less competition, targeted audience
- Best for building loyal following

**TIER 4: Micro Hashtags (5 tags)** - Under 100K posts
- Very specific, low competition
- Great for ranking quickly
- Community builders

For each tier, provide:
- The hashtags (with #)
- Why they work for this content
- Current relevance score (Hot/Warm/Stable)

Also include:
- 3 hashtags to AVOID (oversaturated or shadowbanned)
- Best posting strategy for these tags`
    },

    "video-ideas": {
        descriptions: {
            en: "Never stare at a blank screen again. Get 10 video ideas tailored to your niche, complete with hooks, formats, and why each one has viral potential.",
            es: "Nunca más te quedes mirando una pantalla en blanco. Obtén 10 ideas de video adaptadas a tu nicho, con ganchos, formatos y por qué cada una tiene potencial viral.",
            pt: "Nunca mais fique olhando para uma tela em branco. Obtenha 10 ideias de vídeo adaptadas ao seu nicho, completas com ganchos, formatos e por que cada uma tem potencial viral.",
            fr: "Ne restez plus jamais devant un écran vide. Obtenez 10 idées de vidéos adaptées à votre niche, avec des accroches, des formats et pourquoi chacune a un potentiel viral.",
            de: "Starren Sie nie wieder auf einen leeren Bildschirm. Erhalten Sie 10 Video-Ideen für Ihre Nische, komplett mit Hooks, Formaten und warum jede virales Potenzial hat.",
            it: "Non fissare mai più uno schermo vuoto. Ottieni 10 idee video su misura per la tua nicchia, complete di hook, formati e perché ognuna ha potenziale virale."
        },
        inputs: JSON.stringify([
            {
                id: "niche",
                label: "Your Niche/Topic",
                type: "text",
                placeholder: "e.g., Fitness, cooking, fashion, tech reviews..."
            },
            {
                id: "accountType",
                label: "Account Type",
                type: "select",
                options: "Personal Brand,Business/Company,Creator/Influencer,Educational,Entertainment,Hobbyist"
            },
            {
                id: "contentStyle",
                label: "Content Style",
                type: "select",
                options: "Talking Head,Voiceover,Text on Screen,Trending Audio,Original Audio,Mixed"
            },
            {
                id: "difficulty",
                label: "Production Level",
                type: "select",
                options: "Quick & Easy (phone only),Medium Effort,High Production"
            },
            {
                id: "trendFocus",
                label: "Trend Focus",
                type: "select",
                options: "Evergreen Content,Current Trends,Mix of Both"
            },
            {
                id: "language",
                label: "Output Language",
                type: "language"
            }
        ]),
        prompt_template: `You are a TikTok content strategist. Generate 10 unique video ideas based on:

**Niche:** {niche}
**Account Type:** {accountType}
**Content Style:** {contentStyle}
**Production Level:** {difficulty}
**Trend Focus:** {trendFocus}
**Language:** {language}

For each video idea, provide:

1. **TITLE** - Catchy, descriptive name

2. **HOOK** - First 3 seconds that stops the scroll
   - The exact words/action to open with

3. **FORMAT** - How to structure the video
   - Recommended duration
   - Visual style
   - Audio suggestion

4. **VIRAL POTENTIAL** - Why this could pop off
   - Psychology behind engagement
   - Similar videos that went viral

5. **EXECUTION TIPS**
   - Key moments to nail
   - Common mistakes to avoid

Organize ideas from:
- 3 Quick Wins (easy, fast to create)
- 4 Solid Performers (reliable engagement)
- 3 Swing for Fences (higher effort, viral potential)

Include 1 idea that leverages current TikTok trends.`
    },

    "shop-name-generator": {
        descriptions: {
            en: "Create a TikTok Shop name that's memorable, searchable, and tells customers exactly what you sell - all before they even click. Get 15 name options with availability checks.",
            es: "Crea un nombre para TikTok Shop que sea memorable, buscable, y diga a los clientes exactamente qué vendes - todo antes de que hagan clic. Obtén 15 opciones de nombre con verificación de disponibilidad.",
            pt: "Crie um nome para TikTok Shop que seja memorável, pesquisável, e diga aos clientes exatamente o que você vende - tudo antes de clicarem. Obtenha 15 opções de nome com verificação de disponibilidade.",
            fr: "Créez un nom TikTok Shop mémorable, recherchable, et qui dit aux clients exactement ce que vous vendez - avant même qu'ils cliquent. Obtenez 15 options de noms avec vérification de disponibilité.",
            de: "Erstellen Sie einen TikTok Shop-Namen, der einprägsam, suchbar ist und Kunden genau sagt, was Sie verkaufen - bevor sie überhaupt klicken. Erhalten Sie 15 Namensoptionen mit Verfügbarkeitsprüfung.",
            it: "Crea un nome per TikTok Shop memorabile, ricercabile, e che dice ai clienti esattamente cosa vendi - tutto prima che clicchino. Ottieni 15 opzioni di nome con verifica disponibilità."
        },
        inputs: JSON.stringify([
            {
                id: "productCategory",
                label: "Product Category",
                type: "select",
                options: "Fashion/Clothing,Beauty/Skincare,Jewelry/Accessories,Home & Living,Electronics/Gadgets,Food/Beverages,Health/Wellness,Kids/Baby,Sports/Outdoors,Art/Crafts,Pets,Other"
            },
            {
                id: "productDescription",
                label: "What You Sell",
                type: "text",
                placeholder: "Describe your products briefly..."
            },
            {
                id: "targetMarket",
                label: "Target Market",
                type: "select",
                options: "Gen Z Women,Gen Z Men,Millennials,Parents,Luxury Buyers,Budget Conscious,Eco-Conscious,Fitness Enthusiasts,Trend Followers"
            },
            {
                id: "brandVibe",
                label: "Brand Vibe",
                type: "select",
                options: "Fun & Playful,Luxurious & Premium,Minimalist & Clean,Bold & Edgy,Cute & Kawaii,Natural & Organic,Professional & Trustworthy"
            },
            {
                id: "nameStyle",
                label: "Name Style Preference",
                type: "select",
                options: "One Word,Two Words,Made-up Word,Descriptive,Personal Name Based,No Preference"
            },
            {
                id: "language",
                label: "Output Language",
                type: "language"
            }
        ]),
        prompt_template: `You are a brand naming expert specializing in e-commerce. Create TikTok Shop names based on:

**Product Category:** {productCategory}
**What You Sell:** {productDescription}
**Target Market:** {targetMarket}
**Brand Vibe:** {brandVibe}
**Name Style:** {nameStyle}
**Language:** {language}

Generate 15 shop name options in 3 categories:

**CATEGORY 1: Safe Bets (5 names)**
- Clear, descriptive, professional
- Easy to remember and spell
- Works well in search
- Low risk, reliable choice

**CATEGORY 2: Creative & Catchy (5 names)**
- More memorable and unique
- Wordplay, alliteration, or coined terms
- Stands out in the feed
- Moderate risk, higher reward

**CATEGORY 3: Bold & Trendy (5 names)**
- Very distinctive and memorable
- May use slang, abbreviations, or trends
- Strong brand identity potential
- Higher risk, viral potential

For each name provide:
1. The shop name
2. Why it works for your brand
3. Potential tagline (5-7 words)
4. Instagram/social handle availability tip
5. Any considerations (pronunciation, spelling)

Also include:
- 3 naming patterns to AVOID on TikTok Shop
- Tips for checking name availability`
    },

    "money-calculator": {
        descriptions: {
            en: "See exactly how much TikTok creators earn at every follower level. Calculate potential earnings from the Creator Fund, LIVE gifts, brand deals, and TikTok Shop commissions.",
            es: "Mira exactamente cuánto ganan los creadores de TikTok en cada nivel de seguidores. Calcula ganancias potenciales del Creator Fund, regalos LIVE, acuerdos de marca y comisiones de TikTok Shop.",
            pt: "Veja exatamente quanto os criadores do TikTok ganham em cada nível de seguidores. Calcule ganhos potenciais do Creator Fund, presentes LIVE, acordos de marca e comissões do TikTok Shop.",
            fr: "Voyez exactement combien les créateurs TikTok gagnent à chaque niveau d'abonnés. Calculez les gains potentiels du Creator Fund, des cadeaux LIVE, des deals de marque et des commissions TikTok Shop.",
            de: "Sehen Sie genau, wie viel TikTok-Creator auf jeder Follower-Stufe verdienen. Berechnen Sie potenzielle Einnahmen aus dem Creator Fund, LIVE-Geschenken, Markendeals und TikTok Shop-Provisionen.",
            it: "Scopri esattamente quanto guadagnano i creator TikTok ad ogni livello di follower. Calcola i guadagni potenziali dal Creator Fund, regali LIVE, accordi con brand e commissioni TikTok Shop."
        },
        inputs: JSON.stringify([
            {
                id: "followerCount",
                label: "Follower Count",
                type: "select",
                options: "1,000-10,000,10,000-50,000,50,000-100,000,100,000-500,000,500,000-1M,1M-5M,5M+"
            },
            {
                id: "avgViews",
                label: "Average Views per Video",
                type: "select",
                options: "Under 1,000,1,000-5,000,5,000-10,000,10,000-50,000,50,000-100,000,100,000-500,000,500,000+"
            },
            {
                id: "niche",
                label: "Content Niche",
                type: "select",
                options: "Entertainment/Comedy,Beauty/Fashion,Fitness/Health,Business/Finance,Tech/Gaming,Food/Cooking,Education,Lifestyle,Music/Dance,Other"
            },
            {
                id: "postingFrequency",
                label: "Posting Frequency",
                type: "select",
                options: "Daily (7/week),5-6 times/week,3-4 times/week,1-2 times/week,Less than weekly"
            },
            {
                id: "engagementRate",
                label: "Engagement Rate",
                type: "select",
                options: "Low (1-3%),Average (4-6%),Good (7-10%),Excellent (11-15%),Viral (15%+)"
            },
            {
                id: "language",
                label: "Output Language",
                type: "language"
            }
        ]),
        prompt_template: `You are a TikTok monetization expert. Calculate earnings potential based on:

**Follower Count:** {followerCount}
**Average Views:** {avgViews}
**Content Niche:** {niche}
**Posting Frequency:** {postingFrequency}
**Engagement Rate:** {engagementRate}
**Language:** {language}

Provide a detailed earnings breakdown:

**1. TIKTOK CREATOR FUND/CREATIVITY PROGRAM**
- Estimated monthly earnings range
- Per-view rate for this tier
- Requirements and eligibility
- Tips to maximize fund earnings

**2. LIVE GIFTS**
- Potential hourly earning during LIVE
- Best LIVE strategies for this tier
- Gift-to-cash conversion explanation
- Minimum LIVE hours for meaningful income

**3. BRAND DEALS & SPONSORSHIPS**
- Price range per sponsored post
- Expected deals per month at this level
- What brands look for at this tier
- How to pitch to brands

**4. TIKTOK SHOP / AFFILIATE**
- Potential commission earnings
- Best product categories for your niche
- How to get started

**5. TOTAL MONTHLY POTENTIAL**
- Conservative estimate
- Average estimate
- Optimistic estimate

Include:
- Comparison to similar creators
- 3 ways to increase earnings
- Common monetization mistakes
- Realistic timeline to next tier`
    },

    "coins-calculator": {
        descriptions: {
            en: "Convert TikTok coins to real money and see exactly what your gifts are worth. From Rose to Universe, know the cash value of every TikTok gift and coin package.",
            es: "Convierte monedas de TikTok a dinero real y mira exactamente cuánto valen tus regalos. Desde Rosa hasta Universo, conoce el valor en efectivo de cada regalo y paquete de monedas.",
            pt: "Converta moedas do TikTok para dinheiro real e veja exatamente quanto seus presentes valem. De Rosa a Universo, saiba o valor em dinheiro de cada presente e pacote de moedas.",
            fr: "Convertissez les pièces TikTok en argent réel et voyez exactement ce que valent vos cadeaux. De la Rose à l'Univers, connaissez la valeur en espèces de chaque cadeau et pack de pièces.",
            de: "Rechnen Sie TikTok-Münzen in echtes Geld um und sehen Sie genau, was Ihre Geschenke wert sind. Von Rose bis Universum - kennen Sie den Geldwert jedes TikTok-Geschenks und Münzpakets.",
            it: "Converti le monete TikTok in denaro reale e scopri esattamente quanto valgono i tuoi regali. Da Rosa a Universo, conosci il valore in contanti di ogni regalo e pacchetto di monete."
        },
        inputs: JSON.stringify([
            {
                id: "calculationType",
                label: "What to Calculate",
                type: "select",
                options: "Coins to Diamonds,Diamonds to Cash,Gift Value,Coin Package Value,Total LIVE Earnings"
            },
            {
                id: "amount",
                label: "Amount",
                type: "text",
                placeholder: "Enter the number (coins, diamonds, or gifts)"
            },
            {
                id: "giftType",
                label: "Gift Type (if applicable)",
                type: "select",
                options: "Rose (1 coin),TikTok (1 coin),Heart (5 coins),Ice Cream (10 coins),Finger Heart (100 coins),Drama Queen (500 coins),Lion (29,999 coins),Universe (34,999 coins),Other/Custom"
            },
            {
                id: "region",
                label: "Your Region",
                type: "select",
                options: "United States,United Kingdom,Europe,Latin America,Southeast Asia,Other"
            },
            {
                id: "language",
                label: "Output Language",
                type: "language"
            }
        ]),
        prompt_template: `You are a TikTok LIVE monetization expert. Calculate coin/gift values based on:

**Calculation Type:** {calculationType}
**Amount:** {amount}
**Gift Type:** {giftType}
**Region:** {region}
**Language:** {language}

Provide detailed calculations:

**1. INSTANT CALCULATION**
- Input value converted to requested output
- Show the math step-by-step
- Account for TikTok's cut (typically 50%)

**2. COIN PURCHASE REFERENCE**
- Current coin package prices in {region}
- Best value packages highlighted
- Cost per coin comparison

**3. POPULAR GIFTS REFERENCE TABLE**
| Gift Name | Coin Cost | Diamond Value | USD Value to Creator |
|-----------|-----------|---------------|---------------------|

**4. EARNINGS BREAKDOWN**
- Gross gift value
- TikTok's commission
- Your actual earnings
- Minimum withdrawal threshold

**5. TIPS TO MAXIMIZE**
- Best times for LIVE
- Gift encouragement strategies
- Matching/multiplier events
- Diamond accumulation tips

Include:
- Current conversion rates (may vary by region)
- Minimum payout thresholds
- Payment processing times
- Tax considerations reminder`
    },

    "engagement-calculator": {
        descriptions: {
            en: "Measure your TikTok performance like a pro. Calculate your true engagement rate, compare it to industry benchmarks, and get actionable tips to boost your numbers.",
            es: "Mide tu rendimiento en TikTok como un profesional. Calcula tu tasa de engagement real, compárala con benchmarks de la industria, y obtén consejos accionables para mejorar tus números.",
            pt: "Meça seu desempenho no TikTok como um profissional. Calcule sua taxa de engajamento real, compare com benchmarks da indústria, e obtenha dicas acionáveis para melhorar seus números.",
            fr: "Mesurez vos performances TikTok comme un pro. Calculez votre véritable taux d'engagement, comparez-le aux benchmarks de l'industrie, et obtenez des conseils actionnables pour améliorer vos chiffres.",
            de: "Messen Sie Ihre TikTok-Performance wie ein Profi. Berechnen Sie Ihre echte Engagement-Rate, vergleichen Sie sie mit Branchen-Benchmarks und erhalten Sie umsetzbare Tipps zur Verbesserung.",
            it: "Misura le tue performance TikTok come un professionista. Calcola il tuo vero tasso di engagement, confrontalo con i benchmark del settore, e ottieni consigli pratici per migliorare i tuoi numeri."
        },
        inputs: JSON.stringify([
            {
                id: "followerCount",
                label: "Total Followers",
                type: "text",
                placeholder: "e.g., 50000"
            },
            {
                id: "totalLikes",
                label: "Total Likes (last 10 videos)",
                type: "text",
                placeholder: "Sum of likes from your last 10 videos"
            },
            {
                id: "totalComments",
                label: "Total Comments (last 10 videos)",
                type: "text",
                placeholder: "Sum of comments from your last 10 videos"
            },
            {
                id: "totalShares",
                label: "Total Shares (last 10 videos)",
                type: "text",
                placeholder: "Sum of shares from your last 10 videos"
            },
            {
                id: "totalViews",
                label: "Total Views (last 10 videos)",
                type: "text",
                placeholder: "Sum of views from your last 10 videos"
            },
            {
                id: "niche",
                label: "Content Niche",
                type: "select",
                options: "Entertainment,Education,Beauty,Fitness,Food,Business,Lifestyle,Tech,Music,Other"
            },
            {
                id: "language",
                label: "Output Language",
                type: "language"
            }
        ]),
        prompt_template: `You are a TikTok analytics expert. Calculate engagement metrics based on:

**Followers:** {followerCount}
**Total Likes (10 videos):** {totalLikes}
**Total Comments (10 videos):** {totalComments}
**Total Shares (10 videos):** {totalShares}
**Total Views (10 videos):** {totalViews}
**Niche:** {niche}
**Language:** {language}

Provide comprehensive analysis:

**1. ENGAGEMENT RATES**
Calculate and explain each metric:
- Overall Engagement Rate = (Likes + Comments + Shares) / Followers × 100
- View-Based Engagement = (Likes + Comments + Shares) / Views × 100
- Average Likes per Video
- Average Comments per Video
- Average Shares per Video
- Like-to-View Ratio
- Comment-to-Like Ratio

**2. BENCHMARK COMPARISON**
Compare to {niche} niche averages:
| Metric | Your Rate | Industry Avg | Status |
|--------|-----------|--------------|--------|

**3. PERFORMANCE GRADES**
- Overall Score: X/100
- Virality Potential: Low/Medium/High
- Algorithm Favorability: Rating

**4. INSIGHTS**
- What's working well
- Areas for improvement
- Content patterns analysis
- Best performing content type guess

**5. ACTION PLAN**
- 3 quick wins to boost engagement
- Long-term strategy recommendations
- Posting time optimization
- Content format suggestions

Include:
- Week-over-week trend estimation
- Monetization readiness assessment
- Brand deal rate estimation based on metrics`
    },

    "content-calendar-generator": {
        descriptions: {
            en: "Plan a month of TikTok content in minutes. Get a complete posting schedule with content themes, optimal times, and a mix of trends and evergreen that keeps your audience coming back.",
            es: "Planifica un mes de contenido de TikTok en minutos. Obtén un calendario de publicación completo con temas de contenido, horarios óptimos, y una mezcla de tendencias y evergreen que mantiene a tu audiencia volviendo.",
            pt: "Planeje um mês de conteúdo TikTok em minutos. Obtenha um calendário de postagem completo com temas de conteúdo, horários ideais, e um mix de tendências e evergreen que mantém sua audiência voltando.",
            fr: "Planifiez un mois de contenu TikTok en quelques minutes. Obtenez un calendrier de publication complet avec des thèmes, des horaires optimaux, et un mix de tendances et d'evergreen.",
            de: "Planen Sie einen Monat TikTok-Content in Minuten. Erhalten Sie einen kompletten Posting-Plan mit Content-Themen, optimalen Zeiten und einem Mix aus Trends und Evergreen.",
            it: "Pianifica un mese di contenuti TikTok in pochi minuti. Ottieni un calendario di pubblicazione completo con temi, orari ottimali, e un mix di trend ed evergreen che fa tornare il tuo pubblico."
        },
        inputs: JSON.stringify([
            {
                id: "niche",
                label: "Your Niche",
                type: "text",
                placeholder: "e.g., Fitness, cooking, fashion..."
            },
            {
                id: "postsPerWeek",
                label: "Posts per Week",
                type: "select",
                options: "3 posts,5 posts,7 posts (daily),10+ posts"
            },
            {
                id: "contentPillars",
                label: "Content Pillars (3-5 themes)",
                type: "text",
                placeholder: "e.g., Tips, Behind-scenes, Tutorials, Trends..."
            },
            {
                id: "accountGoal",
                label: "Primary Goal",
                type: "select",
                options: "Grow Followers,Increase Engagement,Drive Sales,Build Community,Brand Awareness"
            },
            {
                id: "timezone",
                label: "Your Timezone",
                type: "select",
                options: "EST (US East),PST (US West),CST (US Central),GMT (UK),CET (Europe),Other"
            },
            {
                id: "language",
                label: "Output Language",
                type: "language"
            }
        ]),
        prompt_template: `You are a TikTok content strategist. Create a monthly content calendar based on:

**Niche:** {niche}
**Posts per Week:** {postsPerWeek}
**Content Pillars:** {contentPillars}
**Primary Goal:** {accountGoal}
**Timezone:** {timezone}
**Language:** {language}

Generate a complete 4-week content calendar:

**WEEK 1-4 CALENDAR**
For each day with a scheduled post, provide:
| Day | Time | Content Pillar | Video Concept | Format | Hook Idea |
|-----|------|----------------|---------------|--------|-----------|

**CONTENT MIX STRATEGY**
- 60% Evergreen content (always relevant)
- 25% Trend-based content (current trends to hop on)
- 15% Community content (duets, stitches, responses)

**OPTIMAL POSTING TIMES**
Based on {timezone} and {niche}:
- Best days to post
- Peak engagement hours
- Avoid posting at

**WEEKLY THEMES**
- Week 1: [Theme + rationale]
- Week 2: [Theme + rationale]
- Week 3: [Theme + rationale]
- Week 4: [Theme + rationale]

**BATCH CONTENT DAYS**
- Suggested filming days
- What to batch together
- Equipment/prep needed

**SUCCESS METRICS TO TRACK**
- Weekly goals
- Monthly targets
- Key metrics for {accountGoal}

Include:
- Buffer content for low-energy days
- 5 "emergency" evergreen ideas
- Monthly review checklist`
    },

    "ad-copy-generator": {
        descriptions: {
            en: "Write TikTok ad copy that doesn't feel like an ad. Get native-style scripts that blend into the For You page while still driving clicks, conversions, and sales.",
            es: "Escribe copy de anuncios TikTok que no se sienta como anuncio. Obtén guiones estilo nativo que se mezclan en el For You mientras generan clics, conversiones y ventas.",
            pt: "Escreva copy de anúncios TikTok que não parece anúncio. Obtenha roteiros estilo nativo que se misturam no For You enquanto geram cliques, conversões e vendas.",
            fr: "Écrivez des textes publicitaires TikTok qui ne ressemblent pas à des publicités. Obtenez des scripts natifs qui se fondent dans le For You tout en générant des clics et des ventes.",
            de: "Schreiben Sie TikTok-Werbetexte, die sich nicht wie Werbung anfühlen. Erhalten Sie native Skripte, die sich in die For You Page einfügen und trotzdem Klicks und Verkäufe generieren.",
            it: "Scrivi copy per annunci TikTok che non sembrano pubblicità. Ottieni script in stile nativo che si fondono nel For You mentre generano clic, conversioni e vendite."
        },
        inputs: JSON.stringify([
            {
                id: "productService",
                label: "Product/Service",
                type: "text",
                placeholder: "What are you advertising?"
            },
            {
                id: "adObjective",
                label: "Ad Objective",
                type: "select",
                options: "Website Traffic,App Installs,Conversions/Sales,Lead Generation,Brand Awareness,Video Views"
            },
            {
                id: "targetAudience",
                label: "Target Audience",
                type: "text",
                placeholder: "Who are you targeting? (age, interests, pain points)"
            },
            {
                id: "uniqueSellingPoint",
                label: "Unique Selling Point",
                type: "text",
                placeholder: "What makes your product/service special?"
            },
            {
                id: "adFormat",
                label: "Ad Format",
                type: "select",
                options: "In-Feed Native,Spark Ads (boost existing),TopView,Brand Takeover,Branded Hashtag"
            },
            {
                id: "callToAction",
                label: "Call to Action",
                type: "select",
                options: "Shop Now,Learn More,Sign Up,Download,Get Offer,Book Now,Contact Us"
            },
            {
                id: "language",
                label: "Output Language",
                type: "language"
            }
        ]),
        prompt_template: `You are a TikTok advertising expert. Create ad copy that converts based on:

**Product/Service:** {productService}
**Ad Objective:** {adObjective}
**Target Audience:** {targetAudience}
**Unique Selling Point:** {uniqueSellingPoint}
**Ad Format:** {adFormat}
**Call to Action:** {callToAction}
**Language:** {language}

Generate 3 complete ad scripts:

**SCRIPT 1: NATIVE STORYTELLING**
A 15-30 second script that feels like organic content
- Hook (0-3s): Pattern interrupt, no brand mention
- Story (4-20s): Problem → Solution journey
- Reveal (21-25s): Natural product introduction
- CTA (26-30s): Soft, conversational close

**SCRIPT 2: UGC STYLE**
A testimonial-style script for creator partnerships
- Authentic opening (personal experience)
- The problem they faced
- Discovery moment
- Results/transformation
- Genuine recommendation
- CTA

**SCRIPT 3: TREND-JACKING**
A script that leverages current TikTok formats
- Use popular format/trend structure
- Adapt it to your product naturally
- Keep the trend's energy
- Organic product placement

For each script include:
- On-screen text suggestions
- Music/sound recommendations
- Visual direction notes
- A/B testing variations

**AD PERFORMANCE TIPS**
- Best hooks for {adObjective}
- Thumbnail text suggestions
- Targeting recommendations
- Budget optimization tips
- Common ad mistakes to avoid`
    },

    "song-recommendations": {
        descriptions: {
            en: "Find the perfect trending sound for your TikTok before everyone else uses it. Get 10 song recommendations matched to your content style with usage tips and timing strategy.",
            es: "Encuentra el sonido trending perfecto para tu TikTok antes que todos lo usen. Obtén 10 recomendaciones de canciones que coinciden con tu estilo de contenido con tips de uso y estrategia de timing.",
            pt: "Encontre o som trending perfeito para seu TikTok antes que todos usem. Obtenha 10 recomendações de músicas que combinam com seu estilo de conteúdo com dicas de uso e estratégia de timing.",
            fr: "Trouvez le son tendance parfait pour votre TikTok avant que tout le monde l'utilise. Obtenez 10 recommandations de chansons adaptées à votre style avec des conseils d'utilisation.",
            de: "Finden Sie den perfekten Trending-Sound für Ihr TikTok, bevor alle anderen ihn verwenden. Erhalten Sie 10 Song-Empfehlungen passend zu Ihrem Content-Stil mit Nutzungstipps.",
            it: "Trova il suono trending perfetto per il tuo TikTok prima che lo usino tutti. Ottieni 10 raccomandazioni di canzoni adatte al tuo stile di contenuto con consigli d'uso e strategia di timing."
        },
        inputs: JSON.stringify([
            {
                id: "contentType",
                label: "Content Type",
                type: "select",
                options: "Dance/Choreography,Lip Sync,Transition Video,Day in My Life,Tutorial/How-to,Comedy/Skit,Aesthetic/Vibe,Motivation/Inspiration,Storytime,Product Showcase"
            },
            {
                id: "videoMood",
                label: "Video Mood",
                type: "select",
                options: "Energetic/Hype,Chill/Relaxed,Emotional/Deep,Funny/Playful,Dramatic/Intense,Nostalgic,Romantic,Empowering"
            },
            {
                id: "musicGenre",
                label: "Preferred Genre",
                type: "select",
                options: "Pop,Hip-Hop/Rap,Electronic/EDM,Indie/Alternative,R&B/Soul,Latin,Country,Any/No Preference"
            },
            {
                id: "trendTiming",
                label: "Trend Timing Preference",
                type: "select",
                options: "Early Adopter (emerging trends),Peak Wave (currently viral),Evergreen (always works),Mix of All"
            },
            {
                id: "videoDuration",
                label: "Video Duration",
                type: "select",
                options: "7-15 seconds,15-30 seconds,30-60 seconds,1-3 minutes"
            },
            {
                id: "language",
                label: "Output Language",
                type: "language"
            }
        ]),
        prompt_template: `You are a TikTok music trend analyst. Recommend songs based on:

**Content Type:** {contentType}
**Video Mood:** {videoMood}
**Preferred Genre:** {musicGenre}
**Trend Timing:** {trendTiming}
**Video Duration:** {videoDuration}
**Language:** {language}

Provide 10 song recommendations organized by trend status:

**RISING TRENDS (3 songs)** 🚀
Songs just starting to gain traction - get in early!
For each:
- Song: [Artist - Title]
- Why it's rising
- Best video types for this sound
- Specific timestamp to use
- Predicted peak timing

**PEAK TRENDING (4 songs)** 🔥
Currently viral - high visibility but more competition
For each:
- Song: [Artist - Title]
- Current trend usage
- How to stand out with this sound
- Best timestamp
- Remaining trend lifespan estimate

**EVERGREEN FAVORITES (3 songs)** ⭐
Always work, never feel outdated
For each:
- Song: [Artist - Title]
- Why it consistently performs
- Best use cases
- Best timestamps

**FOR EACH SONG INCLUDE:**
1. Direct match to your content type
2. Energy level match to your mood
3. Specific clip/timestamp (e.g., "0:15-0:30")
4. Video concept that works perfectly with it
5. Hook timing for maximum impact

**BONUS TIPS:**
- How to search for these sounds in TikTok
- Original vs. sped up versions advice
- When to use original audio instead
- Sound discovery strategies`
    },

    "thumbnail-text-generator": {
        descriptions: {
            en: "Create thumbnail text that makes scrollers stop and click. Get 10 text overlay options optimized for TikTok's vertical format with font, color, and placement recommendations.",
            es: "Crea texto de miniatura que hace que los que hacen scroll se detengan y hagan clic. Obtén 10 opciones de texto superpuesto optimizadas para el formato vertical de TikTok con recomendaciones de fuente, color y ubicación.",
            pt: "Crie texto de miniatura que faz scrollers pararem e clicarem. Obtenha 10 opções de texto sobreposto otimizadas para o formato vertical do TikTok com recomendações de fonte, cor e posicionamento.",
            fr: "Créez des textes de miniature qui font arrêter et cliquer les scrollers. Obtenez 10 options de texte optimisées pour le format vertical TikTok avec des recommandations de police, couleur et placement.",
            de: "Erstellen Sie Thumbnail-Texte, die Scroller stoppen und klicken lassen. Erhalten Sie 10 Textoptionen für TikToks Hochformat mit Schrift-, Farb- und Platzierungsempfehlungen.",
            it: "Crea testi miniatura che fanno fermare e cliccare chi scorre. Ottieni 10 opzioni di testo overlay ottimizzate per il formato verticale TikTok con raccomandazioni per font, colore e posizionamento."
        },
        inputs: JSON.stringify([
            {
                id: "videoTopic",
                label: "Video Topic",
                type: "text",
                placeholder: "What is your video about?"
            },
            {
                id: "contentType",
                label: "Content Type",
                type: "select",
                options: "Tutorial/How-to,Storytime,Tips/Advice,Before & After,Reveal/Surprise,Day in My Life,Comedy,Review,Challenge,Other"
            },
            {
                id: "emotionalHook",
                label: "Emotional Hook",
                type: "select",
                options: "Curiosity/Mystery,Shock/Surprise,FOMO,Humor,Inspiration,Fear/Warning,Relatability,Controversy"
            },
            {
                id: "textStyle",
                label: "Text Style",
                type: "select",
                options: "Short & Punchy (1-4 words),Question Format,Statement/Claim,Numbered List Teaser,All Caps Energy,Casual & Conversational"
            },
            {
                id: "targetEmotion",
                label: "Target Response",
                type: "select",
                options: "Make them curious,Make them laugh,Make them relate,Make them learn,Make them want"
            },
            {
                id: "language",
                label: "Output Language",
                type: "language"
            }
        ]),
        prompt_template: `You are a TikTok thumbnail optimization expert. Create compelling text overlays based on:

**Video Topic:** {videoTopic}
**Content Type:** {contentType}
**Emotional Hook:** {emotionalHook}
**Text Style:** {textStyle}
**Target Response:** {targetEmotion}
**Language:** {language}

Generate 10 thumbnail text options:

**CATEGORY 1: HIGH IMPACT (3 options)**
Bold, attention-grabbing text that stops the scroll
- Text option
- Why it works psychologically
- Best font style (Bold, Sans-serif, Handwritten)
- Color recommendation
- Placement (top, center, bottom)

**CATEGORY 2: CURIOSITY BUILDERS (3 options)**
Text that creates an information gap
- Text option
- The "open loop" it creates
- Best font style
- Color recommendation
- Placement

**CATEGORY 3: RELATABLE HOOKS (2 options)**
Text that makes viewers say "that's me"
- Text option
- Target pain point/experience
- Best font style
- Color recommendation
- Placement

**CATEGORY 4: EMOTIONAL TRIGGERS (2 options)**
Text that evokes immediate emotional response
- Text option
- Emotion targeted
- Best font style
- Color recommendation
- Placement

**DESIGN SPECIFICATIONS FOR EACH:**
- Character count (keep under 25 for readability)
- Line breaks for multi-line text
- Background treatment (outline, shadow, box)
- Mobile readability check

**THUMBNAIL BEST PRACTICES:**
- Safe zones to avoid (TikTok UI elements)
- Font size recommendations
- Contrast requirements
- A/B testing suggestions

Include 3 thumbnail text formats to AVOID and why.`
    }
};

async function fixTikTokTools() {
    console.log("🔧 Fixing TikTok tools...\n");

    let updatedCount = 0;
    let failedCount = 0;

    for (const [slug, fixes] of Object.entries(TIKTOK_TOOLS_FIX)) {
        console.log(`\n📝 Updating: ${slug}`);

        // Find all language versions of this tool
        const result = await databases.listDocuments(DATABASE_ID, "tools", [
            Query.equal("platform", "tiktok"),
            Query.equal("slug", slug),
            Query.limit(10),
        ]);

        if (result.documents.length === 0) {
            console.log(`   ⚠️ Tool not found: ${slug}`);
            continue;
        }

        for (const doc of result.documents) {
            const lang = doc.language || "en";
            const description = fixes.descriptions[lang] || fixes.descriptions.en;

            try {
                await databases.updateDocument(DATABASE_ID, "tools", doc.$id, {
                    description: description,
                    inputs: fixes.inputs,
                    prompt_template: fixes.prompt_template,
                });
                console.log(`   ✅ Updated ${lang} version`);
                updatedCount++;
            } catch (error) {
                console.log(`   ❌ Failed ${lang}: ${error.message}`);
                failedCount++;
            }
        }
    }

    console.log(`\n✅ TikTok tools update complete! (${updatedCount} updated, ${failedCount} failed)`);
    console.log("\n📊 Running audit to verify...\n");

    // Run audit to verify
    const result = await databases.listDocuments(DATABASE_ID, "tools", [
        Query.equal("platform", "tiktok"),
        Query.equal("language", "en"),
        Query.limit(50),
    ]);

    let passed = 0;
    let failed = 0;

    for (const tool of result.documents) {
        const issues = [];

        const badDescPatterns = ["Generate amazing", "Generate high-quality"];
        const hasGenericDesc = badDescPatterns.some((p) => tool.description?.includes(p));
        if (!tool.description || hasGenericDesc || tool.description.length < 50) {
            issues.push("❌ Description");
        }

        let inputs = [];
        try {
            inputs = typeof tool.inputs === "string" ? JSON.parse(tool.inputs) : tool.inputs;
        } catch (e) { }
        if (!inputs || inputs.length < 2) {
            issues.push("❌ Inputs");
        }

        if (!tool.prompt_template || tool.prompt_template.length < 200) {
            issues.push("❌ Prompt");
        }

        if (issues.length > 0) {
            console.log(`🔴 ${tool.name} - ${issues.join(", ")}`);
            failed++;
        } else {
            console.log(`🟢 ${tool.name} - OK`);
            passed++;
        }
    }

    console.log(`\n📈 FINAL: ${passed}/${passed + failed} tools passed (${Math.round((passed / (passed + failed)) * 100)}%)`);
}

fixTikTokTools().catch(console.error);
