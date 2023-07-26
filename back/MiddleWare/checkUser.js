import express from 'express';
import jwt from 'jsonwebtoken';


const key = "secretkey";


const checkUser = async (req, res, next) => {
    try {
        let token = req.session.token
        if (!token) {
            return res.status(401).json({ user: false, msg: "Unauthorized" });
        } else {
            token = token.split(" ")[1];
            jwt.verify(token, key, (err, decoded) => {
                if (err) {
                    return res.status(401).json({ user: true, msg: err});
                }
                req.id = decoded.id;
                req.name = decoded.name;
                req.email = decoded.email;
                req.national_id = decoded.national_id;
                
                next();
            }
            );
        }



    } catch (err) {
        return res.status(500).json("user Error");
    }
}

export default checkUser;