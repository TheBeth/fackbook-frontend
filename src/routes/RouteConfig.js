import { Routes, Route } from 'react-router-dom'
import PublicLayout from '../components/layouts/PublicLayout';
import Login from '../pages/Login';
import Register from '../pages/Register';

function RouteConfig() {
    return (
        <Routes>
            <Route path="/" element={<PublicLayout />} >
                <Route path="" element={<Login />} /> 
                <Route path="register" element={<Register />} />
            </Route>
        </Routes>
    );
};

export default RouteConfig;

// get resource from sub path element folder file to outlet on ...Layout file