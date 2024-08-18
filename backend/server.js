const express = require("express");
const connectDb = require("../backend/config/dbConnection");
const errorHandler = require("../backend/middlewares/errorHandler");
require("dotenv").config();
const cors = require('cors');
const app = express();
const port = 3000;
connectDb();
app.use(cors('*'));
app.use(express.json());
const socketController = require("./controllers/messageController");
socketController.initializesocket();
app.use("/api/contacts", require("./routes/contactRoutes"));
app.use("/api/users", require("./routes/userRoutes"));
app.use(errorHandler);

app.listen(port || process.env.PORT, () => {
  console.log(`Server running on port ${port}`);
});
