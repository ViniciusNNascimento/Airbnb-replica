import "dotenv/config.js";
import jwt from "jsonwebtoken";

const JWT_SECRET_KEY  = "fjanfjanflokçad";



export const JWTVerify = (req) => {

    const { token } = req.cookies;

    if (token) {
        return new Promise((resolve, reject) => {
            jwt.verify(token, JWT_SECRET_KEY, {}, (error, userInfo) => {
                if (error) {
                    console.error("deu algum erro ao verificar com o JWT:", error)
                    reject(error)
                }
                resolve(userInfo)
            });
        })

    } else {
        return null;

    }
}

export const JWTSign = (newUserObj) => {
    return new Promise((resolve, reject) => {
        jwt.sign(newUserObj, JWT_SECRET_KEY, { expiresIn: "1d" }, (error, token) => {
            if (error) {
                console.error(error);
                res.status(500).json("Deu algum erro ao assinar com o JWT", error);
                return;
            }

            resolve(token)
        });
    })
}