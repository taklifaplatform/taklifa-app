import { ScrollViewProps, Sheet } from 'tamagui'
import { PropsWithChildren, useState } from 'react'
import { SheetProps } from '@tamagui/sheet/src/types'

export type ZixSheetProps = PropsWithChildren<
  SheetProps & {
    hideHandle?: boolean
    fullScreen?: boolean
    enableScroll?: boolean
    scrollviewProps?: ScrollViewProps
  }
>

export function ZixSheet({
  hideHandle,
  children,
  fullScreen,
  snapPoints = [85, 50, 25],
  enableScroll,
  scrollviewProps,
  ...sheetProps
}: ZixSheetProps) {
  const [position, setPosition] = useState(0)
  return (
    <Sheet
      modal
      dismissOnSnapToBottom
      {...sheetProps}
      snapPoints={fullScreen ? [100, 0] : snapPoints}
      disableDrag={fullScreen ? true : sheetProps.disableDrag}
      position={position}
      onPositionChange={setPosition}
    >
      {!fullScreen && <Sheet.Overlay />}
      {!hideHandle && !fullScreen && <Sheet.Handle />}
      <Sheet.Frame flex={1} padding={'$4'} borderRadius={fullScreen ? 0 : undefined}>
        {enableScroll ? (
          <Sheet.ScrollView {...scrollviewProps}>{children}</Sheet.ScrollView>
        ) : (
          <>{children}</>
        )}
      </Sheet.Frame>
    </Sheet>
  )
}



export default ZixSheet;
