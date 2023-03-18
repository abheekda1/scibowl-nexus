import { type NextApiRequest, type NextApiResponse } from "next";
import { createTRPCContext } from "~/server/api/trpc";

const userByIdHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  // Create context and caller
  const ctx = await createTRPCContext({ req, res });
  const { id } = req.query;
  const user = await ctx.prisma.question.findUnique({ where: { id: +id! }});
  res.status(200).json(user);
};

export default userByIdHandler;
