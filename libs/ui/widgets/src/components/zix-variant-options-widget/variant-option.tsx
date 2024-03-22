import React from 'react';
import { Stack, Text, ThemeableStackProps, styled } from 'tamagui';

export type IVariantOption = {
  icons: React.ReactNode;
  name: string;
  value: string;
  theme?: string
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
          gap: '$3',
        },
      }
    },
  },
});

const VariantText = styled(Text, {
  variants: {
    details: {
      true: {
        fontSize: 15,
        fontWeight: '600',
        color: '$color9',
        $sm: {
          fontSize: 15,
          fontWeight: '400',
          width: 100,
          marginRight: 20,
        },
      },
    },
    card: {
      true: {
        fontSize: 12,
        fontWeight: '600',
        color: '$color9',
        $sm: {
          fontWeight: '400',
        },
      },
    },
    location: {
      true: {
        fontSize: 12,
        fontWeight: '600',
        color: '$color9',
        $sm: {
          fontSize: 10,
          fontWeight: '400',
          //width: 60
        },
      }
    }
  },
});
const VariantValueText = styled(Text, {
  variants: {
    details: {
      true: {
        fontSize: 15,
        fontWeight: '600',
        color: '$color9',
        $sm: {
          width: 220,
          textAlign: 'left',
          fontSize: 15,
          fontWeight: '600',
          flexWrap: 'wrap',
        },
      },
    },
    card: {
      true: {
        fontSize: 12,
        fontWeight: '600',
        color:'$color9',
      },
    },
    location: {
      true: {
        fontSize: 12,
        fontWeight: '600',
        color:'$color9',
        $sm: {
          fontSize: 10,
          fontWeight: '600',
        }
      }
    }
  },
});

export const VariantOption: React.FC<VariantOptionProps> = ({
  option: { icons, name, value, theme },
  variant,
}) => {
  return (
    <VariantStack
      theme={theme}
      flexDirection="row"
      alignItems="center"
      borderRadius={'$4'}
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
