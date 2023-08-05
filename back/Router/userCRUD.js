import express from "express";
import query from '../Database/DBConnection.js';
import { body, validationResult } from "express-validator";
import e from "express";
import checkUser from "../MiddleWare/checkUser.js";
import upload from "../MiddleWare/Uplodeimgs.js";


const user = express();
user.use(express.Router());


user.get('/getAllServices', 
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

user.post('/payment',
    checkUser,
    upload.single('photo_college_letter'),
    body('level').notEmpty().withMessage('Level is required'),
    body('service_id').notEmpty().withMessage('Service ID is required'),
    async (req, res) => {
        console.log(req.body);

        let error = [];
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                errors.array().forEach(element => {
                    error.push(element.msg);
                });
                return res.status(400).json({ message: error });
            }

            if (!req.file) {
                error.push("Photo college letter is required");
                return res.status(400).json({ message: error });
            }


            const reg = {
                level: req.body.level,
                photo_college_letter: req.file.filename,
                service_id: req.body.service_id,
                user_id: req.id,
                status: 0
            }

            if (req.body.service_id == 1) {
                const sqlInsert = "INSERT INTO registration_services SET ?";
                const result = await query(sqlInsert, reg);

                if (result.affectedRows > 0) {
                    return res.status(201).json({ message: "Payment successful" });
                } else {
                    error.push("Payment failed");
                    return res.status(400).json({ message:error });
                }
            }

        } catch (errors) {
            error.push(errors);
            return res.status(500).json({ message: error });
        }
    }
);

export default user;



