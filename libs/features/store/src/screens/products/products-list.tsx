import {
  FilePlus2,
  PlusSquare,
  Sparkles,
  SquarePen,
} from '@tamagui/lucide-icons';
import { CompanyProfileTabs } from '@zix/features/company';
import { useAuth, useMixpanel } from '@zix/services/auth';
import { ZixButton, ZixDialog } from '@zix/ui/common';
import { AppHeader, ScreenLayout } from '@zix/ui/layouts';
import { useState } from 'react';
import { TouchableOpacity } from 'react-native';
import { useRouter } from 'solito/router';
import { Text, Theme, XStack, YStack } from 'tamagui';
import { QueryClientProvider, useQueryClient } from '@tanstack/react-query';
import { ProductManagerComponent } from '../../components';

export type ProductsListScreenProps = {
  showHeader?: boolean;
  search?: string;
};

export const ProductsListScreen: React.FC<ProductsListScreenProps> = ({
  showHeader,
  search,
}) => {
  const router = useRouter();
  useMixpanel('Store List Screen view');
  const { user } = useAuth();
  const [isOpen, setIsOpen] = useState(false);

  const [isProductEditDialogOpen, setIsProductEditDialogOpen] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState<string | null>(
    null,
  );
  const queryClient = useQueryClient();
  return (
    <ScreenLayout>
      <AppHeader title={'متجري'} />
      <YStack flex={1} paddingTop="$4">
        {user?.active_company && (
          <CompanyProfileTabs
            company={user.active_company}
            myStore={true}
            onEditProduct={(productId) => {
              setSelectedProductId(productId);
              
              // setIsProductEditDialogOpen(true);
            }}
          />
        )}
      </YStack>
      <ZixDialog
        title={'اضافة منتج جديد'}
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
                router.push('/app/products/create');
              }}
            >
              <FilePlus2 size={20} color="#000000" />
              <Text
                fontSize="$2"
                fontWeight="bold"
                color="#000000"
                textAlign="center"
                maxWidth={'$10'}
              >
                اضافة منتج يدويا
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
              <Sparkles size={20} color="#000000" />
              <Text
                fontSize="$2"
                fontWeight="bold"
                color="#000000"
                textAlign="center"
              >
                اضافة منتج بالذكاء الاصطناعي
              </Text>
            </TouchableOpacity>
          </YStack>
        </XStack>
      </ZixDialog>
      {/* <ZixDialog
        title="تعديل المنتج"
        open={isProductEditDialogOpen}
        onOpenChange={setIsProductEditDialogOpen}
        snapPoints={[90]}
      >
        <QueryClientProvider client={queryClient}>
          {selectedProductId && (
            <ProductManagerComponent
              productId={selectedProductId}
              onUpdate={() => {
                setIsProductEditDialogOpen(false);
                setSelectedProductId(null);
              }}
            />
          )}
        </QueryClientProvider>
      </ZixDialog> */}
    </ScreenLayout>
  );
};

export default ProductsListScreen;
