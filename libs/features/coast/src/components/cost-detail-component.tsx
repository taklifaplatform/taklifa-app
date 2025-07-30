import { CartItemTransformer, SimpleCompanyTransformer } from '@zix/api';
import { useCart } from '@zix/services/auth';
import { Dimensions } from 'react-native';
import { YStack } from 'tamagui';
import { CostHeader } from './cost-header';
import { CostListComponent } from './cost-list-component';

export const CostDetailComponent = ({
  company,
  items,
}: {
  company: SimpleCompanyTransformer;
  items: CartItemTransformer[];
}) => {
  const { formatCurrency } = useCart();
  const SCREEN_WIDTH = Dimensions.get('window').width;
  const totalCost = items.reduce((acc, item) => acc + Number(item.total_price), 0);
  return (
    <YStack
      width={SCREEN_WIDTH - 20}
      borderRadius={'$4'}
      padding={'$4'}
      borderWidth={1}
      borderColor="$color3"
      justifyContent="center"
      gap='$4'
      marginVertical={'$3'}
    >
      <CostHeader
        title={company.name ?? ''}
        price={formatCurrency(totalCost)}
        logo={company.logo?.original_url ?? ''}
        items={items}
      />
      <CostListComponent items={items} />
    </YStack>
  );
};

export default CostDetailComponent;
