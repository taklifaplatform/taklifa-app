import { MessageCircle, X } from "@tamagui/lucide-icons";
import { useToastController } from "@tamagui/toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ShipmentProposalService, ShipmentProposalTransformer } from "@zix/api";
import { CompanyCard } from "@zix/features/company";
import { UserCard } from "@zix/features/users";
import { ZixButton } from "@zix/ui/common";
import { t } from "i18next";
import { Alert } from "react-native";
import { useRouter } from "solito/router";
import { Separator, View, XStack, Text } from "tamagui";

export type ShipmentProposalCardProps = {
  proposal: ShipmentProposalTransformer
};

export const ShipmentProposalCard: React.FC<ShipmentProposalCardProps> = ({
  proposal
}) => {
  const router = useRouter();
  const queryClient = useQueryClient()
  const toast = useToastController()

  const isAccepted = proposal.status === 'accepted'

  const acceptShipmentProposalMutation = useMutation({
    mutationFn() {
      return ShipmentProposalService.acceptShipmentProposal({
        shipment: proposal.shipment_id,
        shipmentProposal: proposal.id
      })
    },
    onSuccess() {
      queryClient.refetchQueries({
        queryKey: [
          'ShipmentProposalService.fetchShipmentProposals',
          proposal.shipment_id
        ]
      })
    },
    onError(error: any) {
      toast.show(error?.body?.message || t('app:errors.something-went-wrong'), { preset: 'error' });
    },
  })

  const declineShipmentProposalMutation = useMutation({
    mutationFn() {
      return ShipmentProposalService.declineShipmentProposal({
        shipment: proposal.shipment_id,
        shipmentProposal: proposal.id
      })
    },
    onSuccess() {
      queryClient.refetchQueries({
        queryKey: [
          'ShipmentProposalService.fetchShipmentProposals',
          proposal.shipment_id
        ]
      })
    },
    onError(error: any) {
      toast.show(error?.body?.message || t('app:errors.something-went-wrong'), { preset: 'error' });
    },
  })

  function onAcceptPress() {
    Alert.alert('Accept', 'Are you sure you want to accept this proposal?', [
      {
        text: 'Cancel',
        style: 'default'

      },
      {
        text: 'Accept',
        style: 'cancel',
        onPress: () => acceptShipmentProposalMutation.mutateAsync()
      }
    ])
  }

  function onDeclinePress() {
    Alert.alert('Accept', 'Are you sure you want to decline this proposal?', [
      {
        text: 'Cancel',
        style: 'default'

      },
      {
        text: 'Decline',
        style: 'destructive',
        onPress: () => declineShipmentProposalMutation.mutateAsync()
      }
    ])
  }

  const renderProposalInfo = () => (
    <XStack padding='$2' gap='$2' alignItems="center">

      <View flex={1}>
        <XStack gap='$1'>
          <Text fontWeight='700'>Cost: </Text>
          <Text>{proposal.cost?.value}</Text>
          <Text fontWeight='600'>{proposal.cost?.currency?.code}</Text>
        </XStack>
        <XStack gap='$1'>
          <Text fontWeight='700'>Fee: </Text>
          <Text>{proposal.fee?.value}</Text>
          <Text fontWeight='600'>{proposal.fee?.currency?.code}</Text>
        </XStack>
      </View>

      <ZixButton
        theme='accent'
        fontWeight='700'
        icon={MessageCircle}
        disabledStyle={{ backgroundColor: '$color8' }}
        onPress={() => router.push(`/app/chat/channels/${proposal.channel_id}`)}
      />
    </XStack>
  )

  const renderActions = () => (
    <XStack padding='$2' gap='$2'>
      <ZixButton
        flex={1}
        theme='error'
        backgroundColor='$color10'
        color='$color1'
        fontWeight='700'
        icon={X}
        disabledStyle={{ backgroundColor: '$color8' }}
        onPress={onDeclinePress}
        disabled={proposal.status === 'declined'}
        loading={declineShipmentProposalMutation.isPending}
      >
        Decline
      </ZixButton>
      {
        proposal.status !== 'accepted' && (
          <ZixButton
            themeInverse
            flex={1}
            fontWeight='700'
            onPress={onAcceptPress}
            disabled={proposal.status === 'accepted'}
            loading={acceptShipmentProposalMutation.isPending}
          >
            Accept
          </ZixButton>
        )
      }

      {
        proposal.status === 'accepted' && (
          <ZixButton
            theme='accent'
            flex={1}
            fontWeight='700'
            onPress={onAcceptPress}
            loading={acceptShipmentProposalMutation.isPending}
          >
            Start Contract
          </ZixButton>
        )
      }
    </XStack>
  )


  return (
    <View key={proposal.id} margin='$2' borderWidth={isAccepted ? '$1' : undefined}>
      {proposal?.driver?.id && <UserCard user={proposal.driver} showContactActions={false} />}
      {proposal?.company?.id && <CompanyCard company={proposal.company} showContactActions={false} />}
      <Separator />
      {renderProposalInfo()}
      <Separator />
      {renderActions()}
    </View>
  )
}

export default ShipmentProposalCard;
