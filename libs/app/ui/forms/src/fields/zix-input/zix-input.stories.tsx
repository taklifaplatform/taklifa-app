import { Meta, StoryObj } from '@storybook/react';
import { XStack, YStack } from 'tamagui';
import { ZixInput } from './zix-input';

const meta = {
  title: 'Forms/Input',
  component: ZixInput
} satisfies Meta<typeof ZixInput>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  args: {
    size: '$4',
    placeholder: 'Placeholder..'
  }
};

export const RightToLeft: Story = {
  args: {
    size: '$4',
    placeholder: 'Placeholder..',
    direction: 'rtl'
  }
};

export const Textarea: Story = {
  args: {
    size: '$4',
    multiline: true,
    placeholder: 'Placeholder..'
  }
};

export const CustomFocusColors: Story = {
  args: {
    label: 'Custom Focus Colors',
    backgroundColor: 'violet',
    borderColor: 'blue',
    color: 'red',
    focusStyle: {
      backgroundColor: 'green',
      borderColor: 'purple',
      color: 'yellow'
    }
  }
};

export const Password: Story = {
  args: {
    size: '$4',
    placeholder: 'Password..',
    isPassword: true
  }
};

export const PasswordRightToLeft: Story = {
  args: {
    size: '$4',
    placeholder: 'Password..',
    isPassword: true,
    direction: 'rtl'
  }
};

export const PasswordFullWidth = () => (
  <YStack width={'50%'} space>
    <ZixInput fullWidth placeholder={'normal input'} />
    <ZixInput isPassword fullWidth placeholder={'normal input'} />
  </YStack>
);

export const Sizes = () => (
  <YStack space={'$4'}>
    <h4>Placeholder:</h4>
    <XStack space={'$4'}>
      <ZixInput size={'$2'} placeholder={'With placeholder'} />
      <ZixInput size={'$3'} placeholder={'With placeholder'} />
      <ZixInput size={'$4'} placeholder={'With placeholder'} />
    </XStack>
    <h4>Default value:</h4>
    <XStack space={'$4'}>
      <ZixInput size={'$2'} defaultValue={'With default value'} />
      <ZixInput
        size={'$3'}
        placeholder={'With placeholder'}
        defaultValue={'With default value'}
      />
      <ZixInput size={'$4'} defaultValue={'With default value'} />
    </XStack>
    <h4>With label:</h4>
    <XStack space={'$4'}>
      <ZixInput size={'$2'} label={'With Label:'} />
      <ZixInput size={'$3'} label={'With Label:'} />
      <ZixInput size={'$4'} label={'With Label:'} />
    </XStack>
    <h4>With inline label:</h4>
    <XStack space={'$4'}>
      <ZixInput size={'$2'} label={'Inline Label:'} labelInline />
      <ZixInput size={'$3'} label={'Inline Label:'} labelInline />
      <ZixInput size={'$4'} label={'Inline Label:'} labelInline />
    </XStack>
    <h4>With required:</h4>
    <XStack space={'$4'}>
      <ZixInput size={'$2'} label={'Inline Label:'} labelInline required />
      <ZixInput size={'$3'} label={'Inline Label:'} labelInline required />
      <ZixInput size={'$4'} label={'Inline Label:'} labelInline required />
    </XStack>
  </YStack>
);

export const WithHelperText = () => (
  <YStack space>
    <h4>With helper text:</h4>
    <XStack space={'$4'}>
      <ZixInput
        size={'$2'}
        label={'Inline Label:'}
        helperText={'Helper text..'}
      />
      <ZixInput
        size={'$3'}
        label={'Inline Label:'}
        helperText={'Helper text..'}
      />
      <ZixInput
        size={'$4'}
        label={'Inline Label:'}
        helperText={'Helper text..'}
      />
    </XStack>
    <h4>With helper text inline:</h4>
    <XStack space={'$4'}>
      <ZixInput
        size={'$2'}
        label={'Inline Label:'}
        helperText={'Helper text..'}
        labelInline
      />
      <ZixInput
        size={'$3'}
        label={'Inline Label:'}
        helperText={'Helper text..'}
        labelInline
      />
      <ZixInput
        size={'$4'}
        label={'Inline Label:'}
        helperText={'Helper text..'}
        labelInline
      />
    </XStack>
  </YStack>
);

export const WithError = () => (
  <YStack space>
    <h4>With error:</h4>
    <XStack space={'$4'}>
      <ZixInput size={'$2'} label={'Inline Label:'} required error />
      <ZixInput size={'$3'} label={'Inline Label:'} required error />
      <ZixInput size={'$4'} label={'Inline Label:'} required error />
    </XStack>

    <h4>With error inline:</h4>
    <XStack space={'$4'}>
      <ZixInput
        size={'$2'}
        label={'Inline Label:'}
        labelInline
        required
        error
      />
      <ZixInput
        size={'$3'}
        label={'Inline Label:'}
        labelInline
        required
        error
      />
      <ZixInput
        size={'$4'}
        label={'Inline Label:'}
        labelInline
        required
        error
      />
    </XStack>
  </YStack>
);

export const HelperError = () => (
  <YStack space>
    <h4>With helper text error:</h4>
    <XStack space={'$4'}>
      <ZixInput
        size={'$2'}
        label={'Inline Label:'}
        required
        error
        helperText={'Some error occured'}
      />
      <ZixInput
        size={'$3'}
        label={'Inline Label:'}
        required
        error
        helperText={'Some error occured'}
      />
      <ZixInput
        size={'$4'}
        label={'Inline Label:'}
        required
        error
        helperText={'Some error occured'}
      />
    </XStack>

    <h4>With helper text error inline:</h4>
    <XStack space={'$4'}>
      <ZixInput
        size={'$2'}
        label={'Inline Label:'}
        labelInline
        required
        error
        helperText={'Some error occured'}
      />
      <ZixInput
        size={'$3'}
        label={'Inline Label:'}
        labelInline
        required
        error
        helperText={'Some error occured'}
      />
      <ZixInput
        size={'$4'}
        label={'Inline Label:'}
        labelInline
        required
        error
        helperText={'Some error occured'}
      />
    </XStack>
  </YStack>
);

export const ThemeColors = () => (
  <YStack space>
    <XStack space={'$4'}>
      <ZixInput theme={'pink_alt1'} placeholder={'Placeholder..'} />
      <ZixInput theme={'pink_alt2'} placeholder={'Placeholder..'} />
      <ZixInput theme={'orange'} placeholder={'Placeholder..'} />
    </XStack>
    <XStack space={'$4'}>
      <ZixInput theme={'pink_alt1'} label={'Some label'} />
      <ZixInput theme={'pink_alt2'} label={'Some label'} />
      <ZixInput theme={'orange'} label={'Some label'} />
    </XStack>
    <XStack space={'$4'}>
      <ZixInput theme={'pink_alt1'} label={'Some label'} labelInline />
      <ZixInput theme={'pink_alt2'} label={'Some label'} labelInline />
      <ZixInput theme={'orange'} label={'Some label'} labelInline />
    </XStack>
  </YStack>
);
