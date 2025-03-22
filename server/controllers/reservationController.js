const Reservation = require('../models/reservationModel');
const { addEvent } = require("../utils/googleCalendar");

const getReservations = async (req, res, next) => {
    try {
        const reservations = await Reservation.find();
        if (!reservations) {
            res.status(400);
            throw new Error("Cannot find reservations");
        }
        return res.status(200).json(reservations);
    } catch (error) {
        next(error);
    }
};

// Create reservation
const createReservation = async (req, res, next) => {
    try {
        const { roomId, name, email, phone, reserveDate, reserveTime } = req.body;

        const reservation = new Reservation({
            roomId,
            name,
            email,
            phone,
            reserveDate,
            reserveTime,
        });

        await reservation.save();

        const event = {
            summary: `Reservation for ${name}`,
            start: {
                dateTime: new Date(`${reserveDate}T${reserveTime}:00`).toISOString(),
                timeZone: 'UTC',
            },
            end: {
                dateTime: new Date(`${reserveDate}T${reserveTime}:00`).toISOString(),
                timeZone: 'UTC',
            },
        };

        await addEvent(event);

        return res.status(201).json({ message: "Reservation created and event added to Google Calendar" });
    } catch (error) {
        next(error);
    }
};

// Update reservation
const updateReservation = async (req, res, next) => {
    try {
        const updateReservation = await Reservation.findByIdAndUpdate(req.params.id, { $set: req.body }, {
            new: true
        });

        if (!updateReservation) {
            res.status(400);
            throw new Error("Cannot update reservation");
        }
        const reservations = await Reservation.find();
        return res.status(200).json(reservations);
    } catch (error) {
        next(error);
    }
};

// Delete reservation
const deleteReservation = async (req, res, next) => {
    try {
        const deleteReservation = await Reservation.findByIdAndDelete(req.params.id);
        if (!deleteReservation) {
            res.status(400);
            throw new Error("Cannot delete reservation");
        }
        const reservations = await Reservation.find();
        return res.status(200).json({ id: req.params.id });
    } catch (error) {
        next(error);
    }
};

// Get single reservation
const getReservation = async (req, res, next) => {
    try {
        const reservation = await Reservation.findById(req.params.id);
        if (!reservation) {
            res.status(400);
            throw new Error("Cannot find reservation");
        }
        return res.status(200).json(reservation);
    } catch (error) {
        next(error);
    }
};

module.exports = {
    getReservations,
    createReservation,
    updateReservation,
    deleteReservation,
    getReservation
};