import { MoreHorizontal, Pencil, Trash2 } from '@tamagui/lucide-icons';
import { useToastController } from '@tamagui/toast';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { CompanyBranchAdminService, ServicesService } from '@zix/api';
import { useAuth, useMixpanel } from '@zix/services/auth';
import { ActionSheet, ActionSheetRef } from '@zix/ui/common';
import { CustomIcon } from '@zix/ui/icons';
import { AppHeader, ScreenLayout } from '@zix/ui/layouts';
import { t } from 'i18next';
import { useRef, useState } from 'react';
import { Alert, Dimensions, FlatList, Linking } from 'react-native';
import { useRouter } from 'solito/router';
import { Button, H4, Text, View, XStack, YStack } from 'tamagui';
export interface ServicesListScreenProps {
  showHeader: boolean;
  driver: boolean;
  edit: boolean;
  search: string;
}

export const BranchesListScreen: React.FC<ServicesListScreenProps> = ({
  showHeader = true,
  driver = false,
  edit = false,
  search,
}) => {
  useMixpanel('Branches List Screen view')
  const SCREEN_WIDTH = Dimensions.get('window').width;
  const router = useRouter();
  const { user, getUrlPrefix, isLoggedIn } = useAuth();
  const actionSheetManagerRef = useRef<ActionSheetRef>(null);
  const queryClient = useQueryClient();
  const toast = useToastController();
  const { data, refetch, isLoading } = useQuery({
    queryFn: () =>
      CompanyBranchAdminService.list({
        company: user?.active_company?.id || '',
      }),
    queryKey: ['CompanyBranchAdminService.list', user?.id, `-${search}`,],
  });


  const [selectedItem, setSelectedItem] = useState(null);
  const { mutateAsync: deleteBranchAsync } = useMutation({
    mutationFn(branch: any) {
      return CompanyBranchAdminService.delete({
        company: branch.company_id,
        companyBranch: branch.id,
      });
    },
    onSuccess() {
      queryClient.refetchQueries({
        queryKey: ['CompanyBranchAdminService.list', user?.id],
      })
      queryClient.refetchQueries({
        queryKey: ['CompanyBranchAdminService.list', user?.active_company?.id],
      })
      toast.show(t('common:branch-deleted-successfully'));
    },
    onError(error) {
      console.log('============')
      console.log('onError::', JSON.stringify(error, null, 2))
      console.log('selectedItem::', JSON.stringify(selectedItem, null, 2))
      console.log('============')
      toast.show(error?.body?.message || t('app:errors.something-went-wrong'), { preset: 'error' });
    }
  })

  const renderItem = ({ item, index }) => (

    <YStack
      backgroundColor='$color2'
      borderRadius={5}
      key={index}
      marginBottom={10}
      marginHorizontal={showHeader && '$4'}
      paddingBottom={'$4'}
    >
      <XStack
        gap="$10"
        onPress={() => router.push(`/app/company/branches/${item.id}`)}
        justifyContent='space-between' alignItems='center' padding={"$4"}
      >
        <XStack flex={1} justifyContent='space-between' alignItems="center" gap="$2">
          <Text color='$color12' fontWeight="bold">
            {item.name}
          </Text>
          <Button
            size="$2"
            iconAfter={<MoreHorizontal />}
            onPress={() => {
              setSelectedItem(item);
              actionSheetManagerRef.current?.open();
            }}
          />
        </XStack>

      </XStack>
      <YStack gap="$4" paddingHorizontal="$4">
        <Text textAlign='left' numberOfLines={3}>{item?.description || ''}</Text>
      </YStack>



    </YStack>
  )

  return (
    <ScreenLayout>
      {showHeader && <AppHeader title={t('common:market')} />}
      <YStack flex={1} paddingTop={15}>
        <FlatList
          showsVerticalScrollIndicator={false}
          refreshing={isLoading}
          onRefresh={refetch}
          style={{ flex: 1 }}
          data={data?.data || []}
          renderItem={renderItem}
          ListEmptyComponent={
            <View flex={1} alignItems='center' gap="$8" paddingTop="$8">
              <CustomIcon name="empty_data" size="$18" color="$color5" />
              <H4>
                {t('common:no-branches-found')}
              </H4>
            </View>
          }
        />
        <ActionSheet
          snapPoints={[33, 25]}
          ref={actionSheetManagerRef}
          title={t('common:settings')}
          actions={[
            {
              name: t('common:edit'),
              icon: <Pencil size="$1" color="$color10" />,
              onPress: () => {
                actionSheetManagerRef.current?.close();
                router.push(`/app/company/branches/${selectedItem?.id}`)
              },
            },
            {
              theme: 'error',
              name: t('common:delete'),
              icon: <Trash2 size="$1" color="$color10" />,
              onPress: () => {
                Alert.alert(
                  t('common:delete'),
                  t('common:confirm-delete'),
                  [
                    {
                      text: t('common:cancel'),
                      onPress: () => actionSheetManagerRef.current?.close(),
                      style: 'cancel',
                    },
                    {
                      text: t('common:remove'),
                      style: 'destructive',
                      onPress: () => {
                        actionSheetManagerRef.current?.close();
                        deleteBranchAsync(selectedItem);
                      },
                    },
                  ],
                );
              },
            },
          ]}
        />
      </YStack>
    </ScreenLayout>
  );
}


export default BranchesListScreen;
