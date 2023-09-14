const express = require("express");
const app = express();
const cors = require("cors");
const moviesRoutes = require("./routes/moviesRoutes");
const authMiddleware = require("./middleware/auth");

app.use(cors());
app.use(express.json());
app.use(authMiddleware.authentication);
app.use("/api/movies", moviesRoutes);
app.use(authMiddleware.wrongEndpointHandle);

app.listen(5000);
