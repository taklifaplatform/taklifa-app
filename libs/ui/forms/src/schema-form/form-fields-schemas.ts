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
  accept_terms: createUniqueFieldSchema(z.boolean(), "accept_terms"),
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
   * TODO: should be all media transformers
   */
  medias: createUniqueFieldSchema(
    z.array(
      z.object({
        uuid: z.string(),
        name: z.string(),
        preview_url: z.string(),
        size: z.number(),
        mime_type: z.string(),
        extension: z.string(),
      }),
    ),
    "medias",
  ),
  avatar: createUniqueFieldSchema(
    z.object({
      uuid: z.string(),
      name: z.string(),
      preview_url: z.string(),
      size: z.number(),
      mime_type: z.string(),
      extension: z.string(),
    }),
    "avatar",
  ),
  file: createUniqueFieldSchema(
    z.object({
      uuid: z.string(),
      name: z.string(),
      preview_url: z.string(),
      size: z.number(),
      mime_type: z.string(),
      extension: z.string(),
    }),
    "file",
  ),
  files: createUniqueFieldSchema(
    z.array(
      z.object({
        uuid: z.string(),
        name: z.string(),
        preview_url: z.string(),
        size: z.number(),
        mime_type: z.string(),
        extension: z.string(),
      }),
    ),
    "files",
  ),

  phone: createUniqueFieldSchema(
    z.string().regex(/[0-9]{10}/, "Please enter a valid phone number"),
    "phone",
  ),
  code: createUniqueFieldSchema(z.number(), "code"),

  /**
   * Date Fields
   */
  date_picker: createUniqueFieldSchema(z.string(), "date_picker"),
  day_selector: createUniqueFieldSchema(z.string(), "day_selector"),
  month_selector: createUniqueFieldSchema(z.string(), "month_selector"),
  year_selector: createUniqueFieldSchema(z.string(), "year_selector"),
  row_time_range_picker: createUniqueFieldSchema(z.string(), "row_time_range_picker"),
  row_date_picker: createUniqueFieldSchema(z.string(), "row_date_picker"),

  // TODO:: remove
  date: createUniqueFieldSchema(z.coerce.date(), 'date'),
  row_date: createUniqueFieldSchema(z.string(), 'row_date'),
  row_time: createUniqueFieldSchema(z.string(), 'row_time'),

  country: createUniqueFieldSchema(z.number(), "nationality"),
  image: createUniqueFieldSchema(z.string(), "image"),
};
