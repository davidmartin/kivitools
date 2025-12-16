#!/usr/bin/env node

/**
 * Script to add AI Writing blog posts to blog-data.ts
 * Run: node scripts/add-ai-writing-blog-posts.mjs
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const blogDataPath = path.join(__dirname, '..', 'lib', 'blog-data.ts');

// Read the current file
let content = fs.readFileSync(blogDataPath, 'utf-8');

// Check if ai-writing posts already exist
if (content.includes('how-to-humanize-ai-text-bypass-detectors-2025')) {
  console.log('✅ AI Writing blog posts already exist. Skipping.');
  process.exit(0);
}

// New blog posts
const newPosts = `
  // ===== AI WRITING POSTS =====
  {
    slug: "how-to-humanize-ai-text-bypass-detectors-2025",
    title: "How to Humanize AI Text and Bypass Detectors in 2025: Complete Guide",
    excerpt: "Tired of AI detectors flagging your content? Learn proven techniques to make AI-generated text sound authentically human while maintaining quality.",
    date: "2025-12-16",
    author: "KiviTools Team",
    readTime: 8,
    platform: "ai-writing",
    language: "en",
    keywords: ["humanize ai text", "bypass ai detector", "ai content detection", "chatgpt detection", "undetectable ai"],
    tags: ["AI Writing", "Content Creation", "AI Detection", "ChatGPT", "Text Humanizer"],
    relatedTool: {
      name: "AI Text Humanizer",
      link: "/ai-writing/text-humanizer",
      cta: "Humanize Your Text Free"
    },
    secondaryTools: [
      { name: "Paraphrasing Tool", link: "/ai-writing/paraphrasing-tool", cta: "Paraphrase Text" },
      { name: "Essay Generator", link: "/ai-writing/essay-generator", cta: "Generate Essay" }
    ],
    content: \`
      <article class="prose prose-lg prose-invert max-w-none">
        <p class="lead text-xl text-muted-foreground mb-8">
          AI content detectors have become the bane of students, content creators, and professionals everywhere. With tools like Turnitin, GPTZero, and Originality.ai getting smarter, knowing how to <strong>humanize AI-generated text</strong> is essential.
        </p>

        <h2 class="text-3xl font-bold mt-12 mb-6 text-foreground">Why AI Detectors Catch Your Content</h2>
        <p class="mb-6">AI detectors look for specific patterns that separate machine writing from human writing:</p>
        <ul class="list-disc pl-6 mb-6 space-y-2">
          <li><strong>Perplexity:</strong> AI chooses statistically probable words, making text predictable</li>
          <li><strong>Burstiness:</strong> Humans write with varied sentence lengths; AI often does not</li>
          <li><strong>Repetitive Structures:</strong> AI loves lists and parallel constructions</li>
          <li><strong>Perfect Grammar:</strong> Being too correct is a red flag</li>
        </ul>

        <h2 class="text-3xl font-bold mt-12 mb-6 text-foreground">7 Techniques to Humanize AI Text</h2>
        
        <h3 class="text-2xl font-bold mt-8 mb-4 text-foreground">1. Inject Personal Voice</h3>
        <p class="mb-6">AI hedges. Adding personal pronouns and opinions makes text unmistakably human.</p>

        <h3 class="text-2xl font-bold mt-8 mb-4 text-foreground">2. Vary Sentence Length</h3>
        <p class="mb-6">Short punch. Then a longer, meandering sentence. See the difference?</p>

        <h3 class="text-2xl font-bold mt-8 mb-4 text-foreground">3. Add Strategic Imperfections</h3>
        <p class="mb-6">Starting sentences with "And" or "But" signals human authorship.</p>

        <h3 class="text-2xl font-bold mt-8 mb-4 text-foreground">4. Use Specific Examples</h3>
        <p class="mb-6">AI generalizes. Humans tell stories with specific details.</p>

        <h3 class="text-2xl font-bold mt-8 mb-4 text-foreground">5. Break Grammar Rules</h3>
        <p class="mb-6">Fragments. One-word paragraphs. That is human writing.</p>

        <h3 class="text-2xl font-bold mt-8 mb-4 text-foreground">6. Add Rhetorical Questions</h3>
        <p class="mb-6">Guess what AI rarely does? Ask questions.</p>

        <h3 class="text-2xl font-bold mt-8 mb-4 text-foreground">7. Use Idioms</h3>
        <p class="mb-6">Cultural references are hard for AI to use naturally.</p>

        <div class="bg-indigo-500/10 p-8 rounded-2xl border border-indigo-500/20 my-8">
          <h3 class="text-xl font-bold mb-4">Skip the Manual Work</h3>
          <p class="mb-4">Why spend hours rewriting when AI can humanize your text in seconds?</p>
          <a href="/ai-writing/text-humanizer" class="inline-block bg-indigo-500 text-white px-6 py-3 rounded-full font-bold hover:bg-indigo-600 transition-colors">
            Try AI Text Humanizer Free
          </a>
        </div>

        <h2 class="text-3xl font-bold mt-12 mb-6 text-foreground">AI Writing Tools</h2>
        <div class="grid md:grid-cols-3 gap-4 my-8">
          <a href="/ai-writing/text-humanizer" class="block bg-surface p-4 rounded-xl border border-border hover:border-indigo-500/50 transition-colors">
            <p class="font-semibold">Text Humanizer</p>
            <p class="text-sm text-muted-foreground">Make AI text sound human</p>
          </a>
          <a href="/ai-writing/paraphrasing-tool" class="block bg-surface p-4 rounded-xl border border-border hover:border-indigo-500/50 transition-colors">
            <p class="font-semibold">Paraphrasing Tool</p>
            <p class="text-sm text-muted-foreground">Rewrite with different words</p>
          </a>
          <a href="/ai-writing/essay-generator" class="block bg-surface p-4 rounded-xl border border-border hover:border-indigo-500/50 transition-colors">
            <p class="font-semibold">Essay Generator</p>
            <p class="text-sm text-muted-foreground">Full essays from topics</p>
          </a>
        </div>

        <div class="bg-linear-to-r from-indigo-500/10 to-violet-500/10 p-8 rounded-2xl border border-indigo-500/20 mt-12 text-center">
          <h3 class="text-2xl font-bold mb-4">Ready to Write Undetectable Content?</h3>
          <p class="mb-6 text-muted-foreground">All AI Writing tools 100% free.</p>
          <a href="/ai-writing/text-humanizer" class="inline-block bg-foreground text-background px-8 py-3 rounded-full font-bold hover:scale-105 transition-transform">
            Humanize Your Text Now
          </a>
        </div>
      </article>
    \`
  },
  {
    slug: "como-humanizar-texto-ia-evitar-detectores-2025",
    title: "Como Humanizar Texto de IA y Evitar Detectores en 2025: Guia Completa",
    excerpt: "Cansado de que los detectores de IA marquen tu contenido? Aprende tecnicas probadas para hacer que el texto generado por IA suene autenticamente humano.",
    date: "2025-12-16",
    author: "Equipo KiviTools",
    readTime: 8,
    platform: "ai-writing",
    language: "es",
    alternateSlug: "how-to-humanize-ai-text-bypass-detectors-2025",
    keywords: ["humanizar texto ia", "evitar detector ia", "deteccion contenido ia", "chatgpt detector", "ia indetectable"],
    tags: ["Escritura IA", "Creacion de Contenido", "Deteccion IA", "ChatGPT", "Humanizador"],
    relatedTool: {
      name: "Humanizador de Texto IA",
      link: "/ai-writing/text-humanizer",
      cta: "Humanizar Texto Gratis"
    },
    secondaryTools: [
      { name: "Herramienta de Parafraseo", link: "/ai-writing/paraphrasing-tool", cta: "Parafrasear Texto" },
      { name: "Generador de Ensayos", link: "/ai-writing/essay-generator", cta: "Generar Ensayo" }
    ],
    content: \`
      <article class="prose prose-lg prose-invert max-w-none">
        <p class="lead text-xl text-muted-foreground mb-8">
          Los detectores de contenido IA se han convertido en la pesadilla de estudiantes y creadores. Saber <strong>humanizar texto generado por IA</strong> ya no es opcional, es esencial.
        </p>

        <h2 class="text-3xl font-bold mt-12 mb-6 text-foreground">Por Que los Detectores Atrapan tu Contenido</h2>
        <p class="mb-6">Los detectores buscan patrones que separan la escritura de maquina de la humana:</p>
        <ul class="list-disc pl-6 mb-6 space-y-2">
          <li><strong>Perplejidad:</strong> La IA elige palabras predecibles</li>
          <li><strong>Burstiness:</strong> Los humanos varian longitud de oraciones</li>
          <li><strong>Estructuras Repetitivas:</strong> La IA adora las listas</li>
          <li><strong>Gramatica Perfecta:</strong> Ser demasiado correcto es sospechoso</li>
        </ul>

        <h2 class="text-3xl font-bold mt-12 mb-6 text-foreground">7 Tecnicas para Humanizar Texto IA</h2>
        
        <h3 class="text-2xl font-bold mt-8 mb-4 text-foreground">1. Inyecta Voz Personal</h3>
        <p class="mb-6">La IA evita comprometerse. Agregar opiniones hace el texto humano.</p>

        <h3 class="text-2xl font-bold mt-8 mb-4 text-foreground">2. Varia la Longitud</h3>
        <p class="mb-6">Golpe corto. Luego una oracion larga. Ves la diferencia?</p>

        <h3 class="text-2xl font-bold mt-8 mb-4 text-foreground">3. Agrega Imperfecciones</h3>
        <p class="mb-6">Empezar con "Y" o "Pero" indica autoria humana.</p>

        <h3 class="text-2xl font-bold mt-8 mb-4 text-foreground">4. Usa Ejemplos Especificos</h3>
        <p class="mb-6">La IA generaliza. Los humanos cuentan historias.</p>

        <h3 class="text-2xl font-bold mt-8 mb-4 text-foreground">5. Rompe Reglas Gramaticales</h3>
        <p class="mb-6">Fragmentos. Parrafos de una palabra. Eso es escritura humana.</p>

        <h3 class="text-2xl font-bold mt-8 mb-4 text-foreground">6. Usa Preguntas Retoricas</h3>
        <p class="mb-6">Adivina que rara vez hace la IA? Hacer preguntas.</p>

        <h3 class="text-2xl font-bold mt-8 mb-4 text-foreground">7. Usa Modismos</h3>
        <p class="mb-6">Las referencias culturales son dificiles para la IA.</p>

        <div class="bg-indigo-500/10 p-8 rounded-2xl border border-indigo-500/20 my-8">
          <h3 class="text-xl font-bold mb-4">Salta el Trabajo Manual</h3>
          <p class="mb-4">Por que gastar horas reescribiendo cuando la IA puede hacerlo en segundos?</p>
          <a href="/ai-writing/text-humanizer" class="inline-block bg-indigo-500 text-white px-6 py-3 rounded-full font-bold hover:bg-indigo-600 transition-colors">
            Prueba el Humanizador Gratis
          </a>
        </div>

        <h2 class="text-3xl font-bold mt-12 mb-6 text-foreground">Herramientas de Escritura IA</h2>
        <div class="grid md:grid-cols-3 gap-4 my-8">
          <a href="/ai-writing/text-humanizer" class="block bg-surface p-4 rounded-xl border border-border hover:border-indigo-500/50 transition-colors">
            <p class="font-semibold">Humanizador de Texto</p>
            <p class="text-sm text-muted-foreground">Haz que el texto IA suene humano</p>
          </a>
          <a href="/ai-writing/paraphrasing-tool" class="block bg-surface p-4 rounded-xl border border-border hover:border-indigo-500/50 transition-colors">
            <p class="font-semibold">Herramienta Parafraseo</p>
            <p class="text-sm text-muted-foreground">Reescribe con palabras diferentes</p>
          </a>
          <a href="/ai-writing/essay-generator" class="block bg-surface p-4 rounded-xl border border-border hover:border-indigo-500/50 transition-colors">
            <p class="font-semibold">Generador de Ensayos</p>
            <p class="text-sm text-muted-foreground">Ensayos completos desde temas</p>
          </a>
        </div>

        <div class="bg-linear-to-r from-indigo-500/10 to-violet-500/10 p-8 rounded-2xl border border-indigo-500/20 mt-12 text-center">
          <h3 class="text-2xl font-bold mb-4">Listo para Escribir Contenido Indetectable?</h3>
          <p class="mb-6 text-muted-foreground">Todas las herramientas 100% gratis.</p>
          <a href="/ai-writing/text-humanizer" class="inline-block bg-foreground text-background px-8 py-3 rounded-full font-bold hover:scale-105 transition-transform">
            Humaniza tu Texto Ahora
          </a>
        </div>
      </article>
    \`
  },
  {
    slug: "best-free-essay-generators-2025",
    title: "Best Free Essay Generators in 2025: AI Tools That Actually Work",
    excerpt: "Struggling with essay writing? Discover the top free AI essay generators that create structured, coherent essays for any topic or academic level.",
    date: "2025-12-16",
    author: "KiviTools Team",
    readTime: 6,
    platform: "ai-writing",
    language: "en",
    keywords: ["essay generator", "free essay writer", "ai essay tool", "essay writing ai", "college essay generator"],
    tags: ["AI Writing", "Essays", "Academic Writing", "Students", "Free Tools"],
    relatedTool: {
      name: "Essay Generator",
      link: "/ai-writing/essay-generator",
      cta: "Generate Essay Free"
    },
    secondaryTools: [
      { name: "AI Text Humanizer", link: "/ai-writing/text-humanizer", cta: "Humanize Essay" },
      { name: "Paraphrasing Tool", link: "/ai-writing/paraphrasing-tool", cta: "Paraphrase Content" }
    ],
    content: \`
      <article class="prose prose-lg prose-invert max-w-none">
        <p class="lead text-xl text-muted-foreground mb-8">
          Essay writing can be a nightmare. Whether you are a student or professional, <strong>AI essay generators</strong> have become invaluable tools in 2025.
        </p>

        <h2 class="text-3xl font-bold mt-12 mb-6 text-foreground">Why Use an AI Essay Generator?</h2>
        <p class="mb-6">Modern AI essay generators can:</p>
        <ul class="list-disc pl-6 mb-6 space-y-2">
          <li>Create structured essays with proper introductions and conclusions</li>
          <li>Generate content on virtually any topic</li>
          <li>Match your required academic level</li>
          <li>Produce different essay types (argumentative, expository, etc.)</li>
          <li>Save hours of research and writing time</li>
        </ul>

        <h2 class="text-3xl font-bold mt-12 mb-6 text-foreground">What Makes a Good Essay Generator?</h2>
        
        <h3 class="text-2xl font-bold mt-8 mb-4 text-foreground">1. Structure Quality</h3>
        <p class="mb-6">Clear thesis, logical flow, and smooth transitions.</p>

        <h3 class="text-2xl font-bold mt-8 mb-4 text-foreground">2. Customization Options</h3>
        <p class="mb-6">Essay type, length, academic level, and tone control.</p>

        <h3 class="text-2xl font-bold mt-8 mb-4 text-foreground">3. Coherence and Flow</h3>
        <p class="mb-6">Ideas should build upon each other naturally.</p>

        <h3 class="text-2xl font-bold mt-8 mb-4 text-foreground">4. Originality</h3>
        <p class="mb-6">Content should be unique, not regurgitated from sources.</p>

        <div class="bg-indigo-500/10 p-8 rounded-2xl border border-indigo-500/20 my-8">
          <h3 class="text-xl font-bold mb-4">Try Our Free Essay Generator</h3>
          <p class="mb-4">Create structured essays on any topic in seconds.</p>
          <a href="/ai-writing/essay-generator" class="inline-block bg-indigo-500 text-white px-6 py-3 rounded-full font-bold hover:bg-indigo-600 transition-colors">
            Generate Your Essay Now
          </a>
        </div>

        <h2 class="text-3xl font-bold mt-12 mb-6 text-foreground">How to Use AI Essays Responsibly</h2>
        <ul class="list-disc pl-6 mb-6 space-y-2">
          <li><strong>Use as starting point:</strong> Add your own insights</li>
          <li><strong>Fact-check everything:</strong> AI can make mistakes</li>
          <li><strong>Add personal analysis:</strong> Teachers want YOUR thoughts</li>
          <li><strong>Humanize the output:</strong> Run through text humanizer</li>
          <li><strong>Cite properly:</strong> Find and cite real sources</li>
        </ul>

        <h2 class="text-3xl font-bold mt-12 mb-6 text-foreground">The Complete AI Writing Workflow</h2>
        <ol class="list-decimal pl-6 mb-6 space-y-2">
          <li><strong>Generate:</strong> Use Essay Generator for first draft</li>
          <li><strong>Humanize:</strong> Run through AI Text Humanizer</li>
          <li><strong>Paraphrase:</strong> Rewrite sections as needed</li>
          <li><strong>Review:</strong> Add personal voice and verify facts</li>
        </ol>

        <h2 class="text-3xl font-bold mt-12 mb-6 text-foreground">Start Writing Better Essays</h2>
        <div class="grid md:grid-cols-3 gap-4 my-8">
          <a href="/ai-writing/essay-generator" class="block bg-surface p-4 rounded-xl border border-border hover:border-indigo-500/50 transition-colors">
            <p class="font-semibold">Essay Generator</p>
            <p class="text-sm text-muted-foreground">Full essays from topics</p>
          </a>
          <a href="/ai-writing/text-humanizer" class="block bg-surface p-4 rounded-xl border border-border hover:border-indigo-500/50 transition-colors">
            <p class="font-semibold">Text Humanizer</p>
            <p class="text-sm text-muted-foreground">Make AI text undetectable</p>
          </a>
          <a href="/ai-writing/paraphrasing-tool" class="block bg-surface p-4 rounded-xl border border-border hover:border-indigo-500/50 transition-colors">
            <p class="font-semibold">Paraphrasing Tool</p>
            <p class="text-sm text-muted-foreground">Rewrite with fresh words</p>
          </a>
        </div>

        <div class="bg-linear-to-r from-indigo-500/10 to-violet-500/10 p-8 rounded-2xl border border-indigo-500/20 mt-12 text-center">
          <h3 class="text-2xl font-bold mb-4">Ready to Write Better, Faster?</h3>
          <p class="mb-6 text-muted-foreground">All AI Writing tools completely free.</p>
          <a href="/ai-writing/essay-generator" class="inline-block bg-foreground text-background px-8 py-3 rounded-full font-bold hover:scale-105 transition-transform">
            Create Your Essay Now
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
  console.log('✅ Added 3 AI Writing blog posts to blog-data.ts');
  console.log('   - how-to-humanize-ai-text-bypass-detectors-2025 (EN)');
  console.log('   - como-humanizar-texto-ia-evitar-detectores-2025 (ES)');
  console.log('   - best-free-essay-generators-2025 (EN)');
} else {
  console.error('❌ Could not find the closing of blogPosts array');
  console.error('Looking for marker: "];" followed by "export function getPostBySlug"');
  process.exit(1);
}
