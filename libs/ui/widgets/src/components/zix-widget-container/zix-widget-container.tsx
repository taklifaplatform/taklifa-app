import { BaseZixFieldContainerProps, ZixFieldContainer } from '@zix/ui/forms';
import React from 'react';
import {currentPlatform} from '@tamagui/constants';

export type ZixWidgetContainerProps = BaseZixFieldContainerProps;

export const ZixWidgetContainer: React.FC<ZixWidgetContainerProps> = ({
  children,
  ...props
}) => {
  return (
    <ZixFieldContainer
      labelBold
      collapsible={currentPlatform !== 'web'}
      labelShowRequiredAsterisk={false}
      gap="$18"
      {...props}
    >
      {children}
    </ZixFieldContainer>
  );
};

export default ZixWidgetContainer;
