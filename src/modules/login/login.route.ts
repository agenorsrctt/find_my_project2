import { 
    loginController
} from './login.controller.js';
import express from 'express';

const loginRouter = express.Router();

loginRouter.post("/", loginController);

export default loginRouter;