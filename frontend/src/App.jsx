import React from 'react';
import NewForm from './components/NewForm';
import styles from './components/App.module.css';

const App = () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <div style={{ marginBottom: '50px' }}>
        <NewForm />
      </div>
      <footer
        className={styles.footerNewForm}
        style={{ position: 'fixed', bottom: 0, width: '100%', backgroundColor: '#f0f0f0', padding: '10px' }}
      >
        <button
          className={styles.saveButton}
          type='submit'
          style={{ position: 'fixed', bottom: '10px', right: '10px' }}
        >
          Save
        </button>
      </footer>
    </div>
  );
};

export default App;
