import React, {useState, useEffect, useContext} from 'react';
import {Navigate} from 'react-router-dom';
import AuthContext from '../../utilities/authContext';
import localStorageClearData from '../../utilities/handleLogout';

const Logout = () => {
    const [isLoggedOut, setIsLoggedOut] = useState(true);
    const {handleAuth} = useContext(AuthContext)
    useEffect(() => {
        localStorageClearData()
        handleAuth();
        // eslint-disable-next-line
        setIsLoggedOut(!isLoggedOut);
    }, [handleAuth, isLoggedOut])

    return <Navigate to="/" />
}

export default Logout;