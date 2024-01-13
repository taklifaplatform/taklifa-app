import { useShow } from "@refinedev/core";

type ICategory = {
  id: string;
  label: string;
};

export default function CategoryShow() {
  // `categories` resource and the `id` will be inferred from the route.
  // Because we've defined `/categories/show/:id` as the `show` action of the `categories` resource.
  const {
    queryResult: { data, isLoading },
  } = useShow<ICategory>();

  const categoryData = data?.data;

  return (
    <div>
      <h1>{categoryData?.label}</h1>
    </div>
  );
}
