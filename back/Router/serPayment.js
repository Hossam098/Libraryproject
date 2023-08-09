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

                if (!req.file) {
                    error.push("Photo college letter is required");
                    return res.status(400).json({ message: error });
                }

                if (req.body.level == '') {
                    error.push("Level is required");
                    handleDeleteFile(req);
                    return res.status(400).json({ message: error });
                }

                const reg = {
                    level: req.body.level,
                    photo_college_letter: req.file.filename,
                    service_id: req.body.service_id,
                    user_id: req.id,
                    status: 0
                }

                const sqlInsert = "INSERT INTO registration_services SET ?";
                const result = await query(sqlInsert, reg);

                if (result.affectedRows > 0) {
                    return res.status(201).json({ message: "Payment successful" });
                } else {
                    error.push("Payment failed");
                    handleDeleteFile(req);
                    return res.status(400).json({ message: error });

                }
            } else if (req.body.service_id == 2) {
                if (!req.file) {
                    error.push("Photo college letter is required");
                    return res.status(400).json({ message: error });
                }
                if (req.body.level == '') {
                    error.push("Level is required");
                    handleDeleteFile(req);
                    return res.status(400).json({ message: error });
                }

                const formation = {
                    level: req.body.level,
                    photo_college_letter: req.file.filename,
                    service_id: req.body.service_id,
                    user_id: req.id,
                    status: 0
                }

                const sqlInsert = "INSERT INTO formation_service SET ?";
                const result = await query(sqlInsert, formation);

                if (result.affectedRows > 0) {
                    return res.status(201).json({ message: "Payment successful" });
                } else {
                    error.push("Payment failed");
                    handleDeleteFile(req);
                    return res.status(400).json({ message: error });

                }
            } else if (req.body.service_id == 3) {

                const personal_examination_service = {
                    service_id: req.body.service_id,
                    user_id: req.id,
                    status: 0
                }

                const sqlInsert = "INSERT INTO personal_examination_service SET ?";
                const result = await query(sqlInsert, personal_examination_service);

                if (result.affectedRows > 0) {
                    return res.status(201).json({ message: "Payment successful" });
                } else {
                    error.push("Payment failed");
                    return res.status(400).json({ message: error });

                }
            } else if (req.body.service_id == 4) {

                if (!req.file) {
                    error.push("Photo college letter is required");
                    return res.status(400).json({ message: error });
                }

                const magazine_checking_service = {
                    photo_college_letter: req.file.filename,
                    service_id: req.body.service_id,
                    user_id: req.id,
                    status: 0
                }

                const sqlInsert = "INSERT INTO magazine_checking_service SET ?";
                const result = await query(sqlInsert, magazine_checking_service);

                if (result.affectedRows > 0) {
                    return res.status(200).json({ message: "Payment successful" });
                }
                else {
                    error.push("Payment failed");
                    handleDeleteFile(req);
                    return res.status(400).json({ message: error });

                }
            } else if (req.body.service_id == 5) {

            } else if (req.body.service_id == 6) {

                if (!req.file) {
                    error.push("Photo college letter is required");
                    return res.status(400).json({ message: error });
                }

                const best_message_service = {
                    photo_college_letter: req.file.filename,
                    service_id: req.body.service_id,
                    user_id: req.id,
                    status: 0
                }

                const sqlInsert = "INSERT INTO best_message_service SET ?";
                const result = await query(sqlInsert, best_message_service);

                if (result.affectedRows > 0) {
                    return res.status(200).json({ message: "Payment successful" });
                }
                else {
                    error.push("Payment failed");
                    handleDeleteFile(req);
                    return res.status(400).json({ message: error });
                }
            }


        } catch (errors) {
            error.push(errors);
            handleDeleteFile(req);
            return res.status(500).json({ message: error });
        }
    }
);


export default serPayment;


