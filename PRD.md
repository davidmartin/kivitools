# Product Requirements Document (PRD)

## KiviTools - AI-Powered Tools for Any Digital Platform

**Version:** 2.0  
**Last Updated:** November 16, 2025  
**Status:** Phase 2 - Active Development (Pivot to Multi-Platform)

---

## 1. Executive Summary

### 1.1 Product Vision

KiviTools es una plataforma web integral que proporciona herramientas gratuitas impulsadas por IA para creadores de contenido, marketers y usuarios de **cualquier plataforma digital**. El objetivo es democratizar el acceso a herramientas profesionales de generación de contenido, análisis y automatización para cualquier tipo de plataforma: redes sociales (TikTok, Instagram), plataformas de música (Suno), foros (Reddit, Forocoches), streaming (Twitch), comunicación (Discord), y cualquier otra plataforma que pueda beneficiarse de herramientas de IA.

### 1.2 Inspiration

El producto está inspirado en [claptools.com](https://claptools.com/), buscando replicar y mejorar su propuesta de valor: herramientas gratuitas, sin registro obligatorio, con soporte multilingüe y funcionamiento multiplataforma.

### 1.3 Target Users

- **Creadores de contenido** (influencers, YouTubers, TikTokers, músicos, podcasters)
- **Social Media Managers** y equipos de marketing digital
- **Músicos y productores** (usuarios de Suno, Spotify, etc.)
- **Community managers** (foros, Discord, Reddit)
- **Streamers** (Twitch, YouTube Live)
- **Pequeñas empresas** que gestionan presencia digital
- **Usuarios casuales** que necesitan ayuda con contenido en cualquier plataforma

---

## 2. Product Goals & Success Metrics

### 2.1 Primary Goals

1. Proporcionar herramientas gratuitas y accesibles para **cualquier plataforma digital** (sociales, música, foros, streaming, gaming, etc.)
2. No requerir registro para funciones básicas
3. Ofrecer resultados instantáneos y de alta calidad con IA
4. Soportar múltiples idiomas (inicialmente: Español, Inglés)
5. Ser completamente responsive (mobile-first)
6. Permitir agregar nuevas plataformas fácilmente (arquitectura escalable)

### 2.2 Success Metrics (KPIs)

- **Usuarios activos mensuales (MAU):** Target 10K en 6 meses
- **Herramientas utilizadas por sesión:** Promedio de 2.5+
- **Tiempo de carga:** < 2 segundos por herramienta
- **Tasa de retorno:** 30% de usuarios regresan en 7 días
- **Tasa de éxito de generación:** 95% de peticiones completadas exitosamente

---

## 3. Platform Coverage & Feature Set

### 3.1 TikTok Tools (8 herramientas implementadas)

#### Content Generation

| Herramienta               | Descripción                         | Inputs                       | Outputs                                    | Status |
| ------------------------- | ----------------------------------- | ---------------------------- | ------------------------------------------ | ------ |
| **Video Ideas Generator** | Genera ideas frescas para videos    | Tema, idioma                 | Lista de 5-10 ideas listas para copiar     | ✅     |
| **Script Writer**         | Crea guiones completos para videos  | Tema, tono, duración, idioma | Guion estructurado con intro/cuerpo/cierre | ✅     |
| **Hook Generator**        | Genera frases de inicio impactantes | Tema, tono, idioma           | 5-10 hooks listos para copiar              | ✅     |
| **Caption Generator**     | Genera descripciones virales        | Tema, tono, idioma           | Caption optimizado con hashtags            | ✅     |
| **Hashtag Generator**     | Busca hashtags relevantes           | Palabra clave                | Lista de hashtags con visualizaciones      | ✅     |

#### Username & Branding

| Herramienta             | Descripción                         | Inputs                      | Outputs                                   | Status |
| ----------------------- | ----------------------------------- | --------------------------- | ----------------------------------------- | ------ |
| **Username Generator**  | Genera nombres de usuario creativos | Keywords, estilo            | Lista de 15 usernames únicos              | ✅     |
| **Username Checker**    | Verifica disponibilidad de username | Username deseado            | Disponible/ocupado + sugerencias AI       | ✅     |
| **Shop Name Generator** | Crea nombres para TikTok Shop       | Categoría, keywords, estilo | Lista de 12 nombres comerciales creativos | ✅     |

#### Analytics & Tools

| Herramienta          | Descripción                  | Inputs          | Outputs                                                  | Status |
| -------------------- | ---------------------------- | --------------- | -------------------------------------------------------- | ------ |
| **Money Calculator** | Estima ganancias por usuario | Username TikTok | Perfil completo + rango de ganancias estimadas por video | ✅     |

### 3.2 Instagram Tools (8 herramientas)

#### Content Generation

| Herramienta            | Descripción                 | Inputs               | Outputs                         | Status |
| ---------------------- | --------------------------- | -------------------- | ------------------------------- | ------ |
| **Caption Generator**  | Genera textos para posts    | Tema, tono, idioma   | Caption optimizado con emojis   | ✅     |
| **Bio Generator**      | Crea biografías atractivas  | Descripción, estilo  | Bio optimizada                  | ✅     |
| **Reel Script Writer** | Crea guiones para Reels     | Tema, tono, idioma   | Script estructurado por escenas | ✅     |
| **Hashtag Generator**  | Sugiere hashtags relevantes | Palabra clave, nicho | Lista de hashtags categorizados | P0     |

### 3.2.1 Pinterest Tools (3 herramientas) ✅ NEW

| Herramienta                   | Descripción                          | Inputs                           | Outputs                             | Status |
| ----------------------------- | ------------------------------------ | -------------------------------- | ----------------------------------- | ------ |
| **Pin Description Generator** | Genera descripciones SEO para pines  | Tema, keywords, tono, idioma     | Descripción optimizada con hashtags | ✅     |
| **Board Name Generator**      | Crea nombres creativos para tableros | Tema, estilo, idioma             | 5 nombres de tablero únicos         | ✅     |
| **Profile Bio Generator**     | Crea biografías para perfiles        | Descripción, nicho, tono, idioma | Bio optimizada (160 chars)          | ✅     |

### 3.2.2 Spotify Tools (3 herramientas) ✅ NEW

| Herramienta                        | Descripción                             | Inputs                           | Outputs                                | Status |
| ---------------------------------- | --------------------------------------- | -------------------------------- | -------------------------------------- | ------ |
| **Playlist Name Generator**        | Genera nombres creativos para playlists | Mood, género, idioma             | 5 nombres de playlist únicos           | ✅     |
| **Playlist Description Generator** | Crea descripciones para playlists       | Nombre playlist, mood, canciones | Descripción optimizada (300 chars)     | ✅     |
| **Artist Bio Generator**           | Crea biografías para artistas           | Nombre, género, estilo, logros   | Bio profesional para perfil de artista | ✅     |

### 3.2.3 Facebook Tools (3 herramientas) ✅ NEW

| Herramienta            | Descripción                                | Inputs                          | Outputs                                | Status |
| ---------------------- | ------------------------------------------ | ------------------------------- | -------------------------------------- | ------ |
| **Post Generator**     | Genera publicaciones para engagement       | Tema, tono, emojis, hashtags    | Publicación optimizada (100-250 chars) | ✅     |
| **Page Bio Generator** | Crea biografías profesionales para páginas | Negocio, industria, descripción | Bio optimizada (255 chars)             | ✅     |
| **Ad Copy Generator**  | Crea textos para anuncios de Facebook      | Producto, audiencia, beneficio  | Titular + Texto Principal              | ✅     |

### 3.2.4 Bluesky Tools (3 herramientas) ✅ NEW

| Herramienta         | Descripción                     | Inputs                                     | Outputs                                | Status |
| ------------------- | ------------------------------- | ------------------------------------------ | -------------------------------------- | ------ |
| **Post Generator**  | Genera publicaciones atractivas | Tema, tono, idioma                         | 5 posts optimizados (300 chars)        | ✅     |
| **Bio Generator**   | Crea biografías para perfiles   | Nombre, profesión, intereses, personalidad | Bio profesional (256 chars)            | ✅     |
| **Thread Composer** | Compone hilos estructurados     | Tema, tono, número de posts, idioma        | Hilo completo con 3-10 posts numerados | ✅     |

### 3.3 Twitter/X Tools (11 herramientas)

#### Content Generation

| Herramienta           | Descripción                | Inputs                       | Outputs                    | Status |
| --------------------- | -------------------------- | ---------------------------- | -------------------------- | ------ |
| **Tweet Generator**   | Genera tweets atractivos   | Tema, tono, idioma           | Tweet listo para publicar  | ✅     |
| **Thread Generator**  | Crea hilos coherentes      | Tema, tono, número de tweets | Hilo completo numerado     | ✅     |
| **Bio Generator**     | Crea biografías memorables | Descripción, estilo          | Bio optimizada (160 chars) | ✅     |
| **Hashtag Generator** | Sugiere hashtags trending  | Palabra clave                | Hashtags relevantes        | P1     |

#### Viewing & Analytics

| Herramienta          | Descripción                    | Inputs        | Outputs                       | Priority |
| -------------------- | ------------------------------ | ------------- | ----------------------------- | -------- |
| **Profile Viewer**   | Ve perfiles sin login          | Username      | Tweets, stats, métricas       | P1       |
| **Post Viewer**      | Visualiza tweets específicos   | URL del tweet | Tweet con medios descargables | P1       |
| **ID Finder**        | Obtiene ID numérico de usuario | @username     | User ID numérico              | P2       |
| **Username Checker** | Verifica disponibilidad        | @username     | Disponible/ocupado + preview  | P1       |

#### Download Tools

| Herramienta          | Descripción            | Inputs        | Outputs               | Priority |
| -------------------- | ---------------------- | ------------- | --------------------- | -------- |
| **Video Downloader** | Descarga videos        | URL del tweet | Video MP4/HD          | P0       |
| **Photo Downloader** | Guarda imágenes        | URL del tweet | Imagen máxima calidad | P1       |
| **GIF Downloader**   | Descarga GIFs como MP4 | URL del tweet | GIF convertido a MP4  | P2       |

### 3.4 Snapchat Tools (4 herramientas)

| Herramienta                 | Descripción                       | Inputs       | Outputs                          | Status |
| --------------------------- | --------------------------------- | ------------ | -------------------------------- | ------ |
| **Caption Generator**       | Crea captions creativos           | Tema, estilo | Caption para snap                | ✅     |
| **Story Ideas Generator**   | Genera ideas para historias       | Tema, idioma | Lista de ideas creativas         | ✅     |
| **Lens Ideas Generator**    | Sugiere ideas para filtros/lenses | Tema, estilo | Ideas para lenses personalizados | ✅     |
| **Story Downloader/Viewer** | Ve y descarga stories públicas    | Username     | Stories, highlights, spotlights  | P1     |

### 3.5 YouTube Tools (9 herramientas)

#### Content Planning

| Herramienta                 | Descripción                  | Inputs                 | Outputs                              | Status |
| --------------------------- | ---------------------------- | ---------------------- | ------------------------------------ | ------ |
| **Script Writer**           | Escribe guiones completos    | Tema, estilo, duración | Guion con intro/contenido/outro      | ✅     |
| **Video Title Generator**   | Títulos optimizados para SEO | Tema, keywords         | 5-10 títulos SEO-friendly            | ✅     |
| **Description Generator**   | Descripciones para SEO       | Tema, keywords         | Descripción optimizada               | ✅     |
| **Video Ideas Generator**   | Proporciona ideas ilimitadas | Tema, nicho, idioma    | Lista de ideas con títulos sugeridos | P0     |
| **Video Outline Generator** | Crea esquemas estructurados  | Tema, duración         | Outline con timestamps sugeridos     | P0     |

#### Engagement Tools

| Herramienta         | Descripción             | Inputs       | Outputs                   | Priority |
| ------------------- | ----------------------- | ------------ | ------------------------- | -------- |
| **Intro Generator** | Crea intros llamativas  | Tema, estilo | Texto de intro impactante | P1       |
| **Hook Generator**  | Genera frases iniciales | Tema, tono   | 5-10 hooks para videos    | P1       |

#### Analysis Tools

| Herramienta              | Descripción               | Inputs        | Outputs                | Priority |
| ------------------------ | ------------------------- | ------------- | ---------------------- | -------- |
| **Transcript Generator** | Transcribe videos a texto | URL del video | Transcripción completa | P1       |
| **Video Summarizer**     | Resume videos largos      | URL del video | Resumen conciso        | P2       |

### 3.6 LinkedIn Tools (4 herramientas)

| Herramienta              | Descripción                    | Inputs             | Outputs                         | Priority |
| ------------------------ | ------------------------------ | ------------------ | ------------------------------- | -------- |
| **Post Generator**       | Genera posts profesionales     | Tema, tono, idioma | Post optimizado para engagement | P1       |
| **Story Post Generator** | Crea historias profesionales   | Tema, mensaje      | Story con formato LinkedIn      | P2       |
| **Hook Generator**       | Líneas de apertura impactantes | Tema, audiencia    | Hooks profesionales             | P1       |
| **Hashtag Generator**    | Hashtags para alcance B2B      | Tema, industria    | Hashtags relevantes             | P1       |

### 3.8 Twitch Tools (6 herramientas)

| Herramienta                | Descripción                     | Inputs                    | Outputs                          | Status |
| -------------------------- | ------------------------------- | ------------------------- | -------------------------------- | ------ |
| **Stream Title Generator** | Títulos atractivos para streams | Juego/tema, estilo        | Títulos optimizados (8 opciones) | ✅     |
| **Chat Command Generator** | Genera respuestas para comandos | Comando, propósito, tono  | Respuesta para bot de chat       | ✅     |
| **Panel Description**      | Descripciones para paneles      | Tipo panel, contenido     | Descripción con formato          | ✅     |
| **Bio Generator**          | Crea biografías atractivas      | Descripción, estilo       | Bio optimizada                   | ✅     |
| **Rules Generator**        | Genera reglas para el chat      | Tono, enfoque             | Lista de reglas claras           | ✅     |
| **Stream Plan Generator**  | Planifica contenido del stream  | Juego/actividad, duración | Plan detallado por segmentos     | ✅     |

### 3.10 Amazon Tools (1 herramienta)

| Herramienta                       | Descripción                       | Inputs                                | Outputs                            | Status |
| --------------------------------- | --------------------------------- | ------------------------------------- | ---------------------------------- | ------ |
| **Product Description Generator** | Genera descripciones de productos | Nombre, características, tono, idioma | Descripción optimizada para ventas | ✅     |

### 3.11 Future Platforms - Examples (Not Implemented)

**Philosophy**: KiviTools can support ANY digital platform that benefits from AI-powered content tools. Here are examples of new platform categories we can expand into:

#### Music Platforms

**Suno (AI Music Generator)**

- Lyric Generator (multiple genres)
- Song Title Generator
- Prompt Generator for AI music
- Song Description for releases
- Genre Mixer Ideas

**Spotify**

- Playlist Name Generator
- Playlist Description
- Artist Bio Generator
- Album Description

#### Forums & Communities

**Forocoches**

- Thread Title Generator
- Post Generator (adapted to forum culture)
- Reply Generator
- Signature Generator

**4chan / Anonymous Forums**

- Thread Starter Generator
- Greentext Story Generator

**Stack Overflow**

- Question Title Optimizer
- Answer Generator (technical)
- Comment Generator

#### Gaming Platforms

**Steam**

- Game Review Generator
- Workshop Item Description
- Community Post Generator
- Guide Title Generator

**Epic Games**

- Creator Code Description
- Game Rating/Review

**Roblox**

- Game Description Generator
- Group Description
- Update Announcement

#### Professional Platforms

**GitHub**

- README Generator
- Issue Title/Description
- Pull Request Description
- Commit Message Generator

**Medium**

- Article Title Generator
- Article Outline
- Introduction Hook Generator
- Meta Description

**Dev.to**

- Post Title Generator
- Tags Suggester
- Series Description

#### E-commerce

**Etsy**

- Product Title Generator
- Product Description
- Shop Announcement
- About Section

**eBay**

- Listing Title Optimizer
- Product Description
- Seller Bio

**Amazon Seller**

- Product Bullet Points
- A+ Content Description
- Response to Reviews

#### Email & Newsletters

**Substack**

- Newsletter Title
- Email Subject Lines
- Post Intro Generator

**ConvertKit**

- Email Sequence Generator
- Welcome Email
- Subject Line Tester

#### Podcast Platforms

**Spotify Podcasts**

- Episode Title Generator
- Episode Description
- Show Notes Generator
- Transcript Summarizer

**Apple Podcasts**

- Show Description
- Episode Summary
- Category Suggester

#### Dating Apps

**Tinder**

- Bio Generator
- Conversation Starter
- First Message Ideas

**Bumble**

- Profile Prompt Answers
- Bio Optimizer

**Hinge**

- Prompt Response Generator
- Bio Ideas

#### Job Platforms

**LinkedIn** (already planned)

- Job Post Generator
- Job Description
- InMail Template

**Indeed**

- Job Description Generator
- Company Description

**AngelList**

- Startup Description
- Job Post for Startups

---

**Implementation Priority**: Start with platforms that have the most synergy with existing tools (e.g., Suno for music, Forocoches for Spanish forums) and high user demand.

### 3.7 Discord Tools (3 herramientas)

| Herramienta                   | Descripción                   | Inputs                  | Outputs                     | Status |
| ----------------------------- | ----------------------------- | ----------------------- | --------------------------- | ------ |
| **Announcement Generator**    | Crea anuncios para servidores | Tema, tono, idioma      | Anuncio con formato Discord | ✅     |
| **Welcome Message Generator** | Genera mensajes de bienvenida | Nombre servidor, tono   | Mensaje personalizado       | ✅     |
| **Event Description**         | Describe eventos del servidor | Nombre evento, detalles | Descripción atractiva       | ✅     |

### 3.6 Reddit Tools (3 herramientas)

| Herramienta           | Descripción                  | Inputs             | Outputs                         | Status |
| --------------------- | ---------------------------- | ------------------ | ------------------------------- | ------ |
| **Post Generator**    | Genera posts para subreddits | Tema, tono, idioma | Post optimizado para engagement | ✅     |
| **Comment Generator** | Crea comentarios relevantes  | Contexto, tono     | Comentario constructivo         | ✅     |
| **AMA Questions**     | Genera preguntas para AMAs   | Tema, audiencia    | Lista de preguntas interesantes | ✅     |

### 3.8 Suno Tools (8 herramientas)

| Herramienta                    | Descripción                             | Inputs                                   | Outputs                           | Status |
| ------------------------------ | --------------------------------------- | ---------------------------------------- | --------------------------------- | ------ |
| **Lyric Generator**            | Genera letras para canciones            | Tema, género, estilo, idioma             | Letra completa con estructura     | ✅     |
| **Music Prompt Generator**     | Crea prompts para generar música        | Género, mood, instrumentos               | Prompt optimizado para Suno AI    | ✅     |
| **Song Description Generator** | Descripciones para publicar música      | Género, tema, mood, plataforma           | Descripción atractiva con emojis  | ✅     |
| **Song Title Generator**       | Genera títulos creativos para canciones | Tema, género, mood, idioma               | 10 títulos únicos                 | ✅     |
| **Song Tag Generator**         | Etiquetas para mejorar descubrimiento   | Género, mood, instrumentos, idioma       | 10 tags relevantes y optimizados  | ✅     |
| **Album Name Generator**       | Nombres para álbumes/EPs                | Concepto, tipo release, idioma           | 10 nombres de álbum               | ✅     |
| **Cover Art Prompt Generator** | Prompts para arte de portada            | Título, mood, género, estilo, plataforma | 5 prompts para Midjourney/DALL-E  | ✅     |
| **Remix Idea Generator**       | Ideas estructuradas para remixes        | Canción original, género, estilo remix   | 5 conceptos con tempo y elementos | ✅     |

### 3.9 ElevenLabs Tools (6 herramientas)

| Herramienta                     | Descripción                         | Inputs                                        | Outputs                                    | Status |
| ------------------------------- | ----------------------------------- | --------------------------------------------- | ------------------------------------------ | ------ |
| **Voice Script Writer**         | Guiones optimizados para TTS        | Tema, estilo, duración, idioma                | Script con tags de voz [pause], [emphasis] | ✅     |
| **Video Voiceover Script**      | Scripts para voiceovers de video    | Tema, tipo video, tono, idioma                | Script con timing y voice direction        | ✅     |
| **Voice Text Formatter**        | Optimiza texto para voz AI          | Texto, idioma                                 | Texto formateado con tags de voz           | ✅     |
| **Podcast Script Generator**    | Guiones estructurados para podcasts | Tema, formato, duración, segmentos, tono      | Script con timestamps y breaks musicales   | ✅     |
| **Ad/Commercial Script**        | Scripts publicitarios persuasivos   | Producto, duración, estilo, CTA, audiencia    | Script con hook, beneficios y CTA          | ✅     |
| **Audiobook Chapter Optimizer** | Optimiza texto de libros para audio | Texto (5000 chars), género, narrativa, idioma | Texto con diálogos marcados y cues         | ✅     |

---

## 4. Technical Requirements

### 4.1 Technology Stack

- **Frontend:** Next.js 16.0.1 (App Router), React, TypeScript ✅
- **Styling:** Tailwind CSS v4, HeroUI v3 Beta (@heroui/react v3.0.0-beta.1) ✅
  - **Theme System:** HeroUI semantic colors (`bg-background`, `text-foreground`, `text-muted`, etc.)
  - **Dark Mode:** Manual toggle with localStorage persistence + system preference detection
  - **Color Classes:** Using HeroUI's built-in color system (--accent, --foreground, --background, etc.)
- **AI/Generation:** DeepSeek API (deepseek-chat model) ✅
- **APIs de Redes Sociales:**
  - TikTok API / Web scraping (para analytics y downloads)
  - Instagram Graph API / scraping responsable
  - Twitter API v2
  - YouTube Data API v3
  - APIs públicas cuando estén disponibles
- **Storage:** Vercel Blob o S3 para archivos temporales
- **Database:** Vercel Postgres o Supabase (para analytics y caché)
- **Deployment:** Vercel ✅

### 4.2 Core Technical Features

- **Server-Side Rendering (SSR)** para SEO
- **API Routes** en Next.js para lógica backend
- **Edge Functions** para operaciones rápidas
- **Streaming responses** para generación de contenido en tiempo real
- **Rate limiting** para prevenir abuso
- **Caching inteligente** para optimizar costos de API

### 4.3 Performance Requirements

- **Lighthouse Score:** 90+ en todas las categorías
- **First Contentful Paint (FCP):** < 1.5s
- **Time to Interactive (TTI):** < 3.5s
- **Cumulative Layout Shift (CLS):** < 0.1
- **Tiempo de respuesta API:** < 2s para el 95% de peticiones

### 4.4 Security Requirements

- **HTTPS obligatorio**
- **Rate limiting por IP:** 100 requests/hora para usuarios anónimos
- **Content Security Policy (CSP)** configurado
- **No almacenamiento de datos personales** sin consentimiento
- **Sanitización de inputs** para prevenir XSS/injection
- **CORS configurado** apropiadamente

### 4.5 Accessibility Requirements

- **WCAG 2.1 Level AA compliance**
- **Navegación por teclado** completa
- **Screen reader compatible**
- **Contraste de color** adecuado (mínimo 4.5:1)
- **ARIA labels** apropiados

---

## 5. User Experience (UX) Requirements

### 5.1 Navigation Structure

```
Home
├── TikTok Tools (dropdown con 16 herramientas)
├── Instagram Tools (dropdown con 8 herramientas)
├── Twitter/X Tools (dropdown con 11 herramientas)
├── YouTube Tools (dropdown con 9 herramientas)
├── LinkedIn Tools (dropdown con 4 herramientas)
├── Snapchat Tools (dropdown con 4 herramientas)
├── Twitch Tools (dropdown con 4 herramientas)
├── Discord Tools (1 herramienta)
├── Reddit Tools (1 herramienta)
└── About / FAQ
```

### 5.2 Page Layout Standards

Cada herramienta debe seguir este patrón:

1. **Hero Section:**

   - Título claro de la herramienta
   - Descripción breve (1-2 líneas)
   - CTA principal visible

2. **Input Section:**

   - Formulario limpio y minimalista
   - Labels claros para cada campo
   - Placeholders con ejemplos
   - Validación en tiempo real
   - Botón de acción primario destacado

3. **Output Section:**

   - Resultados claramente formateados
   - Botón "Copy to clipboard" en cada resultado
   - Opción de "Regenerar" si aplica
   - Indicadores de loading durante procesamiento

4. **Features Section:**

   - 3-4 características clave con iconos
   - Beneficios principales

5. **FAQ Section (opcional):**
   - 3-5 preguntas frecuentes específicas de la herramienta

### 5.3 Mobile-First Design

- **Diseño responsive** obligatorio
- **Touch-friendly** (botones mínimo 44x44px)
- **Menú hamburguesa** para navegación en móvil
- **Inputs optimizados** para teclado móvil
- **Swipe gestures** donde sea apropiado

### 5.4 Micro-interactions

- **Loading states** animados (spinners, skeleton screens)
- **Success/error feedback** visual inmediato
- **Hover effects** sutiles en desktop
- **Smooth transitions** entre estados
- **Copy confirmation** (checkmark temporal al copiar)

---

## 6. Content Generation Strategy

### 6.1 AI Integration

Todas las herramientas de generación de contenido utilizarán modelos de lenguaje (LLM):

**Proveedor recomendado:**

- OpenAI GPT-4 o GPT-4-turbo (mejor calidad)
- Alternativa: Anthropic Claude (mejor precio/token)

**Prompt Engineering Guidelines:**

- Prompts específicos por herramienta y tono
- System prompts para mantener consistencia
- Few-shot examples para mejor calidad
- Temperature ajustada por tipo de contenido:
  - Creativo (hooks, ideas): 0.8-0.9
  - Profesional (LinkedIn): 0.6-0.7
  - Técnico (scripts, SEO): 0.5-0.6

### 6.2 Multi-language Support

**Idiomas en MVP:**

- Español (ES)
- Inglés (EN)

**Idiomas en roadmap:**

- Portugués (PT)
- Francés (FR)
- Alemán (DE)
- Italiano (IT)

**Implementación:**

- Detección automática de idioma del navegador
- Selector de idioma visible
- Traducciones para UI con i18n
- Generación de contenido en idioma seleccionado

---

## 7. Data & Analytics Strategy

### 7.1 User Analytics (Privacy-First)

**Herramientas:**

- Google Analytics 4 o Plausible (privacy-friendly)
- Vercel Analytics para performance

**Métricas a trackear:**

- Páginas vistas por herramienta
- Tasa de conversión (input → resultado generado)
- Tiempo promedio en página
- Bounce rate por herramienta
- Device distribution
- Idioma preferido

### 7.2 Tool Usage Tracking

- Herramientas más utilizadas
- Tasa de regeneración de contenido
- Errores por herramienta
- Tiempo promedio de generación

### 7.3 Privacy Compliance

- **Cookie consent** según GDPR
- **No tracking de datos personales** sin consentimiento
- **Datos anónimos** por defecto
- **Política de privacidad** clara y accesible

---

## 8. Monetization Strategy (Future)

### 8.1 Freemium Model

**Free Tier:**

- Todas las herramientas básicas
- 50 generaciones/día por IP
- Marca de agua "Powered by KiviTools" en descargas

**Pro Tier ($9.99/mes):**

- Generaciones ilimitadas
- Sin marca de agua
- Acceso prioritario (sin rate limiting)
- Descargas en batch
- API access (1000 requests/mes)
- Exportación de analytics

### 8.2 Additional Revenue Streams

- **Affiliate links** a herramientas premium de terceros
- **Sponsored tools** (partnerships con plataformas)
- **White-label licensing** para agencias
- **API pricing tiers** para desarrolladores

---

## 9. Development Phases

### Phase 1: MVP ✅ Completed (Weeks 1-4)

**Objetivo:** Lanzar con herramientas core de las 3 plataformas principales

**Completed:**

- ✅ Landing page + navegación con 8 plataformas
- ✅ **TikTok:** Video Ideas, Script Writer, Hook Generator, Hashtag Generator (4 tools)
- ✅ **Instagram:** Caption Generator, Bio Generator, Reel Script (3 tools)
- ✅ **Twitter:** Tweet Generator, Thread Maker, Bio Generator (3 tools)
- ✅ Analytics básicos
- ✅ Responsive design
- ✅ Bilingual support (ES/EN)
- ✅ Dark mode with manual toggle
- ✅ HeroUI semantic color system implemented

**Results:**

- 10 herramientas funcionando
- Tiempo de generación < 5s
- Mobile-responsive
- Build exitoso con 57 páginas

### Phase 2: Expansion ✅ In Progress (Weeks 5-8)

**Objetivo:** Completar herramientas adicionales + agregar más plataformas

**Completed:**

- ✅ **Snapchat:** Caption Generator, Story Ideas, Lens Ideas (3 tools)
- ✅ **YouTube:** Script Generator, Title Generator, Description Generator (3 tools)
- ✅ **Reddit:** Post Generator, Comment Generator, AMA Questions (3 tools)
- ✅ **Discord:** Announcement, Welcome Message, Event Description (3 tools)
- ✅ **Twitch:** Stream Title, Chat Command, Panel Description (3 tools)
- ✅ **Suno:** 8 tools - Lyric Generator, Music Prompt Generator, Song Description Generator, Song Title Generator, Song Tag Generator, Album Name Generator, Cover Art Prompt Generator, Remix Idea Generator
- ✅ **ElevenLabs:** Voice Script Writer, Video Voiceover Script, Voice Text Formatter (3 tools)
- ✅ Legal pages: Privacy Policy, Terms & Conditions, Contact Us
- ✅ Navigation improved with all 9 platforms (TikTok, Instagram, Twitter, Snapchat, YouTube, Reddit, Discord, Twitch, Suno, ElevenLabs)
- ✅ Sistema de rate limiting (por implementar en APIs)

**In Progress:**

- ⏳ SEO optimization
- ⏳ Mejoras de UX basadas en feedback

**Tools Count:** 39 herramientas activas (de 60+ planificadas)

### Phase 3: Full Platform Coverage (Weeks 9-12)

**Objetivo:** Agregar todas las plataformas restantes

**Scope:**

- LinkedIn, Snapchat, Twitch, Discord, Reddit tools
- Sistema de analytics avanzado
- A/B testing framework
- Optimización de costos de API

**Acceptance Criteria:**

- 60+ herramientas completas
- 5000+ usuarios únicos/semana
- Tasa de retorno > 25%

### Phase 4: Monetization & Scaling (Week 13+)

**Objetivo:** Implementar modelo freemium y escalar

**Scope:**

- Sistema de autenticación (opcional)
- Pro tier con Stripe
- API pública
- Dashboard de usuario
- Herramientas avanzadas exclusivas

**Acceptance Criteria:**

- 10K+ MAU
- 100+ suscriptores Pro en primer mes
- Profitability break-even

---

## 10. Design System

### 10.1 Component Library

**Usar HeroUI v3 (Alpha) con React Aria:**

- Button, Card, Input, Select, Textarea
- Tabs para navegación entre categorías
- Tooltip para ayuda contextual
- Skeleton para loading states
- Alert para mensajes de éxito/error

### 10.2 Color Palette

```css
/* Primary (Brand) */
--color-primary: oklch(60% 0.15 270); /* Purple/Blue */
--color-primary-hover: oklch(55% 0.15 270);

/* Accent */
--color-accent: oklch(70% 0.2 150); /* Green para success */

/* Platform-specific (opcional) */
--tiktok: #000000;
--instagram: linear-gradient(
  45deg,
  #f09433,
  #e6683c,
  #dc2743,
  #cc2366,
  #bc1888
);
--twitter: #1da1f2;
--youtube: #ff0000;
--linkedin: #0077b5;
--snapchat: #fffc00;
--twitch: #9146ff;
```

### 10.3 Typography

- **Headings:** Inter o Geist (system font de Vercel)
- **Body:** Inter
- **Monospace (code):** Geist Mono

**Scale:**

- H1: 2.5rem (40px)
- H2: 2rem (32px)
- H3: 1.5rem (24px)
- Body: 1rem (16px)
- Small: 0.875rem (14px)

### 10.4 Spacing System

Usar sistema de 4px:

- xs: 4px
- sm: 8px
- md: 16px
- lg: 24px
- xl: 32px
- 2xl: 48px

---

## 11. Quality Assurance

### 11.1 Testing Strategy

**Unit Tests:**

- Funciones de utilidad
- Helpers de formato
- Validación de inputs

**Integration Tests:**

- Flujos completos de herramientas
- API endpoints
- Generación de contenido

**E2E Tests (Playwright):**

- User flows críticos
- Formularios y validación
- Descargas de archivos
- Navegación entre páginas

**Manual QA Checklist:**

- [ ] Todas las herramientas funcionan en Chrome, Safari, Firefox
- [ ] Mobile responsive en iOS y Android
- [ ] Accesibilidad (screen reader, keyboard navigation)
- [ ] Tiempos de carga < 3s
- [ ] Error handling apropiado

### 11.2 Browser Support

- Chrome/Edge: últimas 2 versiones
- Safari: últimas 2 versiones
- Firefox: últimas 2 versiones
- Mobile Safari (iOS): iOS 15+
- Chrome Mobile (Android): Android 10+

---

## 12. Acceptance Criteria (MVP Launch)

### 12.1 Functional Requirements ✅

- [x] Mínimo 10 herramientas funcionando correctamente
- [x] Generación de contenido con IA en < 5 segundos
- [x] Validación de inputs con mensajes claros
- [x] Manejo de errores graceful (sin crashes)
- [x] Resultados copiables con un clic
- [ ] Descarga de medios funcional (TikTok, Twitter)

### 12.2 Non-Functional Requirements ✅

- [x] Mobile-responsive en 3 dispositivos testeados
- [x] Tiempo de carga inicial < 2s
- [x] Zero critical bugs en producción
- [x] HTTPS configurado
- [ ] Lighthouse Performance Score: 90+
- [ ] Lighthouse Accessibility Score: 90+

### 12.3 Content Requirements ✅

- [x] Landing page con propuesta de valor clara
- [x] Descripciones de herramientas completas
- [x] Política de privacidad publicada
- [x] Términos y condiciones publicados
- [x] Página de contacto
- [ ] FAQ section con 10+ preguntas
- [ ] About page explicando el proyecto

### 12.4 Launch Checklist 🚧

- [x] Domain configurado
- [x] Meta tags para SEO en todas las páginas
- [ ] Analytics instalado y testeado
- [ ] Open Graph images configuradas
- [ ] Sitemap.xml generado
- [ ] robots.txt configurado
- [ ] Error tracking (Sentry o similar)
- [ ] CDN configurado para assets

---

## 13. Risks & Mitigation

### 13.1 Technical Risks

| Risk                                            | Impact | Probability | Mitigation                                                                                              |
| ----------------------------------------------- | ------ | ----------- | ------------------------------------------------------------------------------------------------------- |
| **APIs de redes sociales bloqueadas/limitadas** | Alto   | Media       | Implementar scraping responsable como backup; rotar IPs si necesario; usar APIs oficiales donde existan |
| **Costos de OpenAI exceden presupuesto**        | Alto   | Media       | Implementar caching agresivo; rate limiting; considerar modelos más baratos (Claude, Llama)             |
| **Performance pobre con múltiples usuarios**    | Medio  | Baja        | Edge functions; CDN; caching; optimización de queries                                                   |
| **DMCA/Copyright claims por descargas**         | Alto   | Baja        | Disclaimer claro; solo permitir contenido público; sistema de takedown                                  |

### 13.2 Business Risks

| Risk                                         | Impact | Probability | Mitigation                                                               |
| -------------------------------------------- | ------ | ----------- | ------------------------------------------------------------------------ |
| **Baja adopción de usuarios**                | Alto   | Media       | Marketing en redes sociales; SEO agresivo; partnerships con influencers  |
| **Competencia de herramientas establecidas** | Medio  | Alta        | Diferenciación por UX superior; más idiomas; mejor calidad de generación |
| **Cambios en políticas de plataformas**      | Medio  | Media       | Diversificación de herramientas; adaptación rápida                       |

### 13.3 Legal Risks

| Risk                                 | Impact | Probability | Mitigation                                                           |
| ------------------------------------ | ------ | ----------- | -------------------------------------------------------------------- |
| **Violación de ToS de plataformas**  | Alto   | Media       | Legal review; cumplir con rate limits; atribución correcta           |
| **GDPR/Privacy non-compliance**      | Alto   | Baja        | No almacenar datos personales; cookie consent; privacy-by-design     |
| **Uso indebido por usuarios (spam)** | Medio  | Media       | Rate limiting agresivo; CAPTCHA si necesario; términos de uso claros |

---

## 14. Future Enhancements (Post-MVP)

### 14.1 Advanced Features

- **Batch processing:** Generar múltiples contenidos simultáneamente
- **Content calendar:** Planificación y scheduling
- **A/B testing:** Comparar rendimiento de diferentes hooks/títulos
- **Analytics dashboard:** Trackear performance de contenido generado
- **Browser extension:** Quick access a herramientas desde cualquier sitio
- **Mobile app:** Versión nativa iOS/Android

### 14.2 AI Enhancements

- **Custom brand voice:** Entrenar en el estilo del usuario
- **Content remixing:** Adaptar un post de una plataforma a otra
- **Trend detection:** Sugerir temas trending automáticamente
- **Image generation:** DALL-E/Midjourney integration para thumbnails
- **Video editing AI:** Cortar/optimizar videos automáticamente

### 14.3 Integration & Automation

- **Zapier integration:** Conectar con otras herramientas
- **Direct posting:** Publicar directamente a plataformas (con OAuth)
- **CRM integration:** Conectar con HubSpot, Salesforce
- **Team collaboration:** Múltiples usuarios, aprobación de contenido
- **Webhooks:** Notificaciones de eventos

### 14.4 Platform Expansion Strategy

**New Platform Categories to Explore:**

1. **Music & Audio Platforms**

   - Suno (AI music generation)
   - Spotify (playlists, artist bios)
   - SoundCloud (track descriptions)
   - Podcasts (show notes, episode descriptions)

2. **Forum & Community Platforms**

   - Forocoches (Spanish forum culture)
   - Stack Overflow (technical Q&A)
   - 4chan/Anonymous boards
   - Quora (question/answer optimization)

3. **Gaming Platforms**

   - Steam (reviews, guides, workshop)
   - Epic Games (creator descriptions)
   - Roblox (game descriptions)
   - Discord gaming communities

4. **Professional Development**

   - GitHub (README, issues, PRs)
   - Dev.to (article titles, posts)
   - Medium (article optimization)
   - Personal blogs (SEO-optimized content)

5. **E-commerce Platforms**

   - Etsy (product descriptions, shop info)
   - eBay (listing optimization)
   - Amazon Seller (product bullets, A+ content)
   - Shopify (product copy)

6. **Dating Apps**

   - Tinder (bio generation, openers)
   - Bumble (profile prompts)
   - Hinge (creative answers)

7. **Email & Newsletters**
   - Substack (newsletter ideas)
   - ConvertKit (email sequences)
   - Mailchimp (subject lines)

**Selection Criteria for New Platforms:**

- High user demand (via feedback, surveys)
- Synergy with existing tools (can we reuse prompts?)
- Market size and monetization potential
- Technical feasibility (APIs available?)
- Alignment with brand (tools that genuinely help creators)

---

## 15. Documentation Requirements

### 15.1 User Documentation

- [ ] **Getting Started Guide:** Tutorial básico de uso
- [ ] **Tool-specific guides:** Cómo usar cada herramienta
- [ ] **FAQ expandido:** 50+ preguntas comunes
- [ ] **Video tutorials:** Screencasts de 2-3 min por herramienta
- [ ] **Blog with tips:** Content marketing + SEO

### 15.2 Technical Documentation

- [ ] **Architecture diagram:** Sistema completo
- [ ] **API documentation:** Si se lanza API pública
- [ ] **Contributing guide:** Para open-source (opcional)
- [ ] **Deployment guide:** Cómo hacer deploy
- [ ] **Monitoring & alerts:** Runbook para incidents

---

## 16. Launch Strategy

### 16.1 Pre-Launch (2 weeks before)

- [ ] Beta testing con 20-50 usuarios
- [ ] Product Hunt submission preparada
- [ ] Social media accounts creados
- [ ] Landing page con email waitlist
- [ ] Press kit preparado

### 16.2 Launch Day

- [ ] Product Hunt launch (a las 00:01 PST para máximo visibility)
- [ ] Post en Reddit (r/SideProject, r/Entrepreneur, subreddits de redes sociales)
- [ ] Tweet storm explicando el producto
- [ ] LinkedIn post para herramientas profesionales
- [ ] Email a waitlist

### 16.3 Post-Launch (first month)

- [ ] Daily monitoring de analytics y feedback
- [ ] Responder a todos los comentarios en Product Hunt
- [ ] Hotfix bugs críticos en < 24h
- [ ] Weekly blog post con tips de uso
- [ ] Contactar a micro-influencers para reviews

### 16.4 Marketing Channels

**Organic:**

- SEO optimization (target keywords: "free tiktok script generator", etc.)
- Content marketing (blog posts, guides)
- YouTube tutorials
- Social media presence

**Paid (si hay presupuesto):**

- Google Ads para keywords de alta intención
- Facebook/Instagram ads para creadores
- Sponsored posts en newsletters de marketing

**Partnerships:**

- Influencers/creators (free Pro tier a cambio de review)
- Marketing agencies (white-label o affiliate)
- Cursos online de social media (como recurso recomendado)

---

## 17. Key Performance Indicators (KPIs) - Detailed

### 17.1 Acquisition Metrics

- **Weekly Active Users (WAU):** Target 1K en mes 1, 5K en mes 3
- **Traffic sources:** Organic search > 40%, Direct > 20%, Social > 20%
- **Signup conversion (si hay auth):** 5%+ de visitantes
- **Bounce rate:** < 40% en páginas de herramientas

### 17.2 Engagement Metrics

- **Tools used per session:** 2.5+ promedio
- **Time on site:** 5+ minutos promedio
- **Return visit rate:** 30%+ en 7 días
- **Content generation success rate:** 95%+
- **Copy button clicks:** 80%+ de generaciones

### 17.3 Retention Metrics

- **Day 1 retention:** 40%+
- **Day 7 retention:** 25%+
- **Day 30 retention:** 15%+
- **Monthly Active Users (MAU):** 10K en 6 meses

### 17.4 Monetization Metrics (post-Phase 4)

- **Free to Paid conversion:** 2-5%
- **Monthly Recurring Revenue (MRR):** $1K en mes 1 post-paywall
- **Customer Acquisition Cost (CAC):** < $20
- **Lifetime Value (LTV):** $100+ (LTV:CAC ratio de 5:1)
- **Churn rate:** < 5% mensual

### 17.5 Technical Metrics

- **API success rate:** 99%+
- **Average generation time:** < 3s
- **Downtime:** < 0.1% (target 99.9% uptime)
- **Error rate:** < 0.5% de requests
- **API cost per generation:** < $0.01 (optimizar con caching)

---

## 18. Competitive Analysis

### 18.1 Direct Competitors

| Competidor        | Fortalezas                          | Debilidades                     | Nuestra Ventaja                        |
| ----------------- | ----------------------------------- | ------------------------------- | -------------------------------------- |
| **Claptools.com** | Amplia gama de herramientas, gratis | UX mejorable, sin auth/tracking | UX moderna, mejor AI, analytics        |
| **Hootsuite**     | All-in-one, scheduling              | Caro ($99+/mes), complejo       | Gratis, simple, enfocado en generación |
| **Buffer**        | Buen scheduling, analytics          | Pago, limitado en generación    | Gratis, mejor generación con AI        |
| **Copy.ai**       | Excelente AI para copy              | Solo texto, $49+/mes            | Más herramientas, descarga de medios   |
| **Canva**         | Diseño visual, plantillas           | No genera texto optimizado      | Complementario, enfoque en copy        |

### 18.2 Unique Value Propositions

1. **100% Gratis en tier básico** (vs. competencia de pago)
2. **60+ herramientas en una plataforma** (vs. especializados)
3. **AI de última generación** para generación de contenido
4. **Sin registro obligatorio** (vs. forzar signup)
5. **9 plataformas soportadas** (vs. 2-3 en competidores)
6. **Multilingüe desde día 1** (español + inglés)
7. **Open source roadmap** (transparencia)

---

## 19. Success Criteria - Final Checklist

### MVP Success (Week 4)

- [ ] 10+ herramientas funcionando sin errores críticos
- [ ] 500+ usuarios únicos en primera semana
- [ ] 90+ Lighthouse score (performance & accessibility)
- [ ] < 1% error rate en generación de contenido
- [ ] Featured in Product Hunt o similar

### Phase 2 Success (Week 8)

- [ ] 35+ herramientas activas
- [ ] 2,000+ usuarios únicos/semana
- [ ] 5+ reseñas positivas en redes sociales
- [ ] SEO: Ranking en top 10 para 5+ keywords objetivo
- [ ] Partnership con 1+ influencer o agencia

### Phase 3 Success (Week 12)

- [ ] 60+ herramientas completas (todas las plataformas)
- [ ] 5,000+ usuarios únicos/semana
- [ ] 25%+ tasa de retorno en 7 días
- [ ] Crecimiento orgánico > 50% de tráfico
- [ ] Break-even en costos de infraestructura

### Long-term Success (6 months)

- [ ] 10,000+ MAU
- [ ] 100+ usuarios Pro (si hay tier de pago)
- [ ] Profitability o path claro hacia profitability
- [ ] Comunidad activa (Discord, subreddit, o similar)
- [ ] Featured en medios (TechCrunch, ProductHunt, etc.)

---

## 20. Contact & Ownership

**Product Owner:** David Martin  
**Repository:** https://github.com/davidmartin/kivitools  
**Last Updated:** November 16, 2025  
**Version:** 1.1 - Rebranded to KiviTools

**Feedback & Iteration:**
Este documento debe actualizarse cada 2 semanas durante desarrollo activo, incorporando:

- Learnings de user testing
- Cambios en scope basados en viabilidad técnica
- Nuevas oportunidades identificadas
- Feedback de stakeholders

---

## Appendix A: Glossary

- **MAU:** Monthly Active Users - Usuarios únicos que usan el producto al menos una vez al mes
- **WAU:** Weekly Active Users - Usuarios únicos que usan el producto al menos una vez a la semana
- **Engagement Rate:** (Likes + Comments) / Followers × 100
- **LTV:** Lifetime Value - Ingreso total esperado de un cliente durante su relación con el producto
- **CAC:** Customer Acquisition Cost - Costo de adquirir un nuevo cliente
- **MRR:** Monthly Recurring Revenue - Ingresos recurrentes mensuales
- **Churn:** Porcentaje de usuarios que dejan de usar el producto
- **Rate Limiting:** Límite en número de requests por tiempo para prevenir abuso
- **SSR:** Server-Side Rendering - Renderizado en servidor para mejor SEO
- **Edge Functions:** Funciones serverless ejecutadas en edge locations (más cerca del usuario)

---

## Appendix B: Sample Prompts for AI Generation

### TikTok Script Writer Prompt

```
You are a viral TikTok script writer. Create an engaging script for a {duration}-second video about "{topic}".

Tone: {tone}
Language: {language}

Structure:
1. HOOK (first 3 seconds): A shocking or intriguing statement
2. PROBLEM (5 seconds): Identify the pain point
3. SOLUTION (10-15 seconds): Your main content
4. CTA (last 3 seconds): Clear call-to-action

Make it conversational, use short sentences, and include [VISUAL CUES] where needed.
```

### Instagram Caption Generator Prompt

```
Create an engaging Instagram caption about "{topic}".

Tone: {tone}
Language: {language}

Requirements:
- Start with a hook (question or bold statement)
- 2-3 paragraphs, conversational tone
- Include relevant emojis naturally (not excessive)
- End with a call-to-action (comment, share, or save)
- Keep it authentic and relatable

Do NOT include hashtags (they will be generated separately).
```

### YouTube SEO Title Prompt

```
Generate 5 SEO-optimized titles for a YouTube video about "{topic}".

Target keywords: {keywords}
Language: {language}

Requirements:
- 60-70 characters (YouTube optimal length)
- Include target keyword naturally
- Use power words (Ultimate, Secret, Proven, etc.)
- Create curiosity without clickbait
- Number lists work well (e.g., "5 Ways to...")

Format: Return as numbered list.
```

---

## Appendix C: Implemented Features

### ✅ Feature 017: Homepage Tools Feed (Centralized Tools Page)

**Status:** Completed  
**Implementation Date:** December 2025  
**Spec Location:** `specs/017-homepage-tools-feed/`

**Summary:**
Centralized `/tools` page that replaces individual platform hub pages. Users can browse, filter, search, and sort all 109+ tools from a single location.

**Key Features Implemented:**

- ✅ Infinite scroll grid with 3-column responsive layout
- ✅ Platform filtering (33 platforms) with horizontal chips
- ✅ Search functionality with debounce (300ms)
- ✅ Sort options: Featured, Newest, Popular, A-Z
- ✅ URL-based state management (`?platform=X&sort=Y&q=Z`)
- ✅ 301 redirects from `/platform` → `/tools?platform=X`
- ✅ ARIA accessibility (feed pattern, keyboard navigation)
- ✅ Loading skeleton state
- ✅ Screen reader announcements
- ✅ Header search integration (Enter to search in /tools)
- ✅ SEO optimization (canonical URLs, hreflang)

**User Stories Completed:**

1. US1: Browse all tools with infinite scroll
2. US2: Filter by platform from homepage cards
3. US3: Sort tools by criteria
4. US4: Search tools by name/description/tags
5. US5: Platform filter chips on /tools page

**Technical Stack:**

- Next.js 16.0.1 App Router
- React hooks (useState, useEffect, useMemo)
- Custom useDebounce hook
- URL state with useSearchParams
- HeroUI v3 components
- Tailwind CSS v4 semantic tokens

**Performance Metrics:**

- Initial load: < 500ms (30 tools)
- Filter response: < 300ms
- Search debounce: 300ms
- Infinite scroll batch: 30 tools/load
- Total tools: 109+ indexed

---

**END OF DOCUMENT**

_Este PRD es un documento vivo y debe actualizarse regularmente durante el ciclo de desarrollo._
