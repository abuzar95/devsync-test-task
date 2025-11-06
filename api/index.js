const express = require("express");
const app = express();
require("dotenv").config();
const mongoose = require("mongoose");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const path = require("path");

// Import Router
const authRouter = require("../server/routes/auth");
const categoryRouter = require("../server/routes/categories");
const productRouter = require("../server/routes/products");
const brainTreeRouter = require("../server/routes/braintree");
const orderRouter = require("../server/routes/orders");
const usersRouter = require("../server/routes/users");
const customizeRouter = require("../server/routes/customize");
// Import Auth middleware for check user login or not~
const { loginCheck } = require("../server/middleware/auth");
const CreateAllFolder = require("../server/config/uploadFolderCreateScript");

/* Create All Uploads Folder if not exists | For Uploading Images */
// Note: In Vercel serverless, file system is ephemeral
// Consider using cloud storage (S3, Cloudinary, etc.) for production
if (process.env.NODE_ENV !== "production" || process.env.VERCEL !== "1") {
  CreateAllFolder();
}

// Database Connection
mongoose
  .connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() =>
    console.log(
      "==============Mongodb Database Connected Successfully=============="
    )
  )
  .catch((err) => console.log("Database Not Connected !!!", err));

// Middleware
app.use(morgan("dev"));
app.use(cookieParser());
app.use(cors());
app.use(express.static(path.join(__dirname, "../public")));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Routes
app.use("/api", authRouter);
app.use("/api/user", usersRouter);
app.use("/api/category", categoryRouter);
app.use("/api/product", productRouter);
app.use("/api", brainTreeRouter);
app.use("/api/order", orderRouter);
app.use("/api/customize", customizeRouter);

// Health check endpoint
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
});

// Export the Express app as a serverless function
module.exports = app;

