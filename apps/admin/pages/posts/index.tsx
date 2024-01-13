import { useTable } from '@refinedev/core';
import Link from 'next/link';

type IPost = {
  id: string;
  title: string;
  description: string;
};

export default function PostList() {
  // `posts` resource will be inferred from the route.
  // Because we've defined `/posts` as the `list` action of the `posts` resource.
  const {
    tableQueryResult: { data, isLoading }
  } = useTable<IPost>();

  const tableData = data?.data;

  return (
    <div>
      {isLoading && <p>Loading...</p>}
      {!isLoading && (
        <>
          <ul>
            {tableData?.map((post) => (
              <>
                <li key={post.id}>
                  <Link href={`/posts/show/${post.id}`}>{post.title}</Link>
                </li>
              </>
            ))}
          </ul>
        </>
      )}
    </div>
  );
}
