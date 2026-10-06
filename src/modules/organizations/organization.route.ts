import express from 'express';
import { alterOrganizationController, createOrgananizationController, deleteOrganizationController, findOrganizationController, listOrganizationController } from './organization.controller.js';

const organizationRouter = express.Router();

organizationRouter.get("/", listOrganizationController);
organizationRouter.get("/:id", findOrganizationController);
organizationRouter.post("/", createOrgananizationController);
organizationRouter.patch("/", alterOrganizationController);
organizationRouter.patch("/:id", alterOrganizationController);
organizationRouter.delete("/", deleteOrganizationController);
organizationRouter.delete("/:id", deleteOrganizationController);

export default organizationRouter;