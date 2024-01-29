import { ShipmentCard } from '@zix/app/ui/sawaeed';

import { FlatList } from 'react-native';

/* eslint-disable-next-line */
export interface OrdersScreenProps {}

const data = [1, 2, 3, 4];

export function OrdersScreen(props: OrdersScreenProps) {
  const renderItem = ({ item }) => <ShipmentCard />;
  return <FlatList data={data} renderItem={renderItem} />;
}

export default OrdersScreen;
