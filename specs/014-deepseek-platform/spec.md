# Feature Specification: DeepSeek Branding & SEO

**Feature Branch**: `014-deepseek-platform`  
**Created**: December 1, 2025  
**Status**: Draft  
**Pivot Note**: Cambiado de "crear herramientas DeepSeek" a "branding powered by DeepSeek"  
**Input**: "Poner que KiviTools utiliza DeepSeek para atraer a la gente que usa DeepSeek"

## Overview

Añadir branding visible de "Powered by DeepSeek" en KiviTools para atraer usuarios que ya conocen y confían en DeepSeek. No se crean nuevas herramientas - se aprovecha el catálogo existente de 100+ tools destacando la tecnología de backend.

**Estrategia**: Marketing y SEO, no desarrollo de features.

## User Scenarios & Testing _(mandatory)_

### User Story 1 - DeepSeek Badge Visibility (Priority: P1)

Un usuario fan de DeepSeek visita KiviTools y ve inmediatamente un badge "Powered by DeepSeek" en el footer. Esto le genera confianza porque sabe que DeepSeek es un modelo potente y decide probar las herramientas.

**Why this priority**: Es el cambio más visible con menor esfuerzo. Un badge en el footer aparece en TODAS las páginas.

**Independent Test**: Visitar cualquier página de KiviTools y verificar que el badge "Powered by DeepSeek" es visible en el footer.

**Acceptance Scenarios**:

1. **Given** un usuario en cualquier página de KiviTools, **When** hace scroll hasta el footer, **Then** ve un badge "Powered by DeepSeek" con el logo de DeepSeek.
2. **Given** un usuario en modo oscuro, **When** ve el footer, **Then** el badge y logo son visibles con buen contraste.
3. **Given** un usuario en móvil, **When** ve el footer, **Then** el badge es legible y no se corta.

---

### User Story 2 - Technology Page for SEO (Priority: P1)

Un usuario busca "ai tools powered by deepseek" o "herramientas que usan deepseek" en Google. Encuentra la página `/about/technology` de KiviTools que explica qué tecnología usamos y por qué elegimos DeepSeek.

**Why this priority**: Página dedicada para capturar búsquedas long-tail sobre DeepSeek. Alto valor SEO con bajo esfuerzo.

**Independent Test**: Acceder a `/about/technology` y verificar que explica el uso de DeepSeek con contenido optimizado para SEO.

**Acceptance Scenarios**:

1. **Given** un usuario en `/about/technology`, **When** lee la página, **Then** entiende que KiviTools usa DeepSeek para todas sus herramientas de IA.
2. **Given** la página en Google, **When** un crawler la indexa, **Then** encuentra schema.org con información sobre la tecnología usada.
3. **Given** un usuario español, **When** accede a `/sobre/tecnologia`, **Then** ve el contenido en español.

---

### User Story 3 - Homepage DeepSeek Mention (Priority: P2)

Un usuario llega a la homepage de KiviTools y ve una mención sutil de que todas las herramientas están "Powered by DeepSeek AI" en la sección hero o features.

**Why this priority**: Refuerza el mensaje en la página más visitada, pero menos urgente que el footer (que ya cubre todas las páginas).

**Independent Test**: Visitar la homepage y verificar que menciona DeepSeek en el hero o sección de features.

**Acceptance Scenarios**:

1. **Given** un usuario en la homepage, **When** ve la sección hero, **Then** hay una mención de "Powered by DeepSeek" o similar.
2. **Given** el texto de DeepSeek, **When** el usuario hace clic, **Then** navega a `/about/technology` para más información.

---

### Edge Cases

- ¿Qué pasa si DeepSeek cambia de nombre o cierra? → El badge es fácil de actualizar/remover
- ¿Qué pasa si DeepSeek tiene mala prensa? → Monitorear y tener plan de contingencia
- ¿Necesitamos permiso de DeepSeek para usar su nombre/logo? → Uso factual permitido, verificar terms of service

## Requirements _(mandatory)_

### Functional Requirements

- **FR-001**: Sistema DEBE mostrar badge "Powered by DeepSeek" en el footer de todas las páginas
- **FR-002**: Sistema DEBE crear página `/about/technology` con explicación de stack tecnológico
- **FR-003**: Sistema DEBE crear URL alias español `/sobre/tecnologia` para la página de tecnología
- **FR-004**: Sistema DEBE incluir schema.org SoftwareApplication en la página de tecnología
- **FR-005**: Sistema DEBE mencionar DeepSeek en la homepage (hero o features section)
- **FR-006**: Badge y página DEBEN estar traducidos en español e inglés
- **FR-007**: Sistema DEBE añadir meta tags optimizados para keywords de DeepSeek

### Non-Functional Requirements

- **NFR-001**: Badge no debe afectar el tiempo de carga (SVG inline o imagen optimizada)
- **NFR-002**: Página de tecnología debe cargar en menos de 2 segundos

### Key Entities

- **Badge**: Componente visual con logo DeepSeek + texto "Powered by DeepSeek"
- **Technology Page**: Página estática con contenido SEO sobre el stack

## Success Criteria _(mandatory)_

### Measurable Outcomes

- **SC-001**: Badge visible en footer de todas las páginas (100% cobertura)
- **SC-002**: Página `/about/technology` indexada por Google en 2 semanas
- **SC-003**: URL española `/sobre/tecnologia` funciona sin errores 404
- **SC-004**: Búsqueda "site:kivitools.com deepseek" retorna resultados en 4 semanas
- **SC-005**: Lighthouse score de página de tecnología ≥ 90

## Assumptions

- Usar el nombre "DeepSeek" de forma factual está permitido (no es trademark violation)
- Los usuarios que buscan herramientas DeepSeek tienen alta intención de uso
- DeepSeek seguirá siendo relevante y bien visto en la comunidad AI

## Out of Scope

- ❌ NO crear nuevas herramientas específicas para DeepSeek (prompt generator, etc.)
- ❌ NO crear plataforma `/deepseek/` con hub de herramientas
- ❌ NO modificar las herramientas existentes (solo branding)
- ❌ NO integrar con API pública de DeepSeek (ya usamos su modelo internamente)
