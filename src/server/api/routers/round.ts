import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";

export const roundRouter = createTRPCRouter({
  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.round.findMany();
  }),

  getMine: protectedProcedure.query(({ ctx }) => {
    return ctx.prisma.user
      .findUnique({ where: { id: ctx.session.user.id } })
      .rounds();
  }),

  upload: protectedProcedure.query(({ ctx }) => {
    // https://github.com/trpc/trpc/discussions/658
  }),
});
