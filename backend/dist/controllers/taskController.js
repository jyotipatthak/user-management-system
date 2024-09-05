"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteTask = exports.updateTask = exports.getTask = exports.getTasks = exports.createTask = void 0;
const task_1 = __importDefault(require("../models/task"));
const createTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { title, description, status, due_date } = req.body;
        const userId = req.user.id;
        const task = yield task_1.default.create({
            title,
            description,
            status,
            due_date,
            userId,
        });
        res.status(201).json(task);
    }
    catch (error) {
        res.status(500).json({ message: 'Error creating task', error });
    }
});
exports.createTask = createTask;
const getTasks = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.user.id;
        const tasks = yield task_1.default.findAll({ where: { userId } });
        res.status(200).json(tasks);
    }
    catch (error) {
        res.status(500).json({ message: 'Error fetching tasks', error });
    }
});
exports.getTasks = getTasks;
const getTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const taskId = req.params.id;
        const userId = req.user.id;
        const task = yield task_1.default.findOne({ where: { id: taskId, userId } });
        if (!task) {
            return res.status(404).json({ message: 'Task not found' });
        }
        res.status(200).json(task);
    }
    catch (error) {
        res.status(500).json({ message: 'Error fetching tasks', error });
    }
});
exports.getTask = getTask;
const updateTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { title, description, status, due_date } = req.body;
        const taskId = req.params.id;
        const userId = req.user.id;
        const task = yield task_1.default.findOne({ where: { id: taskId, userId } });
        if (!task) {
            return res.status(404).json({ message: 'Task not found' });
        }
        yield task.update({ title, description, status, due_date });
        res.status(200).json(task);
    }
    catch (error) {
        res.status(500).json({ message: 'Error updating task', error });
    }
});
exports.updateTask = updateTask;
const deleteTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const taskId = req.params.id;
        const userId = req.user.id;
        const task = yield task_1.default.findOne({ where: { id: taskId, userId } });
        if (!task) {
            return res.status(404).json({ message: 'Task not found' });
        }
        yield task.destroy();
        res.status(200).json({ message: 'Task deleted' });
    }
    catch (error) {
        res.status(500).json({ message: 'Error deleting task', error });
    }
});
exports.deleteTask = deleteTask;
