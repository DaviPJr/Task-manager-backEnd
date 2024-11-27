import express from "express";
import dotenv from "dotenv";
import router from "./src/routes/task.routes.js";

dotenv.config();

const app = express();
app.use(express.json());
app.use("/tasks", router);

app.listen(8000, () => {
    console.log("Listening on port 8000");
});
