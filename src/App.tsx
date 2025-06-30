import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./pages/Layout.tsx";
import Login from "./pages/Login.tsx";
import Dashboard from "./pages/Dashboard.tsx";
import ResetP from "./pages/ResetP.tsx";
import OTP from "./pages/OTP.tsx";
import './App.css'
import Temp from "./pages/temp.tsx";

function App() {

    return (
        <Router>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/reset" element={<ResetP />} />
                <Route path="/otp" element={<OTP />} />

                <Route path="/pages" element={<Layout />}>
                    <Route index element={<Dashboard />} />
                    <Route path="temp" element={<Temp />} />
                </Route>

            </Routes>
        </Router>
    );
}

export default App
