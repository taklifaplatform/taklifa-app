import { Meta, StoryObj } from '@storybook/react'
import { Star } from '@tamagui/lucide-icons'
import { XStack, YStack } from 'tamagui'
import { ZixButton } from './zix-button'
export default {
  title: 'Components/Content/Button',
  component: ZixButton,
} as Meta<typeof ZixButton>

export const Primary = {
  args: {
    children: 'Standard Button',
  },
}

export const Sizes: StoryObj = {
  render: () => (
    <XStack gap={'$4'}>
      <ZixButton size={'$2'}>size 2</ZixButton>
      <ZixButton size={'$4'}>size 4</ZixButton>
      <ZixButton size={'$6'}>size 6</ZixButton>
      <ZixButton size={'$8'}>size 8</ZixButton>
      <ZixButton size={'$10'}>size 10</ZixButton>
    </XStack>
  ),
}

export const Colors: StoryObj = {
  render: () => (
    <XStack gap={'$4'}>
      <ZixButton colorVariant={'primary'}>primary</ZixButton>
      <ZixButton colorVariant={'secondary'}>secondary</ZixButton>
      <ZixButton colorVariant={'success'}>success</ZixButton>
      <ZixButton colorVariant={'info'}>info</ZixButton>
      <ZixButton colorVariant={'warning'}>warning</ZixButton>
      <ZixButton colorVariant={'error'}>error</ZixButton>
    </XStack>
  ),
}

export const Loading: StoryObj = {
  render: () => (
    <YStack gap={'$4'}>
      <XStack gap={'$4'}>
        <ZixButton size={'$2'} loading>
          size 2
        </ZixButton>
        <ZixButton size={'$4'} loading>
          size 4
        </ZixButton>
        <ZixButton size={'$6'} loading>
          size 6
        </ZixButton>
        <ZixButton size={'$8'} loading>
          size 8
        </ZixButton>
      </XStack>
      <XStack gap={'$4'}>
        <ZixButton size={'$2'} loading colorVariant={'primary'}>
          size 2
        </ZixButton>
        <ZixButton size={'$4'} loading colorVariant={'secondary'}>
          size 4
        </ZixButton>
        <ZixButton size={'$6'} loading theme={'pink_alt1'}>
          size 6
        </ZixButton>
        <ZixButton size={'$8'} loading>
          size 8
        </ZixButton>
      </XStack>
    </YStack>
  ),
}

export const Icons: StoryObj = {
  render: () => (
    <YStack gap={'$4'}>
      <XStack gap={'$4'}>
        <ZixButton size={'$2'} icon={<Star />}>
          size 2
        </ZixButton>
        <ZixButton size={'$4'} icon={<Star />}>
          size 4
        </ZixButton>
        <ZixButton size={'$6'} icon={<Star />}>
          size 6
        </ZixButton>
        <ZixButton size={'$8'} icon={<Star />}>
          size 8
        </ZixButton>
      </XStack>
      <XStack gap={'$4'}>
        <ZixButton size={'$2'} iconAfter={<Star />} colorVariant={'primary'}>
          size 2
        </ZixButton>
        <ZixButton size={'$4'} iconAfter={<Star />} colorVariant={'secondary'}>
          size 4
        </ZixButton>
        <ZixButton size={'$6'} iconAfter={<Star />} theme={'pink_alt1'}>
          size 6
        </ZixButton>
        <ZixButton size={'$8'} iconAfter={<Star />}>
          size 8
        </ZixButton>
      </XStack>
    </YStack>
  ),
}

export const IconButton: StoryObj = {
  render: () => (
    <YStack gap={'$4'}>
      <h3>Standard Icon Buttons:</h3>
      <XStack gap={'$4'}>
        <ZixButton size={'$2'} icon={<Star size={'$1'} />} />
        <ZixButton size={'$4'} icon={<Star size={'$1.5'} />} />
        <ZixButton size={'$6'} icon={<Star size={'$3'} />} />
        <ZixButton size={'$8'} icon={<Star size={'$5'} />} />
      </XStack>
      <h3>Circle Icon Buttons:</h3>
      <XStack gap={'$4'}>
        <ZixButton size={'$2'} icon={<Star size={'$1'} />} colorVariant={'primary'} circular />
        <ZixButton size={'$4'} icon={<Star size={'$1.5'} />} colorVariant={'secondary'} circular />
        <ZixButton size={'$6'} icon={<Star size={'$3'} />} theme={'pink_alt1'} circular />
        <ZixButton size={'$8'} icon={<Star size={'$4.5'} />} circular />
      </XStack>
    </YStack>
  ),
}
