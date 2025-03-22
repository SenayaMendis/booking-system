const Booking = require('../models/bookingModel');

const getBookings = async(req, res) => {
    try{
        const bookings = await Booking.find();
        if(!bookings) {
            res.status(400);
            throw new Error("Cannot find bookings");
        }
        return res.status(200).json(bookings);
    } catch (error) {
        next(error);
    }
};

//create booking
const createBooking = async(req, res) => {
    try {
        const booking = await Booking.create(req.body);
        if(!booking) {
            res.status(400);
            throw new Error("cannoth create booking");
        }

        return res.status(201).json( booking );
    } catch (error) {
        next(error);
    }
};

//get single booking
const getBooking = async(req, res) => {
    try {
        const booking = await Booking.findById(req.params.id);
        if(!booking) {
            res.status(400);
            throw new Error("Cannot find booking");
        }
        return res.status(200).json(booking);
    } catch (error) {
        next(error);
    }
};

module.exports = {
    getBookings,
    createBooking,
    getBooking
}