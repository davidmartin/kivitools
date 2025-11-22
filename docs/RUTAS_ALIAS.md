# Rutas Alias - Guía de Uso

## URLs en Español e Inglés

Todas las herramientas ahora tienen **dos URLs** que apuntan a la misma página:

- URL en inglés (canonical)
- URL en español (alias)

### Ejemplo:

```
✅ https://kivitools.com/tiktok/script-writer
✅ https://kivitools.com/tiktok/escritor-de-guiones
```

Ambas URLs funcionan y muestran **exactamente el mismo contenido**.

---

## Rutas Disponibles por Plataforma

### 🛒 Amazon

| Inglés                                  | Español                                   |
| --------------------------------------- | ----------------------------------------- |
| `/amazon/product-description-generator` | `/amazon/generador-descripcion-producto`  |
| `/amazon/product-review-generator`      | `/amazon/generador-resenas-producto`      |
| `/amazon/product-comparison-generator`  | `/amazon/generador-comparativa-productos` |

### 🎵 TikTok

| Inglés                          | Español                           |
| ------------------------------- | --------------------------------- |
| `/tiktok/script-writer`         | `/tiktok/escritor-de-guiones`     |
| `/tiktok/video-ideas`           | `/tiktok/ideas-de-videos`         |
| `/tiktok/hook-generator`        | `/tiktok/generador-de-ganchos`    |
| `/tiktok/hashtag-generator`     | `/tiktok/generador-de-hashtags`   |
| `/tiktok/caption-generator`     | `/tiktok/generador-subtitulos`    |
| `/tiktok/username-generator`    | `/tiktok/generador-de-nombres`    |
| `/tiktok/shop-name-generator`   | `/tiktok/generador-nombre-tienda` |
| `/tiktok/coins-calculator`      | `/tiktok/calculadora-monedas`     |
| `/tiktok/money-calculator`      | `/tiktok/calculadora-dinero`      |
| `/tiktok/engagement-calculator` | `/tiktok/calculadora-engagement`  |

### 📸 Instagram

| Inglés                         | Español                           |
| ------------------------------ | --------------------------------- |
| `/instagram/bio-generator`     | `/instagram/generador-bio`        |
| `/instagram/caption-generator` | `/instagram/generador-subtitulos` |
| `/instagram/reel-script`       | `/instagram/guion-reel`           |

### 🐦 Twitter

| Inglés                     | Español                     |
| -------------------------- | --------------------------- |
| `/twitter/bio-generator`   | `/twitter/generador-bio`    |
| `/twitter/tweet-generator` | `/twitter/generador-tweets` |
| `/twitter/thread-maker`    | `/twitter/creador-hilos`    |

### 👻 Snapchat

| Inglés                        | Español                          |
| ----------------------------- | -------------------------------- |
| `/snapchat/story-ideas`       | `/snapchat/ideas-historias`      |
| `/snapchat/caption-generator` | `/snapchat/generador-subtitulos` |
| `/snapchat/lens-ideas`        | `/snapchat/ideas-lentes`         |

### 🎥 YouTube

| Inglés                           | Español                            |
| -------------------------------- | ---------------------------------- |
| `/youtube/title-generator`       | `/youtube/generador-titulos`       |
| `/youtube/description-generator` | `/youtube/generador-descripciones` |
| `/youtube/script-generator`      | `/youtube/generador-guiones`       |

### 🔴 Reddit

| Inglés                      | Español                           |
| --------------------------- | --------------------------------- |
| `/reddit/post-generator`    | `/reddit/generador-publicaciones` |
| `/reddit/comment-generator` | `/reddit/generador-comentarios`   |
| `/reddit/ama-questions`     | `/reddit/preguntas-ama`           |

### 💬 Discord

| Inglés                            | Español                        |
| --------------------------------- | ------------------------------ |
| `/discord/announcement-generator` | `/discord/generador-anuncios`  |
| `/discord/welcome-message`        | `/discord/mensaje-bienvenida`  |
| `/discord/event-description`      | `/discord/descripcion-eventos` |

### 🎮 Twitch

| Inglés                          | Español                       |
| ------------------------------- | ----------------------------- |
| `/twitch/stream-title`          | `/twitch/titulo-stream`       |
| `/twitch/panel-description`     | `/twitch/descripcion-panel`   |
| `/twitch/chat-command`          | `/twitch/comando-chat`        |
| `/twitch/bio-generator`         | `/twitch/generador-bio`       |
| `/twitch/rules-generator`       | `/twitch/generador-reglas`    |
| `/twitch/stream-plan-generator` | `/twitch/planificador-stream` |

### 🎙️ ElevenLabs

| Inglés                               | Español                               |
| ------------------------------------ | ------------------------------------- |
| `/elevenlabs/voice-script-writer`    | `/elevenlabs/escritor-de-guiones-voz` |
| `/elevenlabs/video-voiceover-script` | `/elevenlabs/guion-de-video-voz`      |
| `/elevenlabs/voice-text-formatter`   | `/elevenlabs/formateador-texto-voz`   |
| `/elevenlabs/podcast-script`         | `/elevenlabs/guion-podcast`           |
| `/elevenlabs/ad-script`              | `/elevenlabs/guion-anuncio`           |
| `/elevenlabs/audiobook-optimizer`    | `/elevenlabs/optimizador-audiolibro`  |

---

## Beneficios SEO

### 1. **Indexación en múltiples idiomas**

- Google indexa ambas URLs
- Mejora el ranking en búsquedas en español
- Mayor cobertura geográfica (LATAM + España)

### 2. **Canonical URLs**

- La URL en inglés es la canonical
- Las URLs en español tienen `rel="alternate" hreflang="es"`
- Evita contenido duplicado en SEO

### 3. **Sitemap completo**

- Todas las URLs (inglés + español) están en `/sitemap.xml`
- Google descubre todas las variantes automáticamente

### 4. **User Experience**

- URLs más naturales para usuarios hispanohablantes
- Fácil de compartir y recordar
- Compatible con búsquedas en español

---

## Cómo Funcionan los Rewrites

En `next.config.ts`:

```typescript
async rewrites() {
  return [
    {
      source: "/tiktok/escritor-de-guiones",
      destination: "/tiktok/script-writer"
    },
    // ... más rewrites
  ];
}
```

**Importante:**

- El usuario ve: `/tiktok/escritor-de-guiones`
- Next.js renderiza: `/tiktok/script-writer`
- **No hay redirección**, es transparente
- **Misma página**, diferentes URLs

---

## Próximos Pasos

### Para mejorar aún más el SEO:

1. **Crear contenido localizado**

   - Títulos meta diferentes para ES/EN
   - Descripciones meta optimizadas por idioma

2. **Backlinks multilingües**

   - Promover URLs en español en sitios hispanohablantes
   - Promover URLs en inglés en sitios anglófonos

3. **Monitoreo en Google Search Console**
   - Verificar indexación de ambas versiones
   - Analizar qué URLs reciben más tráfico
   - Ajustar estrategia según resultados

---

## Testing

Para probar las rutas:

```bash
# URL en inglés
curl -I http://localhost:3000/tiktok/script-writer

# URL en español (debe funcionar igual)
curl -I http://localhost:3000/tiktok/escritor-de-guiones
```

Ambas deben devolver `200 OK` y mostrar el mismo contenido.
