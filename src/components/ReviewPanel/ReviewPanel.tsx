import styles from './ReviewPanel.module.css';
import { useBundleStore } from '../../store/useBundleStore';
import { Variant } from '../../types/index';
import { Minus, Plus, Truck } from 'lucide-react';

export default function ReviewPanel() {
  const { cart, products, setQuantity, saveForLater } = useBundleStore();

  const handleIncrement = (productId: string, variantId: string | null, currentQuantity: number) => {
    setQuantity(productId, variantId, currentQuantity + 1);
  };

  const handleDecrement = (productId: string, variantId: string | null, currentQuantity: number) => {
    if (currentQuantity > 0) {
      setQuantity(productId, variantId, currentQuantity - 1);
    }
  };



  // Group cart items by category
  const categories = [
    { id: 'cameras', label: 'CAMERAS' },
    { id: 'sensors', label: 'SENSORS' },
    { id: 'accessories', label: 'ACCESSORIES' },
    { id: 'plan', label: 'HOME MONITORING PLAN' },
  ];

  let totalPrice = 0;
  let totalComparePrice = 0;
  let savings = 0;

  const renderCategoryItems = (categoryId: string) => {
    const categoryProducts = products.filter((p) => p.categoryId === categoryId);
    const itemsToRender: React.ReactNode[] = [];

    categoryProducts.forEach((product) => {
      // Find all cart items for this product
      const productCartItems = cart.filter((c) => c.productId === product.id && c.quantity > 0);
      
      productCartItems.forEach((cartItem) => {
        let name = product.name;
        if (cartItem.variantId) {
          const variant = product.variants.find((v: Variant) => v.id === cartItem.variantId);
          if (variant) name += ` (${variant.name})`;
        }

        const itemPrice = product.price * cartItem.quantity;
        const itemComparePrice = (product.compareAtPrice || product.price) * cartItem.quantity;
        
        totalPrice += itemPrice;
        totalComparePrice += itemComparePrice;

        itemsToRender.push(
          <div key={`${cartItem.productId}-${cartItem.variantId}`} className={styles.lineItem}>
            <div className={styles.itemImageContainer}>
              <img src={product.image} alt={name} className={styles.itemImage} />
            </div>
            <div className={styles.itemDetails}>
              <span className={styles.itemName}>{name}</span>
            </div>
            
            <div className={styles.itemControls}>
              <div className={styles.stepper}>
                <button 
                  className={styles.stepperBtn} 
                  onClick={() => handleDecrement(cartItem.productId, cartItem.variantId, cartItem.quantity)}
                >
                  <Minus size={12} />
                </button>
                <span className={styles.quantity}>{cartItem.quantity}</span>
                <button 
                  className={styles.stepperBtn} 
                  onClick={() => handleIncrement(cartItem.productId, cartItem.variantId, cartItem.quantity)}
                >
                  <Plus size={12} />
                </button>
              </div>
            </div>

            <div className={styles.itemPricing}>
              {product.compareAtPrice && (
                <span className={styles.comparePrice}>${(product.compareAtPrice).toFixed(2)}</span>
              )}
              <span className={styles.price}>${product.price.toFixed(2)}</span>
            </div>
          </div>
        );
      });
    });

    if (itemsToRender.length === 0) return null;

    return (
      <div key={categoryId} className={styles.categorySection}>
        <h4 className={styles.categoryLabel}>{categories.find(c => c.id === categoryId)?.label}</h4>
        <div className={styles.categoryItems}>
          {itemsToRender}
        </div>
      </div>
    );
  };

  savings = totalComparePrice - totalPrice;

  return (
    <div className={styles.reviewPanel}>
      <div className={styles.header}>
        <span className={styles.reviewLabel}>REVIEW</span>
        <h2>Your security system</h2>
        <p className={styles.description}>
          Review your personalized protection system designed to keep what matters most safe.
        </p>
      </div>

      <div className={styles.itemsList}>
        {categories.map((cat) => renderCategoryItems(cat.id))}
      </div>

      <div className={styles.shippingRow}>
        <div className={styles.shippingLeft}>
          <Truck className={styles.shippingIcon} size={24} />
          <span className={styles.shippingText}>Fast Shipping</span>
        </div>
        <div className={styles.shippingPricing}>
          <span className={styles.shippingStrike}>$5.99</span>
          <span className={styles.shippingFree}>FREE</span>
        </div>
      </div>

      <div className={styles.totalsSection}>
        <div className={styles.guaranteeRow}>
          <div className={styles.badgeContainer}>
            <div className={styles.guaranteeBadge}>100% Satisfaction Guarantee</div>
          </div>
          <div className={styles.financing}>
             <div className={styles.financeTag}>as low as $19.19/mo</div>
          </div>
        </div>

        <div className={styles.totalsRow}>
          {savings > 0 && <span className={styles.totalCompare}>${totalComparePrice.toFixed(2)}</span>}
          <span className={styles.finalTotal}>${totalPrice.toFixed(2)}</span>
        </div>

        {savings > 0 && (
          <p className={styles.savingsCallout}>
            Congrats! You're saving ${savings.toFixed(2)} on your security bundle!
          </p>
        )}

        <button className={styles.checkoutBtn}>Checkout</button>
        <button className={styles.saveBtn} onClick={saveForLater}>
          Save my system for later
        </button>
      </div>
    </div>
  );
}
