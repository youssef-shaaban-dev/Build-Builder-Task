import { create } from 'zustand';

export interface CartItem {
  productId: string;
  variantId: string | null;
  quantity: number;
}

interface BundleState {
  cart: CartItem[];
  activeStep: number;
  setQuantity: (productId: string, variantId: string | null, quantity: number) => void;
  setActiveStep: (step: number) => void;
  saveForLater: () => void;
}

const getInitialState = () => {
  const saved = localStorage.getItem('bundle_builder_state');
  if (saved) {
    try {
      const parsed = JSON.parse(saved);
      if (parsed.cart) return parsed;
    } catch (e) {
      console.error('Failed to parse saved state', e);
    }
  }
  return {
    cart: [
      { productId: 'sense-motion-sensor', variantId: null, quantity: 2 },
      { productId: 'sense-hub', variantId: null, quantity: 1 },
      { productId: 'microsd-card-256', variantId: null, quantity: 2 },
      { productId: 'cam-unlimited', variantId: null, quantity: 1 },
    ],
    activeStep: 1,
  };
};

export const useBundleStore = create<BundleState>((set, get) => ({
  ...getInitialState(),
  setQuantity: (productId, variantId, quantity) =>
    set((state) => {
      const newCart = [...state.cart];
      const existingItemIndex = newCart.findIndex(
        (item) => item.productId === productId && item.variantId === variantId
      );

      if (existingItemIndex >= 0) {
        if (quantity === 0) {
          newCart.splice(existingItemIndex, 1);
        } else {
          newCart[existingItemIndex] = { ...newCart[existingItemIndex], quantity };
        }
      } else if (quantity > 0) {
        newCart.push({ productId, variantId, quantity });
      }

      return { cart: newCart };
    }),
  setActiveStep: (step) => set({ activeStep: step }),
  saveForLater: () => {
    const { cart, activeStep } = get();
    localStorage.setItem('bundle_builder_state', JSON.stringify({ cart, activeStep }));
    alert('System saved for later!');
  },
}));
