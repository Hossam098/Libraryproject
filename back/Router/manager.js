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
            if (req.service_id !== 9) {
                const sqlSelect = "SELECT submit.* , users.name , services.service_name_ar  FROM submit INNER JOIN users ON submit.user_id = users.id INNER JOIN services ON submit.service_id = services.id WHERE submit.status = 2 AND submit.service_id = ? ";
                // const sqlSelect = "SELECT submit.* , users.name , services.service_name_ar , manager.mname FROM submit INNER JOIN users ON submit.user_id = users.id INNER JOIN services ON submit.service_id = services.id INNER JOIN manager ON submit.manager_id = manager.id WHERE submit.status = 2 AND submit.service_id = ? ";
                const value = [req.service_id];
                const result = await query(sqlSelect, value);
                if (result.length > 0) {
                    return res.status(200).json(result);
                } else {
                    return res.status(200).json({ message: "لا يوجد طلبات" });
                }
            } else if (req.service_id === 9) {
                const sqlSelect = "SELECT submit.* , users.name , services.service_name_ar FROM submit INNER JOIN users ON submit.user_id = users.id INNER JOIN services ON submit.service_id = services.id WHERE submit.status = 0";
                const result = await query(sqlSelect);
                if (result.length > 0) {
                    return res.status(200).json(result);
                } else {
                    return res.status(200).json({ message: "لا يوجد طلبات" });
                }
            }

        } catch (errors) {
            error.push(errors);
            return res.status(500).json({ message: error });
        }
    }
)

manager.get('/getAllManagers',
    checkmanager,
    async (req, res) => {
        let error = [];
        try {
            const sqlSelect = "SELECT * FROM manager ";
            const result = await query(sqlSelect);
            if (result.length > 0) {
                return res.status(200).json(result);
            } else {
                return res.status(200).json({ message: "لا يوجد مديرين" });
            }
        } catch (errors) {
            error.push(errors);
            return res.status(500).json({ message: error });
        }
    }
)

manager.put('/AssignManager',
    checkmanager,
    async (req, res) => {
        let error = [];
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                errors.array().forEach(element => {
                    error.push(element.msg);
                });
                return res.status(400).json({ message: error });
            }
            // console.log(req.body); 
            // [
            //     {
            //       student_id: 3,
            //       managerid: '2',
            //       service_id: 1,
            //       aplecationId: 20,
            //       role: '1'
            //     },
            //     {
            //       student_id: 3,
            //       managerid: '2',
            //       service_id: 1,
            //       aplecationId: 21,
            //       role: '1'
            //     }
            //   ]

            for (const obj of req.body) {
                const { student_id, managerid, service_id, aplecationId, role , ser_name} = obj;
                console.log(obj);                
                const sqlUpdate = `UPDATE submit SET role = ? , manager_id = ? WHERE user_id = ? AND service_id = ? AND ${obj.ser_name} = ?`;
                const value = [role,managerid, student_id, service_id, aplecationId];
                await query(sqlUpdate, value);
            }
            return res.status(200).json({ message: "تم تعين المدير بنجاح" });

        } catch (errors) {
            error.push(errors);
            return res.status(500).json({ message: error });
        }
    }
)


manager.put('/deleteManager',
    checkmanager,
    async (req, res) => {
        let error = [];
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                errors.array().forEach(element => {
                    error.push(element.msg);
                });
                return res.status(400).json({ message: error });
            }
            console.log(req.body.ser_name);
            console.log(req.body.service_id);
            console.log(req.body.student_id);
            console.log(req.body.aplecationId);

            const sqlUpdate = `UPDATE submit SET manager_id = Null , role = Null WHERE service_id = ? AND user_id = ? AND ${req.body.ser_name} = ?`;
            const value = [req.body.service_id, req.body.student_id, req.body.aplecationId];
            await query(sqlUpdate, value);
            return res.status(200).json({ message: "تم حذف المدير بنجاح" });

        } catch (errors) {
            error.push(errors);
            return res.status(500).json({ message: error });
        }
    }
)



export default manager;