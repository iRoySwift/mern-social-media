"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateProjectThumbnail = exports.updateProject = exports.createProject = exports.getProject = void 0;
const Scratch_1 = __importDefault(require("./../models/Scratch"));
/* READ */
const getProject = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { projectId } = req.params;
        const scratch = yield Scratch_1.default.findById(projectId);
        res.status(200).json(scratch);
    }
    catch (error) {
        res.status(404).json({ message: error.message });
    }
});
exports.getProject = getProject;
/* UPDATE */
const createProject = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log(req.params, req.body, 'new');
        const newScratch = new Scratch_1.default(Object.assign(Object.assign({}, req.params), req.body));
        const saveScratch = yield newScratch.save();
        res.status(200).json(saveScratch);
    }
    catch (error) {
        res.status(404).json({ message: error.message });
    }
});
exports.createProject = createProject;
const updateProject = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { projectId } = req.params;
        const { extensions, meta, monitors, targets } = req.body;
        if (!projectId || !extensions || !meta || !monitors || !targets) {
            res.status(400).json('projectId, extensions, meta, monitors, targets 字段为空');
            return;
        }
        const newScratch = yield Scratch_1.default.findById(projectId);
        newScratch.extensions = extensions;
        newScratch.meta = meta;
        newScratch.monitors = monitors;
        newScratch.targets = targets;
        if (!newScratch) {
            res.status(400).json(`project:${projectId}, 未查到数据`);
            return;
        }
        const saveScratch = yield newScratch.save();
        res.status(200).json(saveScratch);
    }
    catch (error) {
        res.status(404).json({ message: error.message });
    }
});
exports.updateProject = updateProject;
const updateProjectThumbnail = (req, res) => {
    // console.log(req.params, req.body);
    // 请求的头部为 'Content-Type': 'image/png'时，用req.on接收文件
    // var datas: any = [];
    // req.on('data', function (data) { if (data) { datas['push'](data); } });
    // console.log(datas);
    // req.on('end', function () {
    //   console.log('--0');
    //   //var strFileName = './data/scratch_slt/' + req.params.projectid;
    //   var strFileName = `/public/thumbnail/${req.params.projectid}`;
    //   let content = Buffer['concat'](datas);
    //   fs.writeFile(strFileName, content, function (err) {
    //     if (err) {
    //       res.status(404).send({ 'status': 'err' });
    //       console.log(err);
    //       console.warn('保存缩略图失败：' + strFileName);
    //     } else {
    //       //console.log('保存缩略图成功：'+strFileName);
    //       res.status(200).send({ 'status': 'ok' });
    //     }
    //   });
    // });
    res.status(200).json('ok');
};
exports.updateProjectThumbnail = updateProjectThumbnail;
//# sourceMappingURL=scratch.js.map