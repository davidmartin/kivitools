# Implementation Plan: Cookie Policy & Consent Banner

**Branch**: `004-cookie-policy` | **Date**: 2025-11-26 | **Spec**: [spec.md](./spec.md)
**Input**: Feature specification from `/specs/004-cookie-policy/spec.md`

## Summary

Implementar un sistema completo de consentimiento de cookies GDPR-compliant usando HeroUI v3 componentes. El sistema incluirá:

1. Banner de consentimiento con diseño modal usando HeroUI Modal
2. Página dedicada `/cookie-policy` con información detallada
3. Context para gestionar preferencias de cookies globalmente
4. Modificación de GoogleAnalytics y AdSense para cargar condicionalmente
5. Traducciones en 6 idiomas (ES, EN, FR, DE, IT, PT)
6. Soporte completo para dark/light mode usando sistema de diseño existente

## Technical Context

**Language/Version**: TypeScript 5.x, Next.js 16.0.1, React 19  
**Primary Dependencies**: @heroui/react v3.0.0-beta.1, Tailwind CSS v4, @iconify/react  
**Storage**: localStorage (cookie preferences), Cookie técnica (consent flag)  
**Testing**: Manual testing (no test framework configured)  
**Target Platform**: Web (SSR + CSR), responsive design  
**Project Type**: Web application (Next.js App Router)  
**Performance Goals**: Banner aparece < 1s, no bloquear FCP  
**Constraints**: Privacy by default, GDPR/ePrivacy compliant, 6 idiomas  
**Scale/Scope**: ~50k monthly users, 100+ tools

## Constitution Check

_GATE: Must pass before Phase 0 research. Re-check after Phase 1 design._

### I. HeroUI-First Component Architecture ✅

- Banner usará `<Modal>` de HeroUI v3
- Switches usarán `<Switch>` de HeroUI v3
- Buttons usarán `<Button>` con `onPress`
- Card en cookie-policy usará `<Card>` compound pattern

### II. Translation-Mandatory Content ✅

- Todas las strings en 6 archivos de locale (`lib/locales/{lang}/legal.ts`)
- Keys: `cookies.banner.*`, `cookies.preferences.*`, `cookies.policy.*`
- Tono cómico/divertido en descripciones

### III. Tool Page Completeness Standard ⚠️ N/A

- Esta feature no es una tool page, es una página legal
- Seguirá patrón de `/privacy-policy` existente

### IV. Performance Budget Enforcement ✅

- Banner NO debe bloquear FCP (carga lazy después de hydration)
- Preferencias en localStorage (acceso síncrono rápido)
- Sin llamadas API adicionales

### V. Platform Integration Completeness ⚠️ N/A

- No es una plataforma nueva
- Solo requiere actualización de footer y legal section

## Project Structure

### Documentation (this feature)

```text
specs/004-cookie-policy/
├── plan.md              # This file
├── research.md          # Phase 0 output
├── data-model.md        # Phase 1 output
├── quickstart.md        # Phase 1 output
├── contracts/           # Phase 1 output
│   └── cookie-consent.ts
└── tasks.md             # Phase 2 output
```

### Source Code (repository root)

```text
app/
├── (legal)/
│   └── cookie-policy/
│       └── page.tsx              # Nueva página de política de cookies
├── components/
│   ├── cookie-banner.tsx              # Banner de consentimiento (Modal)
│   ├── cookie-preferences-modal.tsx   # Modal de preferencias granulares
│   ├── google-analytics.tsx           # Modificar para carga condicional
│   ├── ad-slot.tsx               # Modificar para carga condicional
│   └── footer.tsx                     # Añadir enlace "Configuración de Cookies" + "Política de Cookies"
├── layout.tsx                         # Integrar CookieBanner + CookiePreferencesModal + Context
contexts/
├── CookieConsentContext.tsx      # Nuevo context para gestionar consentimiento
lib/
├── locales/
│   ├── en/legal.ts                    # Añadir traducciones cookies.* + footer.cookieSettings/cookiePolicy
│   ├── es/legal.ts                    # Añadir traducciones cookies.* + footer.cookieSettings/cookiePolicy
│   ├── fr/legal.ts                    # Añadir traducciones cookies.* + footer.cookieSettings/cookiePolicy
│   ├── de/legal.ts                    # Añadir traducciones cookies.* + footer.cookieSettings/cookiePolicy
│   ├── it/legal.ts                    # Añadir traducciones cookies.* + footer.cookieSettings/cookiePolicy
│   └── pt/legal.ts                    # Añadir traducciones cookies.* + footer.cookieSettings/cookiePolicy
```

**Structure Decision**: Next.js App Router structure siguiendo patrones existentes del proyecto. Context en `/contexts`, componentes en `/app/components`, página en route group `(legal)`.

## Complexity Tracking

> No hay violaciones de la Constitution. Todos los gates pasan.
