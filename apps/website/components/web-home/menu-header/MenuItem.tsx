import React from 'react';
import { Pressable } from 'react-native';
import { useRouter } from 'solito/router';
import { Text, XStack } from 'tamagui';

export type MenuItemProps = {
  name: string;
  path: string;
  icon?: React.ReactNode;
  iconAfter?: React.ReactNode;
  $md?: any;
};

export const MenuItem: React.FC<MenuItemProps> = ({
  name,
  path,
  icon,
  iconAfter,
  ...props
}) => {
  const router = useRouter();

  console.log('props', props);
  return (
    <Pressable onPress={() => router.push(path)}>
      <XStack
        alignItems="center"
        paddingVertical="$2"
        backgroundColor={'transparent'}
        borderBottomWidth={0}
        gap="$3"
        hoverStyle={{
          cursor: 'pointer',
        }}
        {...props}
      >
        {iconAfter ? iconAfter : null}
        <Text fontWeight={'bold'} fontSize="$5">
          {name}
        </Text>
        {icon ? icon : null}
      </XStack>
    </Pressable>
  );
};
