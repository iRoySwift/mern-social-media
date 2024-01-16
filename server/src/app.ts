import express, { Application } from "express";
import bodyParser from "body-parser";
import cors from "cors";
import multer from "multer";
import helmet from "helmet";
import morgan from "morgan";
import path from "path";
import authRoutes from "./routes/auth";
import userRoutes from "./routes/users";
import scratchRoutes from "./routes/scratch";
import { verifyToken } from "./middleware/auth";
import { updateProjectThumbnail, updateProject, getAssets } from "./controllers/scratch";

/* CONFIGURATIONS */
// package.json 含 "type":"module" 需要下面设置
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);
const app: Application = express();

/**
 * * 绝对路径
 */
export const assetsPath = path.join(__dirname, "../public/assets");
export const thumbnailPath = path.join(__dirname, "../public/scratch/thumbnail");
export const sb3ProjectPath = path.join(__dirname, "../public/scratch/project");
export const sb3ProjectTemplatePath = path.join(__dirname, "../public/scratch/template/project.sb3");
export const scratchAssetsPath = path.join(__dirname, "../public/scratch/assets");

/**
 * *请求白名单
 */
var allowlist = ["http://127.0.0.1:8602", "http://localhost:8602", "http://localhost:8603", "http://localhost:3000", "*"];
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
// app.use(cors(corsOptionsDelegate));
app.use("/assets", express.static(assetsPath));
app.get("/internalapi/asset/:filename", getAssets);

app.use("/scratch/thumbnail", express.static(thumbnailPath));

/**
 * *FILE STORAGE
 */
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    switch (file.fieldname) {
      case "thumbnail":
        cb(null, thumbnailPath);
        break;
      case "sb3":
        cb(null, sb3ProjectPath);
        break;
      default:
        cb(null, assetsPath);
        break;
    }
  },
  filename: function (req, file, cb) {
    let filename = file.originalname;
    if (file.fieldname === "thumbnail") {
      filename = `${req.params.projectId}.png`;
    }
    if (file.fieldname === "sb3") {
      filename = `${req.params.projectId}.sb3`;
    }
    cb(null, filename);
  }
});
export const upload = multer({ storage });

/**
 * *ROUTES WITH FILES
 */
// app.post("/auth/register", upload.single("picture"), register);
app.patch("/app-api/douding/thumbnail/:projectId", verifyToken, upload.single("thumbnail"), updateProjectThumbnail);
// app.post("/app-api/douding/update/sb3/:projectId", verifyToken, upload.single("sb3"), updateSb3Project);
app.patch("/app-api/douding/data/:projectId", verifyToken, upload.single("sb3"), updateProject);

/**
 * * ROUTES
 */
app.use("/app-api/douding/auth", authRoutes);
app.use("/app-api/douding/user", userRoutes);
app.use("/app-api/douding", scratchRoutes);

/* -------------------------------------------------------------------------- */

app.get("/no-cors", (req, res) => {
  console.info("GET /no-cors");
  res.json({
    text: "You should not see this via a CORS request."
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
    text: "Simple CORS requests are working. [GET]"
  });
});
app.post("/simple-cors", cors(), (req, res) => {
  console.info("POST /simple-cors");
  res.json({
    text: "Simple CORS requests are working. [POST]"
  });
});

/* -------------------------------------------------------------------------- */

app.options("/complex-cors", cors());
app.delete("/complex-cors", cors(), (req, res) => {
  console.info("DELETE /complex-cors");
  res.json({
    text: "Complex CORS requests are working. [DELETE]"
  });
});

/* -------------------------------------------------------------------------- */

export default app;
