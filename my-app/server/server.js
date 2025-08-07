const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();
const app = express();
app.use(cors({ origin: process.env.CLIENT_URL }));
app.use(express.json());

const paymentRoutes = require("./routes/paymentRoutes");
app.use("/api/payment", paymentRoutes);

const PORT = 5050;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
