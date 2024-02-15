import { COMPANY_MEMBERSHIPS_TABLE, Tables } from "@zix/core/supabase";
import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "../../trpc";

export const manageCompanyRouter = createTRPCRouter({
  list: protectedProcedure
    // .input(z.object({
    //   //type: z.string(), // 'manager' | 'driver'
    // }))
    .query(async ({ ctx: { supabase, session } }) => {
      return supabase
        .from(COMPANY_MEMBERSHIPS_TABLE)
        .select<
          string,
          {
            role: string;
            company: Tables<"companies">;
          }
        >(`role, company:company_id(*)`)
        .eq("user_id", session.user.id);
    }),
  get: protectedProcedure
    .input(z.object({
      id: z.string(),
    }))
    .query(async ({ ctx: { supabase, session }, input }) => {
      return supabase
        .from(COMPANY_MEMBERSHIPS_TABLE)
        .select<
          string,
          {
            role: string;
            company: Tables<"companies">;
          }
        >(`role, company:company_id(*)`)
        .eq("user_id", session.user.id)
        .eq("company_id", input.id)
        .single();
    }),
  create: protectedProcedure
    .input(z.object({
      id: z.string(),
      name: z.string().min(2),
      company_documents: z.array(z.object({
        id: z.string(),
      })),
    }))
    .mutation(async ({ ctx: { supabase, session }, input }) => {
      const result = await supabase.from("companies").insert({
        id: input.id,
        name: input.name,
        owner_id: session?.user.id,
      }).select().single();

      // create admin membership
      if (result?.data?.id) {
        await supabase.from("company_members").insert({
          company_id: result.data.id,
          user_id: session.user.id,
          role: "admin",
        });
      }

      if (result?.data?.id) {
        await supabase.from("company_documents")
          .insert(
            input.company_documents.map((doc) => ({
              company_id: result.data.id,
              object_id: doc.id,
            })),
          );
      }

      return result;
    }),
  update: protectedProcedure
    .input(z.object({
      member_id: z.number(),
    }))
    .mutation(async ({ input }) => {
      return input;
    }),
  delete: protectedProcedure
    .input(z.object({
      member_id: z.number(),
    }))
    .query(async ({ input }) => {
      return input;
    }),
});
