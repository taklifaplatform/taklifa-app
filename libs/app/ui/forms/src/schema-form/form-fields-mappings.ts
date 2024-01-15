import { TextField } from "../form-fields";

import { formFields } from "./form-fields-schemas";

export const formFieldsMappings = [
  [formFields.text, TextField] as const,
] as const;
