import express from 'express';
import { alterOrganizationController, createOrgananizationController, deleteOrganizationController, findOrganizationController, listOrganizationController } from './organization.controller.js';
import { authentication, authorizationSuperAdmin } from '../../middleware/auth.js';

const organizationRouter = express.Router();

organizationRouter.get("/", authentication, authorizationSuperAdmin , listOrganizationController);
organizationRouter.get("/:id", authentication, authorizationSuperAdmin , findOrganizationController);
organizationRouter.post("/", authentication, authorizationSuperAdmin , createOrgananizationController);
organizationRouter.patch("/", authentication, authorizationSuperAdmin , alterOrganizationController);
organizationRouter.patch("/:id", authentication, authorizationSuperAdmin , alterOrganizationController);
organizationRouter.delete("/", authentication, authorizationSuperAdmin , deleteOrganizationController);
organizationRouter.delete("/:id", authentication, authorizationSuperAdmin , deleteOrganizationController);

export default organizationRouter;