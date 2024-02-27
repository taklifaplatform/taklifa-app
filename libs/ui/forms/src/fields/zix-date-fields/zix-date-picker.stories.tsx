import { Meta, StoryObj } from '@storybook/react'
import { ZixDatePicker } from './zix-date-picker'

const meta = {
  title: 'Forms/Dates/DatePicker',
  component: ZixDatePicker,
} satisfies Meta<typeof ZixDatePicker>
export default meta
type Story = StoryObj<typeof meta>
export const Single: Story = {
  args: {
    label: 'Pick a date',
  },
}

export const SinglePreselect: Story = {
  args: {
    label: 'Preselected date',
    startDate: new Date('2022-03-01'),
  },
}

export const FullWidth: Story = {
  args: {
    label: 'Full width',
    fullWidth: true,
  },
}

export const Size: Story = {
  args: {
    label: 'Full width',
    size: '$6',
  },
}

export const RangePicker: Story = {
  args: {
    label: 'Pick a range',
    isRangePicker: true,
  },
}

export const RangePickerPreselect: Story = {
  args: {
    isRangePicker: true,
    label: 'Range preselected',
    startDate: new Date('2022-03-01'),
    endDate: new Date('2022-03-15'),
  },
}

export const RangePickerFullWidth: Story = {
  args: {
    label: 'Pick a range',
    isRangePicker: true,
    fullWidth: true,
  },
}

export const ThreeMonths: Story = {
  args: {
    label: 'Range with 3 months',
    isRangePicker: true,
    numberOfMonths: 3,
  },
}

// export const ReactHookForm = () => (
//   <ZixFormRhfProvider
//     defaultValues={{
//       birthday: '',
//     }}
//   >
//     <YStack space>
//       <ZixDatePickerRhf name={'birthday'} label={'Birthday'} />
//       <ZixSubmitButtonRhf onSubmit={action('submit')}>Submit</ZixSubmitButtonRhf>
//     </YStack>
//   </ZixFormRhfProvider>
// )

// export const ReactHookFormComplex = () => (
//   <ZixFormRhfProvider
//     defaultValues={{
//       single: '2022-12-24',
//       singleDate: new Date('2022-12-31'),
//       rangeStartP: '2022-12-24',
//       rangeEndP: '2022-12-31',
//     }}
//   >
//     <YStack space>
//       <ZixDatePickerRhf name={'start'} label={'Single Date'} labelInline />
//       <ZixDatePickerRhf name={'required'} label={'Required'} required labelInline />
//       <ZixDatePickerRhf name={'single'} label={'With String'} labelInline />
//       <ZixDatePickerRhf name={'singleDate'} label={'With Date'} labelInline />
//       <ZixDateRangePickerRhf start={'rangeStart'} end={'rangeEnd'} label={'Range'} labelInline />
//       <ZixDateRangePickerRhf
//         start={'rangeReq'}
//         end={'rangeEndReq'}
//         label={'Range Required'}
//         required
//         labelInline
//       />
//       <ZixDateRangePickerRhf
//         start={'rangeStartP'}
//         end={'rangeEndP'}
//         label={'Range Preselect'}
//         labelInline
//       />
//       <ZixSubmitButtonRhf onSubmit={action('submit')}>Submit</ZixSubmitButtonRhf>
//     </YStack>
//   </ZixFormRhfProvider>
// )

// export const ReactHookFormMixed = () => (
//   <ZixFormRhfProvider
//     defaultValues={{
//       single: '2022-12-24',
//       singleDate: new Date('2022-12-31'),
//       rangeStartP: '2022-12-24',
//       rangeEndP: '2022-12-31',
//     }}
//   >
//     <YStack space width={'100%'}>
//       <ZixGrid container row width={'100%'} gap={'$2'}>
//         <ZixGrid>
//           <ZixInputRhf name={'input'} label={'Input Field'} />
//           <ZixDatePickerRhf name={'required'} label={'Required'} required fullWidth />
//         </ZixGrid>
//         <ZixGrid xs>
//           <ZixInputRhf name={'input'} label={'Input Field'} />
//           <ZixInputRhf name={'required'} label={'Required'} required fullWidth />
//         </ZixGrid>
//       </ZixGrid>
//       <ZixSubmitButtonRhf onSubmit={action('submit')}>Submit</ZixSubmitButtonRhf>
//     </YStack>
//   </ZixFormRhfProvider>
// )
