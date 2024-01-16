import fs from "fs";

function copyRename(fileUrl: string, newFileUrl: string) {
  if (fs.existsSync(fileUrl)) {
    if (!fs.existsSync(newFileUrl)) {
      fs.copyFileSync(fileUrl, newFileUrl);
    } else {
      console.error(
        Date.toString() +
          "FolderAndFileOperation_copyFile: des file already existed." +
          newFileUrl.toString()
      );
    }
  } else {
    console.error(
      Date.toString() +
        "FolderAndFileOperation_copyFile: org file not existed." +
        fileUrl.toString()
    );
  }
}

export { copyRename };
