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
            const sqlSelect = "SELECT submit.* , users.name , services.service_name_ar  FROM submit INNER JOIN users ON submit.user_id = users.id INNER JOIN services ON submit.service_id = services.id ";
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

Admin.get('/getuserbyid/:serId/:serNam/:stId/:appId',
    checkAdmin,
    async (req, res) => {
        try {
            const serId = req.params.serId
            const serNam = req.params.serNam
            const stId = req.params.stId
            const appId = req.params.appId

            console.log(appId, stId, serNam, serId)
            let ser_table = ""
            if (serNam === 'ser_reg') {
                ser_table = "registration_services"
            } else if (serNam == 'ser_formation') {
                ser_table = 'formation_service'
            } else if (serNam == 'ser_grant') {
                ser_table = 'grant_service'
            } else if (serNam == 'ser_personal') {
                ser_table = 'personal_examination_service'
            } else if (serNam == 'ser_upgrade') {
                ser_table = 'upgrade_service'
            } else if (serNam == 'ser_knowledge') {
                ser_table = 'knowledge_bank_service'
            } else if (serNam == 'ser_magazine') {
                ser_table = 'magazine_checking_service'
            } else if (serNam == 'ser_best') {
                ser_table = 'best_message_service'
            }


            const sqlSelect = `SELECT submit.* , users.* , services.* , ${ser_table}.* FROM submit JOIN users ON submit.user_id = users.id JOIN services ON submit.service_id = services.id JOIN ${ser_table} ON submit.${serNam} = ${ser_table}.id WHERE submit.${serNam} = ?  AND users.id = ? AND submit.service_id = ? `;
            const result = await query(sqlSelect, [appId, stId, serId]);
            if (result.length > 0) {
                return res.status(200).json(result[0]);
            } else {
                return res.status(400).json({ message: "لا يوجد طلبات" });
            }
        } catch (errors) {
            return res.status(500).json({ message: errors });
        }
    }
)

Admin.put('/acceptApplicantforadmin',
    checkAdmin,
    async (req, res) => {
        let error = [];
        try {
            
            if (req.body.reason !== "") {
                const sqlUpdate = `UPDATE submit SET status = ? , response_text = ? , response_pdf = null WHERE ${req.body.ser_name} = ?`;
                const value = [req.body.status, req.body.reason, req.body.app_id];
                const result = await query(sqlUpdate, value);
                if (result.affectedRows > 0) {
                    return res.status(200).json({ message: "تم طلب التعديل بنجاح" });
                } else {
                    return res.status(400).json({ message: " حدث خطأ ما" });
                }
            }
        } catch (errors) {
            error.push(errors);
            return res.status(500).json({ message: error });
        }
    }
)





export default Admin;