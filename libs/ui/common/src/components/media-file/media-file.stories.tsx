import { Meta, StoryObj } from '@storybook/react'
import { MediaFile } from './media-file'

const meta: Meta<typeof MediaFile> = {
  title: 'ui/MediaFile',
  parameters: { layout: 'centered' },
  component: MediaFile,
}

type Story = StoryObj<typeof MediaFile>

export const Basic: Story = {
  args: {},
}

export default meta
