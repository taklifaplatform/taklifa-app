import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "../trpc";

export const companyManageMembersRouter = createTRPCRouter({
  list: protectedProcedure
    .input(z.object({
      company_id: z.string(), // TODO: should be from context
      role: z.string().optional(), // 'manager' | 'driver'
    }))
    .query(
      async (
        { ctx: { supabase }, input: { company_id, role = "manager" } },
      ) => {
        return supabase.from("company_members")
          .select(`
          *,
          user:user_id(*)
        `)
          .eq("company_id", company_id)
          .eq("role", role);
      },
    ),
  get: protectedProcedure
    .input(z.object({
      company_id: z.string(), // TODO: should be from context
      member_id: z.string(),
    }))
    .query(async ({ ctx: { supabase }, input: { company_id, member_id } }) => {
      return supabase.from("company_members")
        .select(`
          *,
          user:user_id(*)
        `)
        .eq("company_id", company_id)
        .eq("user_id", member_id)
        .single();
    }),
  update: protectedProcedure
    .input(z.object({
      company_id: z.string(), // TODO: should be from context
      member_id: z.string(),
      role: z.string(), // 'manager' | 'driver'
    }))
    .mutation(
      async ({ ctx: { supabase }, input: { company_id, member_id, role } }) => {
        return supabase.from("company_members")
          .update({
            role,
          })
          .eq("company_id", company_id)
          .eq("user_id", member_id);
      },
    ),
  delete: protectedProcedure
    .input(z.object({
      company_id: z.string(), // TODO: should be from context
      member_id: z.string(),
    }))
    .mutation(
      async ({ ctx: { supabase }, input: { company_id, member_id } }) => {
        const result = await supabase.from("company_members")
          .delete()
          .eq("company_id", company_id)
          .eq("user_id", member_id);

        return result;
      },
    ),
});
