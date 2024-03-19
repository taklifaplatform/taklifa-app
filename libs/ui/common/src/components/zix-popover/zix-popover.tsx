
import { ReactNode } from 'react';

import { Popover, PopoverContentProps, PopoverProps } from 'tamagui';
import ZixSheet, { ZixSheetProps } from '../zix-sheet/zix-sheet';

export type ZixPopoverProps = PopoverProps & {
  trigger?: ReactNode
  hideArrow?: boolean
  contentProps?: PopoverContentProps
  isBouncy?: boolean
  sheetProps?: ZixSheetProps
}

export function ZixPopover({
  trigger,
  children,
  hideArrow,
  contentProps,
  isBouncy = true,
  sheetProps,
  ...popoverProps
}: ZixPopoverProps) {
  return (
    <Popover size="$5" {...popoverProps}>
      <Popover.Trigger asChild>{trigger}</Popover.Trigger>
      <Popover.Adapt platform="touch">
        <ZixSheet {...sheetProps}>
          <Popover.Adapt.Contents />
        </ZixSheet>
      </Popover.Adapt>

      <Popover.Content
        borderWidth={1}
        borderColor="$borderColor"
        {...(isBouncy && {
          enterStyle: { x: 0, y: -10, opacity: 0 },
          exitStyle: { x: 0, y: -10, opacity: 0, pointerEvents: 'none' },
          x: 0,
          y: 0,
          o: 1,
          animation: [
            'quick',
            {
              opacity: {
                overshootClamping: true,
              },
            },
          ],
        })}
        elevate
        padding={contentProps?.padding || 0}
        {...contentProps}
      >
        {!hideArrow && <Popover.Arrow borderWidth={1} borderColor="$borderColor" />}
        {children}
      </Popover.Content>
    </Popover>
  )
}


export default ZixPopover;
