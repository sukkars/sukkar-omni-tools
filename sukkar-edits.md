# Sukkar Toolbox — White-label Edits

এই রেপো `iib0011/omni-tools` (MIT License) এর একটি fork। এই ফাইলে আমাদের করা সব
পরিবর্তন লেখা আছে, যাতে upstream sync করলে কিছু হারিয়ে গেলে আবার সহজে বসানো যায়।

- **Live:** https://tools2.sukkarshop.com
- **Fork:** `sukkars/sukkar-omni-tools` (origin) · **Upstream:** `iib0011/omni-tools`
- **Hosting:** Cloudflare Pages
- **সর্বশেষ upstream sync:** ২০২৬-০৮-১২ (upstream/main-এর ২২৩টি commit merge করা হয়েছে)

---

## ডেপ্লয়মেন্ট (Cloudflare Pages)

| সেটিং | মান |
|-------|-----|
| Build command | `npx vite build`  ⚠️ `npm run build` **নয়** |
| Output directory | `dist` |
| Package manager | npm (`package-lock.json`) |
| Custom domain | `tools2.sukkarshop.com` |

**কেন `npm run build` নয়:** ওটা `tsc && vite build`, আর `tsc` দুটো `*.e2e.spec.ts`
ফাইলে jimp-import এরর দেয় (pre-existing)। তাই সরাসরি `npx vite build` চালাতে হয়।

**ডেপ্লয়ের জন্য দরকারি ফাইল:**
- `public/_headers` — COOP/COEP header (`same-origin` + `credentialless`)। ffmpeg.wasm
  ভিডিও/অডিও টুল `SharedArrayBuffer` ব্যবহার করে, এই header ছাড়া ঐ টুলগুলো ভাঙে।
- `public/_redirects` — `/*  /index.html  200` (SPA fallback)।
- `.npmrc` — `legacy-peer-deps=true`। vite@8 আর `@vitejs/plugin-react-swc`-এর peer
  range (≤vite 7) দ্বন্দ্বে CI-তে `npm clean-install` ERESOLVE দিত; এটা তা ঠিক করে।
- `pnpm-lock.yaml` **মুছে ফেলা হয়েছে** — পুরনো stale lock থাকায় Cloudflare pnpm ধরে
  নিয়ে `ERR_PNPM_OUTDATED_LOCKFILE` দিত। এখন শুধু npm lock আছে।
- `vercel.json` — Vercel-এ deploy করলে একই COOP/COEP + SPA rewrite দেয় (ব্যাকআপ অপশন)।

---

## Upstream sync করলে কি আমার চেঞ্জ মুছে যাবে?

**না — commit করা চেঞ্জ git কখনো এমনি মুছে না।** Sync মানে upstream-এর কমিটগুলো
merge হওয়া; git আপনার আর তাদের চেঞ্জ একসাথে মিলিয়ে দেয়। তবে দুই দিকেই *একই ফাইল*
বদলালে **merge conflict** হয়, যেটা হাতে ঠিক করতে হয়।

> ⛔ GitHub-এ **"Discard N commits to match upstream"** বাটনে কখনো ক্লিক করবেন না —
> ওটা আপনার সব white-label commit মুছে ফেলে। ওটা "sync" নয়।

### নিরাপদ sync পদ্ধতি (একবার সফলভাবে করা হয়েছে)
1. **আগে সব চেঞ্জ commit করুন।** Dirty working tree রেখে sync/pull করবেন না।
2. Remote (একবারই): `git remote add upstream https://github.com/iib0011/omni-tools.git`
3. আলাদা branch-এ merge করুন যাতে live `main` নিরাপদ থাকে:
   ```bash
   git fetch upstream
   git switch -c sync-upstream
   git merge upstream/main        # এখানে conflict আসবে
   # conflict ঠিক করুন (নিচের টেবিল দেখুন) → git add -A && git commit
   npx vite build                 # ✅ পাস করলে তবেই
   git switch main && git merge sync-upstream && git push
   ```
4. `git reset --hard` / `git clean -fd` চালাবেন না যতক্ষণ না নিশ্চিত।

### সর্বশেষ sync-এ conflict যেভাবে সমাধান করা হয়েছে (রেফারেন্স)

| ফাইল | সিদ্ধান্ত |
|------|-----------|
| `package.json` | Sukkar `name`/`description`/`author`/`bugs` রাখা; upstream-এর নতুন deps নেওয়া (`json5`, `jspdf 3.0.3`, `bcryptjs`, `diff`, `dompurify`, `to-words`); `version` → 0.6.0 |
| `src/components/Navbar/index.tsx` | আমাদের **Sukkar Toolbox টেক্সট লোগো** রাখা; upstream-এর image logo + version/commit-hash ডিসপ্লে বাদ |
| `vite.config.ts` | `resolve.tsconfigPaths: true` রাখা; `__APP_VERSION__` / `__COMMIT_HASH__` define আর `vite-tsconfig-paths` import বাদ (শুধু Navbar ওগুলো ব্যবহার করত) |
| `.gitignore` | upstream-এর `.idea/` + আমাদের brainsync exclusions — দুটোই |
| `package-lock.json` | হাতে merge না করে `npm install` দিয়ে regenerate |
| locale JSON (১০টি) | auto-merge; `hero.brand` = "Sukkar Toolbox" অক্ষত |

---

## White-label পরিবর্তনসমূহ

সব "OmniTools" → **"Sukkar Toolbox"**, এবং মূল author-এর personal লিংক সরানো হয়েছে।

| # | ফাইল | কী বদলেছে | কেন |
|---|------|-----------|-----|
| 1 | `src/components/Navbar/index.tsx` | Discord আইকন, GitHub-star iframe, "Hire Me" বাটন সরানো; image logo-র বদলে **টেক্সট "Sukkar Toolbox" + wrench (`mdi:tools`) আইকন**; unused `logo`/`logoWhite` import বাদ, `Typography` import যোগ | author-specific ব্র্যান্ডিং সরানো |
| 2 | `public/locales/*/translation.json` (১০টি ভাষা) | `hero.brand` → "Sukkar Toolbox"; description-এর "OmniTools" টোকেন replace | হিরো/সার্চ ব্র্যান্ড টেক্সট |
| 3 | `index.html` | `<title>` ও `apple-mobile-web-app-title` → "Sukkar Toolbox"; **Google Analytics gtag.js যোগ** (`G-6NJNCRNH5P`) | ট্যাব টাইটেল + অ্যানালিটিক্স |
| 4 | `public/site.webmanifest` | `name` / `short_name` → "Sukkar Toolbox" | PWA নাম |
| 5 | `package.json` | `name`, `description`, `author`, `bugs` (→ tools2.sukkarshop.com) | মেটাডেটা |
| 6 | `README.md` | Sukkar হেডার; Live URL → tools2.sukkarshop.com; **MIT attribution রাখা** | ডকুমেন্টেশন |
| 7 | `src/components/ToolLayout.tsx` | per-tool `<title>` suffix → "- Sukkar Toolbox" | প্রতি টুলের ট্যাব টাইটেল |
| 8 | `src/pages/home/index.tsx` | Helmet `title` → "Sukkar Toolbox" | হোম ট্যাব টাইটেল |
| 9 | `src/pages/tools/string/url-encode`<br>`.../url-decode` | sample URL → `tools2.sukkarshop.com` | উদাহরণ ডেটা |
| 10 | **`src/components/Footer/index.tsx`** (নতুন ফাইল) | সাইট-wide MUI footer — Tools/Homepage লিংক, "Powered by sukkarshop.com", privacy নোট (sukkar-tools-এর মতো)। `App.tsx`-এ `<AppRoutes/>`-এর পর render | সব পেজে ফুটার |

### ইচ্ছা করে যা বদলানো হয়নি
- **`LICENSE`** — MIT লাইসেন্স মূল copyright notice রাখা **আইনত বাধ্যতামূলক**, তাই অপরিবর্তিত।

---

## এখনো বাকি (pending)

- [ ] **Favicon / আইকন** — leaf আইকন থেকে জেনারেট করতে হবে:
      `favicon.png`, `favicon-96x96.png`, `apple-touch-icon.png` (180),
      `web-app-manifest-192x192.png`, `web-app-manifest-512x512.png`,
      `favicon.ico`, `favicon.svg`। (আইকন ফাইলের path দিলেই বসিয়ে দেব।)
- [ ] `public/site.webmanifest`-এ `theme_color` / `background_color` leaf-green করা।
- [ ] মূল সাইটে (`sukkar-tools`) Sukkar Toolbox-এর দিকে **লিংক/কার্ড** যোগ করা
      (→ https://tools2.sukkarshop.com)।
- [ ] GA4 `G-6NJNCRNH5P` property-তে `tools2.sukkarshop.com` data stream নিশ্চিত করা।
- [ ] (ঐচ্ছিক) `*.e2e.spec.ts`-এর jimp-import `tsc` এরর ঠিক করে `npm run build`-ও সচল করা।

---

## যাচাই
`npx vite build` — ✅ সফল (upstream sync + GA + footer সহ)। `npm run build` এখনো
`tsc`-এর pre-existing e2e jimp এররে আটকায় — তাই deploy-এ `npx vite build` ব্যবহার করুন।
