import express from "express";
import query from '../Database/DBConnection.js';
import { body, check, validationResult } from "express-validator";
import e from "express";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import cors from 'cors';
import checkUser from "../MiddleWare/checkUser.js";


const managerAuth = express();
managerAuth.use(express.Router());
const key = "secretkey";


managerAuth.post('/login',
    body('email').notEmpty().withMessage('Email is required').isEmail().withMessage('Email is invalid'),
    body('password').notEmpty().withMessage('Password is required').isLength({ min: 8 }).withMessage('Password must be at least 8 characters'),
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

            const sqlSelect = "SELECT * FROM manager WHERE email = ?";
            const result = await query(sqlSelect, [req.body.email]);
            if (result.length > 0) {
                const match = await bcrypt.compare(req.body.password, result[0].password);
                if (match) {
                    const payload = {
                        id : result[0].id,
                        service_id: result[0].service_id,
                        email: result[0].email,
                        role : result[0].role
                    };
                    const token =jwt.sign(payload, key);
                    req.session.token ="Bearer "+ token;
                    return res.status(200).json({ login: true, token: token });

                } else {
                    error.push("Password is incorrect");
                    return res.status(400).json({ message: error });
                }
            } else {
                error.push("Manager doesn't exist");
                return res.status(400).json({ message: error });
            }

        } catch (errors) {
            error.push(errors);
            return res.status(500).json({ message: error });
        }
});


export default managerAuth;