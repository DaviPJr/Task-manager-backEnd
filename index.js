import express from "express";
import dotenv from "dotenv";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

dotenv.config();

const app = express();
app.use(express.json());

app.get("/tasks", async (req, res) => {
    try {
        const tasks = await prisma.task.findMany();
        res.status(200).send(tasks);
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
});

app.post("/tasks", async (req, res) => {
    try {
        const { description, completed } = req.body;

        if (!description || typeof completed !== "boolean") {
            return res.status(400).send({ error: "Dados inválidos!" });
        }

        const newTask = await prisma.task.create({
            data: {
                description,
                completed,
            },
        });

        res.status(201).send(newTask);
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
});

app.listen(8000, () => {
    console.log("Listening on port 8000");
});
