const { Router } = require("express");
const { getboardings } = require("../controllers/boardingController");

const router = Router();

router.get("/", getboardings);

module.exports = router;