import { MessageCircle } from '@tamagui/lucide-icons';
import { useQuery } from '@tanstack/react-query';
import { ShipmentProposalService, ShipmentTransformer } from '@zix/api';
import { CompanyCard } from '@zix/features/company';
import { UserCard } from '@zix/features/users';
import { ZixButton } from '@zix/ui/common';
import { t } from 'i18next';
import React, { useMemo } from 'react';
import { useRouter } from 'solito/router';
import { Button, Text, XStack, YStack } from 'tamagui';

export type ShipmentProposalActionsProps = {
  shipment: ShipmentTransformer;
  variant: 'shipments' | 'jobs';
  urlPrefix: string;
  isDetail?: boolean;
  isCancelled?: boolean;
};

export const ShipmentProposalActions: React.FC<ShipmentProposalActionsProps> = ({
  shipment,
  urlPrefix,
  variant,
  isDetail,
  isCancelled
}) => {
  const router = useRouter();

  const { data } = useQuery({
    queryFn: () => ShipmentProposalService.getPermissions({
      shipment: shipment.id,
    }),
    queryKey: ['ShipmentProposalService.getPermissions', shipment.id],
  })

  const permission = useMemo(() => data?.data, [data]);
  const proposal = useMemo(() => permission?.proposal, [permission]);

  if (!isDetail) {
    return null
  }
  if (permission?.can_submit) {
    return (
      <Button
        onPress={() => router.push(`${urlPrefix}/${shipment.id}/create-proposal`)}
        flex={1}
        fontWeight="bold"
        themeInverse
      >

        {t('plain:Submit Proposal')}
      </Button>
    );
  }

  if (permission?.has_proposal && proposal) {
    return (
      <YStack backgroundColor='$color1' gap='$2'>
        {proposal?.driver?.id && <UserCard user={proposal.driver} showContactActions={false} />}
        {proposal?.company?.id && <CompanyCard company={proposal.company} showContactActions={false} />}

        <XStack padding='$2' gap='$2' alignItems="center">

          <XStack gap='$1' flex={0.5}>
            <Text fontWeight='700'>{t('plain:Cost')}: </Text>
            <Text>{proposal.cost?.value}</Text>
            <Text fontWeight='600'>{proposal.cost?.currency?.code}</Text>
          </XStack>
          <XStack gap='$1'>
            <Text fontWeight='700'>{t('plain:Fee')}: </Text>
            <Text>{proposal.fee?.value}</Text>
            <Text fontWeight='600'>{proposal.fee?.currency?.code}</Text>
          </XStack>
        </XStack>
       {!isCancelled && <XStack gap='$2'>
          <Button
            onPress={() => router.push(`${urlPrefix}/${shipment.id}/proposals/${proposal.id}/edit`)}
            flex={1}
            fontWeight="bold"
            themeInverse
          >
            {t('common:edit-proposal')}
          </Button>

          <ZixButton
            theme='accent'
            fontWeight='700'
            icon={MessageCircle}
            disabledStyle={{ backgroundColor: '$color8' }}
            onPress={() => router.push(`/app/chat/channels/${permission.proposal?.channel_id}`)}
          />
        </XStack>}
      </YStack>

    );
  }

  return null;
};

export default ShipmentProposalActions;
