# Wolfsite Deployment History

## Deployments (Last 15+)

**LIVE NOW:**
- ✅ `863f381` (09:15 AM) - https://wolfsite-bkmgkfkuo-wolfgang9000.vercel.app
  - Added Vercel framework config
  - Fresh build, no manifest issues

**RECENT DEPLOYMENTS:**
- `bkmgkfkuo` (09:15 AM) - Latest live deployment ✅
- `1ghpqe2k4` (09:08 AM) - Removed manifest link from index.html
- `pi0ouf883` (09:03 AM) - Added manifest: false to vite config
- `hg5c6uum2` (09:12 AM - 09:25 AM) - Stuck in 401 errors ❌

**PREVIOUS STABLE:**
- `43vwnr8ds` (~08:30 AM) - Initial successful deployment

**GIT HISTORY:**
1. `863f381` - fix: add Vercel config for proper framework detection
2. `c3c5ab2` - fix: remove manifest link from index.html to prevent 401 errors
3. `6717dee` - fix: ensure manifest.json removed and vite config updated
4. `f1c94c6` - fix: disable manifest generation to fix 401 errors
5. `a0fec7c` - fix: use direct imports instead of lazy loading
6. `acb7664` - fix: move useFrame hooks inside Canvas components
7. `2df1a5c` - fix: resolve React lazy import compatibility
8. `ab355b0` - docs: restore Vercel deployment workflow
9. `8935c10` - feat: integrate all 4 scenes with GSAP ScrollTrigger parallax
10. `574ae9d` - feat: Initial Wolfsite foundation - Phase 1 complete

## Issues & Resolutions

**401 Errors on manifest.json:**
- Root cause: Vite auto-generates manifest.json, Vercel's public hosting rejects it
- Fix: `manifest: false` in vite.config.js + removed link from index.html
- Status: ✅ RESOLVED in 863f381

## Current Status

- ✅ All 4 scenes deployed with GSAP ScrollTrigger
- ✅ Code is clean, no manifest artifacts
- ⚠️ Vercel CDN may still return 401 temporarily (cache)
- 🎯 Next: User testing of fresh deployment

## Recommendations

1. **Hard refresh browser** (Ctrl+Shift+R)
2. **Wait 5-10 minutes** for Vercel CDN to propagate
3. **Clear old deployments** in Vercel dashboard if 401 persists
4. **Test** on new URL: https://wolfsite-bkmgkfkuo-wolfgang9000.vercel.app
