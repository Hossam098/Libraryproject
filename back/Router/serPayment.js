import express from "express";
import query from '../Database/DBConnection.js';
import { body, validationResult } from "express-validator";
import e from "express";
import checkUser from "../MiddleWare/checkUser.js";
import upload from "../MiddleWare/Uplodeimgs.js";
import fs from "fs";



const serPayment = express();
serPayment.use(express.Router());
const handleDeleteFile = (req) => {

    const img = req.file.filename;
    const path = `./public/imgs/${req.national_id}/${img}`;

    fs.unlinkSync(path, (err) => {
        if (err) {
            console.error(err)
            return
        }
    }
    )
}

// async function SELECTWaitingCode(params, req, res, level = true) {

//     const sqlSelect = `SELECT ${params}.* ,services.* , users.* FROM ${params} INNER JOIN services ON ${params}.service_id = services.id INNER JOIN users ON ${params}.user_id = users.id WHERE  (${params}.status = 0 OR ${params}.status = 1 OR ${params}.status = 2 OR ${params}.status = 3) AND ${params}.user_id = ?`;

//     const result = await query(sqlSelect, req.id);
//     if (result.length > 0) {
//         delete result[0].password;
//         delete result[0].img;
//         delete result[0].id;
//         return res.status(200).json(result);
//     } else {

//         return res.status(400).json({ message: false });
//     }
// }

serPayment.get('/getAllServices',
    async (req, res) => {
        let error = [];
        try {
            const sqlSelect = "SELECT * FROM services";
            const result = await query(sqlSelect);
            if (result.length > 0) {
                return res.status(200).json(result);
            } else {
                error.push("No services found");
                return res.status(400).json({ message: error });
            }
        } catch (errors) {
            error.push(errors);
            return res.status(500).json({ message: error });
        }
    }
);

serPayment.post('/payment',
    checkUser,
    upload.single('photo_college_letter'),
    body('service_id').notEmpty().withMessage('Service ID is required'),
    async (req, res) => {

        let error = [];
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                handleDeleteFile(req);
                errors.array().forEach(element => {
                    error.push(element.msg);
                });
                return res.status(400).json({ message: error });
            }

            /****     check file type pdf or img      ****/

            if (!req.file) {
                error.push("Photo college letter is required");
                return res.status(400).json({ message: error });
            }

            if (req.file) {
                const file = req.file;
                const ext = file.mimetype.split('/')[1];
                if (ext != 'pdf' && ext != 'jpeg' && ext != 'jpg' && ext != 'png' && ext != 'webp' && ext != 'svg') {
                    error.push("File type not allowed");
                    handleDeleteFile(req);
                    return res.status(400).json({ message: error });
                }
            }


            if (req.body.service_id == 1) {

                // if (req.body.level == '') {
                //     error.push("Level is required");
                //     handleDeleteFile(req);
                //     return res.status(400).json({ message: error });
                // }

                const reg = {
                    // level: req.body.level,
                    photo_college_letter: req.file.filename,
                }

                const sqlInsert = "INSERT INTO registration_services SET ?";
                const result = await query(sqlInsert, reg);

                if (result.affectedRows > 0) {
                    const sqlSelect = "SELECT * FROM registration_services WHERE id = ?";
                    const result2 = await query(sqlSelect, result.insertId);
                    const reg_id = result2[0].id;
                    const submitData = {
                        ser_reg: reg_id,
                        status: 0,
                        user_id: req.id,
                        service_id: req.body.service_id,
                    }

                    const sqlInsert2 = "INSERT INTO submit SET ?";
                    const result3 = await query(sqlInsert2, submitData);
                    if (result3.affectedRows > 0) {
                        return res.status(201).json({ message: "Payment successful" });
                    } else {
                        error.push("Payment failed");
                        handleDeleteFile(req);
                        return res.status(400).json({ message: error });
                    }

                } else {
                    error.push("Payment failed");
                    handleDeleteFile(req);
                    return res.status(400).json({ message: error });

                }
            } else if (req.body.service_id == 2) {

                // if (req.body.level == '') {
                //     error.push("Level is required");
                //     handleDeleteFile(req);
                //     return res.status(400).json({ message: error });
                // }

                const form = {
                    photo_college_letter: req.file.filename,
                }

                const sqlInsert = "INSERT INTO formation_service SET ?";
                const result = await query(sqlInsert, form);

                if (result.affectedRows > 0) {
                    const sqlSelect = "SELECT * FROM formation_service WHERE id = ?";
                    const result2 = await query(sqlSelect, result.insertId);
                    const ser_formation = result2[0].id;
                    const submitData = {
                        ser_formation: ser_formation,
                        status: 0,
                        user_id: req.id,
                        service_id: req.body.service_id,
                    }

                    const sqlInsert2 = "INSERT INTO submit SET ?";
                    const result3 = await query(sqlInsert2, submitData);
                    if (result3.affectedRows > 0) {
                        return res.status(201).json({ message: "Payment successful" });
                    } else {
                        error.push("Payment failed");
                        handleDeleteFile(req);
                        return res.status(400).json({ message: error });
                    }
                } else {
                    error.push("Payment failed");
                    handleDeleteFile(req);
                    return res.status(400).json({ message: error });
                }

            } else if (req.body.service_id == 3) {

                const personal = {
                    photo_college_letter: req.file.filename,
                }

                const sqlInsert = "INSERT INTO personal_examination_service SET ?";
                const result = await query(sqlInsert, personal);

                if (result.affectedRows > 0) {
                    const submitData = {
                        ser_personal: result.insertId,
                        status: 0,
                        user_id: req.id,
                        service_id: req.body.service_id,
                    }

                    const sqlInsert2 = "INSERT INTO submit SET ?";
                    const result3 = await query(sqlInsert2, submitData);
                    if (result3.affectedRows > 0) {
                        return res.status(200).json({ message: "Payment successful" });
                    } else {
                        error.push("Payment failed");
                        handleDeleteFile(req);
                        return res.status(400).json({ message: error });
                    }
                } else {
                    error.push("Payment failed");
                    handleDeleteFile(req);
                    return res.status(400).json({ message: error });
                }
            } else if (req.body.service_id == 4) {

                const magazine = {
                    photo_college_letter: req.file.filename,
                }

                const sqlInsert = "INSERT INTO magazine_checking_service SET ?";
                const result = await query(sqlInsert, magazine);

                if (result.affectedRows > 0) {
                    const submitData = {
                        ser_magazine: result.insertId,
                        status: 0,
                        user_id: req.id,
                        service_id: req.body.service_id,
                    }

                    const sqlInsert2 = "INSERT INTO submit SET ?";
                    const result3 = await query(sqlInsert2, submitData);
                    if (result3.affectedRows > 0) {
                        return res.status(200).json({ message: "Payment successful" });
                    } else {
                        error.push("Payment failed");
                        handleDeleteFile(req);
                        return res.status(400).json({ message: error });
                    }
                } else {
                    error.push("Payment failed");
                    handleDeleteFile(req);
                    return res.status(400).json({ message: error });
                }
            } else if (req.body.service_id == 5) {

                const update = {
                    photo_college_letter: req.file.filename,
                }

                const sqlInsert = "INSERT INTO upgrade_service SET ?";
                const result = await query(sqlInsert, update);

                if (result.affectedRows > 0) {
                    const submitData = {
                        ser_upgrade: result.insertId,
                        status: 0,
                        user_id: req.id,
                        service_id: req.body.service_id,
                    }

                    const sqlInsert2 = "INSERT INTO submit SET ?";
                    const result3 = await query(sqlInsert2, submitData);
                    if (result3.affectedRows > 0) {
                        return res.status(200).json({ message: "Payment successful" });
                    } else {
                        error.push("Payment failed");
                        handleDeleteFile(req);
                        return res.status(400).json({ message: error });
                    }
                } else {
                    error.push("Payment failed");
                    handleDeleteFile(req);
                    return res.status(400).json({ message: error });
                }
            } else if (req.body.service_id == 6) {

                const best = {
                    photo_college_letter: req.file.filename,
                }

                const sqlInsert = "INSERT INTO best_message_service SET ?";
                const result = await query(sqlInsert, best);

                if (result.affectedRows > 0) {
                    const submitData = {
                        ser_best: result.insertId,
                        status: 0,
                        user_id: req.id,
                        service_id: req.body.service_id,
                    }

                    const sqlInsert2 = "INSERT INTO submit SET ?";
                    const result3 = await query(sqlInsert2, submitData);
                    if (result3.affectedRows > 0) {
                        return res.status(200).json({ message: "Payment successful" });
                    } else {
                        error.push("Payment failed");
                        handleDeleteFile(req);
                        return res.status(400).json({ message: error });
                    }
                } else {
                    error.push("Payment failed");
                    handleDeleteFile(req);
                    return res.status(400).json({ message: error });
                }
            }


        } catch (errors) {
            error.push(errors);
            handleDeleteFile(req);
            return res.status(500).json(errors);
        }
    }
);

serPayment.get('/getallwaiting',
    checkUser,
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

            const sqlSelect = "SELECT submit.* , services.* FROM submit INNER JOIN services ON submit.service_id = services.id WHERE submit.user_id = ? AND submit.status = 0";
            const result = await query(sqlSelect, req.id);

            if (result.length > 0) {
                return res.status(200).json(result);
            } else {
                error.push("No data found");
                return res.status(400).json({ message: error });
            }

        } catch (errors) {
            error.push(errors);
            return res.status(500).json({ message: error });
        }
    }
);

// serPayment.get('/getallwaitingofformation',
//     checkUser,
//     async (req, res) => {
//         let error = [];
//         try {
//             const errors = validationResult(req);
//             if (!errors.isEmpty()) {
//                 errors.array().forEach(element => {
//                     error.push(element.msg);
//                 });
//                 return res.status(400).json({ message: error });
//             }

//             SELECTWaitingCode('formation_service', req, res);


//         } catch (errors) {
//             error.push(errors);
//             return res.status(500).json({ message: error });
//         }
//     }
// );

// serPayment.get('/getallwaitingofpersonal',
//     checkUser,
//     async (req, res) => {
//         let error = [];
//         try {
//             const errors = validationResult(req);
//             if (!errors.isEmpty()) {
//                 errors.array().forEach(element => {
//                     error.push(element.msg);
//                 });
//                 return res.status(400).json({ message: error });
//             }

//             SELECTWaitingCode('personal_examination_service', req, res, false);

//         } catch (errors) {
//             error.push(errors);
//             return res.status(500).json({ message: error });
//         }
//     }
// );

// serPayment.get('/getallwaitingofmagazine',
//     checkUser,
//     async (req, res) => {
//         let error = [];
//         try {
//             const errors = validationResult(req);
//             if (!errors.isEmpty()) {
//                 errors.array().forEach(element => {
//                     error.push(element.msg);
//                 });
//                 return res.status(400).json({ message: error });
//             }

//             SELECTWaitingCode('magazine_checking_service', req, res, false);

//         } catch (errors) {
//             error.push(errors);
//             return res.status(500).json({ message: error });
//         }
//     }
// );

// serPayment.get('/getallwaitingofbestmessage',
//     checkUser,
//     async (req, res) => {
//         let error = [];
//         try {
//             const errors = validationResult(req);
//             if (!errors.isEmpty()) {
//                 errors.array().forEach(element => {
//                     error.push(element.msg);
//                 });
//                 return res.status(400).json({ message: error });
//             }

//             SELECTWaitingCode('best_message_service', req, res, false);

//         } catch (errors) {
//             error.push(errors);
//             return res.status(500).json({ message: error });
//         }
//     }
// );

export default serPayment;


