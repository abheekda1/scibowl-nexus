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
    .input(
      z.object({
        category: z.string(),
        tossUpFormat: z.string(),
        tossUpQuestion: z.string(),
        tossUpAnswer: z.string(),
        bonusFormat: z.string(),
        bonusQuestion: z.string(),
        bonusAnswer: z.string(),
        source: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const prismaUser = await ctx.prisma.user.findUnique({
        where: { id: ctx.session.user.id },
      });

      if (!prismaUser) return { error: "Unauthorized" };

      return ctx.prisma.question.create({
        data: {
          category: input.category,
          tossUpFormat: input.tossUpFormat,
          tossUpQuestion: input.tossUpQuestion,
          tossUpAnswer: input.tossUpAnswer,
          bonusFormat: input.bonusFormat,
          bonusQuestion: input.bonusQuestion,
          bonusAnswer: input.bonusAnswer,
          source: input.source,
          userId: prismaUser.id,
        },
      });
    }),
});
