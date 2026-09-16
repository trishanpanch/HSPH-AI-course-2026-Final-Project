---
name: Editorial Workshop
colors:
  surface: '#fff8f0'
  surface-dim: '#dfd9d1'
  surface-bright: '#fff8f0'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f9f3ea'
  surface-container: '#f3ede5'
  surface-container-high: '#ede7df'
  surface-container-highest: '#e7e2d9'
  on-surface: '#1d1b16'
  on-surface-variant: '#594141'
  inverse-surface: '#33302b'
  inverse-on-surface: '#f6f0e7'
  outline: '#8d7070'
  outline-variant: '#e1bebe'
  surface-tint: '#b22738'
  primary: '#81001d'
  on-primary: '#ffffff'
  primary-container: '#a51c30'
  on-primary-container: '#ffb8b8'
  inverse-primary: '#ffb3b3'
  secondary: '#246b45'
  on-secondary: '#ffffff'
  secondary-container: '#aaf3c2'
  on-secondary-container: '#2b714a'
  tertiary: '#5f3300'
  on-tertiary: '#ffffff'
  tertiary-container: '#7f4704'
  on-tertiary-container: '#ffbc81'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#ffdad9'
  primary-fixed-dim: '#ffb3b3'
  on-primary-fixed: '#40000a'
  on-primary-fixed-variant: '#900723'
  secondary-fixed: '#aaf3c2'
  secondary-fixed-dim: '#8fd6a7'
  on-secondary-fixed: '#002110'
  on-secondary-fixed-variant: '#00522f'
  tertiary-fixed: '#ffdcc1'
  tertiary-fixed-dim: '#ffb877'
  on-tertiary-fixed: '#2e1600'
  on-tertiary-fixed-variant: '#6c3a00'
  background: '#fff8f0'
  on-background: '#1d1b16'
  surface-variant: '#e7e2d9'
typography:
  display-hero:
    fontFamily: Playfair Display
    fontSize: 40px
    fontWeight: '600'
    lineHeight: 48px
    letterSpacing: -0.02em
  display-hero-mobile:
    fontFamily: Playfair Display
    fontSize: 30px
    fontWeight: '600'
    lineHeight: 38px
    letterSpacing: -0.01em
  headline-lg:
    fontFamily: Playfair Display
    fontSize: 28px
    fontWeight: '600'
    lineHeight: 36px
    letterSpacing: -0.01em
  headline-md:
    fontFamily: Playfair Display
    fontSize: 22px
    fontWeight: '600'
    lineHeight: 30px
  headline-sm:
    fontFamily: Playfair Display
    fontSize: 18px
    fontWeight: '600'
    lineHeight: 24px
  title-lg:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '600'
    lineHeight: 26px
  body-lg:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 26px
  body-md:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 22px
  body-sm:
    fontFamily: Inter
    fontSize: 13px
    fontWeight: '400'
    lineHeight: 18px
  label-lg:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '500'
    lineHeight: 20px
  label-md:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '500'
    lineHeight: 16px
  label-caps:
    fontFamily: Inter
    fontSize: 11px
    fontWeight: '600'
    lineHeight: 14px
    letterSpacing: 0.06em
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  gutter: 1.5rem
  margin: 2rem
  space-xs: 0.25rem
  space-sm: 0.5rem
  space-md: 1rem
  space-lg: 1.5rem
  space-xl: 2rem
---

## Brand & Style
The design system establishes a focused, tactile, and calm editorial environment tailored for educators adapting primary school learning materials. Drawing inspiration from classic print workshops and high-end editorial tools, it balances scholarly authority with pragmatic utilitarian efficiency. The aesthetic departs from sterile, hyper-saturated software dashboards by honoring the tactile nature of physical paper, classroom drafts, and printed folios.

The emotional tone is unhurried, reassuring, and deeply structured. Teachers manage cognitive overload during lesson planning; therefore, the interface acts as a silent assistant, prioritizing legibility, generous breathing room, structured content hierarchy, and precise tactile cues over visual noise. Subtle borders, warm surfaces, and restrained crimson interactive anchors evoke the discipline of a master typesetter's atelier.

## Colors
The palette is rooted in archival warmth, natural pigments, and high-contrast editorial hierarchy:

- **Canvas & Surfaces:** The default page background is warm paper (`#F7F5F0`), providing an eye-resting substrate. Work surface cards, sheet previews, and editor modules render in crisp white (`#FFFFFF`) to represent tangible paper documents.
- **Typography & Neutral Hierarchy:** Primary text uses an ink-like charcoal (`#242424`). Supporting secondary context, metadata, and instructional hints use slate (`#52525B`). Structural dividers and structural hairline grids use pale stone (`#DDD8CF`), while explicit form control boundaries leverage visible warm mid-gray (`#85817A`).
- **Interactive Accents:** Primary intent is driven by an academic crimson (`#A51C30`), darkening to deep crimson (`#861627`) on hover and active states. Secondary contextual states (such as links or focus anchors) leverage deep blue (`#1D4ED8`) strictly for accessibility and keyboard focus indicators.
- **Pedagogical Status Indicators:** Functional status badges use muted tinted parchment fills with rich contrast text:
  - **Approved / Ready:** Forest green (`#17603B`) on tender botanical mint (`#EDF7F0`).
  - **Needs Attention / In Progress:** Amber brown (`#7A4300`) on warm parchment amber (`#FFF4DE`).
  - **Failed / Error:** Crimson red (`#9B1C20`) on soft wash red (`#FFF0F0`).

## Typography
The typographic rhythm pairs the academic craftsmanship of Playfair Display with the clean, utilitarian legibility of Inter. 

- **Display & Headlines (Playfair Display):** Used deliberately for mastheads, document titles, modal headers, and empty-state orientations. The serif forms convey human care and pedagogical rigor without appearing antiquated.
- **Interface & Mechanics (Inter):** System controls, form labels, data grids, tabular comparisons, student group cards, and interactive steps use Inter. It provides high micro-legibility at 12–14px sizes, ensuring long-form educational texts and instructions can be proofed without fatigue.
- **Micro-Copy & Eyebrows:** The `label-caps` token applies uppercase styling with expanded letter-spacing to subheadings, step counters, and prototype stamps.

## Layout & Spacing
The layout follows a disciplined fixed-max workspace structure (maximum content canvas of 1280px), centered within the ambient warm paper background. This mirrors a physical work table, avoiding edge-to-edge stretching on ultrawide monitors and safeguarding optimal line length for reading.

- **Desktop (1024px+):** A 12-column grid with a fixed 1.5rem (`24px`) gutter and minimum 2rem (`32px`) margins. Sidebar navigation or worksheet preview panels occupy stable 4- or 5-column tracks, while the adaptation workspace takes the remaining width.
- **Tablet (768px – 1023px):** Collapses to an 8-column grid with 1.25rem (`20px`) gutters and 1.5rem (`24px`) canvas margins. Side-by-side inspection panes transition into stacked or tabbed panels.
- **Mobile (<768px):** A single 4-column flow with 1rem (`16px`) gutters and margins. Focus narrows onto single-task step completion.
- **Vertical Spacing Cadence:** Rhythms adhere to a 4px sub-grid, with standard component padding sitting comfortably at `0.75rem` (inputs/buttons), `1.5rem` (cards), and `2rem` to `2.5rem` (section separations).

## Elevation & Depth
In alignment with its paper-like editorial identity, this system replaces dramatic drop shadows with physical surface transitions and hairline borders:

- **Flat Substrate Layering:** The primary depth mechanic uses color separation. The canvas is warm paper (`#F7F5F0`), elevated work areas are pure white (`#FFFFFF`), and nested modules (e.g., student tier containers, prompt inputs) use soft off-white (`#FAF8F5`).
- **Physical Borders:** Elements are bounded by a clean `1px solid #DDD8CF` border. Active or interactive containers leverage `#85817A` to declare actionable intent.
- **Restrained Ambient Shadow:** Floating panels, dropdown menus, and active modal overlays employ an archival ambient shadow: `0 4px 16px -2px rgba(36, 36, 36, 0.06), 0 1px 2px rgba(36, 36, 36, 0.04)`.
- **Keyboard & Selection Focus:** Highly visible `2px solid #1D4ED8` ring with a `2px` white offset, ensuring accessibility compliance across every interactive control.

## Shapes
Shapes express the tactile quality of high-grade cardstock and stationery:

- **Interactive Controls:** Buttons, text fields, selects, and status chips apply an exact `8px` (`0.5rem`) corner radius. This softens the interface without feeling playful or childlike.
- **Major Cards & Sheet Folios:** Structural worksheet panels, modal dialogs, and workspace cards use a gentle `12px` (`0.75rem`) corner radius.
- **Pill Badges:** Metadata stamps (including the prototype marker) use fully pill-rounded contours (`9999px`) to create distinction from rectangular inputs.

## Components

### 1. Primary & Secondary Buttons
- **Primary:** Solid `#A51C30` background, `#FFFFFF` text, `8px` radius, `0.625rem 1.25rem` padding, `label-lg` font. Hover shifts to `#861627`. Active state scales subtly down (`scale(0.98)`).
- **Secondary / Outline:** White `#FFFFFF` background, `#85817A` border, `#242424` text. Hover shifts border to `#242424` with background `#FAF8F5`.
- **Ghost / Tertiary:** No border, transparent background, `#52525B` text. Hover yields `#DDD8CF` background tint with `#242424` text.

### 2. Form Inputs & Textareas
- **Text Inputs & Dropdowns:** Pure white background, `1px solid #85817A`, `8px` radius, `0.625rem 0.875rem` padding, `#242424` body text. Placeholder text styled in `#85817A`.
- **Focus State:** Border transitions to `#1D4ED8` with a `2px` focus ring offset.
- **Prompt / Adaptation Input Box:** A specialized rich card surface with an internal action bar docked at the bottom right.

### 3. Five-Step Progress Stepper
- **Steps:** `Worksheet` -> `Groups` -> `Plan` -> `Review` -> `Download`.
- **Layout:** Horizontal layout connected by a `1px` stone (`#DDD8CF`) midline.
- **Completed Step:** Circle filled with `#17603B`, containing a white checkmark, caption in `#242424`.
- **Active Step:** Circle filled with `#A51C30`, white numerical counter, bold `#242424` label, subtle under-dash anchor.
- **Upcoming Step:** Circle bordered in `#DDD8CF`, `#FAF8F5` background, slate `#52525B` number and caption.

### 4. Chips & Status Badges
- **Approved Chip:** `#EDF7F0` fill, `1px solid #17603B20`, `#17603B` text, `label-md` weight.
- **Needs Attention Chip:** `#FFF4DE` fill, `1px solid #7A430020`, `#7A4300` text.
- **Error / Failed Chip:** `#FFF0F0` fill, `1px solid #9B1C2020`, `#9B1C20` text.
- **Class Prototype Badge:** Compact pill container, `#FAF8F5` background, `1px solid #DDD8CF`, `#52525B` text in `label-caps`, accompanied by a tiny `6px` crimson accent dot.

### 5. Selection Controls (Checkboxes & Radios)
- **Checkbox:** `18px x 18px` square, `4px` radius, `1.5px solid #85817A`. When checked: `#A51C30` background, pure white check icon.
- **Radio Button:** `18px x 18px` circle, `1.5px solid #85817A`. When checked: `#A51C30` border with a `#A51C30` center pip.

### 6. Cards & Folios
- **Worksheet Card:** Pure `#FFFFFF` card, `12px` radius, `1px solid #DDD8CF`, generous `1.5rem` internal padding. Features an optional paper-cut header dividing source material from adaptive suggestions.
- **Student Tier Group Card:** Differentiated sub-containers using a `#FAF8F5` background, labeled with an editorial serif heading (`headline-sm`) for ability groups (e.g., *Tier 1 — Core Support*, *Tier 2 — Advanced Extension*).