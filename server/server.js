// import express from "express";
// import cors from "cors";
// import "dotenv/config";
// // import connectDB from "./config/mongodb.js";
// import connectDB from "./config/mongodb.js";
// import userRouter from "./routes/userRoutes.js";
// import imageRouter from "./routes/imageRoutes.js";

// const PORT = process.env.PORT || 4000;
// const app = express();

// app.use(express.json());
// app.use(
//   cors({
//     origin: ["http://localhost:5173", "http://localhost:5174", "http://localhost:5175", "https://imagify-1c64.vercel.app"],
//     credentials: true,
//   })
// );
// await connectDB();

// app.use("/api/user", userRouter);
// app.use("/api/image", imageRouter);
// app.get("/", (req, res) => res.send("API is Working!"));

// app.listen(PORT, () => console.log("Server running on port " + PORT));

// // import express from 'express'
// // import cors from 'cors'
// // import 'dotenv/config'
// // import connectDB from './config/mongodb.js'
// // import userRouter from './routes/userRoutes.js'
// // import imageRouter from './routes/imageRoutes.js'

// // const PORT = process.env.PORT || 4000
// // const app = express()

// // // ✅ CORRECT CORS SETUP
// // app.use(cors({
// //   origin: ["http://localhost:5173", "https://imagify-ai-seven.vercel.app"],
// //   credentials: true
// // }))

// // app.use(express.json())

// // await connectDB()

// // app.use('/api/user', userRouter)
// // app.use('/api/image', imageRouter)

// // app.get('/', (req, res) => res.send("API is Working!"))

// // // ✅ LISTEN ON CORRECT PORT
// // app.listen(PORT, () => console.log(`Server running on port ${PORT}`))


import express from "express";
import cors from "cors";
import "dotenv/config";
import connectDB from "./config/mongodb.js";
import userRouter from "./routes/userRoutes.js";
import imageRouter from "./routes/imageRoutes.js";

const PORT = process.env.PORT || 4000;
const app = express();

app.use(express.json());
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "http://localhost:5174",
      "http://localhost:5175",
      "https://imagify-1c64.vercel.app",
    ],
    credentials: true,
  })
);

await connectDB();

app.use("/api/user", userRouter);
app.use("/api/image", imageRouter);

app.get("/", (req, res) => res.send("API is Working!"));

app.listen(PORT, () => console.log("Server running on port " + PORT));
