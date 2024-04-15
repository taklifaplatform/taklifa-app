import {
  AlignLeft,
  AlignRight,
  ArrowLeft,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  MoveLeft,
  MoveRight,
} from '@tamagui/lucide-icons';
import { useMultiLang } from '@zix/i18n';
import * as React from 'react';
import { Text } from 'react-native';
import { ColorTokens, SizeTokens, Stack, getTokenValue, useStyle } from 'tamagui';

import * as Icons from '../assets';

// create a map of icons with {snake_case_name: ReactComponent}
const IconsMap = Object.keys(Icons).reduce((acc: Record<string, any>, name) => {
  const snakeCaseName = name.replace(/([A-Z])/g, '_$1').toLowerCase();
  // remove fist underscore
  acc[snakeCaseName.slice(1)] = (Icons as any)[name];
  return acc;
}, {});

const iconNames = [
  'web_logo_en',
  'web_logo_ar',
  'aspect_ratio',
  'logo',
  'avatar',
  'circle_avatar',
  'home',
  'orders',
  'create',
  'comment',
  'notifications',
  'chat',
  'apps',
  'success',
  'company',
  'garage',
  'opacity',
  'align-left',
  'align-right',
  'arrow_left',
  'arrow_right',
  'chevron_left',
  'chevron_right',
  'chevrons_left',
  'chevrons_right',
  'large_arrow_left',
  'large_arrow_right',
  'star',
  'half_star',
  'local_shipping',
  'time',
  'package',
  'call',
  'settings',
  'lock',
  'logout',
  'theme',
  'mail',
  'share',
  'secure',
  'book',
  'about',
  'empty_notification',
  'empty_chat',
  'empty_data',
  'empty_folder',
  'wallet',
  'location',
  'car',
  'followed',
  'more',
  'facebook',
  'instagram',
  'snapchat',
  'google_play',
  'app_store',
  'help',
  'home_info',
  'translate',
  'account',
  'ringing',
  'search',
  'flip',
  'search_track',
  'find_track',
  'client',
  'company_shipping',
  'shipping',
  'tik_tok',
  'map',
  'list',
  'edit',
  'star_location',
  'drawer',
  'matricule',
  'alert_cercle',
  'user_info',
  'alert',
  'bolt',
  'touch_app',
  'category',
  'shield_with_heart',
  // vehicles
  'vehicle_a',
  'vehicle_b',
  'vehicle_c',
  'store',
  'job',
  'radio_button_checked',
  'dimension_box',
  'box_add',
  'location_check',
  'contact_calendar',
  'paper_money',
  'near_me'
];

export type CustomIconName = (typeof iconNames)[number];
export interface CustomIconProps {
  name: CustomIconName;

  size?: SizeTokens;
  color?: ColorTokens | string | null;

  width?: SizeTokens;
  height?: SizeTokens;
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
    color: $color,
  });
  const { isRtl } = useMultiLang();

  if ($name === 'arrow_left' && isRtl) {
    $name = 'arrow_right';
  } else if ($name === 'arrow_right' && isRtl) {
    $name = 'arrow_left';
  }

  if ($name === 'chevron_left' && isRtl) {
    $name = 'chevron_right';
  } else if ($name === 'chevron_right' && isRtl) {
    $name = 'chevron_left';
  }

  if ($name === 'chevrons_left' && isRtl) {
    $name = 'chevrons_right';
  } else if ($name === 'chevrons_right' && isRtl) {
    $name = 'chevrons_left';
  }

  if ($name === 'large_arrow_left' && isRtl) {
    $name = 'large_arrow_right';
  } else if ($name === 'large_arrow_right' && isRtl) {
    $name = 'large_arrow_left';
  }

  if ($name === 'align_right' && isRtl) {
    $name = 'align_left';
  } else if ($name === 'align_left' && isRtl) {
    $name = 'align_right';
  }



  if ($name === 'align_right') {
    return <AlignRight size={$size} color={style.color} />;
  }

  if ($name === 'align_left') {
    return <AlignLeft size={$size} color={style.color} />;
  }

  if ($name === 'large_arrow_left') {
    return <MoveLeft size={$size} color={style.color} />;
  }

  if ($name === 'large_arrow_right') {
    return <MoveRight size={$size} color={style.color} />;
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
          textAlignVertical: 'center',
        }}
      >
        ?{$name}?
      </Text>
    );
  }

  const Icon = IconsMap[$name];

  return (
    <Stack width={style.width} height={style.height} {...props}>
      <Icon width='100%' height='100%' color={style.color} />
    </Stack>
  );
};

export default CustomIcon;
