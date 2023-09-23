import express from "express";
import query from '../Database/DBConnection.js';
import { body, validationResult } from "express-validator";
import e from "express";
import checkmanager from "../MiddleWare/checkManager.js";
import upload from "../MiddleWare/Uplodeimgs.js";
import fs from "fs";


const manager = express();
manager.use(express.Router());


manager.get('/getMyInfo',
    checkmanager,
    async (req, res) => {
        let error = [];
        try {
            const sqlSelect = "SELECT * FROM manager WHERE id = ? ";
            const value = [req.id];
            const result = await query(sqlSelect, value);
            if (result.length > 0) {
                return res.status(200).json(result[0]);
            } else {
                return res.status(200).json({ message: "لا يوجد مدير" });
            }
        } catch (errors) {
            error.push(errors);
            return res.status(500).json({ message: error });
        }
    }
)

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
            

            for (const obj of req.body) {
                const { student_id, managerid, service_id, aplecationId, role, ser_name } = obj;
                const sqlUpdate = `UPDATE submit SET role = ? , manager_id = ? WHERE user_id = ? AND service_id = ? AND ${obj.ser_name} = ?`;
                const value = [role, managerid, student_id, service_id, aplecationId];
                await query(sqlUpdate, value);
            }
            return res.status(200).json({ message: "تم تعين المدير بنجاح" });

        } catch (errors) {
            error.push(errors);
            return res.status(500).json({ message: error });
        }
    }
)

manager.get('/getallApplicantsAssigned',
    checkmanager,
    async (req, res) => {
        let error = [];
        try {
            if (req.service_id !== 9) {
                const sqlSelect = "SELECT submit.* , users.name , services.service_name_ar  FROM submit INNER JOIN users ON submit.user_id = users.id INNER JOIN services ON submit.service_id = services.id WHERE submit.manager_id = ?  AND submit.manager_status IS NULL ";
                const value = [req.id];
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
        }
        catch (errors) {
            error.push(errors);
            return res.status(500).json({ message: error });
        }
    }
)
manager.get('/getallApplicantsReviewed',
    checkmanager,
    async (req, res) => {
        let error = [];
        try {
            if (req.service_id !== 9) {
                const sqlSelect = "SELECT submit.* , users.name , services.service_name_ar  FROM submit INNER JOIN users ON submit.user_id = users.id INNER JOIN services ON submit.service_id = services.id WHERE  submit.service_id  = ? AND submit.manager_status IS NOT NULL "
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
        }
        catch (errors) {
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

manager.put('/acceptApplicant/:id',
    upload.single('response_pdf'),
    checkmanager,
    body('national_id').notEmpty().withMessage('يجب ادخال نص الرد'),
    async (req, res) => {
        let error = [];
        try {

            const sqlSelect = `SELECT * FROM submit WHERE ${req.body.ser_name} = ?`;
            const value = [req.body.app_id];
            const result = await query(sqlSelect, value);
            if (result[0].role === 1) {
                if (result.length > 0) {
                    const Data = {
                        response_text: req.body.response_text,
                        response_pdf: req.file ? req.file.filename : null,
                        manager_status: 1,
                    }
                    const sqlUpdate = `UPDATE submit SET ? WHERE ${req.body.ser_name} = ? AND manager_id = ? AND service_id = ? AND user_id = ?`;
                    const value = [Data, req.body.app_id, req.id, req.body.ser_id, req.body.student_id];
                    const result = await query(sqlUpdate, value);
                    if (result.affectedRows > 0) {
                        return res.status(200).json({ message: "تم قبول الطلب بنجاح" });
                    }
                }
                else {
                    return res.status(200).json({ message: "لا يوجد طلبات" });
                }
            } else if (result[0].role === 2) {
                if (result.length > 0) {
                    const Data = {
                        response_text: req.body.response_text,
                        response_pdf: req.file.filename,
                        status: 5,
                    }
                    const sqlUpdate = `UPDATE submit SET ? WHERE ${req.body.ser_name} = ? AND manager_id = ? AND service_id = ? AND user_id = ?`;
                    const value = [Data, req.body.app_id, req.id, req.body.ser_id, req.body.student_id];
                    const result = await query(sqlUpdate, value);
                    if (result.affectedRows > 0) {
                        return res.status(200).json({ message: "تم قبول الطلب بنجاح" });

                    }
                }
                else {
                    return res.status(200).json({ message: "لا يوجد طلبات" });
                }
            }
        } catch (errors) {
            error.push(errors);
            return res.status(500).json({ message: error });
        }
    }
)

manager.put('/acceptApplicantforManager',
    checkmanager,
    async (req, res) => {
        let error = [];
        try {
        
            if (req.service_id !== 9) {
                if ((req.body.column === "status") && (+req.body.ser_id !== +req.service_id) && +req.body.role !== 2) {
                    return res.status(400).json({ message: "لا تملك صلاحية القيام بهذا الامر" });
                }
            }
            let status = ''
            if (req.body.status === null) { status = ', response_pdf = null'; }
            if ((req.body.status == null && req.body.column === "manager_status") && +req.body.ser_id !== +req.service_id) {
                return res.status(400).json({ message: "لا تملك صلاحية القيام بهذا الامر" });
            }



            if (req.body.reason === "") {
                const sqlUpdate = `UPDATE submit SET ${req.body.column} = ?  WHERE ${req.body.ser_name} = ? AND service_id = ? AND user_id = ?`;
                const value = [req.body.status, req.body.app_id, req.body.ser_id, req.body.student_id];
                const result = await query(sqlUpdate, value);
                if (result.affectedRows > 0) {
                    return res.status(200).json({ message: "تم قبول الطلب بنجاح" });
                }
            } else if (req.body.reason !== "") {
                
                const sqlUpdate = `UPDATE submit SET ${req.body.column} = ? , response_text = ? ${status}
             WHERE ${req.body.ser_name} = ?`;
                const value = [req.body.status, req.body.reason, req.body.app_id];
                const result = await query(sqlUpdate, value);
                if (result.affectedRows > 0) {
                    return res.status(200).json({ message: "تم قبول الطلب بنجاح" });
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

manager.put('/Sendpayment',
    checkmanager,
    upload.single('payment_pdf'),
    async (req, res) => {
        let error = [];
        try {
            const sqlUpdate = `UPDATE submit SET payment_code = ? , status = 1 WHERE ${req.body.ser_name} = ? `;
            const value = [req.body.payment_code, req.body.app_id];
            const result = await query(sqlUpdate, value);
            if (result.affectedRows > 0) {
                return res.status(200).json({ message: "تم ارسال الكود بنجاح" });
            }
        } catch (errors) {
            error.push(errors);
            return res.status(500).json({ message: error });
        }
    }
)
manager.get('/getallApplicants',
    checkmanager,
    async (req, res) => {
        let error = [];
        try {

            if (req.service_id !== 9) {
                const sqlSelect = "SELECT submit.* , users.name , services.service_name_ar  FROM submit INNER JOIN users ON submit.user_id = users.id INNER JOIN services ON submit.service_id = services.id WHERE submit.service_id = ? ";
                const value = [req.service_id];
                const result = await query(sqlSelect, value);
                if (result.length > 0) {
                    return res.status(200).json(result);
                } else {
                    return res.status(200).json({ message: "لا يوجد طلبات" });
                }
            } else if (req.service_id === 9) {
                const sqlSelect = "SELECT submit.* , users.name , services.service_name_ar  FROM submit INNER JOIN users ON submit.user_id = users.id INNER JOIN services ON submit.service_id = services.id WHERE submit.status = 0 OR submit.status = 4 ";
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

export default manager;