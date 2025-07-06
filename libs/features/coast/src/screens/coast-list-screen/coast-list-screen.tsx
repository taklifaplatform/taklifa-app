import { FileDown, ShoppingBag } from '@tamagui/lucide-icons';
import { useToastController } from '@tamagui/toast';
import { useQueryClient } from '@tanstack/react-query';
import { useAuth, useMixpanel } from '@zix/services/auth';
import { ActionSheetRef } from '@zix/ui/common';
import { CustomIcon } from '@zix/ui/icons';
import { AppHeader, ScreenLayout } from '@zix/ui/layouts';
import { useRef } from 'react';
import { Dimensions, FlatList } from 'react-native';
import { useRouter } from 'solito/router';
import { Button, Text, XStack, YStack } from 'tamagui';
import { CostDetailComponent } from '../../components/cost-detail-component';
export interface ServicesListScreenProps {
  showHeader: boolean;
}

export const CoastListScreen: React.FC<ServicesListScreenProps> = ({
  showHeader = true,
}) => {
  useMixpanel('Coast List Screen view');

  const renderCoastTotal = ({ showButton = true }) => {
    return (
      <YStack
        gap={'$4'}
        theme="accent"
        backgroundColor="$color3"
        padding={'$6'}
        borderRadius={'$4'}
      >
        <XStack justifyContent="space-between">
          <XStack gap={'$2'} alignItems="center">
            <ShoppingBag size={25} color="#000000" />
            <Text fontSize={'$5'} fontWeight={'bold'}>
              المجموع
            </Text>
          </XStack>
          <XStack gap={'$2'} alignItems="center">
            <Text fontSize={'$6'} fontWeight={'bold'}>
              1000
            </Text>
            <CustomIcon name="riyal" size={'$3'} color="#000000" />
          </XStack>
        </XStack>
        {showButton && (
          <Button
            backgroundColor="$color0"
            borderRadius={'$4'}
            height={'$4'}
            icon={<FileDown size={15} color="#FFFFFF" />}
          >
            <Text fontSize={'$2'} fontWeight={'bold'} color="#FFFFFF">
              تحميل عرض السعر
            </Text>
          </Button>
        )}
      </YStack>
    );
  };


  return (
    <ScreenLayout>
      {showHeader && <AppHeader title="التكاليف" />}
      <YStack flex={1} padding={'$2'} marginTop='$3'>
        
        <FlatList
        data={['1','2','3']}
        style={{ flex: 1}}
        ListHeaderComponent={() => renderCoastTotal({ showButton: true })}
        showsVerticalScrollIndicator={false}
        renderItem={({item, index}) => <CostDetailComponent />}
        />
        
      </YStack>
    </ScreenLayout>
  );
};

export default CoastListScreen;
