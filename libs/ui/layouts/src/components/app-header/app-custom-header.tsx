import { ArrowLeft, MapPin, Search, X } from '@tamagui/lucide-icons';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { ProductsService, ProductTransformer } from '@zix/api';
import { ProductDetailComponent } from '@zix/features/company';
import { COMPANY_MANAGER_ROLES, useAuth } from '@zix/services/auth';
import {
  ManageCountProduct,
  TitleInfo,
  UserAvatar,
  ZixAvatar,
  ZixButton,
  ZixDialog,
} from '@zix/ui/common';
import { ZixInput, ZixInputProps } from '@zix/ui/forms';
import { CustomIcon } from '@zix/ui/icons';
import { t } from 'i18next';
import { useCallback, useEffect, useState } from 'react';
import { FlatList, TouchableOpacity } from 'react-native';
import { useRouter } from 'solito/router';
import {
  Button,
  ColorTokens,
  Image,
  Text,
  Theme,
  View,
  XStack,
  YStack,
} from 'tamagui';

export type AppCustomHeaderProps = {
  searchProps?: ZixInputProps;
  showSearchBar?: boolean;
  showBackButton?: boolean;
  showCardHeader?: boolean;
  cardHeaderValue?: string;
  goBack?: () => void;
  headerTitle?: () => React.ReactNode;
  headerRight?: () => React.ReactNode;
  renderAfterSearchBar?: () => React.ReactNode;
  title?: string;
  headerBackgroundColor?: ColorTokens | 'transparent';
};

export const AppCustomHeader: React.FC<AppCustomHeaderProps> = ({
  searchProps = {},
  showBackButton,
}) => {
  const { user, activeRole, isLoggedIn, getUrlPrefix } = useAuth();
  const router = useRouter();
  const onAvatarPress = useCallback(() => {
    if (isLoggedIn) {
      router.push(`${getUrlPrefix}/users/${user?.id}`);
    } else {
      //   router.push('/auth/login');
      router.push(`${getUrlPrefix}/account/settings`);
    }
  }, [isLoggedIn, router, user, getUrlPrefix]);
  const [isSearchBarFocused, setIsSearchBarFocused] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const [searchResults, setSearchResults] = useState<ProductTransformer[]>([]);
  const [open, setOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState('');
  const [selectedProductDetail, setSelectedProductDetail] =
    useState<ProductTransformer | null>(null);
  const [count, setCount] = useState(1);
  const queryClient = useQueryClient();

  const { data, isLoading } = useQuery({
    queryFn: () =>
      ProductsService.fetchAllProduct({
        search: searchValue,
      }),
    queryKey: ['ProductsService.fetchAllProduct', searchValue],
  });

  const { data: listProductsData, isLoading: isLoadingListProducts } = useQuery(
    {
      queryFn: () =>
        ProductsService.fetchAllProduct({
          search: selectedProduct,
        }),
      queryKey: ['ProductsService.fetchAllProduct', selectedProduct],
    },
  );

  useEffect(() => {
      setSearchResults(data?.data || []);
    
  }, [data]);

  useEffect(() => {
    if (searchValue.trim() === '') {
      setSearchResults([]);
      return;
    }
      queryClient.invalidateQueries({ queryKey: ['ProductsService.fetchAllProduct', searchValue] });
  }, [searchValue]);

  useEffect(() => {
    if (selectedProduct) {
      setSearchValue('');
      setIsSearchBarFocused(false);
      setOpen(true);
    }
    queryClient.setQueryData(
      ['ProductsService.fetchAllProduct', selectedProduct],
      listProductsData?.data,
    );
  }, [selectedProduct]);

  useEffect(() => {
    if (!open) {
      setSelectedProduct('');
    }
  }, [open]);

  const renderSearchBar = () => (
    <Theme reset>
      <View
        position="absolute"
        top={50}
        left={0}
        right={0}
        paddingHorizontal="$4"
        paddingVertical="$2"
        zIndex={1000}
      >
        <ZixInput
          rightIcon={() => <Search size="$1.5" color="$color6" />}
          leftIcon={() =>
            selectedProduct ? (
              <ZixButton unstyled onPress={() => setSelectedProduct('')}>
                <ArrowLeft size={'$1.5'} color="$color6" />
              </ZixButton>
            ) : isSearchBarFocused ? (
              <ZixButton unstyled onPress={() => {
                setIsSearchBarFocused(false);
                setSearchValue('');
                setSearchResults([]);
                }}>
                <X size={'$1.5'} color="$color6" />
              </ZixButton>
            ) : (
              renderAvatar()
            )
          }
          placeholder="إبحث وقارن"
          placeholderTextColor="$color10"
          borderRadius={'$8'}
          style={{
            paddingLeft: 60,
          }}
          borderWidth={0}
          backgroundColor="$color1"
          shadowColor="black"
          shadowOffset={{ width: 0, height: 4 }}
          shadowOpacity={0.25}
          shadowRadius={3.84}
          elevation={5}
          fontWeight="600"
          value={selectedProduct ? selectedProduct : searchValue}
          onChangeText={(text) => {
            setSearchValue(text);
            setIsSearchBarFocused(true);
          }}
          onFocus={() => {
            setIsSearchBarFocused(true);
          }}
          {...searchProps}
        />
      </View>
      {autoCompleteSearch()}
      {sheetContent()}
    </Theme>
  );

  const renderCompanyAvatar = () => (
    <Button
      unstyled
      icon={<ZixAvatar media={user.active_company?.logo} size="$2.5" />}
      onPress={() => {
        router.push(`${getUrlPrefix}/companies/${user.active_company?.id}`);
      }}
    />
  );

  const renderUserAvatar = () => (
    <Button
      unstyled
      icon={
        <View position="relative">
          <UserAvatar user={user} size="$2.5" />
          {user.active_company && (
            <View position="absolute" bottom={-5} right={-5}>
              <ZixAvatar media={user.active_company?.logo} size="$1" />
            </View>
          )}
        </View>
      }
      onPress={onAvatarPress}
    />
  );

  const renderAvatar = () =>
    !showBackButton
      ? COMPANY_MANAGER_ROLES.includes(activeRole)
        ? renderCompanyAvatar()
        : renderUserAvatar()
      : null;

  const autoCompleteSearch = () => {
    return (
      searchResults?.length > 0 && (
        <YStack
          gap="$2"
          position="absolute"
          top={120}
          left={0}
          right={0}
          paddingHorizontal="$4"
          paddingVertical="$2"
          zIndex={1000}
          backgroundColor="$color1"
          borderRadius="$2"
          marginHorizontal="$4"
          justifyContent="center"
          alignItems="flex-start"
          shadowColor="grey"
          shadowOffset={{ width: 0, height: 2 }}
          shadowOpacity={0.1}
          shadowRadius={2}
          elevation={1}
        >
          {searchResults.map((result: any) => (
            <TouchableOpacity
              style={{
                width: '100%',
                padding: 10,
                borderRadius: 10,
                flexDirection: 'row',
                gap: 10,
                backgroundColor: '$color1',
                alignItems: 'flex-start',
                justifyContent: 'space-between',
              }}
              onPress={() => {
                setSearchValue('');
                setIsSearchBarFocused(false);
                setSearchValue(result.name);
                setSelectedProduct(result.name);
                setOpen(true);
              }}
            >
              <Text>{result.name}</Text>
              <CustomIcon name="search" size={20} color="$color6" />
            </TouchableOpacity>
          ))}
        </YStack>
      )
    );
  };
  const sheetContent = () => {
    return (
      <ZixDialog
        title={'قارن الاسعار'}
        open={open}
        onOpenChange={setOpen}
        contentPadding="$3"
        snapPoints={[80]}
        justifyContentTitle={'space-between'}
        disableDrag
        rigthComponent={
          <XStack gap="$4" alignItems="center" justifyContent="center">
            <Button
              size="$3"
              backgroundColor="#F1F2F4"
              justifyContent="center"
              alignItems="center"
              unstyled
              circular
              icon={<X size={16} color="$color0" />}
              onPress={() => {
                setOpen(false);
                setSelectedProductDetail(null);
              }}
            />
          </XStack>
        }
      >
        {listProducts()}
      </ZixDialog>
    );
  };
  const listProducts = () => {
    return !selectedProductDetail ? (
      <FlatList
        data={listProductsData?.data}
        style={{
          padding: 10,
          gap: 10,
          backgroundColor: '$color1',
        }}
        renderItem={({ item, index }) => renderProductCard(item, index)}
        keyExtractor={(item) => item.id}
      />
    ) : (
      <ProductDetailComponent
        product={selectedProductDetail as ProductTransformer | null}
        onNextProduct={() =>
          setSelectedProductDetail(listProductsData?.data?.[count + 1] || null)
        }
        onPreviousProduct={() =>
          setSelectedProductDetail(listProductsData?.data?.[count - 1] || null)
        }
      />
    );
  };
  const renderProductCard = (product: ProductTransformer, index: number) => {
    return (
      <YStack
        key={index}
        width="100%"
        gap="$3"
        alignItems="flex-start"
        justifyContent="flex-start"
        backgroundColor="$color2"
        padding="$4"
        borderRadius="$5"
        margin={'$2'}
      >
        <XStack gap="$4" alignItems="center">
          <ZixAvatar media={product?.company?.logo} size="$3" />
          <YStack
            theme="accent"
            gap="$2"
            justifyContent="flex-start"
            alignItems="flex-start"
          >
            <Text fontWeight="bold" fontSize="$4" color="$color1">
              {product?.company?.name}
            </Text>
            <TitleInfo
              icon={<MapPin size={16} color="$color0" />}
              title={product?.company?.name}
            />
          </YStack>
        </XStack>
        <XStack gap="$4" alignItems="center">
          {product.image ? (
            <Image
              source={{ uri: product.image?.original_url }}
              width={80}
              height={80}
              borderRadius={'$4'}
            />
          ) : (
            <CustomIcon name="image-blank" size={80} color="$color0" />
          )}
          <YStack gap="$2" justifyContent="flex-start" alignItems="flex-start">
            <Text fontWeight="bold" fontSize="$4">
              {product?.name}
            </Text>
            <Text fontSize="$1" color="$color11">
              السعر
            </Text>
            <XStack
              width="100%"
              gap="$2"
              alignItems="center"
              paddingVertical={'$2'}
            >
              <Text fontSize={'$5'} fontWeight={'bold'} color="$color11">
                {product?.variant.price}
              </Text>
              <Theme name="accent">
                <CustomIcon name="riyal" size="$1" color="$color0" />
              </Theme>
            </XStack>
          </YStack>
        </XStack>
        <XStack width="100%" gap="$3" justifyContent="space-between">
          <ManageCountProduct
            value={count}
            onUpdate={setCount}
            width={'55%'}
            height={30}
            size={20}
          />
          <Button
            theme={'accent'}
            width={'40%'}
            height={35}
            borderRadius={'$4'}
            backgroundColor="$color1"
            justifyContent="center"
            alignItems="center"
            onPress={() => {}}
          >
            <Text fontSize={12} fontWeight={'bold'} color="#FFFFFF">
              أضف لعرض سعر
            </Text>
          </Button>
        </XStack>
        <Button
          unstyled
          theme={'accent'}
          width={'100%'}
          height={35}
          borderRadius={'$4'}
          justifyContent="center"
          alignItems="center"
          backgroundColor="$color11"
          onPress={() => {
            setSelectedProductDetail(product);
          }}
        >
          <Text fontSize={'$1'} fontWeight={'bold'} color="#FFFFFF">
            شاهد التفاصيل
          </Text>
        </Button>
      </YStack>
    );
  };

  return <>{renderSearchBar()}</>;
};

export default AppCustomHeader;
