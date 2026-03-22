# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev       # Start Vite development server
npm run build     # Production build
npm run preview   # Preview production build locally
npm run lint      # Run ESLint
```

No test framework is configured in this project.

## Architecture

**Nice Surprise** is a single-page React 19 + Vite e-commerce frontend for an Argentine gift/surprise box business. It uses Bootstrap 5 for styling and has no routing library — navigation is scroll-based with anchor links.

### App structure

`main.jsx` → `App.jsx` → `CartProvider` wraps all sections in order:
`Header` → `HeroSection` → `AboutSection` → `ProductsSection` → `TeamSection` → `Footer`
Plus global overlays: `ConfettiEffect`, `BalloonsEffect`, `WhatsAppButton`, `ToastContainer`.

### State management

A single React Context (`src/context/CartContext.jsx`) manages the shopping cart with localStorage persistence (`"nicesurprise_cart"` key). The `useCart()` hook exposes: `cart`, `addToCart`, `removeFromCart`, `updateQuantity`, `clearCart`, `getCartTotal`, `getCartItemsCount`.

### Product data

All products are hardcoded in `src/components/ProductsSection/ProductsSection.jsx` as a static array. Each product has: `id`, `title`, `description`, `price`, `image`, and optionally a `paymentLink` (Mercado Pago URL per product). Images live in `src/img/`.

### Payment flow

Two entry points feed into the same checkout:
1. **ProductModal** → "Comprar ahora" button → checkout form → payment method
2. **CartModal** → checkout form → payment method

Payment methods: **Transferencia bancaria** (TransferModal) and **Mercado Pago** (MercadoPagoModal). Both are modal overlays, not redirects. After payment method selection, a WhatsApp message is composed and opened to `wa.me/5493516600019` with order details.

There is no backend — payment links are direct Mercado Pago URLs, and bank details (CBU, alias, CUIT) are hardcoded in `TransferModal.jsx`. A generic fallback Mercado Pago link lives in `src/constants/mercadopago.js`.

### Checkout form

Handles Argentine phone number format validation. Shows delivery address fields conditionally when "Envío a domicilio" is selected (vs. pickup). Name, last name, and phone are always required.

### Disabled features (commented out in code)

- Cart badge counter on header icon
- Quantity selector in ProductModal
- "Agregar al carrito" button in ProductModal (only "Comprar ahora" is active)
- Mobile cart button

### Animations

- **ConfettiEffect**: canvas-confetti fires on page load
- **BalloonsEffect**: CSS balloon animations
- **framer-motion**: installed but not actively used in the main flow
- **react-intersection-observer**: used via `useScrollAnimation` hook in `src/hooks/useScrollAnimation.js` for scroll-triggered reveals
