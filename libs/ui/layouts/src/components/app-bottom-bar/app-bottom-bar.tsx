import { Plus } from '@tamagui/lucide-icons';
import { CustomIcon } from '@zix/ui/icons';
import { usePathname } from '@zix/utils';
import { useRouter } from 'solito/router';
import { Button, Text, Theme, ThemeableStackProps, XStack, YStack } from 'tamagui';
import { useAppBottomBarMenu } from './app-bottom-menu';


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
          item.name === 'create-shipment' ?
            PlusButton({
              size: 20,
              focused: activePath === item.href,
              onPress: () => router.push(item.href)
            }) :
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
                />
                <Text color='$color10'>{item.title}</Text>
              </YStack>

            </Button>
        ))
      }


    </XStack>
  );
}


const PlusButton = ({ size, focused, onPress }) => {

  return (
    <Theme name='accent'>
      <Button
        unstyled
        onPress={onPress}
        height={size + 34}
        backgroundColor={focused ? '$color6' : '$color1'}
        borderRadius='100%'
        alignItems='center'
        justifyContent='center'
        width={size + 34}
        hoverStyle={{
          backgroundColor: '$color6',
        }}
      >
        <Plus size={size + 5} />
      </Button>
    </Theme>
  );
};



export default AppBottomBar;
