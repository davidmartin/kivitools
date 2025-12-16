#!/usr/bin/env node

/**
 * Script to add Suno blog posts to blog-data.ts
 * Run: node scripts/add-suno-blog-posts.mjs
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const blogDataPath = path.join(__dirname, '..', 'lib', 'blog-data.ts');

// Read the current file
let content = fs.readFileSync(blogDataPath, 'utf-8');

// Check if posts already exist
if (content.includes('suno-style-blender-guide-2025')) {
  console.log('✅ Suno blog posts already exist. Skipping.');
  process.exit(0);
}

// New blog posts for Suno tools
const newPosts = `
  // ===== SUNO NEW TOOLS POSTS =====
  {
    slug: "suno-style-blender-guide-2025",
    title: "How to Create Unique Genre Mashups with Suno AI: Style Blender Guide",
    excerpt: "Learn how to blend multiple music genres into something Spotify's algorithms couldn't predict. From Jazz-Trap to Classical-EDM, create sounds nobody's heard before.",
    date: "2025-12-16",
    author: "KiviTools Team",
    readTime: 7,
    platform: "suno",
    language: "en",
    keywords: ["suno genre blend", "music style mixer", "ai genre fusion", "suno prompts", "hybrid music genres"],
    tags: ["Suno", "AI Music", "Genre Fusion", "Music Production", "Style Blender"],
    relatedTool: {
      name: "Style Blender",
      link: "/suno/style-blender",
      cta: "Blend Your Genres Free"
    },
    secondaryTools: [
      { name: "Hook Generator", link: "/suno/hook-generator", cta: "Create Catchy Hooks" },
      { name: "Song Structure", link: "/suno/song-structure", cta: "Build Song Structure" },
      { name: "Prompt Generator", link: "/suno/prompt-generator", cta: "Generate Prompts" }
    ],
    content: \`
      <article class="prose prose-lg prose-invert max-w-none">
        <p class="lead text-xl text-muted-foreground mb-8">
          What happens when you mix Jazz with Trap? Classical with EDM? Folk with Dubstep? With Suno AI and the right prompts, you create sounds that never existed before. The <strong>Style Blender</strong> helps you do exactly that.
        </p>

        <h2 class="text-3xl font-bold mt-12 mb-6 text-foreground">Why Genre Blending Works So Well in Suno</h2>
        <p class="mb-6">Suno AI excels at understanding musical elements from different genres and combining them coherently. When you describe a blend properly, Suno:</p>
        <ul class="list-disc pl-6 mb-6 space-y-2">
          <li>Borrows production techniques from one genre</li>
          <li>Uses instrumental choices from another</li>
          <li>Applies rhythm patterns that bridge both styles</li>
          <li>Creates something genuinely new</li>
        </ul>

        <h2 class="text-3xl font-bold mt-12 mb-6 text-foreground">Winning Genre Combinations</h2>
        
        <h3 class="text-2xl font-bold mt-8 mb-4 text-foreground">1. Jazz + Trap = "Trap Jazz"</h3>
        <p class="mb-6">Saxophone over 808s, complex chord progressions with hard-hitting drums. Artists like Masego have proven this works.</p>

        <h3 class="text-2xl font-bold mt-8 mb-4 text-foreground">2. Classical + Electronic = "Orchestral EDM"</h3>
        <p class="mb-6">Think Two Steps from Hell meets Deadmau5. Epic builds with symphonic elements.</p>

        <h3 class="text-2xl font-bold mt-8 mb-4 text-foreground">3. Country + Hip-Hop = "Country Trap"</h3>
        <p class="mb-6">Old Town Road proved this can go viral. Banjos meet 808s.</p>

        <h3 class="text-2xl font-bold mt-8 mb-4 text-foreground">4. K-Pop + Latin = "K-Latin Pop"</h3>
        <p class="mb-6">Reggaeton rhythms with K-Pop production polish. The future of pop.</p>

        <div class="bg-purple-500/10 p-8 rounded-2xl border border-purple-500/20 my-8">
          <h3 class="text-xl font-bold mb-4">Try the Style Blender Now</h3>
          <p class="mb-4">Enter your genres, pick a mood, and get a Suno-ready prompt for your unique blend.</p>
          <a href="/suno/style-blender" class="inline-block bg-purple-500 text-white px-6 py-3 rounded-full font-bold hover:bg-purple-600 transition-colors">
            Blend Your Genres Free
          </a>
        </div>

        <h2 class="text-3xl font-bold mt-12 mb-6 text-foreground">How to Write Blend Prompts for Suno</h2>
        <p class="mb-6">The key is describing WHICH elements come from which genre:</p>
        <ul class="list-disc pl-6 mb-6 space-y-2">
          <li><strong>Rhythm from:</strong> "Latin percussion patterns"</li>
          <li><strong>Melody from:</strong> "Jazz-influenced chord progressions"</li>
          <li><strong>Production from:</strong> "Modern pop polish"</li>
          <li><strong>Instruments from:</strong> "Classical strings"</li>
        </ul>

        <h2 class="text-3xl font-bold mt-12 mb-6 text-foreground">Complete Your Suno Workflow</h2>
        <div class="grid md:grid-cols-3 gap-4 my-8">
          <a href="/suno/style-blender" class="block bg-surface p-4 rounded-xl border border-border hover:border-purple-500/50 transition-colors">
            <p class="font-semibold">Style Blender</p>
            <p class="text-sm text-muted-foreground">Mix genres into unique sounds</p>
          </a>
          <a href="/suno/hook-generator" class="block bg-surface p-4 rounded-xl border border-border hover:border-purple-500/50 transition-colors">
            <p class="font-semibold">Hook Generator</p>
            <p class="text-sm text-muted-foreground">Create earworm melodies</p>
          </a>
          <a href="/suno/song-structure" class="block bg-surface p-4 rounded-xl border border-border hover:border-purple-500/50 transition-colors">
            <p class="font-semibold">Song Structure</p>
            <p class="text-sm text-muted-foreground">Plan your song layout</p>
          </a>
        </div>

        <div class="bg-linear-to-r from-purple-500/10 to-pink-500/10 p-8 rounded-2xl border border-purple-500/20 mt-12 text-center">
          <h3 class="text-2xl font-bold mb-4">Ready to Create Something Never Heard Before?</h3>
          <p class="mb-6 text-muted-foreground">All Suno tools 100% free. No login required.</p>
          <a href="/suno/style-blender" class="inline-block bg-foreground text-background px-8 py-3 rounded-full font-bold hover:scale-105 transition-transform">
            Start Blending Genres Now
          </a>
        </div>
      </article>
    \`
  },
  {
    slug: "guia-mezclador-estilos-suno-2025",
    title: "Cómo Crear Fusiones de Géneros Únicas con Suno AI: Guía del Mezclador",
    excerpt: "Aprende a mezclar múltiples géneros musicales en algo que los algoritmos de Spotify no podrían predecir. De Jazz-Trap a Clásico-EDM, crea sonidos nunca escuchados.",
    date: "2025-12-16",
    author: "Equipo KiviTools",
    readTime: 7,
    platform: "suno",
    language: "es",
    alternateSlug: "suno-style-blender-guide-2025",
    keywords: ["suno mezcla generos", "mezclador estilos musica", "fusion generos ia", "suno prompts", "generos musicales hibridos"],
    tags: ["Suno", "Música IA", "Fusión Géneros", "Producción Musical", "Mezclador"],
    relatedTool: {
      name: "Mezclador de Estilos",
      link: "/suno/style-blender",
      cta: "Mezcla Géneros Gratis"
    },
    secondaryTools: [
      { name: "Generador de Hooks", link: "/suno/hook-generator", cta: "Crear Hooks Pegadizos" },
      { name: "Estructura de Canción", link: "/suno/song-structure", cta: "Construir Estructura" },
      { name: "Generador de Prompts", link: "/suno/prompt-generator", cta: "Generar Prompts" }
    ],
    content: \`
      <article class="prose prose-lg prose-invert max-w-none">
        <p class="lead text-xl text-muted-foreground mb-8">
          ¿Qué pasa cuando mezclas Jazz con Trap? ¿Clásica con EDM? ¿Folk con Dubstep? Con Suno AI y los prompts correctos, creas sonidos que nunca existieron. El <strong>Mezclador de Estilos</strong> te ayuda a hacer exactamente eso.
        </p>

        <h2 class="text-3xl font-bold mt-12 mb-6 text-foreground">Por Qué la Fusión de Géneros Funciona en Suno</h2>
        <p class="mb-6">Suno AI destaca entendiendo elementos musicales de diferentes géneros y combinándolos coherentemente:</p>
        <ul class="list-disc pl-6 mb-6 space-y-2">
          <li>Toma técnicas de producción de un género</li>
          <li>Usa instrumentos de otro</li>
          <li>Aplica patrones rítmicos que unen ambos estilos</li>
          <li>Crea algo genuinamente nuevo</li>
        </ul>

        <h2 class="text-3xl font-bold mt-12 mb-6 text-foreground">Combinaciones Ganadoras</h2>
        
        <h3 class="text-2xl font-bold mt-8 mb-4 text-foreground">1. Jazz + Trap = "Trap Jazz"</h3>
        <p class="mb-6">Saxofón sobre 808s, progresiones complejas con baterías contundentes.</p>

        <h3 class="text-2xl font-bold mt-8 mb-4 text-foreground">2. Clásica + Electronic = "EDM Orquestal"</h3>
        <p class="mb-6">Two Steps from Hell meets Deadmau5. Builds épicos con elementos sinfónicos.</p>

        <h3 class="text-2xl font-bold mt-8 mb-4 text-foreground">3. Country + Hip-Hop = "Country Trap"</h3>
        <p class="mb-6">Old Town Road demostró que esto puede ser viral. Banjos + 808s.</p>

        <div class="bg-purple-500/10 p-8 rounded-2xl border border-purple-500/20 my-8">
          <h3 class="text-xl font-bold mb-4">Prueba el Mezclador de Estilos Ahora</h3>
          <p class="mb-4">Ingresa tus géneros, elige un mood, y obtén un prompt listo para Suno.</p>
          <a href="/suno/style-blender" class="inline-block bg-purple-500 text-white px-6 py-3 rounded-full font-bold hover:bg-purple-600 transition-colors">
            Mezcla Géneros Gratis
          </a>
        </div>

        <h2 class="text-3xl font-bold mt-12 mb-6 text-foreground">Herramientas Suno Completas</h2>
        <div class="grid md:grid-cols-3 gap-4 my-8">
          <a href="/suno/style-blender" class="block bg-surface p-4 rounded-xl border border-border hover:border-purple-500/50 transition-colors">
            <p class="font-semibold">Mezclador de Estilos</p>
            <p class="text-sm text-muted-foreground">Fusiona géneros únicos</p>
          </a>
          <a href="/suno/hook-generator" class="block bg-surface p-4 rounded-xl border border-border hover:border-purple-500/50 transition-colors">
            <p class="font-semibold">Generador de Hooks</p>
            <p class="text-sm text-muted-foreground">Crea melodías pegadizas</p>
          </a>
          <a href="/suno/song-structure" class="block bg-surface p-4 rounded-xl border border-border hover:border-purple-500/50 transition-colors">
            <p class="font-semibold">Estructura de Canción</p>
            <p class="text-sm text-muted-foreground">Planea tu canción</p>
          </a>
        </div>

        <div class="bg-linear-to-r from-purple-500/10 to-pink-500/10 p-8 rounded-2xl border border-purple-500/20 mt-12 text-center">
          <h3 class="text-2xl font-bold mb-4">¿Listo para Crear Algo Nunca Escuchado?</h3>
          <p class="mb-6 text-muted-foreground">Todas las herramientas Suno 100% gratis.</p>
          <a href="/suno/style-blender" class="inline-block bg-foreground text-background px-8 py-3 rounded-full font-bold hover:scale-105 transition-transform">
            Empieza a Mezclar Ahora
          </a>
        </div>
      </article>
    \`
  },
  {
    slug: "suno-hook-generator-catchy-melodies-2025",
    title: "Create Unforgettable Hooks with Suno AI: The Complete Hook Generator Guide",
    excerpt: "Learn how to create hooks that get stuck in people's heads for weeks. From melodic earworms to lyrical catchphrases, master the art of the hook.",
    date: "2025-12-16",
    author: "KiviTools Team",
    readTime: 6,
    platform: "suno",
    language: "en",
    keywords: ["suno hook generator", "catchy melody ai", "music hook creator", "earworm generator", "viral song hook"],
    tags: ["Suno", "AI Music", "Hooks", "Songwriting", "Viral Music"],
    relatedTool: {
      name: "Hook Generator",
      link: "/suno/hook-generator",
      cta: "Generate Hooks Free"
    },
    secondaryTools: [
      { name: "Style Blender", link: "/suno/style-blender", cta: "Blend Genres" },
      { name: "Lyric Generator", link: "/suno/lyric-generator", cta: "Write Lyrics" },
      { name: "Song Structure", link: "/suno/song-structure", cta: "Plan Structure" }
    ],
    content: \`
      <article class="prose prose-lg prose-invert max-w-none">
        <p class="lead text-xl text-muted-foreground mb-8">
          You know that melody that gets stuck in your head for days? That's a hook. And creating them is both an art and a science. With the <strong>Suno Hook Generator</strong>, you can craft hooks that make listeners hit replay 47 times.
        </p>

        <h2 class="text-3xl font-bold mt-12 mb-6 text-foreground">What Makes a Hook Unforgettable?</h2>
        <p class="mb-6">Great hooks share these characteristics:</p>
        <ul class="list-disc pl-6 mb-6 space-y-2">
          <li><strong>Simplicity:</strong> Easy to sing, hum, or remember</li>
          <li><strong>Repetition:</strong> The hook repeats or has repeatable elements</li>
          <li><strong>Contrast:</strong> Stands out from the rest of the song</li>
          <li><strong>Emotion:</strong> Connects to a feeling instantly</li>
          <li><strong>Surprise:</strong> Has an unexpected twist or interval</li>
        </ul>

        <h2 class="text-3xl font-bold mt-12 mb-6 text-foreground">Types of Hooks You Can Create</h2>
        
        <h3 class="text-2xl font-bold mt-8 mb-4 text-foreground">1. Melodic Hooks</h3>
        <p class="mb-6">The singable melody that carries the song. Think "Blinding Lights" synth line.</p>

        <h3 class="text-2xl font-bold mt-8 mb-4 text-foreground">2. Lyrical Hooks</h3>
        <p class="mb-6">A catchy phrase that becomes the song's identity. "Bad Romance" - that's a lyrical hook.</p>

        <h3 class="text-2xl font-bold mt-8 mb-4 text-foreground">3. Instrumental Hooks</h3>
        <p class="mb-6">A riff or loop that defines the track. "Seven Nation Army" guitar riff.</p>

        <h3 class="text-2xl font-bold mt-8 mb-4 text-foreground">4. Vocal Chants</h3>
        <p class="mb-6">Oh-oh-ohs, na-na-nas, hey-hey-heys. Stadium-ready catchiness.</p>

        <div class="bg-purple-500/10 p-8 rounded-2xl border border-purple-500/20 my-8">
          <h3 class="text-xl font-bold mb-4">Generate Your Hook Now</h3>
          <p class="mb-4">Pick your genre, describe your theme, and get 3 hook concepts ready for Suno.</p>
          <a href="/suno/hook-generator" class="inline-block bg-purple-500 text-white px-6 py-3 rounded-full font-bold hover:bg-purple-600 transition-colors">
            Create Catchy Hooks Free
          </a>
        </div>

        <h2 class="text-3xl font-bold mt-12 mb-6 text-foreground">Hook Generator + Other Suno Tools</h2>
        <p class="mb-6">Combine these tools for maximum impact:</p>
        <ol class="list-decimal pl-6 mb-6 space-y-2">
          <li><strong>Style Blender</strong> → Define your unique genre</li>
          <li><strong>Hook Generator</strong> → Create the earworm element</li>
          <li><strong>Song Structure</strong> → Plan where hooks go</li>
          <li><strong>Lyric Generator</strong> → Write supporting lyrics</li>
        </ol>

        <h2 class="text-3xl font-bold mt-12 mb-6 text-foreground">Complete Suno Toolkit</h2>
        <div class="grid md:grid-cols-3 gap-4 my-8">
          <a href="/suno/hook-generator" class="block bg-surface p-4 rounded-xl border border-border hover:border-purple-500/50 transition-colors">
            <p class="font-semibold">Hook Generator</p>
            <p class="text-sm text-muted-foreground">Unforgettable melodies</p>
          </a>
          <a href="/suno/lyric-generator" class="block bg-surface p-4 rounded-xl border border-border hover:border-purple-500/50 transition-colors">
            <p class="font-semibold">Lyric Generator</p>
            <p class="text-sm text-muted-foreground">Write complete lyrics</p>
          </a>
          <a href="/suno/prompt-generator" class="block bg-surface p-4 rounded-xl border border-border hover:border-purple-500/50 transition-colors">
            <p class="font-semibold">Prompt Generator</p>
            <p class="text-sm text-muted-foreground">Perfect Suno prompts</p>
          </a>
        </div>

        <div class="bg-linear-to-r from-purple-500/10 to-pink-500/10 p-8 rounded-2xl border border-purple-500/20 mt-12 text-center">
          <h3 class="text-2xl font-bold mb-4">Ready to Create Earworms?</h3>
          <p class="mb-6 text-muted-foreground">All Suno tools completely free.</p>
          <a href="/suno/hook-generator" class="inline-block bg-foreground text-background px-8 py-3 rounded-full font-bold hover:scale-105 transition-transform">
            Generate Your Hook Now
          </a>
        </div>
      </article>
    \`
  },
  {
    slug: "suno-song-structure-professional-guide-2025",
    title: "Professional Song Structures for Suno AI: Stop Guessing, Start Creating",
    excerpt: "Learn how hit songs are structured and apply the same blueprints to your Suno creations. From pop radio format to EDM builds, master song architecture.",
    date: "2025-12-16",
    author: "KiviTools Team",
    readTime: 8,
    platform: "suno",
    language: "en",
    keywords: ["suno song structure", "song arrangement ai", "verse chorus bridge", "music structure generator", "song blueprint"],
    tags: ["Suno", "AI Music", "Song Structure", "Music Production", "Arrangement"],
    relatedTool: {
      name: "Song Structure Generator",
      link: "/suno/song-structure",
      cta: "Generate Structure Free"
    },
    secondaryTools: [
      { name: "Hook Generator", link: "/suno/hook-generator", cta: "Create Hooks" },
      { name: "Lyric Generator", link: "/suno/lyric-generator", cta: "Write Lyrics" },
      { name: "Style Blender", link: "/suno/style-blender", cta: "Blend Genres" }
    ],
    content: \`
      <article class="prose prose-lg prose-invert max-w-none">
        <p class="lead text-xl text-muted-foreground mb-8">
          Ever wonder why some songs just FLOW while others feel choppy? The secret is structure. Professional songwriters follow proven blueprints, and now you can too with the <strong>Song Structure Generator</strong>.
        </p>

        <h2 class="text-3xl font-bold mt-12 mb-6 text-foreground">Why Song Structure Matters in Suno</h2>
        <p class="mb-6">Suno AI uses section markers like [Intro], [Verse], [Chorus], [Bridge], [Outro]. Understanding how to use them gives you:</p>
        <ul class="list-disc pl-6 mb-6 space-y-2">
          <li>More control over song flow</li>
          <li>Professional-sounding arrangements</li>
          <li>Proper build-ups and payoffs</li>
          <li>Radio-ready song formats</li>
        </ul>

        <h2 class="text-3xl font-bold mt-12 mb-6 text-foreground">Common Song Structures</h2>
        
        <h3 class="text-2xl font-bold mt-8 mb-4 text-foreground">1. Pop Radio Format</h3>
        <p class="mb-6">Intro → Verse 1 → Pre-Chorus → Chorus → Verse 2 → Pre-Chorus → Chorus → Bridge → Final Chorus → Outro</p>
        <p class="mb-6">Perfect for: Pop, R&B, Country</p>

        <h3 class="text-2xl font-bold mt-8 mb-4 text-foreground">2. Hip-Hop Structure</h3>
        <p class="mb-6">Intro → Hook → Verse 1 → Hook → Verse 2 → Hook → Verse 3 → Hook → Outro</p>
        <p class="mb-6">Verse-heavy, hook as anchor</p>

        <h3 class="text-2xl font-bold mt-8 mb-4 text-foreground">3. EDM Build-Drop</h3>
        <p class="mb-6">Intro → Build → Drop → Breakdown → Build → Drop 2 → Outro</p>
        <p class="mb-6">Energy management through tension and release</p>

        <h3 class="text-2xl font-bold mt-8 mb-4 text-foreground">4. Short-Form (TikTok)</h3>
        <p class="mb-6">Hook → Verse → Chorus (90 seconds total)</p>
        <p class="mb-6">Front-loaded with the catchiest part</p>

        <div class="bg-purple-500/10 p-8 rounded-2xl border border-purple-500/20 my-8">
          <h3 class="text-xl font-bold mb-4">Get Your Song Blueprint</h3>
          <p class="mb-4">Enter your genre and preferences, get a complete structure with Suno prompts for each section.</p>
          <a href="/suno/song-structure" class="inline-block bg-purple-500 text-white px-6 py-3 rounded-full font-bold hover:bg-purple-600 transition-colors">
            Generate Structure Free
          </a>
        </div>

        <h2 class="text-3xl font-bold mt-12 mb-6 text-foreground">Using Section Markers in Suno</h2>
        <p class="mb-6">Include these in your Suno prompts:</p>
        <ul class="list-disc pl-6 mb-6 space-y-2">
          <li><strong>[Intro]</strong> - Opening instrumental or vocal</li>
          <li><strong>[Verse]</strong> - Storytelling section</li>
          <li><strong>[Pre-Chorus]</strong> - Build-up to chorus</li>
          <li><strong>[Chorus]</strong> - Main hook, most memorable part</li>
          <li><strong>[Bridge]</strong> - Contrast section before final chorus</li>
          <li><strong>[Outro]</strong> - Song ending</li>
        </ul>

        <h2 class="text-3xl font-bold mt-12 mb-6 text-foreground">Complete Suno Production Suite</h2>
        <div class="grid md:grid-cols-3 gap-4 my-8">
          <a href="/suno/song-structure" class="block bg-surface p-4 rounded-xl border border-border hover:border-purple-500/50 transition-colors">
            <p class="font-semibold">Song Structure</p>
            <p class="text-sm text-muted-foreground">Professional blueprints</p>
          </a>
          <a href="/suno/hook-generator" class="block bg-surface p-4 rounded-xl border border-border hover:border-purple-500/50 transition-colors">
            <p class="font-semibold">Hook Generator</p>
            <p class="text-sm text-muted-foreground">Catchy hooks for chorus</p>
          </a>
          <a href="/suno/lyric-generator" class="block bg-surface p-4 rounded-xl border border-border hover:border-purple-500/50 transition-colors">
            <p class="font-semibold">Lyric Generator</p>
            <p class="text-sm text-muted-foreground">Lyrics for each section</p>
          </a>
        </div>

        <div class="bg-linear-to-r from-purple-500/10 to-pink-500/10 p-8 rounded-2xl border border-purple-500/20 mt-12 text-center">
          <h3 class="text-2xl font-bold mb-4">Ready to Structure Like a Pro?</h3>
          <p class="mb-6 text-muted-foreground">All Suno tools 100% free. No login required.</p>
          <a href="/suno/song-structure" class="inline-block bg-foreground text-background px-8 py-3 rounded-full font-bold hover:scale-105 transition-transform">
            Create Your Structure Now
          </a>
        </div>
      </article>
    \`
  }`;

// Find the closing of the blogPosts array - it's before "export function getPostBySlug"
const closingMarker = '];\n\nexport function getPostBySlug';
const insertPosition = content.indexOf(closingMarker);

if (insertPosition !== -1) {
  const before = content.substring(0, insertPosition);
  const after = content.substring(insertPosition);
  
  // Check if last post ends with a comma
  const trimmedBefore = before.trimEnd();
  const needsComma = !trimmedBefore.endsWith(',');
  
  content = trimmedBefore + (needsComma ? ',' : '') + newPosts + '\n' + after;
  
  fs.writeFileSync(blogDataPath, content, 'utf-8');
  console.log('✅ Added 4 Suno blog posts to blog-data.ts');
  console.log('   - suno-style-blender-guide-2025 (EN)');
  console.log('   - guia-mezclador-estilos-suno-2025 (ES)');
  console.log('   - suno-hook-generator-catchy-melodies-2025 (EN)');
  console.log('   - suno-song-structure-professional-guide-2025 (EN)');
} else {
  console.error('❌ Could not find the closing of blogPosts array');
  process.exit(1);
}
