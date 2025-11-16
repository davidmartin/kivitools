# KiviTools - Free AI Tools for Any Digital Platform

¿Bloqueado creativo? Nosotros también, por eso hicimos esta app. 🚀

Herramientas gratuitas con IA para crear contenido en **cualquier plataforma digital**: redes sociales (TikTok, Instagram), música (Suno), foros (Reddit, Forocoches), streaming (Twitch), gaming, y más. Sin registro, sin drama, sin cobros sorpresa.

## 🚀 Stack Tecnológico

- **Framework**: Next.js 16 (App Router)
- **UI Components**: HeroUI v3 (Beta)
- **Styling**: Tailwind CSS v4
- **AI Provider**: DeepSeek API
- **Language**: TypeScript
- **Deployment**: Vercel (recomendado)

## 📦 Instalación

```bash
npm install
```

## 🔑 Variables de Entorno

Crea un archivo `.env.local` en la raíz del proyecto:

```env
DEEPSEEK_API_KEY=your_deepseek_api_key
```

## 🏃 Desarrollo

```bash
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000) en tu navegador.

## 📊 Configuración de Google AdSense

### Paso 1: Obtener tu ID de AdSense

1. Ve a [Google AdSense](https://www.google.com/adsense/)
2. Regístrate o inicia sesión
3. Copia tu ID de publicador (formato: `ca-pub-XXXXXXXXXXXXXXXXX`)

### Paso 2: Activar AdSense en el proyecto

1. **Edita `app/layout.tsx`**:
   - Descomenta las líneas del script de AdSense (líneas 44-49)
   - Reemplaza `ca-pub-XXXXXXXXXXXXXXXXX` con tu ID real

```tsx
<Script
  async
  src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-TU_ID_AQUI"
  crossOrigin="anonymous"
  strategy="afterInteractive"
/>
```

2. **Edita `app/components/ad-slot.tsx`**:
   - Reemplaza el `data-ad-client` con tu ID (línea 20)
   - Para cada AdSlot, necesitarás crear un slot en AdSense y copiar su ID

```tsx
data-ad-client="ca-pub-TU_ID_AQUI"
data-ad-slot="TU_SLOT_ID" // Crear en AdSense dashboard
```

### Paso 3: Crear Slots de Anuncios en AdSense

1. Ve a tu panel de AdSense
2. Crea nuevos bloques de anuncios:

   - **Top Banner**: Anuncio horizontal (728x90 o responsive)
   - **Bottom Banner**: Anuncio horizontal (728x90 o responsive)

3. Copia los IDs de cada slot y úsalos en tus componentes:

```tsx
<AdSlot slotId="1234567890" format="horizontal" />
```

### Ubicaciones de Anuncios

Actualmente hay 2 slots configurados en `app/page.tsx`:

1. **Top Banner** (después del hero) - Formato: Horizontal
2. **Bottom Banner** (antes del footer) - Formato: Horizontal

## �️ Herramientas Disponibles

### ✅ Implementadas

- **TikTok Script Writer** (`/tiktok/script-writer`)
  - 16 tonos diferentes (formal, casual, profesional, etc.)
  - 13 idiomas (español, inglés, francés, chino, etc.)
  - 3 duraciones (30s, 60s, 30-60s)

### 🚧 Próximamente (según PRD.md)

**TikTok** (4 herramientas MVP):

- TikTok Hook Generator
- TikTok Hashtag Generator
- TikTok Video Ideas Generator

**Instagram** (3 herramientas MVP):

- Instagram Caption Generator
- Instagram Bio Generator
- Instagram Reel Script

**Twitter** (3 herramientas MVP):

- Twitter Thread Maker
- Twitter Bio Generator
- Tweet Generator

## 📁 Estructura del Proyecto

```
kivitools/
├── app/
│   ├── (tools)/              # Rutas agrupadas para herramientas
│   │   └── tiktok/
│   │       └── script-writer/
│   │           └── page.tsx  # UI del TikTok Script Writer
│   ├── api/                  # API Routes (server-side)
│   │   └── tools/
│   │       └── tiktok/
│   │           └── script-writer/
│   │               └── route.ts  # Endpoint DeepSeek
│   ├── components/           # Componentes globales
│   │   ├── navigation.tsx    # Header con menú
│   │   ├── footer.tsx        # Footer con links
│   │   └── ad-slot.tsx       # Componente AdSense
│   ├── layout.tsx            # Layout raíz con SEO
│   ├── page.tsx              # Homepage con hero y herramientas
│   └── globals.css
├── lib/
│   └── deepseek.ts          # Cliente DeepSeek API
├── types/
│   └── index.ts             # TypeScript types
├── .env.local               # Variables de entorno (NO subir a Git)
└── PRD.md                   # Product Requirements Document
```

## 🔐 Seguridad

- ✅ API key de DeepSeek oculta en `.env.local`
- ✅ Procesamiento server-side (API Routes)
- ✅ Validación de inputs en el servidor
- ✅ `.env.local` en `.gitignore`
- 🚧 Rate limiting (pendiente implementar)

## 🚀 Deployment en Vercel

1. Conecta tu repositorio a Vercel
2. Agrega las variables de entorno en el dashboard:
   - `DEEPSEEK_API_KEY`
3. Deploy automático en cada push

### Variables de Entorno en Producción

```
DEEPSEEK_API_KEY=tu_api_key_real
```

## � Costos y Monetización

- **DeepSeek API**: ~$0.14/millón tokens (75% más barato que GPT-4)
- **Hosting Vercel**: Gratis (hasta 100GB bandwidth)
- **Google AdSense**: Genera ingresos pasivos

## 📝 Arquitectura

### Flujo de una Herramienta

1. **Usuario** → Completa formulario en `/tiktok/script-writer`
2. **Cliente** → Envía POST a `/api/tools/tiktok/script-writer`
3. **API Route** → Valida input y llama a DeepSeek
4. **DeepSeek** → Genera contenido con IA
5. **API Route** → Devuelve resultado al cliente
6. **Cliente** → Muestra resultado con botón de copiar

### Patrón para Nuevas Herramientas

Para implementar una nueva herramienta:

1. **Crear types** en `types/index.ts`
2. **Crear función** en `lib/deepseek.ts` con el prompt
3. **Crear API route** en `app/api/tools/[platform]/[tool]/route.ts`
4. **Crear página** en `app/(tools)/[platform]/[tool]/page.tsx`
5. **Actualizar homepage** en `app/page.tsx` con el nuevo card

## 📖 Recursos

- [Documentación de HeroUI v3](https://v3.heroui.com)
- [Documentación de Next.js](https://nextjs.org/docs)
- [Documentación de DeepSeek](https://platform.deepseek.com/docs)
- [PRD completo](./PRD.md) - Roadmap y especificaciones

## 📄 Licencia

MIT License
