
import { useQuery } from '@tanstack/react-query';
import { CompaniesService, ShipmentTransformer } from '@zix/api';
import { CompanyInfoRow } from '@zix/features/company';
import { MediaAvatar } from '@zix/ui/common';
import React from 'react';

import { Text, XStack, YStack } from 'tamagui';

export type ShipmentManagerPreSelectedCompanyProps = {
  shipment: ShipmentTransformer;
}

export const ShipmentManagerPreSelectedCompany: React.FC<ShipmentManagerPreSelectedCompanyProps> = ({
  shipment
}) => {
  const { data } = useQuery({
    queryFn: () => shipment.selected_company_id ? CompaniesService.retrieveCompany({
      company: shipment.selected_company_id
    }) : undefined,
    queryKey: ['CompaniesService.retrieveCompany', shipment.selected_company_id]
  })

  const company = data?.data



  if (!company && shipment.selected_company_id) {
    return (
      <XStack backgroundColor='$color2' height='$8' padding='$4' borderRadius='$4'></XStack>
    )
  }

  if (!company) {
    return null
  }

  return (
    <XStack backgroundColor='$color2' padding='$4' borderRadius='$4'>
      <XStack gap='$4' alignItems='center'>
        <MediaAvatar
          media={company.logo}
          size='$4'
        />
        <YStack gap='$2'>
          <Text color='$color12' fontWeight="bold">
            {company?.name}
          </Text>
          <CompanyInfoRow company={company} gap='$2' />
        </YStack>
      </XStack>
    </XStack>
  );
}


export default ShipmentManagerPreSelectedCompany;
