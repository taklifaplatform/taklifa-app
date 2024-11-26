
import { useQuery } from '@tanstack/react-query';
import { ShipmentContractService, ShipmentTransformer } from '@zix/api';
import { ZixButton } from '@zix/ui/common';
import InformationAboutDriver from '../../information-about-driver/information-about-driver';
import { XStack, View } from 'tamagui';
import { MessageCircle, X } from '@tamagui/lucide-icons';
import { InformationAboutCompany } from '../../information-about-company/information-about-company';
import { useRouter } from 'solito/router';
import { Alert } from 'react-native';

export type CustomerShipmentContractActionsProps = {
  shipment: ShipmentTransformer
}


export const CustomerShipmentContractActions: React.FC<CustomerShipmentContractActionsProps> = ({
  shipment
}) => {
  const router = useRouter();
  const { data } = useQuery({
    queryFn: () => shipment.active_contract_id ? ShipmentContractService.fetchShipmentContract({
      shipmentContract: shipment.active_contract_id
    }) : undefined,
    queryKey: ['ShipmentContractService.fetchShipmentContract', shipment.active_contract_id]
  })


  const isCancelled = shipment.status === 'cancelled';
  // on Cancel Contract
  const onCancelContract = () => {
    if (isCancelled) {
      return;
    }
    if (shipment.active_contract_id) {
      // alert to confirm with confirm or cancel
      Alert.alert(
        'Cancel Contract',
        'Are you sure you want to cancel the contract?',
        [
          {
            text: 'Cancel',
            style: 'cancel'
          },
          {
            text: 'Confirm',
            style: 'destructive',
            onPress: async () => {
              await ShipmentContractService.cancelContract({
                shipmentContract: shipment?.active_contract_id
              });
              router.back();
            }
          }
        ]
      )
    }
  }

  return (
    <View>
      {!!data?.data?.driver?.id && <InformationAboutDriver driver={data?.data?.driver} channelId={data?.data?.channel_id} />}
      {!!data?.data?.company?.id && <InformationAboutCompany company={data?.data?.company} channelId={data?.data?.channel_id} />}
      <XStack gap="$2" paddingVertical="$4">
        {!!data?.data?.channel_id && (
          <ZixButton
            onPress={() => router.push(`/app/chat/channels/${data?.data?.channel_id}`)}
            theme='accent'
            flex={1}
            fontWeight="bold"
            fontSize='$1'
            icon={MessageCircle}
          >
            Chat
          </ZixButton>
        )}

        <ZixButton
          flex={1}
          theme={isCancelled ? null : 'error'}
          themeInverse
          fontWeight="bold"
          backgroundColor='$color10'
          fontSize='$1'
          icon={X}
          onPress={onCancelContract}
        >
          {isCancelled ? "Cancelled" : "Cancel Contract"}
        </ZixButton>
      </XStack>
    </View>
  );
}


export default CustomerShipmentContractActions;
