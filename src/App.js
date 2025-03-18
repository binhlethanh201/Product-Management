import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import Login from "./components/login";
import Product from "./components/product";
import Detail from "./components/detail";
import Update from "./components/updateProduct";
import Add from "./components/addProduct";

function App() {
    const [loggedIn, setLoggedIn] = useState(false);

    useEffect(() => {
        const existToken = localStorage.getItem("token");
        const existAccount = localStorage.getItem("account");
        if (existAccount && existToken) {
            setLoggedIn(true);
        }
    }, []);

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("account");
        setLoggedIn(false);
        window.location.href = "/";
    };

    return (
        <div>
            <header>
                {loggedIn ? (
                    <span>
                        <a href="#" onClick={handleLogout}>Logout</a>
                    </span>
                ) : (
                    <span></span>
                )}
            </header>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Login />} />
                    <Route path="/product" element={<Product />} />
                    <Route path="/product/:id" element={<Detail />} />
                    <Route path="/product/:id/update" element={<Update />} />
                    <Route path="/product/add" element={<Add />} />
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;