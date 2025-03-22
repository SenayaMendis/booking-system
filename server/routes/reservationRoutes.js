const { Router} = require("express");
const { getReservations,
    createReservation,
    updateReservation,
    deleteReservation,
    getReservation
 } = require("../controllers/reservationController");
 const { addReservation } = require("../controllers/reservationController");
const router = require("./boardingRoutes");
router = Router();

router.get("/", getReservations);
router.get("/:id", getReservation);
router.post("/", createReservation);
router.put("/:id", updateReservation);
router.delete("/:id", deleteReservation);

module.exports = router;