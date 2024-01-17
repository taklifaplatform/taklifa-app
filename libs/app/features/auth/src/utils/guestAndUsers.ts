import { Database } from "@zix/core/supabase";
import { createPagesServerClient } from "@supabase/auth-helpers-nextjs";
import { GetServerSideProps, PreviewData } from "next";
import { ParsedUrlQuery } from "querystring";

/**
 * user protected getServerSideProps - pass your own function as the only arg
 */
export function guestAndUsersGetSSP<
  Props extends { [key: string]: any } = { [key: string]: any },
  Params extends ParsedUrlQuery = ParsedUrlQuery,
  Preview extends PreviewData = PreviewData,
>(
  getServerSideProps?: GetServerSideProps<Props, Params, Preview>,
): GetServerSideProps<Props, Params, Preview> {
  return async (ctx) => {
    const supabase = createPagesServerClient<Database>(ctx);

    const {
      data: { session },
    } = await supabase.auth.getSession();

    if (session) {
      const getSSRResult = getServerSideProps
        ? await getServerSideProps(ctx)
        : { props: {} as Props };
      if ("props" in getSSRResult) {
        // add the initialSession to page's getServerSideProps
        (getSSRResult.props as any).initialSession = session;
      }
    }

    if (getServerSideProps) {
      return getServerSideProps(ctx);
    }

    return {
      props: {} as Props,
    };
  };
}
