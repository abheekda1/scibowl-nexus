import { contextProps } from "@trpc/react-query/shared";
import { z } from "zod";

import {
    createTRPCRouter,
    publicProcedure,
    protectedProcedure,
} from "~/server/api/trpc";

export const questionRouter = createTRPCRouter({
    getAll: publicProcedure.query(({ ctx }) => {
        return ctx.prisma.question.findMany();
    }),

    create: protectedProcedure
    .input(z.object({ tossUp: z.string() }))
    .mutation(async ({ ctx, input }) => {
        const prismaUser = await ctx.prisma.user.findUnique({
            where: { email: ctx.session.user.email! },
        })
        
        if (!prismaUser) return { error: 'Unauthorized' };

        const ret = await ctx.prisma.question.create({
            data: {
                tossUp: input.tossUp,
                userId: prismaUser.id,
            }
        });

        return ret;
    }),
});