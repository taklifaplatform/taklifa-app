import { z } from "zod";
import { CompanyInvitationsService } from "../openapi";
import { createTRPCRouter, protectedProcedure } from "../trpc";

export const companyInvitationsRouter = createTRPCRouter({
  list: protectedProcedure
    .input(z.object({
      company_id: z.string(),
      role: z.string().optional(), // 'manager' | 'driver'
    }))
    .query(
      async (
        { ctx: { supabase }, input: { role = "manager", company_id } },
      ) => {
        return supabase.from("company_invitations")
          .select()
          .eq("company_id", company_id)
          .eq("role", role);
      },
    ),
  get: protectedProcedure
    .input(z.object({
      id: z.string(),
    }))
    .query(async ({ ctx: { supabase }, input: { id } }) => {
      return supabase.from("company_invitations")
        .select()
        .eq("id", id)
        .single();
    }),
  create: protectedProcedure
    .input(z.object({
      company_id: z.string(), // TODO: company_id should be from context
      name: z.string(),
      phone: z.string(),
      role: z.string(), // 'manager' | 'driver'
    }))
    .mutation(async ({ ctx: { supabase, session }, input }) => {
      const result = await supabase.from("company_invitations")
        .insert({
          sender_id: session.user.id,
          company_id: input.company_id,
          name: input.name,
          phone: input.phone,
        }).select().single();

      if (result?.data?.id) {
        CompanyInvitationsService.sentInvitation({
          companyInvitation: result.data.id,
        });
      }

      return result;
    }),
  delete: protectedProcedure
    .input(z.object({
      id: z.string(),
    }))
    .query(async ({ ctx: { supabase }, input: { id } }) => {
      return supabase.from("company_invitations")
        .delete()
        .eq("id", id);
    }),
});
