import {} from "@tamagui/lucide-icons";
import {
  AutoCompleteField,
  BooleanCheckboxField,
  BooleanField,
  BooleanSwitchField,
  CodeInputField,
  CountryField,
  FileField,
  NumberField,
  PhoneField,
  SelectField,
  TextAreaField,
  TextField,
} from "../form-fields";

import { formFields } from "./form-fields-schemas";
import AvatarField from "../form-fields/avatar-field/avatar-field";

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
  // [formFields.row_date, RowDateSelectorField] as const,
  // [formFields.row_time, RowTimeSelectorField] as const,

  // [formFields.address, AddressField] as const,

  /**
   *  Multiple Media Selector Field
   */
  // [formFields.medias, MultipleMediaSelectorField] as const,

  [formFields.phone, PhoneField] as const,
  [formFields.code, CodeInputField] as const,
  // [formFields.date, DateField] as const,
  [formFields.file, FileField] as const,
  [formFields.files, FileField] as const,
  [formFields.avatar, AvatarField] as const,
  [formFields.country, CountryField] as const,
] as const;
