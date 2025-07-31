import { FilePlus2, PlusSquare, Sparkles } from '@tamagui/lucide-icons';
import { CompanyProfileTabs, ProductsCompanyTab } from '@zix/features/company';
import { useAuth, useMixpanel } from '@zix/services/auth';
import { ZixButton, ZixDialog, ZixTab } from '@zix/ui/common';
import { AppHeader, ScreenLayout } from '@zix/ui/layouts';
import { CompanyServicesTab } from 'libs/features/company/src/components/company-profile/company-services-tab/company-services-tab';
import { useEffect, useState } from 'react';
import { TouchableOpacity } from 'react-native';
import { useRouter } from 'solito/router';
import { Text, XStack, YStack } from 'tamagui';

export type MyStoreScreenProps = {
  showHeader?: boolean;
  search?: string;
};

export const MyStoreScreen: React.FC<MyStoreScreenProps> = ({
  showHeader,
  search,
}) => {
  const router = useRouter();
  useMixpanel('Store List Screen view');
  const { user } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'products' | 'services'>(
    'products',
  );

  useEffect(() => {
    console.log('activeTab', activeTab);
  }, [activeTab]);
  return (
    <ScreenLayout>
      <AppHeader title={'متجري'} />
      <YStack flex={1} paddingTop="$4">
        {user?.active_company && (
          <ZixTab
            defaultActiveTab={'products'}
            onTabChange={(tab) => setActiveTab(tab as 'products' | 'services')}
            tabs={[
              {
                key: 'products',
                title: 'المنتجات',
                content: (
                  <ProductsCompanyTab
                    company={user.active_company}
                    hideFilters={false}
                    myStore={true}
                  />
                ),
              },
              {
                key: 'services',
                title: 'الخدمات',
                content: (
                  <CompanyServicesTab
                    company={user.active_company}
                    hideFilters={false}
                  />
                ),
              },
            ]}
          />
        )}
      </YStack>
      <ZixDialog
        title={
          activeTab === 'products' ? 'اضافة منتج جديد' : 'اضافة خدمة جديدة'
        }
        open={isOpen}
        onOpenChange={setIsOpen}
        colorHeader="$color10"
        contentPadding="$1"
        snapPoints={[25, 75]}
        disableRemoveScroll
        trigger={
          <ZixButton
            theme={'accent'}
            width={'$4'}
            height={'$4'}
            borderRadius={'$4'}
            backgroundColor="$color1"
            position="absolute"
            bottom={40}
            left={20}
            icon={<PlusSquare size={20} color="#FFFFFF" />}
          />
        }
      >
        <XStack
          justifyContent="center"
          alignItems="center"
          flex={1}
          padding="$4"
          gap="$4"
        >
          <YStack
            backgroundColor="$color2"
            padding="$6"
            borderRadius="$4"
            width={'48%'}
          >
            <TouchableOpacity
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                width: '100%',
                gap: 10,
              }}
              onPress={() => {
                setIsOpen(false);
                if (activeTab === 'products') {
                  router.push('/app/products/create');
                } else {
                  router.push('/app/services/create');
                }
              }}
            >
              <FilePlus2 size={20} color="$color12" />
              <Text
                fontSize="$2"
                fontWeight="bold"
                color="$color12"
                textAlign="center"
                maxWidth={'$10'}
              >
                {activeTab === 'products'
                  ? 'اضافة منتج يدويا'
                  : 'اضافة خدمة جديدة'}
              </Text>
            </TouchableOpacity>
          </YStack>

          <YStack
            backgroundColor="$color2"
            padding="$6"
            borderRadius="$4"
            width={'48%'}
          >
            <TouchableOpacity
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                width: '100%',
                gap: 10,
              }}
              onPress={() => {
                setIsOpen(false);
                router.push('/app/products/create-with-ai');
              }}
            >
              <Sparkles size={20} color="$color12" />
              <Text
                fontSize="$2"
                fontWeight="bold"
                color="$color12"
                textAlign="center"
              >
                {activeTab === 'products'
                  ? 'اضافة منتج بالذكاء الاصطناعي'
                  : 'اضافة خدمة بالذكاء الاصطناعي'}
              </Text>
            </TouchableOpacity>
          </YStack>
        </XStack>
      </ZixDialog>
    </ScreenLayout>
  );
};

export default MyStoreScreen;
