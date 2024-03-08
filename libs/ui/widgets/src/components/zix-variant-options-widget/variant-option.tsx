import React from 'react';
import { Stack, Text, ThemeableStackProps, styled } from 'tamagui';

export type IVariantOption = {
  icons: React.ReactNode;
  name: string;
  value: string;
};

export type VariantOptionType = 'details' | 'card' | 'location'

export type VariantOptionProps = ThemeableStackProps & {
  option: IVariantOption;

  variant?: VariantOptionType;
};

const VariantStack = styled(Stack, {
  variants: {
    details: {
      true: {
        backgroundColor: '$gray3',
        padding: '$4',
        $sm: {
          backgroundColor: 'transparent',
          padding: '$1',
          gap: '$2',
        },
      },
    },
    card: {
      true: {
        $sm: { flexDirection: 'column', alignItems: 'flex-start' },
      },
    },
    location: {
      true: {
        $sm: {
          backgroundColor: 'transparent',
          gap: '$2',
        },
      }
    },
  },
});

const VariantText = styled(Text, {
  variants: {
    details: {
      true: {
        fontSize:12,
        fontWeight:'600',
        color:'$gray9',
        $sm: {
          fontSize: 12,
          fontWeight: '400',
          width: 100,
          marginRight: 20,
        },
      },
    },
    card: {
      true: {
        fontSize:12,
        fontWeight:'600',
        color:'$gray9',
        $sm: {
          fontSize: 8,
          fontWeight: '400',
        },
      },
    },
    location: {
      true : {
        fontSize:12,
        fontWeight:'600',
        color:'$gray9',
        $sm: {
          fontSize: 8,
          fontWeight: '400',
          width: 60
        },
      }
    }
  },
});
const VariantValueText = styled(Text, {
  variants: {
    details: {
      true: {
        fontSize:12,
        fontWeight:'600',
        $sm: {
          fontSize: 12,
          fontWeight: '600',
        },
      },
    },
    card: {
      true: {
        fontSize:12,
        fontWeight:'600',
        $sm: {
          fontSize: 8,
          fontWeight: '600',
        },
      },
    },
    location: {
      true : {
        fontSize:12,
        fontWeight:'600',
        $sm: {
          fontSize: 8,
          fontWeight: '600',
        }
      }
    }
  },
});

export const VariantOption: React.FC<VariantOptionProps> = ({
  option: { icons, name, value },
  variant,
}) => {
  return (
    <VariantStack
      flexDirection="row"
      alignItems="center"
      gap="$2"
      {...(variant ? { [variant]: true } : {})}
    >
      {icons}
      <VariantText
        {...(variant ? { [variant]: true } : {})}
        
      >
        {name}
      </VariantText>
      <VariantValueText
        {...(variant ? { [variant]: true } : {})}
        
      >
        {value}
      </VariantValueText>
    </VariantStack>
  );
};

export default VariantOption;
