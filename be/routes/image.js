const { Router } = require("express");

const router = Router();
const imageController = require("../controllers/imageController");

router.get("/", imageController.imageGet);
router.post("/selected", imageController.imagePost);

module.exports = router;
