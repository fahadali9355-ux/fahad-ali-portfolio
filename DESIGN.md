# Design System Specification: The Obsidian Pulse

## 1. Overview & Creative North Star
**Creative North Star: "The Digital Architect’s Atelier"**
This design system moves beyond the standard "dark mode" template to create a high-end, editorial-inspired environment for elite developers. The aesthetic is rooted in "Technological Sophistication"—where the UI feels less like a website and more like a high-performance terminal or a premium physical workspace. 

We break the "template" look through **intentional negative space** and **asymmetric layering**. By treating the screen as a three-dimensional space filled with light and glass, we create a sense of depth that feels architectural rather than decorative. The dot grid background serves as our "blueprint," grounding floating glass elements in a world of precision and logic.

---

## 2. Colors & Surface Hierarchy

### The "No-Line" Rule
Traditional 1px solid borders are prohibited for sectioning. We define boundaries through **tonal transitions** and **chromatic shifts**. Use `surface-container-low` vs. `surface` to designate sections. If a hard line is required for a heading, it is a stylistic choice (like our purple accent underline), not a structural crutch.

### Surface Hierarchy & Nesting
Depth is achieved through "Tonal Layering." We treat the UI as stacked sheets of obsidian and frosted glass.
- **Base Layer:** `surface` (#131318) / `background` (#0a0a0f).
- **Secondary Sectioning:** `surface-container-low`.
- **Primary Interactive Cards:** `surface-container` with glassmorphism modifiers.
- **High-Intensity Callouts:** `surface-container-high`.

### The Glass & Gradient Rule
To provide "soul" to the high-tech aesthetic:
- **Glassmorphism:** Use `bg-white/5` with a `backdrop-blur-md`. This ensures the dot grid background subtly bleeds through, integrating the content into the environment.
- **Signature Gradients:** Main CTAs should utilize a subtle linear gradient from `primary` (#bdc2ff) to `primary-container` (#818cf8) at a 135-degree angle.

---

## 3. Typography
We utilize **Inter** with a heavy focus on tracking (letter-spacing) and line-height to achieve an editorial feel.

*   **Display (Large/Medium):** Used for hero statements. Set to `-0.02em` tracking to feel dense and authoritative.
*   **Headline (Small/Medium):** Used for section headers. These feature the **Signature Underline**: a 4px thick `primary-container` (#818cf8) stroke that spans only 40% of the heading's width, placed 8px below the baseline.
*   **Title (Medium/Small):** For card headings. Always high-contrast (`on-surface`).
*   **Body:** Optimized for readability. Use `body-lg` for intros and `body-md` for general content.
*   **Label:** Used for pill badges and technical metadata. Always uppercase with `+0.05em` tracking for a "system output" feel.

---

## 4. Elevation & Depth

### The Layering Principle
Do not use shadows to create depth; use **Luminance**. 
- A card sitting on `surface` should be `surface-container`. 
- A nested element within that card should be `surface-container-highest`.

### The "Ghost Border" Fallback
Where containment is required for accessibility, use a **Ghost Border**: `outline-variant` (#454653) at **15% opacity**. This provides a hint of structure without interrupting the visual flow.

### Ambient Shadows
For floating elements (Modals/Popovers), use an extra-diffused shadow:
- **Shadow:** `0 20px 40px rgba(0, 0, 0, 0.4)`.
- **Glow:** Add a subtle `primary` glow (2% opacity) to the bottom edge to simulate the reflection of the screen light on a dark surface.

---

## 5. Components

### Buttons
- **Primary (Filled):** `primary-container` background, `on-primary-container` text. Rounded-full (pill). High-contrast and bold.
- **Secondary (Ghost):** No background. Ghost Border (outline-variant @ 20%). Text color `secondary` (#5de6ff). 
- **Tertiary:** Text-only with `label-md` styling. Used for low-priority actions like "Cancel" or "Back."

### Cards
- **The Obsidian Card:** `bg-white/5`, `backdrop-blur-md`, `rounded-2xl`. 
- **Constraint:** No internal dividers. Use a 32px padding (from Spacing Scale) to separate the title from the body.

### Pill Badges (Chips)
- **Technical Badges:** `surface-container-highest` background with a 1px `secondary` (#22d3ee) border at 20% opacity. Text uses `label-sm` in `secondary`.

### Input Fields
- **Styling:** Minimalist bottom-border only or a subtle glass container. 
- **Focus State:** Transition the Ghost Border to 100% opacity `primary`. No "glow" effect—keep it sharp and technical.

### Responsive Touch Targets
All interactive elements (buttons, links, chips) must maintain a minimum hit area of **44x44px**, even if the visual element is smaller.

---

## 6. Do's and Don'ts

### Do:
- **Use the Dot Grid:** Ensure the dot grid background is visible but subtle (5% opacity). It provides the mathematical rhythm the system relies on.
- **Embrace Asymmetry:** Align section headers to the left, but allow card grids to have varied heights (Masonry) or intentional offsets.
- **Vary Typography Weights:** Use `Inter-Bold` for headlines and `Inter-Regular` for body text to create a clear information hierarchy.

### Don't:
- **No Animations:** Per the brief, keep the experience static. Visual interest must come from layout and color, not motion.
- **No Divider Lines:** Never use a `<hr>` or a 1px solid line to separate sections. Use 80px - 120px of vertical white space instead.
- **No Pure Black:** Avoid `#000000`. Use the specified `#0a0a0f` background to allow the glassmorphism and blurs to feel "deep" rather than flat.
- **No Rounded-None:** Avoid sharp 90-degree corners. Even technical elements should use at least the `sm` (0.5rem) rounding to maintain the premium feel.