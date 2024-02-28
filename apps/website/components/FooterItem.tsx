import { usePathname } from '@zix/utils';
import React from 'react';
import { Pressable } from 'react-native';
import { useRouter } from 'solito/router';
import { Text } from 'tamagui';

export type FooterItemProps = {
  name: string;
  path: string;
  icon?: React.ReactNode;
  iconAfter?: React.ReactNode;
  $md?: any;
};

export const FooterItem: React.FC<FooterItemProps> = ({
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
      
        {iconAfter ? iconAfter : null}
        <Text {...props} fontSize="$5">
          {name}
        </Text>
        {icon ? icon : null}
      
    </Pressable>
  );
};
