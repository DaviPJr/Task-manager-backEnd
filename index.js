import express from "express";
import dotenv from "dotenv";
import router from "./src/routes/task.routes.js";
import cors from "cors";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use("/tasks", router);

const port = process.env.PORT || 8000;

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});
