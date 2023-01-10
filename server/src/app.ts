import express, { Application } from "express";
import bodyParser from "body-parser";
import cors from "cors";
import multer from "multer";
import helmet from "helmet";
import morgan from "morgan";
import path from "path";
// import { fileURLToPath } from "url";
import authRoutes from "./routes/auth";
import userRoutes from "./routes/users";
import postRoutes from "./routes/posts";
import scratchRoutes from "./routes/scratch";
import { register } from "./controllers/auth";
import { createPost } from "./controllers/posts";
import { verifyToken } from "./middleware/auth";
import { updateProjectThumbnail } from "./controllers/scratch";

/* CONFIGURATIONS */
// package.json 含 "type":"module" 需要下面设置
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);
const app: Application = express();
const assetsUrl = path.join(__dirname, "../public/assets");
const thumbnailUrl = path.join(__dirname, "../public/assets/scratch/thumbnail");
const scratchAssets = path.join(__dirname, "../public/assets/scratch/assets");
var allowlist = [
  "http://127.0.0.1:8602",
  "http://localhost:8602",
  "http://localhost:3000",
];
var corsOptionsDelegate = function (req: any, callback: any) {
  var corsOptions = { origin: false, credentials: true };
  if (allowlist.includes(req.header("Origin"))) {
    corsOptions = { origin: true, credentials: true }; // reflect (enable) the requested origin in the CORS response
  } else {
    corsOptions = { origin: false, credentials: true }; // disable CORS for this request
  }
  callback(null, corsOptions);
};

/* MIDDLEWARE */
app.use(express.json());
app.use(helmet());
// app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(bodyParser.json({ limit: "30mb" }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors(corsOptionsDelegate));
app.use("/assets", express.static(assetsUrl));
app.use("/scratch/thumbnail", express.static(thumbnailUrl));

/* FILE STORAGE */
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const projectId = req.params.projectId;
    if (projectId) {
      cb(null, thumbnailUrl);
    } else {
      cb(null, assetsUrl);
    }
  },
  filename: function (req, file, cb) {
    const filename = req.params.projectId
      ? `${req.params.projectId}.png`
      : file.originalname;
    cb(null, filename);
  },
});
export const upload = multer({ storage });

/* ROUTES WITH FILES */
app.post("/auth/register", upload.single("picture"), register);
app.post("/posts", verifyToken, upload.single("picture"), createPost);
app.post(
  "/scratch/thumbnail/:projectId",
  upload.single("thumbnail"),
  updateProjectThumbnail
);

/* ROUTES */
app.use("/auth", authRoutes);
app.use("/users", userRoutes);
app.use("/posts", postRoutes);
app.use("/scratch", scratchRoutes);

/* -------------------------------------------------------------------------- */

app.get("/no-cors", (req, res) => {
  console.info("GET /no-cors");
  res.json({
    text: "You should not see this via a CORS request.",
  });
});

/* -------------------------------------------------------------------------- */

app.head("/simple-cors", cors(), (req, res) => {
  console.info("HEAD /simple-cors");
  res.sendStatus(204);
});
app.get("/simple-cors", cors(), (req, res) => {
  console.info("GET /simple-cors");
  res.json({
    text: "Simple CORS requests are working. [GET]",
  });
});
app.post("/simple-cors", cors(), (req, res) => {
  console.info("POST /simple-cors");
  res.json({
    text: "Simple CORS requests are working. [POST]",
  });
});

/* -------------------------------------------------------------------------- */

app.options("/complex-cors", cors());
app.delete("/complex-cors", cors(), (req, res) => {
  console.info("DELETE /complex-cors");
  res.json({
    text: "Complex CORS requests are working. [DELETE]",
  });
});

/* -------------------------------------------------------------------------- */

export default app;
