import express from "express";
import dotenv from "dotenv";

dotenv.config();
const port = process.env.PORT || 5000;
const app = express();
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", process.env.CLIENT_URL);
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,PUT,PATCH,DELETE");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-Requested-With,Cotent-Type,Authorization"
  );
  next();
});

app.use(express.json({ limit: "10mb" }));
app.use("/", (req, res) => {
  res.json({ message: "wlcm to our API" });
});
app.use((req, res) => {
  res.status(404).json({ success: false, message: "NOT Found" });
});

const startServer = async () => {
  try {
    app.listen(port, () => {
      console.log(`server is listening on port ${port}`);
    });
  } catch (er) {
    console.log(er);
  }
};

startServer();
