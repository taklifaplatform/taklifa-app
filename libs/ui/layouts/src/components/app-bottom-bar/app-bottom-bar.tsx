import { Plus } from '@tamagui/lucide-icons';
import { useAuth } from '@zix/services/auth';
import { CustomIcon } from '@zix/ui/icons';
import { Button, Circle, Theme, ThemeableStackProps, XStack, YStack, Text } from 'tamagui';
import { useAppBottomBarMenu } from './app-bottom-menu';
import { useRouter } from 'solito/router';
import { usePathname } from '@zix/utils';


export type AppBottomBarProps = ThemeableStackProps & {
  //
}

/**
 * TODO:
 * make tab title bolder and back color even if active
 */
export const AppBottomBar: React.FC<AppBottomBarProps> = (props) => {
  const { menuItems } = useAppBottomBarMenu()
  const router = useRouter()
  const activePath = usePathname();
  return (
    <XStack
      elevation='$4'
      backgroundColor='$color1'
      borderTopColor='$color5'
      borderTopWidth='$1'
      {...props}
    >
      {
        menuItems.map((item, index) => (
          <Button
            unstyled
            theme={(
              activePath === item.href
              || (`${activePath}/` === item.href)
            ) ? 'accent' : 'default'
            }
            onPress={() => router.push(item.href)}
            flex={1}
            height='$6'
            paddingVertical='$2'
            hoverStyle={{
              backgroundColor: '$color6',
            }}
          >
            <YStack flex={1} alignItems='center' gap='$2'>
              <CustomIcon
                name={item.icon}
                color='$color5'
              // color={color}
              // size={size}
              />
              <Text color='$color10'>{item.title}</Text>
            </YStack>

          </Button>
        ))
      }


    </XStack>
  );
}


const PlusButton = ({ size, focused }) => {

  return (
    <Theme name='accent'>
      <Circle
        position="absolute"
        backgroundColor={focused ? '$color5' : '$color9'}
        width={size + 34}
        height={size + 34}
      />
      <YStack
        position="absolute"
        justifyContent="center"
        alignItems="center"
        animation="quick"
        pointerEvents="none"
        height={size + 34}
      >
        <Plus size={size + 5} />
      </YStack>
    </Theme>
  );
};



export default AppBottomBar;
