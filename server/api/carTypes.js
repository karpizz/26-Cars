import express from "express";
import { connection } from "../setupDb.js";

const carTypes = express.Router();

carTypes.get('/', async (req, res) => {

    try {
        const selectQuery = `SELECT type FROM \`car-type\``;
        const [selectRes] = await connection.execute(selectQuery);
        
            return res.json({
                status: 'ok',
                carTypeFromDb: selectRes,
            });
    } catch (error) {
       return res.status(500).json({
            status: 'err',
            msg: 'get: carTypes API - server ERROR'});
    }
});

export {carTypes};