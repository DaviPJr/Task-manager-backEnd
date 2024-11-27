import express from "express";
import dotenv from "dotenv";

dotenv.config();

const app = express();

app.get("/", (req, res) => {
    res.status(200).send("Hello world!");
});

app.listen(8000, () => {
    console.log("Listening on port 8000");
});
