import { Suspense } from 'react';
import { Link, Route, Routes } from 'react-router-dom';
import { Admin } from './admin/Admin';
import './App.css';

function App() {
  return (
    <Suspense fallback={'Preloader'}>
      <Routes>
        <Route
          path="/"
          element={
            <>
              <h1>Site</h1>
              <Link to='/admin'>Admin</Link>
            </>
          }
        />
        <Route path="/admin/*" element={<Admin />} />
      </Routes>
    </Suspense>
  );
}

export default App;
