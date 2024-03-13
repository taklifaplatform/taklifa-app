import React from 'react';

import { Stack, Text, XStack, YStack, styled } from 'tamagui';
import {
  IVariantOption,
  VariantOption,
  VariantOptionType,
} from './variant-option';

export interface ZixVariantOptionsWidgetProps {
  icon?: React.ReactNode;
  label?: string;
  options: IVariantOption[];
  variant:  'details' | 'card' | 'location'; 
  optionVariant: VariantOptionType;
  labelBold?: boolean;
}

const ZixVariantOptionsWidgetStack = styled(Stack, {
  variants: {
    details: {
      true: {
        width:'100%',
        flexDirection:"row",
        flexWrap:"wrap",
        marginRight:"$3",
        marginTop:"$3",
        gap:"$3",
        $sm:{
          width: '100%',
          flexDirection: 'column',
        }
      },
    
    },
    location: {
      true: {
        width:'100%',
        flexDirection:"column",
        gap:"$3",
      }
    },
    card: {
      true: {
        width:'100%',
        flexDirection:"row",
        $sm:{ width: '100%' },
        justifyContent:"space-around"
      }
    }
  }
});
const ZixVariantOptionsWidgetText = styled(Text, {
  variants: {
    details: {
      true: {
        fontSize: 18,
        fontWeight:'600',
        color:'$color5',
        $sm:{
          fontSize: 18,
          fontWeight: '600',
          color: '$color5',
        }
      }
    },
    location: {
      true: {
        fontSize: 15,
        fontWeight:'600',
        color:'$color5',
        $sm:{
          fontSize: 8,
          fontWeight: '600',
          color: '$color5',
        }
      }
    },
    card: {
      true: {
        fontSize: 25,
        fontWeight:'400',
        color:'$color5',
        $sm:{
          fontSize: 18,
          fontWeight: '400',
          color: '$color',
        }
      }
    }
  }
});

export const ZixVariantOptionsWidget: React.FC<
  ZixVariantOptionsWidgetProps
> = ({ icon, label, options, labelBold, optionVariant,variant, ...props }) => {
  return (
    <YStack width={'100%'}>
      <XStack gap="$3" alignItems="center">
        {icon}
        <ZixVariantOptionsWidgetText
        {...(variant ? { [variant]: true } : {})}
        >
          {label}
        </ZixVariantOptionsWidgetText>
      </XStack>
      <ZixVariantOptionsWidgetStack
      {...(variant ? { [variant]: true } : {})}
      >
        {options.map((option, index) => (
          <VariantOption key={index} option={option} variant={optionVariant} />
        ))}
      </ZixVariantOptionsWidgetStack>
    </YStack>
  );
};

export default ZixVariantOptionsWidget;
