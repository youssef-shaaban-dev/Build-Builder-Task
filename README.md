# Bundle Builder Prototype

This is a responsive React prototype for a multi-step bundle builder with a live review panel.

## Run Instructions

This project uses a mock JSON backend for product data, as well as a Vite frontend server. You will need to run both concurrently in separate terminal windows.

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Start the backend server** (serves `src/data/products.json` at `http://localhost:3000`):
   ```bash
   npm run server
   ```

3. **Start the frontend development server**:
   ```bash
   npm run dev
   ```

4. **Build for production**:
   ```bash
   npm run build
   ```

## Decisions & Tradeoffs

* **Framework & Build Tool**: Chose React with Vite and TypeScript. Vite provides a very fast development experience and instant HMR, while TypeScript enforces strong data modeling for the complex cart state.
* **Styling**: Adhered to the requirement of using standard Vanilla CSS. Used CSS Modules (`*.module.css`) to scope styles locally per component and avoid CSS class collisions, while maintaining raw CSS syntax. Set up a global CSS variable system (`index.css`) to match the exact Figma colors and spacing.
* **State Management**: Chose Zustand for state management. It provides a lightweight, clean, and highly scalable global store without the heavy boilerplate of Redux or the re-rendering caveats of Context API.
* **Data Model**: Modeled `CartItem` to track both `productId` and `variantId` separately. This allows independent tracking of variants (e.g., adding 2 White cameras and 1 Black camera) seamlessly.
* **Persistence**: State is persisted to `localStorage` when using "Save for later". It hydrates on initial load so returning users find their configuration exactly as they left it.
* **Mock Backend**: Implemented `json-server` to act as a robust mock backend, decoupling the frontend store from static files.
* **Responsiveness**: Used CSS Grid and Flexbox to create a layout that gracefully degrades to a single stacked column on smaller viewports.
