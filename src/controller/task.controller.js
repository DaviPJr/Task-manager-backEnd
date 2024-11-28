import { PrismaClient } from "@prisma/client";

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
}

export default TaskController;
