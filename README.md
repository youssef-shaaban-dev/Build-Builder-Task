# Bundle Builder Prototype

This is a responsive React prototype for a multi-step bundle builder with a live review panel.

## Run Instructions

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Start the development server**:
   ```bash
   npm run dev
   ```

3. **Build for production**:
   ```bash
   npm run build
   ```

## Decisions & Tradeoffs

* **Framework & Build Tool**: Chose React with Vite and TypeScript. Vite provides a very fast development experience and instant HMR, while TypeScript enforces strong data modeling for the complex cart state.
* **Styling**: Adhered to the requirement of using standard Vanilla CSS. Used CSS Modules (`*.module.css`) to scope styles locally per component and avoid CSS class collisions, while maintaining raw CSS syntax. Set up a global CSS variable system (`index.css`) to match the exact Figma colors and spacing.
* **State Management**: Chose React Context paired with `useReducer` to manage the bundle state. This avoids adding external dependencies like Redux or Zustand, keeping the prototype pure and lightweight while handling complex state mutations (variant quantities, totals).
* **Data Model**: Modeled `CartItem` to track both `productId` and `variantId` separately. This allows independent tracking of variants (e.g., adding 2 White cameras and 1 Black camera) seamlessly.
* **Persistence**: State is persisted to `localStorage` automatically when using "Save for later". It hydrates on initial load so returning users find their configuration exactly as they left it.
* **Responsiveness**: Used CSS Grid and Flexbox to create a layout that gracefully degrades to a single column on smaller viewports.

## Next Steps / What wasn't finished
* **Fidelity fine-tuning**: Some minor pixel pushing (exact line heights, specific custom typography fonts) might be needed to achieve 100% pixel perfection if the Figma assets were exported. Used standard system fonts for this prototype.
* **Animations**: Simple CSS transitions were added, but more complex accordion height animations could be implemented.
