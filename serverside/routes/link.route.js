import express from "express";

import { createLink, getLinks, redirectToTarget } from "../controllers/link.controller.js";

const router = express.Router();

router.get("/", getLinks);
router.post("/", createLink);
router.get("/:short", redirectToTarget);

export default router;