import React from 'react'
import { Outlet } from 'react-router-dom'
import { Menu } from './components/Menu/Menu'

import './App.sass'


function App() {
    return (
        <div className="app">
            <div className="app__menu">
                <Menu />
            </div>
            <div className="app__pages">
                <Outlet />
            </div>
        </div>
    );
}

export default App;