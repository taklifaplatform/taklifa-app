import { useQuery } from '@tanstack/react-query';
import { OpenAPI, request } from '@zix/api';
import React, { useEffect, useMemo, useState } from 'react';
import {
  SelectProps
} from 'tamagui';
import ZixSelectField, { BaseSelectFieldItem, ZixSelectFieldProps } from '../zix-select-field/zix-select-field';
/**
 * TODO: implement load more logic
 */
export type ZixAutoCompleteFieldProps = Partial<ZixSelectFieldProps> & {
  identifier?: string;
  api: string;
  query?: Record<string, any>;
  itemKey?: string;
  itemValue?: string;

  perPage?: number;

  dataMapper?: (item: any) => BaseSelectFieldItem;

} & Pick<SelectProps, 'size' | 'native'>;

export const ZixAutoCompleteField: React.FC<ZixAutoCompleteFieldProps> = (
  {
    api,
    identifier = 'unique-identifier',
    query = {},
    itemKey,
    itemValue,
    dataMapper,
    perPage = 30,
    ...props
  }
) => {
  if (!api) {
    throw new Error('api is required');
  }

  const [search, setSearch] = useState<string>();
  const { data, refetch, isFetching } = useQuery(
    {
      queryFn() {
        return request<any>(OpenAPI, {
          method: 'GET',
          url: `/api/${api}`,
          query: {
            search,
            page: 1,
            per_page: perPage * 4,
            ...query
          },
        });
      },
      queryKey: [identifier, api, perPage, search, `-${props.value}`, Object.values(query)],
    }
  );
  useEffect(() => {
    setTimeout(() => {
      console.log("REFETCHING")
      refetch();
    }, 1000);
  }, [props.value]);


  const mappedData = useMemo<BaseSelectFieldItem[]>(() => {
    return [
      ...data?.data || []
    ].map(dataMapper ? dataMapper : (item: any) => ({
      id: item[itemKey || 'id'],
      name: item[itemValue || 'name'],
    })) || [];
  }, [data?.data, dataMapper, itemKey, itemValue])

  return (
    <ZixSelectField
      search={search}
      onSearch={setSearch}
      options={mappedData}
      isOptionsLoading={isFetching}
      {...props}
    />
  )
};

export default ZixAutoCompleteField;
