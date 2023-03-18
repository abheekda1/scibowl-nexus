import axios from "axios";
import FormData from "form-data";
import multiparty from "multiparty";
import { NextApiRequest, NextApiResponse } from "next";
import fs from "node:fs";
import { env } from "~/env.mjs";
import { createTRPCContext } from "~/server/api/trpc";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method != "POST") return res.status(405);

  const { prisma, session } = await createTRPCContext({ req, res });
  const parserPath = env.PARSER_PATH;

  const form = new multiparty.Form();
  const fData = new FormData();
  // https://stackoverflow.com/questions/62411430/post-multipart-form-data-to-serverless-next-js-api-running-on-vercel-now-sh
  const body: any = await new Promise((resolve, reject) => {
    form.parse(req, (err, fields, files) => {
      if (err) reject({ err });
      resolve({ fields, files });
    });
  });

  // @ts-ignore
  fData.append("file", fs.createReadStream(body.files.file[0].path), "file");

  const axiosRes = await axios.post(parserPath, fData, {
    headers: { "Accept-Encoding": "gzip,deflate,compress" },
  });
  const round = axiosRes.data;

  const questionCreateDatas = [];

  for (let i = 0; i < round.length; i++) {
    const questionCreateData = {
      question: {
          create: {
            category: round[i].category,
            tossUpFormat: round[i].tossupFormat,
            tossUpQuestion: round[i].tossupQuestion,
            tossUpAnswer: round[i].tossupAnswer,
            bonusFormat: round[i].tossupFormat,
            bonusQuestion: round[i].bonusQuestion,
            bonusAnswer: round[i].bonusAnswer,
            source: body.fields.source[0] || "",
            userId: session?.user.id!,
          },
      },
    };

    questionCreateDatas.push(questionCreateData);
    //await prisma.question.create({ data: questionCreateData });
  }

  await prisma.round.create({
    data: {
        userId: session?.user.id!,
        source: body.fields.source[0] || "",
        questions: {
            create: questionCreateDatas,
        },
    },
  });

  res.redirect(307, "/");
}

export const config = {
  api: {
    bodyParser: false,
  },
};
