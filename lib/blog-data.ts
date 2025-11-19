export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  content: string; // HTML content
  date: string;
  author: string;
  readTime: number;
  platform: "tiktok" | "instagram" | "twitter" | "general";
  coverImage?: string;
  tags: string[];
  relatedTool?: {
    name: string;
    link: string;
    cta: string;
  };
}

export const blogPosts: BlogPost[] = [
  {
    slug: "como-crear-guiones-virales-tiktok-ia-2025",
    title: "Cómo Crear Guiones Virales para TikTok con IA en 2025: La Guía Definitiva",
    excerpt: "¿Te has quedado sin ideas para TikTok? Descubre cómo usar la Inteligencia Artificial para generar guiones que retienen la atención, aumentan tus views y te ahorran horas de trabajo. Estrategias probadas para 2025.",
    date: "2025-11-19",
    author: "Equipo KiviTools",
    readTime: 5,
    platform: "tiktok",
    tags: ["TikTok", "IA", "Guiones", "Viralidad", "Marketing", "Creadores de Contenido"],
    relatedTool: {
      name: "Generador de Scripts para TikTok",
      link: "/tiktok/script-writer",
      cta: "Generar Guión Viral Gratis"
    },
    content: `
      <article class="prose prose-lg prose-invert max-w-none">
        <p class="lead text-xl text-muted-foreground mb-8">
          El algoritmo de TikTok ha cambiado. En 2025, ya no basta con un baile de moda o un audio en tendencia. La retención lo es todo, y la base de una retención alta es un <strong>guión estructurado y adictivo</strong>. Pero, ¿quién tiene tiempo para escribir guiones perfectos todos los días? Aquí es donde entra la Inteligencia Artificial.
        </p>

        <h2 class="text-3xl font-bold mt-12 mb-6 text-foreground">El Problema: El "Bloqueo del Creador" y la Caída del Alcance</h2>
        <p class="mb-6">
          Todos los creadores hemos pasado por esto: te sientas frente a la cámara, listo para grabar, y tu mente se queda en blanco. O peor aún, grabas algo improvisado, lo editas durante horas, y se queda en 200 vistas.
        </p>
        <p class="mb-6">
          La realidad es cruel: <strong>si no captas la atención en los primeros 3 segundos, has perdido</strong>. TikTok es una guerra por la atención, y sin un gancho (hook) poderoso, estás desarmado.
        </p>

        <h2 class="text-3xl font-bold mt-12 mb-6 text-foreground">La Solución: Estructura Viral + IA</h2>
        <p class="mb-6">
          Los videos virales no son suerte; son ciencia. Casi todos siguen una estructura probada:
        </p>
        <ul class="list-disc pl-6 mb-8 space-y-2">
          <li><strong>El Gancho (0-3s):</strong> Una frase disruptiva que detiene el scroll.</li>
          <li><strong>El Desarrollo (3-45s):</strong> Valor, entretenimiento o historia que cumple la promesa del gancho.</li>
          <li><strong>El CTA (Call to Action):</strong> Una instrucción clara para convertir esa atención en seguidores o ventas.</li>
        </ul>
        <p class="mb-6">
          Escribir esto manualmente es agotador. Pero herramientas como el <strong>Generador de Scripts de KiviTools</strong> pueden hacerlo en segundos, optimizando cada palabra para el algoritmo.
        </p>

        <h2 class="text-3xl font-bold mt-12 mb-6 text-foreground">Tutorial: Cómo Generar un Guión Viral en 3 Pasos</h2>
        <p class="mb-6">
          Vamos a usar la herramienta gratuita de KiviTools para crear un guión que podría hacerse viral hoy mismo.
        </p>

        <h3 class="text-2xl font-semibold mt-8 mb-4 text-foreground">Paso 1: Define tu Tema</h3>
        <p class="mb-4">
          No seas genérico. En lugar de "Fitness", prueba con "Cómo perder grasa sin dejar de comer pizza". Cuanto más específico, mejor.
        </p>

        <h3 class="text-2xl font-semibold mt-8 mb-4 text-foreground">Paso 2: Usa el Generador de Scripts</h3>
        <p class="mb-4">
          Ve a nuestra herramienta de <a href="/tiktok/script-writer" class="text-accent hover:underline">TikTok Script Writer</a>. Ingresa tu tema y selecciona el tono (Divertido, Profesional, Polémico).
        </p>
        <div class="bg-surface p-6 rounded-xl border border-border/50 my-8">
          <p class="font-mono text-sm text-muted-foreground mb-2">Ejemplo de Input:</p>
          <p class="font-medium">"Trucos psicológicos para que alguien se obsesione contigo"</p>
        </div>

        <h3 class="text-2xl font-semibold mt-8 mb-4 text-foreground">Paso 3: Graba y Edita</h3>
        <p class="mb-6">
          La IA te dará el guión exacto, incluyendo qué hacer visualmente. Solo tienes que leerlo con energía.
        </p>

        <h2 class="text-3xl font-bold mt-12 mb-6 text-foreground">Por Qué Funciona KiviTools</h2>
        <p class="mb-6">
          A diferencia de ChatGPT genérico, nuestra herramienta está entrenada específicamente con miles de TikToks virales. Entiende el ritmo, la jerga y la psicología de la plataforma.
        </p>
        <p class="mb-6">
          Además, es <strong>100% gratis</strong>. No hay excusa para no probarlo.
        </p>

        <div class="bg-gradient-to-r from-accent/10 to-blue-500/10 p-8 rounded-2xl border border-accent/20 mt-12 text-center">
          <h3 class="text-2xl font-bold mb-4">¿Listo para tu próximo viral?</h3>
          <p class="mb-6 text-muted-foreground">Deja de perder tiempo pensando qué decir. Deja que la IA lo haga por ti.</p>
          <a href="/tiktok/script-writer" class="inline-block bg-foreground text-background px-8 py-3 rounded-full font-bold hover:scale-105 transition-transform">
            Crear Guión Ahora
          </a>
        </div>
      </article>
    `
  },
  {
    slug: "guia-descripciones-instagram-perfectas-2025",
    title: "La Fórmula Secreta para Descripciones de Instagram que Venden (Sin Parecer Vendedor)",
    excerpt: "¿Tus posts tienen likes pero cero comentarios? El problema no es tu foto, es tu descripción. Aprende la estructura de 3 pasos para escribir captions que detienen el scroll y generan ventas.",
    date: "2025-11-18",
    author: "Equipo KiviTools",
    readTime: 6,
    platform: "instagram",
    tags: ["Instagram", "Copywriting", "Ventas", "Engagement", "Marketing Digital"],
    relatedTool: {
      name: "Generador de Captions para Instagram",
      link: "/instagram/caption-generator",
      cta: "Crear Caption Irresistible"
    },
    content: `
      <article class="prose prose-lg prose-invert max-w-none">
        <p class="lead text-xl text-muted-foreground mb-8">
          Una imagen vale más que mil palabras, pero en Instagram, <strong>las palabras son las que cierran la venta</strong>. Puedes tener la foto más estética del mundo, pero si tu descripción (caption) es aburrida, tu audiencia seguirá haciendo scroll. En 2025, el engagement real nace de las historias que cuentas.
        </p>

        <h2 class="text-3xl font-bold mt-12 mb-6 text-foreground">El Error #1: "Solo emojis" o Frases Cliché</h2>
        <p class="mb-6">
          Poner un emoji de fuego 🔥 o una frase como "Vibes de domingo" es desperdiciar una oportunidad de oro. El algoritmo de Instagram prioriza el tiempo que los usuarios pasan leyendo tu post.
        </p>
        <p class="mb-6">
          <strong>Más tiempo de lectura = Mayor alcance viral.</strong>
        </p>

        <h2 class="text-3xl font-bold mt-12 mb-6 text-foreground">La Estructura A.I.D.A. para Instagram</h2>
        <p class="mb-6">
          Los mejores copywriters del mundo usan esta fórmula, y tú también deberías:
        </p>
        <ul class="list-disc pl-6 mb-8 space-y-2">
          <li><strong>Atención (La primera línea):</strong> Debe ser impactante, polémica o una pregunta intrigante. Es lo único que se ve antes del "ver más".</li>
          <li><strong>Interés (El cuerpo):</strong> Cuenta una micro-historia o da un dato curioso que mantenga al lector enganchado.</li>
          <li><strong>Deseo (La conexión):</strong> Explica por qué esto es relevante para ellos.</li>
          <li><strong>Acción (El CTA):</strong> Diles exactamente qué hacer (Guardar, Comentar, Compartir).</li>
        </ul>

        <h2 class="text-3xl font-bold mt-12 mb-6 text-foreground">Cómo Automatizar tu Copywriting con IA</h2>
        <p class="mb-6">
          No necesitas ser un experto en marketing para escribir como uno. Con el <strong>Generador de Captions de KiviTools</strong>, puedes crear descripciones persuasivas en segundos.
        </p>

        <h3 class="text-2xl font-semibold mt-8 mb-4 text-foreground">Ejemplo Real:</h3>
        <div class="bg-surface p-6 rounded-xl border border-border/50 my-8">
          <p class="font-mono text-sm text-muted-foreground mb-4"><strong>Input:</strong> Foto de café, lunes por la mañana, motivación.</p>
          <p class="font-medium mb-2"><strong>Resultado Generado:</strong></p>
          <p class="italic text-muted-foreground">"¿Tu café es gasolina o terapia? ☕️ Para mí es el botón de encendido de la semana. Cuéntame tu ritual de lunes en los comentarios 👇 #MondayMotivation #CoffeeLover"</p>
        </div>

        <h2 class="text-3xl font-bold mt-12 mb-6 text-foreground">Trucos Pro para 2025</h2>
        <ul class="list-disc pl-6 mb-8 space-y-2">
          <li>Usa saltos de línea para hacer el texto "escaneable".</li>
          <li>Coloca los hashtags en el primer comentario, no en el post (o escóndelos abajo del todo).</li>
          <li>Haz preguntas abiertas que no se respondan con un simple "sí" o "no".</li>
        </ul>

        <div class="bg-gradient-to-r from-pink-500/10 to-purple-500/10 p-8 rounded-2xl border border-pink-500/20 mt-12 text-center">
          <h3 class="text-2xl font-bold mb-4">¿Te cuesta escribir?</h3>
          <p class="mb-6 text-muted-foreground">Prueba nuestra herramienta gratuita y nunca más te quedes en blanco frente a la pantalla.</p>
          <a href="/instagram/caption-generator" class="inline-block bg-foreground text-background px-8 py-3 rounded-full font-bold hover:scale-105 transition-transform">
            Generar Caption Ahora
          </a>
        </div>
      </article>
    `,
  },
  {
    slug: "como-escribir-titulos-youtube-virales-2025",
    title: "El Arte del Clickbait Ético: Cómo Escribir Títulos de YouTube que Nadie Puede Ignorar",
    excerpt: "El CTR es el rey en YouTube. Si nadie hace clic, nadie ve tu video. Descubre cómo usar la psicología y la IA para crear títulos irresistibles sin caer en el clickbait engañoso.",
    date: "2025-11-17",
    author: "Equipo KiviTools",
    readTime: 7,
    platform: "general",
    tags: ["YouTube", "CTR", "Títulos", "Crecimiento", "Estrategia"],
    relatedTool: {
      name: "Generador de Títulos para YouTube",
      link: "/youtube/title-generator",
      cta: "Generar Títulos Virales"
    },
    content: `
      <article class="prose prose-lg prose-invert max-w-none">
        <p class="lead text-xl text-muted-foreground mb-8">
          Puedes pasar 40 horas editando el mejor video de la historia, pero si tu título es aburrido, <strong>nadie lo verá</strong>. YouTube es un mercado saturado, y el título es tu escaparate. Tienes menos de un segundo para convencer a alguien de que tu video vale su tiempo.
        </p>

        <h2 class="text-3xl font-bold mt-12 mb-6 text-foreground">La Regla del 50/50</h2>
        <p class="mb-6">
          MrBeast, el creador más grande del mundo, dice que deberías dedicar tanto tiempo a pensar el título y la miniatura como a hacer el video en sí. Suena exagerado, pero los datos lo respaldan: <strong>Un aumento del 2% en el CTR (Click-Through Rate) puede significar millones de vistas extra.</strong>
        </p>

        <h2 class="text-3xl font-bold mt-12 mb-6 text-foreground">3 Fórmulas de Títulos que Siempre Funcionan</h2>
        <ul class="list-disc pl-6 mb-8 space-y-4">
          <li>
            <strong>La Transformación Extrema:</strong> "Pasé 7 días sin comer azúcar (Esto pasó)"
            <br><span class="text-sm text-muted-foreground">Por qué funciona: Crea curiosidad inmediata sobre el resultado.</span>
          </li>
          <li>
            <strong>El Desafío Imposible:</strong> "¿Puedo sobrevivir con $1 en Nueva York?"
            <br><span class="text-sm text-muted-foreground">Por qué funciona: Plantea una historia con riesgo y recompensa.</span>
          </li>
          <li>
            <strong>La Negatividad / Error:</strong> "7 Errores que están matando tu canal"
            <br><span class="text-sm text-muted-foreground">Por qué funciona: El miedo a perder (FOMO) es más fuerte que el deseo de ganar.</span>
          </li>
        </ul>

        <h2 class="text-3xl font-bold mt-12 mb-6 text-foreground">Clickbait vs. Clickbait Ético</h2>
        <p class="mb-6">
          El clickbait malo miente ("¡Vi un Alien!"). El clickbait ético exagera la curiosidad pero <strong>cumple la promesa</strong> en el video.
        </p>
        <p class="mb-6">
          Tu objetivo es crear una "brecha de curiosidad": una discrepancia entre lo que el espectador sabe y lo que quiere saber.
        </p>

        <h2 class="text-3xl font-bold mt-12 mb-6 text-foreground">Usa la IA para Brainstorming Infinito</h2>
        <p class="mb-6">
          A veces, la primera idea es la peor. Los grandes YouTubers escriben 50 títulos antes de elegir uno. Con el <strong>Generador de Títulos de KiviTools</strong>, puedes generar 20 variaciones virales en segundos.
        </p>

        <div class="bg-surface p-6 rounded-xl border border-border/50 my-8">
          <p class="font-mono text-sm text-muted-foreground mb-4"><strong>Input:</strong> Tutorial de cocina vegana fácil.</p>
          <p class="font-medium mb-2"><strong>Ideas Generadas:</strong></p>
          <ul class="list-disc pl-6 space-y-1 text-muted-foreground">
            <li>"Cena Vegana en 10 Minutos (Que Sabe a Carne)"</li>
            <li>"Por qué Dejé de Comer Carne (Y Tú También Deberías)"</li>
            <li>"Probando Recetas Veganas de TikTok: ¿Fraude o Delicia?"</li>
          </ul>
        </div>

        <div class="bg-gradient-to-r from-red-500/10 to-orange-500/10 p-8 rounded-2xl border border-red-500/20 mt-12 text-center">
          <h3 class="text-2xl font-bold mb-4">¿Quieres más vistas?</h3>
          <p class="mb-6 text-muted-foreground">Deja de adivinar y empieza a usar títulos optimizados por IA.</p>
          <a href="/youtube/title-generator" class="inline-block bg-foreground text-background px-8 py-3 rounded-full font-bold hover:scale-105 transition-transform">
            Generar Títulos Ahora
          </a>
        </div>
      </article>
    `
  }
];

export function getPostBySlug(slug: string): BlogPost | undefined {
  return blogPosts.find((post) => post.slug === slug);
}

export function getAllPosts(): BlogPost[] {
  return blogPosts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}
