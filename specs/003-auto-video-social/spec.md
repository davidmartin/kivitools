# Feature Specification: TikTok Video Prompt Generator & Publisher

**Feature Branch**: `003-auto-video-social`  
**Created**: November 26, 2025  
**Status**: Draft  
**Input**: User description: "quiero crear una parte automatizada para crear videos sobre las tools que tenemos y subirlo a redes sociales automaticamente"

## Overview

This feature provides a streamlined workflow for creating TikTok promotional videos for KiviTools' existing tools. The system generates optimized prompts for Veo 2 (Google AI Studio), allows video upload after manual generation, creates TikTok-optimized captions, and prepares everything for quick manual publishing.

**Simplified Flow:**

1. Admin selects a tool from the list
2. System generates an optimized Veo 2 prompt for that tool
3. Admin copies prompt → generates video in AI Studio (aistudio.google.com/prompts/new_video) → downloads video
4. Admin uploads video back to the system
5. System generates TikTok caption with hashtags
6. Admin reviews/edits caption
7. Admin copies caption + downloads video → publishes manually to TikTok (~10 seconds)

## User Scenarios & Testing _(mandatory)_

### User Story 1 - Generate Veo 2 Prompt for a Tool (Priority: P1)

As a KiviTools administrator, I want to generate an optimized Veo 2 prompt for any tool so that I can create a professional promotional video in VideoFX.

**Why this priority**: This is the core functionality - without the prompt, nothing else works.

**Acceptance Scenarios**:

1. **Given** I'm on the video generator page, **When** I select "TikTok Username Generator" from the dropdown, **Then** the system generates a detailed Veo 2 prompt optimized for vertical TikTok video
2. **Given** a prompt is generated, **When** I view it, **Then** it includes: scene descriptions, text overlays, visual style, duration guidance (8 seconds), and 9:16 aspect ratio instructions
3. **Given** a prompt is displayed, **When** I click "Copy Prompt", **Then** the prompt is copied to my clipboard for use in VideoFX

---

### User Story 2 - Upload Generated Video (Priority: P1)

As a KiviTools administrator, I want to upload the video I created in VideoFX so that the system can generate captions for it.

**Why this priority**: Required step to connect external video generation with caption creation.

**Acceptance Scenarios**:

1. **Given** I have generated a video in VideoFX, **When** I click "Upload Video", **Then** I can select and upload an MP4 file
2. **Given** I upload a video, **When** upload completes, **Then** the video is associated with the selected tool and displayed for preview
3. **Given** I upload an invalid file (wrong format, too long), **When** validation runs, **Then** I see a clear error message explaining the issue

---

### User Story 3 - Generate TikTok Caption (Priority: P1)

As a KiviTools administrator, I want the system to generate an engaging TikTok caption so that I don't have to write promotional copy manually.

**Why this priority**: Captions are essential for TikTok engagement and completing the publishing workflow.

**Acceptance Scenarios**:

1. **Given** a video is uploaded, **When** the system processes it, **Then** a TikTok-optimized caption is automatically generated
2. **Given** a caption is generated, **When** I view it, **Then** it includes: engaging hook, tool description, call-to-action, relevant hashtags, and tool URL
3. **Given** I want to customize, **When** I edit the caption text, **Then** my changes are saved

---

### User Story 4 - Prepare for TikTok Publishing (Priority: P1)

As a KiviTools administrator, I want everything ready for quick TikTok publishing so that I can post in under 10 seconds.

**Why this priority**: Final step that delivers value - getting content to TikTok quickly.

**Acceptance Scenarios**:

1. **Given** video and caption are ready, **When** I view the publish section, **Then** I see: video preview, caption with copy button, download video button
2. **Given** I click "Copy Caption", **When** clipboard updates, **Then** the full caption with hashtags is copied
3. **Given** I click "Download Video", **When** download completes, **Then** I have the video file ready to upload to TikTok

---

### Edge Cases

- What happens if VideoFX is down or unavailable?
- How does the system handle very similar tools (prevent duplicate/similar prompts)?
- What happens if the uploaded video doesn't match the tool selected?
- How to handle tools that are hard to visualize (abstract concepts)?

## Requirements _(mandatory)_

### Functional Requirements

**Prompt Generation**

- **FR-001**: System MUST generate Veo 2 prompts optimized for 9:16 vertical format
- **FR-002**: System MUST include tool name, key benefits, and visual style in prompts
- **FR-003**: System MUST generate prompts suitable for 8-second videos (Veo 2 limit)
- **FR-004**: System MUST support English and Spanish prompt generation
- **FR-005**: System MUST provide one-click copy for generated prompts

**Video Upload**

- **FR-006**: System MUST accept MP4 video uploads up to 100MB
- **FR-007**: System MUST validate video duration (max 60 seconds for TikTok)
- **FR-008**: System MUST validate video aspect ratio (9:16 preferred, warn if different)
- **FR-009**: System MUST store uploaded videos temporarily for the session

**Caption Generation**

- **FR-010**: System MUST generate TikTok-optimized captions using AI (DeepSeek)
- **FR-011**: System MUST include relevant hashtags (5-10 per caption)
- **FR-012**: System MUST include tool URL (kivitools.com/platform/tool)
- **FR-013**: System MUST allow caption editing before finalizing
- **FR-014**: System MUST provide one-click copy for captions

**Publishing Preparation**

- **FR-015**: System MUST display video preview before publishing
- **FR-016**: System MUST provide video download button
- **FR-017**: System MUST show complete caption with all hashtags
- **FR-018**: System MUST track which tools have had videos created (history)

### Key Entities

- **VideoPrompt**: Generated Veo 2 prompt (tool reference, prompt text, language, created date)
- **UploadedVideo**: Temporarily stored video file (tool reference, file URL, duration, aspect ratio, uploaded date)
- **TikTokCaption**: Generated caption (tool reference, caption text, hashtags array, tool URL, edited flag)
- **WorkflowState**: UI state tracking (current step, selected tool, prompt, video, caption, loading state, error)

## Success Criteria _(mandatory)_

### Measurable Outcomes

- **SC-001**: Prompt generation completes in under 5 seconds
- **SC-002**: Caption generation completes in under 5 seconds
- **SC-003**: Full workflow (select tool → ready to publish) takes under 3 minutes (excluding VideoFX time)
- **SC-004**: Generated captions require edits less than 20% of the time
- **SC-005**: Admin can publish to TikTok in under 10 seconds after workflow completion

## Clarifications

### Session 2025-11-26

- Q: ¿Qué método de generación de video se usará? → A: Veo 2 (Google AI Studio) - generación manual
- Q: ¿Qué plataformas sociales soportar? → A: Solo TikTok inicialmente
- Q: ¿Cuál es el flujo completo? → A: Pantalla única: 1) Seleccionar tool 2) Ver prompt generado para Veo 2 3) Subir video 4) Publicar automáticamente a TikTok
- Q: ¿Revisar caption antes de publicar? → A: Sí, mostrar preview y permitir editar caption antes de publicar
- Q: ¿Cómo publicar en TikTok? → A: Manual - sistema prepara video + caption listos, admin publica en TikTok en 10 segundos

## Assumptions

- Admin has access to Google AI Studio (aistudio.google.com/prompts/new_video) for Veo 2 video generation
- Admin has a TikTok account for publishing
- Videos will be stored temporarily (session-based, not permanent storage)
- Tool information (name, description, URL) is available from existing KiviTools data
- DeepSeek API is available for caption generation (already used in the project)

## Out of Scope

- Automated video generation (requires Veo 2 API access - not available)
- Automated TikTok publishing (requires TikTok API approval - lengthy process)
- Support for Instagram, YouTube, or other platforms (TikTok only for MVP)
- Video editing capabilities
- Scheduling or queue management
- Analytics tracking
- Bulk video generation
