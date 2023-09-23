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
                if (req.body.password == result[0].password) {
                    res.status(200).json({ login: true, firstLogin: true });
                } else {
                    const match = await bcrypt.compare(req.body.password, result[0].password);
                    if (match) {
                        const payload = {
                            id: result[0].id,
                            service_id: result[0].service_id,
                            email: result[0].email,
                            role: result[0].role,
                            type: "manager"
                        };
                        const token = jwt.sign(payload, key);
                        req.session.token = "Bearer " + token;
                        return res.status(200).json({ login: true, token: token, firstLogin: false });

                    } else {
                        error.push("كلمة السر غير صحيحه");
                        return res.status(400).json({ message: error });
                    }
                }
            } else {
                error.push("الموظف غير موجود");
                return res.status(400).json({ message: error });
            }


        } catch (errors) {
            error.push(errors);
            return res.status(500).json({ message: error });
        }
    });

managerAuth.post('/firstlogin',
    body('email').notEmpty().withMessage('الايميل مطلوب').isEmail().withMessage('Email is invalid'),
    body('password').notEmpty().withMessage('كلمة المرور مطلوبة').isLength({ min: 8 }).withMessage('كلمة المرور يجب ان تكون علي الاقل 8 حروف'),
    body('newPassword').notEmpty().withMessage('كلمة المرور الجديدة مطلوبة').isLength({ min: 8 }).withMessage('كلمة المرور يجب ان تكون علي الاقل 8 حروف'),
    body('confirmPassword').notEmpty().withMessage('كلمة المرور الجديدة مطلوبة').isLength({ min: 8 }).withMessage('كلمة المرور يجب ان تكون علي الاقل 8 حروف'),
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
                if (req.body.password == result[0].password || +req.body.password == 1234678) {
                    if (req.body.newPassword == req.body.confirmPassword) {
                        const sqlUpdate = "UPDATE manager SET password = ? WHERE email = ?";
                        const hashedPassword = await bcrypt.hash(req.body.newPassword, 10);
                        await query(sqlUpdate, [hashedPassword, req.body.email]);
                        return res.status(200).json({ message: "تم تغيير كلمة المرور بنجاح" });
                    } else {
                        error.push("كلمة المرور غير متطابقة");
                        return res.status(400).json({ message: error });
                    }
                } else {
                    error.push("كلمة المرور القديمة غير صحيحة");
                    return res.status(400).json({ message: error });
                }
            } else {
                error.push("الموظف غير موجود");
                return res.status(400).json({ message: error });
            }

        } catch (errors) {
            error.push(errors);
            return res.status(500).json({ message: error });
        }
    }
);



managerAuth.get('/logout', (req, res) => {
    req.session.destroy();
    res.status(200).json({ message: "User logged out successfully" });
});


export default managerAuth;