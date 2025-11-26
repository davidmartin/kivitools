# Data Model: Cookie Policy & Consent Banner

**Feature**: 004-cookie-policy  
**Date**: 2025-11-26

## Entities

### CookiePreferences

Representa las preferencias de consentimiento de cookies del usuario.

| Field       | Type             | Default | Description                                                                |
| ----------- | ---------------- | ------- | -------------------------------------------------------------------------- |
| essential   | `true` (literal) | `true`  | Siempre true, no editable. Cookies necesarias para funcionamiento.         |
| analytics   | `boolean`        | `false` | Consentimiento para Google Analytics.                                      |
| advertising | `boolean`        | `false` | Consentimiento para Google AdSense.                                        |
| consentDate | `number`         | -       | Timestamp Unix (ms) del momento del consentimiento.                        |
| version     | `string`         | `"1.0"` | Versión de la política. Si cambia, se invalida el consentimiento anterior. |

### ConsentState

Estado derivado del consentimiento para la UI.

| Field        | Type      | Description                                                      |
| ------------ | --------- | ---------------------------------------------------------------- |
| hasConsented | `boolean` | Si el usuario ha tomado una decisión (true si aceptó o rechazó). |
| isExpired    | `boolean` | Si han pasado más de 12 meses desde consentDate.                 |
| needsRenewal | `boolean` | Si la versión de política cambió o expiró.                       |

## Storage

### localStorage Key: `kivi_cookie_preferences`

```json
{
  "essential": true,
  "analytics": false,
  "advertising": false,
  "consentDate": 1732636800000,
  "version": "1.0"
}
```

### Cookie: `kivi_consent`

- **Value**: `1` (si ha dado consentimiento) o no existe
- **Purpose**: Detección rápida en SSR para evitar flash del banner
- **Expiration**: 365 días
- **Path**: `/`
- **SameSite**: `Lax`
- **Secure**: `true` (en producción)

## State Transitions

```
┌─────────────────┐
│   NEW VISITOR   │
│ (no consent)    │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│  SHOW BANNER    │
│ preferences=null│
└────────┬────────┘
         │
    ┌────┴────┐
    │         │
    ▼         ▼
┌───────┐ ┌───────────┐
│ACCEPT │ │  REJECT   │
│  ALL  │ │NON-ESSENT.│
└───┬───┘ └─────┬─────┘
    │           │
    ▼           ▼
┌─────────────────────┐
│   CONSENTED USER    │
│hasConsented = true  │
│ (preferences saved) │
└──────────┬──────────┘
           │
           │ After 12 months
           ▼
┌─────────────────────┐
│    EXPIRED USER     │
│ isExpired = true    │
│ needsRenewal = true │
└──────────┬──────────┘
           │
           ▼
┌─────────────────────┐
│    SHOW BANNER      │
│ (renewal required)  │
└─────────────────────┘
```

## Validation Rules

1. **essential** MUST always be `true` - cannot be changed by user
2. **consentDate** MUST be set when user makes any choice
3. **version** MUST match current COOKIE_POLICY_VERSION constant
4. If **version** doesn't match, treat as new visitor
5. If **consentDate** + 365 days < now, treat as expired

## Constants

```typescript
// lib/cookie-consent.ts
export const COOKIE_POLICY_VERSION = "1.0";
export const CONSENT_EXPIRY_DAYS = 365;
export const STORAGE_KEY = "kivi_cookie_preferences";
export const CONSENT_COOKIE_NAME = "kivi_consent";
```

## Default Values

```typescript
export const DEFAULT_PREFERENCES: CookiePreferences = {
  essential: true,
  analytics: false,
  advertising: false,
  consentDate: 0,
  version: COOKIE_POLICY_VERSION,
};
```

## TypeScript Interfaces

```typescript
// types/cookie-consent.ts

export interface CookiePreferences {
  essential: true;
  analytics: boolean;
  advertising: boolean;
  consentDate: number;
  version: string;
}

export interface CookieConsentContextType {
  preferences: CookiePreferences | null;
  hasConsented: boolean;
  isExpired: boolean;
  needsRenewal: boolean;
  acceptAll: () => void;
  rejectNonEssential: () => void;
  updatePreferences: (
    prefs: Partial<
      Omit<CookiePreferences, "essential" | "consentDate" | "version">
    >
  ) => void;
  openPreferences: () => void;
  closePreferences: () => void;
  isPreferencesOpen: boolean;
}
```

## Cookie Categories Detail

| Category        | Cookies        | Provider       | Purpose                              | Duration |
| --------------- | -------------- | -------------- | ------------------------------------ | -------- |
| **Essential**   | `kivi_consent` | KiviTools      | Almacenar decisión de consentimiento | 1 año    |
| **Essential**   | `cf_clearance` | Cloudflare     | Verificación Turnstile (anti-bot)    | Session  |
| **Analytics**   | `_ga`          | Google         | Identificador único de usuario       | 2 años   |
| **Analytics**   | `_ga_*`        | Google         | ID de sesión para GA4                | 2 años   |
| **Analytics**   | `_gid`         | Google         | Identificador de sesión              | 24 horas |
| **Advertising** | Múltiples      | Google AdSense | Personalización de anuncios          | Varios   |

## Migration Strategy

**V1.0 → V1.1 (futuro)**:

- Si `version` en storage es menor que `COOKIE_POLICY_VERSION`
- Mostrar banner de nuevo para renovar consentimiento
- Preservar preferencias anteriores como valores por defecto
