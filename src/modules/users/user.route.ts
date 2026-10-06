import express from 'express';
import { alterUserController, createUserController, deleteUserController, findUserController, listUserController } from './user.controller.js';

const userRouter = express.Router();

userRouter.get("/", listUserController);
userRouter.get("/:id", findUserController);
userRouter.post("/", createUserController);
userRouter.patch("/:id", alterUserController);
userRouter.delete("/:id", deleteUserController);

export default userRouter;