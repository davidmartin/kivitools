# 🖼️ Optimizador de Imágenes

Script automático para comprimir imágenes PNG y SVG sin pérdida de calidad.

## 📦 Librerías Usadas

- **[Sharp](https://sharp.pixelplumbing.com/)**: Compresión PNG lossless con máxima calidad
- **[SVGO](https://svgo.dev/)**: Optimización de archivos SVG (limpieza de código)

## 🚀 Uso

### Optimizar todas las imágenes en `public/`

```bash
npm run optimize:images
```

### Optimizar una sola imagen

```bash
npm run optimize:single -- public/logo.png
npm run optimize:single -- public/platforms/tiktok.svg
```

### Optimización automática en build

```bash
npm run build
```

El script `prebuild` optimiza automáticamente todas las imágenes antes de hacer build.

## ✨ Características

### Para PNG:

- ✅ Compresión **sin pérdida de calidad** (lossless)
- ✅ Nivel de compresión máximo (9/9)
- ✅ Conversión automática a palette si es posible
- ✅ Máximo esfuerzo de optimización (10/10)

### Para SVG:

- ✅ Limpieza de código innecesario
- ✅ Minificación de estilos
- ✅ Eliminación de comentarios y atributos vacíos
- ✅ Mantiene `viewBox` para responsive
- ✅ Preserva IDs (no rompe referencias)

## 📊 Resultados

El script muestra:

- ✅ Archivos optimizados con % de ahorro
- ○ Archivos ya optimizados (se omiten)
- ⚠ Errores (si los hay)

**Resumen final:**

- Total de archivos procesados (PNG + SVG)
- Tamaño original vs optimizado
- **Ahorro total en MB y porcentaje**

## 🔧 Configuración

Si quieres ajustar la optimización, edita `scripts/optimize-images.mjs`:

### Para PNG (línea ~60):

```javascript
.png({
  compressionLevel: 9,  // 0-9 (9 = máxima compresión)
  palette: true,        // Intentar usar palette
  quality: 100,         // Sin pérdida (100 = lossless)
  effort: 10,           // 1-10 (10 = máximo esfuerzo)
})
```

### Para SVG (línea ~15):

```javascript
const svgoConfig = {
  multipass: true, // Múltiples pasadas de optimización
  plugins: [
    // ... configuración de plugins
  ],
};
```

## 💡 Cuándo Usar

**Ejecuta este script cuando:**

- ✅ Agregues nuevas imágenes PNG a `public/`
- ✅ Agregues nuevos logos SVG
- ✅ Actualices imágenes OG (Open Graph)
- ✅ Antes de hacer deploy a producción

**No es necesario ejecutarlo:**

- ❌ En cada build (las imágenes ya quedan optimizadas)
- ❌ Para imágenes que vienen de APIs externas

## 🎯 Impacto en Performance

### Beneficios:

- 🚀 Carga de página más rápida
- 📉 Menos ancho de banda consumido
- ⚡ Mejor Core Web Vitals (LCP)
- 💰 Ahorro en costos de hosting/CDN

### Ejemplo real (KiviTools):

```
Antes:  3.9MB (38 imágenes)
Después: 1.0MB (38 imágenes)
Ahorro: 2.8MB (73.3% menos)
```

## 🔍 Detalles Técnicos

### Sharp (PNG):

- Usa libvips (más rápido que ImageMagick)
- Compresión Deflate con nivel 9
- Intenta convertir RGB → Palette cuando es posible
- Preserva metadatos esenciales (DPI, color profile)

### SVGO (SVG):

- Parsea y optimiza el árbol XML
- Elimina elementos invisibles
- Simplifica paths y transformaciones
- **No modifica apariencia visual**

## 🚨 Advertencias

- **PNG**: Si un archivo ya está optimizado (<1% de ahorro), no se modifica
- **SVG**: Mantiene `viewBox` para que funcionen responsive
- **SVG**: No limpia IDs para evitar romper referencias internas
- **Backup**: Siempre haz commit antes de optimizar (por si acaso)

## 🆘 Solución de Problemas

**Error: "Sharp installation failed"**

```bash
npm rebuild sharp
```

**Error: "Cannot find module 'sharp'"**

```bash
npm install --save-dev sharp svgo
```

**Las imágenes se ven mal después de optimizar:**

- Revisa que `quality: 100` esté en el código PNG
- Revisa que no hayas modificado `removeViewBox` en SVGO

## 📚 Recursos

- [Sharp Documentation](https://sharp.pixelplumbing.com/)
- [SVGO Documentation](https://svgo.dev/)
- [PNG Compression Guide](https://pngquant.org/)
- [SVG Optimization Guide](https://web.dev/optimize-svgs/)
