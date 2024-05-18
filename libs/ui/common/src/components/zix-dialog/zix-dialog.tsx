import { X } from '@tamagui/lucide-icons'
import { ReactNode } from 'react'
import { useWindowDimensions } from 'react-native'
import {
  Button,
  Dialog,
  DialogContentProps,
  DialogProps,
  SizeTokens,
  VisuallyHidden,
  XStack,
} from 'tamagui'
import { ZixDialogActions, ZixDialogHeader } from './zix-dialog-actions'
import { ZixDialogContent } from './zix-dialog-content'

export type ZixDialogProps = DialogProps & {
  trigger?: ReactNode
  title?: string
  description?: string
  hideCloseButton?: boolean
  fullScreen?: boolean
  contentPadding?: SizeTokens
  dialogHeight?: string | number
  dialogWidth?: string | number
  dialogContentProps?: DialogContentProps
  preventClickOutside?: boolean
}

export function ZixDialog({
  children,
  trigger,
  title,
  description,
  hideCloseButton,
  fullScreen,
  contentPadding = '$4',
  dialogWidth,
  dialogHeight,
  dialogContentProps,
  preventClickOutside,
  ...dialogProps
}: ZixDialogProps) {
  const { width, height } = useWindowDimensions()
  return (
    <Dialog modal {...dialogProps}>
      {trigger && <Dialog.Trigger asChild>{trigger}</Dialog.Trigger>}
      <Dialog.Adapt platform="touch">
        <Dialog.Sheet zIndex={200000} modal dismissOnSnapToBottom>
          <Dialog.Sheet.Frame>
            <Dialog.Adapt.Contents />
          </Dialog.Sheet.Frame>
          <Dialog.Sheet.Overlay />
        </Dialog.Sheet>
      </Dialog.Adapt>
      <Dialog.Portal>
        <Dialog.Overlay
          key="overlay"
          animation="quick"
          opacity={0.5}
          enterStyle={{ opacity: 0 }}
          exitStyle={{ opacity: 0 }}
        />
        <Dialog.Content
          key="content"
          padding={'$0'}
          bordered
          elevate
          animation={[
            'quick',
            {
              opacity: {
                overshootClamping: true,
              },
            },
          ]}
          enterStyle={{ x: 0, y: -20, opacity: 0, scale: 0.9 }}
          exitStyle={{ x: 0, y: 10, opacity: 0, scale: 0.95 }}
          x={0}
          scale={1}
          opacity={1}
          y={0}
          {...(fullScreen
            ? {
              width,
              height,
            }
            : {
              // maxHeight: '90%',
              // maxWidth: '90%',
              width: dialogWidth,
              height: dialogHeight,
            })}
          {...(preventClickOutside && {
            onEscapeKeyDown: (ev) => {
              ev.preventDefault()
            },
            onInteractOutside: (ev) => {
              ev.preventDefault()
            },
          })}
          {...dialogContentProps}
        >
          {(!hideCloseButton || title) && (
            <XStack
              justifyContent={'space-between'}
              padding={contentPadding}
            >
              {title ? (
                <Dialog.Title>{title}</Dialog.Title>
              ) : (
                <VisuallyHidden>
                  <Dialog.Title></Dialog.Title>
                </VisuallyHidden>
              )}
              {!hideCloseButton && (
                <Dialog.Close asChild>
                  <Button size="$3" circular icon={<X />} />
                </Dialog.Close>
              )}
            </XStack>
          )}

          {description ? (
            <Dialog.Description
              paddingTop={contentPadding}
              paddingRight={contentPadding}
              paddingLeft={contentPadding}
            >
              {description}
            </Dialog.Description>
          ) : (
            <VisuallyHidden>
              <Dialog.Description />
            </VisuallyHidden>
          )}
          {children}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog>
  )
}

ZixDialog.Actions = ZixDialogActions
ZixDialog.Content = ZixDialogContent
ZixDialog.Header = ZixDialogHeader
