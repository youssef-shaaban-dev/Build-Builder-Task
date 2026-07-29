import React from 'react';
import styles from './AccordionStep.module.css';
import { ChevronDown, ChevronUp } from 'lucide-react';

interface AccordionStepProps {
  stepIndex: number;
  totalSteps: number;
  title: string;
  icon: React.ReactNode;
  isOpen: boolean;
  selectedCount: number;
  onToggle: () => void;
  onNext?: () => void;
  children: React.ReactNode;
}

export default function AccordionStep({
  stepIndex,
  totalSteps,
  title,
  icon,
  isOpen,
  selectedCount,
  onToggle,
  onNext,
  children
}: AccordionStepProps) {
  return (
    <div className={styles.accordionWrapper}>
      <span className={styles.stepLabel}>STEP {stepIndex} OF {totalSteps}</span>
      <div className={`${styles.stepContainer} ${isOpen ? styles.open : ''}`}>
        <div className={styles.stepHeader} onClick={onToggle}>
          <div className={styles.titleRow}>
            <span className={styles.icon}>{icon}</span>
            <h2 className={styles.title}>{title}</h2>
          </div>
          <div className={styles.stateIndicator}>
            {selectedCount > 0 && <span className={styles.selectedCount}>{selectedCount} selected</span>}
            {isOpen ? <ChevronUp className={styles.chevron} /> : <ChevronDown className={styles.chevron} />}
          </div>
        </div>
      
      {isOpen && (
        <div className={styles.stepContent}>
          {children}
          {onNext && stepIndex < totalSteps && (
            <div className={styles.nextButtonContainer}>
              <button className={styles.nextButton} onClick={onNext}>
                Next: Choose your {stepIndex === 1 ? 'plan' : stepIndex === 2 ? 'sensors' : 'extra protection'}
              </button>
            </div>
          )}
        </div>
      )}
      </div>
    </div>
  );
}
