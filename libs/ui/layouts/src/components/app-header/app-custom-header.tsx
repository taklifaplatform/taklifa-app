import { ArrowLeft, MapPin, Search, X } from '@tamagui/lucide-icons';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { ProductsService, ProductTransformer } from '@zix/api';
import { ProductDetailComponent } from '@zix/features/company';
import { COMPANY_MANAGER_ROLES, useAuth } from '@zix/services/auth';
import {
  ManageCountProduct,
  TextInfo,
  UserAvatar,
  ZixAvatar,
  ZixButton,
  ZixDialog,
} from '@zix/ui/common';
import { ZixInput, ZixInputProps } from '@zix/ui/forms';
import { CustomIcon } from '@zix/ui/icons';
import { useCallback, useEffect, useState, useRef } from 'react';
import {
  FlatList,
  TouchableOpacity,
  Animated,
  Platform,
  TextInput,
} from 'react-native';
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
import { AddToCartButton } from '@zix/ui/common';

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
  const inputRef = useRef<TextInput>(null);
  const [isSearchBarFocused, setIsSearchBarFocused] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const [searchResults, setSearchResults] = useState<ProductTransformer[]>([]);
  const [open, setOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState('');
  const [selectedProductDetail, setSelectedProductDetail] = useState<{
    product: ProductTransformer | null;
    index: number;
  } | null>({
    product: null,
    index: 0,
  });
  const [count, setCount] = useState(1);
  const [animatedText, setAnimatedText] = useState<string[]>([
    'مكيف مركزي',

    'بلاط سيراميك',

    'بلاط رخام',

    'دهان داخلي',

    'دهان خارجي',

    'جبس بورد',

    'حجر طبيعي',

    'حجر صناعي',

    'سلك شائك',

    'طابوق أحمر',

    'طابوق عازل',

    'حديد تسليح',

    'خرسانة جاهزة',

    'باب حديد',

    'باب خشب',

    'باب زجاج',

    'سيراميك أرضيات',

    'سيراميك جدران',

    'رخام أرضيات',

    'رخام درج',

    'عزل مائي',

    'عزل حراري',

    'مظلة سيارات',

    'خزان أرضي',

    'خزان علوي',

    'صرف صحي',

    'بلاط حوش',

    'بلاط إنترلوك',

    'موكيت أرضيات',

    'ورق جدران',

    'شبابيك ألمنيوم',

    'أبواب خشب',

    'مغسلة رخام',

    'أدوات صحية',

    'خلاط موية',

    'مضخة ماء',

    'ليات سباكة',

    'كراسي حمام',

    'رخام مطابخ',

    'مكيف شباك',

    'حديد تسليح',

    'حديد سابك',

    'حديد طري',

    'حديد صلب',

    'حديد مجلفن',

    'حديد شبك',

    'حديد مباني',

    'حديد زوايا',

    'حديد مبروم',

    'حديد ألواح',

    'مغسلة رخام',

    'مكاتب إدارية',

    'كراسي مكتبية',

    'وورك ستيشن',

    'أثاث مكتبي',

    'حجر طبيعي',

    'حجر صناعي',

    'طابوق أحمر',

    'طابوق عازل',

    'سلك شائك',

    'أدوات صحية',

    'خلاط موية',

    'ليات سباكة',

    'كراسي حمام',

    'عزل مائي',

    'عزل حراري',

    'صرف صحي',

    'خزان أرضي',

    'خزان علوي',

    'مضخة ماء',

    'دهان داخلي',

    'دهان خارجي',

    'جبس بورد',

    'ورق جدران',

    'بديل رخام',

    'بديل خشب',

    'ألواح تكسيات',

    'باب خشب',

    'باب حديد',

    'باب زجاج',

    'شبابيك ألمنيوم',

    'أبواب خشب',

    'حديد تسليح',

    'حديد سابك',

    'حديد طري',

    'حديد صلب',

    'حديد مجلفن',

    'حديد شبك',

    'حديد مباني',

    'حديد زوايا',

    'حديد مبروم',

    'حديد ألواح',

    'خرسانة جاهزة',
  ]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [prevIndex, setPrevIndex] = useState<number | null>(null);
  const animatedValue = useRef(new Animated.Value(0)).current;
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
    queryClient.invalidateQueries({
      queryKey: ['ProductsService.fetchAllProduct', searchValue],
    });
  }, [searchValue]);

  useEffect(() => {
    queryClient.setQueryData(
      ['ProductsService.fetchAllProduct', selectedProduct],
      listProductsData?.data,
    );
  }, [selectedProduct]);

  useEffect(() => {
    const interval = setInterval(() => {
      setPrevIndex(currentIndex);
      setCurrentIndex((prev) => (prev + 1) % animatedText.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [currentIndex]);

  useEffect(() => {
    // Animate the text change
    animatedValue.setValue(30); // Start from below
    Animated.timing(animatedValue, {
      toValue: 0,
      duration: 200,
      useNativeDriver: true,
    }).start();
  }, [currentIndex, animatedValue]);

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
        {searchValue.length === 0 && !isSearchBarFocused && (
          <XStack
            position="absolute"
            left={60}
            top={13}
            zIndex={99999}
            height={40}
            alignItems="center"
            onPress={() => {
              setIsSearchBarFocused(true);
              inputRef.current?.focus();
            }}
          >
            {Platform.OS === 'ios' && (
              <Text color="$color10" fontWeight="600">
                ابحث عن
              </Text>
            )}
            <View overflow="hidden">
              <Animated.View
                style={{
                  transform: [{ translateY: animatedValue }],
                  opacity: animatedValue.interpolate({
                    inputRange: [-30, 0, 30],
                    outputRange: [0, 1, 0],
                  }),
                }}
              >
                <Text color="$color10" fontWeight="600">
                {'  '} {animatedText[currentIndex]}
                </Text>
              </Animated.View>
            </View>
            {Platform.OS !== 'ios' && (
              <Text color="$color10" fontWeight="600">
                 ابحث عن
              </Text>
            )}
          </XStack>
        )}
        <ZixInput
          ref={inputRef}
          rightIcon={() => <Search size="$1.5" color="$color6" />}
          leftIcon={() =>
            selectedProduct ? (
              <ZixButton unstyled onPress={() => setSelectedProduct('')}>
                <ArrowLeft size={'$1.5'} color="$color6" />
              </ZixButton>
            ) : isSearchBarFocused ? (
              <ZixButton
                unstyled
                onPress={() => {
                  setIsSearchBarFocused(false);
                  inputRef.current?.blur();
                  setSearchValue('');
                  setSearchResults([]);
                }}
              >
                <X size={'$1.5'} color="$color6" />
              </ZixButton>
            ) : (
              renderAvatar()
            )
          }
          placeholder=""
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
          value={searchValue}
          onChangeText={(text) => {
            setSearchValue(text);
            setIsSearchBarFocused(true);
          }}
          autoFocus={isSearchBarFocused}
          onFocus={() => {
            setIsSearchBarFocused(true);
          }}
          onBlur={() => {
            setIsSearchBarFocused(false);
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
                // setSearchValue('');
                setIsSearchBarFocused(false);
                // setSearchValue(result.name);
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
        title={
          !selectedProductDetail?.product ? 'قارن الاسعار' : 'تفاصيل المنتج'
        }
        open={open}
        onOpenChange={setOpen}
        contentPadding="$3"
        snapPoints={[80]}
        justifyContentTitle={'space-between'}
        disableDrag
        rigthComponent={
          <XStack gap="$4" alignItems="center" justifyContent="center">
            {!selectedProductDetail?.product ? (
              <XStack gap="$4">
                <ZixButton
                  size="$3"
                  backgroundColor="#F1F2F4"
                  justifyContent="center"
                  alignItems="center"
                  unstyled
                  circular
                  onPress={() => {
                    setOpen(false);
                    setSelectedProductDetail({ product: null, index: 0 });
                  }}
                >
                  <ArrowLeft size={16} color="black" />
                </ZixButton>
                <ZixButton
                  size="$3"
                  backgroundColor="#F1F2F4"
                  justifyContent="center"
                  alignItems="center"
                  unstyled
                  circular
                  onPress={() => {
                    setOpen(false);
                    setIsSearchBarFocused(false);
                    setSearchValue('');
                    setSearchResults([]);
                    setSelectedProduct('');
                  }}
                >
                  <X size={16} color="black" />
                </ZixButton>
              </XStack>
            ) : (
              <ZixButton
                size="$3"
                backgroundColor="#F1F2F4"
                justifyContent="center"
                alignItems="center"
                unstyled
                circular
                onPress={() =>
                  setSelectedProductDetail({ product: null, index: 0 })
                }
              >
                <ArrowLeft size={16} color="black" />
              </ZixButton>
            )}
          </XStack>
        }
      >
        {!selectedProductDetail?.product ? (
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
            product={selectedProductDetail?.product}
            onNextProduct={() => {
              if (
                selectedProductDetail.index + 1 <
                listProductsData?.data?.length
              ) {
                setSelectedProductDetail({
                  product:
                    listProductsData?.data?.[selectedProductDetail.index + 1] ||
                    null,
                  index: selectedProductDetail.index + 1,
                });
              }
            }}
            onPreviousProduct={() => {
              if (selectedProductDetail.index - 1 >= 0) {
                setSelectedProductDetail({
                  product:
                    listProductsData?.data?.[selectedProductDetail.index - 1] ||
                    null,
                  index: selectedProductDetail.index - 1,
                });
              }
            }}
          />
        )}
      </ZixDialog>
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
        <TouchableOpacity
          style={{
            flexDirection: 'row',
            gap: 10,
            alignItems: 'center',
            justifyContent: 'flex-start',
          }}
          onPress={() => {
            setOpen(false);
            router.push(`${getUrlPrefix}/companies/${product?.company?.id}`);
          }}
        >
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
            <TextInfo
              icon={<MapPin size={16} color="$color0" />}
              title={product?.company?.name}
            />
          </YStack>
        </TouchableOpacity>
        <XStack gap="$4" alignItems="center">
          {product?.image ? (
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
            <XStack
              width="100%"
              gap="$2"
              alignItems="center"
              paddingVertical={'$2'}
            >
              <Text fontSize={'$5'} fontWeight={'bold'} color="$color11">
                {product?.variant?.price}
              </Text>

              <Theme name="accent">
                <CustomIcon name="riyal" size="$1" color="$color0" />
              </Theme>
              {product?.variant?.type_unit && (
                <Text fontSize="$1" color="$color11">
                  / {product?.variant?.type_unit}
                </Text>
              )}
            </XStack>
          </YStack>
        </XStack>
        <XStack
          width="100%"
          gap="$3"
          justifyContent="space-between"
          alignItems="center"
        >
          <ManageCountProduct
            value={count}
            onUpdate={setCount}
            width={'55%'}
            height={40}
            size={20}
          />
          <AddToCartButton width={'40%'} height={40} product={product} />
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
            setSelectedProductDetail({
              product: product,
              index: index,
            });
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
