import { Button, ScrollView, YStack } from 'tamagui';
// import { ShipmentRoadCard } from '../../../components/ShipmentRoadCard';
// import { ShipmentCard } from '../../../components/ShipmentCard';
// import ShipmentImages from '../../../components/ShipmentImages';
// import QrCard from '../../../components/QrCard';

/* eslint-disable-next-line */
export interface SummaryShipmentScreenProps {}

export function SummaryShipmentScreen(props: SummaryShipmentScreenProps) {
  const data = [
    {
      id: 1,
      title: 'الشحنة',
      categories: [
        {
          id: 1,
          title: 'احذية',
          icon: 'location',
        },
        {
          id: 2,
          title: '10 سم x 50 x 25 ',
          icon: 'location',
        },
        {
          id: 3,
          title: 'كغ 50 ',
          icon: 'location',
        },
        {
          id: 4,
          title: 'قابل للكسر',
          icon: 'location',
        },
      ],
    },
    {
      id: 2,
      title: 'الشحنة',
      categories: [
        {
          id: 1,
          title: '10:00 ص - 11:00 م',
          icon: 'location',
        },
        {
          id: 2,
          title: 'السبت  03 ديسمبر 2023 ',
          icon: null,
        },
      ],
    },
  ];

  return (
    <YStack flex={1} padding="$4">
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* <ShipmentRoadCard />
        <ShipmentCard data={data} title="تفاصيل الشحنة" />
        <ShipmentCard data={data} title="معلومات عن السائق" />
        <ShipmentCard data={data} title="السعر و الاضافات" />
        <ShipmentImages /> */}
        {/* <QrCard /> */}
        <Button
          marginTop="$4"
          backgroundColor="black"
          color={'$color1'}
          fontWeight="600"
        >
          ارسال طلب الخدمة
        </Button>
      </ScrollView>
    </YStack>
  );
}

export default SummaryShipmentScreen;
