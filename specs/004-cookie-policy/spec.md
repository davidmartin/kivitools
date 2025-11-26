# Feature Specification: Cookie Policy & Consent Banner

**Feature Branch**: `004-cookie-policy`  
**Created**: 2025-11-26  
**Status**: Draft  
**Input**: User description: "Quiero saber si tengo que añadir la politica de cookies y que necesito añadir"

## Executive Summary

KiviTools actualmente utiliza cookies y servicios de terceros que requieren consentimiento del usuario según las regulaciones GDPR (Europa), LSSI-CE (España), y ePrivacy. Este documento especifica los requisitos para implementar un sistema de consentimiento de cookies completo y legalmente compliant.

### Análisis del Estado Actual

**Cookies/Servicios actuales en KiviTools:**

| Servicio               | Tipo        | Cookie/Tracker              | Requiere Consentimiento    |
| ---------------------- | ----------- | --------------------------- | -------------------------- |
| Google Analytics (GA4) | Analítica   | `_ga`, `_ga_*`, `_gid`      | ✅ Sí (no esencial)        |
| Google AdSense         | Publicidad  | Múltiples cookies           | ✅ Sí (no esencial)        |
| Cloudflare Turnstile   | Seguridad   | `cf_clearance`, etc.        | ❌ No (esencial/seguridad) |
| Vercel Analytics       | Analítica   | Sin cookies (privacy-first) | ❌ No                      |
| Vercel Speed Insights  | Performance | Sin cookies                 | ❌ No                      |

**Documentación legal existente:**

- ✅ Privacy Policy (`/privacy-policy`) - Incluye sección de cookies básica
- ✅ Terms and Conditions (`/terms-and-conditions`)
- ❌ Cookie Policy dedicada (falta)
- ❌ Banner de consentimiento (falta)

### Conclusión: ¿Necesitas política de cookies?

**SÍ**, porque:

1. Usas **Google Analytics** → cookies de analítica
2. Usas **Google AdSense** → cookies publicitarias/tracking
3. Tienes usuarios de la **Unión Europea** (multi-idioma ES/EN/FR/DE/IT/PT)

## User Scenarios & Testing _(mandatory)_

### User Story 1 - Primer Visita con Consentimiento (Priority: P1)

Un nuevo usuario visita KiviTools por primera vez y debe poder entender qué cookies se usan y dar su consentimiento informado antes de que se activen las cookies no esenciales.

**Why this priority**: Sin consentimiento previo para cookies no esenciales, el sitio viola GDPR/ePrivacy, arriesgando multas de hasta €20M o 4% de facturación anual.

**Independent Test**: Visitar el sitio en modo incógnito y verificar que aparece el banner, que Google Analytics NO se carga hasta aceptar, y que las preferencias se guardan.

**Acceptance Scenarios**:

1. **Given** un usuario nuevo visita KiviTools por primera vez, **When** la página carga, **Then** aparece un banner de consentimiento de cookies visible y accesible
2. **Given** el banner está visible, **When** el usuario hace clic en "Aceptar todas", **Then** todas las cookies se activan y el banner desaparece
3. **Given** el banner está visible, **When** el usuario hace clic en "Rechazar no esenciales", **Then** solo las cookies esenciales permanecen activas y Google Analytics/AdSense NO se cargan
4. **Given** el usuario no ha interactuado con el banner, **When** intenta usar cualquier herramienta, **Then** las herramientas funcionan normalmente (cookies esenciales activas)

---

### User Story 2 - Gestión de Preferencias de Cookies (Priority: P1)

Un usuario quiere revisar o modificar sus preferencias de cookies en cualquier momento.

**Why this priority**: GDPR requiere que el consentimiento sea tan fácil de retirar como de dar. Los usuarios deben poder cambiar sus preferencias.

**Independent Test**: Después de aceptar cookies, usar el enlace en el footer para abrir el modal de preferencias y verificar que los cambios se aplican.

**Acceptance Scenarios**:

1. **Given** un usuario ha dado consentimiento previamente, **When** hace clic en "Configuración de Cookies" en el footer, **Then** aparece un modal/página con sus preferencias actuales
2. **Given** el modal de preferencias está abierto, **When** el usuario desactiva "Cookies de Analítica", **Then** Google Analytics deja de cargar en futuras visitas
3. **Given** el usuario cambia preferencias, **When** guarda los cambios, **Then** las nuevas preferencias se aplican inmediatamente sin recargar la página

---

### User Story 3 - Acceso a la Política de Cookies (Priority: P2)

Un usuario quiere leer la política de cookies completa para entender qué información se recoge y con qué propósito.

**Why this priority**: Requisito legal de transparencia. Menos crítico que el banner porque la información básica ya está en Privacy Policy.

**Independent Test**: Navegar a `/cookie-policy` y verificar que lista todas las cookies usadas con su propósito y duración.

**Acceptance Scenarios**:

1. **Given** un usuario está en cualquier página, **When** hace clic en "Política de Cookies" en el footer, **Then** navega a una página dedicada con información completa
2. **Given** un usuario está en la página de cookies, **When** lee el contenido, **Then** encuentra una tabla con cada cookie, su propósito, proveedor y duración
3. **Given** el banner de consentimiento está visible, **When** el usuario hace clic en "Más información", **Then** navega a la política de cookies

---

### User Story 4 - Persistencia de Preferencias (Priority: P2)

Las preferencias del usuario deben persistir entre visitas para no mostrar el banner repetidamente.

**Why this priority**: Mejora UX significativamente pero no es un requisito legal estricto.

**Independent Test**: Aceptar cookies, cerrar el navegador, volver a visitar y verificar que el banner NO aparece.

**Acceptance Scenarios**:

1. **Given** un usuario aceptó todas las cookies, **When** vuelve al sitio en la misma sesión/navegador, **Then** el banner NO aparece y sus preferencias están activas
2. **Given** un usuario rechazó cookies no esenciales, **When** vuelve después de 12 meses, **Then** el banner aparece de nuevo para renovar consentimiento
3. **Given** el usuario borra las cookies del navegador, **When** vuelve al sitio, **Then** el banner aparece como si fuera un usuario nuevo

---

### Edge Cases

- ¿Qué pasa si el usuario tiene JavaScript deshabilitado? → Las cookies no esenciales NO deben cargarse por defecto (privacy by default)
- ¿Qué pasa si el usuario está en un país sin requisitos de consentimiento (ej. USA)? → Mostrar banner igual por consistencia y buenas prácticas
- ¿Qué pasa si se añaden nuevas categorías de cookies en el futuro? → El sistema debe permitir añadir categorías sin cambiar la estructura base
- ¿Qué pasa si el usuario acepta parcialmente (solo analítica, no publicidad)? → El sistema debe soportar consentimiento granular por categoría

## Requirements _(mandatory)_

### Functional Requirements

- **FR-001**: Sistema DEBE mostrar un banner de consentimiento de cookies en la primera visita del usuario
- **FR-002**: Sistema DEBE bloquear la carga de Google Analytics hasta obtener consentimiento explícito
- **FR-003**: Sistema DEBE bloquear la carga de Google AdSense hasta obtener consentimiento explícito
- **FR-004**: Sistema DEBE permitir al usuario aceptar todas las cookies con un solo clic
- **FR-005**: Sistema DEBE permitir al usuario rechazar todas las cookies no esenciales con un solo clic
- **FR-006**: Sistema DEBE permitir al usuario configurar preferencias granulares por categoría
- **FR-007**: Sistema DEBE persistir las preferencias del usuario en una cookie técnica (esencial)
- **FR-008**: Sistema DEBE proporcionar un enlace visible en el footer para gestionar preferencias de cookies
- **FR-009**: Sistema DEBE crear una página dedicada `/cookie-policy` con información detallada de todas las cookies
- **FR-010**: Sistema DEBE mostrar el banner en todos los idiomas soportados (ES, EN, FR, DE, IT, PT)
- **FR-011**: Sistema DEBE renovar el consentimiento cada 12 meses como máximo
- **FR-012**: Sistema DEBE permitir que las herramientas funcionen sin cookies no esenciales (graceful degradation)

### Categorías de Cookies Requeridas

| Categoría      | Descripción                              | Consentimiento | Cookies Incluidas                         |
| -------------- | ---------------------------------------- | -------------- | ----------------------------------------- |
| **Esenciales** | Necesarias para el funcionamiento básico | No requerido   | Turnstile, preferencias de cookies        |
| **Analítica**  | Miden el uso del sitio                   | Requerido      | Google Analytics (`_ga`, `_gid`, `_ga_*`) |
| **Publicidad** | Anuncios personalizados                  | Requerido      | Google AdSense cookies                    |

### Key Entities

- **CookiePreferences**: Representa las preferencias de consentimiento del usuario
  - `essential`: boolean (siempre true, no editable)
  - `analytics`: boolean (default: false)
  - `advertising`: boolean (default: false)
  - `consentDate`: timestamp del momento del consentimiento
  - `expiryDate`: timestamp de expiración (consentDate + 12 meses)
  - `version`: string para invalidar consentimiento al actualizar política

## Success Criteria _(mandatory)_

### Measurable Outcomes

- **SC-001**: El banner de consentimiento aparece en menos de 1 segundo desde la carga de la página
- **SC-002**: 100% de las visitas de usuarios nuevos ven el banner antes de que cualquier cookie no esencial se active
- **SC-003**: Los usuarios pueden completar la configuración de preferencias en menos de 30 segundos
- **SC-004**: La página de política de cookies se carga en menos de 2 segundos
- **SC-005**: Las preferencias persisten correctamente en el 99% de las visitas recurrentes
- **SC-006**: El sistema pasa una auditoría de compliance con herramientas como CookieBot Scanner o similar
- **SC-007**: La experiencia de usuario (herramientas, navegación) no se ve afectada negativamente al rechazar cookies no esenciales

## Assumptions

- El usuario acepta que las cookies esenciales (Turnstile, preferencias) son necesarias y no requieren consentimiento
- Vercel Analytics y Speed Insights son privacy-first y no requieren consentimiento adicional
- El sistema no necesita cumplir con CCPA (California) en esta fase inicial
- La renovación de consentimiento cada 12 meses es suficiente para cumplir con GDPR
- No se implementará geolocalización para mostrar banners diferentes según país

## Out of Scope

- Integración con plataformas de gestión de consentimiento (CMP) de terceros como OneTrust o CookieBot
- Consentimiento específico para CCPA (California Consumer Privacy Act)
- Banner diferenciado por región/país basado en geolocalización
- Modo "Aceptar cookies similares" automático para usuarios recurrentes
