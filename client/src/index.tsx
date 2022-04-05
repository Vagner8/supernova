import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Home } from './pages/Home/Home'
import { Settings } from './pages/Settings/Settings'
import { UserProfile } from './pages/Users/UserProfile/UserProfile'
import { Users } from './pages/Users/Users'
import reportWebVitals from './reportWebVitals'
import App from './App'

export enum Path {
  Users = 'users',
  UserProfile = ':userId',
  Settings = 'settings'
}

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<App />} >
            <Route index element={<Home/>} />
            <Route path={Path.Users} element={<Users/>} >
              <Route path={Path.UserProfile} element={<UserProfile/>} /> 
            </Route>
            <Route path={Path.Settings} element={<Settings/>} />   
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
