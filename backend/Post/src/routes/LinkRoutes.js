import express from "express";
import addLink from "../controller/AddLinkController.js";
import getLinks from "../controller/GetLinksController.js";
import deletLink from "../controller/DeleteLinkController.js";
import updateLink from "../controller/UpdateLinkController.js";
import GetOneLink from "../controller/GetOneLinkController.js";

const router = express.Router();

router.post("/addLink", addLink);
router.get("/", getLinks);
router.get("/:id", GetOneLink);
router.delete("/delete/:id",deletLink);
router.put("/update/:id",updateLink);

export default router;
