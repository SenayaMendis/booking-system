const { Router } = require("express");
const { auth } = require("../middleware/authMiddleware");

const {
  getBookings,
  createBooking,
  getBooking,
} = require("../controllers/bookingController");

const router = Router();

router.get("/", auth, getBookings);
router.get("/:id", getBooking);
router.post("/", auth,createBooking);

module.exports = router;