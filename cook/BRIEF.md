# Brief: Employee Leave Management SaaS Dashboard (AlignUI Reverse-Engineer)

## 1. What to Build & Stack
- **Target**: High-fidelity Employee Leave Management SaaS Dashboard reverse-engineered from the AlignUI Synergy HR Management dashboard reference image.
- **Stack**: React 18+, Vite, Tailwind CSS, Framer Motion, Lucide React, date-fns / canvas-confetti.
- **Platform**: Web (Desktop primary 1280px-1920px, fully responsive down to mobile 375px).

## 2. Reference & Styling
- **Reference**: `cook/refs/R01.webp` (AlignUI Synergy HR Dashboard).
- **Aesthetic**: Light-theme minimalist, ultra-clean Bento-grid, pure white cards on neutral canvas (`#F8F9FA` / `#F4F5F7`), subtle borders (`border-neutral-200/80`), rounded-2xl cards, crisp typography (Inter / Plus Jakarta Sans scale), vibrant primary purple accent (`#6E44FF` / `#6366F1`), soft pastel gradients for schedule cards (peach, soft blue, soft lavender), soft colored badges for statuses.

## 3. Bar & Dimensions
- **Composition**: Exact 3-column Bento grid with Left Sidebar, Top Navigation Bar, Column 1 (Leave Balances & Status Tracker), Column 2 (Current Project / Team Availability & Quick Notes), Column 3 (Schedule & Holidays Widget).
- **Typography Scale**: Matches reference hierarchy — `text-xl font-bold` for headings, `text-xs font-semibold` uppercase section headers, `text-sm font-medium` body, `text-xs text-neutral-400` metadata.
- **Visual Accuracy**: Circular/arc progress gauges (`X OUT OF Y`), soft pills with status dot, pastel gradient cards with avatar stacks, badge tags.
- **Interactive Fidelity**: Animated "Apply for Leave" modal with smooth spring Framer Motion and blurred backdrop, live state updates (submitting a leave adds it to Recent Requests and updates balance counters), interactive tabs, date picker strip, interactive hover states.

## 4. Deliverable
- Production-ready, fully interactive React SPA running on local preview (`http://localhost:5173`).
- Clean modular component structure with rich mock data and complete interactive flows.
