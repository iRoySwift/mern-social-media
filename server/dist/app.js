"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.upload = void 0;
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
const multer_1 = __importDefault(require("multer"));
const helmet_1 = __importDefault(require("helmet"));
const morgan_1 = __importDefault(require("morgan"));
const path_1 = __importDefault(require("path"));
// import { fileURLToPath } from "url";
const auth_1 = __importDefault(require("./routes/auth"));
const users_1 = __importDefault(require("./routes/users"));
const posts_1 = __importDefault(require("./routes/posts"));
const scratch_1 = __importDefault(require("./routes/scratch"));
const auth_2 = require("./controllers/auth");
const posts_2 = require("./controllers/posts");
const auth_3 = require("./middleware/auth");
const scratch_2 = require("./controllers/scratch");
/* CONFIGURATIONS */
// package.json 含 "type":"module" 需要下面设置
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);
const app = (0, express_1.default)();
const assetsUrl = path_1.default.join(__dirname, "../public/assets");
const thumbnailUrl = path_1.default.join(__dirname, "../public/thumbnail");
var allowlist = ['http://127.0.0.1:8602', 'http://localhost:8602', 'http://localhost:3000'];
var corsOptionsDelegate = function (req, callback) {
    var corsOptions = { origin: false, credentials: true };
    if (allowlist.includes(req.header('Origin'))) {
        corsOptions = { origin: true, credentials: true }; // reflect (enable) the requested origin in the CORS response
    }
    else {
        corsOptions = { origin: false, credentials: true }; // disable CORS for this request
    }
    callback(null, corsOptions);
};
/* MIDDLEWARE */
app.use(express_1.default.json());
app.use((0, helmet_1.default)());
// app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use((0, morgan_1.default)("common"));
app.use(body_parser_1.default.json({ limit: "30mb" }));
app.use(body_parser_1.default.urlencoded({ limit: "30mb", extended: true }));
app.use((0, cors_1.default)(corsOptionsDelegate));
app.use("/assets", express_1.default.static(assetsUrl));
app.use("/thumbnail", express_1.default.static(thumbnailUrl));
/* FILE STORAGE */
const storage = multer_1.default.diskStorage({
    destination: function (req, file, cb) {
        const projectId = req.params.projectId;
        if (projectId) {
            cb(null, thumbnailUrl);
        }
        else {
            cb(null, assetsUrl);
        }
    },
    filename: function (req, file, cb) {
        const filename = req.params.projectId ? `${req.params.projectId}.png` : file.originalname;
        cb(null, filename);
    },
});
exports.upload = (0, multer_1.default)({ storage });
/* ROUTES WITH FILES */
app.post("/auth/register", exports.upload.single("picture"), auth_2.register);
app.post("/posts", auth_3.verifyToken, exports.upload.single("picture"), posts_2.createPost);
app.post("/scratch/thumbnail/:projectId", exports.upload.single("thumbnail"), scratch_2.updateProjectThumbnail);
/* ROUTES */
app.use("/auth", auth_1.default);
app.use("/users", users_1.default);
app.use("/posts", posts_1.default);
app.use("/scratch", scratch_1.default);
/* -------------------------------------------------------------------------- */
app.get("/no-cors", (req, res) => {
    console.info("GET /no-cors");
    res.json({
        text: "You should not see this via a CORS request."
    });
});
/* -------------------------------------------------------------------------- */
app.head("/simple-cors", (0, cors_1.default)(), (req, res) => {
    console.info("HEAD /simple-cors");
    res.sendStatus(204);
});
app.get("/simple-cors", (0, cors_1.default)(), (req, res) => {
    console.info("GET /simple-cors");
    res.json({
        text: "Simple CORS requests are working. [GET]"
    });
});
app.post("/simple-cors", (0, cors_1.default)(), (req, res) => {
    console.info("POST /simple-cors");
    res.json({
        text: "Simple CORS requests are working. [POST]"
    });
});
/* -------------------------------------------------------------------------- */
app.options("/complex-cors", (0, cors_1.default)());
app.delete("/complex-cors", (0, cors_1.default)(), (req, res) => {
    console.info("DELETE /complex-cors");
    res.json({
        text: "Complex CORS requests are working. [DELETE]"
    });
});
/* -------------------------------------------------------------------------- */
exports.default = app;
//# sourceMappingURL=app.js.map