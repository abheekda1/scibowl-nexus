import { type NextApiRequest, type NextApiResponse } from "next";
import { createTRPCContext } from "~/server/api/trpc";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Create context and caller
  const ctx = await createTRPCContext({ req, res });
  const { id } = req.query;
  const question = await ctx.prisma.question.findUnique({
    where: { id: +id! },
  });
  res.status(200).json(question);
}
