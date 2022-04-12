import React from 'react';
import { Outlet } from 'react-router-dom';
import { Menu } from './modules/Menu/Menu';

import './App.sass';

function App() {
  return (
    <div className="app">
      <div className="app__right">
        <Menu />
      </div>
      <div className="app__left">
        <Outlet />
      </div>
    </div>
  );
}

export default App;
