import express from 'express';
import multer from 'multer';
import path from 'path';
import {register} from './register.js';
import {login} from './login.js';
import { logout } from './logout.js';
import { carTypes } from './carTypes.js';
import { carList } from './carList.js';
import { users } from './users.js';

export const api = express.Router();

api.all('/', (req, res) => {
    return res.json({
        msg: 'Incomplete URL',
    })
});

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/images');
    },
    filename: (req, file, cb) => {
        cb(null, 'fotke_' + file.fieldname + '_' + Date.now() + path.extname(file.originalname));
    },
});

const upload = multer({
    storage: storage,
    limits: {
        fileSize: 300000,
    },
});

api.use('/upload', upload.single('image_file'), (req, res)=>{
    return res.json({
        msg: 'Upload complete',
        path: '/images/'+req.file.filename,
    });
});


api.use('/register', register);
api.use('/login', login);
api.use('/logout', logout);
api.use('/carTypes', carTypes);
api.use('/carList', carList);
api.use('/users', users);