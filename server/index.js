import express from "express";
import dotenv from "dotenv"
import cors from "cors"
import mongoose from "mongoose";
import route from "./routess/authentication.js";
import router from "./routess/workouts.js";


dotenv.config()

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.use("/api/auth", route);
app.use("/api/workouts" , router)

mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true, 
    useUnifiedTopology: true
})
.then(() => {
    console.log("mongo is connected");
})
.catch((err) => {
    console.log("failed to connect", err);
});


app.get("/" , (req,res) => {
    res.send("server is working ")
});
app.listen(port, (req,res) => {
    console.log(`Server is listening on ${port}`)
});