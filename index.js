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

app.get("/tasks/:id", async (req, res) => {
    const taskId = parseInt(req.params.id);

    try {
        const task = await prisma.task.findUnique({
            where: {
                id: taskId,
            },
        });
        if (!task) {
            return res.status(404).send("Tarefa não encontrada!");
        }
        res.status(200).send(task);
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

app.patch("/tasks/:id", async (req, res) => {
    const taskId = parseInt(req.params.id);
    const updates = req.body;
    try {
        const updatedTask = await prisma.task.update({
            where: {
                id: taskId,
            },
            data: updates,
        });

        res.status(200).send(updatedTask);
    } catch (error) {
        if (error.code === "P2025") {
            return res.status(404).send({ error: "Tarefa não encontrada" });
        }
        res.status(500).send({ error: error.message });
    }
});

app.delete("/tasks/:id", async (req, res) => {
    const taskId = parseInt(req.params.id);

    try {
        if (isNaN(taskId)) {
            return res.status(400).send({ error: "ID inválido" });
        }
        const deletedTask = await prisma.task.delete({
            where: {
                id: taskId,
            },
        });

        res.status(200).send(deletedTask);
    } catch (error) {
        if (error.code === "P2025") {
            return res.status(404).send({ error: "Tarefa não encontrada" });
        }
        res.status(500).send({ error: error.message });
    }
});

app.listen(8000, () => {
    console.log("Listening on port 8000");
});
