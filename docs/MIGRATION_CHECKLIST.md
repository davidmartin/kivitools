# 📋 Checklist de Migración: Static → Appwrite

**Estado:** EN PROGRESO  
**Fecha inicio:** 2025-12-10  
**Objetivo:** Migrar todas las 28 plataformas y ~140 tools a Appwrite

---

## 🎯 RESUMEN DE MIGRACIÓN

| Plataforma | Tools | Idiomas | Estado | Notas |
|---|---|---|---|---|
| TikTok | 7/10 | 6 | ⏳ En progreso | 7 migradas, 3 pendientes (shop-name, money-calc, coins-calc, engagement-calc) |
| Instagram | 4 | 6 | ⏳ Pendiente | Próximas en cola |
| YouTube | 7 | 6 | ⏳ Pendiente | |
| Elevenlabs | 6 | 6 | ⏳ Pendiente | |
| Twitch | 6 | 6 | ⏳ Pendiente | |
| Suno | 8 | 6 | ⏳ Pendiente | |
| Amazon | 3 | 6 | ⏳ Pendiente | |
| BeReal | 3 | 6 | ⏳ Pendiente | |
| Bluesky | 3 | 6 | ⏳ Pendiente | |
| Discord | 3 | 6 | ⏳ Pendiente | |
| Etsy | 3 | 6 | ⏳ Pendiente | |
| Forocoches | 3 | 6 | ⏳ Pendiente | |
| Kick | 3 | 6 | ⏳ Pendiente | |
| LinkedIn | 3 | 6 | ⏳ Pendiente | |
| Medium | 3 | 6 | ⏳ Pendiente | |
| OnlyFans | 3 | 6 | ⏳ Pendiente | |
| Patreon | 3 | 6 | ⏳ Pendiente | |
| Pinterest | 3 | 6 | ⏳ Pendiente | |
| Reddit | 3 | 6 | ⏳ Pendiente | |
| Snapchat | 3 | 6 | ⏳ Pendiente | |
| Telegram | 3 | 6 | ⏳ Pendiente | |
| Threads | - | - | ❌ No tools | Plataforma sin herramientas |
| Twitter | 3 | 6 | ⏳ Pendiente | |
| (6 plataformas sin tools) | 0 | - | ❌ No tools | dating, email, facebook, pinterest... |

---

## 📝 FASES DE MIGRACIÓN

### FASE 1: Preparación ✅
- [x] Definir estrategia SEO (redirects 301)
- [x] Crear script de extracción (`extract-all-tools.mjs`)
- [x] Definir estructura de datos en Appwrite
- [x] Crear ToolsContext para caching
- [x] Crear página dinámica `/[platform]/[toolId]/`
- [ ] Ejecutar script de extracción
- [ ] Generar `scripts/data/all-tools.json`

### FASE 2: Configuración ⏳
- [ ] Crear script de upload universal
- [ ] Configurar redirects en `next.config.ts`
- [ ] Configurar hreflang tags en dinámica
- [ ] Validar estructura de datos

### FASE 3: Migración por lotes ⏳
- [x] TikTok (7 tools × 6 idiomas)
- [ ] Instagram
- [ ] YouTube
- [ ] Twitter/Bluesky
- [ ] (resto en lotes)

### FASE 4: Testing ⏳
- [ ] Verificar cada plataforma carga tools
- [ ] Verificar formularios funcionan
- [ ] Verificar generación de contenido
- [ ] Verificar redirects funcionan
- [ ] Verificar SEO (metas, JSON-LD)
- [ ] Test en mobile
- [ ] Test en dark mode

### FASE 5: Cleanup ⏳
- [ ] Borrar carpetas de tools estáticas (`/[platform]/[toolName]/`)
- [ ] Borrar rutas API estáticas
- [ ] Verificar no hay broken links
- [ ] Monitorear Search Console

---

## 🔧 SCRIPTS UTILIZADOS

| Script | Propósito | Estado |
|---|---|---|
| `extract-all-tools.mjs` | Extraer tools estáticas → JSON | ✅ Creado |
| `upload-universal-tools.mjs` | Upload cualquier plataforma a Appwrite | ⏳ Próximo |
| `clean-duplicate-tools.mjs` | Limpiar duplicados | ✅ Ejecutado |
| `upload-tiktok-tools.mjs` | Upload TikTok tools | ✅ Ejecutado |

---

## 🌐 IDIOMAS SOPORTADOS

- 🇺🇸 English (en)
- 🇪🇸 Español (es)
- 🇵🇹 Português (pt)
- 🇫🇷 Français (fr)
- 🇩🇪 Deutsch (de)
- 🇮🇹 Italiano (it)

---

## 📊 ESTADÍSTICAS

**Reales (extracción completada):**
- Plataformas con tools: 22
- Tools totales extraídas: 89
- Documentos Appwrite esperados: 89 × 6 idiomas = 534 docs
- TikTok ya migradas: 42 docs (7 tools × 6 idiomas)
- **Pendientes a migrar:** 492 docs

**Desglose por plataforma:**
- TikTok: 10 tools ✅ (7 ya en Appwrite)
- Suno: 8 tools
- YouTube: 7 tools
- Elevenlabs: 6 tools
- Twitch: 6 tools
- Instagram: 4 tools
- Amazon, BeReal, Bluesky, Discord, Etsy, Forocoches, Kick, LinkedIn, Medium, OnlyFans, Patreon, Pinterest, Reddit, Snapchat, Telegram, Twitter: 3 tools cada una

---

## ✅ CHECKLIST PRE-PRODUCCIÓN

### Antes de borrar tools estáticas:
- [ ] 100% de tools migradas a Appwrite
- [ ] 100% de plataformas testeadas
- [ ] Redirects funcionando correctamente
- [ ] Search Console muestra OK (sin errores 404)
- [ ] Analytics muestra tráfico normal
- [ ] Backups guardados en `archive/`
- [ ] Equipo aprobó cambios

### Antes de producción:
- [ ] Deploy a staging y verificar
- [ ] Deploy a producción con rollback plan
- [ ] Monitorear primeras 24h
- [ ] Revisar Search Console para errors
- [ ] Validar URLs indexadas

---

## 📌 NOTAS TÉCNICAS

### Decisiones tomadas:
1. **SEO:** Usar 301 redirects (estática → dinámica)
2. **Traducciones:** Solo idiomas ya existentes
3. **URLs:** `/[platform]/[slug]-[id]` dinámico
4. **Edición:** Usuarios editan sus tools, necesitan re-aprobación
5. **Timeline:** Una migración por lotes
6. **Cleanup:** Borrar después de testear cada lote

### Impacto SEO estimado:
- Pérdida temporal: -5% a -15% primeras 2-4 semanas
- Recuperación: 4-8 semanas (con redirects)
- Beneficio a largo plazo: mejor mantenimiento

---

## 🚀 PRÓXIMOS PASOS

1. **Ejecutar extracción:**
   ```bash
   node scripts/extract-all-tools.mjs
   ```

2. **Revisar datos extraídos:**
   ```bash
   cat scripts/data/all-tools.json | head -50
   ```

3. **Crear script universal de upload**

4. **Empezar migraciones por plataforma**

---

## 📞 CONTACTO/REFERENCIAS

- **Appwrite Database:** 691996c100092f2e06cc
- **Colección Tools:** tools
- **Página Dinámica:** `app/(tools)/[platform]/[toolId]/page.tsx`
- **ToolsContext:** `contexts/ToolsContext.tsx`

---

**Última actualización:** 2025-12-10 14:30  
**Responsable:** David Martin  
**Estado:** EN PROGRESO
