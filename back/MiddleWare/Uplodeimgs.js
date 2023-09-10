import multer from 'multer';
import path from "path";
import fs from "fs";


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        console.log(req.params.id);
        const national_id = req.params.id || req.national_id;
        if(!national_id) return cb(new Error("national_id is required"));
        if (fs.existsSync(`./public/imgs/${national_id}`)) {
            cb(null, `./public/imgs/${national_id}`);
        } else {
            fs.mkdirSync(`./public/imgs/${national_id}`);
            cb(null, `./public/imgs/${national_id}`);
        }
    },
    filename(req, file, cb) {
        return cb(null, `${req.params.id || req.national_id}_${Date.now()}${path.extname(file.originalname)}`);
    }
});

const maxSize = 1 * 1024 * 1024;


const upload = multer({
    storage: storage,

})

export default upload;