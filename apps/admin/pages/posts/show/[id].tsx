import { useShow } from '@refinedev/core';

type IPost = {
  id: string;
  title: string;
  description: string;
};

export default function PostShow() {
  // `posts` resource and the `id` will be inferred from the route.
  // Because we've defined `/posts/show/:id` as the `show` action of the `posts` resource.
  const {
    queryResult: { data, isLoading }
  } = useShow<IPost>();

  const postData = data?.data;

  return (
    <>
      <div>
        {isLoading && <p>Loading...</p>}
        {!isLoading && (
          <>
            <h1>{postData?.title}</h1>
            <p>{postData?.description}</p>
          </>
        )}
      </div>
    </>
  );
}
