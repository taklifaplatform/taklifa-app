import {
  DefaultError,
  DefinedInitialDataInfiniteOptions,
  DefinedUseInfiniteQueryResult,
  InfiniteData,
  QueryClient,
  QueryKey,
  useInfiniteQuery,
} from '@tanstack/react-query';
import { useCallback, useMemo } from 'react';

export type FlatListReturn<TData> = DefinedUseInfiniteQueryResult<
  TData,
  DefaultError
> & {
  data: TData;
  onEndReached: () => void;
};

export function useFlatListQuery<
  TQueryFnData,
  TError = DefaultError,
  TData = InfiniteData<TQueryFnData>,
  TQueryKey extends QueryKey = QueryKey,
  TPageParam = unknown,
>(
  options: Partial<
    DefinedInitialDataInfiniteOptions<
      TQueryFnData,
      TError,
      TData,
      TQueryKey,
      TPageParam
    >
  >,
  queryClient?: QueryClient,
): FlatListReturn {
  const { data, ...query } = useInfiniteQuery(
    {
      initialPageParam: 1,

      getPreviousPageParam: (firstPage: any) => {
        if (!firstPage?.meta?.current_page) {
          return undefined;
        }
        if (firstPage?.meta?.current_page <= 1) {
          return undefined;
        }
        return firstPage?.meta?.current_page - 1;
      },
      getNextPageParam: (lastPage: any) => {
        if (!lastPage?.meta?.current_page) {
          return undefined;
        }
        if (lastPage?.meta?.current_page >= lastPage?.meta?.last_page) {
          return undefined;
        }
        return (lastPage?.meta?.current_page ?? 0) + 1;
      },
      ...options,
    } as any,
    queryClient,
  );

  const flattenData = useMemo(() => {
    return data?.pages.flatMap((page) => page.data) || [];
  }, [data?.pages]);

  const onEndReached = useCallback(() => {
    if (query.hasNextPage) {
      query.fetchNextPage();
    }
  }, [query.hasNextPage, query.fetchNextPage]);

  return {
    data: flattenData,
    onEndReached,
    ...query,
  };
}
