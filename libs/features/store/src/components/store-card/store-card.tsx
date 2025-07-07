

import { useAuth } from '@zix/services/auth';
import React from 'react';

import { useRouter } from 'solito/router';
import { XStack } from 'tamagui';

export type StoreCardProps = {
  store: any,
  showHeader: boolean
}

export const StoreCard: React.FC<StoreCardProps> = ({
  store,
  showHeader = false
}) => {
  const { user, getUrlPrefix } = useAuth()
  const router = useRouter()


  return (
    <XStack
      width='100%'
      gap="$3"
      paddingVertical='$3'
      marginBottom='$4'
      borderRadius='$4'
      borderBottomColor='$color3'
      borderBottomWidth='$1'
    >

    </XStack>
  );
}


export default StoreCard;
