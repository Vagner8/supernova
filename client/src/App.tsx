import React from 'react';
import './App.sass';
import { AppRouter } from './components/AppRouter/AppRouter';
import { Menu } from './components/Menu/Menu';

function App() {
    return (
        <div className="app">
            <div className="app__menu">
                <Menu />
            </div>
            <div className="app__pages">
                <AppRouter />
            </div>
        </div>
    );
}

export default App;
