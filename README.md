# Phone Store Mourouj 6 — Premium Tech Website 

Modern, animated, fully responsive corporate e-commerce website for **Phone Store Mourouj 6** — a Tunisian tech accessories store and phone/computer repair shop located at El Mourouj 2074.

## Tech Stack

- **Next.js 14** (App Router)
- **React 18 + TypeScript**
- **TailwindCSS** (custom design system: brand blue/black/white)
- **Framer Motion** (animations, transitions, counters)
- **Swiper.js** (carousels: featured products, reviews coverflow)
- **Zustand** (cart state with persistence)
- **react-hot-toast** (notifications)
- **lucide-react** (icons)

## Features

### Public site
- Animated hero section with floating cards, rotating ring, glassmorphism
- Auto-scrolling marquee for services/products
- Services section (phone repair, PC repair, accessories, support)
- Product categories grid (11 categories)
- Featured products carousel (Swiper autoplay)
- "Why choose us" with gradient borders
- Animated counters (5K+ clients, 10K+ repairs, etc.)
- Real customer reviews carousel (Ranim Bach, Sana El Kadhi, Kalil Zouaghia) — coverflow effect
- Store gallery (responsive masonry)
- FAQ accordion
- Google Maps embed + contact details
- Multi-language: **FR (default) / AR (RTL) / EN**
- Sticky animated navbar
- Floating WhatsApp + phone + scroll-to-top buttons
- Newsletter input in footer
- Social media links (Facebook / Instagram / TikTok)
- Full SEO metadata + Open Graph

### E-commerce
- Product listing with search, category filter, sort by price/popularity
- Product card with hover actions, badges (PROMO/NEW/TOP/BEST), discount %
- Quick-view modal with quantity selector
- Persistent shopping cart (localStorage)
- Checkout form (name, phone, address, optional note) — required fields validated
- Confirmation screen with order ID

### Admin dashboard (`/admin`)
- Secure login (default: `admin` / `phonestore2074`, httpOnly cookie)
- Overview with KPIs (orders, revenue, new orders, products)
- Orders panel with live polling (5s) + new-order notifications
- Status management (new → confirmed → delivered, or cancelled)
- Product CRUD: add / edit / delete / upload image / mark featured / stock / price / category
- Mobile-friendly

### API routes (`/app/api/*`)
- `POST /api/orders` — create order
- `GET  /api/orders` — list orders
- `PATCH /api/orders/[id]` — update order status
- `DELETE /api/orders/[id]` — delete order
- `GET /api/products` — list products
- `POST /api/products` — create
- `PATCH /api/products` — update
- `DELETE /api/products` — delete
- `POST /api/login` — admin auth
- `DELETE /api/login` — logout

## Run locally

```bash
npm install
npm run dev
```

Open http://localhost:3000

## Deploy on Vercel

```bash
npm install -g vercel
vercel
```

Or push to GitHub and import on https://vercel.com — Next.js is auto-detected. Add env vars `ADMIN_USER` and `ADMIN_PASS` in Vercel project settings.

> The in-memory order/product store is suitable for demo. For production, swap `lib/orders.ts` with Vercel Postgres / KV / Supabase.

## Store info

- **Address**: Phone Store, El Mourouj 2074, Tunisia
- **Phone**: 54 663 209
- **Technical service**: 51 884 577
- **Email**: phonestoremourouj6@gmail.com
- **Facebook**: https://www.facebook.com/phonestoremourouj/
- **Instagram**: https://www.instagram.com/phone_store_mourouj6
- **TikTok**: https://www.tiktok.com/@phone_store_mourouj_6
