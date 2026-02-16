# Rophimm.net Fidelity Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Rebuild the Rophim clone project to match https://rophimm.net/ 1:1 using a clean-slate approach for the UI layer.

**Architecture:** Raw Style Extraction + Next.js Componentization. We will reset existing UI files and rebuild each component using exact HTML/CSS structures from the source site.

**Tech Stack:** Next.js, Tailwind CSS, Framer Motion, Chrome DevTools.

---

### Task 1: Global Style Extraction & Reset

**Files:**
- Modify: `apps/web/app/globals.css`
- Modify: `apps/web/tailwind.config.ts`

**Step 1: Scrape CSS Variables & Tokens**
- Use `chrome-devtools` to visit `https://rophimm.net/` and extract all root CSS variables.
- Identify the exact color palette (bg, primary, gold, slate).

**Step 2: Reset globals.css**
- Clean `globals.css` to only keep Tailwind directives and the new custom variables.

**Step 3: Configure Tailwind**
- Update `tailwind.config.ts` with the exact theme (colors, border-radius, font-family) harvested from the source.

---

### Task 2: Navbar Pixel-Perfect Reconstruction

**Files:**
- Modify: `apps/web/components/navbar.tsx`
- Create: `apps/web/components/search-overlay.tsx`

**Step 1: Extract Navbar HTML/CSS**
- Capture the exact DOM structure and computed styles of the navbar in different states (scrolled, mobile).

**Step 2: Implement V-Navbar**
- Rebuild `navbar.tsx` using the extracted structure.
- Implement the "Mega Menu" for Categories and Countries.

**Step 3: Implement Search Overlay**
- Rebuild the search bar and its backdrop-blur overlay.

---

### Task 3: Hero Slider High-Fidelity Reconstruction

**Files:**
- Modify: `apps/web/components/hero-slider.tsx`

**Step 1: Extract Hero Slider Logic & Styles**
- Identify transition timing, gradient depths, and typography sizes.
- Extract the "Play" button SVG and animation.

**Step 2: Implement V-HeroSlider**
- Rebuild the slider using Framer Motion to match the original transitions.
- Ensure the backdrop images use the correct aspect ratio and object-fit.

---

### Task 4: Movie Card & Movie Grid Reconstruction

**Files:**
- Modify: `apps/web/components/movie-card.tsx`
- Modify: `apps/web/app/page.tsx`

**Step 1: Extract Card Architecture**
- Capture the exact layout for Portrait (Movie) and Landscape (Thumbnail/Review) cards.
- Extract Badge (HD, PĐ) styles and fonts.

**Step 2: Implement V-MovieCard**
- Support both `type="portrait"` and `type="landscape"`.
- Add hover animations (scaling, play icon apparition).

**Step 3: Update Page Grid**
- Use the exact grid spacing and container widths on the home page.

---

### Task 5: Routing, Layout & Footer

**Files:**
- Modify: `apps/web/app/layout.tsx`
- Create: `apps/web/components/footer.tsx`
- Create: `apps/web/app/phim/[slug]/page.tsx`

**Step 1: Global Layout & Metadata**
- Set up the identical Header/Footer wrapper.
- Configure SEO metadata defaults.

**Step 2: Implement V-Footer**
- 1:1 reconstruction of the footer with social links and legal text.

**Step 3: Dynamic Search & Detail Routing**
- Set up the folder structure for all pages seen on the original site.

---

### Task 6: Interaction Polish & Responsive Audit

**Files:**
- Modify: `apps/web/components/*`
- Modify: `apps/web/app/globals.css`

**Step 1: Page Transitions**
- Add the NProgress-style loading bar.
- Add page fade-in animations.

**Step 2: Responsive Fixes**
- Audit mobile view on target site and replicate breakpoints exactly.
- Adjust padding and font-sizes for smaller screens.
