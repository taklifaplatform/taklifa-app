import { useQuery } from '@tanstack/react-query';
import { OpenAPI, request } from '@zix/api';
import React, { useMemo, useState } from 'react';
import {
  SelectProps
} from 'tamagui';
import ZixSelectField, { BaseSelectFieldItem, ZixSelectFieldProps } from '../zix-select-field/zix-select-field';

/**
 * TODO: implement load more logic
 */
export type ZixAutoCompleteFieldProps = Partial<ZixSelectFieldProps> & {
  api: string;
  itemKey?: string;
  itemValue?: string;

  perPage?: number;

  dataMapper?: (item: any) => BaseSelectFieldItem;

} & Pick<SelectProps, 'size' | 'native'>;

export const ZixAutoCompleteField: React.FC<ZixAutoCompleteFieldProps> = (
  {
    api,
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

  const { data } = useQuery(
    {
      queryFn: async () => {
        const result = await request(OpenAPI, {
          method: 'GET',
          url: `/api/${api}`,
          query: {
            search,
            page: 1,
            per_page: perPage,
          },
        });

        return result?.data;
      },
      queryKey: [api, search, perPage, props.value],
      staleTime: 1000 * 60 * 60 * 24,
    }
  );

  const mappedData = useMemo<BaseSelectFieldItem[]>(() => {
    return data?.map(dataMapper ? dataMapper : (item: any) => ({
      id: item[itemKey || 'id'],
      name: item[itemValue || 'name'],
    })) || [];
  }, [data, itemKey, itemValue, dataMapper])


  return (
    <ZixSelectField
      search={search}
      onSearch={setSearch}
      options={mappedData}
    />
  )
};

export default ZixAutoCompleteField;
