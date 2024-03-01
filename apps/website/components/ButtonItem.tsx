import { usePathname } from '@zix/utils';
import React from 'react';
import { Pressable } from 'react-native';
import { useRouter } from 'solito/router';
import { Button, Stack, Text, XStack } from 'tamagui';

export type ButtonItemProps = {
  name: string;
  path: string;
  icon?: React.ReactNode;
  iconAfter?: React.ReactNode;
  $md?: any;
};

export const ButtonItem: React.FC<ButtonItemProps> = ({
  name,
  path,
  icon,
  iconAfter,
  ...props
}) => {
  const router = useRouter();

  const activePath = usePathname();
  console.log("props", props)
  return (
    <Pressable onPress={() => router.push(path)}>
      <XStack
        alignItems='center'
        justifyContent='center'
        borderRadius={'$2'}
        backgroundColor={activePath == path ? '$color5' : 'transparent'}
        borderBottomWidth={activePath == path ? 2 : 0}
        borderBottomColor="$color1"
        gap="$3"
        hoverStyle={{
          cursor: 'pointer',
        }}
        {...props}
      >
        {iconAfter ? iconAfter : null}
        <Text color={props?.color} fontWeight='700' fontSize="12px">
          {name}
        </Text>
        {icon ? icon : null}
      </XStack>
    </Pressable>
  );
};
