const { Router } = require("express");

const router = Router();
const leaderBoardController = require("../controllers/leaderBoardController")

router.post("/", leaderBoardController.leaderBoardPost);

module.exports = router;
