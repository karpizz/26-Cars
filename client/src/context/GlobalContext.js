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
    updateCars: () => { },
    carTypes: [],
    updateCarTypes: () => { },
    message: '',
    updateMessage: () => { },
    errMessage: '',
    updateErrMessage: () => { },
    userPhotoContext: '',
    updateUserPhoto: () => { },
    userMoney: 0,
    updateUserMoney: () => { },
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
    const [errMessage, setErrMessage] = useState(initialContext.errMessage);
    const [userMoney, setUserMoney] = useState(initialContext.userMoney);
    const [userPhotoContext, setUserphoto] = useState(initialContext.userPhotoContext);

    //login, status, role, username, email
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

    //user picture
    useEffect(() => {
        fetch('http://localhost:3001/api/profile', {
            method: 'GET',
            headers: {
                Accept: 'application/json',
            },
            credentials: 'include',
        }).then(res => res.json())
            .then(data => {
                if (data.status === 'ok') {
                    setUserphoto(data.user.user_photo);
                }
            })
            .catch(err => console.error(err))
        return setUserphoto('');
    }, [email]);

    const newLocal = role === 'buyer';

    //funds
    useEffect(() => {
        let countSum = 0;
        fetch('http://localhost:3001/api/funds', {
            method: 'GET',
            headers: {
                Accept: 'application/json',
            },
            credentials: 'include',
        }).then(res => res.json())
            .then(data => {
                if (data.status === 'ok') {
                    data.funds.map(a => countSum += a.funds);
                    setUserMoney(countSum);
                }
            })
            .catch(err => console.error(err))
        return setUserMoney(0);
    }, [newLocal]);

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
        const timer = setTimeout(() => {
            setMessage('');
            setErrMessage('');
        }, 3000);

        return () => clearTimeout(timer);
    }, [message, errMessage])

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

    function updateErrMessage(data) {
        setErrMessage(data);
    }

    function updateUserPhoto(data) {
        setUserphoto(data);
    }

    function updateUserMoney(a, b) {
        (b === 0) ?
            setUserMoney(a) :
            setUserMoney(pre => pre + Number(a));
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
        userMoney,
        updateUserMoney,
        errMessage,
        updateErrMessage,
        updateUserPhoto,
        userPhotoContext,
    }

    return (
        <GlobalContext.Provider value={value}>
            {props.children}
        </GlobalContext.Provider>
    );
};