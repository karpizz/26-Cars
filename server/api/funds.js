import express from "express";
import { connection } from "../setupDb.js";

const funds = express.Router();

funds.get('/', async (req, res) => {
  const id = req.user.id;
  const role = req.user.role;

  let selectQuery = '';

  if (role === 'admin' || role === 'seller' || role === 'buyer') {
    selectQuery = `SELECT funds FROM users_funds WHERE users_id = ?`;
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
        funds: selectRes,
      });

    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: 'err',
      msg: 'get: get user funds from DB ERROR'
    });
  }
});

funds.post('/', async (req, res) => {
  const { money } = req.body;
  const { id, role } = req.user;

  if (role !== 'admin' && role !== 'seller' && role !== 'buyer') {
    return res.status(400).json({
      status: 'err',
      msg: 'You are not a seller',
    });
  }

  try {
    const insertQ = `INSERT INTO users_funds (users_id, funds) VALUES (?, ?)`;
    const [insertRes] = await connection.execute(insertQ, [id, money]);

    const selectQuery = `SELECT funds FROM users_funds WHERE users_id = ?`;
    const [selectRes] = await connection.execute(selectQuery, [id]);


    return res.json({
      status: 'ok',
      msg: 'Money added',
      money: selectRes,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: 'add funds error' });
  }
});

funds.put('/', async (req, res) => {
  const { addMoney } = req.body;
  const { id, role } = req.user;
  
  if (role !== 'buyer') {
    return res.status(400).json({
      status: 'err',
      msg: 'You are not a buyer',
    });
  }

  try {
    const insertQ = `UPDATE users_funds SET funds = ? WHERE users_id = ?`;
    const [insertRes] = await connection.execute(insertQ, [addMoney, id]);
    
    return res.json({
      status: 'ok',
      msg: 'Funds updated',
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: 'update funds error' });
  }
});

export { funds };