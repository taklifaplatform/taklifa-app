import { expect } from '@storybook/jest'
import { userEvent, within } from '@storybook/testing-library'
import { Button, SizableText, Text, XStack, YStack } from 'tamagui'
import { usePopoverState } from '../../hooks/usePopoverState'
import { ZixDialog } from './zix-dialog'

import { X } from '@tamagui/lucide-icons'

import { Meta, StoryObj } from '@storybook/react'

const meta = {
  title: 'Components/Panels/Dialog',
  component: ZixDialog,
  argTypes: {
    trigger: {
      name: 'trigger',
      type: 'string',
    },
    children: {
      type: 'string',
    },
  },
} satisfies Meta<typeof ZixDialog>
export default meta
type Story = StoryObj<typeof meta>

export const Basic: Story = {
  args: {
    title: 'Some Title',
    description: 'This is the description of the Dialog',
    trigger: <Button>Open Dialog</Button>,
    children: <SizableText padding={'$4'}>Dialog content</SizableText>,
  },
}

export const BasicPlay: Story = {
  args: {
    title: 'Some Title',
    description: 'This is the description of the Dialog',
    trigger: <Button>Open Dialog</Button>,
    children: <SizableText padding={'$4'}>Dialog content</SizableText>,
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement)
    // step('click on the button', async () => {
    // })
    await userEvent.click(canvas.getByText('Open Dialog'))
    setTimeout(async () => {
      await expect(canvas.getByText('Some Title')).toBeInTheDocument()
      await expect(canvas.getByText('This is the description of the Dialog')).toBeInTheDocument()
    }, 500)
  },
}

export const FullScreen: Story = {
  args: {
    title: 'Some Title',
    description: 'This is the description of the Dialog',
    trigger: <Button>Open Dialog</Button>,
    children: (
      <ZixDialog.Content>
        <SizableText>Dialog content</SizableText>
      </ZixDialog.Content>
    ),
    fullScreen: true,
  },
}

export const OnlyContent: Story = {
  args: {
    trigger: <Button>Open Dialog</Button>,
    children: <SizableText padding={'$4'}>Dialog content</SizableText>,
    hideCloseButton: true,
  },
}

export const FixedWidthHeight: Story = {
  args: {
    trigger: <Button>Open Dialog</Button>,
    children: <SizableText padding={'$4'}>Dialog content</SizableText>,
    hideCloseButton: true,
    dialogWidth: 600,
    dialogHeight: 400,
  },
}

export const PreventClickOutside: Story = {
  args: {
    trigger: <Button>Prevent click outside</Button>,
    title: 'Sticky Dialog',
    description: 'This dialog cannot be closed by clicking outside of it or hitting ESC button',
    hideCloseButton: true,
    dialogWidth: 600,
    dialogHeight: 400,
    preventClickOutside: true,
  },
}

export const ControlledState: Story = {
  render() {
    const dialogState = usePopoverState()
    return (
      <YStack>
        <Button onPress={() => dialogState.onOpenChange(true)}>Open Dialog</Button>
        <ZixDialog {...dialogState} hideCloseButton={true}>
          <ZixDialog.Content>
            <XStack
              space
              alignItems={'center'}
              justifyContent={'space-between'}
              marginBottom={'$2'}
            >
              <Text>This is some Content.</Text>
              <Button
                onPress={() => dialogState.onOpenChange(false)}
                chromeless
                circular
                icon={<X />}
              />
            </XStack>
            <Text>
              Some other content follows. You have full control of the opening state of the dialog.
            </Text>
          </ZixDialog.Content>
        </ZixDialog>
      </YStack>
    )
  },
}
