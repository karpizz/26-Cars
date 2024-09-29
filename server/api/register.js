import express from "express";
import { connection } from "../setupDb.js";
import { hash } from "../lib/hash.js";

const register = express.Router();

register.get('/', (req, res) => {
    return res.json({ msg: 'Register GET method' })
})

register.post('/', async (req, res) => {
    const { username, email, password, role } = req.body;
    // console.log(req.body);
    const errors = [];
    if (typeof username !== 'string' || username.length < 2) {
        errors.push({
            input: 'username',
            msg: 'Bad username'
        });
    }

    if (typeof email !== 'string' || email.length < 6) {
        errors.push({
            input: 'email',
            msg: 'Bad email'
        });
    }

    if (typeof password !== 'string' || password.length < 6) {
        errors.push({
            input: 'password',
            msg: 'Bad password'
        });
    }
    if (errors.length > 0) {
        console.log(errors);

        return res.status(409).json(errors);
    }

    try {
        const selectQuery = `SELECT * FROM users WHERE email = ?;`;
        const [selectRes] = await connection.execute(selectQuery, [email]);

        if (selectRes.length > 0) {
            return res.status(200).json({
                status: 'err',
                msg: 'Email already exist!',
            });
        }

        const insertQuery = `INSERT INTO users (username, email, password, role_id) VALUES (?, ?, ?, ?);`;
        const [insertRes] = await connection.execute(insertQuery, [username, email, hash(password), role]);

        if (insertRes.insertId > 0) {
            return res.status(200).json({
                status: 'ok',
                msg: 'Registered successfully!',
            });
        } else {
            return res.status(400).json({
                status: 'err',
                msg: 'Register POST method: error...',
            });
        }
    } catch (error) {
        return res.status(500).json({
            status: 'err',
            msg: 'POST: REGISTER API - server ERROR'
        });
    }

});

export { register };