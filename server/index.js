import express from "express";
import { api } from "./api/api.js";
import cors from 'cors';
import helmet from "helmet";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import { connection } from "./setupDb.js";
// import {SERVER_PORT} from './env.js';
const app = express();

const corsOptions = {
    origin: 'http://localhost:3000',
    credentials: true,
}

const helmetOptions = {
    crossOriginResourcePolicy: false,
}

app.use(cors(corsOptions));
app.use(helmet(helmetOptions));
app.use(cookieParser());
app.use(bodyParser.json()) // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded
app.disable('x-powered-by');
app.use(express.static('public'));

app.get('/', (req, res) => {
    return res.send('Home page workin')
})

app.use( async (req, res, next) => {
    const {carsToken} = req.cookies;

    req.user = {
        id: -1,
        role: '',
    }

    if (!carsToken) {
        return next();
    }

    try {
        const selectQuery = `SELECT users.id, roles.role FROM tokens
        JOIN users ON tokens.user_id = users.id
        JOIN roles ON roles.id = users.role_id
        WHERE token = ?`;
        const [selectRes] = await connection.execute(selectQuery, [carsToken]);
        
        if (selectRes.length === 1) {
            req.user.id = selectRes[0].id;
            req.user.role = selectRes[0].role;
        }

    } catch (error) {
        console.log(error);
    }
    
    next();
})

app.use('/api', api)

app.get('*', (_req, res) => {
    return res.send('404')
})

app.use((_req, res, _next) => {
    res.status(404).send("Sorry can't find that!")
})

app.use((err, _req, res, _next) => {
    console.error(err.stack)
    res.status(500).send('Something broke!')
})

app.listen(3001);