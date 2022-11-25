const express = require("express");
const router = express.Router();

const DiagramAbl = require("../abl/TopicAbl");
const abl = new DiagramAbl();

router.post("/create", async (req, res) => {
    await abl.create(req, res);
});
router.post("/update", async (req, res) => {
    await abl.update(req, res);
});
router.get("/get", async (req, res) => {
    await abl.get(req, res);
});
router.post("/delete", async (req, res) => {
    await abl.delete(req, res);
});
router.get("/list", async (req, res) => {
    await abl.list(req, res);
});

module.exports = router;