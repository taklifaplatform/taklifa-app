import { ChevronDown } from "@tamagui/lucide-icons";
import { usePathname } from "@zix/utils";
import React from "react";
import { useRouter } from "solito/router";
import { Button, View, XStack, Text, YStack } from "tamagui";


export type MenuItemType = {
  title: string
  icon?: React.ReactNode
  href?: string
  rightLabel?: string
  onPress?: () => void

  collapsible?: boolean
  children?: React.ReactNode
}


export const MenuItem: React.FC<MenuItemType> = (props) => {
  const router = useRouter()
  const pathname = usePathname()

  function onPress() {
    if (props.onPress) {
      props.onPress()
    } else if (props.href) {
      router.push(props.href)
    }
  }

  return (
    <YStack>
      <Button
        theme='accent'
        backgroundColor={pathname === props.href ? '$backgroundFocus' : 'transparent'}
        onPress={onPress}
      >
        <XStack alignItems='center' justifyContent='space-between' flex={1}>
          <XStack alignItems='center'>
            <View width='$3'>
              {props.icon}
            </View>
            <Text>
              {props.title}
            </Text>
          </XStack>
          <View>
            {
              props.rightLabel && (
                <View
                  backgroundColor='$color1'
                  padding='$2'
                  paddingHorizontal='$4'
                  borderRadius='$8'
                >
                  <Text>{props.rightLabel}</Text>
                </View>
              )
            }
          </View>

        </XStack>
      </Button>
      {(!!props.collapsible && pathname === props.href) && props.children}
    </YStack>
  );
}
