import React, { useState } from 'react';

import { X } from '@tamagui/lucide-icons';
import { useSafeAreaInsets } from '@zix/utils';
import { Button, H4, Sheet, Theme, View, XStack } from 'tamagui';
import { SubmitButton } from '../../common';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

export type GroupFieldsSheetProps = {
  activator?: React.ReactNode | Element;
  children: React.ReactNode;
  title?: string;
};



export const GroupFieldsSheet: React.FC<GroupFieldsSheetProps> = ({
  children,
  activator,
  title,
}) => {
  const [open, setOpen] = useState(false);
  const { bottom, top } = useSafeAreaInsets();

  return (
    <>
      <View position="relative">
        {activator}
        <View
          onPress={() => setOpen(true)}
          position="absolute"
          top={0}
          right={0}
          bottom={0}
          left={0}
        />
      </View>

        <Sheet
          open={open}
          onOpenChange={setOpen}
          modal
          native
          snapPoints={[100, 100]}
          dismissOnSnapToBottom={false}
          forceRemoveScrollEnabled
          disableDrag
        >
          <Sheet.Frame>
            <View
              flex={1}
              paddingBottom={bottom}
              paddingTop={top}
              backgroundColor="$background1"
            >
              <XStack
                padding="$4"
                justifyContent="space-between"
                alignItems="center"
                paddingBottom="$4"
              >
                <H4>{title}</H4>
                <Button
                  icon={X}
                  size="$3"
                  scaleIcon={1.5}
                  backgroundColor="$color5"
                  onPress={() => setOpen(false)}
                />
              </XStack>
              <Sheet.ScrollView marginBottom="$4">
                <View padding="$4" flex={1}>
                  {children}
                </View>
              </Sheet.ScrollView>

              <Theme inverse>
                <SubmitButton
                  marginHorizontal="$4"
                  onPress={() => setOpen(false)}
                >
                  Confirm
                </SubmitButton>
              </Theme>
            </View>
          </Sheet.Frame>
        </Sheet>
      </>

  );
};

export default GroupFieldsSheet;
