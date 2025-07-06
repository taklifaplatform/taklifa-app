import { YStack } from 'tamagui';
import { Dimensions } from 'react-native';
import { CostHeader } from './cost-header';
import {CostListComponent} from './cost-list-component';

export const CostDetailComponent = () => {
  const SCREEN_WIDTH = Dimensions.get('window').width;
  return (
    <YStack
      width={SCREEN_WIDTH - 20}
      borderRadius={'$4'}
      padding={'$4'}
      borderWidth={1}
      borderColor="$color3"
      justifyContent="ceneter"
      gap='$4'
      marginVertical={'$3'}
    >
      <CostHeader
        title='خدمات لياسة الجدران الخارجية '
        price='35,598,362'
       />
       <CostListComponent product={['1','2','3']} />
    </YStack>
  );
};

export default CostDetailComponent;
