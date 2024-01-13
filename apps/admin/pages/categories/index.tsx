import { useTable } from "@refinedev/core";
import Link from "next/link";

type ICategory = {
  id: string;
  label: string;
};

export default function CategoryList() {
  // `categories` resource will be inferred from the route.
  // Because we've defined `/categories` as the `list` action of the `categories` resource.
  const {
    tableQueryResult: { data, isLoading },
  } = useTable<ICategory>();

  const tableData = data?.data;

  return (
    <div>
      {isLoading && <p>Loading...</p>}
      {!isLoading && (
        <ul>
          {tableData?.map((category) => (
            <li key={category.id}>
              <Link href={`/categories/show/${category.id}`}>{category.label}</Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
