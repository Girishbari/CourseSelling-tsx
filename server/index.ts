import express, { Request, Response } from "express"
import mongoose, { ConnectOptions } from "mongoose";
import cors from "cors"
import adminRouter from "./routes/admin"
import userRouter from "./routes/user"
import 'dotenv/config'


const app = express();

app.use(cors());
app.use(express.json());

app.use("/admin", adminRouter)
app.use("/user", userRouter)
app.get("/", (req: Request, res, Response) => {
  res.status(200).json({
    message: 'working'
  })
})

if (process.env.DB) {
  mongoose.connect(process.env.DB, { useNewUrlParser: true, useUnifiedTopology: true, dbName: "courses" } as ConnectOptions);
} else {
  console.log("can not to Database");

}

app.listen(3001, () => console.log('Server running on port 3000'));
