import express from "express";
import userRoutes from "./routes/users.routes.js";

const app = express();

app.use(express.json());

// Routes
app.use(userRoutes);

// Server
app.listen(3000, () => {
  console.log("Server running on port 3000");
});
