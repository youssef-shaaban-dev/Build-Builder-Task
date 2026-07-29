import Builder from './components/Builder/Builder';
import ReviewPanel from './components/ReviewPanel/ReviewPanel';
import styles from './App.module.css';

function App() {
  return (
    <div className={styles.appContainer}>
      <div className={styles.content}>
        <div className={styles.header}>
          <h1>Let's get started!</h1>
        </div>
        <main className={styles.mainGrid}>
          <div className={styles.builderColumn}>
            <Builder />
          </div>
          <div className={styles.reviewColumn}>
            <ReviewPanel />
          </div>
        </main>
      </div>
    </div>
  );
}

export default App;
