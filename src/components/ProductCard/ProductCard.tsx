import { useState } from 'react';
import styles from './ProductCard.module.css';
import { Product } from '../../types/index';
import { useBundleStore } from '../../store/useBundleStore';
import { Minus, Plus } from 'lucide-react';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { cart, setQuantity } = useBundleStore();
  
  // Default to first variant if exists, else null
  const [activeVariantId, setActiveVariantId] = useState<string | null>(
    product.variants.length > 0 ? product.variants[0].id : null
  );

  // Find quantity for currently selected variant (or product if no variants)
  const cartItem = cart.find(
    (item) => item.productId === product.id && item.variantId === activeVariantId
  );
  const quantity = cartItem ? cartItem.quantity : 0;

  // Calculate total quantity across all variants to determine if card is "selected"
  const totalProductQuantity = cart
    .filter((item) => item.productId === product.id)
    .reduce((sum, item) => sum + item.quantity, 0);
  
  const isSelected = totalProductQuantity > 0;

  const handleIncrement = () => {
    setQuantity(product.id, activeVariantId, quantity + 1);
  };

  const handleDecrement = () => {
    if (quantity > 0) {
      setQuantity(product.id, activeVariantId, quantity - 1);
    }
  };

  return (
    <div className={`${styles.card} ${isSelected ? styles.selected : ''}`}>
      {product.badge && <div className={styles.badge}>{product.badge}</div>}
      
      <div className={styles.imageContainer}>
        <img src={product.image} alt={product.name} className={styles.image} />
      </div>

      <div className={styles.content}>
        <h3 className={styles.title}>{product.name}</h3>
        {product.description && (
          <p className={styles.description}>
            {product.description}{' '}
            {product.learnMoreUrl && (
              <a href={product.learnMoreUrl} className={styles.learnMore}>Learn More</a>
            )}
          </p>
        )}

        {product.variants.length > 0 && (
          <div className={styles.variants}>
            {product.variants.map((variant) => (
              <button
                key={variant.id}
                className={`${styles.variantChip} ${activeVariantId === variant.id ? styles.variantActive : ''}`}
                onClick={() => setActiveVariantId(variant.id)}
              >
                <span 
                  className={styles.colorSwatch} 
                  style={{ backgroundColor: variant.colorHex }}
                />
                <span className={styles.variantName}>{variant.name}</span>
              </button>
            ))}
          </div>
        )}

        <div className={styles.footer}>
          <div className={styles.stepper}>
            <button 
              className={styles.stepperBtn} 
              onClick={handleDecrement}
              disabled={quantity === 0}
            >
              <Minus size={16} />
            </button>
            <span className={styles.quantity}>{quantity}</span>
            <button className={styles.stepperBtn} onClick={handleIncrement}>
              <Plus size={16} />
            </button>
          </div>
          
          <div className={styles.pricing}>
            {product.compareAtPrice && (
              <span className={styles.comparePrice}>${product.compareAtPrice.toFixed(2)}</span>
            )}
            <span className={`${styles.price} ${product.compareAtPrice ? styles.discountedPrice : ''}`}>
              ${product.price.toFixed(2)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
