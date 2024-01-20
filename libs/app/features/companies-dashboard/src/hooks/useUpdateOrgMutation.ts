import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useToastController } from "@zix/app/ui/core";
import { ORGS_TABLE, Tables, useSupabase } from "@zix/core/supabase";

/**
 * @returns
 */
export function useUpdateOrgMutation() {
  const supabase = useSupabase();
  const queryClient = useQueryClient();
  const toast = useToastController();

  return useMutation({
    mutationFn: async (values: Tables<"orgs">) => {
      const { data, error } = await supabase.from(ORGS_TABLE).update(values).eq(
        "id",
        values.id,
      ).select().single();

      if (error) {
        throw error;
      }

      return data;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries(["orgs"]);
      toast.show("Successfully updated!");
    },
  });
}
