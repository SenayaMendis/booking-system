const Reservation = require('../models/reservationModel');
const { sendEmail } = require('../utils/emailService');

// Example controller functions
const getReservations = async (req, res, next) => {
  try {
    const reservations = await Reservation.find();
    res.json(reservations);
  } catch (error) {
    next(error);
  }
};

const createReservation = async (req, res, next) => {
  try {
    const reservation = new Reservation(req.body);
    await reservation.save();

    // Send email notification to the owner and the reservation user
    const ownerEmail = 'owner_email@example.com'; // Replace with the owner's email address
    const userEmail = reservation.email; // Email of the reservation user
    const subject = 'New Reservation Created';
    const text = `A new reservation has been created. Details:\n\nRoom ID: ${reservation.roomId}\nName: ${reservation.name}\nEmail: ${reservation.email}\nPhone: ${reservation.phone}\nCheck-In Date: ${reservation.checkInDate}\nBills: ${reservation.bills}\nConfirmed: ${reservation.confirmed}\nCancelled: ${reservation.cancelled}`;

    sendEmail(ownerEmail, subject, text);
    sendEmail(userEmail, subject, text);

    res.status(201).json(reservation);
  } catch (error) {
    next(error);
  }
};

const getReservation = async (req, res, next) => {
  try {
    const reservation = await Reservation.findById(req.params.id);
    res.json(reservation);
  } catch (error) {
    next(error);
  }
};

const updateReservation = async (req, res, next) => {
  try {
    const reservation = await Reservation.findByIdAndUpdate(req.params.id, req.body, { new: true });

    // Send email notification to the owner and the reservation user
    const ownerEmail = 'owner_email@example.com'; // Replace with the owner's email address
    const userEmail = reservation.email; // Email of the reservation user
    const subject = 'Reservation Updated';
    const text = `A reservation has been updated. Details:\n\nRoom ID: ${reservation.roomId}\nName: ${reservation.name}\nEmail: ${reservation.email}\nPhone: ${reservation.phone}\nCheck-In Date: ${reservation.checkInDate}\nBills: ${reservation.bills}\nConfirmed: ${reservation.confirmed}\nCancelled: ${reservation.cancelled}`;

    sendEmail(ownerEmail, subject, text);
    sendEmail(userEmail, subject, text);

    res.json(reservation);
  } catch (error) {
    next(error);
  }
};

const deleteReservation = async (req, res, next) => {
  try {
    const reservation = await Reservation.findByIdAndDelete(req.params.id);

    // Send email notification to the owner and the reservation user
    const ownerEmail = 'owner_email@example.com'; // Replace with the owner's email address
    const userEmail = reservation.email; // Email of the reservation user
    const subject = 'Reservation Deleted';
    const text = `A reservation has been deleted. Details:\n\nRoom ID: ${reservation.roomId}\nName: ${reservation.name}\nEmail: ${reservation.email}\nPhone: ${reservation.phone}\nCheck-In Date: ${reservation.checkInDate}\nBills: ${reservation.bills}\nConfirmed: ${reservation.confirmed}\nCancelled: ${reservation.cancelled}`;

    sendEmail(ownerEmail, subject, text);
    sendEmail(userEmail, subject, text);

    res.status(204).json({ message: 'Reservation deleted' });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getReservations,
  createReservation,
  getReservation,
  updateReservation,
  deleteReservation,
};

/*/*const Reservation = require('../models/reservationModel');
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

module.exports = {
    getReservations,
    createReservation,
    updateReservation,
    deleteReservation,
    getReservation
};*/