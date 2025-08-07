const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();
const app = express();
app.use(
  cors({
    origin: "https://rkm-app-payment-gateway-4wm2g3n26-rushikesh-mishras-projects.vercel.app",
    credentials: true,
  })
);

app.use(express.json());

const paymentRoutes = require("./routes/paymentRoutes");
app.use("/api/payment", paymentRoutes);

const PORT = 5050;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
