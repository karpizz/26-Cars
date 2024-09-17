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
    message: '',
    updateMessage: () => { },
    userImg: '',
    updateUserPhoto: () => { },
};

export const GlobalContext = createContext(initialContext);

export const ContextWrapper = (props) => {
    const [loginStatus, setLoginStatus] = useState(initialContext.loginStatus);
    const [role, setRole] = useState(initialContext.role);
    const [username, setUsername] = useState(initialContext.username);
    const [email, setEmail] = useState(initialContext.email);
    const [cars, setCars] = useState(initialContext.cars);
    const [carTypes, setCarTypes] = useState(initialContext.carTypes);
    const [message, setMessage] = useState(initialContext.message);
    const [userImg, setUserImg] = useState(initialContext.userImg);

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

    //user photo
    useEffect(() => {
        fetch('http://localhost:3001/api/profile', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            credentials: 'include',
        }).then(res => res.json())
            .then(data => {
                if (data.status === 'ok') {
                    setUserImg(data.data.user_photo)
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

    useEffect(() => {
        const timer = setInterval(() => {
            setMessage('')
        }, 5000)

        return () => clearInterval(timer)
    }, [message])

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

    function updateMessage(data) {
        setMessage(data);
    }

    function updateUserPhoto(data) {
        setUserImg(data);
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
        message,
        updateMessage,
        userImg,
        updateUserPhoto,
    }

    return (
        <GlobalContext.Provider value={value}>
            {props.children}
        </GlobalContext.Provider>
    );
};