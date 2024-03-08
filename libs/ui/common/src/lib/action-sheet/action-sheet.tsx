import { X } from '@tamagui/lucide-icons';
import {
  FunctionComponent,
  forwardRef,
  useImperativeHandle,
  useState,
} from 'react';
import { Dimensions } from 'react-native';
import { Button, ListItem, Sheet, Text, XStack, YStack } from 'tamagui';

export interface IAction {
  name: string;
  disabled?: boolean;
  icon?:
  | JSX.Element
  | FunctionComponent<{ color?: string; size?: number }>
  | null;
  onPress?: () => void;
}

export interface ActionSheetProps extends React.ComponentProps<typeof Sheet> {
  title?: string;
  actions: IAction[];
}

export type ActionSheetRef = {
  open: () => void;
  close: () => void;
};

export const ActionSheet = forwardRef<ActionSheetRef, ActionSheetProps>(
  (props, ref) => {
    const [isOpen, setIsOpen] = useState(false);
    const [position, setPosition] = useState<number>();

    const ACTION_HEIGHT = 50;
    const SCREEN_HEIGHT = Dimensions.get('window').height - ACTION_HEIGHT;
    const ACTION_HEIGHT_POINTS =
      Number(SCREEN_HEIGHT / (ACTION_HEIGHT * 2)) + (props.modal ? 0 : 1);
    const SNAP_POINTS = [ACTION_HEIGHT_POINTS * (props.actions.length + 1)];

    useImperativeHandle(ref, () => ({
      open: () => setIsOpen(true),
      close: () => setIsOpen(false),
    }));

    return (
      <Sheet
        modal
        open={isOpen}
        onOpenChange={setIsOpen}
        snapPoints={SNAP_POINTS}
        position={position}
        onPositionChange={setPosition}
        dismissOnSnapToBottom
        {...props}
      >
        <Sheet.Overlay
          animation="lazy"
          enterStyle={{ opacity: 0 }}
          exitStyle={{ opacity: 0 }}
        />

        <Sheet.Frame backgroundColor='$color1'>
          <YStack flex={1}>
            <XStack
              justifyContent="space-between"
              alignItems="center"
              padding="$4"
            >
              <Text fontSize="$5" fontWeight="600">
                {props.title}
              </Text>
              <Button
                unstyled
                icon={(props: any) => <X {...props} size="$1" />}
                onPress={() => setIsOpen(false)}
              />
            </XStack>
            {props.actions.map((action, index) => (
              <ListItem
                key={index}
                onPress={action.onPress}
                title={action.name}
                icon={action.icon}
                disabled={action.disabled}
                padding="$4"
                borderTopWidth={1}
                borderColor='$gray5'
                alignItems='center'
              />
            ))}
          </YStack>
          <Sheet.Handle />
        </Sheet.Frame>
      </Sheet>
    );
  }
);

ActionSheet.displayName = 'ActionSheet';

export default ActionSheet;
