
import { ShipmentTransformer } from '@zix/api';
import React, { useMemo } from 'react';
import { Text, View, YStack } from 'tamagui';
import ShipmentManagerPreSelectedDriver from '../shipment-manager-pre-selected-driver/shipment-manager-pre-selected-driver';
import ShipmentInlineStepper from './shipment-manager-inline-stepper';
import ShipmentManagerPreSelectedCompany from '../shipment-manager-pre-selected-company/shipment-manager-pre-selected-company';


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

  const renderPreSelectedCompany = () => !!shipment.selected_company_id && (
    <ShipmentManagerPreSelectedCompany shipment={shipment} />
  )

  const hasPreSelectedShipmentProvider = useMemo(() => {
    return !!shipment.selected_company_id || !!shipment.selected_driver_id;
  }, [shipment.selected_company_id, shipment.selected_driver_id])

  return (
    <YStack gap='$4'>
      {renderPreSelectedDriver()}
      {renderPreSelectedCompany()}
      <YStack alignItems='center' gap='$4'>
        <ShipmentInlineStepper totalSteps={!hasPreSelectedShipmentProvider ? 5 : 3} activeStep={activeStep} />
        {renderTitle()}
        <View height={2} width={'100%'} backgroundColor='$color3' />
      </YStack>
    </YStack>

  );
}


export default ShipmentManagerHeader;
