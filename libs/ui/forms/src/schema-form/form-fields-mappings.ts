import {} from "@tamagui/lucide-icons";
import {
  AutoCompleteField,
  BooleanCheckboxField,
  BooleanField,
  BooleanSwitchField,
  CodeInputField,
  CountryField,
  DatePickerField,
  DatePickerFieldProps,
  FileField,
  MediaPickerField,
  NumberField,
  PhoneField,
  SelectField,
  TextAreaField,
  TextField,
} from "../form-fields";

import AvatarField from "../form-fields/avatar-field/avatar-field";
import { formFields } from "./form-fields-schemas";

export const formFieldsMappings = [
  [formFields.text, TextField] as const,
  [formFields.textarea, TextAreaField] as const,
  [formFields.number, NumberField] as const,
  [formFields.boolean, BooleanField] as const,
  [formFields.boolean_switch, BooleanSwitchField] as const,
  [formFields.boolean_checkbox, BooleanCheckboxField] as const,
  [formFields.select, SelectField] as const,
  [formFields.autocomplete, AutoCompleteField] as const,

  /**
   * Date Fields
   */
  [formFields.date_picker, (props: DatePickerFieldProps) =>
    DatePickerField({
      ...props,
      type: "date_picker",
    })] as const,
  [formFields.day_selector, (props: DatePickerFieldProps) =>
    DatePickerField({
      ...props,
      type: "day_selector",
    })] as const,
  [formFields.month_selector, (props: DatePickerFieldProps) =>
    DatePickerField({
      ...props,
      type: "month_selector",
    })] as const,
  [formFields.year_selector, (props: DatePickerFieldProps) =>
    DatePickerField({
      ...props,
      type: "year_selector",
    })] as const,
  [
    formFields.row_time_range_picker,
    (props: DatePickerFieldProps) =>
      DatePickerField({
        ...props,
        type: "row_time_range_picker",
      }),
  ] as const,
  [
    formFields.row_date_picker,
    (props: DatePickerFieldProps) =>
      DatePickerField({
        ...props,
        type: "row_date_picker",
      }),
  ] as const,
  // [formFields.time, TimePickerField] as const,
  // [formFields.row_time, RowTimeSelectorField] as const,

  // [formFields.address, AddressField] as const,

  /**
   *  Multiple Media Selector Field
   */
  [formFields.medias, MediaPickerField] as const,

  [formFields.phone, PhoneField] as const,
  [formFields.code, CodeInputField] as const,
  // [formFields.date, DateField] as const,
  [formFields.file, FileField] as const,
  [formFields.files, FileField] as const,
  [formFields.avatar, AvatarField] as const,
  [formFields.country, CountryField] as const,
] as const;
