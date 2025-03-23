const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const { errorHandler } = require("./middleware/errorHandler");
const connectDB = require("./config/db");
const bookingRoutes = require("./routes/bookingRoutes");
const reservationRoutes = require("./routes/reservationRoutes");
const boardingRoutes = require("./routes/boardingRoutes");

const app = express();
const port = process.env.PORT || 5000;

// connect to database
connectDB();

// setup middlewares
app.use(express.json());

// setup routes
app.use("/api/bookings", bookingRoutes);
app.use("/api/reservations", reservationRoutes);
app.use("/api/boardings", boardingRoutes);

app.use(errorHandler);

app.listen(port, () => console.log(`listening on on port ${port}`));