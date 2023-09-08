import express from "express";
import query from '../Database/DBConnection.js';
import { body, validationResult } from "express-validator";
import e from "express";
import checkUser from "../MiddleWare/checkUser.js";
import upload from "../MiddleWare/Uplodeimgs.js";
import checkmanager from "../MiddleWare/checkManager.js";


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

user.get('/getuser',
    checkUser,
    async (req, res) => {
        let error = [];
        try {
            const sqlSelect = "SELECT * FROM users WHERE id = ?";
            const result = await query(sqlSelect, [req.id]);
            if (result.length > 0) {
                delete result[0].password;
                return res.status(200).json(result[0]);
            } else {
                error.push("No user found");
                return res.status(400).json({ message: error });
            }
        } catch (errors) {
            error.push(errors);
            return res.status(500).json({ message: error });
        }
    }
);

user.put('/updateuser',
    checkUser,
    upload.single('img'),
    async (req, res) => {
        let error = [];
        try {
            const sqlSelect = "SELECT * FROM users WHERE id = ?";
            const result = await query(sqlSelect, [req.id]);
            if (result.length > 0) {
                let image = result[0].img;
                if (req.file) {
                    image = req.file.filename;
                }
                const userDate = {
                    name: req.body.name,
                    email: req.body.email,
                    img: image,
                    phone: req.body.phone,
                    national_id: req.body.national_id,
                    university: req.body.university,
                    faculity: req.body.faculity,
                    department: req.body.department,
                    nationality: req.body.nationality,
                }
                const sqlUpdate = "UPDATE users SET ? WHERE id = ?";
                const resultUpdate = await query(sqlUpdate, [userDate, req.id]);
                if (resultUpdate.affectedRows > 0) {
                    return res.status(200).json({ message: "User updated successfully" });
                } else {
                    error.push("User not updated");
                    return res.status(400).json({ message: error });
                }
            } else {
                error.push("No user found");
                return res.status(400).json({ message: error });
            }
        } catch (errors) {
            error.push(errors);
            return res.status(500).json({ message: error });
        }
    }
);

user.get('/getuserbyid/:serId/:serNam/:stId/:appId',
    checkmanager,
    async (req, res) => {

        const serId = req.params.serId
        const serNam = req.params.serNam
        const stId = req.params.stId
        const appId = req.params.appId

        console.log(appId,stId,serNam,serId)
    }
)




export default user;



