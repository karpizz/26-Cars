import { randomUUID } from 'crypto';
import express from "express";
import { connection } from "../setupDb.js";
import { hash } from "../lib/hash.js";

const login = express.Router();

login.get('/', async (req, res) => {

    const { carsToken } = req.cookies;

    if (!carsToken) {
        return res.status(200).json({ msg: 'you are not logged in' })
    }

    try {
        const selectQuery = `SELECT users.username, users.email, roles.role FROM tokens
                            JOIN users ON tokens.user_id = users.id
                            JOIN roles ON users.role_id = roles.id 
                            WHERE token = ?;`;
        const [selectRes] = await connection.execute(selectQuery, [carsToken]);
        
        if (selectRes.length === 0) {
            return res.status(200).set({
                'Set-Cookie': [
                    'carsToken=' + carsToken,
                    'path=/',
                    'domain=localhost',
                    'max-age=-1',
                    'Secure',
                    'SameSite=Lax',
                    'HttpOnly',
                ].join('; ')
            }).json({
                status: 'ok',
                msg: 'GET method: token deleted',
            });
        }

        return res.status(200).json({
            status: 'ok',
            user: selectRes[0],
        });

    } catch (error) {
        return res.status(500).json({
            status: 'err',
            msg: 'POST: login API - server ERROR'
        });
    }

})

login.post('/', async (req, res) => {
    const { email, password } = req.body;
    const errors = [];

    if (typeof email !== 'string' || email.length < 6) {
        errors.push({
            input: 'email',
            msg: 'Incorrect email'
        });
    }

    if (typeof password !== 'string' || password.length < 6) {
        errors.push({
            input: 'password',
            msg: 'Incorrect password'
        });
    }
    
    if (errors.length > 0) {
        return res.status(409).json(errors);
    }

    try {
        const selectQuery = `SELECT users.id, users.username, users.email, users.is_blocked, roles.role FROM users 
                            JOIN roles ON roles.id = users.role_id
                            WHERE email = ? AND password = ?;`;
        const [selectRes] = await connection.execute(selectQuery, [email, hash(password)]);
        
        if (selectRes.length === 0) {
            return res.status(200).json({
                status: 'err',
                msg: 'Incorrect email or password!',
            });
        }
        const userObj = selectRes[0];

        if (userObj.is_blocked) {
            return res.status(200).json({
                status: 'err',
                msg: 'You have been blocked',
            });
        }

        const token = randomUUID();
        const insertQuery = `INSERT INTO tokens (token, user_id) VALUES (?, ?);`;
        const [insertRes] = await connection.execute(insertQuery, [token, userObj.id]);

        delete userObj.id;

        if (insertRes.insertId > 0) {
            return res.status(200).set({
                'Set-Cookie': [
                    'carsToken=' + token,
                    'path=/',
                    'domain=localhost',
                    'max-age=16100',
                    'Secure',
                    'SameSite=Lax',
                    'HttpOnly',
                ].join('; ')
            }).json({
                status: 'ok',
                user: userObj,
            });
        } else {
            return res.status(400).json({
                status: 'err',
                msg: 'login POST method: error... token not created',
            });
        }
    } catch (error) {
        return res.status(500).json({
            status: 'err',
            msg: 'POST: login API - server ERROR'
        });
    }

});

export { login };