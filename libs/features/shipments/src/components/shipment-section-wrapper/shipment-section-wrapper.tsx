import React from 'react';
import { Separator, View } from 'tamagui';

export type ShipmentSectionWrapperProps = {
  children: React.ReactNode;
  hideSeparator?: boolean;
};

export const ShipmentSectionWrapper: React.FC<ShipmentSectionWrapperProps> = ({ children, hideSeparator }) => (
  <>
    <View
      padding="$3"
      backgroundColor={'$color1'}
      borderRadius={'$4'}
      $sm={{ backgroundColor: 'transparent', padding: 0 }}
    >
      {children}
    </View>
    {
      !hideSeparator && (
        <Separator
          borderColor='$color7'
          $gtSm={{ display: 'none' }}
        />
      )

    }
  </>

);

export default ShipmentSectionWrapper;
