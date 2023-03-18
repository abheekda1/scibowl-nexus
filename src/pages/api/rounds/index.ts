import type { NextApiRequest, NextApiResponse } from 'next'
import { createTRPCContext } from '~/server/api/trpc';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { prisma } = await createTRPCContext({ req, res });
  const rounds = await prisma.round.findMany({ include: { questions: true } });

  res.json(rounds);
}
