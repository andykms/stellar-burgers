import { ConstructorPage } from '@pages';
import '../../index.css';
import styles from './app.module.css';
import { Routes, Route } from 'react-router-dom';
import { AppHeader } from '@components';

const App = () => {
  return (
    <Routes>
      <Route
        path={'/'}
        element={
          <div className={styles.app}>
            <AppHeader />
            <ConstructorPage />
          </div>
        }
      />
    </Routes>
  );
};

export default App;
