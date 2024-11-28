import express from "express";
import TaskController from "../controller/task.controller.js";

const router = express.Router();

router.get("/", async (req, res) => {
    return new TaskController(req, res).getTasks();
});

router.get("/:id", async (req, res) => {
    return new TaskController(req, res).getTaskById();
});

router.post("/", async (req, res) => {
    return new TaskController(req, res).addTask();
});

router.patch("/:id", async (req, res) => {
    return new TaskController(req, res).updateTask();
});

router.delete("/:id", async (req, res) => {
    return new TaskController(req, res).deleteTask();
});

export default router;
