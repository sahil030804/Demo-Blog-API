import express from "express";
import mongoose from "mongoose";
import router from "./indexRoutes.js";

const PORT = process.env.PORT;
const DATABASE_URL = process.env.DATABASE_URL;

mongoose.connect(DATABASE_URL).then(() => console.log("Database Connected"));

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/", router);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
