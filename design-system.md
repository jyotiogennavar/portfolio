# Design System

This document outlines the design system for the portfolio website, including only the styles and tokens actually used in the project.

## Table of Contents

- [Typography](#typography)
- [Colors](#colors)
- [Spacing](#spacing)
- [Border Radius](#border-radius)
- [Components](#components)
- [Animations](#animations)
- [Layout](#layout)
- [Icons](#icons)

---

## Typography

### Font Families

#### Primary Font: Bricolage Grotesque
- **CSS Variable:** `--font-bricolage-grotesque`
- **Usage:** Primary body text, headings, and UI elements
- **Fallback:** `sans-serif`
- **Source:** Google Fonts (Next.js font optimization)
- **Display:** `swap`

### Font Sizes (Used in Project)

| Size | Tailwind Class | Rem | Pixels | Usage Examples |
|------|---------------|-----|--------|----------------|
| Extra Small | `text-xs` | 0.75rem | 12px | Badges, tags, button small size |
| Small | `text-sm` | 0.875rem | 14px | Descriptions, captions, metadata, buttons, card descriptions |
| Base | `text-base` | 1rem | 16px | Body text, blog descriptions |
| Large | `text-lg` | 1.125rem | 18px | Card titles, hero subtitle, quotes |
| Extra Large | `text-xl` | 1.25rem | 20px | Blog post titles, section headings (H3), callout headings |
| 2X Large | `text-2xl` | 1.5rem | 24px | Hero headings (mobile), section headings (H2), CTA headings |
| 3X Large | `text-3xl` | 1.875rem | 30px | MDX H1 (mobile), H2 (tablet) |
| 4X Large | `text-4xl` | 2.25rem | 36px | Page titles, hero headings (desktop), MDX H1 (desktop) |

### Font Weights (Used in Project)

| Weight | Tailwind Class | Usage Examples |
|--------|---------------|----------------|
| Medium | `font-medium` | Navigation links, button text, section labels, table of contents active items |
| Semibold | `font-semibold` | Card titles, blog post titles, section headings (H2, H3, H4), blog headings |
| Bold | `font-bold` | Main headings, hero text, page titles, MDX H1 |

### Line Height (Used in Project)

- **Relaxed:** `leading-relaxed` (1.625) - Used for paragraphs, code blocks, card descriptions
- **Tight:** `leading-tight` (1.25) - Used for headings in MDX components
- **Default:** `leading-7` - Used for MDX paragraphs

### Letter Spacing (Used in Project)

- **Wide:** `tracking-wide` - Used for uppercase section labels
- **Tight:** `tracking-tight` - Used for headings in MDX components

### Text Styles (Used in Project)

- **Uppercase:** Used for section labels (e.g., "THINGS I AM REALLY GOOD AT", "TECHNOLOGIES I WORK WITH")
- **Italic:** Used for quotes, blockquotes, and emphasis
- **Underline:** Used for links with hover effects
- **Decoration:** `decoration-pink-500 decoration-wavy` - Used for blog post links
- **Decoration Dotted:** `decoration-dotted underline-offset-4` - Used for MDX links

---

## Colors

### Color System

The color system uses HSL (Hue, Saturation, Lightness) values defined as CSS custom properties, supporting both light and dark modes.

### Semantic Colors (Used in Project)

#### Light Mode

| Color | HSL Value | Usage |
|-------|-----------|-------|
| **Background** | `hsl(24 9.8% 98%)` | Main page background |
| **Foreground** | `hsl(222, 10%, 6%)` | Primary text color |
| **Primary** | `hsl(222.2 47.4% 11.2%)` | Primary buttons, links, focus states |
| **Primary Foreground** | `hsl(210 40% 98%)` | Text on primary background |
| **Secondary** | `hsl(210 40% 96.1%)` | Secondary backgrounds, tag backgrounds |
| **Secondary Foreground** | `hsl(222.2 47.4% 11.2%)` | Text on secondary background |
| **Muted** | `hsl(210 40% 96.1%)` | Muted backgrounds, code blocks, blockquotes |
| **Muted Foreground** | `hsl(215.4 16.3% 46.9%)` | Muted text, descriptions, metadata |
| **Accent** | `hsl(210 40% 96.1%)` | Hover states, ghost buttons |
| **Accent Foreground** | `hsl(222.2 47.4% 11.2%)` | Text on accent background |
| **Card** | `hsl(0 0% 100%)` | Card backgrounds |
| **Card Foreground** | `hsl(222, 10%, 6%)` | Text on cards |
| **Border** | `hsl(214.3 31.8% 91.4%)` | Borders, dividers |
| **Input** | `hsl(214.3 31.8% 91.4%)` | Input borders |
| **Ring** | `hsl(222, 10%, 6%)` | Focus rings |

#### Dark Mode

| Color | HSL Value | Usage |
|-------|-----------|-------|
| **Background** | `hsl(24, 9.8%, 3.9%)` | Main page background |
| **Foreground** | `hsl(210 40% 98%)` | Primary text color |
| **Primary** | `hsl(210 40% 98%)` | Primary buttons, links |
| **Primary Foreground** | `hsl(222.2 47.4% 11.2%)` | Text on primary background |
| **Secondary** | `hsl(217.2 32.6% 17.5%)` | Secondary backgrounds |
| **Secondary Foreground** | `hsl(210 40% 98%)` | Text on secondary background |
| **Muted** | `hsl(217.2 32.6% 17.5%)` | Muted backgrounds |
| **Muted Foreground** | `hsl(215 20.2% 65.1%)` | Muted text, descriptions |
| **Accent** | `hsl(217.2 32.6% 17.5%)` | Hover states |
| **Accent Foreground** | `hsl(210 40% 98%)` | Text on accent background |
| **Card** | `hsl(222, 10%, 6%)` | Card backgrounds |
| **Card Foreground** | `hsl(210 40% 98%)` | Text on cards |
| **Border** | `hsl(217.2 32.6% 17.5%)` | Borders, dividers |
| **Input** | `hsl(217.2 32.6% 17.5%)` | Input borders |
| **Ring** | `hsl(212.7 26.8% 83.9%)` | Focus rings |

### Stone Color Palette (Used Extensively)

| Shade | Light Mode Usage | Dark Mode Usage |
|-------|------------------|-----------------|
| **Stone 50** | `bg-stone-50` - Hover backgrounds | - |
| **Stone 100** | - | `text-stone-100` - Light text |
| **Stone 200** | `bg-stone-200` - Gradient backgrounds, hover borders | - |
| **Stone 300** | - | `text-stone-300` - Medium text, hover text |
| **Stone 400** | `text-stone-400` - Secondary text, icons | `text-stone-400` - Secondary text, icons |
| **Stone 500** | `text-stone-500` - Muted text, labels, footer text | `text-stone-500` - Muted text, labels |
| **Stone 600** | `text-stone-600` - Medium text, hover states | - |
| **Stone 700** | `bg-stone-700` - Gradient backgrounds (dark mode) | `bg-stone-700` - Hover backgrounds, gradient backgrounds |
| **Stone 800** | `text-stone-800` - Dark text, footer border | `border-stone-800` - Footer border, hover borders |
| **Stone 900** | `text-stone-900` - Very dark text | `bg-stone-900` - Hover backgrounds |

### Stone Color Palette (Used in Navigation)

| Shade | Light Mode Usage | Dark Mode Usage |
|-------|------------------|-----------------|
| **Stone 50** | `bg-stone-50` - Project card hover | - |
| **Stone 100** | - | `text-stone-100` - Light text |
| **Stone 300** | - | `text-stone-300` - Navigation text, hover text |
| **Stone 500** | `text-stone-500` - Section labels | - |
| **Stone 600** | `text-stone-600` - Navigation text | - |
| **Stone 900** | `text-stone-900` - Navigation hover | - |

### Special Colors (Used in Project)

#### Pink
- **Pink 500:** `decoration-pink-500` - Used for blog post link underlines (wavy decoration)

#### Amber (Callout Boxes)
- **Amber 200:** `text-amber-200` - Callout text (dark mode)
- **Amber 400:** `text-amber-400` - Callout icons (dark mode)
- **Amber 600:** `text-amber-600` - Callout icons (light mode)
- **Amber 700:** `text-amber-700` - Callout text (light mode)
- **Amber 800:** `text-amber-800`, `border-amber-800`, `bg-amber-800` - Callout headings, borders (light mode)
- **Amber 50:** `bg-amber-50` - Callout background (light mode)
- **Amber 950:** `bg-amber-950/20` - Callout background (dark mode)

#### Blue (MoreAbout Component)
- **Blue 200:** `border-blue-200` - Border (light mode)
- **Blue 300:** `text-blue-300` - Text (dark mode)
- **Blue 700:** `text-blue-700` - Text (light mode)
- **Blue 800:** `border-blue-800` - Border (dark mode)
- **Blue 50:** `bg-blue-50` - Background (light mode)
- **Blue 950:** `bg-blue-950/20` - Background (dark mode)

#### Gray (Blog Text)
- **Gray 300:** `text-gray-300` - Blog text (dark mode)
- **Gray 700:** `text-gray-700` - Blog text (light mode)

---

## Spacing

### Spacing Scale (Used in Project)

Based on Tailwind's default spacing scale (0.25rem increments):

| Size | Rem | Pixels | Tailwind Class | Usage Examples |
|------|-----|--------|---------------|----------------|
| 2 | 0.5rem | 8px | `gap-2`, `p-2`, `px-2`, `py-2`, `mt-2`, `mb-2` | Icon gaps, button groups, small spacing |
| 3 | 0.75rem | 12px | `gap-3`, `px-3` | Button padding (small), footer spacing |
| 4 | 1rem | 16px | `gap-4`, `p-4`, `px-4`, `py-4`, `mt-4`, `mb-4` | Card padding, grid gaps, section spacing |
| 6 | 1.5rem | 24px | `gap-6`, `p-6`, `px-6`, `py-6`, `mt-6`, `mb-6` | Card content padding, blog spacing, icon-text gaps |
| 8 | 2rem | 32px | `gap-8`, `p-8`, `px-8`, `py-8`, `mt-8`, `mb-8` | Hero section margins, CTA padding, MDX spacing |
| 10 | 2.5rem | 40px | `mt-10`, `mb-10` | Section spacing, MDX H2 spacing |
| 16 | 4rem | 64px | `mt-16`, `mb-16` | Footer top margin |

### Common Spacing Patterns

- **Section Spacing:** `mt-10` (2.5rem / 40px) - Vertical spacing between sections
- **Card Padding:** `p-4` (1rem / 16px) - Standard card padding
- **Card Content Padding:** `p-6` (1.5rem / 24px) - CardHeader/CardContent padding
- **Grid Gaps:** `gap-2`, `gap-4`, `gap-6`, `gap-8` - Spacing between grid items
- **Container Padding:** `px-4` (1rem / 16px) - Horizontal padding for main container
- **Navigation Padding:** `px-6 py-6` - Navbar padding
- **Button Gaps:** `gap-2`, `gap-3` - Spacing between button elements
- **Icon Gaps:** `gap-2`, `gap-3`, `gap-6` - Spacing between icons and text

---

## Border Radius

### Radius Values (Used in Project)

| Size | Value | Tailwind Class | Usage Examples |
|------|-------|---------------|----------------|
| **Small** | `0.25rem` (4px) | `rounded-sm` | Cards, badges, tags |
| **Medium** | `0.375rem` (6px) | `rounded-md` | Buttons, theme toggle, code blocks |
| **Large** | `0.5rem` (8px) | `rounded-lg` | Cards, images, code blocks, blog articles |
| **Extra Large** | `0.75rem` (12px) | `rounded-xl` | Cards, images, profile picture |
| **Full** | `9999px` | `rounded-full` | Social link buttons |

### Border Radius Usage

- **Cards:** `rounded-sm`, `rounded-lg`, `rounded-xl` depending on context
- **Buttons:** `rounded-md` (default), `rounded-full` (social links)
- **Images:** `rounded-xl`, `rounded-lg`
- **Badges/Tags:** `rounded-sm`, `rounded-lg`
- **Code Blocks:** `rounded-lg`

---

## Components

### Button

#### Variants (Used in Project)

| Variant | Classes | Usage |
|---------|---------|-------|
| **Default** | `bg-primary text-primary-foreground hover:bg-primary/90` | Primary actions (Contact Me) |
| **Outline** | `border border-input bg-background hover:bg-accent hover:text-accent-foreground` | Secondary actions (Resume, GitHub, Coming Soon) |
| **Ghost** | `hover:bg-accent hover:text-accent-foreground` | Social links in footer |
| **Secondary** | `bg-secondary text-secondary-foreground hover:bg-secondary/80` | Badge variant |

#### Sizes (Used in Project)

| Size | Height | Padding | Font Size | Usage |
|------|--------|---------|-----------|-------|
| **Default** | `h-9` (36px) | `px-4 py-2` | `text-sm` | Standard buttons |
| **Small** | `h-8` (32px) | `px-3` | `text-xs` | Project buttons, social links |

#### Button States (Used in Project)

- **Hover:** `hover:opacity-80`, `hover:bg-stone-100 dark:hover:bg-stone-800` - Opacity/background changes
- **Focus:** `focus-visible:ring-1 focus-visible:ring-ring` - Focus ring
- **Disabled:** `disabled:opacity-50 disabled:pointer-events-none` - Disabled state
- **Active:** `active:scale-90` - Button press effect (theme toggle)

### Card

#### Structure (Used in Project)

- **Container:** `rounded-xl border bg-card text-card-foreground`
- **Padding:** `p-4` (standard), `p-6` (with CardHeader/CardContent)
- **Border:** Uses `border` color token

#### Card Components (Used in Project)

| Component | Classes | Usage |
|-----------|---------|-------|
| **CardTitle** | `font-semibold leading-none tracking-tight` | Card title |
| **CardDescription** | `text-sm text-muted-foreground` | Card description text |
| **CardContent** | `p-6` | Card main content |

### Typography Components

#### Headings (Used in Project)

| Element | Mobile | Desktop | Weight | Usage |
|---------|--------|---------|--------|-------|
| **H1** | `text-3xl` | `text-4xl` | `font-bold` | Page titles, hero headings, MDX H1 |
| **H2** | `text-2xl` | `text-3xl` | `font-semibold` | Section headings, MDX H2, CTA headings |
| **H3** | `text-xl` | `text-2xl` | `font-semibold` | Subsection headings, blog post titles, MDX H3, callout headings |
| **H4** | `text-lg` | `text-xl` | `font-semibold` | Minor headings, MDX H4 |

#### Section Labels (Used in Project)

- **Style:** `text-sm text-stone-500 dark:text-stone-400 uppercase tracking-wide font-medium`
- **Usage:** Section headers (e.g., "THINGS I AM REALLY GOOD AT", "PROJECTS", "BLOGS")
- **Icon Size:** `16px` (lucide-react icons with `size={16}`)

#### Body Text (Used in Project)

- **Default:** `text-base` or `text-stone-700 dark:text-stone-300`
- **Leading:** `leading-relaxed` for paragraphs and card descriptions
- **Muted:** `text-stone-600 dark:text-stone-400` or `text-muted-foreground`

### Links (Used in Project)

#### Link Styles

- **Default:** Underline on hover with transition
- **Blog Links:** `hover:underline decoration-pink-500 decoration-wavy transition-colors`
- **Navigation:** `hover:text-stone-600 dark:hover:text-stone-300` with `transition-colors`
- **MDX Links:** `underline decoration-dotted underline-offset-4 text-primary hover:text-primary/80`
- **External:** Includes `ExternalLink` icon indicator

### Badge (Used in Project)

- **Base:** `inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-semibold`
- **Variants:** `bg-secondary text-secondary-foreground` (tags), `outline` variant
- **Usage:** Blog post tags, tech stack items

---

## Animations

### Framer Motion (Used in Project)

#### Container Variants

```javascript
containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.1,
    },
  },
}
```

#### Item Variants

```javascript
itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      ease: easeOut,
    },
  },
}
```

### Transitions (Used in Project)

#### Duration

- **Standard:** `transition-colors` - Default color transitions
- **Animation Duration:** `0.4s` - Framer Motion animations
- **Stagger Delay:** `0.2s` - Delay between child animations

#### Hover Effects (Used in Project)

- **Opacity:** `hover:opacity-80` - Subtle hover effect on buttons
- **Background:** `hover:bg-stone-100 dark:hover:bg-stone-800` - Background color change
- **Scale:** `active:scale-90` - Button press effect (theme toggle)
- **Transform:** `transition-opacity` - Smooth opacity changes
- **Shadow:** `hover:shadow-md transition-shadow` - Card hover effect

---

## Layout

### Container (Used in Project)

- **Max Width:** `700px` (`max-w-[700px]`) - Main content container
- **Max Width (Blog):** `max-w-3xl` - Blog post container
- **Horizontal Padding:** `px-4` (1rem / 16px) - Standard container padding
- **Horizontal Padding (Blog):** `px-2` - Blog post padding
- **Centering:** `mx-auto` - Centers container horizontally

### Grid System (Used in Project)

#### Responsive Grids

- **1 Column (Mobile):** `grid-cols-1`
- **2 Columns (Tablet+):** `md:grid-cols-2` - Used for projects, resource grids
- **3 Columns (Desktop):** `md:grid-cols-3` - Used for skills cards
- **4 Columns (Large Desktop):** `lg:grid-cols-4` - Used for blog post layout

#### Grid Gaps (Used in Project)

- **Small:** `gap-2` (0.5rem / 8px) - Skills grid
- **Medium:** `gap-4` (1rem / 16px) - Projects grid, blog grid
- **Large:** `gap-6` (1.5rem / 24px) - Blog post layout
- **Extra Large:** `gap-8` (2rem / 32px) - Blog post layout

### Flexbox Patterns (Used in Project)

- **Navigation:** `flex items-center justify-between`
- **Card Layout:** `flex flex-col` with `flex-1` for content
- **Button Groups:** `flex gap-2` or `flex gap-3`
- **Icon + Text:** `flex items-center gap-2` or `gap-3` or `gap-6`
- **Hero Section:** `flex flex-col md:flex-row gap-6 md:gap-8 items-center`

### Responsive Breakpoints (Used in Project)

Based on Tailwind's default breakpoints:

| Breakpoint | Min Width | Usage Examples |
|------------|-----------|----------------|
| **md** | 768px | Tablets, small desktops - Most common breakpoint |
| **lg** | 1024px | Desktops - Blog post layout |

### Common Responsive Patterns (Used in Project)

- **Text Alignment:** `text-center md:text-left`
- **Text Size:** `text-2xl md:text-4xl`, `text-3xl md:text-4xl`, `text-xl md:text-2xl`, `text-lg md:text-xl`
- **Flex Direction:** `flex-col md:flex-row`
- **Justify Content:** `justify-center md:justify-start`
- **Grid Columns:** `grid-cols-1 md:grid-cols-2`, `grid-cols-1 md:grid-cols-3`, `grid-cols-1 lg:grid-cols-4`
- **Items Alignment:** `items-center md:items-center`

---

## Icons

### Icon Library (Used in Project)

- **Primary:** Lucide React (`lucide-react`)
- **Size:** Typically `w-4 h-4` (16px) or `size={16}` for section headers
- **Color:** Inherits text color or uses `text-stone-500 dark:text-stone-400`

### Common Icons (Used in Project)

| Icon | Usage |
|------|-------|
| `Sparkle` | Skills section |
| `Puzzle` | Projects section |
| `Sprout` | Blogs section |
| `Telescope` | Currently learning section |
| `Wrench` | Tech stack section |
| `Mail` | Contact button |
| `File` | Resume button |
| `Github` | GitHub links |
| `ExternalLink` | External links, resource cards |
| `Linkedin`, `Twitter` | Social links |
| `Info` | Callout boxes (NeedToKnow component) |

### Icon Styling (Used in Project)

- **Default Size:** `w-4 h-4` (16px)
- **Button Icons:** `w-3 h-3` (12px) for small buttons, `w-4 h-4` for default buttons
- **Section Icons:** `size={16}` (16px)
- **Large Icons:** `w-5 h-5` (20px) for blog external links, callout icons
- **Pointer Events:** `[&_svg]:pointer-events-none` - Icons don't capture clicks

---

## Shadows

Currently, the design system uses minimal shadows:
- **Card Hover:** `hover:shadow-md` - Used on resource cards
- Cards and components primarily rely on borders and background colors for depth

---

## Accessibility

### Focus States (Used in Project)

- **Focus Ring:** `focus-visible:ring-1 focus-visible:ring-ring` - Buttons
- **Focus Visible:** Only shows on keyboard navigation
- **Focus Ring (Badge):** `focus:ring-2 focus:ring-ring focus:ring-offset-2`

### Color Contrast

All color combinations meet WCAG AA standards:
- Text on backgrounds maintains sufficient contrast
- Interactive elements have clear hover/focus states

### Semantic HTML

- Proper heading hierarchy (h1 → h2 → h3 → h4)
- Semantic elements (`<nav>`, `<main>`, `<footer>`, `<article>`, `<section>`)
- ARIA labels where appropriate

---

## Dark Mode

### Implementation

- Uses CSS custom properties with `.dark` class
- All colors have light and dark mode variants
- Smooth transitions between modes
- Theme toggle component available

### Color Adaptations

- Backgrounds invert (light ↔ dark)
- Text colors adapt for readability
- Borders adjust for visibility
- Interactive states maintain contrast

---

## Utilities (Used in Project)

### Common Utility Classes

- **Antialiased:** Applied to body for smooth font rendering
- **Transition Colors:** `transition-colors` - Smooth color transitions
- **Transition Opacity:** `transition-opacity` - Smooth opacity changes
- **Transition Shadow:** `transition-shadow` - Smooth shadow changes
- **Disabled States:** `disabled:opacity-50 disabled:pointer-events-none`
- **Hover States:** Various hover effects for interactivity
- **Prose:** `prose prose-lg dark:prose-invert` - Used for MDX content styling

---

## Notes

- All measurements use Tailwind's default spacing scale
- Colors are defined in HSL format for better theme management
- The design system prioritizes accessibility and responsive design
- Components follow a consistent visual language
- Dark mode is fully supported throughout
- Only styles actually used in the codebase are documented here

---

*Last updated: 2025*
