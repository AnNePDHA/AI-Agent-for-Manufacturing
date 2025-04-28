import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useState } from "react";
import NotFound from "./components/NotFound";
import LoginPage from "./components/LoginPage/LoginPage";
import Home from "./components/Home/Home";

const Router = () => {
    // Replace with your authentication logic
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    
    // Custom Higher-Order Component for authentication check
    const ProtectedRoute = ({ element }: any): any => {
        const isLogged: boolean = JSON.parse(localStorage.getItem("isLoggedIn") || "false") || false;
        
        console.log(isLogged)
        if (!isLogged) {
            return <Navigate to="/login" />;
        }

        return <>{element}</>;
    };


    return (
        <BrowserRouter>
        <Routes>
            {/* <Route path="/login" element={<LoginPage />} /> */}
            {/* <Route path="/" element={<ProtectedRoute element={<Home />} />} />
   
            <Route path='/home' element={<ProtectedRoute element={<Home />}  />}/> 
            <Route path='homeContent' element={<ProtectedRoute element={<Home />} />}/>
            <Route path='/chatbot' element={<ProtectedRoute element={<Home />} />}/> */}

            <Route path="/" element={<Home />} />
            
            <Route path='/home' element={<Home />}/> 
            <Route path='homeContent' element={<Home />}/>
            <Route path='/chatbot' element={<Home />}/>

            <Route path="*" element={<NotFound />} />
        </Routes>
        </BrowserRouter>
    );
};

export default Router;