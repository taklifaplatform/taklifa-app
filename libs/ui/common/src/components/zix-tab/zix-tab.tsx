import React, { useState } from 'react';
import { Button, ThemeableStackProps, View, XStack } from 'tamagui';

export type ITab = {
  key: string;
  title: React.ReactNode;
  content: React.ReactNode | (() => React.ReactNode);
};

export type ZixTabProps = {
  defaultActiveTab: string;
  tabs: ITab[];
  onTabChange?: (tab: string) => void;
  contentContainerProps?: ThemeableStackProps;
};

export const ZixTab: React.FC<ZixTabProps> = ({
  defaultActiveTab,
  tabs = [],
  contentContainerProps = {},
  onTabChange,
}) => {
  const [activeTab, setActiveTab] = useState(defaultActiveTab);

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    onTabChange?.(tab);
  };

  return (
    <View flex={1}>
      <XStack marginHorizontal="$4" backgroundColor="transparent" borderWidth={1} borderColor="$color3" borderRadius="$4">
        {tabs.map((tab) => (
          <Button
            key={`tab-title-${tab.key}`}
            flex={1}
            theme={ 'accent' }
            backgroundColor={activeTab === tab.key ? "$color1" : "transparent"}
            onPress={() => handleTabChange(tab.key)}
            fontWeight="bold"
            fontSize="$1"
            color={activeTab === tab.key ? "$color2" : "$color12"}
            paddingHorizontal={tabs?.length > 3 ? "$1" : "$2"}
          >
            {tab.title}
          </Button>
        ))}
      </XStack>

      <View flex={1} padding="$4"  {...contentContainerProps}>
        {tabs
          .filter((tab) => tab.key === activeTab)
          .map((tab) => (
            <View flex={1} key={`tab-content-${tab.key}`}>{tab.content}</View>
          ))}
      </View>
    </View>
  );
};

export default ZixTab;
