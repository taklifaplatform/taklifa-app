import { createTRPCRouter, protectedProcedure } from "../trpc";
import { z } from "zod";

export const manageCompanyMembersRouter = createTRPCRouter({
  list: protectedProcedure
    .input(z.object({
      type: z.string(), // 'manager' | 'driver'
    }))
    .query(async ({ ctx: { supabase } }) => {
      const countries = await supabase
        .from("countries")
        .select().limit(10);
      return countries;
    }),
  get: protectedProcedure
    .input(z.object({
      member_id: z.number(),
    }))
    .query(async ({ input }) => {
      return input;
    }),
  update: protectedProcedure
    .input(z.object({
      member_id: z.number(),
    }))
    .query(async ({ input }) => {
      return input;
    }),
  delete: protectedProcedure
    .input(z.object({
      member_id: z.number(),
    }))
    .query(async ({ input }) => {
      return input;
    }),

  invite: protectedProcedure
    .input(z.object({
      name: z.string(),
      phone: z.string(),
      type: z.string(), // 'manager' | 'driver'
    }))
    .query(async ({ input }) => {
      return input;
    }),
});
