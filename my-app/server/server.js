const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();
const app = express();
const allowedOrigins = [
  "https://rkm-app-payment-gateway.vercel.app",
  "https://rkm-app-payment-gateway-4wm2g3n26-rushikesh-mishras-projects.vercel.app",
  "http://localhost:5173", 
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("CORS not allowed from this origin"));
      }
    },
    credentials: true,
  })
);

app.use(express.json());

const paymentRoutes = require("./routes/paymentRoutes");
app.use("/api/payment", paymentRoutes);

const PORT = 5050;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
