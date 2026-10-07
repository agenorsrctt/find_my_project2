import express from 'express';
import { alterUserController, createUserController, deleteUserController, findUserController, listUserController } from './user.controller.js';
import { authentication } from '../../middleware/auth.js';

const userRouter = express.Router();

userRouter.get("/", authentication, listUserController);
userRouter.get("/:id", authentication, findUserController);
userRouter.post("/", createUserController);
userRouter.patch("/:id", authentication ,alterUserController);
userRouter.delete("/:id", authentication, deleteUserController);

export default userRouter;