import { createUniqueFieldSchema } from "@ts-react/form";

import { z } from "zod";

export const formFields = {
  text: z.string(),
  textarea: createUniqueFieldSchema(z.string(), "textarea"),
  /**
   * input that takes number
   */
  number: z.number(),
  /**
   * adapts to native switch on native, and native checkbox on web
   */
  boolean: z.boolean(),
  /**
   * switch field on all platforms
   */
  boolean_switch: createUniqueFieldSchema(z.boolean(), "boolean_switch"),
  /**
   * checkbox field on all platforms
   */
  boolean_checkbox: createUniqueFieldSchema(z.boolean(), "boolean_checkbox"),
  /**
   * make sure to pass options={} to props for this
   */
  select: createUniqueFieldSchema(z.string(), "select"),

  /**
   * make sure to pass tableName='' to props for this, default is states
   */
  autocomplete: createUniqueFieldSchema(z.string(), "autocomplete"),

  /**
   * File Fields
   */
  avatar: createUniqueFieldSchema(
    z.object({
      id: z.string(),
      uri: z.string(),
      file_name: z.string(),
      file_type: z.string(),
    }),
    "avatar",
  ),
  file: createUniqueFieldSchema(
    z.object({
      id: z.string(),
      uri: z.string(),
      file_name: z.string(),
      file_type: z.string(),
    }),
    "file",
  ),
  files: createUniqueFieldSchema(
    z.array(
      z.object({
        id: z.string(),
        uri: z.string(),
        file_name: z.string(),
        file_type: z.string(),
      }),
    ),
    "files",
  ),

  /**
   * Date Fields
   */
  row_date: createUniqueFieldSchema(z.string(), "row_date"),
  row_time: createUniqueFieldSchema(z.string(), "row_time"),

  phone: createUniqueFieldSchema(
    z.string().regex(/[0-9]{10}/, "Please enter a valid phone number"),
    "phone",
  ),
  code: createUniqueFieldSchema(z.number(), "code"),
  date: createUniqueFieldSchema(z.coerce.date(), "date"),

  country: createUniqueFieldSchema(z.number(), "nationality"),
  image: createUniqueFieldSchema(z.string(), "image"),
};
