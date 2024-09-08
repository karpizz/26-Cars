import express from "express";
import { connection } from "../setupDb.js";

const users = express.Router();

users.get('/', async (req, res) => {
    const role = req.user.role;

    let selectQuery = '';

    if (role === 'admin') {
        selectQuery = `SELECT users.id, users.username, users.email, users.is_blocked, roles.role FROM users
                        JOIN roles ON users.role_id = roles.id WHERE NOT roles.role = ?;`;
    } else {
        return res.status(403).json({
            status: 'err',
            msg: 'FABIDEN!!!'
        });
    }

    try {
        const [selectRes] = await connection.execute(selectQuery, [role]);

        return res.json({
            status: 'ok',
            data: selectRes,
        });
    } catch (error) {
        return res.status(500).json({
            status: 'err',
            msg: 'get: get all cars from DB ERROR'
        });
    }
});

users.put('/:userID', async (req, res) => {
    const { userID } = req.params;
    const { status } = req.body;
  
    try {
        const insertQ = `UPDATE users SET is_blocked = ? WHERE id = ?`;
        const [insertRes] = await connection.execute(insertQ, [status, userID]);
        
        if (insertRes.affectedRows > 0) {
            return res.status(200).json({
                status: 'ok',
                msg: 'user status changed',
            });
        } else {
            return res.status(400).json({
                status: 'err',
                msg: 'error while trying to change user status',
            });
        }
    } catch (error) {
        res.status(500).json({msg: 'PUT block user error'});
    }
  });

export { users };