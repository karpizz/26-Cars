import express from "express";
import { connection } from "../setupDb.js";

const profile = express.Router();

profile.get('/', async (req, res) => {
  const id = req.user.id;
  const role = req.user.role;

  let selectQuery = '';

  if (role === 'admin' || role === 'buyer') {
    selectQuery = `SELECT * FROM users_info`;
  } else if (role === 'seller') {
    selectQuery = `SELECT * FROM users_info WHERE user_id = ?`;
  } else {
    return res.status(403).json({
      status: 'err',
      msg: 'FABIDEN!!!'
    });
  }

  try {
    const [selectRes] = await connection.execute(selectQuery, [id]);
    
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

profile.post('/', async (req, res) => {
  const { surname, mobile, address, userPhoto } = req.body;
  const { id, role} = req.user;
  
  if (role !== 'seller') {
      return res.status(400).json({
          status: 'err',
          msg: 'You are not a seller',
      });
  }

  try {
      const insertQ = `INSERT INTO users_info (users_info_id, surname, mobile, address, user_photo) VALUES (?, ?, ?, ?, ?)`;
      const [insertRes] = await connection.execute(insertQ, [id, surname, mobile, address, userPhoto]);

          return res.json({
              status: 'ok',
              msg: 'Profile updated',
          });
  } catch (error) {
      console.log(error);
      res.status(500).json({msg: 'create car error'});
  }
});

profile.put('/', async (req, res) => {
  const { newSur, newMob, newAdd, newUserP } = req.body;
  const { role, email} = req.user;
  
  if (role !== 'seller') {
      return res.status(400).json({
          status: 'err',
          msg: 'You are not a seller',
      });
  }

  try {
      const insertQ = `UPDATE users SET surname = ?, mobile = ?, address = ?, user_photo = ? WHERE email = ?`;
      const [insertRes] = await connection.execute(insertQ, [newSur, newMob, newAdd, newUserP, email]);
      
          return res.json({
              status: 'ok',
              msg: 'Profile updated',
          });
  } catch (error) {
    console.log(error);
    
      res.status(500).json({msg: 'update profile error'});
  }
});

export { profile };