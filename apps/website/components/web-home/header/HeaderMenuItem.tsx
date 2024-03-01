import { usePathname } from '@zix/utils';
import React from 'react';
import { Pressable } from 'react-native';
import { useRouter } from 'solito/router';
import { Text, XStack } from 'tamagui';

export type HeaderMenuItemProps = {
  name: string;
  path: string;
  icon?: React.ReactNode;
  iconAfter?: React.ReactNode;
  $md?: any;
};

export const HeaderMenuItem: React.FC<HeaderMenuItemProps> = ({
  name,
  path,
  icon,
  iconAfter,
  ...props
}) => {
  const router = useRouter();

  const activePath = usePathname();
  console.log('props', props);
  return (
    <Pressable onPress={() => router.push(path)}>
      <XStack
        alignItems="center"
        paddingHorizontal="$6"
        $md={{ paddingHorizontal: '$4' }}
        paddingVertical="$3"
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
        <Text fontWeight={'bold'} fontSize="$5">
          {name}
        </Text>
        {icon ? icon : null}
      </XStack>
    </Pressable>
  );
};
