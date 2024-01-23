import { createTsForm } from '@ts-react/form';
import { Form, FormProps, Theme } from '@zix/core/ui';
import { ComponentProps, ReactElement } from 'react';

import { RenderedFieldMap } from '@ts-react/form/lib/src/createSchemaForm';
import { useFormContext } from 'react-hook-form';
import FieldError from '../common/field-error/field-error';
import FormWrapper from '../common/form-wrapper/form-wrapper';
import { formFieldsMappings } from './form-fields-mappings';

const FormComponent = (props: FormProps) => {
  return (
    <Form asChild {...props}>
      <FormWrapper tag="form">{props.children}</FormWrapper>
    </Form>
  );
};

const MappedSchemaForm = createTsForm(formFieldsMappings, {
  FormComponent: FormComponent
});

const parseNestedFields = (
  fields: RenderedFieldMap<ReactElement | Element[]>
) => {
  if (!fields) {
    return null;
  }

  if (typeof fields !== 'object') {
    return fields;
  }

  if (!Object.keys(fields).length) {
    return null;
  }

  return Object.values(fields).map((field) => {
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

type SchemaFormProps = ComponentProps<typeof MappedSchemaForm> & {
  wrappers?:
    | Record<string, RenderWrapper>
    | Record<string, Record<string, RenderWrapper>>;
};

export const SchemaForm = (props: SchemaFormProps) => {
  const renderAfter: ComponentProps<typeof MappedSchemaForm>['renderAfter'] =
    props.renderAfter
      ? (vars) => (
          <FormWrapper.Footer>{props.renderAfter?.(vars)}</FormWrapper.Footer>
        )
      : undefined;

  return (
    <MappedSchemaForm {...props} renderAfter={renderAfter}>
      {(fields) => (
        <FormWrapper.Body>
          {props.children ? props.children(fields) : Object.values(fields)}
          {/* {props.children ? props.children(fields) : parseNestedFields(fields)} */}
        </FormWrapper.Body>
      )}
    </MappedSchemaForm>
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
