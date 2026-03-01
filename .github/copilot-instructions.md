# KodNest Premium Build System - Copilot Instructions

## Project Overview

KodNest Premium Build System - Project 3: AI Resume Builder

A Next.js-based system for managing structured project development with 8 sequential steps and artifact-based gating.

## Architecture

### Key Components
- **PremiumLayout**: Main layout wrapper (70/30 split)
- **BuildPanel**: Lovable integration and artifact management
- **ArtifactContext**: Global state management for artifacts
- **Route Structure**: `/rb/01-problem` through `/rb/08-ship` + `/rb/proof`

### Technology Stack
- Next.js 15 (TypeScript)
- Tailwind CSS
- React Context API
- localStorage for persistence

## Setup & Development

### Installation
```bash
npm install
npm run dev
```

### Build for Production
```bash
npm run build
npm start
```

## Key Features

1. **Sequential Step Progression**: No skipping allowed
2. **Artifact Gating**: Next button disabled until artifact uploaded
3. **Build Panel Integration**: Direct Lovable.dev link in interface
4. **Persistent Storage**: localStorage for artifact persistence
5. **Status Tracking**: Visual indicators for completion
6. **Final Proof Page**: Comprehensive submission tracking

## File Structure

```
app/
├── page.tsx              - Root redirect
├── layout.tsx            - Root layout with Provider
├── globals.css           - Global styles
└── rb/
    ├── [01-08-step]/page.tsx
    └── proof/page.tsx

components/
├── PremiumLayout.tsx
├── TopBar.tsx
├── ContextHeader.tsx
├── MainWorkspace.tsx
├── BuildPanel.tsx
└── ProofFooter.tsx

lib/
└── artifact-context.tsx  - React Context for state
```

## Development Guidelines

### To Add New Features
1. Create component in `components/`
2. Update relevant page in `app/rb/[step]/page.tsx`
3. Use `useArtifacts()` hook for artifact management
4. Test locally with `npm run dev`

### To Modify Layout
- Edit `components/PremiumLayout.tsx`
- Adjust split ratio in `PremiumLayout.tsx` (currently 70/30)
- Update responsive styles in tailwind classes

### Artifact Management
- Use key format: `rb_step_X_artifact` where X = 1-8
- Store via: `setArtifact(key, value)`
- Retrieve via: `getArtifact(key)`

## Current Status

✅ Project fully scaffolded
✅ All 8 step routes created
✅ PremiumLayout system operational
✅ Artifact management with localStorage
✅ Build panel with Lovable integration
✅ Proof page with submission tracking
✅ No resume features - only routing and gating

## Next Steps (Manual - Not Automated)

1. Test all 8 routes for proper navigation
2. Verify artifact upload flow
3. Implement actual resume builder features
4. Connect to backend if needed
5. Deploy to production

## Important Notes

- Folder name has spaces which prevents standard npm init
- All files created manually to work around npm restrictions
- Development server runs on port 3001 (port 3000 was in use)
- localStorage clears on browser cache clear
- All styling uses dark theme (Tailwind + custom CSS)

## Commands Reference

```bash
npm run dev      # Start dev server
npm run build    # Production build
npm start        # Run production build
npm run lint     # ESLint check
```

## Troubleshooting

### Development server won't start
```bash
npx next dev  # Use npx if npm scripts fail
```

### Port 3000 in use
- Dev server automatically uses 3001
- Check terminal output for actual port

### Artifacts not persisting
- Check browser localStorage (DevTools → Application)
- Ensure no incognito mode
- Clear cache if needed

---

**Last Updated**: March 1, 2026  
**Project Type**: Next.js 15 + TypeScript  
**Status**: Development Ready
