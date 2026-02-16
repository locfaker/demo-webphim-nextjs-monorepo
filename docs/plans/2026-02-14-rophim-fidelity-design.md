# Rophimm.net 100% Fidelity Clone Design

**Goal:** Build a pixel-perfect, interactive clone of `https://rophimm.net/` using Next.js and Tailwind CSS.

**Architecture:** 
- **Raw Extraction**: Scrape CSS tokens, animations, and HTML structures directly from the target site.
- **Clean UI Layer**: Reset existing styles and components to avoid conflicts.
- **Atomic Reconstruction**: Rebuild components using extracted logic but maintained with Next.js best practices (Client/Server components).
- **Framer Motion**: Power all original interactive animations.

**Tech Stack:** Next.js (App Router), Tailwind CSS, Framer Motion, Lucide-React (as fallback), Chrome DevTools (Extraction).

---

## 1. Style & Asset Extraction Strategy
- **Global Variables**: Extract all `--color-*`, `--spacing-*`, and `--font-*` variables.
- **CSS Reset**: Move to a clean `globals.css` that only contains Tailwind base and the extracted Rophim-specific tokens.
- **Typography**: Verify and configure fonts (Inter/Custom) in `tailwind.config.ts`.
- **Assets**: Scrape SVG logos and custom icons for 100% visual match.

## 2. Component Reconstruction
- **V-Navbar**: 1:1 layout with Mega Menu (Categories/Countries) and Backdrop-blur Search Overlay.
- **V-HeroSlider**: Motion-powered sliding with correct depth gradients and typography.
- **V-MovieCard**: Support for multiple formats (Portrait/Landscape) with hover states and badges.
- **V-Footer**: Identical multi-column layout with social icons.

## 3. Interaction & Routing
- **Page Transitions**: Global loading bar and fade transitions.
- **Skeleton Screens**: Shimmer effects for loading states in lists and grids.
- **App Router Structure**: `/phim/[slug]`, `/tap/[slug]`, `/c/[category]`, and `/qg/[country]`.

## 4. Testing & Quality Assurance
- **Visual Regression**: Compare local screenshots against live site screenshots.
- **Responsive Audit**: Ensure mobile and tablet views match perfectly.
- **Performance**: Optimize images and animations for 90+ Lighthouse score.
