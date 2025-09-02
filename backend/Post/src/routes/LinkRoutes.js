import express from "express";
import addLink from "../controller/AddLinkController.js";
import getLinks from "../controller/GetLinksController.js";

const router = express.Router();

router.post("/addLink", addLink);
router.get("/", getLinks);

export default router;
