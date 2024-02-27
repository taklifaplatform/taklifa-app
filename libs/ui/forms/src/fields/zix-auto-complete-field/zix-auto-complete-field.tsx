import { LinearGradient } from '@tamagui/linear-gradient';
import {
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  Search,
  X,
} from '@tamagui/lucide-icons';
import { NativeValue } from '@tamagui/toast/types/ToastImperative';
import { useQuery } from '@tanstack/react-query';
import { RecursiveErrorType } from '@ts-react/form/lib/src/zodObjectErrors';
import { OpenAPI, request } from '@zix/api';
import { useMultiLang } from '@zix/i18n';
import { t } from 'i18next';
import React, { useState } from 'react';
import {
  Adapt,
  Button,
  Input,
  Select,
  SelectProps,
  Sheet,
  Stack,
  Text,
  Theme,
  XStack,
  YStack,
  getFontSize,
  isWeb,
  useThemeName,
} from 'tamagui';

/**
 * TODO: implement load more logic
 */
export type ZixAutoCompleteFieldProps = {
  api: string;
  // handle custom query
  // handle customer id, value
  itemKey?: string;
  itemValue?: string;
  // handle custom render

  numberOfItemsToShow?: number;

  native?: NativeValue<'web'>;

  // field related props
  value?: string;
  onValueChange?: (value: string) => void;
  placeholder?: string;
  error?: RecursiveErrorType<any>;
  id?: string;
  isSubmitting?: boolean;

  // action related props
  title?: string;

  selectTriggerProps?: SelectProps;


  // handle custom render
  renderItem?: (item: any, index: number) => React.JSX.Element;
} & Pick<SelectProps, 'size' | 'native'>;

export const ZixAutoCompleteField: React.FC<ZixAutoCompleteFieldProps> = (
  props
) => {
  const themeName = useThemeName();
  const { isRtl } = useMultiLang();

  const {
    api,
    itemKey = 'id',
    itemValue = 'name',
    numberOfItemsToShow = 50, // TODO: reduce
    native = true,

    title = `Select ??`,
    placeholder = `Please select ??`,

    error,
    isSubmitting,
    value,
    onValueChange,
    id,

    selectTriggerProps = {},
  } = props;

  if (!api) {
    throw new Error('api is required');
  }

  const [search, setSearch] = useState<string>();

  const [open, setOpen] = useState(false);

  const { data: selectedItem } = useQuery({
    queryFn: async () => {
      if (!value) return null;
      return (
        await request(OpenAPI, {
          method: 'GET',
          url: `/api/${api}/${value}`,
        })
      )?.data;
    },
    queryKey: [api, value],
  });

  const { data, isLoading, refetch } = useQuery(
    {
      queryFn: async () => {
        const result = await request(OpenAPI, {
          method: 'GET',
          url: `/api/${api}`,
          query: {
            search,
            page: 1,
            per_page: numberOfItemsToShow,
            abc: 'abc',
          },
        });

        return result?.data;
      },
      queryKey: [api, search, value, 'abc', numberOfItemsToShow, open],
      keepPreviousData: true,
      staleTime: 1000 * 60 * 60 * 24,
    }
  );

  const renderItem = (item: any, i: number) => {
    return (
      <Select.Item
        index={i}
        key={`${item[itemKey]}-${i}`}
        value={`${item[itemKey]}`}
        margin="$2"
        width="100%"
      >
        <Select.ItemText>
          {typeof item[itemValue] === 'string'
            ? item[itemValue]
            : JSON.stringify(item[itemValue])}
        </Select.ItemText>
        <Select.ItemIndicator marginLeft="auto">
          <CheckCircle2 size="$2" color="$color5" />
        </Select.ItemIndicator>
      </Select.Item>
    );
  };

  const renderSearchBar = () => (
    <XStack
      flex={1}
      padding="$4"
      width="100%"
      alignItems="center"
      justifyContent="space-between"
    >
      <XStack alignItems="center" flex={1}>
        <Button
          size="$4"
          icon={<Search size="$1.5" />}
          color="$color5"
          marginRight="$-10"
          backgroundColor="transparent"
          zIndex={10}
        />
        <Input
          paddingLeft="$10"
          placeholder={t('common:search')}
          flex={1}
          value={search}
          onChangeText={setSearch}
          textAlign={isRtl ? 'right' : 'left'}
        />
      </XStack>
    </XStack>
  );

  function isCloseToBottom({
    layoutMeasurement,
    contentOffset,
    contentSize,
  }: any) {
    return (
      layoutMeasurement.height + contentOffset.y >= contentSize.height - 20
    );
  }

  function isCloseToTop({
    layoutMeasurement,
    contentOffset,
    contentSize,
  }: any) {
    return contentOffset.y == 0;
  }

  return (
    <Theme name={error ? 'red' : themeName} forceClassName>
      <Select
        open={open}
        onOpenChange={setOpen}
        native={props.native}
        id={id}
        value={value}
        onValueChange={onValueChange}
      // borderWidth="$0.25"
      // borderColor="$color10"
      // bc="$color2"
      >
        <Select.Trigger
          height={props.size || '$5'}
          borderWidth="$0.25"
          borderColor="$color10"
          backgroundColor="$color2"
          iconAfter={ChevronDown}
          {...selectTriggerProps}
        >
          <Select.Value placeholder={placeholder} />
        </Select.Trigger>
        <Adapt>
          {/* <Adapt when="sm" platform="touch"> */}
          <Sheet modal dismissOnSnapToBottom>
            {/* <Sheet native modal dismissOnSnapToBottom> */}
            <Sheet.Frame>
              <Stack gap="$2" paddingBottom="$4">
                <XStack
                  paddingLeft="$4"
                  paddingHorizontal="$2"
                  alignItems="center"
                  justifyContent="space-between"
                >
                  <Text>{title}</Text>
                  <Button
                    icon={<X size="$1.5" />}
                    variant="outlined"
                    onPress={() => setOpen(false)}
                  />
                </XStack>
                {renderSearchBar()}
              </Stack>
              <Sheet.ScrollView
              // onScroll={({ nativeEvent }) => {
              //   if (isCloseToTop(nativeEvent)) {
              //     //do something
              //   }
              //   if (isCloseToBottom(nativeEvent)) {
              //     console.log('bottom')
              //   }
              // }}
              >
                <Adapt.Contents />
              </Sheet.ScrollView>
            </Sheet.Frame>
            <Sheet.Overlay />
          </Sheet>
        </Adapt>

        <Select.Content zIndex={200000}>
          <Select.ScrollUpButton
            alignItems="center"
            justifyContent="center"
            position="relative"
            width="100%"
            height="$3"
          >
            <YStack zIndex={10}>
              <ChevronUp size={20} />
            </YStack>
            <LinearGradient
              start={[0, 0]}
              end={[0, 1]}
              fullscreen
              colors={['$background', '$backgroundTransparent']}
              borderRadius="$4"
            />
          </Select.ScrollUpButton>

          <Select.Viewport minWidth={200}>
            <XStack alignItems="flex-start" flex={1} width="100%">
              <Select.Group disabled={isSubmitting} space="$0">
                {!selectedItem ? (
                  <Stack height={1} backgroundColor="$borderColor" />
                ) : (
                  props.renderItem?.(selectedItem, 0)
                )}
                {open &&
                  data?.map(props?.renderItem ? props.renderItem : renderItem)}
                {/* {open && data?.map(props?.renderItem ? props.renderItem : renderItem)} */}
              </Select.Group>
              {/* special icon treatment for native */}
              {native && isWeb && (
                <YStack
                  position="absolute"
                  right={0}
                  top={0}
                  bottom={0}
                  alignItems="center"
                  justifyContent="center"
                  width={'$4'}
                  pointerEvents="none"
                >
                  <ChevronDown
                    size={getFontSize((props.size ?? '$true') as number)}
                  />
                </YStack>
              )}
            </XStack>
          </Select.Viewport>

          <Select.ScrollDownButton
            alignItems="center"
            justifyContent="center"
            position="relative"
            width="100%"
            height="$3"
          >
            <YStack zIndex={10}>
              <ChevronDown size={20} />
            </YStack>
            <LinearGradient
              start={[0, 0]}
              end={[0, 1]}
              fullscreen
              colors={['$backgroundTransparent', '$background']}
              borderRadius="$4"
            />
          </Select.ScrollDownButton>
        </Select.Content>
      </Select>
    </Theme>
  );
};

export default ZixAutoCompleteField;
