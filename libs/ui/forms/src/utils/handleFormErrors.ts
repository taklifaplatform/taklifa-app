import { UseFormReturn } from 'react-hook-form';

export function handleFormErrors(
  form: UseFormReturn<any>,
  errors?: Record<string, string[]>
) {
  if (!errors) {
    return;
  }
  Object.keys(errors).forEach((key) => {
    form.setError(key, { type: 'custom', message: errors[key].join(', ') });
  });
}
