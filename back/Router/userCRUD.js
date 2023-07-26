import express from "express";
import query from '../Database/DBConnection.js';
import { body, validationResult } from "express-validator";
import e from "express";
import checkUser from "../MiddleWare/checkUser.js";


const user = express();
user.use(express.Router());

user.post('/payment',
    checkUser,
    body('level').notEmpty().withMessage('Level is required'),
    body('photo_college_letter').notEmpty().withMessage('Photo of college letter is required'),
    body('service_id').notEmpty().withMessage('Service ID is required'),
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

            const reg = {
                level: req.body.level,
                photo_college_letter: req.body.photo_college_letter,
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



