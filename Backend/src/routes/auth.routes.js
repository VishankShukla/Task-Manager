const { Router } = require("express");
const authController = require("../controller/auth.controllers");
const authMiddleware = require("../middleware/auth.middleware");

const authRouter = Router();

authRouter.post('/register',authController.registerUser);

authRouter.post('/login',authController.loginUser);

authRouter.post('/logout',authController.logoutUser);

authRouter.get('/getme',authMiddleware.authUser,authController.getme);

module.exports = authRouter;