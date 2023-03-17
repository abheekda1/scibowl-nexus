import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";

export const questionRouter = createTRPCRouter({
  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.question.findMany();
  }),

  getMine: protectedProcedure.query(({ ctx }) => {
    return ctx.prisma.user
      .findUnique({ where: { id: ctx.session.user.id } })
      .questions();
  }),

  create: protectedProcedure
    .input(z.object({ tossUp: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const prismaUser = await ctx.prisma.user.findUnique({
        where: { id: ctx.session.user.id },
      });

      if (!prismaUser) return { error: "Unauthorized" };

      return ctx.prisma.question.create({
        data: {
          tossUp: input.tossUp,
          userId: prismaUser.id,
        },
      });
    }),
});
