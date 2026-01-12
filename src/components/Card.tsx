import React from 'react';
import styles from './Card.module.css';

const Card = () => {
  return (
    <div className={styles.card}>
      <div className={styles.cardShine} />
      <div className={styles.cardGlow} />
      <div className={styles.cardContent}>
        <div className={styles.cardBadge}>NEW</div>
        <div style={{backgroundColor: '#a78bfa'}} className={styles.cardImage} />
        <div className={styles.cardText}>
          <p className={styles.cardTitle}>Premium Design</p>
          <p className={styles.cardDescription}>Hover to reveal stunning effects</p>
        </div>
        <div className={styles.cardFooter}>
          <div className={styles.cardPrice}>$49.99</div>
          <div className={styles.cardButton}>
            <svg height={16} width={16} viewBox="0 0 24 24">
              <path strokeWidth={2} stroke="currentColor" d="M4 12H20M12 4V20" fill="currentColor" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
