import { createContext, useEffect, useState } from "react";

export const initialContext = {
    loginStatus: false,
    updateLoginStatus: () => { },
    role: '',
    updateRole: () => { },
    username: '',
    updateUsername: () => { },
    email: '',
    updateEmail: () => { },
    cars: [],
    carTypes: [],
    updateCars: () => { },
    updateCarTypes: () => { },
};

export const GlobalContext = createContext(initialContext);

export const ContextWrapper = (props) => {
    const [loginStatus, setLoginStatus] = useState(initialContext.loginStatus);
    const [role, setRole] = useState(initialContext.role);
    const [username, setUsername] = useState(initialContext.username);
    const [email, setEmail] = useState(initialContext.email);
    const [cars, setCars] = useState(initialContext.cars);
    const [carTypes, setCarTypes] = useState(initialContext.carTypes);
    //login
    useEffect(() => {
        fetch('http://localhost:3001/api/login', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            credentials: 'include',
        }).then(res => res.json())
            .then(data => {
                if (data.status === 'ok' && data.user) {
                    setLoginStatus(true);
                    setRole(data.user.role);
                    setUsername(data.user.username);
                    setEmail(data.user.email);
                }
            })
            .catch(console.error)
    }, []);
    //carlist
    useEffect(() => {
        fetch('http://localhost:3001/api/carList', {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
            },
            credentials: 'include',
        })
            .then(res => res.json())
            .then(data => {
                if (data.status === 'ok') {
                    setCars(data.data)
                }
            })
            .catch(console.error)
    }, []);
    //car types
    useEffect(() => {
        fetch('http://localhost:3001/api/carTypes', {
            credentials: 'include',
        }).then(res => res.json())
            .then(data => {
                if (data.status === 'ok') {
                    setCarTypes(data.carTypeFromDb);
                }
            })
            .catch(err => console.error(err))
    }, []);

    function updateRole(role) {
        const allowedRoles = ['admin', 'seller', 'buyer'];
        if (allowedRoles.includes(role)) {
            setRole(role);
        }
    }
    function updateLoginStatus(status) {
        setLoginStatus(status);
    }

    function updateUsername(data) {
        setUsername(data);
    }

    function updateEmail(data) {
        setEmail(data);
    }

    function updateCars(data) {
        setCars(data);
    }

    const value = {
        loginStatus,
        updateLoginStatus,
        role,
        updateRole,
        username,
        updateUsername,
        email,
        updateEmail,
        cars,
        updateCars,
        carTypes,
    }

    return (
        <GlobalContext.Provider value={value}>
            {props.children}
        </GlobalContext.Provider>
    );
};