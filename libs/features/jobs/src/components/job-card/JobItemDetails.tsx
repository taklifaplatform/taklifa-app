import React from 'react';
import { Stack, Text } from 'tamagui';
import { t } from 'i18next';

type JobItemDetailsProps = {
  item: string;
  title: string;
  icon: React.ReactNode;
};

const JobItemDetails = ({ item, title, icon }: JobItemDetailsProps) => {
  return (
    <Stack
      flexDirection="row"
      alignItems="center"
      gap="$2"
      $sm={{ flexDirection: 'column', gap: '$2', alignItems: 'flex-start' }}
    >
      {icon}
      <Text
        fontSize={12}
        fontWeight={'600'}
        color={'$gray9'}
        $sm={{
          fontSize: 8,
          fontWeight: '600',
        }}
      >
        {t(title)}
      </Text>
      <Text
        fontSize={12}
        fontWeight={'600'}
        $sm={{
          fontSize: 8,
          fontWeight: '400',
        }}
      >
        {item}
      </Text>
    </Stack>
  );
};

export default JobItemDetails;
