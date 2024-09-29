import express from "express";
import { connection } from "../setupDb.js";

const buyCar = express.Router();

buyCar.put('/', async (req, res) => {
  const { carId, purchase } = req.body;
  const { role, id } = req.user;

  if (role !== 'buyer') {
    return res.status(400).json({
      status: 'err',
      msg: 'You are not a buyer',
    });
  }

  try {
    const insertQ = `UPDATE users_funds SET funds = ? WHERE users_id = ?`;
    const [insertRes] = await connection.execute(insertQ, [purchase, id]);

    const insertQ1 = `UPDATE \`create-car\` SET status = 'sold' WHERE id = ?`;
    const [insertRes1] = await connection.execute(insertQ1, [carId]);

    if (insertRes.changedRows && insertRes1 < 1) {
      return res.json({
        status: 'err',
        msg: 'Not enough funds',
      });
    } else {
      return res.json({
        status: 'ok',
        msg: 'Car bought',
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: 'update funds error' });
  }
});

export { buyCar };