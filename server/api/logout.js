import { randomUUID} from 'crypto';
import express from "express";
import { connection } from "../setupDb.js";
import { hash } from "../lib/hash.js";

const logout = express.Router();

logout.get('/', async (req, res) => {
    const {carsToken} = req.cookies;

    if (!carsToken) {
        return res.status(200).json({
            status: 'ok',
            msg: 'You are already loged out.'
        })
    }

    try {
        const selectQuery = `DELETE FROM tokens WHERE token = ?`;
        const [selectRes] = await connection.execute(selectQuery, [carsToken]);
    
            return res.status(200).set({'Set-Cookie': [
                'carsToken=' + carsToken,
                'path=/',
                'domain=localhost',
                'max-age=-1',
                'Secure',
                'SameSite=Lax',
                'HttpOnly',
            ].join('; ')}).json({
                status: 'ok',
                msg: 'logout POST method: token deleted',
            });
    } catch (error) {
        return res.status(500).json({
            status: 'err',
            msg: 'POST: logout API - server ERROR'});
    }
})

export {logout};