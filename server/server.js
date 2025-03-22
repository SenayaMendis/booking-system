const dotenv = require("dotenv").config();
const express = require("express");
const { errorHandler } = require("./middleware/errorHandler");
const app = express();
const connectDB = require("./config/db");
const boardingsRoutes = require("./routes/boardingRoutes");
const bookingsRoutes = require("./routes/bookingRoutes");

const e = require("express");

const port = process.env.PORT || 5000;

// connect to database
connectDB();

// set up middleware
app.use(express.json());

// set up routes
app.use("/api/boardings", boardingsRoutes);
app.use("/api/bookings", bookingsRoutes);

app.use(errorHandler);


app.listen(port, () => console.log(`listening on port ${port}`));
