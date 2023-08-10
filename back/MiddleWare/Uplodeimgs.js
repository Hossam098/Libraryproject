import multer from 'multer';
import path from "path";
import fs from "fs";


const storage = multer.diskStorage({
    destination: (req, file, cb) => {

        if (fs.existsSync(`./public/imgs/${req.national_id}`)) {
            cb(null, `./public/imgs/${req.body.national_id || req.national_id}`);
        } else {
            fs.mkdirSync(`./public/imgs/${req.national_id}`);
            cb(null, `./public/imgs/${req.body.national_id || req.national_id}`);
        }
    },
    filename(req, file, cb) {
        return cb(null, `${req.body.national_id || req.national_id}_${file.originalname}_${Date.now()}${path.extname(file.originalname)}`);
    }
});

const maxSize = 1 * 1024 * 1024;


const upload = multer({
    storage: storage,

})

export default upload;