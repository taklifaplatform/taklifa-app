import React, { useState } from 'react';
import { YStack, Text, XStack } from 'tamagui';
import { TouchableOpacity } from 'react-native';
import { CustomIcon } from '@zix/ui/icons';
import { ChevronDown, ChevronUp } from '@tamagui/lucide-icons';

export function ShipmentRoadCard() {
  const [showDetails, setShowDetails] = useState(false);
  return (
    <>
      <XStack justifyContent="space-between" alignItems="center">
        <Text fontSize="$5" fontWeight="bold">
          مسار الشحنة
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
        <YStack
          borderBottomWidth="$0.5"
          borderColor="$gray5"
          paddingBottom="$4"
        >
          <XStack gap="$2">
            <CustomIcon name="star_location" color="$color5" />
            <Text fontWeight="bold" fontSize="$4" color="$color5">
              من
            </Text>
          </XStack>
          <YStack
            gap="$3"
            marginTop="$4"
            alignItems="flex-start"
            borderLeftWidth={2}
            borderColor={'$color5'}
            paddingLeft="$4"
            marginLeft="$2.5"
          >
            <Text fontSize="$4" fontWeight="600">
              شارع ابن رشد، جامعة الملك فهد للبترول والمعادن
            </Text>
            <XStack gap="$2">
              <CustomIcon name="account" color="$gray10" />
              <Text fontWeight="600" fontSize="$4">
                فلان بن فلان
              </Text>
            </XStack>
            <XStack gap="$2">
              <CustomIcon name="call" color="$gray10" />
              <Text fontWeight="600" fontSize="$4">
                +966 55 555 5555
              </Text>
            </XStack>
            <XStack gap="$2">
              <CustomIcon name="location" color="$gray10" />
              <Text fontWeight="600" fontSize="$4">
                فلان بن فلان
              </Text>
            </XStack>
          </YStack>
          <XStack gap="$2" paddingTop="$4">
            <CustomIcon name="location" color="$color5" />
            <Text fontWeight="bold" fontSize="$4" color="$color5">
              الى
            </Text>
          </XStack>
          <YStack
            gap="$3"
            marginTop="$4"
            alignItems="flex-start"
            paddingLeft="$4"
            marginLeft="$2.5"
          >
            <Text fontSize="$4" fontWeight="bold">
              شارع ابن رشد، جامعة الملك فهد للبترول والمعادن
            </Text>
            <XStack gap="$2">
              <CustomIcon name="account" color="$gray10" />
              <Text fontWeight="600" fontSize="$4">
                فلان بن فلان
              </Text>
            </XStack>
            <XStack gap="$2">
              <CustomIcon name="call" color="$gray10" />
              <Text fontWeight="600" fontSize="$4">
                +966 55 555 5555
              </Text>
            </XStack>
            <XStack gap="$2">
              <CustomIcon name="location" color="$gray10" />
              <Text fontWeight="600" fontSize="$4">
                فلان بن فلان
              </Text>
            </XStack>
          </YStack>
        </YStack>
      )}
    </>
  );
}
