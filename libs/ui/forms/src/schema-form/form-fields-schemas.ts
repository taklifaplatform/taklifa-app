import { createUniqueFieldSchema } from '@ts-react/form';

import { z } from 'zod';
import {
  LocationSchema,
  MoneySchema,
  ShipmentItemsSchema,
} from '../form-fields';

export const mediaSchema = z.object({
  id: z.any().optional().nullable(),
  uuid: z.string().optional().nullable(),
  url: z.string().optional().nullable(),
  // original_url: z.string(),
});

export const formFields = {
  text: z.string(),
  textarea: createUniqueFieldSchema(z.string(), 'textarea'),
  secure_text: createUniqueFieldSchema(z.string(), 'secure_text'),
  /**
   * input that takes number
   */
  number: z.number(),
  /**
   * switch field on all platforms
   */
  boolean_switch: createUniqueFieldSchema(z.boolean(), 'boolean_switch'),
  /**
   * checkbox field on all platforms
   */
  boolean_checkbox: createUniqueFieldSchema(z.boolean(), 'boolean_checkbox'),
  accept_terms: createUniqueFieldSchema(z.boolean(), 'accept_terms'),
  /**
   * make sure to pass options={} to props for this
   */
  select: createUniqueFieldSchema(z.string(), 'select'),

  /**
   * make sure to pass tableName='' to props for this, default is states
   */
  autocomplete: createUniqueFieldSchema(z.string(), 'autocomplete'),

  /**
   * Medias (images, videos, audios, etc.)
   */
  medias: createUniqueFieldSchema(z.array(mediaSchema), 'medias'),

  /**
   * Files (pdf, doc, etc.)
   */
  files: createUniqueFieldSchema(z.array(mediaSchema), 'files'),
  file: createUniqueFieldSchema(mediaSchema, 'file'),

  /**
   * Image
   */
  image: createUniqueFieldSchema(mediaSchema, 'image'),

  phone: createUniqueFieldSchema(
    z.string().regex(/[0-9]{10}/, 'Please enter a valid phone number'),
    'phone',
  ),
  code: createUniqueFieldSchema(z.string(), 'code'),

  /**
   * Date Fields
   */
  date_picker: createUniqueFieldSchema(z.string(), 'date_picker'),
  time_picker: createUniqueFieldSchema(z.string(), 'time_picker'),
  day_selector: createUniqueFieldSchema(z.string(), 'day_selector'),
  month_selector: createUniqueFieldSchema(z.string(), 'month_selector'),
  year_selector: createUniqueFieldSchema(z.string(), 'year_selector'),
  row_time_range_picker: createUniqueFieldSchema(
    z.string(),
    'row_time_range_picker',
  ),
  row_date_picker: createUniqueFieldSchema(z.string(), 'row_date_picker'),

  country: createUniqueFieldSchema(z.string(), 'country'),

  location: createUniqueFieldSchema(LocationSchema, 'location'),
  advanced_location: createUniqueFieldSchema(
    LocationSchema,
    'advanced_location',
  ),

  shipment_items: createUniqueFieldSchema(
    ShipmentItemsSchema,
    'shipment_items',
  ),

  money: createUniqueFieldSchema(MoneySchema, 'money'),
};
