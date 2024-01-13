import { createTsForm, createUniqueFieldSchema } from '@ts-react/form';
import { Form, FormProps, Theme } from '@zix/core/ui';
import { ComponentProps, ReactElement } from 'react';

import { RenderedFieldMap } from '@ts-react/form/lib/src/createSchemaForm';
import { useFormContext } from 'react-hook-form';
import { z } from 'zod';
import FieldError from '../../common/field-error/field-error';
import FormWrapper from '../../common/form-wrapper/form-wrapper';

export const formFields = {
  text: z.string(),
  textarea: createUniqueFieldSchema(z.string(), 'textarea'),
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
  boolean_switch: createUniqueFieldSchema(z.boolean(), 'boolean_switch'),
  /**
   * checkbox field on all platforms
   */
  boolean_checkbox: createUniqueFieldSchema(z.boolean(), 'boolean_checkbox'),
  /**
   * make sure to pass options={} to props for this
   */
  select: createUniqueFieldSchema(z.string(), 'select'),

  /**
   * make sure to pass tableName='' to props for this, default is states
   */
  autocomplete: createUniqueFieldSchema(z.string(), 'autocomplete'),

  /**
   * Date Fields
   */
  row_date: createUniqueFieldSchema(z.string(), 'row_date'),
  row_time: createUniqueFieldSchema(z.string(), 'row_time'),

  /**
   * example of how to handle more complex fields
   */
  address: createUniqueFieldSchema(AddressSchema, 'address'),

  phone: createUniqueFieldSchema(
    z.string().regex(/[0-9]{10}/, 'Please enter a valid phone number'),
    'phone'
  ),
  code: createUniqueFieldSchema(z.number(), 'code'),
  date: createUniqueFieldSchema(z.coerce.date(), 'date'),
  file: createUniqueFieldSchema(
    z.object({
      file: z.any(),
      lastModified: z.number(),
      mimeType: z.string(),
      name: z.string(),
      size: z.number(),
      uri: z.string()
    }),
    'file'
  ),
  medias: createUniqueFieldSchema(
    z.array(
      z.object({
        id: z.number(),
        url: z.string(),
        original_url: z.string()
      })
    ),
    'medias'
  ),
  country: createUniqueFieldSchema(z.number(), 'nationality'),
  image: createUniqueFieldSchema(z.string(), 'image')
};

const mapping = [] as const;

const FormComponent = (props: FormProps) => {
  return (
    <Form asChild {...props}>
      <FormWrapper tag="form">{props.children}</FormWrapper>
    </Form>
  );
};

const _SchemaForm = createTsForm(mapping, {
  FormComponent: FormComponent
});

const parseNestedFields = (
  fields: RenderedFieldMap<ReactElement | Element[] | any>
): any => {
  if (!fields) {
    return null;
  }

  if (typeof fields !== 'object') {
    return fields;
  }

  if (!Object.keys(fields).length) {
    return null;
  }

  return Object.values(fields).map((field: any) => {
    if (
      field &&
      Object.keys(field).length &&
      !Object.keys(field).includes('_store')
    ) {
      return parseNestedFields(field);
    }

    return field;
  });
};

type RenderWrapper = (children: ReactElement) => ReactElement;

type SchemaFormProps = ComponentProps<typeof _SchemaForm> & {
  wrappers?:
    | Record<string, RenderWrapper>
    | Record<string, Record<string, RenderWrapper>>;
};

export const SchemaForm = (props: SchemaFormProps) => {
  const renderAfter: ComponentProps<typeof _SchemaForm>['renderAfter'] =
    props.renderAfter
      ? (vars) => (
          <FormWrapper.Footer>{props.renderAfter?.(vars)}</FormWrapper.Footer>
        )
      : undefined;

  return (
    <_SchemaForm {...props} renderAfter={renderAfter}>
      {(fields) => (
        <FormWrapper.Body>
          {props.children ? props.children(fields) : parseNestedFields(fields)}
        </FormWrapper.Body>
      )}
    </_SchemaForm>
  );
};

// handle manual errors (most commonly coming from a server) for cases where it's not for a specific field - make sure to wrap inside a provider first
// stopped using it cause of state issues it introduced - set the errors to specific fields instead of root for now
export const RootError = () => {
  const context = useFormContext();
  const errorMessage = context?.formState?.errors?.root?.message;

  return (
    <Theme name="red">
      <FieldError message={errorMessage} />
    </Theme>
  );
};
