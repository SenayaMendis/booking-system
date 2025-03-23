const Booking = require("../models/bookingModel");
const { sendEmail } = require('../utils/emailService');


const getBookings = async (req, res, next) => {
  try {
    const bookings = await Booking.find().populate("roomId");
    if (!bookings) {
      res.status(400);
      throw new Error("Cannot find bookings");
    }

    return res.status(200).json(bookings);
  } catch (error) {
    next(error);
  }
};

// create booking
const createBooking = async (req, res, next) => {
  try {
    const booking = await Booking.create(req.body);
    if (!booking) {
      res.status(400);
      throw new Error("cannot create booking");
    }

    return res.status(201).json(booking);
  } catch (error) {
    next(error);
  }
  // Send email notification to the owner
  const ownerEmail = 'owner_email@example.com'; // Replace with the owner's email address
  const userEmail = booking.email; // Email of the boarding user
  const subject = 'New Boarding Reservation';
  const text = `A new boarding has been reserved. Details:\n\nRoom ID: ${booking.roomId}\nName: ${booking.name}\nEmail: ${booking.email}\nPhone: ${booking.phone}\nCheck-In Date: ${booking.checkInDate}\nBills: ${booking.bills}\nConfirmed: ${booking.confirmed}\nCancelled: ${booking.cancelled}`;

  sendEmail(ownerEmail, subject, text);
  sendEmail(userEmail, subject, text);

  res.status(201).json(booking);
};



// get single booking
const getBooking = async (req, res, next) => {
  try {
    const booking = await Booking.findById(req.params.id).populate("roomId");
    if (!booking) {
      res.status(400);
      throw new Error("booking not found");
    }

    return res.status(200).json(booking);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getBookings,
  createBooking,
  getBooking,
};