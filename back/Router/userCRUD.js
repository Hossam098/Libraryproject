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
            const sqlSelect = "SELECT users.* , faculty.* FROM users JOIN faculty ON users.faculity_id = faculty.faculty_id  WHERE users.id = ?";
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

// user.put('/updateuser',
//     checkUser,
//     upload.single('img'),
//     async (req, res) => {
//         let error = [];
//         try {
//             const sqlSelect = "SELECT * FROM users WHERE id = ?";
//             const result = await query(sqlSelect, [req.id]);
//             if (result.length > 0) {
//                 let image = result[0].img;
//                 if (req.file) {
//                     image = req.file.filename;
//                 }
//                 const userDate = {
//                     name: req.body.name,
//                     email: req.body.email,
//                     img: image,
//                     phone: req.body.phone,
//                     national_id: req.body.national_id,
//                     university: req.body.university,
//                     faculity: req.body.faculity,
//                     department: req.body.department,
//                     nationality: req.body.nationality,
//                 }
//                 const sqlUpdate = "UPDATE users SET ? WHERE id = ?";
//                 const resultUpdate = await query(sqlUpdate, [userDate, req.id]);
//                 if (resultUpdate.affectedRows > 0) {
//                     return res.status(200).json({ message: "User updated successfully" });
//                 } else {
//                     error.push("User not updated");
//                     return res.status(400).json({ message: error });
//                 }
//             } else {
//                 error.push("No user found");
//                 return res.status(400).json({ message: error });
//             }
//         } catch (errors) {
//             error.push(errors);
//             return res.status(500).json({ message: error });
//         }
//     }
// );
user.put('/updateuser',
    checkmanager,
    body('user_id').notEmpty().withMessage('user_id is required'),
    async (req, res) => {
        let error = [];
        try {
            const sqlSelect = "SELECT * FROM users WHERE id = ?";
            const result = await query(sqlSelect, [req.body.user_id]);
            if (result.length > 0) {
                if (req.body.university == 1 && req.body.faculity_id != null) {
                    req.body.faculity = null
                } else if (req.body.university == 0 && req.body.faculity != null) {
                    req.body.faculity_id = null
                }

                const userDate = {
                    name: req.body.name,
                    email: req.body.email,
                    img: result[0].img,
                    phone: req.body.phone,
                    national_id: req.body.national_id,
                    university: req.body.university,
                    faculity: req.body.faculity,
                    faculity_id: req.body.faculity_id,
                    department: req.body.department,
                    nationality: req.body.nationality,
                }
                const sqlUpdate = "UPDATE users SET ? WHERE id = ?";
                const resultUpdate = await query(sqlUpdate, [userDate, req.body.user_id]);
                if (resultUpdate.affectedRows > 0) {
                    return res.status(200).json({ message: " تم تعديل بيانات المستخدم بنجاح" });
                } else {
                    error.push("لم يتم تعديل بيانات المستخدم");
                    return res.status(400).json({ message: error });
                }
            } else {
                error.push("لم يتم العثور على المستخدم");
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
            let facultyFlag = false
            let facultyTable = ``
            let facultyJoin = ``
            if (facultyFlag) {
                facultyTable = `,faculty.*`
                facultyJoin = `JOIN faculty ON users.faculity_id = faculty.faculty_id`
            }
            const sqlSelect0 = `SELECT * FROM submit WHERE user_id = ? `;
            const result0 = await query(sqlSelect0, [stId]);
            if (result0.length > 0) {
                if (result0[0].faculity_id != null) {
                    facultyFlag = true
                }
            }

            const sqlSelect = `SELECT 
             submit.* , users.* , services.* , ${ser_table}.*  ${facultyTable} FROM submit JOIN users ON submit.user_id = users.id JOIN services ON submit.service_id = services.id 
             JOIN ${ser_table} ON submit.${serNam} = ${ser_table}.id  
             ${facultyJoin}
             WHERE submit.${serNam} = ?  AND users.id = ? AND submit.service_id = ? `;
            const result = await query(sqlSelect, [appId, stId, serId]);
            if (result.length > 0) {
                delete result[0].password;
                return res.status(200).json(result[0]);
            } else {
                return res.status(400).json({ message: "No user found" });
            }
        } catch (errors) {
            return res.status(500).json({ message: errors });
        }
    }
)

user.post('/contactUs',
    checkUser,
    body('service_id').notEmpty().withMessage('service_id is required'),
    body('selectedReson').notEmpty().withMessage('selectedReson is required'),
    body('message').notEmpty().withMessage('message is required'),
    async (req, res) => {
        let error = [];
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                errors.errors.forEach(element => {
                    error.push(element.msg);
                });
                return res.status(400).json({ message: error });
            }
            const contactUsData = {
                user_id: req.id,
                service_id: req.body.service_id,
                reson: req.body.selectedReson,
                message: req.body.message,
            }

            const sqlInsert = "INSERT INTO messages SET ?";
            const result = await query(sqlInsert, [contactUsData]);
            if (result.affectedRows > 0) {
                return res.status(200).json({ message: "Contact us added successfully" });
            } else {
                error.push("Contact us not added");
                return res.status(400).json({ message: error });
            }
        } catch (errors) {
            error.push(errors);
            return res.status(500).json({ message: error });
        }
    }
);

user.get('/getusermessages',
    checkUser,
    async (req, res) => {
        let error = [];
        try {
            const sqlSelect = "SELECT messages.* , services.* FROM messages JOIN services ON messages.service_id = services.id WHERE messages.user_id = ?";
            const result = await query(sqlSelect, [req.id]);
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

user.get('/getAllFaculties',
    async (req, res) => {
        let error = [];
        try {
            const sqlSelect = "SELECT * FROM faculty";
            const result = await query(sqlSelect);
            if (result.length > 0) {
                return res.status(200).json(result);
            } else {
                error.push("No faculties found");
                return res.status(400).json({ message: error });
            }
        } catch (errors) {
            error.push(errors);
            return res.status(500).json({ message: error });
        }
    }
);


export default user;



