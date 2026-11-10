const { Router } = require("express");
const authMiddleware = require("../middleware/auth.middleware");
const taskController = require("../controller/task.controllers");

const taskRouter = Router();

taskRouter.post('/createTask',authMiddleware.authUser,taskController.createTask);

taskRouter.get('/gpt',authMiddleware.authUser,taskController.getParentTask);

taskRouter.get('/gct/:id',authMiddleware.authUser,taskController.getChildTask);

taskRouter.patch('/updateTask/:id',authMiddleware.authUser,taskController.updateTask);

taskRouter.delete('/deleteTask/:id',authMiddleware.authUser,taskController.deleteTask);

module.exports =  taskRouter;