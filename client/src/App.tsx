import { Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import { Admin } from './admin/Admin';
import './App.css';

function App() {
  return (
    <Suspense fallback={'Preloader'}>
      <Routes>
        <Route path="/" element={<h1>Site</h1>} />
        <Route path="/admin/*" element={<Admin/>} />
      </Routes>
    </Suspense>
  );
}

export default App;
