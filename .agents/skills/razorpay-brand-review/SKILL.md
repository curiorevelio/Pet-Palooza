---
name: razorpay-brand-review
description: Review a design, webpage, component, screenshot, or UI implementation against Razorpay's brand colors and report where color usage conforms or deviates. Use when the user asks to review a design against Razorpay brand colors, check whether UI is on-brand for Razorpay, audit colors vs razorpay.com, compare a palette to Razorpay, or recommend Razorpay-aligned color fixes.
---

# Razorpay Brand Color Review

Review color usage against the current Razorpay palette. Focus on color roles and hierarchy rather than fonts, spacing, layout, or general visual quality.

## When to Use

- Review a design, page, component, mockup, or screenshot against Razorpay colors.
- Check whether an interface is on-brand for Razorpay.
- Audit CSS, Tailwind tokens, design tokens, or computed styles against razorpay.com.
- Recommend replacements for colors that weaken Razorpay brand recognition.

Do not use this skill to restyle the design unless the user also asks for implementation. A review should identify and prioritize changes without silently applying them.

## Reference Palette

These values were verified from the live razorpay.com homepage in June 2026. Treat role as important: a color can belong to the palette but still be misused.

### Core colors

| Role | Hex | Use |
| --- | --- | --- |
| Logo blue | `#3395FF` | Razorpay logo mark and explicit logo-brand moments. Do not recolor the official logo. |
| Primary action blue | `#305EFF` | Primary CTA backgrounds, prominent interactive emphasis, and the dominant product blue. |
| Action hover / deep blue | `#2950DA` | Hover or pressed treatment for primary blue actions and deeper blue emphasis. |
| Navy | `#192839` | Wordmark, headings, and primary text on light surfaces. |
| Deep navy | `#132644` | Dark supporting text or surfaces when stronger depth than `#192839` is needed. |
| White | `#FFFFFF` | Main page background, cards, and text on dark or blue surfaces. |
| Light surface | `#F8FAFC` | Subtle section, card, and secondary surface separation. |
| Pale blue surface | `#ECF1FF` | Soft blue emphasis, selected regions, or brand-tinted backgrounds. |
| Green accent | `#009E5C` | Positive brand emphasis and highlighted words such as finance-platform messaging. |
| Dark green | `#006C3F` | Green text requiring stronger contrast, hover states, and deeper positive emphasis. |
| Bright green support | `#48D08C` | Supporting green accents, borders, and illustrations; not the default CTA color. |

### Supporting colors

| Role | Hex | Use |
| --- | --- | --- |
| Secondary text | `#40566D` | Body or explanatory copy below navy headings. |
| Muted text | `#768EA7` | Captions and tertiary information when contrast remains accessible. |
| Light border | `#DFE3E9` | Dividers and quiet borders on white surfaces. |
| Lime highlight | `#C6F076` | Occasional high-energy highlight or illustration accent; use sparingly. |

Razorpay's live site includes campaign, product, illustration, and semantic colors beyond this list. Do not call a color off-brand solely because it is absent from the core palette when it clearly communicates an error, warning, success state, data series, or product sub-brand. Flag it only when it competes with or replaces a core brand role.

## Review Workflow

### 1. Establish the review target

Identify whether the input is source code, a live page, design tokens, or a screenshot. State any visibility limitation. Review all important states supplied by the user, including hover, selected, disabled, dark mode, and responsive variants when available.

If the user explicitly needs the latest live-site accuracy and the palette may have changed since June 2026, re-extract branding from `https://razorpay.com` before reviewing. Prefer the live site over this snapshot.

### 2. Gather colors actually used

Use the strongest available evidence:

1. **Source code:** inspect CSS variables, theme files, Tailwind configuration, inline styles, SVG fills and strokes, gradients, and component variants. Search for hex, RGB(A), HSL(A), OKLCH, and named colors.
2. **Live page:** inspect computed foreground, background, border, SVG, and interaction-state styles. Distinguish inherited colors from colors visibly rendered.
3. **Screenshot or image:** sample representative solid areas. Mark sampled values as estimates because antialiasing, compression, opacity, shadows, and color profiles alter pixels.

Normalize colors to uppercase six-digit hex where possible. Preserve alpha separately. Ignore fully transparent declarations and duplicate aliases that resolve to the same rendered value.

Create an evidence list that connects each color to its element and role. A raw inventory without usage context cannot determine whether the brand hierarchy is correct.

### 3. Compare with perceptual tolerance

Classify each visible color:

- **Exact:** identical to a reference hex.
- **Near-match:** visually equivalent after rendering. As a practical default, accept up to 8 per-channel RGB difference or a perceptual difference of `Delta E 2000 <= 3`.
- **Related tint or shade:** intentionally derived from a brand color for hover, selection, soft backgrounds, opacity, charts, or illustration. Record it as supporting rather than exact.
- **Off-brand:** not a plausible brand derivative or semantic exception, and used in a role owned by a Razorpay core color.

Compare composited colors when alpha is involved. For example, a translucent `#305EFF` overlay should be compared after compositing it over the actual background, not as an opaque swatch.

Do not treat `#3395FF` and `#305EFF` as interchangeable. The first identifies the logo mark; the second is the current primary CTA blue.

### 4. Evaluate role and hierarchy

Check these questions:

- Does the official logo retain `#3395FF` and `#192839`?
- Do primary actions use `#305EFF`, with `#2950DA` or a close derivative for interaction states?
- Do headings and primary text favor `#192839` on light surfaces?
- Are white and light-grey surfaces dominant enough to preserve Razorpay's clarity?
- Is `#009E5C` used as selective positive emphasis rather than a competing primary-action system?
- Are decorative or semantic colors subordinate to blue, navy, white, and the green accent?
- Do foreground/background pairs preserve readable contrast?

Mention accessibility when a brand-correct pairing still has insufficient contrast. Brand conformance never justifies unreadable text.

### 5. Prioritize deviations

Assign severity:

- **High:** official logo recolored; primary CTA uses a competing hue; dominant page color contradicts the brand; primary text lacks contrast.
- **Medium:** repeated headings, links, borders, or accents use visibly off-brand colors; blue and green roles are confused.
- **Low:** isolated near-misses, subtle tints, decorative colors, or minor consistency issues.

For every deviation, include the observed color, where it appears, the nearest appropriate Razorpay color, and a specific replacement or token change. Do not recommend global replacement when the same observed color serves multiple semantic roles.

## Report Format

Always return this structure:

```markdown
# Razorpay Brand Color Review

## Summary
- Verdict: On-brand / Mostly on-brand / Needs revision
- Scope reviewed: [source, page, component, or screenshot]
- Confidence: High / Medium / Low
- One-sentence assessment

## Palette observed
| Observed color | Usage | Razorpay match | Classification |
| --- | --- | --- | --- |

## Conforming elements
- [Element or role]: [why it conforms]

## Deviations
| Severity | Element or role | Observed | Nearest brand color | Suggested fix |
| --- | --- | --- | --- | --- |

## Recommendations
1. [Highest-impact correction]
2. [Next correction]

## Notes
- [Accessibility, sampling uncertainty, semantic exception, or state coverage]
```

If there are no deviations, keep the Deviations section and write `No material color deviations found.` Do not invent issues to fill the table.

## Example

Input findings:

- Primary button: `#2563EB`
- Headings: `#192839`
- Logo mark: `#3395FF`
- Positive highlight: `#00A862`
- Page background: `#FFFFFF`

Output excerpt:

```markdown
# Razorpay Brand Color Review

## Summary
- Verdict: Mostly on-brand
- Scope reviewed: Checkout hero component CSS
- Confidence: High
- The core navy, logo, and white surface are correct, but the primary action uses a generic blue instead of Razorpay's action blue.

## Conforming elements
- Logo mark uses `#3395FF`, matching the official mark.
- Headings use `#192839`, matching Razorpay's primary text navy.
- `#00A862` is a near-match to the green accent and is acceptable for positive emphasis.

## Deviations
| Severity | Element or role | Observed | Nearest brand color | Suggested fix |
| --- | --- | --- | --- | --- |
| High | Primary CTA background | `#2563EB` | `#305EFF` | Replace the CTA token with `#305EFF`; use `#2950DA` for hover. |

## Recommendations
1. Correct the primary CTA first because it is the strongest recurring brand signal.
2. Keep green limited to positive emphasis so it does not compete with primary actions.
```

## Final Checks

Before reporting:

- Verify every claimed color is tied to evidence from the supplied design.
- Distinguish exact matches, near-matches, derived colors, and semantic exceptions.
- Check color roles, not only hex similarity.
- Include the nearest brand color and an actionable fix for every deviation.
- Keep typography comments limited to context: Razorpay currently uses Inter for body copy and TASA Orbiter Display SemiBold for display text, but typography is outside this color audit.
- Never claim legal brand approval; describe conformance to the observed razorpay.com palette.
