const { Router} = require("express");
const { getBookings,
    createBooking,
    getBooking
 } = require("../controllers/bookingController");
router = Router();

router.get("/", getBookings);
router.get("/:id", getBooking);
router.post("/", createBooking);


module.exports = router;