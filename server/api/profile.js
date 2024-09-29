import express from "express";
import { connection } from "../setupDb.js";

const profile = express.Router();

profile.get('/', async (req, res) => {
  const id = req.user.id;
  const role = req.user.role;

  let selectQuery = '';

  if (role === 'admin' || role === 'seller' || role === 'buyer') {
    selectQuery = `SELECT users_info_id, surname, mobile, address, user_photo FROM users_info WHERE users_info_id = ?`;
  } else {
    return res.status(403).json({
      status: 'err',
      msg: 'FABIDEN!!!'
    });
  }

  try {
    const [selectRes] = await connection.execute(selectQuery, [id]);

    if (selectRes[0] === undefined) {
      return res.json({
        status: 'err',
        msg: 'No user data'
      });
    } else {
      return res.json({
        status: 'ok',
        user: selectRes[0],
      });

    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: 'err',
      msg: 'get method: user info from DB ERROR'
    });
  }
});

profile.post('/', async (req, res) => {
  const { surname, mobile, address, userPhoto } = req.body;
  const { id, role } = req.user;

  if (role !== 'admin' && role !== 'seller' && role !== 'buyer') {
    return res.status(400).json({
      status: 'err',
      msg: 'You are not a seller',
    });
  }

  try {
    const insertQ = `INSERT INTO users_info (users_info_id, surname, mobile, address, user_photo) VALUES (?, ?, ?, ?, ?)`;
    const [insertRes] = await connection.execute(insertQ, [id, surname, mobile, address, userPhoto]);

    const selectQ = `SELECT user_photo FROM users_info WHERE users_info_id = ?`;
    const [selectRes] = await connection.execute(selectQ, [id]);

    return res.json({
      status: 'ok',
      msg: 'Info added',
      photo: selectRes[0],
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: 'add profile info error' });
  }
});

profile.put('/:id', async (req, res) => {
  const { newSur, newMob, newAdd, newUserP } = req.body;
  const { role } = req.user;
  const { id } = req.params;

  if (role !== 'admin' && role !== 'seller' && role !== 'buyer') {
    return res.status(400).json({
      status: 'err',
      msg: 'You are not a seller',
    });
  }

  try {
    const insertQ = `UPDATE users_info SET surname = ?, mobile = ?, address = ?, user_photo = ? WHERE users_info_id = ?`;
    const [insertRes] = await connection.execute(insertQ, [newSur, newMob, newAdd, newUserP, id]);

    return res.json({
      status: 'ok',
      msg: 'Profile updated',
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: 'update profile error' });
  }
});

profile.delete('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const deleteQuery1 = `DELETE FROM users_info WHERE users_info_id = ?`;
    const [deleteRes1] = await connection.execute(deleteQuery1, [id]);

    return res.status(200).json({
      status: 'ok',
      msg: 'User info deleted',
    });
  } catch (error) {
    return res.status(400).json({
      status: 'err',
      msg: 'delete: profile info delete ERROR'
    });
  }
});

export { profile };