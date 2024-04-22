import React, { useState } from 'react';

import { Button, ThemeableStackProps, View, XStack } from 'tamagui';

export type ITab = {
  key: string;
  title: React.ReactNode;
  content: React.ReactNode;
};

export type ZixTabProps = {
  defaultActiveTab: string;
  tabs: ITab[];

  contentContainerProps?: ThemeableStackProps;
};

export const ZixTab: React.FC<ZixTabProps> = ({
  defaultActiveTab,
  tabs = [],
  contentContainerProps = {},
}) => {
  const [activeTab, setActiveTab] = useState(defaultActiveTab);

  return (
    <View flex={1}>
      <XStack marginHorizontal="$4" backgroundColor="$color3">
        {tabs.map((tab) => (
          <Button
            key={`tab-title-${tab.key}`}
            flex={1}
            theme={activeTab === tab.key ? 'accent' : undefined}
            onPress={() => setActiveTab(tab.key)}
            borderRadius="$0"
            fontWeight="bold"
            fontSize="$1"
          >
            {tab.title}
          </Button>
        ))}
      </XStack>

      <View flex={1} padding="$4" {...contentContainerProps}>
        {tabs
          .filter((tab) => tab.key === activeTab)
          .map((tab) => (
            <View key={`tab-content-${tab.key}`}>{tab.content}</View>
          ))}
      </View>
    </View>
  );
};

export default ZixTab;
