import { X } from '@tamagui/lucide-icons';
import { Button, Sheet, Text, XStack, YStack } from '@zix/app/ui/core';
import {
  FunctionComponent,
  forwardRef,
  useImperativeHandle,
  useState
} from 'react';
import { Dimensions } from 'react-native';

export interface IAction {
  name: string;
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

    // const onToggle =

    useImperativeHandle(ref, () => ({
      open: () => setIsOpen(true),
      close: () => setIsOpen(false)
    }));

    return (
      <Sheet
        modal
        animation="lazy"
        open={isOpen}
        onOpenChange={setIsOpen}
        snapPoints={SNAP_POINTS}
        // snapPoints={[props.actions.length * 8]}
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

        <Sheet.Frame>
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
              icon={(props) => <X {...props} size="$1" />}
              onPress={() => setIsOpen(false)}
            />
          </XStack>
          <YStack>
            {props.actions.map((action, index) => (
              <Button
                justifyContent={'flex-start'}
                backgroundColor="$color2"
                height={ACTION_HEIGHT}
                borderTopWidth="$0.25"
                borderTopColor="$color9"
                borderRadius="$0"
                key={index}
                pressStyle={{
                  backgroundColor: 'transparent',
                  borderWidth: 0,
                  borderColor: '$color9'
                }}
                icon={action.icon}
                onPress={action.onPress}
              >
                <Text fontSize="$2" fontWeight="800" color="$color10">
                  {action.name}
                </Text>
              </Button>
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
