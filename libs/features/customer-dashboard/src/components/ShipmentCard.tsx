import { TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import { XStack, YStack, Text } from 'tamagui';
import { CustomIcon } from '@zix/ui/icons';
import { ChevronDown, ChevronUp } from '@tamagui/lucide-icons';

export function ShipmentCard({ data, title }) {
  const [showDetails, setShowDetails] = useState(false);
  return (
    <>
      <XStack
        justifyContent="space-between"
        alignItems="center"
        paddingVertical="$4"
        borderBottomWidth={showDetails ? 0 : '$0.5'}
        borderColor="$gray6"
        paddingBottom="$4"
      >
        <Text fontSize="$5" fontWeight="bold">
          {title}
        </Text>
        <XStack gap="$4">
          <TouchableOpacity>
            <XStack
              alignItems="center"
              backgroundColor="$gray6"
              paddingHorizontal="$3"
              paddingVertical="$1.5"
              borderRadius="$6"
              gap="$2"
            >
              <Text>تعديل</Text>
              <CustomIcon name="edit" color="$gray10" size="$1" />
            </XStack>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setShowDetails(!showDetails)}>
            {!showDetails ? <ChevronDown size="$2" /> : <ChevronUp size="$2" />}
          </TouchableOpacity>
        </XStack>
      </XStack>
      {showDetails && (
        <YStack>
          <XStack
            justifyContent="space-around"
            borderBottomWidth="$0.5"
            paddingBottom="$4"
            borderColor="$gray7"
          >
            {data &&
              data.map((item, index) => (
                <YStack key={index} alignItems="flex-start" gap="$3">
                  <Text color="$color5" fontWeight="bold" fontSize="$3">
                    {item.title}
                  </Text>
                  <YStack gap="$2">
                    {item.categories.map((cat, i) => (
                      <XStack key={`${index}-${i}`} gap="$2">
                        {cat.icon && (
                          <CustomIcon
                            name={cat.icon}
                            size="$1"
                            color="$gray10"
                          />
                        )}
                        <Text fontWeight="bold">{cat.title}</Text>
                      </XStack>
                    ))}
                  </YStack>
                </YStack>
              ))}
          </XStack>
        </YStack>
      )}
    </>
  );
}
