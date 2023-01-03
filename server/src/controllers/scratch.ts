import { Request, Response } from "express";
import fs from "fs";
import Scratch, { IScratch } from "./../models/Scratch";

/* READ */
export const getProject = async (req: Request, res: Response) => {
  try {
    const { projectId } = req.params;
    const scratch = await Scratch.findById(projectId)
    res.status(200).json(scratch)
  } catch (error: any) {
    res.status(404).json({ message: error.message })
  }
}

/* UPDATE */
export const createProject = async (req: Request, res: Response) => {
  try {
    console.log(req.params, req.body, 'new');
    const newScratch: IScratch = new Scratch({
      ...req.params,
      ...req.body
    })


    const saveScratch = await newScratch.save()
    res.status(200).json(saveScratch)
  } catch (error: any) {
    res.status(404).json({ message: error.message })
  }
}

export const updateProject = async (req: Request, res: Response) => {
  try {
    const { projectId } = req.params
    const { extensions, meta, monitors, targets } = req.body;
    if (!projectId || !extensions || !meta || !monitors || !targets) {
      res.status(400).json('projectId, extensions, meta, monitors, targets 字段为空')
      return;
    }
    const newScratch: IScratch | null = await Scratch.findById(projectId)
    newScratch!.extensions = extensions;
    newScratch!.meta = meta;
    newScratch!.monitors = monitors;
    newScratch!.targets = targets;
    if (!newScratch) {
      res.status(400).json(`project:${projectId}, 未查到数据`)
      return;
    }
    const saveScratch = await newScratch!.save()
    res.status(200).json(saveScratch)
  } catch (error: any) {
    res.status(404).json({ message: error.message })
  }
}

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
  res.status(200).json('ok')
}