import React, { lazy, Suspense } from 'react'
import { BrowserRouter, Route, Routes} from 'react-router-dom'
// import reportWebVitals from './reportWebVitals'
import App from './App'
import { Users } from './modules/Users/Users'
import { Profile } from './modules/Users/Profile/Profile'
import { createRoot } from 'react-dom/client'
import { Preloader } from './components/Preloader/Preloader'

const Home = lazy(() => import('./modules/Home/Home'))
const Table = lazy(() => import('./modules/Users/Table/Table'))
const Settings = lazy(() => import('./modules/Settings/Settings'))

const root = createRoot(document.getElementById('root') as HTMLDivElement)

root.render(
  // <React.StrictMode>
    <BrowserRouter>
      <Suspense fallback={<Preloader />}>
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
      </Suspense>
    </BrowserRouter>
  // </React.StrictMode>
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals(console.log);
