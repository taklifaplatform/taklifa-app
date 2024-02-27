
import React, { useState } from 'react';

import { X } from '@tamagui/lucide-icons';
import { useSafeAreaInsets } from '@zix/utils';
import { Button, H4, Sheet, Theme, View, XStack } from 'tamagui';
import { SubmitButton } from '../../common';

export type GroupFieldsSheetProps = {
  activator?: React.ReactNode | Element;
  children: React.ReactNode;
  title?: string;
}


export const GroupFieldsSheet: React.FC<GroupFieldsSheetProps> = ({ children, activator, title }) => {
  const [open, setOpen] = useState(false)
  const { bottom } = useSafeAreaInsets()

  // auto validate current form context
  // const form = useFormContext()

  return (
    <>
      <View position='relative'>
        {activator}
        <View
          onPress={() => setOpen(true)}
          position='absolute'
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
      >
        <Sheet.Overlay />
        <Sheet.Handle />
        <Sheet.Frame>
          <View flex={1} padding='$4' paddingBottom={bottom} backgroundColor='$background1'>
            <XStack justifyContent='space-between' alignItems='center' paddingBottom='$4'>
              <H4>
                {title}
              </H4>
              <Button icon={X} size='$3' scaleIcon={1.5} backgroundColor='$gray5' onPress={() => setOpen(false)} />
            </XStack>
            <Sheet.ScrollView marginBottom='$4'>
              {children}
            </Sheet.ScrollView>

            <Theme inverse>
              <SubmitButton onPress={() => setOpen(false)}>
                Confirm
              </SubmitButton>
            </Theme>
          </View>
        </Sheet.Frame>
      </Sheet>
    </>
  );
}


export default GroupFieldsSheet;
