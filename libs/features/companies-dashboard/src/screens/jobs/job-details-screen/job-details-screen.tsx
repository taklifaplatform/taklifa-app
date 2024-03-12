import { useQuery } from '@tanstack/react-query';
import { JobService } from '@zix/api';
import {
  BudgetShipment,
  HeaderShipment,
  OrderDescription,
  ShipmentDetails,
  ShipmentDirection,
  TotalCostOfShipment,
} from '@zix/features/shipments';
import { t } from 'i18next';
import { SectionList } from 'react-native';
import { createParam } from 'solito';
import { ScrollView, Separator, YStack } from 'tamagui';

/* eslint-disable-next-line */
export interface JobDetailsScreenProps {}

const { useParam } = createParam<{ job: string }>();

export const JobDetailsScreen: React.FC<JobDetailsScreenProps> = () => {
  const [jobId] = useParam('job');

  const { data } = useQuery({
    queryKey: ['JobService.retrieveJob', { id: jobId }],
    queryFn: () => JobService.retrieveJob({ job: jobId || '' }),
  });

  const job = data?.data;
  return (
    // <ScrollView gap='$3' padding='$4'
    // style={{
    //   flex: 1,
    //   marginHorizontal: 16,
    //   marginVertical: 16,
    // }}
    // }}>
    //   <HeaderShipment
    //   shipment={job || {}}
    //   demandJob={`${t('job:job-demand')}`}
    //   publishedJob={`${t('job:job-published')}`}
    //    />
    //    <TotalCostOfShipment
    //     TotalShipment={`${t('job:total-cost-of-shipment')}`}
    //     shipment={job || {}}
    //     />
    //     <Separator borderColor={'$gray7'} width={'100%'} />
    //     <OrderDescription
    //     items={job?.items}
    //     />
    //     <Separator borderColor={'$gray7'} width={'100%'} />
    //     <ShipmentDirection />
    //     <Separator borderColor={'$gray7'} width={'100%'} />
    //     <ShipmentDetails
    //     shipment={job || {}}
    //     />
    // </ScrollView>
    <SectionList
      style={{
        flex: 1,
        marginHorizontal: 16,
        marginVertical: 16,
      }}
      sections={[
        {
          key: 'Header',
          data: [job],
          renderItem: ({ item }) => (
            <HeaderShipment
              shipment={item || {}}
              demandJob={`${t('job:job-demand')}`}
              publishedJob={`${t('job:job-published')}`}
            />
          ),
        },
        {
          key: 'TotalCost',
          data: [job],
          renderItem: ({ item }) => (
            <TotalCostOfShipment
              TotalShipment={`${t('job:total-cost-of-shipment')}`}
              shipment={item || {}}
            />
          ),
        },
        {
          key: 'Separator',
          data: [job],
          renderItem: () => (
            <Separator
              marginVertical="$4"
              borderColor={'$gray7'}
              width={'100%'}
            />
          ),
        },
        {
          key: 'OrderDescription',
          data: [job],
          renderItem: ({ item }) => <OrderDescription items={item?.items} />,
        },
        {
          key: 'Separator',
          data: [job],
          renderItem: () => (
            <Separator
              marginVertical="$4"
              borderColor={'$gray7'}
              width={'100%'}
            />
          ),
        },
        {
          key: 'ShipmentDirection',
          data: [job],
          renderItem: ({ item }) => <ShipmentDirection shipment={item || {}} />,
        },
        {
          key: 'Separator',
          data: [job],
          renderItem: () => (
            <Separator
              marginVertical="$4"
              borderColor={'$gray7'}
              width={'100%'}
            />
          ),
        },
        {
          key: 'ShipmentDetails',
          data: [job],
          renderItem: ({ item }) => <ShipmentDetails shipment={item || {}} />,
        },
        {
          key: 'Separator',
          data: [job],
          renderItem: () => (
            <Separator
              marginVertical="$4"
              borderColor={'$gray7'}
              width={'100%'}
            />
          ),
        },
        {
          key: 'Budget',
          data: [job],
          renderItem: ({ item }) => <BudgetShipment shipment={item || {}} />,
        },
      ]}
      keyExtractor={(item, index) => index.toString()}
    />
  );
};

export default JobDetailsScreen;
