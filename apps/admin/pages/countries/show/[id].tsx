import { useShow } from '@refinedev/core';
import { Tables } from '@zix/supabase';

export default function CountryShow() {
  // `posts` resource and the `id` will be inferred from the route.
  // Because we've defined `/posts/show/:id` as the `show` action of the `posts` resource.
  const {
    queryResult: { data, isLoading }
  } = useShow<Tables<'countries'>>();

  const country = data?.data;

  return (
    <>
      <div>
        {isLoading && <p>Loading...</p>}
        {!isLoading && (
          <>
            <h1>{country?.name?.en}</h1>
            <p>{JSON.stringify(country?.languages)}</p>
          </>
        )}
      </div>
    </>
  );
}
