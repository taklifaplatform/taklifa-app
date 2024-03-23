import React from 'react';

import { Stack, Text, YStack, styled } from 'tamagui';
import {
  IVariantOption,
  VariantOption,
  VariantOptionType,
} from './variant-option';

export interface ZixVariantOptionsWidgetProps {
  icon?: React.ReactNode;
  label?: string;
  options: IVariantOption[];
  variant: 'details' | 'card' | 'location';
  optionVariant: VariantOptionType;
  labelBold?: boolean;
}

const ZixVariantOptionsWidgetStack = styled(Stack, {
  variants: {
    details: {
      true: {
        width: '100%',
        flexDirection: "row",
        flexWrap: "wrap",
        marginRight: "$3",
        marginTop: "$3",
        gap: "$3",
        $sm: {
          width: '100%',
          flexDirection: 'column',
        }
      },

    },
    location: {
      true: {
        width: '100%',
        flexDirection: "column",
        gap: "$3",
      }
    },
    card: {
      true: {
        width: '100%',
        flexDirection: "row",
        flexWrap: "wrap",
        gap: "$3",
      }
    }
  }
});
const ZixVariantOptionsWidgetText = styled(Text, {
  variants: {
    details: {
      true: {
        fontSize: 18,
        fontWeight: '600',
        color: '$color5',
        $sm: {
          fontSize: 18,
        }
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
> = ({ icon, label, options, labelBold, optionVariant, variant, ...props }) => {
  return (
    <YStack width={'100%'}>
      <Stack flexDirection='row' flexWrap='wrap' gap="$3" alignItems="center">
        {icon}
        <ZixVariantOptionsWidgetText
          {...(variant ? { [variant]: true } : {})}
        >
          {label}
        </ZixVariantOptionsWidgetText>
      </Stack>
      <ZixVariantOptionsWidgetStack
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
