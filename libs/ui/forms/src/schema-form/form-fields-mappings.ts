import {
  AcceptTermsField,
  AutoCompleteField,
  BooleanCheckboxField,
  BooleanSwitchField,
  CodeInputField,
  CountryField,
  DatePickerField,
  DatePickerFieldProps,
  LocationField,
  LocationFieldProps,
  MediaPickerField,
  MediaPickerFieldProps,
  NumberField,
  PhoneField,
  SelectField,
  ShipmentItemsField,
  TextAreaField,
  TextField,
  TextSecureField,
} from '../form-fields';

import { formFields } from './form-fields-schemas';

export const formFieldsMappings = [
  [formFields.text, TextField] as const,
  [formFields.textarea, TextAreaField] as const,
  [formFields.secure_text, TextSecureField] as const,
  [formFields.number, NumberField] as const,
  [formFields.boolean_switch, BooleanSwitchField] as const,
  [formFields.boolean_checkbox, BooleanCheckboxField] as const,
  [formFields.accept_terms, AcceptTermsField] as const,
  [formFields.select, SelectField] as const,
  [formFields.autocomplete, AutoCompleteField] as const,

  /**
   * Date Fields
   */
  [
    formFields.date_picker,
    (props: DatePickerFieldProps) =>
      DatePickerField({
        ...props,
        type: 'date_picker',
      }),
  ] as const,
  [
    formFields.day_selector,
    (props: DatePickerFieldProps) =>
      DatePickerField({
        ...props,
        type: 'day_selector',
      }),
  ] as const,
  [
    formFields.month_selector,
    (props: DatePickerFieldProps) =>
      DatePickerField({
        ...props,
        type: 'month_selector',
      }),
  ] as const,
  [
    formFields.year_selector,
    (props: DatePickerFieldProps) =>
      DatePickerField({
        ...props,
        type: 'year_selector',
      }),
  ] as const,
  [
    formFields.row_time_range_picker,
    (props: DatePickerFieldProps) =>
      DatePickerField({
        ...props,
        type: 'row_time_range_picker',
      }),
  ] as const,
  [
    formFields.row_date_picker,
    (props: DatePickerFieldProps) =>
      DatePickerField({
        ...props,
        type: 'row_date_picker',
      }),
  ] as const,

  /**
   *  Multiple Media Selector Field
   */
  // [formFields.media, MediaPickerField] as const,
  [
    formFields.medias,
    (props: MediaPickerFieldProps) =>
      MediaPickerField({
        ...props,
        type: 'medias',
        isMultiple: true,
      }),
  ] as const,
  [
    formFields.image,
    (props: MediaPickerFieldProps) =>
      MediaPickerField({
        ...props,
        type: 'image',
        containerProps: {
          labelHidden: true,
        },
      }),
  ] as const,
  [
    formFields.files,
    (props: MediaPickerFieldProps) =>
      MediaPickerField({
        ...props,
        type: 'files',
        isMultiple: true,
      }),
  ] as const,
  [
    formFields.file,
    (props: MediaPickerFieldProps) =>
      MediaPickerField({
        ...props,
        type: 'file',
      }),
  ] as const,

  [formFields.phone, PhoneField] as const,
  [formFields.code, CodeInputField] as const,

  [formFields.country, CountryField] as const,
  [
    formFields.location,
    (props: LocationFieldProps) =>
      LocationField({
        ...props,
        type: 'simple',
      }),
  ] as const,
  [
    formFields.advanced_location,
    (props: LocationFieldProps) =>
      LocationField({
        ...props,
        type: 'advanced',
      }),
  ] as const,

  [formFields.shipment_items, ShipmentItemsField],
] as const;
