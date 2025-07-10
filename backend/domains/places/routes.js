import { Router } from "express";
import Place from "./model.js";
import { JWTVerify } from "../../utils/jwt.js";
import { connectDb } from "../../config/db.js";
import { __dirname } from "../../server.js";
import { sendToS3, downloadImage, uploadImage } from "./controller.js"


const router = Router();

router.post('/', async (req, res) => {
    connectDb();
    const {
        title,
        city,
        photos,
        descripition,
        extras,
        perks,
        price,
        checkin,
        checkout,
        guests,
    } = req.body;

    try {
        const { _id: owner } = await JWTVerify(req);

        const newPlaceDoc = await Place.create({
            owner,
            title,
            city,
            photos,
            descripition,
            extras,
            perks,
            price,
            checkin,
            checkout,
            guests,
        });

        res.json(newPlaceDoc)

    } catch (error) {
        console.log(error)
        res.status(500).json("deu erro ao criar o novo lugar", error);

    }

})

router.post('/upload/link', async (req, res) => {
    const { link } = req.body;
    const path = `${__dirname}/tmp/`;

    try {

        const { filename, fullPath, mimeType } = await downloadImage(link);

        const fileURL = await sendToS3(filename, fullPath, mimeType)

        res.json(fileURL)
    } catch (error) {
        console.error(error);
        res.status(500).json("deu erro ao baixar imagem");

    }
})

router.post('/upload', uploadImage().array('files', 10), async (req, res) => {


    const { files } = req

    const filesPromise = new Promise((resolve, reject) => {
        const fileURLArray = []


        files.forEach(async (file, index) => {
            const { filename, path, mimetype } = file;

            try {
                const fileURL = await sendToS3(filename, path, mimetype);


                fileURLArray.push(fileURL);
            } catch (error) {
                console.error("deu algum erro ao subir para o S3:", error);
                reject(error);
            }

        });

        const idInterval = setInterval(() => {
            console.log('executou o intervalo')
            
            if (files.length === fileURLArray.length) {
                clearInterval(idInterval);
                console.log('limpou o intervalo')
                resolve(fileURLArray);
            }
        }, 100)


    });

    const fileURLArrayResolved = await filesPromise;

    res.json(fileURLArrayResolved)

})




export default router;
