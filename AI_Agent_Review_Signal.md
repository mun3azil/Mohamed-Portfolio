# AI Agent Review Signal: Personal Page Project

> **Context:** You are reviewing a personal page project. Conduct a comprehensive technical and UX audit across all layers of the stack.

---

## Table of Contents

1. [User Experience (UX) Review](#1-user-experience-ux-review)
2. [Front-End Review](#2-front-end-review)
3. [Back-End Review](#3-back-end-review)
4. [File Structure Review](#4-file-structure-review)
5. [Code Quality Review](#5-code-quality-review)
6. [Deliverable Format](#6-deliverable-format)
7. [Special Considerations for Personal Pages](#7-special-considerations-for-personal-pages)

---

## 1. User Experience (UX) Review

Evaluate the following:

- **Visual Hierarchy**: Is information organized by importance? Are CTAs clear?
- **Navigation**: Can users reach any page within 3 clicks? Is there a mobile hamburger menu?
- **Accessibility**: Check color contrast ratios (WCAG AA/AAA), alt text for images, keyboard navigation, ARIA labels, focus indicators
- **Performance Perception**: First Contentful Paint, Largest Contentful Paint, perceived load speed
- **Responsiveness**: Test breakpoints (320px, 768px, 1024px, 1440px+). Does content reflow gracefully?
- **Content Readability**: Font sizes (min 16px for body), line height (1.5+), paragraph width (60-75ch max)
- **Interaction Feedback**: Hover states, loading states, error messages, form validation UX
- **Dark Mode**: If implemented, are transitions smooth? Are images adapted?

### UX Checklist

| Check | Status | Notes |
|-------|--------|-------|
| Mobile-first design | [ ] Pass / [ ] Fail | |
| WCAG AA contrast | [ ] Pass / [ ] Fail | |
| Keyboard navigable | [ ] Pass / [ ] Fail | |
| Screen reader friendly | [ ] Pass / [ ] Fail | |
| Loading states present | [ ] Pass / [ ] Fail | |
| Error handling UX | [ ] Pass / [ ] Fail | |
| Print styles | [ ] Pass / [ ] Fail | |
| Reduced motion support | [ ] Pass / [ ] Fail | |

---

## 2. Front-End Review

### 2.1 HTML Structure

- Semantic HTML5 usage (`<header>`, `<main>`, `<article>`, `<time>`)
- Heading hierarchy (single H1, no skipped levels)
- Meta tags (viewport, description, Open Graph, Twitter Cards)
- Schema.org structured data for personal info

### 2.2 CSS Architecture

- Methodology used (BEM, SMACSS, Utility-first)
- CSS custom properties for theming
- Mobile-first vs desktop-first media queries
- Critical CSS inlining
- Unused CSS elimination
- Container queries where appropriate

### 2.3 JavaScript

- Framework choice rationale (React/Vue/Svelte/Vanilla)
- Bundle size analysis
- Code splitting and lazy loading
- Event delegation patterns
- Memory leak checks (event listeners cleanup)
- Progressive enhancement (works without JS?)

### 2.4 Asset Optimization

- Image formats (WebP/AVIF with fallbacks)
- SVG optimization
- Font loading strategy (FOIT vs FOUT vs swap)
- CDN usage for static assets

### Front-End Checklist

| Check | Status | Notes |
|-------|--------|-------|
| Semantic HTML | [ ] Pass / [ ] Fail | |
| Valid HTML (W3C) | [ ] Pass / [ ] Fail | |
| Responsive images | [ ] Pass / [ ] Fail | |
| Modern image formats | [ ] Pass / [ ] Fail | |
| Lazy loading | [ ] Pass / [ ] Fail | |
| Font optimization | [ ] Pass / [ ] Fail | |
| Bundle size < 200KB | [ ] Pass / [ ] Fail | |
| Core Web Vitals green | [ ] Pass / [ ] Fail | |

---

## 3. Back-End Review

### 3.1 Architecture

- Serverless vs monolithic vs microservices
- API design (RESTful vs GraphQL vs RPC)
- Authentication/Authorization (JWT sessions, OAuth, password hashing)
- Rate limiting and DDoS protection

### 3.2 Database

- Schema design (normalization vs denormalization)
- Indexing strategy
- Query optimization (N+1 problem?)
- Backup and migration strategy

### 3.3 Security

- HTTPS enforcement
- Content Security Policy headers
- XSS prevention (output encoding)
- CSRF tokens
- SQL injection prevention (parameterized queries)
- Dependency vulnerability scanning

### 3.4 Performance

- Caching strategy (Redis, CDN, browser cache headers)
- Database connection pooling
- Async processing for heavy tasks
- Compression (Brotli/Gzip)

### Back-End Checklist

| Check | Status | Notes |
|-------|--------|-------|
| HTTPS only | [ ] Pass / [ ] Fail | |
| CSP headers | [ ] Pass / [ ] Fail | |
| Rate limiting | [ ] Pass / [ ] Fail | |
| Input validation | [ ] Pass / [ ] Fail | |
| SQL injection safe | [ ] Pass / [ ] Fail | |
| Dependency audit clean | [ ] Pass / [ ] Fail | |
| Error handling (no leaks) | [ ] Pass / [ ] Fail | |
| Logging implemented | [ ] Pass / [ ] Fail | |

---

## 4. File Structure Review

### Recommended Structure

```
project-root/
├── src/
│   ├── components/       # Reusable UI components
│   ├── pages/           # Route-level components
│   ├── hooks/           # Custom React/Vue hooks
│   ├── utils/           # Pure helper functions
│   ├── services/        # API calls
│   ├── styles/          # Global styles, variables
│   ├── assets/          # Images, fonts, icons
│   └── types/           # TypeScript interfaces
├── public/              # Static files
├── tests/
│   ├── unit/
│   ├── integration/
│   └── e2e/
├── docs/                # Architecture decisions
├── scripts/             # Build/deploy automation
└── config/              # Environment configs
```

### Evaluation Criteria

- [ ] Separation of concerns
- [ ] Co-location of related files
- [ ] Clear naming conventions
- [ ] No circular dependencies
- [ ] Test files adjacent to source or in `__tests__`

---

## 5. Code Quality Review

### 5.1 Readability

- Consistent naming (camelCase vs snake_case)
- Function length (< 20 lines ideal)
- Comment quality (why, not what)
- No magic numbers/strings

### 5.2 Maintainability

- DRY principle adherence
- Single Responsibility Principle
- Open/Closed Principle
- Dependency inversion

### 5.3 Type Safety

- TypeScript strict mode enabled?
- `any` types eliminated?
- Proper generics usage

### 5.4 Testing

- Unit test coverage (> 80%?)
- Integration tests for API flows
- E2E tests for critical user paths
- Snapshot tests for UI components

### 5.5 Tooling

- ESLint/Prettier configuration
- Pre-commit hooks (Husky + lint-staged)
- CI/CD pipeline checks

### Code Quality Checklist

| Check | Status | Notes |
|-------|--------|-------|
| Linting passes | [ ] Pass / [ ] Fail | |
| Formatting consistent | [ ] Pass / [ ] Fail | |
| Test coverage > 80% | [ ] Pass / [ ] Fail | |
| No `any` types | [ ] Pass / [ ] Fail | |
| Functions < 20 lines | [ ] Pass / [ ] Fail | |
| No magic numbers | [ ] Pass / [ ] Fail | |
| Pre-commit hooks active | [ ] Pass / [ ] Fail | |
| CI/CD green | [ ] Pass / [ ] Fail | |

---

## 6. Deliverable Format

### Issue Tracking Table

| Category | Severity | Issue | Recommendation | Effort |
|----------|----------|-------|----------------|--------|
| UX | High | Missing skip-to-content link | Add `<a href="#main">` | 15 min |
| Security | Critical | Hardcoded API key in repo | Move to env vars + gitignore | 30 min |
| Performance | Medium | Unoptimized hero image | Convert to WebP/AVIF | 20 min |
| Code Quality | Low | Duplicate CSS in multiple files | Extract to shared component | 45 min |

### Priority Matrix

- **P0 (Critical)**: Security vulnerabilities, broken core functionality
- **P1 (High)**: Performance bottlenecks, accessibility failures
- **P2 (Medium)**: Code smells, missing tests
- **P3 (Low)**: Refactoring opportunities, nice-to-haves

### Required Output per Issue

For each issue found, provide:

1. **File/Line Reference**: Exact location in codebase
2. **Current Code**: Problematic snippet
3. **Recommended Fix**: Corrected code example
4. **Impact**: Consequence if left unaddressed

---

## 7. Special Considerations for Personal Pages

### 7.1 SEO & Discoverability

- [ ] Sitemap.xml generated and submitted
- [ ] Robots.txt configured
- [ ] Canonical URLs set
- [ ] Meta descriptions unique per page
- [ ] Structured data (Person schema)

### 7.2 Analytics (Privacy-Respecting)

- [ ] Plausible Analytics or Fathom (recommended)
- [ ] Google Analytics (if used, with consent banner)
- [ ] No tracking pixels without disclosure

### 7.3 Contact Form

- [ ] Spam protection (honeypot field)
- [ ] reCAPTCHA v3 (invisible) if needed
- [ ] Success/error message UX
- [ ] Rate limiting on endpoint

### 7.4 Blog / Content

- [ ] RSS feed (`/rss.xml` or `/feed.json`)
- [ ] Reading time estimation
- [ ] Code syntax highlighting
- [ ] Social sharing cards

### 7.5 Portfolio Section

- [ ] Image lazy loading
- [ ] Project case study structure (Problem → Solution → Result)
- [ ] Live demo + source code links
- [ ] Technology tags

### 7.6 Resume / CV

- [ ] Print-friendly CSS (`@media print`)
- [ ] PDF generation or download button
- [ ] ATS-friendly text version

---

## Quick Reference: Review Execution Order

```
1. Clone repo → npm install → npm run dev
2. Lighthouse audit (Performance, Accessibility, Best Practices, SEO)
3. Manual UX walkthrough (desktop + mobile)
4. Code review (file structure → code quality)
5. Security audit (headers, dependencies, secrets)
6. Back-end review (if applicable)
7. Compile findings into deliverable format
```

---

*Generated for comprehensive personal page project review.*
