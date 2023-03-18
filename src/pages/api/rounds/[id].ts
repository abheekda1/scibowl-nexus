import { type NextApiRequest, type NextApiResponse } from "next";
import { createTRPCContext } from "~/server/api/trpc";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Create context and caller
  const ctx = await createTRPCContext({ req, res });
  const { id } = req.query;
  const round = await ctx.prisma.round.findUnique({
    where: { id: +id! },
  });
  res.status(200).json(round);
}
