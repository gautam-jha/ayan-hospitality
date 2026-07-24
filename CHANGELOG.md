# Changelog

All notable changes to this project will be documented in this file.

## [Current] - 2026-07-19

### Fixed
- **Sanity "Open in studio" tooltip now only shows in presentation mode**
  - Previously, the tooltip appeared on public pages for all users
  - Fixed by adding proper Sanity presentation mode detection
  - Tooltip now only displays when:
    - In Sanity's design preview mode
    - Using Next.js preview server
  - No longer shows on production public site (ayanhospitality.in)
  
  **Files modified:**
  - `src/components/layout/Header.tsx`
  
  **Technical details:**
  - Added condition to check `SanityClient.presentationMode` or `isSanityPreview`
  - Ensures public site users don't see design-time UI elements
  - Maintains proper behavior for content editors and designers

### Changed
- Updated tooltip rendering logic to respect environment context
- Improved separation between public and presentation modes