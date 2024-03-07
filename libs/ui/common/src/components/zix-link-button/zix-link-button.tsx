import {
  Button,
  ButtonProps,
  Spinner,
  TamaguiComponent,
  styled,
} from 'tamagui';
import { usePathname } from '@zix/utils';

import { forwardRef } from 'react';
import { useRouter } from 'solito/router';
import { Link } from 'solito/link';

export type ZixLinkButtonProps = ButtonProps & {
  href: string;
  display?:
    | 'menuItem'
    | 'headerMenu'
    | 'linkItem'
    | 'warningItem'
    | 'textLinkItem';
  menuItem?: boolean;
  headerMenu?: boolean;
};

const CustomButton = styled(Button, {
  variants: {
    headerMenu: {
      true: {
        unstyled: true,
        alignItems: 'center',
        paddingHorizontal: '$6',
        paddingVertical: '$4',
        borderRadius: '$3',
        fontSize: '$5',
        fontWeight: '500',
        borderBottomColor: '$color1',
        flexDirection: 'row',
        hoverStyle: {
          cursor: 'pointer',
          backgroundColor: '$color3',
          borderRadius: '$3',
        },
        $lg: {
          paddingVertical: '$2',
          paddingHorizontal: '$5',
        },
      },
    },
    headerMenuActive: {
      true: {
        backgroundColor: '$color5',
        borderBottomWidth: 2,
      },
    },
    menuItem: {
      true: {
        unstyled: true,
        color: '$color1',
        fontSize: '$5',
        flexDirection: 'row',
        paddingHorizontal: '$2',
        paddingVertical: '$2',
        hoverStyle: {
          backgroundColor: '$color3',
          borderRadius: '$3',
        },
      },
    },
    menuItemActive: {
      true: {
        color: '$color5',
      },
    },
    linkItem: {
      true: {
        unstyled: true,
        color: '$color0',
        fontSize: '$5',
        paddingHorizontal: '$4',
        flexDirection: 'row',
        paddingVertical: '$4',
        hoverStyle: {
          backgroundColor: '$color3',
          borderRadius: '$3',
        },
      },
    },
    warningItem: {
      true: {
        backgroundColor: 'red',
        paddingVertical: '$3',
        paddingHorizontal: '$6',
        color: '$color1',
        $xs: {
          width: '100%',
          paddingVertical: '$2',
          paddingHorizontal: '$10',
        },
      },
    },
  },
});

export const ZixLinkButton = forwardRef(function ZixLinkButtonFunc(
  { href, display, ...props }: ZixLinkButtonProps,
  ref
) {
  const router = useRouter();
  const activePath = usePathname();

  return (
    <Link href={href}>
      <CustomButton
        {...props}
        ref={ref as TamaguiComponent}
        onPress={() => router.push(href)}
        {...(display
          ? { [display]: true, [`${display}Active`]: activePath === href }
          : {})}
      />
    </Link>
  );
});

export default ZixLinkButton;
