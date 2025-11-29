# Feature Specification: SEO Tools Expansion Strategy

**Feature Branch**: `007-seo-tools-expansion`  
**Created**: November 29, 2025  
**Status**: Draft  
**Input**: User description: "quiero crear mas tools diferentes para atraer al mayor publico posible y hacer que google nos saque arriba"

## User Scenarios & Testing _(mandatory)_

### User Story 1 - Creator Discovers Niche Tool via Google Search (Priority: P1)

Un creador de contenido busca en Google una herramienta específica para su necesidad (ej: "generador de nombres para canales de YouTube", "calculadora de engagement rate"). Encuentra KiviTools como resultado orgánico, usa la herramienta gratuitamente, y descubre otras herramientas útiles de la plataforma.

**Why this priority**: El tráfico orgánico de búsqueda es la fuente más sostenible y escalable de usuarios. Cada nueva herramienta es una "landing page" que puede rankear para keywords específicos de larga cola, multiplicando la visibilidad del sitio.

**Independent Test**: Un usuario puede encontrar KiviTools buscando cualquiera de las nuevas herramientas en Google, completar su tarea sin registro, y potencialmente explorar otras herramientas.

**Acceptance Scenarios**:

1. **Given** un usuario busca "generador de nombres de usuario para YouTube gratis" en Google, **When** hace clic en el resultado de KiviTools, **Then** llega directamente a la herramienta de YouTube Username Generator y puede generar nombres en menos de 30 segundos.
2. **Given** un usuario completa una generación en cualquier herramienta, **When** mira la sección de herramientas relacionadas, **Then** ve 4-6 herramientas relevantes de la misma plataforma para explorar.
3. **Given** una nueva herramienta es publicada, **When** Google indexa la página, **Then** la herramienta aparece en resultados de búsqueda para keywords relevantes dentro de 2-4 semanas.

---

### User Story 2 - Marketing Manager Needs Multiple Platform Tools (Priority: P2)

Un Social Media Manager gestiona múltiples plataformas para una marca. Descubre KiviTools y encuentra herramientas útiles para cada plataforma que gestiona (TikTok, Instagram, LinkedIn, YouTube), consolidando su flujo de trabajo en un solo sitio.

**Why this priority**: Los usuarios que gestionan múltiples plataformas tienen mayor retención y uso por sesión. Expandir las plataformas soportadas aumenta el valor percibido y las posibilidades de retorno.

**Independent Test**: Un usuario puede navegar entre herramientas de diferentes plataformas y completar tareas de generación de contenido para al menos 5 plataformas diferentes en una sesión.

**Acceptance Scenarios**:

1. **Given** un usuario está en la herramienta de Instagram Caption Generator, **When** necesita crear contenido para LinkedIn, **Then** puede navegar fácilmente a LinkedIn Post Generator y completar su tarea.
2. **Given** un usuario usa herramientas de 3+ plataformas, **When** regresa al sitio en otro día, **Then** puede encontrar rápidamente las herramientas que usó anteriormente desde la navegación.

---

### User Story 3 - Content Creator Finds Trending Tool Category (Priority: P3)

Un creador descubre una categoría de herramientas de tendencia (ej: AI Voice tools, Podcast tools, Newsletter tools) que no sabía que necesitaba. Esto aumenta el tiempo en sitio y la probabilidad de convertirse en usuario recurrente.

**Why this priority**: Herramientas innovadoras o de categorías emergentes pueden generar buzz, compartidos sociales, y backlinks que mejoran el SEO general del sitio.

**Independent Test**: Las nuevas categorías de herramientas son descubribles desde la home page y navegación principal.

**Acceptance Scenarios**:

1. **Given** KiviTools lanza una nueva categoría de herramientas (ej: Podcast Tools), **When** un usuario visita la home page, **Then** puede ver la nueva categoría destacada y explorar sus herramientas.

---

### Edge Cases

- ¿Qué pasa cuando un usuario busca una herramienta que aún no existe? → Mostrar herramientas similares + formulario para sugerir herramientas.
- ¿Cómo manejamos keywords muy competidos donde ya existen competidores establecidos? → Enfocarse en long-tail keywords y nichos específicos.
- ¿Qué ocurre si una plataforma cambia sus políticas o APIs? → Las herramientas de generación de contenido no dependen de APIs externas, solo de AI.

## Requirements _(mandatory)_

### Functional Requirements

- **FR-001**: Sistema DEBE permitir crear nuevas herramientas siguiendo la estructura estandarizada existente (header, form, results, features, hero, how it works, FAQ, related tools).
- **FR-002**: Cada herramienta DEBE tener URLs tanto en inglés como en español (`/platform/tool-name` y `/platform/nombre-herramienta`).
- **FR-003**: Cada herramienta DEBE incluir metadatos SEO completos (title, description, keywords, JSON-LD).
- **FR-004**: Sistema DEBE generar contenido en el idioma seleccionado por el usuario (español o inglés).
- **FR-005**: Todas las herramientas DEBEN incluir sección de FAQ con 5 preguntas optimizadas para SEO.
- **FR-006**: Cada nueva herramienta DEBE estar integrada en la navegación de su plataforma correspondiente.
- **FR-007**: Sistema DEBE incluir schema markup (JSON-LD) para SoftwareApplication, BreadcrumbList, y FAQPage.
- **FR-008**: Las nuevas herramientas DEBEN seguir la estructura de UI/UX existente para consistencia.
- **FR-009**: Cada herramienta DEBE incluir verificación Turnstile (anti-bot) antes de generar contenido.
- **FR-010**: Sistema DEBE loguear todas las generaciones en Appwrite para analytics.

### Key Entities

- **Tool**: Herramienta individual con nombre, descripción, inputs, outputs, plataforma asociada.
- **Platform**: Plataforma digital (TikTok, Instagram, YouTube, etc.) que agrupa herramientas relacionadas.
- **Generation**: Registro de una generación de contenido (plataforma, herramienta, inputs, outputs, IP, idioma).
- **SEO Metadata**: Conjunto de metadatos para cada herramienta (title, description, keywords, schemas).

## New Tools Strategy _(mandatory)_

### Criterios de Selección de Nuevas Herramientas

Las nuevas herramientas deben cumplir al menos 3 de estos criterios:

1. **Alto volumen de búsqueda**: Keywords con 1K+ búsquedas mensuales.
2. **Baja competencia**: Pocos resultados de calidad o competidores débiles.
3. **Sinergia con herramientas existentes**: Reutiliza prompts, UI patterns, o usuarios target.
4. **Alta utilidad**: Resuelve un problema real y frecuente de creadores.
5. **Potencial de viralidad**: Herramientas que usuarios compartirían o mencionarían.

### Categorías de Herramientas Propuestas (Priorizadas)

#### Categoría 1: Herramientas de Calculadoras y Analytics (Alta conversión SEO)

Las calculadoras son excelentes para SEO porque:

- Keywords muy específicos y de alta intención
- Usuarios regresan frecuentemente
- Fáciles de crear (no requieren AI compleja)
- Alto tiempo en página

| Herramienta                              | Plataforma | Keywords Target                                                    | Dificultad |
| ---------------------------------------- | ---------- | ------------------------------------------------------------------ | ---------- |
| **Instagram Engagement Rate Calculator** | Instagram  | "instagram engagement calculator", "calcular engagement instagram" | Baja       |
| **TikTok Engagement Rate Calculator**    | TikTok     | "tiktok engagement rate", "calculadora engagement tiktok"          | Baja       |
| **YouTube Earnings Calculator**          | YouTube    | "youtube money calculator", "calculadora ganancias youtube"        | Media      |
| **Twitter Follower Analytics**           | Twitter    | "twitter analytics gratis", "analizar seguidores twitter"          | Media      |
| **Twitch Sub Counter Calculator**        | Twitch     | "twitch sub calculator", "calculadora subs twitch"                 | Baja       |
| **Spotify Streams Calculator**           | Spotify    | "spotify royalties calculator", "cuanto paga spotify"              | Media      |

#### Categoría 2: Herramientas de Nombres y Branding (Alta demanda)

Los generadores de nombres tienen excelente SEO porque:

- Usuarios buscan activamente estas herramientas
- Alta variedad de keywords long-tail
- Funcionan para múltiples plataformas

| Herramienta                        | Plataforma | Keywords Target                                           | Dificultad |
| ---------------------------------- | ---------- | --------------------------------------------------------- | ---------- |
| **YouTube Channel Name Generator** | YouTube    | "youtube channel name generator", "nombres canal youtube" | Baja       |
| **Podcast Name Generator**         | Podcast    | "podcast name ideas", "nombres para podcast"              | Baja       |
| **Discord Server Name Generator**  | Discord    | "discord server names", "nombres servidor discord"        | Baja       |
| **Twitch Username Generator**      | Twitch     | "twitch name generator", "nombres para twitch"            | Baja       |
| **Brand Name Generator**           | General    | "brand name generator", "generador nombres de marca"      | Media      |
| **Gamertag Generator**             | General    | "gamertag generator", "generador de gamertags"            | Baja       |

#### Categoría 3: Herramientas de Bio y Perfil (Alto valor)

Las bios son críticas para cada plataforma:

- Usuarios siempre están optimizando perfiles
- Múltiples sub-nichos (personal, business, creator)
- Keywords con alto volumen

| Herramienta                               | Plataforma | Keywords Target                                              | Dificultad |
| ----------------------------------------- | ---------- | ------------------------------------------------------------ | ---------- |
| **YouTube Channel Description Generator** | YouTube    | "youtube channel description", "descripcion canal youtube"   | Baja       |
| **LinkedIn Summary Generator**            | LinkedIn   | "linkedin summary generator", "resumen profesional linkedin" | Baja       |
| **Tinder Bio Generator**                  | Dating     | "tinder bio generator", "bio para tinder"                    | Baja       |
| **Dating App Bio Generator**              | Dating     | "dating app bio ideas", "biografía apps citas"               | Baja       |
| **GitHub Profile README Generator**       | GitHub     | "github profile readme", "readme perfil github"              | Media      |
| **Portfolio Bio Generator**               | General    | "portfolio bio generator", "bio para portfolio"              | Baja       |

#### Categoría 4: Herramientas de Email y Newsletter (Nicho profesional)

Alta demanda en el espacio profesional/marketing:

| Herramienta                      | Plataforma | Keywords Target                                           | Dificultad |
| -------------------------------- | ---------- | --------------------------------------------------------- | ---------- |
| **Email Subject Line Generator** | Email      | "email subject line generator", "generador asuntos email" | Baja       |
| **Newsletter Name Generator**    | Newsletter | "newsletter name ideas", "nombres newsletter"             | Baja       |
| **Cold Email Generator**         | Email      | "cold email template", "email en frío plantilla"          | Media      |
| **Welcome Email Generator**      | Email      | "welcome email template", "email bienvenida"              | Baja       |

#### Categoría 5: Herramientas de Podcast (Nicho en crecimiento)

Los podcasts son un nicho en crecimiento rápido:

| Herramienta                         | Plataforma | Keywords Target                                       | Dificultad |
| ----------------------------------- | ---------- | ----------------------------------------------------- | ---------- |
| **Podcast Episode Title Generator** | Podcast    | "podcast title ideas", "títulos episodios podcast"    | Baja       |
| **Podcast Description Generator**   | Podcast    | "podcast description template", "descripción podcast" | Baja       |
| **Podcast Intro Script Generator**  | Podcast    | "podcast intro script", "intro para podcast"          | Baja       |
| **Show Notes Generator**            | Podcast    | "podcast show notes", "notas del episodio"            | Media      |

#### Categoría 6: Herramientas para Nuevas Plataformas (Expansión)

Plataformas no cubiertas actualmente con alto potencial:

| Herramienta                        | Plataforma | Keywords Target                                            | Dificultad |
| ---------------------------------- | ---------- | ---------------------------------------------------------- | ---------- |
| **Substack Welcome Email**         | Substack   | "substack welcome email", "email bienvenida substack"      | Baja       |
| **Medium Article Title Generator** | Medium     | "medium title generator", "títulos medium"                 | Baja       |
| **Etsy Product Description**       | Etsy       | "etsy description generator", "descripción productos etsy" | Baja       |
| **OnlyFans Bio Generator**         | OnlyFans   | "onlyfans bio ideas", "bio onlyfans"                       | Baja       |
| **Patreon Tier Description**       | Patreon    | "patreon tier ideas", "descripción tiers patreon"          | Media      |
| **Fiverr Gig Description**         | Fiverr     | "fiverr gig description", "descripción gig fiverr"         | Baja       |

### Implementación por Fases

#### Fase 1: Quick Wins (2 semanas) - 9 herramientas NUEVAS

Herramientas de baja dificultad y alto impacto SEO (nota: TikTok Engagement Calculator ya existe):

1. Instagram Engagement Rate Calculator
2. ~~TikTok Engagement Rate Calculator~~ *(YA EXISTE)*
3. YouTube Channel Name Generator
4. Podcast Name Generator
5. Discord Server Name Generator
6. Twitch Username Generator
7. Email Subject Line Generator
8. Tinder Bio Generator
9. YouTube Channel Description Generator
10. LinkedIn Summary Generator

#### Fase 2: Expansión Media (3 semanas) - 10 herramientas

1. YouTube Earnings Calculator
2. Spotify Streams Calculator
3. Twitch Sub Calculator
4. Podcast Episode Title Generator
5. Podcast Description Generator
6. Show Notes Generator
7. Cold Email Generator
8. Newsletter Name Generator
9. GitHub Profile README Generator
10. Gamertag Generator

#### Fase 3: Nuevas Plataformas (4 semanas) - 8 herramientas

1. Medium Article Title Generator
2. Etsy Product Description Generator
3. OnlyFans Bio Generator
4. Patreon Tier Description Generator
5. Fiverr Gig Description Generator
6. Substack Welcome Email Generator
7. Dating App Bio Generator (Generic)
8. Portfolio Bio Generator

## Success Criteria _(mandatory)_

### Measurable Outcomes

- **SC-001**: Cada nueva herramienta rankea en el top 50 de Google para su keyword principal dentro de 30 días de publicación.
- **SC-002**: El tráfico orgánico total del sitio aumenta 30% mes a mes durante el período de implementación.
- **SC-003**: Al menos 5 de las nuevas herramientas alcanzan top 10 de Google para sus keywords principales en 90 días.
- **SC-004**: El tiempo promedio en sitio aumenta a 4+ minutos (usuarios explorando múltiples herramientas).
- **SC-005**: Las herramientas nuevas generan al menos 1000 usos combinados en el primer mes.
- **SC-006**: La tasa de rebote en herramientas nuevas es menor al 50%.
- **SC-007**: Al menos 20% de usuarios que usan una herramienta nueva exploran una segunda herramienta.

### Criterios de Calidad por Herramienta

Cada herramienta debe cumplir antes de lanzamiento:

- [ ] Página carga en menos de 2 segundos
- [ ] Lighthouse Performance Score > 90
- [ ] Lighthouse SEO Score > 95
- [ ] URLs en inglés y español funcionando
- [ ] FAQ con 5 preguntas relevantes
- [ ] JSON-LD schemas válidos (verificar con Google Rich Results Test)
- [ ] Traducciones completas (ES/EN)
- [ ] Turnstile integrado y funcionando
- [ ] Logging a Appwrite funcionando
- [ ] Related tools section poblada

## Assumptions

- Google indexa nuevas páginas de KiviTools dentro de 1-2 semanas debido al sitemap existente.
- El volumen de búsqueda de keywords se mantiene estable durante el período de implementación.
- La infraestructura actual (DeepSeek API, Vercel) puede manejar el aumento de tráfico esperado.
- Los usuarios que llegan por búsqueda orgánica tienen intención de usar la herramienta (alta conversión).
- Las herramientas de calculadoras no requieren AI, solo fórmulas matemáticas (menor costo operativo).

## Out of Scope

- Implementación de sistema de autenticación de usuarios.
- Herramientas que requieren acceso a APIs de terceros (scrapers, downloaders).
- Versiones de pago o premium de las herramientas.
- Aplicaciones móviles nativas.
- Integraciones con otras herramientas (Zapier, etc.).
- Marketing de pago (Google Ads, Facebook Ads).

## Technical Notes

### Estructura de Archivos por Herramienta Nueva

```
app/
  (tools)/
    [platform]/
      [tool-name]/
        page.tsx           # UI Component
  api/
    tools/
      [platform]/
        [tool-name]/
          route.ts         # API Route
lib/
  deepseek.ts              # Agregar función de generación
  translations.ts          # Agregar traducciones (ES/EN)
next.config.ts             # Agregar rewrite para URL en español
docs/RUTAS_ALIAS.md        # Documentar nueva ruta
```

### Plantilla de Prompt para Calculadoras (No AI)

Las calculadoras no usan DeepSeek, son cálculos client-side:

```typescript
// Ejemplo: Instagram Engagement Rate Calculator
const calculateEngagementRate = (
  likes: number,
  comments: number,
  followers: number
) => {
  return ((likes + comments) / followers) * 100;
};
```

### Keywords Research Recomendado

Antes de implementar cada herramienta, validar keywords con:

- Google Keyword Planner (volumen de búsqueda)
- Ubersuggest (dificultad y competencia)
- Google Search (analizar competidores en top 10)
