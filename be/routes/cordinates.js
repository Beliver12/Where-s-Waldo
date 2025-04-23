const { Router } = require("express");

const router = Router();
const cordinatesController = require("../controllers/cordinatesController");

router.post("/", cordinatesController.cordinatesPost);
router.post("/check", cordinatesController.cordinatesCheck);

module.exports = router;
