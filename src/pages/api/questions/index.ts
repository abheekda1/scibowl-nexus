import type { NextApiRequest, NextApiResponse } from 'next'
import { createTRPCContext } from '~/server/api/trpc';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { prisma } = await createTRPCContext({ req, res });
  const questions = await prisma.question.findMany()

  res.json(questions)
}
