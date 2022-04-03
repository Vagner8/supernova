import { Routes, Route } from "react-router-dom";
import { Home } from "../../pages/Home/Home";
import { Settings } from "../../pages/Settings/Settings";
import { Users } from "../../pages/Users/Users";

export function AppRouter() {
    return (
        <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/users" element={<Users/>}/>
            <Route path="/settings" element={<Settings/>}/>
        </Routes>
    )
}