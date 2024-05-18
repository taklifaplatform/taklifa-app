import { useQuery } from '@tanstack/react-query';
import { OpenAPI, request } from '@zix/api';
import React, { useMemo, useState } from 'react';
import {
  SelectProps
} from 'tamagui';
import { useDebounce } from 'use-debounce';
import ZixSelectField, { BaseSelectFieldItem, ZixSelectFieldProps } from '../zix-select-field/zix-select-field';
/**
 * TODO: implement load more logic
 */
export type ZixAutoCompleteFieldProps = Partial<ZixSelectFieldProps> & {
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
  const [value] = useDebounce(search, 1000);
  const { data } = useQuery(
    {
      queryFn() {
        return request<any>(OpenAPI, {
          method: 'GET',
          url: `/api/${api}`,
          query: {
            search,
            page: 1,
            per_page: perPage,
            ...query
          },
        });
      },
      queryKey: [api, search, perPage, `-${props.value}`, Object.values(query)],
    }
  );

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
      search={value}
      onSearch={setSearch}
      options={mappedData}
      {...props}
    />
  )
};

export default ZixAutoCompleteField;
