const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({
    roomId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Room",
        required: true,
    },
    name: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Room",
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
    checkInDate: {
        type: Date,
        required: true,
    },
    bills: {
        type: Boolean,
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

module.exports = mongoose.model("Booking", bookingSchema);

