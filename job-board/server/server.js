require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const authRoutes = require("./router/authRoutes");
const jobRoutes = require('./router/jobRoutes');
const contactRoutes = require("./router/contactRoutes");
const connectDb = require("./utils/db");
const errorMiddleware = require("./middlewares/error-middleware");


const corsOptions = {
  origin: "http://localhost:5173",
  methods: "GET, POST, PUT, DELETE, PATCH, HEAD",
  credentials: true
}

app.use(cors(corsOptions));

// to get the json data in express app.
app.use(express.json());

// Mount the Router: To use the router in your main Express app, you can "mount" it at a specific URL prefix
app.use("/api/auth", authRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/jobs', jobRoutes);

app.use(errorMiddleware);

const PORT = 5000;
connectDb().then(() => {
  app.listen(PORT, () => {
    console.log(`server is running at port: ${PORT}`);
  });
});