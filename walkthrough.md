# Kaya Project Walkthrough: Core Architecture

This document provides a detailed overview of the primary components and the main application structure for the Kaya fashion brand website.

---

## 1. App.jsx: The Application Root
The `App.jsx` file serves as the orchestrator for the entire single-page application.

### Key Logic
- **Scroll Animations**: It initializes an `IntersectionObserver` that detects when elements with classes like `.reveal-up`, `.reveal-left`, etc., enter the viewport. When they do, it adds the `is-revealed` class to trigger CSS animations.
- **Component Layout**: It structures the page by rendering the `SEO` component first, followed by the `Navbar`, `Hero`, and other sections in a logical flow.
- **SEO Integration**: It passes central brand metadata (Title, Description, Keywords) to the SEO component to ensure consistent branding across search engines.

---

## 2. SEO.jsx: Advanced Search Engine Optimization
The `SEO` component is a functional wrapper around `react-helmet-async`, used to manage the `<head>` section of the HTML document.

### SEO Terminology Explained

| Term | Purpose | Use Case |
| :--- | :--- | :--- |
| **Title Tag** | The main heading of your page in search results. | Primary factor in search ranking and user click-through rates. |
| **Meta Description** | A brief summary of the page content. | Influences whether a user clicks your link in search results. |
| **Keywords** | Terms or phrases that describe your content. | Mostly legacy for Google but used by some smaller search engines for categorization. |
| **Open Graph (og:)** | Standardizes how your site looks when shared on social media (Facebook, LinkedIn). | Ensures your site looks premium and consistent when links are shared. |
| **Twitter Card** | Meta tags specific to how Twitter previews links. | Optimizes the display (image size, title, description) on Twitter/X. |
| **Canonical Link** | Tells search engines which URL is the "master" version. | Prevents duplicate content issues if your site is accessible via multiple URLs. |
| **Robots Meta** | Instructions for search engine crawlers (e.g., `index, follow`). | Tells Google to index the page and follow the links on it. |

---

## 3. Navbar.jsx: Dynamic Navigation
The `Navbar` provides both desktop and mobile navigation experiences.

### Implementation Details
- **Scroll Detection**: A `useEffect` hook monitors the `window.scrollY` position. If the user scrolls more than 50px, a `.scrolled` class is added, allowing the navbar to change appearance (e.g., become solid or smaller).
- **Mobile Menu**: Uses a state-driven overlay system. When the hamburger icon (Lucide-React `Menu`) is clicked, a full-screen drawer slides in.
- **Smooth Anchor Links**: All links use standard `#id` fragment identifiers, which interact with the browser's native smooth scrolling or CSS-based smooth scroll.

---

## 4. Hero.jsx: High-Impact Introduction
The `Hero` section is designed to capture attention immediately with high-quality visual storytelling.

### Code Highlights
- **Auto-Sliding Background**: Uses a `setInterval` within a `useEffect` to rotate through three distinct product images (Plazo pants, Pencil pants, Leggings) every 5 seconds.
- **Interactive Controls**: Users can manually switch slides using the dot indicators at the bottom.
- **Micro-Animations**: The content uses the `reveal-up` class discussed in `App.jsx`, ensuring the text fades and slides up elegantly when the page loads.
- **Call to Action (CTA)**: Features primary buttons that guide the user directly to the product catalogue or the booking system.

---

### UI Components Used
- **Lucide React**: For lightweight, consistent iconography (`ArrowRight`, `Menu`, `X`, `ChevronDown`).
- **React Helmet Async**: For safe SSR-compatible head management.
- **Vanilla CSS Intersections**: For performant scroll-triggered animations without heavy libraries.
