# Personal Portfolio Improvement Guide

## Phase 1: Critical Fixes (Do First)

| # | Task | Why | Effort | Files |
|---|------|-----|--------|-------|
| 1 | Move `antigravity-awesome-skills` out of repo | 376KB bloats git, slows clones | 10 min | `.gitignore` or new repo |
| 2 | Add CSP headers | Missing security layer | 15 min | `next.config.ts` or `vercel.json` |
| 3 | Run `npm audit` and fix vulnerabilities | Unknown security exposure | 20 min | Terminal |
| 4 | Add rate limiting to contact form | Prevents abuse/spam | 30 min | Contact form API route |

---

## Phase 2: Accessibility & Compliance (This Week)

| # | Task | Why | Effort | How |
|---|------|-----|--------|-----|
| 5 | Run color contrast audit | WCAG AA compliance | 20 min | axe DevTools or Lighthouse |
| 6 | Add `prefers-reduced-motion` support | Respect user preferences | 15 min | CSS media query |
| 7 | Add skip-to-content link | Keyboard navigation | 10 min | `<a href="#main">` at top |
| 8 | Verify all images have alt text | Screen reader support | 15 min | Audit + fix gaps |
| 9 | Test with actual screen reader | Real accessibility check | 30 min | NVDA/VoiceOver |

---

## Phase 3: Performance Validation (This Week)

| # | Task | Why | Effort | Target |
|---|------|-----|--------|--------|
| 10 | Run Lighthouse audit | Measure Core Web Vitals | 15 min | 90+ all categories |
| 11 | Fix any LCP > 2.5s | Largest Contentful Paint | Varies | < 2.5s |
| 12 | Fix any CLS > 0.1 | Cumulative Layout Shift | Varies | < 0.1 |
| 13 | Add web vitals reporting | Production monitoring | 20 min | `web-vitals` library |

---

## Phase 4: Code Quality (Next 2 Weeks)

| # | Task | Why | Effort | Files |
|---|------|-----|--------|-------|
| 14 | Add Prettier config | Consistent formatting | 10 min | `.prettierrc` |
| 15 | Add Husky pre-commit hooks | Enforce quality on commit | 20 min | `.husky/` |
| 16 | Add more unit tests | Coverage gaps | 2-3 hrs | `__tests__/` |
| 17 | Add E2E tests (Playwright) | Critical user flows | 3-4 hrs | `e2e/` |

---

## Phase 5: Features & Polish (Next Month)

| # | Task | Why | Effort | Notes |
|---|------|-----|--------|-------|
| 18 | Implement actual blog | Currently placeholder | 1-2 days | MDX or CMS |
| 19 | Add project detail pages | Deeper portfolio showcase | 1 day | Dynamic routes |
| 20 | Add search functionality | Content discoverability | 1 day | Fuse.js or Algolia |
| 21 | Add testimonials section | Social proof | 2-3 hrs | New component |
| 22 | Add Storybook | Component documentation | 2-3 hrs | Dev experience |
| 23 | Add Sentry error tracking | Production monitoring | 30 min | Sign up + config |

---

## Quick Wins (Under 30 Minutes Total)

### 1. Security Audit

```bash
npm audit fix
```

### 2. Add to .gitignore

```bash
echo "antigravity-awesome-skills/" >> .gitignore
```

### 3. Add Skip Link to Layout

In `app/[locale]/layout.tsx`, before `<SiteShell>`:

```tsx
<a href="#main" className="sr-only focus:not-sr-only">
  Skip to content
</a>
```

### 4. Add Reduced Motion Support

In `globals.css`:

```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```

---

## CSP Header Configuration

In `next.config.ts`:

```typescript
async headers() {
  return [{
    source: '/:path*',
    headers: [{
      key: 'Content-Security-Policy',
      value: "default-src 'self'; script-src 'self' 'unsafe-eval' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; font-src 'self'; connect-src 'self' https://api.emailjs.com;"
    }]
  }]
}
```

---

## Progress Tracker

| Phase | Tasks | Status | Est. Time |
|-------|-------|--------|-----------|
| 1 - Critical | 4 tasks | [ ] Not started | ~75 min |
| 2 - Accessibility | 5 tasks | [ ] Not started | ~90 min |
| 3 - Performance | 4 tasks | [ ] Not started | ~35 min + fixes |
| 4 - Code Quality | 4 tasks | [ ] Not started | ~6-8 hrs |
| 5 - Features | 6 tasks | [ ] Not started | ~3-5 days |

---

*Generated for Mohamed Ashraf Portfolio - Improvement Plan*
