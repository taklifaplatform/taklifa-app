import {
  Button,
  ButtonProps,
  Spinner,
  TamaguiComponent,
  styled
} from 'tamagui';

import { forwardRef } from 'react';

export type ZixButtonProps = ButtonProps & {
  loading?: boolean;
  display?: 'buttonItem';
  buttonItem?: boolean;
};
const CustomButton = styled(Button, {
  variants: {
    buttonItem: {
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
  },
});

export const ZixButton = forwardRef(function ZixButtonFunc(
  { display, loading, ...props }: ZixButtonProps,
  ref,
) {
  return (
    // <Button
    //   {...props}
    //   ref={ref as TamaguiComponent}
    //   {...(loading && {
    //     icon: <Spinner />,
    //     disabled: true,
    //   })}
    // />
    <CustomButton
      {...props}
      pressStyle={{
        opacity: 0.7,
      }}
      ref={ref as TamaguiComponent}
      // onPress={() => href ? router.push(href) : null}
      {...(display
        ? { [display]: true }
        : {})}
      {...(loading && {
        icon: <Spinner />,
        disabled: true,
      })}
    />
  );
});

export default ZixButton;
