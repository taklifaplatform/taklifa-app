
import React from 'react';

import { Separator, SizableText, Tabs } from 'tamagui';
import TabsContent from './zix-tab-content';


export type ITab = {
  key: string,
  title: React.ReactNode,
  content: React.ReactNode
}

export type ZixTabProps = {
  defaultActiveTab: string,
  tabs: ITab[]
}

export const ZixTab: React.FC<ZixTabProps> = ({
  defaultActiveTab,
  tabs = []
}) => {
  return (
    <Tabs
      defaultValue={defaultActiveTab}
      orientation="horizontal"
      flexDirection="column"
      flex={1}
      overflow="hidden"
    >
      <Tabs.List
        borderRadius={0}
        backgroundColor="transparent"
        disablePassBorderRadius="bottom"
      >
        {
          tabs.map((tab) => (
            <Tabs.Tab key={`tab-title-${tab.key}`} flex={1} value={tab.key}>
              <SizableText fontFamily="$body">{tab.title}</SizableText>
            </Tabs.Tab>
          ))
        }
      </Tabs.List>

      <Separator />

      {
        tabs.map((tab) => (
          <TabsContent key={`tab-content-${tab.key}`} value={tab.key}>
            {tab.content}
          </TabsContent>
        ))
      }
    </Tabs>
  )
}


export default ZixTab;
