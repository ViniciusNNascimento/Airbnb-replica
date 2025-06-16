import "dotenv/config";
import mongoose from "mongoose";

const { MONGO_URL } = process.env;

export const connectDb = async () => {
    try {
      await mongoose.connect(MONGO_URL);
        console.log("Conectado ao banco de dados");
    } catch (error) {
        console.log("Erro ao conectar ao banco de dados", error);
    }
    
}












