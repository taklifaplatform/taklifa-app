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
  const [localItems, setLocalItems] = useState([])

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
      ...localItems,
      ...data?.data || []
    ].map(dataMapper ? dataMapper : (item: any) => ({
      id: item[itemKey || 'id'],
      name: item[itemValue || 'name'],
    })) || [];
  }, [localItems, data?.data, dataMapper, itemKey, itemValue])

  const [loadingLocalItems, setLoadingLocalItems] = useState(false)
  useEffect(() => {
    if (props.value && !mappedData.find(item => item.id === props.value)) {
      setLoadingLocalItems(true)
      request<any>(OpenAPI, {
        method: 'GET',
        url: `/api/${api}`,
        query: {
          search: props.value,
          page: 1,
          per_page: 1
        },
      }).then((res) => {
        if (res.data.length) {
          setLocalItems(res.data)
        }
      }).finally(() => {
        setLoadingLocalItems(false)
      })
    }
  }, [props.value, itemKey, mappedData, api])

  if (loadingLocalItems) {
    return null
  }

  return (
    <ZixSelectField
      search={search}
      onSearch={setSearch}
      options={mappedData}
      {...props}
    />
  )
};

export default ZixAutoCompleteField;
