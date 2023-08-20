import express from "express";
import query from '../Database/DBConnection.js';
import { body, validationResult } from "express-validator";
import e from "express";
import checkUser from "../MiddleWare/checkUser.js";
import upload from "../MiddleWare/Uplodeimgs.js";
import fs from "fs";

const serviceStepTwo = express();
serviceStepTwo.use(express.Router());


const handleDeleteFile = (req) => {
    const payment_photo = req.files.payment_photo ? req.files.payment_photo[0].filename : null;
    const photo_college_letter = req.files.photo_college_letter ? req.files.photo_college_letter[0].filename : null;
    const research = req.files.research ? req.files.research[0].filename : null;
    const research_en = req.files.research_en ? req.files.research_en[0].filename : null;
    const research_word = req.files.research_word ? req.files.research_word[0].filename : null;
    const research_word_en = req.files.research_word_en ? req.files.research_word_en[0].filename : null;
    const translation = req.files.translation ? req.files.translation[0].filename : null;

    const path = `./public/imgs/${req.national_id}/${payment_photo}`;
    const path2 = `./public/imgs/${req.national_id}/${photo_college_letter}`;
    const path3 = `./public/imgs/${req.national_id}/${research}`;
    const path4 = `./public/imgs/${req.national_id}/${research_en}`;
    const path5 = `./public/imgs/${req.national_id}/${research_word}`;
    const path6 = `./public/imgs/${req.national_id}/${research_word_en}`;
    const path7 = `./public/imgs/${req.national_id}/${translation}`;

    for (let i = 0; i < 7; i++) {
        if (payment_photo != null && i == 0) {
            fs.unlinkSync(path, (err) => {
                if (err) {
                    console.error(err)
                    return
                }
            })
        } else if (photo_college_letter != null && i == 1) {
            fs.unlinkSync(path2, (err) => {
                if (err) {
                    console.error(err)
                    return
                }
            })
        } else if (research != null && i == 2) {
            fs.unlinkSync(path3, (err) => {
                if (err) {
                    console.error(err)
                    return
                }
            })
        } else if (research_en != null && i == 3) {
            fs.unlinkSync(path4, (err) => {
                if (err) {
                    console.error(err)
                    return
                }
            })
        } else if (research_word != null && i == 4) {
            fs.unlinkSync(path5, (err) => {
                if (err) {
                    console.error(err)
                    return
                }
            })
        } else if (research_word_en != null && i == 5) {
            fs.unlinkSync(path6, (err) => {
                if (err) {
                    console.error(err)
                    return
                }
            })
        } else if (translation != null && i == 6) {
            fs.unlinkSync(path7, (err) => {
                if (err) {
                    console.error(err)
                    return
                }
            })
        }
    }
}
const handleDeleteFile2 = (req) => {
    const payment_photo = req.files.payment_photo ? req.files.payment_photo[0].filename : null;
    const research = req.files.research ? req.files.research[0].filename : null;
    const research_word = req.files.research_word ? req.files.research_word[0].filename : null;
    const form = req.files.form ? req.files.form[0].filename : null;

    const path = `./public/imgs/${req.national_id}/${payment_photo}`;
    const path3 = `./public/imgs/${req.national_id}/${research}`;
    const path5 = `./public/imgs/${req.national_id}/${research_word}`;
    const path7 = `./public/imgs/${req.national_id}/${form}`;

    for (let i = 0; i < 7; i++) {
        if (payment_photo != null && i == 0) {
            fs.unlinkSync(path, (err) => {
                if (err) {
                    console.error(err)
                    return
                }
            })
        } else if (research != null && i == 2) {
            fs.unlinkSync(path3, (err) => {
                if (err) {
                    console.error(err)
                    return
                }
            })
        } else if (research_word != null && i == 4) {
            fs.unlinkSync(path5, (err) => {
                if (err) {
                    console.error(err)
                    return
                }
            })
        } else if (form != null && i == 6) {
            fs.unlinkSync(path7, (err) => {
                if (err) {
                    console.error(err)
                    return
                }
            })
        }
    }
}


serviceStepTwo.put("/StepTwoReg/:id/:id2",
    checkUser,
    upload.fields(
        [{ name: "payment_photo", maxCount: 1 },
        { name: "photo_college_letter", maxCount: 1 },
        { name: "research", maxCount: 1 },
        { name: "research_en", maxCount: 1 },
        { name: "research_word", maxCount: 1 },
        { name: "research_word_en", maxCount: 1 },
        { name: "translation", maxCount: 1 },
        ]),

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

            const id = req.params.id;
            const id2 = req.params.id2;

            console.log(req.files);
            if (!req.files.payment_photo) {
                handleDeleteFile(req);
                error.push("Please upload payment_photo");
                return res.status(400).json({ message: error });
            } else {
                console.log(1);
                const ext = req.files.payment_photo[0].filename.split(".").pop();
                console.log(2);
                if (ext !== "jpg" && ext !== "png" && ext !== "jpeg" && ext !== "pdf" && ext !== "docx" && ext !== "doc") {
                    handleDeleteFile(req);
                    error.push("Please upload image or pdf or word");
                    return res.status(400).json({ message: error });
                }
            }
            if (!req.files.photo_college_letter) {
                handleDeleteFile(req);
                error.push("Please upload photo_college_letter");
                return res.status(400).json({ message: error });
            } else {
                const ext = req.files.photo_college_letter[0].filename.split(".").pop();
                if (ext !== "jpg" && ext !== "png" && ext !== "jpeg" && ext !== "pdf" && ext !== "docx" && ext !== "doc") {
                    handleDeleteFile(req);
                    error.push("Please upload image or pdf or word");
                    return res.status(400).json({ message: error });
                }
            }
            if (!req.files.research) {
                handleDeleteFile(req);
                error.push("Please upload research");
                return res.status(400).json({ message: error });
            } else {
                const ext = req.files.research[0].filename.split(".").pop();
                if (ext !== "jpg" && ext !== "png" && ext !== "jpeg" && ext !== "pdf" && ext !== "docx" && ext !== "doc") {
                    handleDeleteFile(req);
                    error.push("Please upload image or pdf or word");
                    return res.status(400).json({ message: error });
                }
            }
            if (!req.files.research_word) {
                handleDeleteFile(req);
                error.push("Please upload research_word");
                return res.status(400).json({ message: error });
            } else {
                const ext = req.files.research_word[0].filename.split(".").pop();
                if (ext !== "jpg" && ext !== "png" && ext !== "jpeg" && ext !== "pdf" && ext !== "docx" && ext !== "doc") {
                    handleDeleteFile(req);
                    error.push("Please upload image or pdf or word");
                    return res.status(400).json({ message: error });
                }
            }
            if (!req.files.translation) {
                handleDeleteFile(req);
                error.push("Please upload translation");
                return res.status(400).json({ message: error });
            } else {
                const ext = req.files.translation[0].filename.split(".").pop();
                if (ext !== "jpg" && ext !== "png" && ext !== "jpeg" && ext !== "pdf" && ext !== "docx" && ext !== "doc") {
                    handleDeleteFile(req);
                    error.push("Please upload image or pdf or word");
                    return res.status(400).json({ message: error });
                }
            }
            if (req.files.research_en) {
                const ext = req.files.research_en[0].filename.split(".").pop();
                if (ext !== "jpg" && ext !== "png" && ext !== "jpeg" && ext !== "pdf" && ext !== "docx" && ext !== "doc") {
                    handleDeleteFile(req);
                    error.push("Please upload image or pdf or word");
                    return res.status(400).json({ message: error });
                }
            }
            if (req.files.research_word_en) {
                const ext = req.files.research_word_en[0].filename.split(".").pop();
                if (ext !== "jpg" && ext !== "png" && ext !== "jpeg" && ext !== "pdf" && ext !== "docx" && ext !== "doc") {
                    handleDeleteFile(req);
                    error.push("Please upload image or pdf or word");
                    return res.status(400).json({ message: error });
                }
            }



            // if (req.files) {
            //     for (let i = 0; i < req.files.length; i++) {
            //         let file = ""
            //         if(i == 1){
            //             file = req.files.payment_photo[0].filename
            //         }else if(i == 2){
            //             file = req.files.photo_college_letter[0].filename
            //         }else if(i == 3){
            //             file = req.files.research[0].filename
            //         }else if(i == 4){
            //             file = req.files.research_en[0].filename
            //         }else if(i == 5){
            //             file = req.files.translation[0].filename
            //         }

            //         let ext = file.split(".").pop();
            //         if (ext !== "jpg" && ext !== "png" && ext !== "jpeg" && ext !== "pdf" && ext !== "docx" && ext !== "doc") {
            //             handleDeleteFile(req);
            //             error.push("Please upload image or pdf or word");
            //             return res.status(400).json({ message: error });
            //         }
            //     }
            // }
            // let research_en = req.files.research_en[0].filename;
            // let research_word_en = req.files.research_word_en[0].filename;

            const research_en = req.files.research_en ? req.files.research_en[0].filename : null;
            const research_word_en = req.files.research_word_en ? req.files.research_word_en[0].filename : null;

            const data = {
                photo_payment_receipt: req.files.payment_photo[0].filename,
                photo_college_letter: req.files.photo_college_letter[0].filename,
                research_plan_ar_pdf: req.files.research[0].filename,
                research_plan_en_pdf: research_en,
                research_plan_ar_word: req.files.research_word[0].filename,
                research_plan_en_word: research_word_en,
                translation_paper: req.files.translation[0].filename,
            }

            const sql = `UPDATE registration_services SET ? WHERE id = ? `;
            const value = [data, id2];
            const result = await query(sql, value);
            if (result.affectedRows > 0) {
                const submit = {
                    status: 2,
                    submit_date: new Date(),
                }
                const sql2 = 'UPDATE submit SET ? WHERE service_id = ? AND ser_reg = ? AND user_id = ?';
                const value2 = [submit, id, id2, req.id];
                const result2 = await query(sql2, value2);
                if (result2.affectedRows > 0) {
                    return res.status(200).json({ message: "Data saved successfully" });
                } else {
                    handleDeleteFile(req);
                    error.push("Data not saved");
                    return res.status(400).json({ message: error });
                }
            } else {
                handleDeleteFile(req);
                error.push("Data not saved");
                return res.status(400).json({ message: error });
            }

        } catch (error) {
            handleDeleteFile(req);
            return res.status(500).json({ message: error.message });
        }
    }
);
serviceStepTwo.put("/StepTwoSer2/:id/:id2",
    checkUser,
    upload.fields(
        [{ name: "payment_photo", maxCount: 1 },
        { name: "research", maxCount: 1 },
        { name: "research_word", maxCount: 1 },
        { name: "form", maxCount: 1 },
        ]),

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

            const id = req.params.id;
            const id2 = req.params.id2;

            console.log(req.files);
            if (!req.files.payment_photo) {
                handleDeleteFile2(req);
                error.push("Please upload payment_photo");
                return res.status(400).json({ message: error });
            } else {
                console.log(1);
                const ext = req.files.payment_photo[0].filename.split(".").pop();
                console.log(2);
                if (ext !== "jpg" && ext !== "png" && ext !== "jpeg" && ext !== "pdf" && ext !== "docx" && ext !== "doc") {
                    handleDeleteFile2(req);
                    error.push("Please upload image or pdf or word");
                    return res.status(400).json({ message: error });
                }
            }
            
            if (!req.files.research) {
                handleDeleteFile2(req);
                error.push("Please upload research");
                return res.status(400).json({ message: error });
            } else {
                const ext = req.files.research[0].filename.split(".").pop();
                if (ext !== "jpg" && ext !== "png" && ext !== "jpeg" && ext !== "pdf" && ext !== "docx" && ext !== "doc") {
                    handleDeleteFile2(req);
                    error.push("Please upload image or pdf or word");
                    return res.status(400).json({ message: error });
                }
            }

            if (!req.files.research_word) {
                handleDeleteFile2(req);
                error.push("Please upload research_word");
                return res.status(400).json({ message: error });
            } else {
                const ext = req.files.research_word[0].filename.split(".").pop();
                if (ext !== "docx" && ext !== "doc") {
                    handleDeleteFile2(req);
                    error.push("Please upload word file");
                    return res.status(400).json({ message: error });
                }
            }

            if (!req.files.form) {
                handleDeleteFile2(req);
                error.push("Please upload form");
                return res.status(400).json({ message: error });
            } else {
                const ext = req.files.form[0].filename.split(".").pop();
                if (ext !== "jpg" && ext !== "png" && ext !== "jpeg" && ext !== "pdf" && ext !== "docx" && ext !== "doc") {
                    handleDeleteFile2(req);
                    error.push("Please upload image or pdf or word");
                    return res.status(400).json({ message: error });
                }
            }
            


            
            const data = {
                photo_payment_receipt: req.files.payment_photo[0].filename,
                message_word_ar: req.files.research_word[0].filename,
                message_pdf_ar: req.files.research[0].filename,
                quote_check_form: req.files.form[0].filename,
            }

            
            const sql = `UPDATE formation_service SET ? WHERE id = ? `;
            const value = [data, id2];
            const result = await query(sql, value);
            if (result.affectedRows > 0) {
                const submit = {
                    status: 2,
                    submit_date: new Date(),
                }
                const sql2 = 'UPDATE submit SET ? WHERE service_id = ? AND ser_formation = ? AND user_id = ?';
                const value2 = [submit, id, id2, req.id];
                const result2 = await query(sql2, value2);
                if (result2.affectedRows > 0) {
                    return res.status(200).json({ message: "Data saved successfully" });
                } else {
                    handleDeleteFile2(req);
                    error.push("Data not saved");
                    return res.status(400).json({ message: error });
                }
            } else {
                handleDeleteFile2(req);
                error.push("Data not saved");
                return res.status(400).json({ message: error });
            }

        } catch (error) {
            handleDeleteFile2(req);
            return res.status(500).json({ message: error.message });
        }
    }
);

export default serviceStepTwo;