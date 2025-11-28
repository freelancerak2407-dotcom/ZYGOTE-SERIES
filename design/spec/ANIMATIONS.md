# Animation Guidelines (Framer Motion)

## Principles
1.  **Subtle & Professional:** Medical apps should feel stable. Avoid excessive bouncing.
2.  **Informative:** Use motion to guide attention (e.g., progress bars filling, content unlocking).
3.  **Performance:** Animate `opacity` and `transform` only.

## Standard Transitions

### Page Transitions
\`\`\`javascript
const pageVariants = {
  initial: { opacity: 0, y: 10 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -10 },
  transition: { duration: 0.3, ease: "easeOut" }
};
\`\`\`

### Card Hover
\`\`\`javascript
<motion.div whileHover={{ y: -4, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)" }} />
\`\`\`

### Progress Ring (Dashboard)
- Use SVG `stroke-dasharray` and `stroke-dashoffset`.
- Animate `stroke-dashoffset` from `circumference` to `targetValue` over 1.5s ease-out.

### MCQ Reveal
- When an option is selected:
  - If Correct: Flash Green (`#10B981`) background.
  - If Wrong: Flash Red (`#EF4444`) background, then highlight Correct option.
  - Animate Explanation pane sliding down (`height: 'auto'`).
