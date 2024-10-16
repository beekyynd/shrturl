import express from "express";

import { createLink, deleteLink, getLinks, updateLink } from "../controllers/link.controller.js";

const router = express.Router();

router.get("/", getLinks);
router.post("/", createLink);
router.put("/:id", updateLink);
router.delete("/:id", deleteLink);

export default router;