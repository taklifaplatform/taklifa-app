import { X } from '@tamagui/lucide-icons';
import {
  FunctionComponent,
  forwardRef,
  useImperativeHandle,
  useState,
} from 'react';
import { Dimensions } from 'react-native';
import {
  Button,
  Sheet,
  Text,
  ThemeableStackProps,
  XStack,
  YStack,
} from 'tamagui';

export type IAction = ThemeableStackProps & {
  name: string;
  disabled?: boolean;
  icon?:
    | JSX.Element
    | FunctionComponent<{ color?: string; size?: number }>
    | null;
  onPress?: () => void;
};

export interface ActionSheetProps extends React.ComponentProps<typeof Sheet> {
  title?: string;
  actions: IAction[];
  snapPoints?: number[];
}

export type ActionSheetRef = {
  open: () => void;
  close: () => void;
};

export const ActionSheet = forwardRef<ActionSheetRef, ActionSheetProps>(
  (props, ref) => {
    const [isOpen, setIsOpen] = useState(false);
    const [position, setPosition] = useState<number>();
    const { width } = Dimensions.get('window');
    const ACTION_HEIGHT = width / 15;
    const SCREEN_HEIGHT = Dimensions.get('window').height - ACTION_HEIGHT;
    const ACTION_HEIGHT_POINTS =
      Number(SCREEN_HEIGHT / (ACTION_HEIGHT * 2)) + (props.modal ? 0 : 1);
    const SNAP_POINTS = [
      Math.min(ACTION_HEIGHT_POINTS * (props.actions.length + 1), 90),
    ];

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

        <Sheet.Frame backgroundColor="$color1">
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
            {props.actions.map(({ name, ...prop }, index) => (
              <Button
                unstyled
                key={index}
                padding="$4"
                flexDirection="row"
                justifyContent="flex-start"
                alignItems="center"
                borderBottomWidth="$1"
                borderColor="$color4"
                pressStyle={{
                  backgroundColor: '$color7',
                }}
                hoverStyle={{
                  backgroundColor: '$color7',
                }}
                color="$color12"
                {...prop}
              >
                {name}
              </Button>
            ))}
          </YStack>
          <Sheet.Handle />
        </Sheet.Frame>
      </Sheet>
    );
  },
);

ActionSheet.displayName = 'ActionSheet';

export default ActionSheet;
