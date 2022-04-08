import { createContext, useEffect, useState } from "react";
import axios from '../config/axios'
import { setToken, clearToken, getToken } from "../services/localStorage";

const AuthContext = createContext();

function AuthContextProvider({ children }) {
    const [user, setUser] = useState(null);

    useEffect(() => {
        if (getToken()) {
            axios
                .get('/users/me')
                .then(res => setUser(res.data.user))
                .catch(err => console.log(err));
        }
    }, []);

    // login input email,phoneNumber and response .post(/path) from backend
    // send value than get token from backend
    const login = async (emailOrPhoneNumber, password) => {
        try {
            const res = await axios.post('/users/login', {
                emailOrPhoneNumber,
                password
            });
            setToken(res.data.token); // use token from backend and keep in localstorage
            setUser(res.data.user) // data include token and user data
        } catch (err) {
            console.log(err)
        }
    };

    // use to logout with delete token and set user to null
    const logout = () => {
        clearToken()
        setUser(null)
    }

    const updateUser = (value) => { // update picture user
        setUser(prev => ({ ...prev, ...value }))
    }

    // at first user is initial don't have value when login user get token and
    // from backend and keep in localstorage by user have token too
    // And when user logout all token are clear and user value are null 
    // but token still keep in localstorage wait for expired time
    return (
        <AuthContext.Provider value={{ user, login, logout, updateUser }}> {/* {{ }} sent object by object {{user : null, login : null, logout : null}}*/}
            {children}
        </AuthContext.Provider>
    );
};


export default AuthContextProvider;

export { AuthContext };