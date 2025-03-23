// filepath: c:\Users\Senaya\Desktop\Booking System\server\models\reservationModel.js


const mongoose = require('mongoose');

const reservationSchema = new mongoose.Schema({
  roomId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Room',
    required: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  email:{
    type: String,
    required: true,
  },

  reserveDate: {
        type: Date,
        required: true,
 },
    reserveTime: {
        type: String,
        required: true,
    },
    confirmed: {
        type: Boolean,
        default: false,
    },
    cancelled: {
        type: Boolean,
        default: false,
    },
}, {
    timestamps: true,
  // Add other fields as needed
});

const Reservation = mongoose.model('Reservation', reservationSchema);

module.exports = Reservation;

/*const mongoose = require("mongoose");
const { addEvent } = require("../utils/googleCalendar");

const reservationSchema = new mongoose.Schema({
    roomId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Room",
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: true,
    },
    reserveDate: {
        type: Date,
        required: true,
    },
    reserveTime: {
        type: String,
        required: true,
    },
    confirmed: {
        type: Boolean,
        default: false,
    },
    cancelled: {
        type: Boolean,
        default: false,
    },
}, {
    timestamps: true,
});

reservationSchema.post('save', function (doc) {
    const event = {
        summary: `Reservation for ${doc.name}`,
        start: {
            dateTime: new Date(`${doc.reserveDate}T${doc.reserveTime}:00`).toISOString(),
            timeZone: 'UTC',
        },
        end: {
            dateTime: new Date(`${doc.reserveDate}T${doc.reserveTime}:00`).toISOString(),
            timeZone: 'UTC',
        },
    };

    addEvent(event);
});

module.exports = mongoose.model("Reservation", reservationSchema);*/