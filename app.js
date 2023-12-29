import express from "express";
import { join } from "path";
import compression from "compression";
import home from "./routes/home";
import api from "./routes/api";
import connectToDb from "./db";
import cors from "cors"

const app = express();
const port = process.env.PORT

app.use(compression());
//app.use("/assets", express.static(join(__dirname, "public")));
app.use(express.static(join(__dirname, "public", "client")));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors({credentials: true}))
app.set("trust proxy", 1);


app.use("/api", api);
app.use("/", home);


Promise.all([connectToDb()])
  .then(() =>
    app.listen(port, () => console.log(`Server is running on PORT ${port}`))
  )
  .catch((error) => {
    console.error(`MongoDB Atlas Error: ${error}`);
    process.exit();
  });