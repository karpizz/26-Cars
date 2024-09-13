import express from "express";
import { connection } from "../setupDb.js";

const carList = express.Router();

carList.get('/', async (req, res) => {
  const id = req.user.id;
  const role = req.user.role;

  let selectQuery = '';

  if (role === 'admin' || role === 'buyer') {
    selectQuery = `SELECT * FROM \`create-car\``;
  } else if (role === 'seller') {
    selectQuery = `SELECT * FROM \`create-car\` WHERE user_id = ?`;
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

carList.post('/', async (req, res) => {
  const { name, year, price, selectCarType, image } = req.body;
  const { id, role} = req.user;
  
  if (role !== 'seller') {
      return res.status(400).json({
          status: 'err',
          msg: 'You are not a seller',
      });
  }

  try {
      const insertQ = `INSERT INTO \`create-car\` (name, year, price, selectedType, image, user_id) VALUES (?, ?, ?, ?, ?, ?)`;
      const [insertRes] = await connection.execute(insertQ, [name, year, price, selectCarType, image, id]);

      const selectQuery = `SELECT * FROM \`create-car\` WHERE user_id = ?`;
      const [selectRes] = await connection.execute(selectQuery, [id]);
      
          return res.json({
              status: 'ok',
              msg: 'New car added',
              data: selectRes,
          });
  } catch (error) {
      console.log(error);
      
      res.status(500).json({msg: 'create car error'});
  }
});

carList.get('/:carId', async (req, res) => {
  const { carId } = req.params;

  try {
    const selectQuery = `SELECT * FROM  \`create-car\` WHERE id = ?;`;
    const [selectRes] = await connection.execute(selectQuery, [carId]);
    
    return res.status(200).json({
      status: 'ok',
      car: selectRes[0],
    });
  } catch (error) {
    return res.status(500).json({
      status: 'err',
      msg: 'put method, update car errror'
    });
  }

});

carList.delete('/:id', async (req, res) => {
  const { id } = req.params;
  const userId = req.user.id;

  try {
    const deleteQuery1 = `DELETE FROM \`create-car\` WHERE id = ?`;
    const [deleteRes1] = await connection.execute(deleteQuery1, [id]);

    const selectQuery = `SELECT * FROM \`create-car\` WHERE user_id = ?`;
    const [selectRes] = await connection.execute(selectQuery, [userId]);

    return res.status(200).json({
      status: 'ok',
      msg: 'Car deleted',
      data: selectRes
    });
  } catch (error) {
    return res.status(400).json({
      status: 'err',
      msg: 'delete: car ERROR'
    });
  }
});

carList.put('/:carId', async (req, res) => {
  const { carId } = req.params;
  const { newName, newYear, newPrice, newSelectCarType, newPic } = req.body;
  const { role} = req.user;

  if (role !== 'seller') {
      return res.status(400).json({
          status: 'err',
          msg: 'You are not a seller',
      });
  }

  try {
      const insertQ = `UPDATE \`create-car\` SET name = ?, year = ?, price = ?, selectedType = ?, image = ? WHERE id = ?`;
      const [insertRes] = await connection.execute(insertQ, [newName, newYear, newPrice, newSelectCarType, newPic, carId]);
      console.log(insertRes);
      
        if (insertRes.changedRows < 1) {
          return res.json({
            status: 'ok',
            msg: 'Nothing was updated',
        });
        } else {
          return res.json({
              status: 'ok',
              msg: 'Car updated',
          });
        }
  } catch (error) {
      res.status(500).json({msg: 'update car error'});
  }
});

export { carList };