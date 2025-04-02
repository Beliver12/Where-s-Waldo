const { Router } = require("express");

const router = Router();
const imageController = require("../controllers/imageController");

router.get("/", imageController.imageGet); //tested

module.exports = router;
