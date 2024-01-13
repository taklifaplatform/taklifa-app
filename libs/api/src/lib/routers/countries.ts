import { createTRPCRouter, publicProcedure } from "../trpc";

export const countriesRouter = createTRPCRouter({
  get: publicProcedure.query(async ({ ctx: { supabase } }) => {
    const countries = await supabase
      .from("countries")
      .select().limit(10);
    return countries;
  }),
});
