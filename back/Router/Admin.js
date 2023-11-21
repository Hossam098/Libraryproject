import express from "express";
import query from '../Database/DBConnection.js';
import { body, validationResult } from "express-validator";
import checkAdmin from "../MiddleWare/checkAdmin.js";
import upload from "../MiddleWare/Uplodeimgs.js";
import fs from 'fs';



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
            if (req.body.reason === "" && req.body.status !== 2) {
                return res.status(400).json({ message: "يجب ادخال السبب" });
            }

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

Admin.put('/acceptApplicant/:id',
    upload.single('response_pdf'),
    checkAdmin,
    body('ser_name').notEmpty().withMessage('يجب ادخال اسم الخدمه'),
    body('app_id').notEmpty().withMessage('يجب ادخال رقم الطلب'),
    body('ser_id').notEmpty().withMessage('يجب ادخال رقم الخدمه'),
    body('student_id').notEmpty().withMessage('يجب ادخال رقم الطالب'),
    body('response_text').notEmpty().withMessage('يجب ادخال السبب'),
    async (req, res) => {
        let error = [];
        try {
            const sqlSelect = `SELECT * FROM submit WHERE ${req.body.ser_name} = ?`;
            const value = [req.body.app_id];
            const result = await query(sqlSelect, value);
            if (result[0]) {
                if (result.length > 0) {
                    const Data = {
                        response_text: req.body.response_text,
                        response_pdf: req.file ? req.file.filename : null,
                        status: 5,
                    }
                    const sqlUpdate = `UPDATE submit SET ? WHERE ${req.body.ser_name} = ? AND service_id = ? AND user_id = ?`;
                    const value = [Data, req.body.app_id, req.body.ser_id, req.body.student_id];
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

Admin.put('/watingApplicant/:id',
    checkAdmin,
    async (req, res) => {
        try {
            const id = req.params.id;
            if (+req.body.status === 2) {
                const sqlSelect = `SELECT * FROM submit WHERE ${req.body.ser_name} = ?`;
                const value = [req.body.app_id];
                const result1 = await query(sqlSelect, value);
                if (result1 && result1.length > 0 && result1[0].response_pdf) {
                    const filePath = `./public/imgs/${id}/${result1[0].response_pdf}`;
                    if (fs.existsSync(filePath)) {
                        fs.unlinkSync(filePath);
                    }
                }
                const sqlUpdate = `UPDATE submit SET status = ? , response_text = ? , response_pdf = null ,response_date = null , manager_status = null  WHERE ${req.body.ser_name} = ?`;
                const value2 = [req.body.status, req.body.reason, req.body.app_id];
                const result = await query(sqlUpdate, value2);
                if (result.affectedRows > 0) {
                    return res.status(200).json({ message: "تم قبول الطلب بنجاح" });
                } else {
                    return res.status(400).json({ message: " حدث خطأ ما" });
                }
            }

        } catch (errors) {
            return res.status(500).json({ message: errors });
        }
    }
)

Admin.get('/getallManagers',
    checkAdmin,
    async (req, res) => {
        let error = [];
        try {
            const sqlSelect = "SELECT manager.* , services.service_name_ar FROM manager INNER JOIN services ON manager.service_id = services.id";
            const result = await query(sqlSelect);
            if (result.length > 0) {
                for (let i = 0; i < result.length; i++) {
                    delete result[i].password;
                }
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
Admin.get('/getallSubManagers',
    checkAdmin,
    async (req, res) => {
        let error = [];
        try {
            const sqlSelect = "SELECT * FROM manager WHERE role = 1";
            const result = await query(sqlSelect);
            if (result.length > 0) {
                for (let i = 0; i < result.length; i++) {
                    delete result[i].password;
                }
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




Admin.post('/addManager',
    body('mname').notEmpty().withMessage('يجب ادخال اسم المدير'),
    body('email').notEmpty().withMessage('يجب ادخال البريد الالكتروني').isEmail().withMessage('يجب ادخال البريد الالكتروني بشكل صحيح'),
    checkAdmin,
    async (req, res) => {
        let error = [];
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ message: errors.array() });
            }
            const sqlSelect = `SELECT * FROM manager WHERE email = ? OR mname = ?`;
            const value = [req.body.email, req.body.mname];
            const result = await query(sqlSelect, value);
            if (result.length > 0) {
                return res.status(400).json({ message: "يوجد مدير بهذا الايميل او الاسم" });
            } else {
                let Data = {}
                if (req.body.service_id) {
                    Data = {
                        mname: req.body.mname,
                        email: req.body.email,
                        password: "12345678",
                        service_id: req.body.service_id,
                    }
                } else {
                    Data = {
                        mname: req.body.mname,
                        email: req.body.email,
                        password: "12345678",
                        role: 1,
                        service_id: null,
                    }
                }
                const sqlInsert = `INSERT INTO manager SET ?`;
                const result = await query(sqlInsert, Data);
                if (result.affectedRows > 0) {
                    return res.status(200).json({ message: "تم اضافه المدير بنجاح" });
                }
            }
        } catch (errors) {
            error.push(errors);
            return res.status(500).json({ message: error });
        }
    }
)

Admin.put('/updateManager',
    body('mname').notEmpty().withMessage('يجب ادخال اسم المدير'),
    body('email').notEmpty().withMessage('يجب ادخال البريد الالكتروني').isEmail().withMessage('يجب ادخال البريد الالكتروني بشكل صحيح'),
    body('id').notEmpty().withMessage('يجب ادخال رقم المدير'),
    checkAdmin,
    async (req, res) => {
        let error = [];
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ message: errors.array() });
            }
            const sqlSelect = `SELECT * FROM manager WHERE id = ?`;
            const value = [req.body.id];
            const result = await query(sqlSelect, value);
            if (result.length > 0) {
                let Data = {}
                if (req.body.service_id) {
                    Data = {
                        mname: req.body.mname,
                        email: req.body.email,
                        service_id: req.body.service_id,
                        password: 12345678,
                    }
                } else {
                    Data = {
                        mname: req.body.mname,
                        email: req.body.email,
                        role: 1,
                        service_id: null,
                        password: 12345678,
                    }
                }
                const sqlSelect2 = `SELECT * FROM manager WHERE (email = ? OR mname = ?) AND id != ?`;
                const value2 = [req.body.email, req.body.mname, req.body.id];
                const result2 = await query(sqlSelect2, value2);
                if (result2.length > 0) {
                    return res.status(400).json({ message: "يوجد مدير بهذا الايميل او الاسم" });
                }

                const sqlUpdate = `UPDATE manager SET ? WHERE id = ?`;
                const value = [Data, req.body.id];
                const result = await query(sqlUpdate, value);
                if (result.affectedRows > 0) {
                    return res.status(200).json({ message: "تم تعديل المدير بنجاح" });
                } else {
                    return res.status(400).json({ message: " حدث خطأ ما" });
                }
            } else {
                return res.status(400).json({ message: "لا يوجد مدير بهذا الايميل" });
            }


        } catch (errors) {
            error.push(errors);
            return res.status(500).json({ message: error });
        }
    }
)
Admin.delete('/deleteManager/:id',
    checkAdmin,
    async (req, res) => {
        let error = [];
        try {
            const id = req.params.id;
            const sqlSelect = `SELECT * FROM manager WHERE id = ?`;
            const value = [id];
            const result = await query(sqlSelect, value);
            if (result.length > 0) {
                const sqlDelete = `DELETE FROM manager WHERE id = ?`;
                const value = [id];
                const result = await query(sqlDelete, value);
                if (result.affectedRows > 0) {
                    return res.status(200).json({ message: "تم حذف المدير بنجاح" });
                } else {
                    return res.status(400).json({ message: " حدث خطأ ما" });
                }
            } else {
                return res.status(400).json({ message: "لا يوجد مدير بهذا الايميل" });
            }
        } catch (errors) {
            error.push(errors);
            return res.status(500).json({ message: error });
        }
    }
)


Admin.put('/updateService',
    body('service_name_ar').notEmpty().withMessage('يجب ادخال اسم الخدمه'),
    body('service_name').notEmpty().withMessage('يجب ادخال اسم الخدمه'),
    body('pref_ar').notEmpty().withMessage('يجب ادخال وصف الخدمه'),
    body('pref').notEmpty().withMessage('يجب ادخال وصف الخدمه'),
    body('id').notEmpty().withMessage('يجب ادخال رقم الخدمه'),
    checkAdmin,
    async (req, res) => {
        let error = [];
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ message: errors.array() });
            }
            const sqlSelect = `SELECT * FROM services WHERE id = ?`;
            const value = [req.body.id];
            const result = await query(sqlSelect, value);
            if (result.length > 0) {
                const Data = {
                    service_name_ar: req.body.service_name_ar,
                    service_name: req.body.service_name,
                    pref_ar: req.body.pref_ar,
                    pref: req.body.pref,
                }
                const sqlUpdate = `UPDATE services SET ? WHERE id = ?`;
                const value = [Data, req.body.id];
                const result = await query(sqlUpdate, value);
                if (result.affectedRows > 0) {
                    return res.status(200).json({ message: "تم تعديل الخدمه بنجاح" });
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

Admin.put('/enableService',
    body('id').notEmpty().withMessage('يجب ادخال رقم الخدمه'),
    body('enabled').notEmpty().withMessage('يجب ادخال حاله الخدمه'),
    checkAdmin,
    async (req, res) => {
        let error = [];
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ message: errors.array() });
            }
            const sqlSelect = `SELECT * FROM services WHERE id = ?`;
            const value = [req.body.id];
            const result = await query(sqlSelect, value);
            if (result.length > 0) {
                let enabled = +req.body.enabled === 1 ? 0 : 1;
                const Data = {
                    enabled: enabled,
                }
                const sqlUpdate = `UPDATE services SET ? WHERE id = ?`;
                const value = [Data, req.body.id];
                const result = await query(sqlUpdate, value);
                if (result.affectedRows > 0) {
                    return res.status(200).json({ message: "تم تعديل الخدمه بنجاح" });
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
Admin.get('/getallEvents',
    async (req, res) => {
        let error = [];
        try {
            const sqlSelect = "SELECT * FROM events";
            const result = await query(sqlSelect);
            if (result.length > 0) {
                return res.status(200).json(result);
            } else {
                return res.status(200).json({ message: "لا يوجد احداث" });
            }
        } catch (errors) {
            error.push(errors);
            return res.status(500).json({ message: error });
        }
    }
)

Admin.post('/addEvent',
    checkAdmin,
    upload.single('image'),
    body('title').notEmpty().withMessage('يجب ادخال عنوان الحدث'),
    body('content').notEmpty().withMessage('يجب ادخال محتوي الحدث'),
    body('from_date').notEmpty().withMessage('يجب ادخال تاريخ البدايه'),
    body('to_date').notEmpty().withMessage('يجب ادخال تاريخ النهايه'),
    body('place').notEmpty().withMessage('يجب ادخال مكان الحدث'),
    async (req, res) => {
        let error = [];
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ message: errors.array() });
            }
            const Data = {
                title: req.body.title,
                content: req.body.content,
                from_date: req.body.from_date,
                to_date: req.body.to_date,
                place: req.body.place,
                img: req.file ? req.file.filename : null,
            }
            const sqlInsert = `INSERT INTO events SET ?`;
            const result = await query(sqlInsert, Data);
            if (result.affectedRows > 0) {
                return res.status(200).json({ message: "تم اضافه الحدث بنجاح" });
            }
        } catch (errors) {
            error.push(errors);
            return res.status(500).json({ message: error });
        }
    }
)

Admin.put('/updateEvent/:id',
    checkAdmin,
    body('title').notEmpty().withMessage('يجب ادخال عنوان الحدث'),
    body('content').notEmpty().withMessage('يجب ادخال محتوي الحدث'),
    async (req, res) => {
        let error = [];
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ message: errors.array() });
            }

            const sqlSelect = `SELECT * FROM events WHERE id = ?`;
            const value = [req.params.id];
            const result = await query(sqlSelect, value);
            if (result.length > 0) {
                const Data = {
                    title: req.body.title,
                    content: req.body.content,
                }
                const sqlUpdate = `UPDATE events SET ? WHERE id = ?`;
                const value = [Data, req.params.id];
                const result = await query(sqlUpdate, value);
                if (result.affectedRows > 0) {
                    return res.status(200).json({ message: "تم تعديل الحدث بنجاح" });
                } else {
                    return res.status(400).json({ message: " حدث خطأ ما" });
                }
            } else {
                return res.status(400).json({ message: "لا يوجد حدث بهذا الرقم" });
            }
        } catch (errors) {
            error.push(errors);
            return res.status(500).json({ message: error });
        }
    }
)

Admin.delete('/deleteEvent/:id',
    checkAdmin,
    async (req, res) => {
        let error = [];
        try {
            const id = req.params.id;
            const sqlSelect = `SELECT * FROM events WHERE id = ?`;
            const value = [id];
            const result = await query(sqlSelect, value);
            if (result.length > 0) {
                const sqlDelete = `DELETE FROM events WHERE id = ?`;
                const value = [id];
                const result = await query(sqlDelete, value);
                if (result.affectedRows > 0) {
                    return res.status(200).json({ message: "تم حذف الحدث بنجاح" });
                } else {
                    return res.status(400).json({ message: " حدث خطأ ما" });
                }
            } else {
                return res.status(400).json({ message: "لا يوجد حدث بهذا الرقم" });
            }
        } catch (errors) {
            error.push(errors);
            return res.status(500).json({ message: error });
        }
    }
)
export default Admin;