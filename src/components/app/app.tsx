import { ConstructorPage, Feed } from '@pages';
import '../../index.css';
import styles from './app.module.css';
import { Routes, Route } from 'react-router-dom';
import { AppHeader } from '@components';

function App() {
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
      ></Route>
      <Route path={'/feed'} element={<Feed></Feed>}></Route>
    </Routes>
  );
}

export default App;
