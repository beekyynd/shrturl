import express from "express";

import { createLink, deleteLink, getLinks, updateLink, redirectToTarget } from "../controllers/link.controller.js";

const router = express.Router();

router.get("/", getLinks);
router.post("/", createLink);
router.get("/:short", redirectToTarget);
router.put("/:id", updateLink);
router.delete("/:id", deleteLink);

export default router;