import * as React from 'react';
import { Text } from 'react-native';
import { SizeTokens, Stack, useStyle } from 'tamagui';
import {
  ArrowLeft,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight
} from '@tamagui/lucide-icons';
import { I18nManager } from 'react-native';

import * as Icons from '../assets';

// create a map of icons with {snake_case_name: ReactComponent}
const IconsMap = Object.keys(Icons).reduce((acc: Record<string, any>, name) => {
  const snakeCaseName = name.replace(/([A-Z])/g, '_$1').toLowerCase();
  // remove fist underscore
  acc[snakeCaseName.slice(1)] = (Icons as any)[name];
  return acc;
}, {});

export interface CustomIconProps {
  name:
    | 'logo'
    | 'avatar'
    | 'circle_avatar'
    | 'home'
    | 'orders'
    | 'create'
    | 'notifications'
    | 'chat'
    | 'apps'
    | 'success'
    | 'arrow_left'
    | 'arrow_right'
    | 'chevron_left'
    | 'chevron_right'
    | 'chevrons_left'
    | 'chevrons_right';

  size?: SizeTokens;
  color?: string;
}

export const CustomIcon: React.FC<CustomIconProps> = ({
  size,
  color,
  name,
  ...props
}: CustomIconProps) => {
  const $size = size ?? '$1.5';
  const $color = color ?? 'currentColor';
  let $name = name?.replace(/-/g, '_') ?? 'home';
  const style = useStyle({
    width: $size,
    height: $size,
    color: $color
  });

  if ($name === 'arrow_left' && I18nManager.isRTL) {
    $name = 'arrow_right';
  } else if ($name === 'arrow_right' && I18nManager.isRTL) {
    $name = 'arrow_left';
  }

  if ($name === 'chevron_left' && I18nManager.isRTL) {
    $name = 'chevron_right';
  } else if ($name === 'chevron_right' && I18nManager.isRTL) {
    $name = 'chevron_left';
  }

  if ($name === 'chevrons_left' && I18nManager.isRTL) {
    $name = 'chevrons_right';
  } else if ($name === 'chevrons_right' && I18nManager.isRTL) {
    $name = 'chevrons_left';
  }

  if ($name === 'chevron_left') {
    return <ChevronLeft size={$size} color={style.color} />;
  }

  if ($name === 'chevron_right') {
    return <ChevronRight size={$size} color={style.color} />;
  }

  if ($name === 'chevrons_left') {
    return <ChevronsLeft size={$size} color={style.color} />;
  }

  if ($name === 'chevrons_right') {
    return <ChevronsRight size={$size} color={style.color} />;
  }

  if ($name === 'arrow_left') {
    return <ArrowLeft size={$size} color={style.color} />;
  }

  if ($name === 'arrow_right') {
    return <ArrowRight size={$size} color={style.color} />;
  }


  if (!IconsMap[$name]) {
    return (
      <Text
        style={{
          fontSize: (parseInt(style.width?.toString() || '0') * 0.8) as number,
          color: style.color,
          textAlign: 'center',
          textAlignVertical: 'center'
        }}
      >
        ?{$name}?
      </Text>
    );
  }

  const Icon = IconsMap[$name];

  return (
    <Stack width={style.width} height={style.height} {...props}>
      <Icon width={style.width} height={style.height} color={style.color} />
    </Stack>
  );
};

export default CustomIcon;
