import { PrismaClient } from "@prisma/client";
import { notFoundError } from "../errors/prismadb.errors.js";

const prisma = new PrismaClient();

class TaskController {
    constructor(req, res) {
        (this.req = req), (this.res = res);
    }

    async getTasks() {
        try {
            const tasks = await prisma.task.findMany();
            this.res.status(200).send(tasks);
        } catch (error) {
            this.res.status(500).send({ error: error.message });
        }
    }

    async getTaskById() {
        const taskId = parseInt(this.req.params.id);

        try {
            const task = await prisma.task.findUnique({
                where: {
                    id: taskId,
                },
            });
            if (!task) {
                return notFoundError(this.res);
            }
            this.res.status(200).send(task);
        } catch (error) {
            this.res.status(500).send({ error: error.message });
        }
    }

    async addTask() {
        try {
            const { description, completed } = this.req.body;

            if (!description || typeof completed !== "boolean") {
                return this.res.status(400).send({ error: "Dados inválidos!" });
            }

            const newTask = await prisma.task.create({
                data: {
                    description,
                    completed,
                },
            });

            this.res.status(201).send(newTask);
        } catch (error) {
            this.res.status(500).send({ error: error.message });
        }
    }

    async updateTask() {
        const taskId = parseInt(this.req.params.id);
        const updates = this.req.body;
        try {
            const updatedTask = await prisma.task.update({
                where: {
                    id: taskId,
                },
                data: updates,
            });

            this.res.status(200).send(updatedTask);
        } catch (error) {
            if (error.code === "P2025") {
                return notFoundError(this.res);
            }
            this.res.status(500).send({ error: error.message });
        }
    }

    async deleteTask() {
        const taskId = parseInt(this.req.params.id);

        try {
            if (isNaN(taskId)) {
                return this.res.status(400).send({ error: "ID inválido" });
            }
            const deletedTask = await prisma.task.delete({
                where: {
                    id: taskId,
                },
            });

            this.res.status(200).send(deletedTask);
        } catch (error) {
            if (error.code === "P2025") {
                return notFoundError(this.res);
            }
            this.res.status(500).send({ error: error.message });
        }
    }
}

export default TaskController;
