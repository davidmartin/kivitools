# Feature Specification: Hero Tool Search with Auto-Create

**Feature Branch**: `016-hero-tool-search`  
**Created**: 2024-12-04  
**Status**: Draft  
**Input**: User description: "Añadir buscador en hero para buscar entre tools propias y de comunidad, con opción de crear tool automática si no existe"

## User Scenarios & Testing _(mandatory)_

### User Story 1 - Search and Find Existing Tool (Priority: P1)

Un usuario llega a la home de KiviTools buscando una herramienta específica. En lugar de navegar por plataformas, escribe directamente lo que necesita en el buscador del hero y encuentra la herramienta que buscaba.

**Why this priority**: Este es el caso de uso principal que mejora significativamente la experiencia de descubrimiento de herramientas. Un buscador funcional añade valor inmediato sin necesidad de la funcionalidad de auto-crear.

**Independent Test**: Puede probarse completamente buscando términos como "tiktok script" o "instagram bio" y verificando que aparecen resultados relevantes. Entrega valor inmediato de navegación mejorada.

**Acceptance Scenarios**:

1. **Given** un usuario en la página principal, **When** escribe "tiktok script" en el buscador, **Then** ve resultados con herramientas relacionadas como "Script Writer" de TikTok
2. **Given** un usuario en la página principal, **When** escribe "bio instagram" en el buscador, **Then** ve el "Bio Generator" de Instagram en los primeros resultados
3. **Given** un usuario viendo resultados de búsqueda, **When** hace clic en una herramienta, **Then** navega directamente a la página de esa herramienta
4. **Given** un usuario escribiendo en el buscador, **When** escribe al menos 2 caracteres, **Then** ve resultados en tiempo real sin necesidad de presionar Enter

---

### User Story 2 - Browse Combined Tool Catalog (Priority: P1)

Un usuario quiere explorar todas las herramientas disponibles (oficiales y de la comunidad) desde un único punto de acceso en el hero, sin tener que navegar entre secciones separadas.

**Why this priority**: La combinación de herramientas oficiales y de comunidad en una única búsqueda establece la base para el ecosistema de herramientas y aumenta el valor percibido de la plataforma.

**Independent Test**: Puede probarse con una búsqueda genérica que devuelva tanto tools oficiales como de comunidad, verificando que ambas se muestran con indicadores visuales claros.

**Acceptance Scenarios**:

1. **Given** un usuario buscando "generator", **When** existen herramientas oficiales y de comunidad con ese término, **Then** ve ambos tipos en los resultados con indicadores visuales distintivos (badge "Official" vs "Community")
2. **Given** un usuario viendo resultados mixtos, **When** observa una herramienta oficial, **Then** ve un badge/indicador que la distingue de las herramientas de comunidad
3. **Given** un usuario viendo resultados mixtos, **When** observa una herramienta de comunidad, **Then** ve el nombre del autor que la creó

---

### User Story 3 - Auto-Create Tool from Search (Priority: P2)

Un usuario busca algo específico que no existe ni como herramienta oficial ni de comunidad. Al final de los resultados (o cuando no hay resultados), ve una opción para crear automáticamente una herramienta basada en su búsqueda.

**Why this priority**: Esta funcionalidad depende de P1 (búsqueda funcionando) y añade un valor diferenciador significativo, pero es más compleja de implementar. Permite que el catálogo crezca orgánicamente basado en demanda real.

**Independent Test**: Puede probarse buscando algo muy específico que no exista, haciendo clic en "Crear herramienta" y verificando que se genera la herramienta con el prompt basado en la búsqueda.

**Acceptance Scenarios**:

1. **Given** un usuario que busca "conversor de emojis a texto", **When** no hay resultados o muy pocos, **Then** ve una opción prominente "¿No encuentras lo que buscas? Crea esta herramienta" al final de la lista
2. **Given** un usuario autenticado que hace clic en "Crear herramienta", **When** confirma la creación, **Then** el sistema genera automáticamente una herramienta de comunidad con el nombre y descripción basados en la búsqueda
3. **Given** un usuario NO autenticado que hace clic en "Crear herramienta", **When** intenta crear, **Then** es redirigido al login con el contexto de búsqueda preservado para continuar después
4. **Given** un usuario que acaba de crear una herramienta automática, **When** la creación termina, **Then** es redirigido a su nueva herramienta lista para usar

---

### User Story 4 - Search Experience Polish (Priority: P3)

Un usuario tiene una experiencia de búsqueda fluida y agradable, con feedback visual durante la carga, resultados instantáneos, y la capacidad de navegar los resultados con el teclado.

**Why this priority**: Mejoras de UX que elevan la experiencia pero no son críticas para el funcionamiento básico.

**Independent Test**: Puede probarse navegando resultados con flechas del teclado, verificando loading states, y confirmando que la búsqueda se siente instantánea.

**Acceptance Scenarios**:

1. **Given** un usuario escribiendo en el buscador, **When** hay una búsqueda en progreso, **Then** ve un indicador de carga sutil (spinner o skeleton)
2. **Given** un usuario con resultados visibles, **When** presiona las flechas arriba/abajo, **Then** puede navegar entre resultados y Enter abre el seleccionado
3. **Given** un usuario con el buscador activo, **When** presiona Escape, **Then** el dropdown de resultados se cierra
4. **Given** un usuario en móvil, **When** abre el buscador, **Then** la experiencia está optimizada para pantallas táctiles

---

### Edge Cases

- ¿Qué sucede cuando la búsqueda devuelve más de 20 resultados? → Mostrar los primeros 10 con opción "Ver más resultados"
- ¿Cómo se maneja una búsqueda vacía o solo espacios? → No mostrar resultados, mantener placeholder con sugerencias
- ¿Qué pasa si la API de búsqueda falla? → Mostrar mensaje de error amigable con opción de reintentar
- ¿Cómo se comporta con términos muy cortos (1 carácter)? → Requerir mínimo 2 caracteres para iniciar búsqueda
- ¿Qué sucede si un usuario crea una herramienta con nombre ofensivo/inapropiado? → Las herramientas auto-creadas pasan por moderación pendiente (status: "pending")
- ¿Qué pasa si hay caracteres especiales en la búsqueda? → Sanitizar input y buscar por términos normalizados

## Requirements _(mandatory)_

### Functional Requirements

- **FR-001**: Sistema DEBE mostrar un campo de búsqueda prominente en el hero de la página principal
- **FR-002**: Sistema DEBE buscar en tiempo real mientras el usuario escribe (debounce de 300ms)
- **FR-003**: Sistema DEBE buscar tanto en herramientas oficiales (del código) como en herramientas de comunidad (base de datos). Para comunidad: mostrar solo herramientas "approved", más las propias del usuario autenticado aunque estén "pending"
- **FR-004**: Sistema DEBE mostrar resultados combinados con distinción visual entre oficial y comunidad
- **FR-005**: Sistema DEBE ordenar resultados por relevancia (match exacto en nombre > match parcial en nombre > match en descripción)
- **FR-006**: Sistema DEBE mostrar opción "Crear esta herramienta" de forma prominente cuando hay menos de 3 resultados, y de forma sutil al final de la lista cuando hay 3 o más resultados
- **FR-007**: Sistema DEBE permitir crear herramienta automática basada en el término de búsqueda
- **FR-008**: Sistema DEBE preservar el contexto de búsqueda si el usuario necesita autenticarse antes de crear
- **FR-009**: Sistema DEBE mostrar loading state durante la búsqueda
- **FR-010**: Sistema DEBE soportar navegación por teclado (flechas, Enter, Escape)
- **FR-011**: Sistema DEBE cerrar el dropdown de resultados al hacer clic fuera
- **FR-012**: Sistema DEBE ser responsive y funcionar correctamente en móvil
- **FR-013**: Sistema DEBE mostrar el nombre del autor en herramientas de comunidad
- **FR-014**: Sistema DEBE mostrar badge "Official" en herramientas oficiales

### Key Entities

- **Search Query**: El término de búsqueda ingresado por el usuario, longitud mínima 2 caracteres
- **Official Tool**: Herramientas predefinidas del sistema, con plataforma, nombre, descripción, icono y URL
- **Community Tool**: Herramientas creadas por usuarios, almacenadas con status, autor, plataforma, slug
- **Search Result**: Objeto unificado que representa un resultado (sea oficial o comunidad) con tipo, relevancia, y metadatos

## Success Criteria _(mandatory)_

### Measurable Outcomes

- **SC-001**: Usuarios pueden encontrar herramientas relevantes en menos de 3 segundos desde que empiezan a escribir
- **SC-002**: 80% de búsquedas con términos comunes devuelven al menos 1 resultado relevante en los primeros 3
- **SC-003**: Usuarios pueden navegar desde búsqueda a herramienta en máximo 2 clics (escribir + click resultado)
- **SC-004**: El proceso de auto-crear herramienta se completa en menos de 10 segundos
- **SC-005**: La distinción visual entre herramientas oficiales y de comunidad es comprendida por usuarios sin explicación
- **SC-006**: El buscador mantiene su funcionalidad completa en dispositivos móviles
- **SC-007**: El 50% de usuarios que usan "auto-crear" generan herramientas que permanecen activas (no son eliminadas/reportadas)

## Clarifications

### Session 2024-12-04

- Q: ¿Cuántos resultados se consideran "pocos" para mostrar la opción de crear herramienta? → A: Menos de 3 resultados = prominente, 3+ resultados = sutil al final
- Q: ¿Qué herramientas de comunidad deben aparecer en resultados de búsqueda? → A: Approved + las propias del usuario aunque estén "pending"

## Assumptions

- Las herramientas oficiales se pueden indexar desde el código existente (arrays de tools por plataforma en cada page.tsx)
- La colección "tools" en Appwrite ya existe y contiene herramientas de comunidad con campos: name, description, platform, slug, author_name, status
- El proceso de auto-crear utilizará el builder existente pero con valores pre-poblados basados en la búsqueda
- El sistema de autenticación existente (AuthContext) se utilizará para verificar usuarios antes de crear herramientas
- La IA se usará para generar el prompt template de herramientas auto-creadas basándose en la descripción del usuario
