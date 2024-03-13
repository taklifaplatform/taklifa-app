import { Check, X } from '@tamagui/lucide-icons';
import { useQuery } from '@tanstack/react-query';
import { JobService } from '@zix/api';
import {
  BudgetShipment,
  DefinitionSender,
  HeaderShipment,
  OrderDescription,
  ShipmentCode,
  ShipmentDetails,
  ShipmentDirection,
} from '@zix/features/shipments';
import { ZixLinkButton } from '@zix/ui/common';
import { t } from 'i18next';
import { RefreshControl } from 'react-native';
import { createParam } from 'solito';
import { ScrollView, Separator, XStack, YStack } from 'tamagui';

/* eslint-disable-next-line */
export interface JobDetailsScreenProps {}

const { useParam } = createParam<{ job: string }>();

export const JobDetailsScreen: React.FC<JobDetailsScreenProps> = () => {
  const [jobId] = useParam('job');

  const { data, isLoading, refetch } = useQuery({
    queryKey: ['JobService.retrieveJob', { id: jobId }],
    queryFn: () => JobService.retrieveJob({ job: jobId || '' }),
  });

  const job = data?.data;
  return (
    <ScrollView
      refreshControl={
        <RefreshControl refreshing={isLoading} onRefresh={refetch} />
      }
      style={{
        flex: 1,
        marginHorizontal: 16,
        marginVertical: 16,
      }}
    >
      <YStack gap="$3">
        <HeaderShipment
          shipment={job || {}}
          demandJob={`${t('job:job-demand')}`}
          publishedJob={`${t('job:job-published')}`}
        />
        <Separator borderColor={'$gray7'} width={'100%'} />
        <OrderDescription items={job?.items} />
        <Separator borderColor={'$gray7'} width={'100%'} />
        <ShipmentDirection shipment={job || {}} />
        <Separator borderColor={'$gray7'} width={'100%'} />
        <ShipmentDetails shipment={job || {}} paddingVertical="$4"/>
        <Separator borderColor={'$gray7'} width={'100%'} />
        <BudgetShipment shipment={job || {}} />
        <ShipmentCode codeId={job?.id || ''} marginVertical="$4" />
        <DefinitionSender shipment={job || {}} />
        <XStack width={'100%'} gap="$2" justifyContent="space-between">
          <ZixLinkButton
            href={`/`}
            icon={<Check size="$1" />}
            fontSize={15}
            fontWeight={'600'}
            paddingHorizontal="$8"
          >
            {t('job:shipment-accept')}
          </ZixLinkButton>
          <ZixLinkButton
            href={`/`}
            icon={<X size="$1" />}
            backgroundColor={'red'}
            color={'$color1'}
            fontSize={15}
            fontWeight={'600'}
            paddingHorizontal="$8"
          >
            Remove
          </ZixLinkButton>
        </XStack>
      </YStack>
    </ScrollView>
  );
};

export default JobDetailsScreen;
