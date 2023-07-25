import { PrismaClient } from "@prisma/client";
import { NextApiHandler, NextApiRequest } from "next";
import formidable from 'formidable';
import path from 'path';
import fs from 'fs/promises';

export const config = {
  api: {
    bodyParser: false,
  },
};

const readFile = async (req: NextApiRequest, saveLocally?: boolean) => {
  const prisma = new PrismaClient();
  const { query } = req;

  const options: formidable.Options = {};
  if(saveLocally) {
    options.uploadDir = path.join(process.cwd(), "/public/users");
    let xfile = query.id + ".jpeg";
    let urlimg = "/users/"+xfile;
    try {
      await prisma.user.update({
        where: {
            id: query.id?.toString()
        },
        data: {
            profilepic: urlimg
        }
      });
    } catch(e) {}

    options.filename = (name, ext: any, path, form: any) => {
      return path.originalFilename?.replace(path.originalFilename,xfile) || '';
    }
    // Date.now().toString() + "_" + 
  }

  const form = formidable(options);
  return new Promise((resolve, reject) => {
    form.parse(req, (err, fields, files) => {
      if(err) reject(err)
      resolve({fields, files})
    })
  })
}

const handler: NextApiHandler = async (req, res) => {
  try {
    await fs.readdir(path.join(process.cwd() + "/public", "/users/"));
    console.log("write 1");
  } catch(error: any) {  //if there is no directory, it will create new directory
    console.log("May error : " + error.message);
    await fs.readdir(path.join(process.cwd() + "/public", "/users"));
  }
  await readFile(req, true);  // it will read and store file
  res.status(200).json({statuscode: 200, message: "Your Profile picture has been change."});
};

export default handler;