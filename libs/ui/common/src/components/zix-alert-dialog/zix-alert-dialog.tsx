import { ReactNode } from 'react';
import {  useWindowDimensions } from 'react-native';
import {
    Button,
    AlertDialog,
    DialogContentProps,
    DialogProps,
    SizeTokens,
    VisuallyHidden,
    XStack,
    YStack
} from 'tamagui';

export type ZixAlertDialogProps = DialogProps & {
  trigger?: ReactNode;
  title?: string;
  description?: string;
  children?: ReactNode;
};

export function ZixAlertDialog({
  trigger,
  title,
  description,
  children,
}: ZixAlertDialogProps) {
  const { width, height } = useWindowDimensions();
  return (
    <AlertDialog native>
      <AlertDialog.Trigger asChild>
        {trigger}
      </AlertDialog.Trigger>

      <AlertDialog.Portal>
        <AlertDialog.Overlay
          key="overlay"
          animation="quick"
          opacity={0.5}
          enterStyle={{ opacity: 0 }}
          exitStyle={{ opacity: 0 }}
        />
        <AlertDialog.Content
          bordered
          elevate
          key="content"
        //   animation={[
        //     'quick',
        //     {
        //       opacity: {
        //         overshootClamping: true,
        //       },
        //     },
        //   ]}
          enterStyle={{ x: 0, y: -20, opacity: 0, scale: 0.9 }}
          exitStyle={{ x: 0, y: 10, opacity: 0, scale: 0.95 }}
          x={0}
          scale={1}
          opacity={1}
          y={0}
        >
          <YStack gap="$4">
            <AlertDialog.Title>{title}</AlertDialog.Title>
            <AlertDialog.Description>{description}</AlertDialog.Description>

            {/* <XStack gap="$3" justifyContent="flex-end">
              <AlertDialog.Cancel asChild>
                <Button>Cancel</Button>
              </AlertDialog.Cancel>
              <AlertDialog.Action asChild>
                <Button theme="accent">Accept</Button>
              </AlertDialog.Action>
            </XStack> */}
          </YStack>
        </AlertDialog.Content>
      </AlertDialog.Portal>
    </AlertDialog>
  );
}
