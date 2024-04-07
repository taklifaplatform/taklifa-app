import React from 'react';

import { Stack, Text, ThemeableStackProps, YStack, styled } from 'tamagui';
import {
  IVariantOption,
  VariantOption,
  VariantOptionType,
} from './variant-option';

export interface ZixVariantOptionsWidgetProps {
  icon?: React.ReactNode;
  label?: string;
  labelContainerProps?: ThemeableStackProps;
  options: IVariantOption[];
  variant: 'details' | 'card' | 'location';
  optionVariant: VariantOptionType;
  labelBold?: boolean;
}

const ZixVariantOptionsWidgetStack = styled(Stack, {
  variants: {
    details: {
      true: {
        flexDirection: "row",
        flexWrap: "wrap",
        marginTop: "$3",
        $sm: {
          flexDirection: 'column',
          paddingLeft: "$4",
        }
      },

    },
    location: {
      true: {
        width: '100%',
        flexDirection: "column",
      }
    },
    card: {
      true: {
        width: '100%',
        flexDirection: "row",
        flexWrap: "wrap",
      }
    }
  }
});
const ZixVariantOptionsWidgetText = styled(Text, {
  variants: {
    details: {
      true: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '$color10',
      }
    },
    location: {
      true: {
        fontSize: 15,
        fontWeight: '600',
        color: '$color5',
        $sm: {
          fontSize: 8,
        }
      }
    },
    card: {
      true: {
        fontSize: 25,
        fontWeight: '400',
        $sm: {
          fontSize: 18,
        }
      }
    }
  }
});

export const ZixVariantOptionsWidget: React.FC<
  ZixVariantOptionsWidgetProps
> = ({ icon, label, options, labelBold, optionVariant, variant, labelContainerProps = {}, ...props }) => {
  return (
    <YStack width={'100%'}>
      {
        !!label && (
          <Stack
            {...labelContainerProps}
            flexDirection='row' flexWrap='wrap' gap="$3" alignItems="center"
          >
            {icon}
            <ZixVariantOptionsWidgetText
              {...(variant ? { [variant]: true } : {})}
            >
              {label}
            </ZixVariantOptionsWidgetText>
          </Stack>
        )
      }
      <ZixVariantOptionsWidgetStack
        gap="$2"
        {...(variant ? { [variant]: true } : {})}
      >
        {options.map((option, index) => (
          <VariantOption theme={option.theme} key={index} option={option} variant={optionVariant} />
        ))}
      </ZixVariantOptionsWidgetStack>
    </YStack>
  );
};

export default ZixVariantOptionsWidget;
