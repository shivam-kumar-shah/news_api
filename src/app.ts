import express from "express";
import { config } from "dotenv";

import newsRoute from "./apis/news";

config();
const app = express();

app.use(express.json());
app.use("/news", newsRoute);

app.use((req, res, next) => {
  res.status(404).json({
    message: "Page not found.",
  });
});

app.listen(3000, () => {
  console.log("Server listening on - http://localhost:3000");
});
