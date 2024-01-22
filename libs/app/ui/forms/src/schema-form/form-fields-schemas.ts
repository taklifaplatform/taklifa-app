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
      height: z.number(),
      assetId: z.string(),
      width: z.number(),
      base64: z.string().nullable(),
      exif: z.string().nullable(),
      fileSize: z.number(),
      uri: z.string(),
      fileName: z.string(),
      duration: z.string().nullable(),
      type: z.string(),
    }),
    "avatar",
  ),
  file: createUniqueFieldSchema(
    z.object({
      file: z.any(),
      lastModified: z.number(),
      mimeType: z.string(),
      name: z.string(),
      size: z.number(),
      uri: z.string(),
    }),
    "file",
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

  medias: createUniqueFieldSchema(
    z.array(
      z.object({
        id: z.number(),
        url: z.string(),
        original_url: z.string(),
      }),
    ),
    "medias",
  ),
  country: createUniqueFieldSchema(z.number(), "nationality"),
  image: createUniqueFieldSchema(z.string(), "image"),
};
