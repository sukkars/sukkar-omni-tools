# Sukkar Toolbox — White-label Edits

এই রেপো `iib0011/omni-tools` (MIT License) এর একটি fork। এই ফাইলে আমাদের করা সব
পরিবর্তন লেখা আছে, যাতে upstream sync করলে কিছু হারিয়ে গেলে আবার সহজে বসানো যায়।

---

## Upstream sync করলে কি আমার চেঞ্জ মুছে যাবে?

**না — commit করা চেঞ্জ git কখনো এমনি মুছে না।** Sync মানে upstream-এর কমিটগুলো
merge হওয়া; git আপনার আর তাদের চেঞ্জ একসাথে মিলিয়ে দেয়। তবে দুই দিকেই *একই ফাইল*
বদলালে **merge conflict** হয়, যেটা আপনাকে হাতে ঠিক করতে হয় (নিচের ফাইলগুলোতেই কনফ্লিক্ট
হওয়ার সম্ভাবনা বেশি — locale JSON, Navbar, index.html, package.json)।

### নিরাপদ sync পদ্ধতি
1. **আগে সব চেঞ্জ commit করুন।** Dirty working tree রেখে কখনো sync/pull করবেন না —
   uncommitted চেঞ্জ কিছু কিছু git অপারেশনে মুছে যেতে পারে।
2. Upstream remote যোগ করুন (একবারই):
   ```bash
   git remote add upstream https://github.com/iib0011/omni-tools.git
   ```
3. Sync করার সময়:
   ```bash
   git fetch upstream
   git merge upstream/main      # অথবা: git rebase upstream/main
   ```
4. Conflict হলে ফাইল খুলে **আমাদের brand ভ্যালু (Sukkar Toolbox)** রেখে দিন, তারপর
   `git add` + commit।
5. `git reset --hard` / `git clean -fd` চালাবেন না যতক্ষণ না নিশ্চিত — এগুলো চেঞ্জ মুছে দেয়।

> এই ফাইলটাই আপনার safety net: sync-এ কিছু হারালে নিচের চেকলিস্ট ধরে ২-৩ মিনিটে আবার বসানো যায়।

---

## White-label পরিবর্তনসমূহ (এই সেশনে করা)

সব "OmniTools" → **"Sukkar Toolbox"**, এবং মূল author-এর personal লিংক সরানো হয়েছে।

| # | ফাইল | কী বদলেছে | কেন |
|---|------|-----------|-----|
| 1 | `src/components/Navbar/index.tsx` | Discord আইকন, GitHub-star iframe, "Hire Me" বাটন সরানো; image logo-র বদলে **টেক্সট "Sukkar Toolbox" + wrench (`mdi:tools`) আইকন**; unused `logo`/`logoWhite` import বাদ, `Typography` import যোগ, `const { t, i18n }` → `const { i18n }` | author-specific ব্র্যান্ডিং সরানো |
| 2 | `public/locales/*/translation.json` (১০টি ভাষা) | `hero.brand` → "Sukkar Toolbox"; description-এর ভেতরের "OmniTools" টোকেনও replace | হিরো/সার্চ ব্র্যান্ড টেক্সট |
| 3 | `index.html` | `<title>` ও `apple-mobile-web-app-title` → "Sukkar Toolbox" | ব্রাউজার ট্যাব / iOS |
| 4 | `public/site.webmanifest` | `name` / `short_name` → "Sukkar Toolbox" | PWA নাম |
| 5 | `package.json` | `name`, `description`, `author`, `bugs` → Sukkar | মেটাডেটা |
| 6 | `README.md` | নতুন Sukkar হেডার; **MIT attribution রাখা হয়েছে** | ডকুমেন্টেশন |
| 7 | `src/components/ToolLayout.tsx` | per-tool `<title>` suffix → "- Sukkar Toolbox" | প্রতি টুলের ট্যাব টাইটেল |
| 8 | `src/pages/home/index.tsx` | Helmet `title` → "Sukkar Toolbox" | হোম ট্যাব টাইটেল |
| 9 | `src/pages/tools/string/url-encode/index.tsx`<br>`.../url-decode/index.tsx` | sample URL `omnitools.app` → `tools.sukkarshop.com` | উদাহরণ ডেটা |

### ইচ্ছা করে যা বদলানো হয়নি
- **`LICENSE`** — MIT লাইসেন্স মূল copyright notice রাখা **আইনত বাধ্যতামূলক**, তাই অপরিবর্তিত।

---

## এখনো বাকি (pending)

- [ ] **Favicon / আইকন** — আপনার leaf আইকন থেকে জেনারেট করতে হবে:
      `favicon.png`, `favicon-96x96.png`, `apple-touch-icon.png` (180),
      `web-app-manifest-192x192.png`, `web-app-manifest-512x512.png`,
      `favicon.ico`, `favicon.svg`। (আইকন ফাইলের path দিলেই বসিয়ে দেব।)
- [ ] `public/site.webmanifest`-এ `theme_color` / `background_color` leaf-green করা।
- [ ] Sukkar Toolbox মূল সাইটে (`sukkar-tools`) OmniTools-এর দিকে **লিংক/কার্ড** যোগ করা
      (deploy URL ঠিক হলে)।

---

## আমাদের নয় — আগে থেকেই working tree-তে ছিল

এই চেঞ্জগুলো এই সেশনে white-labeling-এর অংশ নয় (tooling/আগের কাজ), শুধু জানিয়ে রাখা:
- `vite.config.ts` — `vite-tsconfig-paths` plugin সরিয়ে `resolve.tsconfigPaths: true` করা।
- `vercel.json` (untracked) — SPA rewrite + COOP/COEP header (ffmpeg.wasm-এর জন্য দরকার)।
- `package-lock.json`, `.gitignore`, `.vscode/settings.json` — এনভায়রনমেন্ট।
- `.mcp.json`, `.vscode/mcp.json`, `AGENT.md`, `CLAUDE.md` — brainsync টুলিং।

---

## যাচাই
`npx vite build` — ✅ সফল। (`*.e2e.spec.ts`-এ দুটি pre-existing `tsc` jimp-import এরর
আছে যা আমাদের চেঞ্জের সাথে সম্পর্কিত নয় ও build আটকায় না।)
