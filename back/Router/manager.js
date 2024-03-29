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
                const sqlSelect = "SELECT submit.* , users.name , services.service_name_ar  FROM submit INNER JOIN users ON submit.user_id = users.id INNER JOIN services ON submit.service_id = services.id WHERE submit.status = 2 AND submit.service_id = ? order by submit.id DESC";
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
manager.get('/getAllManagersToAssign',
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
                const sqlSelect = "SELECT submit.* , users.name , services.service_name_ar  FROM submit INNER JOIN users ON submit.user_id = users.id INNER JOIN services ON submit.service_id = services.id WHERE submit.manager_id = ?  AND submit.manager_status IS NULL order by submit.id DESC";
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
                const sqlSelect = "SELECT submit.* , users.name , services.service_name_ar  FROM submit INNER JOIN users ON submit.user_id = users.id INNER JOIN services ON submit.service_id = services.id WHERE  submit.service_id  = ? AND submit.manager_status IS NOT NULL  order by submit.id DESC";
                // const sqlSelect = "SELECT submit.* , users.name , services.service_name_ar  FROM submit INNER JOIN users ON submit.user_id = users.id INNER JOIN services ON submit.service_id = services.id WHERE  submit.service_id  = ? AND submit.manager_status IS NOT NULL "
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
    body('national_id').notEmpty().withMessage('يجب ادخال الرقم القومي'),
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
                        response_date: new Date()
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
                        response_pdf: req.file ? req.file.filename : null,
                        status: 5,
                        response_date: new Date()
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
                let sqlUpdate = ``
                let value = []
                if (req.body.response_date === '') {
                    sqlUpdate = `UPDATE submit SET ${req.body.column} = ? , response_text = ? ${status} WHERE ${req.body.ser_name} = ?`;
                    value = [req.body.status, req.body.reason, req.body.app_id];

                } else {
                    sqlUpdate = `UPDATE submit SET ${req.body.column} = ? , response_text = ? ${status} , response_date = ?  WHERE ${req.body.ser_name} = ?`;
                    value = [req.body.status, req.body.reason, new Date(), req.body.app_id];

                }
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
                const sqlSelect = "SELECT submit.* , users.* , services.service_name_ar  FROM submit INNER JOIN users ON submit.user_id = users.id INNER JOIN services ON submit.service_id = services.id WHERE submit.service_id = ? order by submit.id DESC";
                const value = [req.service_id];
                const result = await query(sqlSelect, value);
                if (result.length > 0) {
                    for (let i = 0; i < result.length; i++) {
                        delete result[i].password;
                    }
                    return res.status(200).json(result);
                } else {
                    return res.status(200).json({ message: "لا يوجد طلبات" });
                }
            } else if (req.service_id === 9) {
                const sqlSelect = "SELECT submit.* , users.name , services.service_name_ar  FROM submit INNER JOIN users ON submit.user_id = users.id INNER JOIN services ON submit.service_id = services.id";
                // const sqlSelect = "SELECT submit.* , users.name , services.service_name_ar  FROM submit INNER JOIN users ON submit.user_id = users.id INNER JOIN services ON submit.service_id = services.id WHERE submit.status = 0 OR submit.status = 4 ";
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

manager.put('/watingApplicant/:id',
    checkmanager,
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
                const sqlUpdate = `UPDATE submit SET status = ? , response_text = null , response_pdf = null , manager_status = null,response_date = null  WHERE ${req.body.ser_name} = ?`;
                const value2 = [req.body.status, req.body.app_id];
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

manager.get('/getusermessages',
    checkmanager,
    async (req, res) => {
        let error = [];
        try {
            const sqlSelect = "SELECT messages.* , services.service_name_ar , users.name, manager.mname FROM messages INNER JOIN services ON messages.service_id = services.id INNER JOIN users ON messages.user_id = users.id INNER JOIN manager ON messages.manager_id = manager.id WHERE messages.service_id = ? ORDER BY messages.id DESC ";
            const result = await query(sqlSelect, [req.service_id]);
            if (result.length > 0) {
                return res.status(200).json(result);
            } else {
                error.push("No messages found");
                return res.status(400).json({ message: error });
            }
        } catch (errors) {
            error.push(errors);
            return res.status(500).json({ message: error });
        }
    }
);
manager.get('/getusermessagesToShow',
    checkmanager,
    async (req, res) => {
        let error = [];
        try {
            const sqlSelect = "SELECT messages.* , services.service_name_ar , users.name FROM messages INNER JOIN services ON messages.service_id = services.id INNER JOIN users ON messages.user_id = users.id  WHERE messages.service_id = ? ORDER BY messages.id DESC ";
            const result = await query(sqlSelect, [req.service_id]);
            if (result.length > 0) {
                return res.status(200).json(result);
            } else {
                error.push("لا يوجد رسائل");
                return res.status(400).json({ message: error });
            }
        } catch (errors) {
            error.push(errors);
            return res.status(500).json({ message: error });
        }
    }
);

manager.put('/sendresponse',
    checkmanager,
    body('message_id').notEmpty().withMessage('يجب ادخال رقم الرسالة'),
    body('response').notEmpty().withMessage('يجب ادخال الرد'),
    async (req, res) => {
        let error = [];
        try {
            const sqlSelect = "SELECT * FROM messages WHERE id = ? ";
            const value = [req.body.message_id];
            const result = await query(sqlSelect, value);
            if (result.length > 0) {
                const sqlUpdate = `UPDATE messages SET response = ? , manager_id = ? , response_date = ? WHERE id = ?`;
                const value = [req.body.response, req.id, new Date(), req.body.message_id];
                const result = await query(sqlUpdate, value);
                if (result.affectedRows > 0) {
                    return res.status(200).json({ message: "تم ارسال الرد بنجاح" });
                } else {
                    return res.status(400).json({ message: "حدث خطأ ما" });
                }
            }
            else {
                error.push("No messages found");
                return res.status(400).json({ message: error });
            }
        } catch (errors) {
            error.push(errors);
            return res.status(500).json({ message: error });
        }
    }
);

manager.post('/deleteApplicant',
    checkmanager,
    body('student_info').notEmpty().withMessage('يجب ادخال بيانات الطالب'),
    async (req, res) => {
        let error = [];
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                handleDeleteFile2(req);
                errors.array().forEach(element => {
                    error.push(element.msg);
                });
                return res.status(400).json({ message: error });
            }
            const service_id = req.body.student_info.service_id;

            let serviceTable = '';
            let serviceTableId = '';
            if (service_id == 1) {
                serviceTable = 'registration_services';
                serviceTableId = 'ser_reg';
            } else if (service_id == 2) {
                serviceTable = 'formation_service';
                serviceTableId = 'ser_formation';
            } else if (service_id == 3) {
                serviceTable = 'personal_examination_service';
                serviceTableId = 'ser_personal';
            } else if (service_id == 4) {
                serviceTable = 'magazine_checking_service';
                serviceTableId = 'ser_magazine';
            } else if (service_id == 5) {
                serviceTable = 'upgrade_service';
                serviceTableId = 'ser_upgrade';
            } else if (service_id == 6) {
                serviceTable = 'best_message_service';
                serviceTableId = 'ser_best';
            } else if (service_id == 7) {
                serviceTable = 'grant_service';
                serviceTableId = 'ser_grant';
            } else if (service_id == 8) {
                serviceTable = 'knowledge_bank_service';
                serviceTableId = 'ser_knowledge';
            }
            const sqlSelect = `SELECT * FROM submit WHERE ${serviceTableId} = ? AND service_id = ? AND user_id = ? `;
            const value = [req.body.student_info[serviceTableId], req.body.student_info.service_id, req.body.student_info.user_id];
            const result = await query(sqlSelect, value);
            if (result.length > 0) {
                const sqlSelect1 = `SELECT * FROM ${serviceTable} WHERE id = ? `;
                const value1 = [req.body.student_info[serviceTableId]];
                const result1 = await query(sqlSelect1, value1);
                if (result1.length > 0) {
                    if (service_id !== 3 && service_id !== 7 && service_id !== 8) {
                        try {
                            const filePath = `./public/imgs/${req.body.student_info.national_id}/${result1[0].photo_college_letter}`;
                            if (fs.existsSync(filePath)) {
                                fs.unlinkSync(filePath);
                            }
                        } catch (errors) {
                            error.push(errors);
                            return res.status(500).json({ message: error });
                        }
                    } else if (service_id == 7) {
                        const filePath1 = `./public/imgs/${req.body.student_info.national_id}/${result1[0].decision}`;
                        const filePath2 = `./public/imgs/${req.body.student_info.national_id}/${result1[0].message_word_ar}`;
                        const filePath3 = `./public/imgs/${req.body.student_info.national_id}/${result1[0].message_pdf_ar}`;
                        try {
                            if (fs.existsSync(filePath1)) {
                                fs.unlinkSync(filePath1);
                            }
                            if (fs.existsSync(filePath2)) {
                                fs.unlinkSync(filePath2);
                            }
                            if (fs.existsSync(filePath3)) {
                                fs.unlinkSync(filePath3);
                            }
                        } catch (errors) {
                            error.push(errors);
                            return res.status(500).json({ message: error });
                        }
                    }

                    const sqlDelete = `DELETE FROM ${serviceTable} WHERE id = ?`;
                    const value = [req.body.student_info[serviceTableId]];
                    const result = await query(sqlDelete, value);
                    if (result.affectedRows > 0) {
                        return res.status(200).json({ message: "تم حذف الطالب بنجاح" });
                    } else {
                        return res.status(400).json({ message: "حدث خطأ ما" });
                    }
                } else {
                    return res.status(400).json({ message: "لا يوجد طالب بهذه البيانات" });
                }
            } else {
                return res.status(400).json({ message: "لا يوجد طلبات" });
            }






        } catch (errors) {
            error.push(errors);
            return res.status(500).json({ message: error });
        }
    }
);


export default manager;