import { supabaseAdmin } from "@zix/core/supabase";
import { createTRPCRouter, protectedProcedure } from "../../trpc";
import { z } from "zod";

import { sendSMS } from "../../server/send-sms";

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

  // https://github.com/silentworks/waiting-list
  invite: protectedProcedure
    .input(z.object({
      company_id: z.string(),
      name: z.string(),
      phone: z.string(),
      role: z.string(), // 'manager' | 'driver'
      message: z.string(),
    }))
    .mutation(async ({ ctx: { supabase }, input }) => {
      console.log("======");
      console.log("invite::", input);
      console.log("======");

      sendSMS({
        to: input.phone,
        text: input.message,
      });

      // invite user
      const result = await supabaseAdmin.auth.admin.generateLink({
        email: "badi.ifaoui+1@zixdev.com",
        type: "invite",
        options: {
          data: {
            company_id: input.company_id,
            role: input.role,
          },
        },
      });
      console.log("======");
      console.log("result::", result);
      console.log("======");
      return input;
    }),
});
