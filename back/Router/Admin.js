import express from "express";
import query from '../Database/DBConnection.js';
import { body, validationResult } from "express-validator";
import checkAdmin from "../MiddleWare/checkAdmin.js";



const Admin = express();
Admin.use(express.Router());


Admin.get('/getallApplicants',
    checkAdmin,
    async (req, res) => {
        let error = [];
        try {
            const sqlSelect = `SELECT submit.status, submit.ser_best, submit.ser_magazine ,submit.ser_knowledge ,submit.ser_upgrade ,submit.ser_personal ,submit.ser_grant ,submit.ser_formation ,submit.ser_reg,submit.service_id FROM submit `;
            const result = await query(sqlSelect);
            if (result.length > 0) {
                return res.status(200).json(result);
            } else {
                return res.status(200).json({ message: "لا يوجد طلبات" });
            }
        } catch (errors) {
            error.push(errors);
            return res.status(500).json({ message: error });
        }
    }
)
Admin.get('/getallApplicantsShow',
    checkAdmin,
    async (req, res) => {
        let error = [];
        try {
            const sqlSelect = `SELECT * FROM submit `;
            const result = await query(sqlSelect);
            if (result.length > 0) {
                return res.status(200).json(result);
            } else {
                return res.status(200).json({ message: "لا يوجد طلبات" });
            }
        } catch (errors) {
            error.push(errors);
            return res.status(500).json({ message: error });
        }
    }
)








export default Admin;