
import { ShipmentTransformer } from '@zix/api';
import React from 'react';
import { Text, View, YStack } from 'tamagui';
import ShipmentManagerPreSelectedDriver from '../shipment-manager-pre-selected-driver/shipment-manager-pre-selected-driver';
import ShipmentInlineStepper from './shipment-manager-inline-stepper';


export type ShipmentManagerHeaderProps = {
  shipment?: ShipmentTransformer
  activeStep?: number;
  title?: string;
}

export const ShipmentManagerHeader: React.FC<ShipmentManagerHeaderProps> = ({
  shipment = {},
  activeStep = 1,
  title,
}) => {

  const renderTitle = () => !!title && (
    <Text>
      {title}
    </Text>
  )

  const renderPreSelectedDriver = () => !!shipment.selected_driver_id && (
    <ShipmentManagerPreSelectedDriver shipment={shipment} />
  )
//
  return (
    <YStack gap='$4'>
      {renderPreSelectedDriver()}
      <YStack alignItems='center' gap='$4'>
        <ShipmentInlineStepper totalSteps={!shipment.selected_driver_id ? 5 : 3} activeStep={activeStep} />
        {renderTitle()}
        <View height={2} width={'100%'} backgroundColor='$color3' />
      </YStack>
    </YStack>

  );
}


export default ShipmentManagerHeader;
