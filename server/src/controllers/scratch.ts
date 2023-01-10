import path from "path";
import fs from "fs";
import { Request, Response } from "express";
import Scratch, { IScratch } from "./../models/Scratch";

/* READ */
export const getProject = async (req: Request, res: Response) => {
  try {
    const { projectId } = req.params;
    const scratch = await Scratch.findById(projectId);
    res.status(200).json(scratch);
  } catch (error: any) {
    res.status(404).json({ message: error.message });
  }
};

export const getAssets = async (req: Request, res: Response) => {
  try {
    const scratchAssets = path.join(
      __dirname,
      "../../public/assets/scratch/assets",
      req.params.filename
    );
    res.sendFile(scratchAssets);
  } catch (error: any) {
    res.status(404).json({ message: error.message });
  }
};

/* UPDATE */
export const createProject = async (req: Request, res: Response) => {
  try {
    const newScratch: IScratch = new Scratch({
      ...req.params,
      ...req.body,
    });

    const saveScratch = await newScratch.save();
    res.status(201).json(saveScratch);
  } catch (error: any) {
    res.status(404).json({ message: error.message });
  }
};

export const updateProject = async (req: Request, res: Response) => {
  try {
    const { projectId } = req.params;
    const { extensions, meta, monitors, targets } = req.body;
    if (!projectId || !extensions || !meta || !monitors || !targets) {
      res
        .status(404)
        .json("projectId, extensions, meta, monitors, targets 字段为空");
      return;
    }
    const newScratch: IScratch | null = await Scratch.findById(projectId);
    newScratch!.extensions = extensions;
    newScratch!.meta = meta;
    newScratch!.monitors = monitors;
    newScratch!.targets = targets;
    if (!newScratch) {
      res.status(404).json(`project:${projectId}, 未查到数据`);
      return;
    }
    const saveScratch = await newScratch!.save();
    res.status(200).json(saveScratch);
  } catch (error: any) {
    res.status(404).json({ message: error.message });
  }
};

export const updateProjectThumbnail = (req: Request, res: Response) => {
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
  res.status(201).json("ok");
};

export const createAssets = (req: Request, res: Response) => {
  const scratchAssets = path.join(
    __dirname,
    "../../public/assets/scratch/assets",
    req.params.filename
  );
  if (fs.existsSync(scratchAssets)) {
    res.status(404).send("素材已存在：" + scratchAssets);
  } else {
    // 请求头部'Content-Type':'image/png'时，用req.on接收文件
    var _data: any = [];
    req.on("data", function (data) {
      if (data) {
        _data.push(data);
      }
    });
    req.on("end", function () {
      let content = Buffer["concat"](_data);
      fs.writeFile(scratchAssets, content, function (err) {
        if (err) {
          res.status(404).send({ status: "err" });
          console.log(err);
          console.warn("素材保存失败" + scratchAssets);
        } else {
          console.warn("素材保存成功" + scratchAssets);
          res.status(201).send({ status: "ok" });
        }
      });
    });
  }
};
