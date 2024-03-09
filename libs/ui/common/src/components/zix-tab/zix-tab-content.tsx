import { Tabs, TabsContentProps } from "tamagui"

export const TabsContent: React.FC<TabsContentProps> = ({
  children,
  ...props
}) => {
  return (
    <Tabs.Content
      backgroundColor="$background"
      key="tab3"
      padding="$2"
      alignItems="center"
      justifyContent="center"
      flex={1}
      borderColor="$background"
      borderRadius="$2"
      borderTopLeftRadius={0}
      borderTopRightRadius={0}
      borderWidth="$2"
      {...props}
    >
      {children}
    </Tabs.Content>
  )
}

export default TabsContent

