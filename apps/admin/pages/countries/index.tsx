import { useTable } from '@refinedev/core';
import { Tables } from '@zix/app/api';
import Link from 'next/link';

export default function CountryList() {
  // `countries` resource will be inferred from the route.
  // Because we've defined `/countries` as the `list` action of the `countries` resource.
  const {
    tableQueryResult: { data, isLoading }
  } = useTable<Tables<'countries'>>();

  const tableData = data?.data;

  return (
    <div>
      {isLoading && <p>Loading...</p>}
      {!isLoading && (
        <>
          <ul>
            {tableData?.map((country) => (
              <>
                <li key={country.id}>
                  <Link href={`/countries/show/${country.id}`}>
                    {country.name?.en}
                  </Link>
                </li>
              </>
            ))}
          </ul>
        </>
      )}
    </div>
  );
}
