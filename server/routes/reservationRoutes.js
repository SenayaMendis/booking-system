const { Router } = require('express');
const { auth } = require("../middleware/authMiddleware");

const {
  getReservations,
  createReservation,
    updateReservation,
    deleteReservation,
    getReservation,
} = require("../controllers/reservationController");

const router = Router();

router.get("/", auth, getReservations);
router.get("/:id", getReservation);
router.post("/", createReservation);
router.put("/:id", auth, updateReservation);
router.delete("/:id", auth, deleteReservation);

module.exports = router;