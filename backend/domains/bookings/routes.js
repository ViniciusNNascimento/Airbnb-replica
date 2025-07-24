import { Router } from "express";
import Booking from "./model.js"
import { connectDb } from "../../config/db.js"
import { JWTVerify } from "../../utils/jwt.js"

const router = Router();

router.get('/owner', async (req, res) => {
    connectDb();

    try {
        const { _id: id } = await JWTVerify(req);
        try {
            const bookingDocs = await Booking.find({ user: id }).populate('place');

            res.json(bookingDocs);
        } catch (error) {
            console.error(error)
            res.status(500).json("deu erro ao buscar todas as reservas", error);
        }
    } catch (error) {
        console.error(error)
        res.status(500).json("deu erro ao validar o token do usuario", error);
    }


});

router.post('/', async (req, res) => {
    connectDb();
    const {
        place,
        user,
        price,
        total,
        checkin,
        checkout,
        guests,
        nights, } = req.body;

    try {
        const newBookingDoc = await Booking.create({
            place,
            user,
            price,
            total,
            checkin,
            checkout,
            guests,
            nights,
        });
        res.json(newBookingDoc);
    } catch (error) {
        console.error(error)
        res.status(500).json("deu erro ao CRIAR A RESERVA", error);
    }
})

export default router;
