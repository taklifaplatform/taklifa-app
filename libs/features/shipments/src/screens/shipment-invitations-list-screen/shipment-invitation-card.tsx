import { X } from "@tamagui/lucide-icons";
import { useToastController } from "@tamagui/toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ShipmentInvitationService, ShipmentInvitationTransformer } from "@zix/api";
import { CompanyCard } from "@zix/features/company";
import { UserCard } from "@zix/features/users";
import { ZixButton } from "@zix/ui/common";
import { t } from "i18next";
import { useRouter } from "solito/router";
import { Separator, View, XStack } from "tamagui";

export type ShipmentInvitationCardProps = {
  invitation: ShipmentInvitationTransformer
};

export const ShipmentInvitationCard: React.FC<ShipmentInvitationCardProps> = ({
  invitation
}) => {

  const queryClient = useQueryClient()
  const toast = useToastController()
  const router = useRouter()

  const { mutateAsync, isPending } = useMutation({
    mutationFn() {
      return ShipmentInvitationService.removeShipmentInvitation({
        shipment: invitation.shipment_id,
        shipmentInvitation: invitation.id
      })
    },
    onSuccess() {
      queryClient.refetchQueries({
        queryKey: [
          'ShipmentInvitationService.fetchShipmentInvitations', invitation.shipment_id
        ]
      })
    },
    onError(error: any) {
      toast.show(error?.body?.message || t('app:errors.something-went-wrong'), { preset: 'error' });
    },
  })


  return (
    <View key={invitation.id} margin='$2'>
      {invitation?.driver?.id && <UserCard user={invitation.driver} showContactActions={false} />}
      {invitation?.company?.id && <CompanyCard company={invitation.company} showContactActions={false} />}
      <Separator />
      <XStack padding='$2' gap='$2'>
        <ZixButton
          flex={1}
          theme='error'
          backgroundColor='$color10'
          color='$color1'
          fontWeight='700'
          icon={X}
          disabledStyle={{ backgroundColor: '$color8' }}
          disabled={invitation.status === 'accepted'}
          loading={isPending}
          onPress={() => mutateAsync()}
        >
          {t('common:remove-invitation')}
        </ZixButton>
        {
          invitation.status === 'accepted' && (
            <ZixButton
              themeInverse
              flex={1}
              fontWeight='700'
              onPress={() => router.push(`/app/shipment-manager/${invitation.shipment_id}/proposals/${invitation.proposal_id}`)}
            >
              {t('common:view-proposal')}
            </ZixButton>
          )
        }
      </XStack>
    </View>
  )
}

export default ShipmentInvitationCard;
