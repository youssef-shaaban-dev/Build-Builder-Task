import styles from './Builder.module.css';
import { Camera, Shield, Wifi, Grid } from 'lucide-react';
import AccordionStep from '../Accordion/AccordionStep';
import ProductCard from '../ProductCard/ProductCard';
import { useBundleStore } from '../../store/useBundleStore';

const stepsConfig = [
  { id: 'cameras', title: 'Choose your cameras', icon: <Camera size={20} /> },
  { id: 'plan', title: 'Choose your plan', icon: <Shield size={20} /> },
  { id: 'sensors', title: 'Choose your sensors', icon: <Wifi size={20} /> },
  { id: 'accessories', title: 'Add extra protection', icon: <Grid size={20} /> },
];

export default function Builder() {
  const { cart, products, activeStep, setActiveStep } = useBundleStore();

  const handleToggle = (stepIndex: number) => {
    setActiveStep(activeStep === stepIndex ? 0 : stepIndex);
  };

  const handleNext = (stepIndex: number) => {
    setActiveStep(stepIndex + 1);
  };

  const getSelectedCountForCategory = (categoryId: string) => {
    // Count distinct products selected in this category
    const categoryProducts = products.filter(p => p.categoryId === categoryId);
    let count = 0;
    categoryProducts.forEach(p => {
      const hasAny = cart.some(item => item.productId === p.id && item.quantity > 0);
      if (hasAny) count++;
    });
    return count;
  };

  return (
    <div className={styles.builder}>
      {stepsConfig.map((step, index) => {
        const stepNumber = index + 1;
        const categoryProducts = products.filter(p => p.categoryId === step.id);
        const selectedCount = getSelectedCountForCategory(step.id);

        return (
          <AccordionStep
            key={step.id}
            stepIndex={stepNumber}
            totalSteps={stepsConfig.length}
            title={step.title}
            icon={step.icon}
            isOpen={activeStep === stepNumber}
            selectedCount={selectedCount}
            onToggle={() => handleToggle(stepNumber)}
            onNext={() => handleNext(stepNumber)}
          >
            <div className={styles.productGrid}>
              {categoryProducts.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </AccordionStep>
        );
      })}
    </div>
  );
}
