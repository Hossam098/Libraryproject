import express from "express";
import query from '../Database/DBConnection.js';
import { body, validationResult } from "express-validator";
import e from "express";
import checkUser from "../MiddleWare/checkUser.js";
import upload from "../MiddleWare/Uplodeimgs.js";
import fs from "fs";

const serviceStepTwo = express();
serviceStepTwo.use(express.Router());
// const handleDeleteFile = (req) => {

//     const img = req.file.filename;
//     const path = `./public/imgs/${req.national_id}/${img}`;

//     fs.unlinkSync(path, (err) => {
//         if (err) {
//             console.error(err)
//             return
//         }
//     }
//     )
// }

serviceStepTwo.post("/StepTwo/:id/:id2",
    checkUser,
    async (req, res) => {
        let error = [];
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                // handleDeleteFile(req);
                errors.array().forEach(element => {
                    error.push(element.msg);
                });
                return res.status(400).json({ message: error });
            }

            const id = req.params.id;
            const id2 = req.params.id2;

            console.log(id);
            console.log(id2);
        } catch (error) {
            // handleDeleteFile(req);
            return res.status(500).json({ message: error.message });
        }
    }
);

export default serviceStepTwo;