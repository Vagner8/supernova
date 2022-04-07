import React from 'react'
import { BrowserRouter, Route, Routes} from 'react-router-dom'
import reportWebVitals from './reportWebVitals'
import App from './App'
import { Home } from './modules/Home/Home'
import { Users } from './modules/Users/Users'
import { Table } from './modules/Users/Table/Table'
import { Profile } from './modules/Users/Profile/Profile'
import { Settings } from './modules/Settings/Settings'
import { createRoot } from 'react-dom/client'

const root = createRoot(document.getElementById('root') as HTMLDivElement)

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<App />} >
          <Route index element={<Home />} />
          <Route path="users" element={<Users />} >
            <Route index element={<Table />} />
            <Route path=':userId' element={<Profile />} />
          </Route>
          <Route path="settings" element={<Settings />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
