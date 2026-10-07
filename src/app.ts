import cors from "cors";
import express from 'express';
import organizationRouter from './modules/organizations/organization.route.js';
import { generatedTables } from './database/init.js';
import userRouter from './modules/users/user.route.js';
import projectRoute from './modules/projects/project.route.js';
import loginRouter from './modules/login/login.route.js';
import upvoteRouter from './modules/upvotes/upvote.route.js';

await generatedTables();

const app = express()

app.use(cors());
app.use(express.json());

app.use("/organization", organizationRouter);
app.use("/user", userRouter);
app.use("/project", projectRoute);
app.use("/login", loginRouter);
app.use("/upvote", upvoteRouter);

console.log("App iniciado, Rotas carregadas.")

export default app;