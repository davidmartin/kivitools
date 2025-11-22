import OpenAI from "openai";

// Cliente OpenRouter configurado
const deepseek = new OpenAI({
    baseURL: "https://openrouter.ai/api/v1",
    apiKey: process.env.OPENROUTER_API_KEY,
});

const MODEL_NAME = "x-ai/grok-4.1-fast";

// Mapeo de idiomas a nombres completos (compartido)
const languageNames: Record<string, string> = {
    en: "English",
    es: "Spanish",
    fr: "French",
    zh: "Chinese",
    hi: "Hindi",
    ar: "Arabic",
    ru: "Russian",
    de: "German",
    ja: "Japanese",
    id: "Indonesian",
    vi: "Vietnamese",
    th: "Thai",
    ko: "Korean",
};

export async function generateTikTokScript({
    topic,
    tone,
    duration,
    language,
}: {
    topic: string;
    tone: string;
    duration: string;
    language: string;
}): Promise<string> {
    // Mapeo de duraciones a número de palabras aproximado
    const wordCounts: Record<string, number> = {
        "30s": 75,
        "60s": 150,
        "30-60s": 110,
    };

    const targetWords = wordCounts[duration] || 110;
    const targetLanguage = languageNames[language] || "English";

    // System prompt optimizado para TikTok
    const systemPrompt = `You are an expert TikTok scriptwriter. Create engaging, viral-worthy scripts that:
- Hook viewers in the first 3 seconds
- Use short, punchy sentences
- Include natural pauses for emphasis
- Are optimized for voiceover recording
- Follow TikTok best practices
- Use line breaks to separate different ideas or sentences for better readability

Write in a ${tone} tone and keep it around ${targetWords} words for a ${duration} video.
IMPORTANT: Write ONLY in ${targetLanguage}. Do not include any other language.`;

    const userPrompt = `Create a TikTok script about: ${topic}

Requirements:
- Target length: ${targetWords} words (for ${duration} video)
- Tone: ${tone}
- Language: ${targetLanguage}
- Start with a strong hook
- End with a call-to-action or engaging question
- Use line breaks between sentences or ideas for better readability
- Format each major point or sentence on its own line

Write ONLY the script text, no titles, no extra formatting.`;

    try {
        const completion = await deepseek.chat.completions.create({
            messages: [
                { role: "system", content: systemPrompt },
                { role: "user", content: userPrompt },
            ],
            model: MODEL_NAME,
            temperature: 0.8,
            max_tokens: 500,
        });

        const script = completion.choices[0]?.message?.content?.trim();

        if (!script) {
            throw new Error("No script generated");
        }

        return script;
    } catch (error) {
        console.error("DeepSeek API error:", error);
        throw new Error(
            error instanceof Error ? error.message : "Failed to generate script"
        );
    }
}

export async function generateVideoIdeas({
    topic,
    language,
}: {
    topic: string;
    language: string;
}): Promise<string[]> {
    const targetLanguage = languageNames[language] || "English";

    const systemPrompt = `You are a creative TikTok content strategist. Generate fresh, engaging video ideas that:
- Are specific and actionable
- Follow current TikTok trends
- Have viral potential
- Are diverse in approach (educational, entertaining, storytelling, etc.)

IMPORTANT: Write ONLY in ${targetLanguage}. Do not include any other language.`;

    const userPrompt = `Generate 8 creative TikTok video ideas about: ${topic}

Requirements:
- Language: ${targetLanguage}
- Make each idea unique and specific
- Include different content angles
- Each idea should be 1-2 sentences
- Format: Return each idea on a new line, numbered (1., 2., 3., etc.)

Write ONLY the numbered list, no titles or extra formatting.`;

    try {
        const completion = await deepseek.chat.completions.create({
            messages: [
                { role: "system", content: systemPrompt },
                { role: "user", content: userPrompt },
            ],
            model: MODEL_NAME,
            temperature: 0.9,
            max_tokens: 600,
        });

        const content = completion.choices[0]?.message?.content?.trim();

        if (!content) {
            throw new Error("No ideas generated");
        }

        // Parsear las ideas (remover números y limpiar)
        const ideas = content
            .split("\n")
            .filter((line) => line.trim())
            .map((line) => line.replace(/^\d+\.\s*/, "").trim())
            .filter((idea) => idea.length > 0);

        if (ideas.length === 0) {
            throw new Error("Failed to parse ideas");
        }

        return ideas;
    } catch (error) {
        console.error("DeepSeek API error:", error);
        throw new Error(
            error instanceof Error ? error.message : "Failed to generate ideas"
        );
    }
}

export async function generateHooks({
    topic,
    tone,
    language,
}: {
    topic: string;
    tone: string;
    language: string;
}): Promise<string[]> {
    const targetLanguage = languageNames[language] || "English";

    const systemPrompt = `You are a viral TikTok hook writer. Create attention-grabbing opening lines that:
- Stop scrollers in their tracks within 3 seconds
- Create curiosity or urgency
- Are short and punchy (5-10 words ideal)
- Match the ${tone} tone
- Follow proven viral hook patterns

IMPORTANT: Write ONLY in ${targetLanguage}. Do not include any other language.`;

    const userPrompt = `Generate 10 viral TikTok hooks about: ${topic}

Requirements:
- Language: ${targetLanguage}
- Tone: ${tone}
- Each hook should be 5-15 words maximum
- Use different hook patterns (question, shocking statement, curiosity gap, etc.)
- Format: Return each hook on a new line, numbered (1., 2., 3., etc.)

Write ONLY the numbered list of hooks, no explanations or extra formatting.`;

    try {
        const completion = await deepseek.chat.completions.create({
            messages: [
                { role: "system", content: systemPrompt },
                { role: "user", content: userPrompt },
            ],
            model: MODEL_NAME,
            temperature: 0.9,
            max_tokens: 500,
        });

        const content = completion.choices[0]?.message?.content?.trim();

        if (!content) {
            throw new Error("No hooks generated");
        }

        // Parsear los hooks
        const hooks = content
            .split("\n")
            .filter((line) => line.trim())
            .map((line) => line.replace(/^\d+\.\s*/, "").trim())
            .filter((hook) => hook.length > 0);

        if (hooks.length === 0) {
            throw new Error("Failed to parse hooks");
        }

        return hooks;
    } catch (error) {
        console.error("DeepSeek API error:", error);
        throw new Error(
            error instanceof Error ? error.message : "Failed to generate hooks"
        );
    }
}

export async function generateHashtags({
    keyword,
}: {
    keyword: string;
}): Promise<Array<{ tag: string; views: string; relevance: string }>> {
    const systemPrompt = `You are a TikTok SEO expert. Generate relevant, trending hashtags that:
- Mix popular and niche hashtags for maximum reach
- Are actually used on TikTok
- Include a variety of sizes (viral, trending, niche)
- Help content get discovered

Provide realistic view count estimates based on hashtag popularity.`;

    const userPrompt = `Generate 15 relevant TikTok hashtags for: ${keyword}

Requirements:
- Mix of high, medium, and low competition hashtags
- Include main keyword variations
- Include trending related hashtags
- Format each line as: #hashtag | views | relevance
- Views should be estimates like "1.2B", "450M", "89K"
- Relevance: "High", "Medium", or "Low"

Example format:
#tiktoktips | 2.5B | High
#contentcreator | 890M | Medium
#smallbusiness | 45K | Low

Write ONLY the hashtag list in that exact format, no extra text.`;

    try {
        const completion = await deepseek.chat.completions.create({
            messages: [
                { role: "system", content: systemPrompt },
                { role: "user", content: userPrompt },
            ],
            model: MODEL_NAME,
            temperature: 0.7,
            max_tokens: 600,
        });

        const content = completion.choices[0]?.message?.content?.trim();

        if (!content) {
            throw new Error("No hashtags generated");
        }

        // Parsear los hashtags
        const hashtags = content
            .split("\n")
            .filter((line) => line.trim() && line.includes("|"))
            .map((line) => {
                const parts = line.split("|").map((p) => p.trim());
                return {
                    tag: parts[0] || "",
                    views: parts[1] || "",
                    relevance: parts[2] || "",
                };
            })
            .filter((h) => h.tag.startsWith("#"));

        if (hashtags.length === 0) {
            throw new Error("Failed to parse hashtags");
        }

        return hashtags;
    } catch (error) {
        console.error("DeepSeek API error:", error);
        throw new Error(
            error instanceof Error
                ? error.message
                : "Failed to generate hashtags"
        );
    }
}

// TikTok Username Generator
export async function generateTikTokUsernames({
    keywords,
    style,
}: {
    keywords: string;
    style: string;
}): Promise<string[]> {
    const styleDescriptions: Record<string, string> = {
        creative: "creative, unique, and memorable",
        professional: "professional, clean, and trustworthy",
        fun: "fun, playful, and energetic",
        short: "short, simple, and easy to remember (3-10 characters)",
    };

    const styleDesc = styleDescriptions[style] || styleDescriptions.creative;

    const systemPrompt = `You are an expert at creating catchy TikTok usernames. Generate usernames that are:
- ${styleDesc}
- Easy to pronounce and spell
- Unique and likely to be available
- TikTok-appropriate (no special characters except underscores and periods)
- Related to the given keywords

Format: Return ONLY a list of 15 usernames, one per line, without @ symbols or numbering.`;

    const userPrompt = `Generate 15 TikTok usernames based on these keywords: ${keywords}

Style: ${style}

Requirements:
- Use the keywords creatively
- Mix and match keywords
- Add relevant words that fit the style
- Keep them memorable
- No @ symbols
- One username per line`;

    try {
        const completion = await deepseek.chat.completions.create({
            messages: [
                { role: "system", content: systemPrompt },
                { role: "user", content: userPrompt },
            ],
            model: MODEL_NAME,
            temperature: 0.9,
            max_tokens: 400,
        });

        const content = completion.choices[0]?.message?.content?.trim();

        if (!content) {
            throw new Error("Empty response from API");
        }

        // Parse usernames from response
        const usernames = content
            .split("\n")
            .map((line) => line.trim().replace(/^[@\d\.\-\*]+\s*/, ""))
            .filter((username) => username.length > 0 && username.length <= 30);

        if (usernames.length === 0) {
            throw new Error("Failed to parse usernames");
        }

        return usernames.slice(0, 15);
    } catch (error) {
        console.error("DeepSeek API error:", error);
        throw new Error(
            error instanceof Error
                ? error.message
                : "Failed to generate usernames"
        );
    }
}

// TikTok Shop Name Generator
export async function generateTikTokShopNames({
    category,
    keywords,
    style,
}: {
    category: string;
    keywords?: string;
    style: string;
}): Promise<string[]> {
    const styleDescriptions: Record<string, string> = {
        modern: "modern, trendy, and innovative",
        elegant: "elegant, sophisticated, and premium",
        fun: "fun, playful, and energetic",
        professional: "professional, trustworthy, and established",
    };

    const styleDesc = styleDescriptions[style] || styleDescriptions.modern;

    const keywordsPart = keywords ? ` Keywords to incorporate: ${keywords}` : "";

    const systemPrompt = `You are an expert at creating brandable shop names for TikTok Shop. Generate names that are:
- ${styleDesc}
- Memorable and easy to pronounce
- Brandable and scalable
- Suitable for the given business category
- Short and catchy (2-3 words ideal)

Format: Return ONLY a list of 12 shop names, one per line, without numbering.`;

    const userPrompt = `Generate 12 TikTok Shop names for a ${category} business.
${keywordsPart}

Style: ${style}

Requirements:
- Related to ${category}
- ${styleDesc}
- Brandable and memorable
- 2-3 words preferred
- One name per line`;

    try {
        const completion = await deepseek.chat.completions.create({
            messages: [
                { role: "system", content: systemPrompt },
                { role: "user", content: userPrompt },
            ],
            model: MODEL_NAME,
            temperature: 0.9,
            max_tokens: 400,
        });

        const content = completion.choices[0]?.message?.content?.trim();

        if (!content) {
            throw new Error("Empty response from API");
        }

        // Parse shop names from response
        const names = content
            .split("\n")
            .map((line) => line.trim().replace(/^[\d\.\-\*]+\s*/, ""))
            .filter((name) => name.length > 0 && name.length <= 50);

        if (names.length === 0) {
            throw new Error("Failed to parse shop names");
        }

        return names.slice(0, 12);
    } catch (error) {
        console.error("DeepSeek API error:", error);
        throw new Error(
            error instanceof Error
                ? error.message
                : "Failed to generate shop names"
        );
    }
}

// Instagram Caption Generator
export async function generateInstagramCaption({
    topic,
    tone,
    includeEmojis,
    includeHashtags,
    language,
}: {
    topic: string;
    tone: string;
    includeEmojis: boolean;
    includeHashtags: boolean;
    language: string;
}): Promise<string> {
    const targetLanguage = languageNames[language] || "English";

    const systemPrompt = `You are an expert Instagram caption writer. Create engaging captions that:
- Hook attention in the first line
- Tell a story or share value
- Encourage engagement
- Match the brand voice and tone
${includeEmojis ? "- Use relevant emojis naturally throughout" : "- Do NOT use any emojis"}
${includeHashtags ? "- Include 5-10 relevant hashtags at the end" : "- Do NOT include hashtags"}

Write in a ${tone} tone.
IMPORTANT: Write ONLY in ${targetLanguage}. Do not include any other language.`;

    const userPrompt = `Create an Instagram caption about: ${topic}

Requirements:
- Language: ${targetLanguage}
- Tone: ${tone}
- Length: 100-150 words
${includeEmojis ? "- Include emojis naturally" : "- No emojis"}
${includeHashtags ? "- Add 5-10 relevant hashtags at the end (separated by a blank line)" : "- No hashtags"}
- Start with a hook
- Include line breaks for readability
- End with a call-to-action or question

Write ONLY the caption text, no titles or extra formatting.`;

    try {
        const completion = await deepseek.chat.completions.create({
            messages: [
                { role: "system", content: systemPrompt },
                { role: "user", content: userPrompt },
            ],
            model: MODEL_NAME,
            temperature: 0.8,
            max_tokens: 500,
        });

        const caption = completion.choices[0]?.message?.content?.trim();

        if (!caption) {
            throw new Error("No caption generated");
        }

        return caption;
    } catch (error) {
        console.error("DeepSeek API error:", error);
        throw new Error(
            error instanceof Error ? error.message : "Failed to generate caption"
        );
    }
}

// Instagram Bio Generator
export async function generateInstagramBio({
    description,
    tone,
    includeEmojis,
    language,
}: {
    description: string;
    tone: string;
    includeEmojis: boolean;
    language: string;
}): Promise<string> {
    const targetLanguage = languageNames[language] || "English";

    const systemPrompt = `You are an Instagram bio specialist. Create compelling bios that:
- Are concise (150 characters or less)
- Clearly communicate who/what
- Include a unique value proposition
- Are memorable and engaging
${includeEmojis ? "- Use 2-4 relevant emojis" : "- Do NOT use any emojis"}

Write in a ${tone} tone.
IMPORTANT: Write ONLY in ${targetLanguage}. Do not include any other language.`;

    const userPrompt = `Create an Instagram bio for: ${description}

Requirements:
- Language: ${targetLanguage}
- Tone: ${tone}
- Maximum 150 characters
${includeEmojis ? "- Include 2-4 relevant emojis" : "- No emojis"}
- Clear and concise
- Show personality
- Can include line breaks (use | to separate lines)

Write ONLY the bio text, no titles or extra formatting.`;

    try {
        const completion = await deepseek.chat.completions.create({
            messages: [
                { role: "system", content: systemPrompt },
                { role: "user", content: userPrompt },
            ],
            model: MODEL_NAME,
            temperature: 0.8,
            max_tokens: 200,
        });

        const bio = completion.choices[0]?.message?.content?.trim();

        if (!bio) {
            throw new Error("No bio generated");
        }

        // Reemplazar | con saltos de línea para formato de bio
        return bio.replace(/\s*\|\s*/g, "\n");
    } catch (error) {
        console.error("DeepSeek API error:", error);
        throw new Error(
            error instanceof Error ? error.message : "Failed to generate bio"
        );
    }
}

// Instagram Reel Script Generator
export async function generateReelScript({
    topic,
    tone,
    duration,
    language,
}: {
    topic: string;
    tone: string;
    duration: string;
    language: string;
}): Promise<string> {
    const wordCounts: Record<string, number> = {
        "15s": 40,
        "30s": 75,
        "60s": 150,
    };

    const targetWords = wordCounts[duration] || 75;
    const targetLanguage = languageNames[language] || "English";

    const systemPrompt = `You are an expert Instagram Reels scriptwriter. Create engaging scripts that:
- Hook viewers in the first 2 seconds
- Are optimized for vertical video format
- Use short, punchy sentences
- Include visual cues and transitions
- Follow Instagram Reels best practices
- Use line breaks to separate scenes/ideas

Write in a ${tone} tone and keep it around ${targetWords} words for a ${duration} Reel.
IMPORTANT: Write ONLY in ${targetLanguage}. Do not include any other language.`;

    const userPrompt = `Create an Instagram Reels script about: ${topic}

Requirements:
- Target length: ${targetWords} words (for ${duration} Reel)
- Tone: ${tone}
- Language: ${targetLanguage}
- Start with a strong visual hook
- Include scene transitions or cuts
- End with a call-to-action
- Use line breaks between scenes/ideas
- Format for voiceover

Write ONLY the script text, no titles, no scene numbers, just the voiceover text with line breaks.`;

    try {
        const completion = await deepseek.chat.completions.create({
            messages: [
                { role: "system", content: systemPrompt },
                { role: "user", content: userPrompt },
            ],
            model: MODEL_NAME,
            temperature: 0.8,
            max_tokens: 500,
        });

        const script = completion.choices[0]?.message?.content?.trim();

        if (!script) {
            throw new Error("No script generated");
        }

        return script;
    } catch (error) {
        console.error("DeepSeek API error:", error);
        throw new Error(
            error instanceof Error ? error.message : "Failed to generate script"
        );
    }
}

// Twitter Thread Maker
export async function generateTwitterThread({
    topic,
    tone,
    numberOfTweets,
    language,
}: {
    topic: string;
    tone: string;
    numberOfTweets: number;
    language: string;
}): Promise<string[]> {
    const targetLanguage = languageNames[language] || "English";

    const systemPrompt = `You are an expert Twitter thread creator. Create engaging threads that:
- Hook attention in the first tweet
- Tell a cohesive story across tweets
- Each tweet stands alone but connects to the narrative
- Use Twitter best practices
- Are optimized for engagement and retweets
- Each tweet is under 280 characters

Write in a ${tone} tone.
IMPORTANT: Write ONLY in ${targetLanguage}. Do not include any other language.`;

    const userPrompt = `Create a Twitter thread with ${numberOfTweets} tweets about: ${topic}

Requirements:
- Language: ${targetLanguage}
- Tone: ${tone}
- Number of tweets: ${numberOfTweets}
- First tweet must hook attention
- Each tweet under 280 characters
- Last tweet should include call-to-action
- Format: Return each tweet on a new line, numbered (1., 2., 3., etc.)

Write ONLY the numbered tweets, no extra formatting.`;

    try {
        const completion = await deepseek.chat.completions.create({
            messages: [
                { role: "system", content: systemPrompt },
                { role: "user", content: userPrompt },
            ],
            model: MODEL_NAME,
            temperature: 0.8,
            max_tokens: 800,
        });

        const content = completion.choices[0]?.message?.content?.trim();

        if (!content) {
            throw new Error("No thread generated");
        }

        const tweets = content
            .split("\n")
            .filter((line) => line.trim())
            .map((line) => line.replace(/^\d+\.\s*/, "").trim())
            .filter((tweet) => tweet.length > 0);

        if (tweets.length === 0) {
            throw new Error("Failed to parse tweets");
        }

        return tweets;
    } catch (error) {
        console.error("DeepSeek API error:", error);
        throw new Error(
            error instanceof Error ? error.message : "Failed to generate thread"
        );
    }
}

// Twitter Bio Generator
export async function generateTwitterBio({
    description,
    tone,
    includeEmojis,
    language,
}: {
    description: string;
    tone: string;
    includeEmojis: boolean;
    language: string;
}): Promise<string> {
    const targetLanguage = languageNames[language] || "English";

    const systemPrompt = `You are a Twitter bio specialist. Create compelling bios that:
- Are concise (160 characters or less)
- Clearly communicate who/what
- Are memorable and engaging
- Show personality
${includeEmojis ? "- Use 1-3 relevant emojis" : "- Do NOT use any emojis"}

Write in a ${tone} tone.
IMPORTANT: Write ONLY in ${targetLanguage}. Do not include any other language.`;

    const userPrompt = `Create a Twitter bio for: ${description}

Requirements:
- Language: ${targetLanguage}
- Tone: ${tone}
- Maximum 160 characters
${includeEmojis ? "- Include 1-3 relevant emojis" : "- No emojis"}
- Clear and concise
- Show personality

Write ONLY the bio text, no titles or extra formatting.`;

    try {
        const completion = await deepseek.chat.completions.create({
            messages: [
                { role: "system", content: systemPrompt },
                { role: "user", content: userPrompt },
            ],
            model: MODEL_NAME,
            temperature: 0.8,
            max_tokens: 200,
        });

        const bio = completion.choices[0]?.message?.content?.trim();

        if (!bio) {
            throw new Error("No bio generated");
        }

        return bio;
    } catch (error) {
        console.error("DeepSeek API error:", error);
        throw new Error(
            error instanceof Error ? error.message : "Failed to generate bio"
        );
    }
}

// Forocoches Thread Generator
export async function generateForocochesThread({
    topic,
    tone,
}: {
    topic: string;
    tone: string;
}): Promise<string> {
    const systemPrompt = `You are a legendary Forocoches user (shurmano). Create a thread content that:
- Uses typical Forocoches slang (shur, shurmano, rocoso, demigrante, tds pts, etc.)
- Formats the text with BBCode ([b], [i], [quote], [img], etc.)
- Matches the requested tone (${tone})
- Is engaging and encourages replies
- Includes a "Resumen para vagos" (TL;DR) at the end

Tone guidelines:
- Serious: Use [Tema Serio] tag, be respectful but use slang.
- Troll: Be sarcastic, funny, maybe a bit absurd.
- Story: Tell a detailed anecdote, use [tocho] warning.

IMPORTANT: Write ONLY in Spanish (Spain slang). Return ONLY the BBCode content.`;

    const userPrompt = `Create a Forocoches thread about: ${topic}

Tone: ${tone}

Requirements:
- Use BBCode for formatting
- Include "Resumen para vagos"
- Use Forocoches slang naturally
- Make it look like a real post`;

    try {
        const completion = await deepseek.chat.completions.create({
            messages: [
                { role: "system", content: systemPrompt },
                { role: "user", content: userPrompt },
            ],
            model: MODEL_NAME,
            temperature: 0.9,
            max_tokens: 800,
        });

        const content = completion.choices[0]?.message?.content?.trim();

        if (!content) {
            throw new Error("No thread generated");
        }

        return content;
    } catch (error) {
        console.error("DeepSeek API error:", error);
        throw new Error(
            error instanceof Error ? error.message : "Failed to generate thread"
        );
    }
}

// Forocoches Pole Generator
export async function generateForocochesPole({
    style,
    topic,
}: {
    style: string;
    topic?: string;
}): Promise<string> {
    const topicContext = topic ? `\n- Context: The thread is about "${topic}"` : "";
    const systemPrompt = `You are a Forocoches user trying to get the "Pole" (first reply). Generate a short, funny message to claim the pole.
- Use slang (pole, subpole, fail, sitio, pillo sitio)
- Style: ${style}${topicContext}
- Keep it short (1-2 lines)
- You can include a placeholder for a GIF like [img]http://example.com/gif.gif[/img] if appropriate for the style.

Styles:
- Classic: Standard "Pole" or "Pillo sitio".
- Fail: Pretend you failed the pole (Subpole).
- Creative: Something absurd or funny related to the topic if provided.

IMPORTANT: Write ONLY in Spanish.`;

    const userPrompt = `Generate a "Pole" message. Style: ${style}${topic ? `\nTopic: ${topic}` : ""}`;

    try {
        const completion = await deepseek.chat.completions.create({
            messages: [
                { role: "system", content: systemPrompt },
                { role: "user", content: userPrompt },
            ],
            model: MODEL_NAME,
            temperature: 1.0,
            max_tokens: 100,
        });

        const content = completion.choices[0]?.message?.content?.trim();

        if (!content) {
            throw new Error("No pole generated");
        }

        return content;
    } catch (error) {
        console.error("DeepSeek API error:", error);
        throw new Error(
            error instanceof Error ? error.message : "Failed to generate pole"
        );
    }
}

// Forocoches Troll Response
export async function generateForocochesTroll({
    comment,
    intensity,
}: {
    comment: string;
    intensity: string;
}): Promise<string> {
    const systemPrompt = `You are a witty Forocoches troll.
- Sarcastic, funny, or "zasca" (burn)
- Uses Forocoches slang
- Matches the intensity: ${intensity}
- Uses BBCode if needed

Intensity:
- Soft: Irony, mild teasing.
- Medium: Sarcasm, making fun of the logic.
- Hard: Total destruction (but keep it within legal limits, no insults that ban).

IMPORTANT: Write ONLY in Spanish.`;

    const userPrompt = `Reply to this comment: "${comment}"

Intensity: ${intensity}`;

    try {
        const completion = await deepseek.chat.completions.create({
            messages: [
                { role: "system", content: systemPrompt },
                { role: "user", content: userPrompt },
            ],
            model: MODEL_NAME,
            temperature: 0.9,
            max_tokens: 300,
        });

        const content = completion.choices[0]?.message?.content?.trim();

        if (!content) {
            throw new Error("No response generated");
        }

        return content;
    } catch (error) {
        console.error("DeepSeek API error:", error);
        throw new Error(
            error instanceof Error ? error.message : "Failed to generate response"
        );
    }
}

// Tweet Generator
export async function generateTweet({
    topic,
    tone,
    language,
}: {
    topic: string;
    tone: string;
    language: string;
}): Promise<string[]> {
    const targetLanguage = languageNames[language] || "English";

    const systemPrompt = `You are an expert tweet writer. Create engaging tweets that:
- Are under 280 characters
- Hook attention immediately
- Encourage engagement (likes, retweets, replies)
- Are varied in style and approach
- Follow Twitter best practices

Write in a ${tone} tone.
IMPORTANT: Write ONLY in ${targetLanguage}. Do not include any other language.`;

    const userPrompt = `Generate 5 engaging tweets about: ${topic}

Requirements:
- Language: ${targetLanguage}
- Tone: ${tone}
- Each tweet under 280 characters
- Varied approaches (question, statement, story, tip, etc.)
- Format: Return each tweet on a new line, numbered (1., 2., 3., etc.)

Write ONLY the numbered tweets, no extra formatting.`;

    try {
        const completion = await deepseek.chat.completions.create({
            messages: [
                { role: "system", content: systemPrompt },
                { role: "user", content: userPrompt },
            ],
            model: MODEL_NAME,
            temperature: 0.9,
            max_tokens: 500,
        });

        const content = completion.choices[0]?.message?.content?.trim();

        if (!content) {
            throw new Error("No tweets generated");
        }

        const tweets = content
            .split("\n")
            .filter((line) => line.trim())
            .map((line) => line.replace(/^\d+\.\s*/, "").trim())
            .filter((tweet) => tweet.length > 0);

        if (tweets.length === 0) {
            throw new Error("Failed to parse tweets");
        }

        return tweets;
    } catch (error) {
        console.error("DeepSeek API error:", error);
        throw new Error(
            error instanceof Error ? error.message : "Failed to generate tweets"
        );
    }
}

// Snapchat Caption Generator
export async function generateSnapchatCaption({
    topic,
    tone,
    includeEmojis,
    language,
}: {
    topic: string;
    tone: string;
    includeEmojis: boolean;
    language: string;
}): Promise<string> {
    const targetLanguage = languageNames[language] || "English";

    const systemPrompt = `You are a Snapchat caption expert. Create fun, creative captions that:
- Are short and direct (under 100 characters ideal)
- Capture Snapchat's playful, authentic vibe
- Work well with visual content
- Encourage engagement
${includeEmojis ? "- Use relevant emojis naturally" : "- Do NOT use any emojis"}

Write in a ${tone} tone.
IMPORTANT: Write ONLY in ${targetLanguage}. Do not include any other language.`;

    const userPrompt = `Create a Snapchat caption for: ${topic}

Requirements:
- Language: ${targetLanguage}
- Tone: ${tone}
- Length: Under 100 characters
${includeEmojis ? "- Include relevant emojis" : "- No emojis"}
- Fun and engaging
- Authentic Snapchat style

Write ONLY the caption text, no titles or extra formatting.`;

    try {
        const completion = await deepseek.chat.completions.create({
            messages: [
                { role: "system", content: systemPrompt },
                { role: "user", content: userPrompt },
            ],
            model: MODEL_NAME,
            temperature: 0.9,
            max_tokens: 150,
        });

        const caption = completion.choices[0]?.message?.content?.trim();

        if (!caption) {
            throw new Error("No caption generated");
        }

        return caption;
    } catch (error) {
        console.error("DeepSeek API error:", error);
        throw new Error(
            error instanceof Error ? error.message : "Failed to generate caption"
        );
    }
}

// Snapchat Story Ideas Generator
export async function generateSnapchatStoryIdeas({
    topic,
    language,
}: {
    topic: string;
    language: string;
}): Promise<string[]> {
    const targetLanguage = languageNames[language] || "English";

    const systemPrompt = `You are a creative Snapchat content strategist. Generate fresh Story ideas that:
- Fit Snapchat's authentic, behind-the-scenes style
- Are quick and easy to execute
- Encourage viewer interaction
- Are diverse in approach
- Leverage Snapchat-specific features

IMPORTANT: Write ONLY in ${targetLanguage}. Do not include any other language.`;

    const userPrompt = `Generate 8 creative Snapchat Story ideas about: ${topic}

Requirements:
- Language: ${targetLanguage}
- Make each idea specific and actionable
- Include different content types (polls, Q&A, tutorials, day-in-life, etc.)
- Each idea should be 1-2 sentences
- Format: Return each idea on a new line, numbered (1., 2., 3., etc.)

Write ONLY the numbered list, no titles or extra formatting.`;

    try {
        const completion = await deepseek.chat.completions.create({
            messages: [
                { role: "system", content: systemPrompt },
                { role: "user", content: userPrompt },
            ],
            model: MODEL_NAME,
            temperature: 0.9,
            max_tokens: 600,
        });

        const content = completion.choices[0]?.message?.content?.trim();

        if (!content) {
            throw new Error("No ideas generated");
        }

        const ideas = content
            .split("\n")
            .filter((line) => line.trim())
            .map((line) => line.replace(/^\d+\.\s*/, "").trim())
            .filter((idea) => idea.length > 0);

        if (ideas.length === 0) {
            throw new Error("Failed to parse ideas");
        }

        return ideas;
    } catch (error) {
        console.error("DeepSeek API error:", error);
        throw new Error(
            error instanceof Error ? error.message : "Failed to generate ideas"
        );
    }
}

// Snapchat Lens Ideas Generator
export async function generateSnapchatLensIdeas({
    topic,
    language,
}: {
    topic: string;
    language: string;
}): Promise<string[]> {
    const targetLanguage = languageNames[language] || "English";

    const systemPrompt = `You are a Snapchat Lens Studio expert. Generate creative Lens concepts that:
- Are technically feasible in Lens Studio
- Are engaging and shareable
- Fit current AR trends
- Have viral potential
- Include clear implementation details

IMPORTANT: Write ONLY in ${targetLanguage}. Do not include any other language.`;

    const userPrompt = `Generate 6 creative Snapchat Lens ideas about: ${topic}

Requirements:
- Language: ${targetLanguage}
- Each idea should be detailed (2-3 sentences)
- Include what the Lens does and how users interact with it
- Make them feasible to create in Lens Studio
- Varied approaches (face filters, world effects, games, etc.)
- Format: Return each idea on a new line, numbered (1., 2., 3., etc.)

Write ONLY the numbered list, no titles or extra formatting.`;

    try {
        const completion = await deepseek.chat.completions.create({
            messages: [
                { role: "system", content: systemPrompt },
                { role: "user", content: userPrompt },
            ],
            model: MODEL_NAME,
            temperature: 0.9,
            max_tokens: 800,
        });

        const content = completion.choices[0]?.message?.content?.trim();

        if (!content) {
            throw new Error("No ideas generated");
        }

        const ideas = content
            .split("\n")
            .filter((line) => line.trim())
            .map((line) => line.replace(/^\d+\.\s*/, "").trim())
            .filter((idea) => idea.length > 0);

        if (ideas.length === 0) {
            throw new Error("Failed to parse ideas");
        }

        return ideas;
    } catch (error) {
        console.error("DeepSeek API error:", error);
        throw new Error(
            error instanceof Error ? error.message : "Failed to generate ideas"
        );
    }
}

// YouTube Video Script Generator
export async function generateYouTubeScript(
    topic: string,
    tone: string,
    duration: string,
    language: string
): Promise<string> {
    const targetLanguage = languageNames[language as keyof typeof languageNames] || "English";
    const systemPrompt = `You are a professional YouTube scriptwriter. Create well-structured, engaging video scripts with clear intro, body, and conclusion. Include hook, main points, and call-to-action.

IMPORTANT: Write ONLY in ${targetLanguage}. Do not include any other language.`;

    const userPrompt = `Create a YouTube video script about: ${topic}

Requirements:
- Tone: ${tone}
- Duration: ${duration}
- Language: ${targetLanguage}
- Include: Hook, introduction, main content, conclusion, CTA
- Format properly with sections
- Make it engaging and audience-focused

Write the complete script in ${targetLanguage}.`;

    try {
        const completion = await deepseek.chat.completions.create({
            messages: [
                { role: "system", content: systemPrompt },
                { role: "user", content: userPrompt },
            ],
            model: MODEL_NAME,
            temperature: 0.8,
            max_tokens: 1500,
        });

        const content = completion.choices[0]?.message?.content?.trim();

        if (!content) {
            throw new Error("No script generated");
        }

        return content;
    } catch (error) {
        console.error("DeepSeek API error:", error);
        throw new Error(
            error instanceof Error ? error.message : "Failed to generate script"
        );
    }
}

// YouTube Title Generator
export async function generateYouTubeTitles(
    topic: string,
    language: string
): Promise<string[]> {
    const targetLanguage = languageNames[language as keyof typeof languageNames] || "English";
    const systemPrompt = `You are a YouTube title expert. Create clickworthy, SEO-optimized titles that maximize views and CTR.

IMPORTANT: Write ONLY in ${targetLanguage}. Do not include any other language.`;

    const userPrompt = `Generate 10 YouTube video titles about: ${topic}

Requirements:
- Language: ${targetLanguage}
- Use power words, numbers, and curiosity gaps
- Each under 70 characters for full visibility
- Include keywords naturally
- Avoid clickbait, stay authentic
- Mix different formats (questions, lists, how-tos, etc.)
- Format: Return each title on a new line, numbered (1., 2., 3., etc.)

Write ONLY the numbered list, no explanations.`;

    try {
        const completion = await deepseek.chat.completions.create({
            messages: [
                { role: "system", content: systemPrompt },
                { role: "user", content: userPrompt },
            ],
            model: MODEL_NAME,
            temperature: 0.9,
            max_tokens: 600,
        });

        const content = completion.choices[0]?.message?.content?.trim();

        if (!content) {
            throw new Error("No titles generated");
        }

        const titles = content
            .split("\n")
            .filter((line) => line.trim())
            .map((line) => line.replace(/^\d+\.\s*/, "").trim())
            .filter((title) => title.length > 0);

        if (titles.length === 0) {
            throw new Error("Failed to parse titles");
        }

        return titles;
    } catch (error) {
        console.error("DeepSeek API error:", error);
        throw new Error(
            error instanceof Error ? error.message : "Failed to generate titles"
        );
    }
}

// YouTube Description Generator
export async function generateYouTubeDescription(
    topic: string,
    keywords: string,
    language: string
): Promise<string> {
    const targetLanguage = languageNames[language as keyof typeof languageNames] || "English";
    const systemPrompt = `You are a YouTube SEO expert. Create comprehensive video descriptions with summary, timestamps placeholder, keywords, and CTAs.

IMPORTANT: Write ONLY in ${targetLanguage}. Do not include any other language.`;

    const userPrompt = `Create a YouTube video description about: ${topic}

Requirements:
- Language: ${targetLanguage}
- Include keywords: ${keywords || "relevant keywords"}
- Structure: Brief summary, [timestamps section], keywords, social links section, CTAs
- Max 5000 characters, front-load important info
- Natural keyword integration
- Engaging and informative

Write the complete description in ${targetLanguage}.`;

    try {
        const completion = await deepseek.chat.completions.create({
            messages: [
                { role: "system", content: systemPrompt },
                { role: "user", content: userPrompt },
            ],
            model: MODEL_NAME,
            temperature: 0.8,
            max_tokens: 1000,
        });

        const content = completion.choices[0]?.message?.content?.trim();

        if (!content) {
            throw new Error("No description generated");
        }

        return content;
    } catch (error) {
        console.error("DeepSeek API error:", error);
        throw new Error(
            error instanceof Error ? error.message : "Failed to generate description"
        );
    }
}

// Reddit Post Generator
export async function generateRedditPost(
    topic: string,
    subreddit: string,
    tone: string,
    language: string
): Promise<{ title: string; content: string }> {
    const targetLanguage = languageNames[language as keyof typeof languageNames] || "English";
    const systemPrompt = `You are a Reddit community expert. Create authentic posts that fit each subreddit's culture, using appropriate formatting and tone.

IMPORTANT: Write ONLY in ${targetLanguage}. Do not include any other language.`;

    const userPrompt = `Create a Reddit post for ${subreddit} about: ${topic}

Requirements:
- Tone: ${tone}
- Language: ${targetLanguage}
- Adapt to subreddit culture
- Use Reddit markdown formatting
- Create engaging title and detailed content
- Be authentic, not promotional
- Return in format: "TITLE: [title]\n\nCONTENT: [content]"

Write everything in ${targetLanguage}.`;

    try {
        const completion = await deepseek.chat.completions.create({
            messages: [
                { role: "system", content: systemPrompt },
                { role: "user", content: userPrompt },
            ],
            model: MODEL_NAME,
            temperature: 0.8,
            max_tokens: 1000,
        });

        const content = completion.choices[0]?.message?.content?.trim();

        if (!content) {
            throw new Error("No post generated");
        }

        const titleMatch = content.match(/TITLE:\s*(.+?)(?:\n|$)/i);
        const contentMatch = content.match(/CONTENT:\s*([\s\S]+)/i);

        if (!titleMatch || !contentMatch) {
            throw new Error("Failed to parse post structure");
        }

        return {
            title: titleMatch[1].trim(),
            content: contentMatch[1].trim(),
        };
    } catch (error) {
        console.error("DeepSeek API error:", error);
        throw new Error(
            error instanceof Error ? error.message : "Failed to generate post"
        );
    }
}

// Reddit Comment Generator
export async function generateRedditComment(
    postContext: string,
    tone: string,
    language: string
): Promise<string> {
    const targetLanguage = languageNames[language as keyof typeof languageNames] || "English";
    const systemPrompt = `You are a thoughtful Reddit contributor. Create relevant, valuable comments that add to the discussion naturally.

IMPORTANT: Write ONLY in ${targetLanguage}. Do not include any other language.`;

    const userPrompt = `Create a Reddit comment responding to this post:
"${postContext}"

Requirements:
- Tone: ${tone}
- Language: ${targetLanguage}
- Be relevant and add value
- Natural conversational style
- Respectful and constructive
- 2-4 sentences typically
- No self-promotion

Write the comment in ${targetLanguage}.`;

    try {
        const completion = await deepseek.chat.completions.create({
            messages: [
                { role: "system", content: systemPrompt },
                { role: "user", content: userPrompt },
            ],
            model: MODEL_NAME,
            temperature: 0.8,
            max_tokens: 400,
        });

        const content = completion.choices[0]?.message?.content?.trim();

        if (!content) {
            throw new Error("No comment generated");
        }

        return content;
    } catch (error) {
        console.error("DeepSeek API error:", error);
        throw new Error(
            error instanceof Error ? error.message : "Failed to generate comment"
        );
    }
}

// Reddit AMA Question Generator
export async function generateRedditAMAQuestions(
    topic: string,
    language: string
): Promise<string[]> {
    const targetLanguage = languageNames[language as keyof typeof languageNames] || "English";
    const systemPrompt = `You are an expert at crafting thoughtful AMA (Ask Me Anything) questions. Create interesting, respectful questions that encourage detailed responses.

IMPORTANT: Write ONLY in ${targetLanguage}. Do not include any other language.`;

    const userPrompt = `Generate 8 AMA questions about: ${topic}

Requirements:
- Language: ${targetLanguage}
- Thought-provoking and specific
- Respectful and appropriate
- Varied topics and angles
- Encourage detailed answers
- Avoid yes/no questions
- Format: Return each question on a new line, numbered (1., 2., 3., etc.)

Write ONLY the numbered list, no explanations.`;

    try {
        const completion = await deepseek.chat.completions.create({
            messages: [
                { role: "system", content: systemPrompt },
                { role: "user", content: userPrompt },
            ],
            model: MODEL_NAME,
            temperature: 0.9,
            max_tokens: 600,
        });

        const content = completion.choices[0]?.message?.content?.trim();

        if (!content) {
            throw new Error("No questions generated");
        }

        const questions = content
            .split("\n")
            .filter((line) => line.trim())
            .map((line) => line.replace(/^\d+\.\s*/, "").trim())
            .filter((question) => question.length > 0);

        if (questions.length === 0) {
            throw new Error("Failed to parse questions");
        }

        return questions;
    } catch (error) {
        console.error("DeepSeek API error:", error);
        throw new Error(
            error instanceof Error ? error.message : "Failed to generate questions"
        );
    }
}

// Discord Server Announcement Generator
export async function generateDiscordAnnouncement(
    topic: string,
    tone: string,
    language: string
): Promise<string> {
    const targetLanguage = languageNames[language] || "English";

    const systemPrompt = `You are an expert Discord community manager who creates engaging server announcements. Generate announcements that:
- Use Discord markdown formatting (**, *, ~~, \`\`\`, ||, etc.)
- Include relevant emojis strategically
- Are clear and well-structured
- Match the requested tone
- Engage the community effectively
- Include @ mentions when appropriate (e.g., @everyone, @here)

Generate the announcement in ${targetLanguage}.`;

    const userPrompt = `Create a Discord server announcement about: ${topic}

Tone: ${tone}
Language: ${targetLanguage}

Generate an engaging announcement that uses Discord formatting and emojis effectively.`;

    try {
        const completion = await deepseek.chat.completions.create({
            model: MODEL_NAME,
            messages: [
                { role: "system", content: systemPrompt },
                { role: "user", content: userPrompt },
            ],
            max_tokens: 800,
            temperature: 0.8,
        });

        return completion.choices[0]?.message?.content?.trim() || "";
    } catch (error) {
        console.error("Error generating Discord announcement:", error);
        throw new Error("Failed to generate Discord announcement");
    }
}

// Discord Welcome Message Generator
export async function generateDiscordWelcome(
    serverName: string,
    tone: string,
    language: string
): Promise<string> {
    const targetLanguage = languageNames[language] || "English";

    const systemPrompt = `You are an expert at creating welcoming Discord messages. Generate welcome messages that:
- Make new members feel valued and welcomed
- Introduce the server's purpose briefly
- Use Discord markdown and emojis
- Encourage engagement
- Match the requested tone
- Include useful information (channels, rules, etc.)

Generate the welcome message in ${targetLanguage}.`;

    const userPrompt = `Create a Discord welcome message for the server: ${serverName}

Tone: ${tone}
Language: ${targetLanguage}

Generate a warm, welcoming message for new members.`;

    try {
        const completion = await deepseek.chat.completions.create({
            model: MODEL_NAME,
            messages: [
                { role: "system", content: systemPrompt },
                { role: "user", content: userPrompt },
            ],
            max_tokens: 600,
            temperature: 0.8,
        });

        return completion.choices[0]?.message?.content?.trim() || "";
    } catch (error) {
        console.error("Error generating Discord welcome message:", error);
        throw new Error("Failed to generate Discord welcome message");
    }
}

// Discord Event Description Generator
export async function generateDiscordEvent(
    eventName: string,
    eventDetails: string,
    tone: string,
    language: string
): Promise<string> {
    const targetLanguage = languageNames[language] || "English";

    const systemPrompt = `You are an expert at creating exciting Discord event descriptions. Generate descriptions that:
- Build excitement and anticipation
- Include all important details (date, time, requirements, prizes, etc.)
- Use Discord markdown formatting
- Include strategic emoji use
- Are well-organized and easy to read
- Encourage participation
- Match the requested tone

Generate the event description in ${targetLanguage}.`;

    const userPrompt = `Create a Discord event description for: ${eventName}

Event Details: ${eventDetails}
Tone: ${tone}
Language: ${targetLanguage}

Generate an exciting, detailed event description.`;

    try {
        const completion = await deepseek.chat.completions.create({
            model: MODEL_NAME,
            messages: [
                { role: "system", content: systemPrompt },
                { role: "user", content: userPrompt },
            ],
            max_tokens: 1000,
            temperature: 0.8,
        });

        return completion.choices[0]?.message?.content?.trim() || "";
    } catch (error) {
        console.error("Error generating Discord event description:", error);
        throw new Error("Failed to generate Discord event description");
    }
}

// Twitch Stream Title Generator
export async function generateTwitchStreamTitles(
    game: string,
    tone: string,
    language: string
): Promise<string[]> {
    const targetLanguage = languageNames[language] || "English";

    const systemPrompt = `You are an expert Twitch streamer who knows what titles get clicks. Generate stream titles that:
- Are attention-grabbing and clickworthy
- Follow Twitch best practices
- Use relevant keywords for the game/category
- Match the requested tone
- Are concise (under 140 characters)
- Stand out in the directory
- Encourage viewers to click

Generate 8 different title options in ${targetLanguage}.`;

    const userPrompt = `Generate Twitch stream titles for: ${game}

Tone: ${tone}
Language: ${targetLanguage}

Generate 8 different engaging stream title options. Return ONLY the titles, one per line, no numbering.`;

    try {
        const completion = await deepseek.chat.completions.create({
            model: MODEL_NAME,
            messages: [
                { role: "system", content: systemPrompt },
                { role: "user", content: userPrompt },
            ],
            max_tokens: 600,
            temperature: 0.9,
        });

        const content = completion.choices[0]?.message?.content?.trim() || "";
        return content
            .split("\n")
            .map((line) => line.replace(/^\d+\.\s*/, "").trim())
            .filter((line) => line.length > 0)
            .slice(0, 8);
    } catch (error) {
        console.error("Error generating Twitch stream titles:", error);
        throw new Error("Failed to generate Twitch stream titles");
    }
}

// Twitch Chat Command Response Generator
export async function generateTwitchCommand(
    commandName: string,
    purpose: string,
    tone: string,
    language: string
): Promise<string> {
    const targetLanguage = languageNames[language] || "English";

    const systemPrompt = `You are an expert at creating Twitch chat bot commands. Generate command responses that:
- Are concise (1-2 sentences maximum)
- Provide clear information
- Match the streamer's tone/brand
- Are appropriate for fast-moving chat
- Use relevant emojis sparingly
- Match the requested tone

Generate the command response in ${targetLanguage}.`;

    const userPrompt = `Create a Twitch chat command response for: ${commandName}

Purpose/Information: ${purpose}
Tone: ${tone}
Language: ${targetLanguage}

Generate a brief, informative command response suitable for Twitch chat.`;

    try {
        const completion = await deepseek.chat.completions.create({
            model: MODEL_NAME,
            messages: [
                { role: "system", content: systemPrompt },
                { role: "user", content: userPrompt },
            ],
            max_tokens: 300,
            temperature: 0.7,
        });

        return completion.choices[0]?.message?.content?.trim() || "";
    } catch (error) {
        console.error("Error generating Twitch command response:", error);
        throw new Error("Failed to generate Twitch command response");
    }
}

// Twitch Panel Description Generator
export async function generateTwitchPanel(
    panelType: string,
    content: string,
    language: string
): Promise<string> {
    const targetLanguage = languageNames[language] || "English";

    const systemPrompt = `You are an expert at creating professional Twitch channel panels. Generate panel descriptions that:
- Are well-formatted with Markdown
- Are visually appealing and easy to scan
- Include relevant information clearly
- Use emojis strategically for visual interest
- Are professional yet engaging
- Match Twitch's aesthetic

Generate the panel description in ${targetLanguage}.`;

    const userPrompt = `Create a Twitch panel description for: ${panelType}

Content to include: ${content}
Language: ${targetLanguage}

Generate a professional, well-formatted panel description.`;

    try {
        const completion = await deepseek.chat.completions.create({
            model: MODEL_NAME,
            messages: [
                { role: "system", content: systemPrompt },
                { role: "user", content: userPrompt },
            ],
            max_tokens: 800,
            temperature: 0.7,
        });

        return completion.choices[0]?.message?.content?.trim() || "";
    } catch (error) {
        console.error("Error generating Twitch panel description:", error);
        throw new Error("Failed to generate Twitch panel description");
    }
}

// Suno Lyric Generator
export async function generateSunoLyrics({
    theme,
    genre,
    mood,
    language,
}: {
    theme: string;
    genre: string;
    mood: string;
    language: string;
}): Promise<string> {
    const targetLanguage = languageNames[language] || "English";

    const systemPrompt = `You are an expert songwriter and lyricist. Create engaging song lyrics that:
- Follow a classic structure (Verse - Chorus - Verse - Bridge - Chorus - Outro)
- Have rhyming patterns that sound natural
- Tell a cohesive story or emotion
- Match the mood and genre requested
- Are memorable and singable
- Use vivid imagery and relatable themes

Generate the lyrics in ${targetLanguage}.`;

    const userPrompt = `Create song lyrics for:
- Theme: ${theme}
- Genre: ${genre}
- Mood: ${mood}
- Language: ${targetLanguage}

Structure the lyrics with clear sections:
[Verse 1]
...

[Chorus]
...

[Verse 2]
...

[Bridge]
...

[Chorus]
...

[Outro]
...

Make them creative, engaging, and suitable for music generation in Suno.`;

    try {
        const completion = await deepseek.chat.completions.create({
            model: MODEL_NAME,
            messages: [
                { role: "system", content: systemPrompt },
                { role: "user", content: userPrompt },
            ],
            max_tokens: 1000,
            temperature: 0.9,
        });

        return completion.choices[0]?.message?.content?.trim() || "";
    } catch (error) {
        console.error("Error generating Suno lyrics:", error);
        throw new Error("Failed to generate lyrics");
    }
}

// Suno Music Prompt Generator
export async function generateMusicPrompt({
    style,
    instruments,
    bpm,
    mood,
    language,
}: {
    style: string;
    instruments: string;
    bpm: string;
    mood: string;
    language: string;
}): Promise<string> {
    const targetLanguage = languageNames[language] || "English";

    const systemPrompt = `You are an expert music producer and prompt engineer for AI music generation. Create detailed, descriptive prompts that:
- Clearly describe the musical style and vibe
- Include specific instrumentation details
- Mention production techniques and effects
- Describe the emotional tone and mood
- Include tempo (BPM) information
- Are specific enough to guide AI generation
- Sound natural and musical

Generate the prompt in ${targetLanguage}.`;

    const userPrompt = `Create a detailed music prompt for Suno with these specifications:
- Style: ${style}
- Primary Instruments: ${instruments}
- Tempo: ${bpm} BPM
- Mood: ${mood}
- Language: ${targetLanguage}

Create a detailed prompt that describes exactly what the music should sound like. Include production details, emotional qualities, and specific instrumentation. The prompt should be descriptive yet concise (2-3 sentences).`;

    try {
        const completion = await deepseek.chat.completions.create({
            model: MODEL_NAME,
            messages: [
                { role: "system", content: systemPrompt },
                { role: "user", content: userPrompt },
            ],
            max_tokens: 500,
            temperature: 0.85,
        });

        return completion.choices[0]?.message?.content?.trim() || "";
    } catch (error) {
        console.error("Error generating music prompt:", error);
        throw new Error("Failed to generate music prompt");
    }
}

// Suno Song Description Generator
export async function generateSongDescription({
    theme,
    genre,
    mood,
    platform,
    language,
}: {
    theme: string;
    genre: string;
    mood: string;
    platform: string;
    language: string;
}): Promise<string[]> {
    const targetLanguage = languageNames[language] || "English";

    const systemPrompt = `You are an expert at writing compelling song descriptions for music platforms. Create catchy, engaging descriptions that:
- Capture the essence of the song
- Appeal to the target audience
- Include relevant keywords for discoverability
- Are optimized for the specific platform
- Use emojis naturally (where appropriate)
- Are concise but memorable
- Encourage sharing and engagement

Generate descriptions in ${targetLanguage}.`;

    const userPrompt = `Create 3 different song descriptions for a ${genre} song with these details:
- Theme: ${theme}
- Mood: ${mood}
- Platform: ${platform}
- Language: ${targetLanguage}

For ${platform}, write descriptions that:
1. First description (140-160 characters for ${platform === "twitter" ? "Twitter" : platform === "instagram" ? "Instagram captions" : "Spotify"})
2. Second description (longer, 300-350 characters for detailed version)
3. Third description (creative/engaging version with emojis)

Return exactly 3 descriptions, one per line, separated by clear markers.`;

    try {
        const completion = await deepseek.chat.completions.create({
            model: MODEL_NAME,
            messages: [
                { role: "system", content: systemPrompt },
                { role: "user", content: userPrompt },
            ],
            max_tokens: 800,
            temperature: 0.8,
        });

        const content = completion.choices[0]?.message?.content?.trim() || "";
        // Parse descriptions - split by new lines and filter empty ones
        const descriptions = content
            .split("\n")
            .filter((line: string) => line.trim().length > 0)
            .slice(0, 3);

        return descriptions.length > 0
            ? descriptions
            : ["Your song", "Amazing music", "Check it out"];
    } catch (error) {
        console.error("Error generating song description:", error);
        throw new Error("Failed to generate song description");
    }
}

// ==================== ElevenLabs Tools ====================

export async function generateVoiceScript({
    topic,
    style,
    duration,
    language,
}: {
    topic: string;
    style: string;
    duration: string;
    language: string;
}): Promise<string> {
    const targetLanguage = languageNames[language] || "English";

    const systemPrompt = `You are an expert AI voice script writer for ElevenLabs. Create scripts optimized for text-to-speech with:
- Natural pauses using [pause: Xs] tags
- Emphasis markers using [emphasis] tags
- Emotional cues like [enthusiastically], [calmly], [whisper]
- Proper pacing and rhythm
- Clear pronunciation guides for complex words
- Engaging, conversational flow
- Appropriate tone and style

Generate scripts in ${targetLanguage}.`;

    const userPrompt = `Create a ${style} voice script about: ${topic}

Duration: ${duration}
Style: ${style}
Language: ${targetLanguage}

Use these ElevenLabs voice tags:
- [pause: 0.5s] - Short pause
- [pause: 1s] - Medium pause
- [pause: 2s] - Long pause
- [emphasis] - Emphasize word/phrase
- [whisper] - Whisper effect
- [enthusiastically] - Enthusiastic tone
- [calmly] - Calm tone
- [dramatically] - Dramatic tone

Make it engaging and natural for AI voice generation.`;

    try {
        const completion = await deepseek.chat.completions.create({
            model: MODEL_NAME,
            messages: [
                { role: "system", content: systemPrompt },
                { role: "user", content: userPrompt },
            ],
            max_tokens: 1200,
            temperature: 0.8,
        });

        return completion.choices[0]?.message?.content?.trim() || "";
    } catch (error) {
        console.error("Error generating voice script:", error);
        throw new Error("Failed to generate voice script");
    }
}

export async function generateVideoVoiceoverScript({
    topic,
    videoType,
    duration,
    tone,
    language,
}: {
    topic: string;
    videoType: string;
    duration: string;
    tone: string;
    language: string;
}): Promise<string> {
    const targetLanguage = languageNames[language] || "English";

    const systemPrompt = `You are an expert video voiceover scriptwriter for ElevenLabs. Create scripts that:
- Match the video type and platform
- Include timing markers
- Have clear scene transitions
- Use appropriate pacing
- Include voice direction tags
- Are optimized for AI voice generation
- Engage viewers immediately
- Match the specified tone

Generate scripts in ${targetLanguage}.`;

    const userPrompt = `Create a voiceover script for a ${videoType} video about: ${topic}

Video Type: ${videoType}
Duration: ${duration}
Tone: ${tone}
Language: ${targetLanguage}

Include:
- [0:00] Timing markers every few seconds
- [pause: Xs] for natural pauses
- Scene descriptions in parentheses
- Emphasis tags for important words
- Natural, conversational flow

Make it platform-appropriate for ${videoType}.`;

    try {
        const completion = await deepseek.chat.completions.create({
            model: MODEL_NAME,
            messages: [
                { role: "system", content: systemPrompt },
                { role: "user", content: userPrompt },
            ],
            max_tokens: 1500,
            temperature: 0.8,
        });

        return completion.choices[0]?.message?.content?.trim() || "";
    } catch (error) {
        console.error("Error generating video voiceover script:", error);
        throw new Error("Failed to generate video voiceover script");
    }
}

export async function formatTextForVoice({
    text,
    language,
}: {
    text: string;
    language: string;
}): Promise<string> {
    const targetLanguage = languageNames[language] || "English";

    const systemPrompt = `You are an expert at optimizing text for AI voice generation with ElevenLabs. Your job is to:
- Add natural pauses where needed
- Mark emphasis on important words
- Add emotional/tonal cues
- Fix awkward phrasing for speech
- Add pronunciation guides for complex words
- Improve flow and rhythm
- Make text sound natural when read aloud
- Remove elements that don't work in voice (like URLs, special characters)

Use these tags:
- [pause: 0.5s], [pause: 1s], [pause: 2s]
- [emphasis] for important words
- [calmly], [enthusiastically], [whisper], [dramatically]

Output in ${targetLanguage}.`;

    const userPrompt = `Format this text to be voice-friendly for ElevenLabs text-to-speech:

${text}

Add appropriate pauses, emphasis, and emotional cues. Fix any awkward phrasing. Make it sound natural when read by an AI voice.`;

    try {
        const completion = await deepseek.chat.completions.create({
            model: MODEL_NAME,
            messages: [
                { role: "system", content: systemPrompt },
                { role: "user", content: userPrompt },
            ],
            max_tokens: 1500,
            temperature: 0.7,
        });

        return completion.choices[0]?.message?.content?.trim() || "";
    } catch (error) {
        console.error("Error formatting text for voice:", error);
        throw new Error("Failed to format text for voice");
    }
}

// Podcast Episode Script Generator
export async function generatePodcastScript({
    topic,
    format,
    duration,
    segments,
    tone,
    language,
}: {
    topic: string;
    format: string;
    duration: string;
    segments: string;
    tone: string;
    language: string;
}): Promise<string> {
    const targetLanguage = languageNames[language] || "English";

    const systemPrompt = `You are an expert podcast scriptwriter for ElevenLabs. Create structured, engaging podcast scripts that:
- Match the podcast format (monologue, interview, co-hosts, narrative)
- Include clear segments with transitions
- Have timing markers [0:00], [5:30], etc.
- Include pauses for music/ads: [music break], [ad break]
- Use natural, conversational language
- Include emotional/tonal cues
- Have strong intro hooks and outros
- Include strategic CTAs

Generate scripts in ${targetLanguage}.`;

    const userPrompt = `Create a podcast episode script about: ${topic}

Format: ${format}
Duration: ${duration}
Number of segments: ${segments}
Tone: ${tone}
Language: ${targetLanguage}

Structure:
1. [0:00] Intro - Hook listeners in first 15 seconds
2. Main segments (${segments} segments with smooth transitions)
3. [music break] or [ad break] markers where appropriate
4. Outro - Recap and CTA

Include:
- Timing markers every ~2-5 minutes
- [pause: Xs] for natural pauses
- [enthusiastically], [calmly], [whisper] for emotional tone
- [music break], [ad break] for production
- Conversational, engaging language
- Questions to audience if format allows
- Clear segment transitions

Make it sound natural and engaging for ${format} format.`;

    try {
        const completion = await deepseek.chat.completions.create({
            model: MODEL_NAME,
            messages: [
                { role: "system", content: systemPrompt },
                { role: "user", content: userPrompt },
            ],
            max_tokens: 2000,
            temperature: 0.8,
        });

        return completion.choices[0]?.message?.content?.trim() || "";
    } catch (error) {
        console.error("Error generating podcast script:", error);
        throw new Error("Failed to generate podcast script");
    }
}

// Ad/Commercial Script Generator
export async function generateAdScript({
    product,
    duration,
    style,
    cta,
    audience,
    language,
}: {
    product: string;
    duration: string;
    style: string;
    cta: string;
    audience: string;
    language: string;
}): Promise<string> {
    const targetLanguage = languageNames[language] || "English";

    const systemPrompt = `You are an expert commercial/ad copywriter for ElevenLabs. Create persuasive, engaging ad scripts that:
- Grab attention in the first 3 seconds
- Highlight key benefits clearly
- Include compelling CTAs
- Match the ad style and duration
- Use voice direction tags for optimal delivery
- Are optimized for AI voice generation
- Create urgency when appropriate
- Sound natural and conversational

Generate scripts in ${targetLanguage}.`;

    const userPrompt = `Create an ad/commercial script for: ${product}

Duration: ${duration}
Style: ${style}
CTA: ${cta || "Visit our website"}
Target Audience: ${audience || "General"}
Language: ${targetLanguage}

Structure based on duration:
- 15s: Hook (3s) + Benefit (8s) + CTA (4s)
- 30s: Hook (5s) + Problem/Solution (15s) + Benefits (5s) + CTA (5s)
- 60s: Hook (8s) + Story/Problem (20s) + Solution (15s) + Benefits (10s) + CTA (7s)

Include:
- [0:00], [0:05], [0:15] timing markers
- [pause: 0.5s] for emphasis
- [enthusiastically], [urgently], [warmly] for tone
- [emphasis] on key words (product name, benefits, CTA)
- Power words that drive action
- Clear, memorable CTA (repeat if 60s)

Style guidelines:
- Informative: Educational, fact-based, trustworthy
- Emotional: Story-driven, relatable, heartfelt
- Urgent: Time-sensitive, FOMO, action-driven
- Fun: Playful, entertaining, memorable

Make it compelling and conversion-focused.`;

    try {
        const completion = await deepseek.chat.completions.create({
            model: MODEL_NAME,
            messages: [
                { role: "system", content: systemPrompt },
                { role: "user", content: userPrompt },
            ],
            max_tokens: 1000,
            temperature: 0.8,
        });

        return completion.choices[0]?.message?.content?.trim() || "";
    } catch (error) {
        console.error("Error generating ad script:", error);
        throw new Error("Failed to generate ad script");
    }
}

// Audiobook Chapter Optimizer
export async function optimizeAudiobookChapter({
    text,
    genre,
    narrative,
    language,
}: {
    text: string;
    genre: string;
    narrative: string;
    language: string;
}): Promise<string> {
    const targetLanguage = languageNames[language] || "English";

    const systemPrompt = `You are an expert audiobook editor for ElevenLabs. Optimize text for audiobook narration by:
- Adding natural pauses at sentence/paragraph breaks
- Marking dialogue with character tags: [Character Name]
- Adding emotional/tonal cues for narration
- Fixing awkward phrasing that sounds weird when read aloud
- Adding pronunciation guides for complex words
- Creating dramatic pauses for effect
- Improving pacing and rhythm
- Making descriptions more vivid for audio-only
- Adding breath marks for long sentences

Preserve the original content - only add voice optimization tags and minor phrasing improvements.

Output in ${targetLanguage}.`;

    const userPrompt = `Optimize this audiobook text for ElevenLabs narration:

Genre: ${genre}
Narrative: ${narrative}
Language: ${targetLanguage}

TEXT:
${text}

Add:
- [pause: 0.5s], [pause: 1s], [pause: 2s] at appropriate breaks
- [Character Name] before dialogue lines
- [whisper], [dramatically], [tenderly], [urgently] for emotional scenes
- [emphasis] on important words/phrases
- (pronunciation: word = "phonetic") for complex names/terms
- Improve pacing for audio listening

Genre-specific tips:
- Fiction: Emphasize dramatic moments, character emotions
- Non-fiction: Clear explanations, natural teaching tone
- Children's: Animated, expressive, clear pronunciation
- Technical: Slow pacing, emphasis on key terms
- Thriller: Build tension with pauses, urgent tone
- Romance: Tender, emotional, intimate tone

Keep the original text intact - only add optimization tags and minor improvements for audio.`;

    try {
        const completion = await deepseek.chat.completions.create({
            model: MODEL_NAME,
            messages: [
                { role: "system", content: systemPrompt },
                { role: "user", content: userPrompt },
            ],
            max_tokens: 2000,
            temperature: 0.7,
        });

        return completion.choices[0]?.message?.content?.trim() || "";
    } catch (error) {
        console.error("Error optimizing audiobook chapter:", error);
        throw new Error("Failed to optimize audiobook chapter");
    }
}

// LinkedIn Post Generator
export async function generateLinkedInPost({
    topic,
    tone,
    language,
}: {
    topic: string;
    tone: string;
    language: string;
}): Promise<string> {
    const targetLanguage = languageNames[language] || "English";

    const systemPrompt = `You are a LinkedIn content expert. Create engaging, professional posts that:
- Hook the reader in the first line
- Provide value or insight
- Use appropriate formatting (bullet points, spacing)
- Encourage engagement (questions, call to action)
- Include 3-5 relevant hashtags at the end
- Maintain a ${tone} tone

IMPORTANT: Write ONLY in ${targetLanguage}. Do not include any other language.`;

    const userPrompt = `Create a LinkedIn post about: ${topic}

Requirements:
- Language: ${targetLanguage}
- Tone: ${tone}
- Structure: Hook -> Value/Story -> Takeaway -> Call to Action
- Use line breaks for readability
- Include relevant emojis (but don't overdo it)
- Add hashtags at the end

Write ONLY the post content.`;

    try {
        const completion = await deepseek.chat.completions.create({
            messages: [
                { role: "system", content: systemPrompt },
                { role: "user", content: userPrompt },
            ],
            model: MODEL_NAME,
            temperature: 0.7,
            max_tokens: 600,
        });

        const post = completion.choices[0]?.message?.content?.trim();

        if (!post) {
            throw new Error("No post generated");
        }

        return post;
    } catch (error) {
        console.error("DeepSeek API error:", error);
        throw new Error(
            error instanceof Error ? error.message : "Failed to generate post"
        );
    }
}

// LinkedIn Headline Generator
export async function generateLinkedInHeadline({
    role,
    industry,
    keywords,
    language,
}: {
    role: string;
    industry: string;
    keywords?: string;
    language: string;
}): Promise<string[]> {
    const targetLanguage = languageNames[language] || "English";
    const keywordsPart = keywords ? `Keywords to include: ${keywords}` : "";

    const systemPrompt = `You are a LinkedIn profile optimization expert. Generate professional headlines that:
- Are catchy and memorable
- Highlight value proposition
- Use keywords effectively for SEO
- Are under 220 characters
- Stand out in search results

IMPORTANT: Write ONLY in ${targetLanguage}. Do not include any other language.`;

    const userPrompt = `Generate 5 LinkedIn headlines for a ${role} in ${industry}.
${keywordsPart}

Requirements:
- Language: ${targetLanguage}
- Provide 5 distinct options (e.g., direct, creative, results-oriented)
- Use separators like | or • if needed
- Format: Return each headline on a new line, numbered (1., 2., etc.)

Write ONLY the numbered list of headlines.`;

    try {
        const completion = await deepseek.chat.completions.create({
            messages: [
                { role: "system", content: systemPrompt },
                { role: "user", content: userPrompt },
            ],
            model: MODEL_NAME,
            temperature: 0.8,
            max_tokens: 400,
        });

        const content = completion.choices[0]?.message?.content?.trim();

        if (!content) {
            throw new Error("No headlines generated");
        }

        const headlines = content
            .split("\n")
            .filter((line) => line.trim())
            .map((line) => line.replace(/^\d+\.\s*/, "").trim())
            .filter((h) => h.length > 0);

        return headlines;
    } catch (error) {
        console.error("DeepSeek API error:", error);
        throw new Error(
            error instanceof Error ? error.message : "Failed to generate headlines"
        );
    }
}

// LinkedIn About Generator
export async function generateLinkedInAbout({
    role,
    experience,
    skills,
    achievements,
    language,
}: {
    role: string;
    experience: string;
    skills: string;
    achievements?: string;
    language: string;
}): Promise<string> {
    const targetLanguage = languageNames[language] || "English";
    const achievementsPart = achievements ? `Key achievements: ${achievements}` : "";

    const systemPrompt = `You are a professional bio writer. Write a compelling LinkedIn "About" section that:
- Tells a professional story
- Highlights expertise and passion
- Includes key skills naturally
- Is engaging and easy to read (use short paragraphs)
- Ends with a call to action (e.g., "Let's connect")
- Is written in the first person ("I")

IMPORTANT: Write ONLY in ${targetLanguage}. Do not include any other language.`;

    const userPrompt = `Write a LinkedIn About section for a ${role} with ${experience} years of experience.
Key skills: ${skills}
${achievementsPart}

Requirements:
- Language: ${targetLanguage}
- Tone: Professional yet approachable
- Structure: Hook -> Background/Experience -> Skills/Achievements -> What drives me -> Call to Action
- Use proper spacing

Write ONLY the About section text.`;

    try {
        const completion = await deepseek.chat.completions.create({
            messages: [
                { role: "system", content: systemPrompt },
                { role: "user", content: userPrompt },
            ],
            model: MODEL_NAME,
            temperature: 0.7,
            max_tokens: 800,
        });

        const about = completion.choices[0]?.message?.content?.trim();

        if (!about) {
            throw new Error("No about section generated");
        }

        return about;
    } catch (error) {
        console.error("DeepSeek API error:", error);
        throw new Error(
            error instanceof Error ? error.message : "Failed to generate about section"
        );
    }
}

// Custom Tool Content Generator
export async function generateCustomToolContent({
    promptTemplate,
    inputs
}: {
    promptTemplate: string;
    inputs: Record<string, any>;
}): Promise<string> {
    // 1. Interpolate inputs into prompt
    let finalPrompt = promptTemplate;
    for (const [key, value] of Object.entries(inputs)) {
        // Replace {{key}} with value
        finalPrompt = finalPrompt.replace(new RegExp(`{{${key}}}`, 'g'), String(value));
    }

    // 2. Call DeepSeek
    try {
        const completion = await deepseek.chat.completions.create({
            messages: [
                { role: "system", content: "You are a helpful AI assistant. Follow the user's instructions precisely." },
                { role: "user", content: finalPrompt },
            ],
            model: MODEL_NAME,
            temperature: 0.8,
            max_tokens: 1000,
        });

        const content = completion.choices[0]?.message?.content?.trim();

        if (!content) {
            throw new Error("No content generated");
        }

        return content;
    } catch (error) {
        console.error("DeepSeek API error:", error);
        throw new Error(
            error instanceof Error ? error.message : "Failed to generate content"
        );
    }
}

// Amazon Product Description Generator
export async function generateAmazonProductDescription({
    productName,
    features,
    tone,
    targetAudience,
    language,
}: {
    productName: string;
    features: string;
    tone: string;
    targetAudience: string;
    language: string;
}): Promise<string> {
    const targetLanguage = languageNames[language] || "English";

    const systemPrompt = `You are an expert Amazon copywriter. Create high-converting product descriptions that:
- Use persuasive language and psychological triggers
- Highlight benefits over features
- Are optimized for Amazon SEO (keywords)
- Use bullet points for readability
- Address potential objections
- Match the requested tone and target audience

Structure:
1. Catchy Headline
2. 5 Key Benefit Bullet Points (Feature -> Benefit)
3. Detailed Product Description (Paragraphs)
4. Technical Specifications (if applicable)

IMPORTANT: Write ONLY in ${targetLanguage}. Do not include any other language.`;

    const userPrompt = `Create an Amazon product description for: ${productName}

Key Features: ${features}
Target Audience: ${targetAudience}
Tone: ${tone}
Language: ${targetLanguage}

Generate a complete, formatted description ready to copy and paste.`;

    try {
        const completion = await deepseek.chat.completions.create({
            messages: [
                { role: "system", content: systemPrompt },
                { role: "user", content: userPrompt },
            ],
            model: MODEL_NAME,
            temperature: 0.8,
            max_tokens: 1000,
        });

        const content = completion.choices[0]?.message?.content?.trim();

        if (!content) {
            throw new Error("No description generated");
        }

        return content;
    } catch (error) {
        console.error("DeepSeek API error:", error);
        throw new Error(
            error instanceof Error ? error.message : "Failed to generate description"
        );
    }
}

// Nueva función para generar captions de TikTok
export async function generateTikTokCaption({
    topic,
    tone,
    language,
}: {
    topic: string;
    tone: string;
    language: string;
}): Promise<string> {
    const targetLanguage = languageNames[language] || "English";

    const systemPrompt = `You are an expert social media manager specializing in TikTok.
Create an engaging, viral-worthy TikTok caption about the user's topic.

Requirements:
- Write in a ${tone} tone
- Use relevant emojis
- Include 3-5 relevant hashtags at the end
- Keep it concise and readable
- Encourage engagement (questions, call to action)
- Write ONLY in ${targetLanguage}

Return ONLY the caption text.`;

    const userPrompt = `Write a post about ${topic}`;

    try {
        const completion = await deepseek.chat.completions.create({
            messages: [
                { role: "system", content: systemPrompt },
                { role: "user", content: userPrompt },
            ],
            model: MODEL_NAME,
            temperature: 0.9,
            max_tokens: 300,
        });

        const caption = completion.choices[0]?.message?.content?.trim();

        if (!caption) {
            throw new Error("No caption generated");
        }

        return caption;
    } catch (error) {
        console.error("DeepSeek API error:", error);
        throw new Error(
            error instanceof Error ? error.message : "Failed to generate caption"
        );
    }
}

// Amazon Product Review Generator
export async function generateAmazonProductReview({
    productName,
    features,
    rating,
    tone,
    language,
}: {
    productName: string;
    features: string;
    rating: string;
    tone: string;
    language: string;
}): Promise<string> {
    const targetLanguage = languageNames[language] || "English";

    const systemPrompt = `You are an expert product reviewer. Write a detailed, authentic, and helpful product review for Amazon.
- Base the review on the provided product name and features.
- Reflect the rating given (${rating}/5 stars).
- Use a ${tone} tone.
- Include pros and cons if appropriate for the rating.
- Make it sound like a real user experience.
- Write ONLY in ${targetLanguage}.`;

    const userPrompt = `Product: ${productName}
Features: ${features}
Rating: ${rating} Stars
Tone: ${tone}
Language: ${targetLanguage}

Write a comprehensive review.`;

    try {
        const completion = await deepseek.chat.completions.create({
            messages: [
                { role: "system", content: systemPrompt },
                { role: "user", content: userPrompt },
            ],
            model: MODEL_NAME,
            temperature: 0.8,
            max_tokens: 600,
        });

        const review = completion.choices[0]?.message?.content?.trim();

        if (!review) {
            throw new Error("No review generated");
        }

        return review;
    } catch (error) {
        console.error("DeepSeek API error:", error);
        throw new Error(
            error instanceof Error ? error.message : "Failed to generate review"
        );
    }
}

// Amazon Product Comparison Generator
export async function generateAmazonProductComparison({
    productA,
    productB,
    criteria,
    tone,
    language,
}: {
    productA: string;
    productB: string;
    criteria: string;
    tone: string;
    language: string;
}): Promise<string> {
    const targetLanguage = languageNames[language] || "English";

    const systemPrompt = `You are a product comparison expert. Create a detailed comparison between two products.
- Compare ${productA} vs ${productB}.
- Focus on these criteria: ${criteria || "Key features, performance, price value, pros and cons"}.
- Use a ${tone} tone.
- Be objective and helpful for a buyer deciding between the two.
- Structure with clear headings or bullet points.
- Write ONLY in ${targetLanguage}.`;

    const userPrompt = `Compare: ${productA} vs ${productB}
Criteria: ${criteria}
Tone: ${tone}
Language: ${targetLanguage}

Write a detailed comparison.`;

    try {
        const completion = await deepseek.chat.completions.create({
            messages: [
                { role: "system", content: systemPrompt },
                { role: "user", content: userPrompt },
            ],
            model: MODEL_NAME,
            temperature: 0.8,
            max_tokens: 800,
        });

        const comparison = completion.choices[0]?.message?.content?.trim();

        if (!comparison) {
            throw new Error("No comparison generated");
        }

        return comparison;
    } catch (error) {
        console.error("DeepSeek API error:", error);
        throw new Error(
            error instanceof Error ? error.message : "Failed to generate comparison"
        );
    }
}

// Twitch Bio Generator
export async function generateTwitchBio({
    description,
    tone,
    language,
}: {
    description: string;
    tone: string;
    language: string;
}): Promise<string[]> {
    const targetLanguage = languageNames[language] || "English";

    const systemPrompt = `You are a Twitch profile expert. Create engaging "About Me" bios that:
- Are concise (under 300 characters)
- Show personality and gaming style
- Include relevant emojis
- Are formatted for easy reading
- Match the requested tone
- Encourage viewers to follow

Generate 5 different bio options in ${targetLanguage}.`;

    const userPrompt = `Create Twitch bios for a streamer who describes themselves as: "${description}"

Tone: ${tone}
Language: ${targetLanguage}

Generate 5 different bio options. Return ONLY the bios, one per line, numbered (1., 2., etc.).`;

    try {
        const completion = await deepseek.chat.completions.create({
            model: MODEL_NAME,
            messages: [
                { role: "system", content: systemPrompt },
                { role: "user", content: userPrompt },
            ],
            max_tokens: 600,
            temperature: 0.9,
        });

        const content = completion.choices[0]?.message?.content?.trim() || "";
        return content
            .split("\n")
            .map((line) => line.replace(/^\d+\.\s*/, "").trim())
            .filter((line) => line.length > 0)
            .slice(0, 5);
    } catch (error) {
        console.error("Error generating Twitch bios:", error);
        throw new Error("Failed to generate Twitch bios");
    }
}

// Twitch Rules Generator
export async function generateTwitchRules({
    context,
    tone,
    language,
}: {
    context: string;
    tone: string;
    language: string;
}): Promise<string[]> {
    const targetLanguage = languageNames[language] || "English";

    const systemPrompt = `You are a Twitch community manager. Create clear, effective chat rules that:
- Set clear boundaries
- Are easy to understand
- Match the channel's tone
- Cover common issues (spam, hate speech, links, etc.)
- Use positive framing where possible

Generate a list of 7-10 standard rules in ${targetLanguage}.`;

    const userPrompt = `Generate Twitch chat rules.
Context/Specifics: ${context || "Standard gaming channel rules"}
Tone: ${tone}
Language: ${targetLanguage}

Generate a numbered list of rules. Return ONLY the rules, one per line.`;

    try {
        const completion = await deepseek.chat.completions.create({
            model: MODEL_NAME,
            messages: [
                { role: "system", content: systemPrompt },
                { role: "user", content: userPrompt },
            ],
            max_tokens: 600,
            temperature: 0.8,
        });

        const content = completion.choices[0]?.message?.content?.trim() || "";
        return content
            .split("\n")
            .map((line) => line.replace(/^\d+\.\s*/, "").trim())
            .filter((line) => line.length > 0);
    } catch (error) {
        console.error("Error generating Twitch rules:", error);
        throw new Error("Failed to generate Twitch rules");
    }
}

// Twitch Stream Plan Generator
export async function generateTwitchStreamPlan({
    activity,
    duration,
    tone,
    language,
}: {
    activity: string;
    duration: string;
    tone: string;
    language: string;
}): Promise<string> {
    const targetLanguage = languageNames[language] || "English";

    const systemPrompt = `You are a professional Twitch stream producer. Create a detailed run-of-show (stream plan) that:
- Breaks down the stream into logical segments (Intro, Gameplay, Intermission, Outro, etc.)
- Assigns estimated durations to each segment
- Includes engagement ideas for each segment
- Matches the total duration requested
- Is formatted clearly with timestamps or duration markers

Generate the plan in ${targetLanguage}.`;

    const userPrompt = `Create a stream plan for:
Activity/Game: ${activity}
Total Duration: ${duration}
Tone: ${tone}
Language: ${targetLanguage}

Format the plan clearly with segments, times, and notes.`;

    try {
        const completion = await deepseek.chat.completions.create({
            model: MODEL_NAME,
            messages: [
                { role: "system", content: systemPrompt },
                { role: "user", content: userPrompt },
            ],
            max_tokens: 1000,
            temperature: 0.8,
        });

        return completion.choices[0]?.message?.content?.trim() || "";
    } catch (error) {
        console.error("Error generating Twitch stream plan:", error);
        throw new Error("Failed to generate Twitch stream plan");
    }
}
