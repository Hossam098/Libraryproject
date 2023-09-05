import express from "express";
import query from '../Database/DBConnection.js';
import { body, validationResult } from "express-validator";
import e from "express";
import checkmanager from "../MiddleWare/checkManager.js";
import upload from "../MiddleWare/Uplodeimgs.js";
import fs from "fs";


const manager = express();
manager.use(express.Router());

manager.get('/getallApplicantsWaiting',
    checkmanager,
    async (req, res) => {
        let error = [];
        try {
            if(req.service_id !== 0){
            const sqlSelect = "SELECT submit.* , users.name , services.service_name_ar FROM submit INNER JOIN users ON submit.user_id = users.id INNER JOIN services ON submit.service_id = services.id WHERE submit.status = 1 AND submit.service_id = ? ";
            const value = [req.service_id];
            const result = await query(sqlSelect, value);
            if(result.length > 0){
                return res.status(200).json(result);
            }else{
                return res.status(200).json({ message: "لا يوجد طلبات" });
            }
        }else if(req.service_id === 0){
            const sqlSelect = "SELECT submit.* , users.name , services.service_name_ar FROM submit INNER JOIN users ON submit.user_id = users.id INNER JOIN services ON submit.service_id = services.id WHERE submit.status = 0";
            const result = await query(sqlSelect);
            if(result.length > 0){
                return res.status(200).json(result);
            }else{
                return res.status(200).json({ message: "لا يوجد طلبات" });
            }
        }
            
        } catch (errors) {
            error.push(errors);
            return res.status(500).json({ message: error });
        }
    }
)

export default manager;