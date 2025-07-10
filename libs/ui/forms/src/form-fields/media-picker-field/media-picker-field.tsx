import { useFieldInfo, useTsController } from '@ts-react/form'
import { MediaTransformer } from '@zix/api'
import { z } from 'zod';

import { BaseFormFieldContainerProps, FormFieldContainer } from '../../common'
import { ZixMediaPickerField, ZixMediaPickerFieldProps } from '../../fields'


export const MediaPickerFieldSchema = z.object({
  // id: z.number(),
  id: z.any().optional().nullable(),
  uuid: z.any().optional().nullable(),
  url: z.any().optional().nullable(),
  // url: z.string().optional(),
  // original_url: z.string(),
});

export type MediaPickerFieldProps = ZixMediaPickerFieldProps & {
  containerProps?: BaseFormFieldContainerProps;
  showCustomImagePicker?: boolean;
}

export const MediaPickerField: React.FC<MediaPickerFieldProps> = ({
  containerProps = {},
  showCustomImagePicker = false,
  ...props
}) => {
  const { field, error } = useTsController<MediaTransformer | MediaTransformer[]>()
  const { placeholder, isOptional } = useFieldInfo();
  return (
    <FormFieldContainer {...containerProps}>
      <ZixMediaPickerField
        {...props}
        value={field.value}
        onChange={field.onChange}
        hasError={!!error?.errorMessage}
        placeholder={placeholder}
        isOptional={isOptional}
        showCustomImagePicker={showCustomImagePicker}
      />
    </FormFieldContainer>
  )
}

export default MediaPickerField;
