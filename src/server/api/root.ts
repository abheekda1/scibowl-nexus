import { createTRPCRouter } from "~/server/api/trpc";
import { exampleRouter } from "~/server/api/routers/example";
import { questionRouter } from "~/server/api/routers/question";
import { userRouter } from "./routers/user";
import { roundRouter } from "./routers/round";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  example: exampleRouter,
  questions: questionRouter,
  users: userRouter,
  rounds: roundRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
