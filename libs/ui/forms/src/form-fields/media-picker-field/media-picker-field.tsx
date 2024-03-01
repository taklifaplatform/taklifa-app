import { useFieldInfo, useTsController } from '@ts-react/form'

import { MediaTransformer } from '@zix/api'
import ZixFieldContainer, { BaseZixFieldContainerProps } from '../../common/zix-field-container/zix-field-container'
import ZixMediaPickerField, { ZixMediaPickerFieldProps } from '../../fields/zix-media-picker-field/zix-media-picker-field'

export type MediaPickerFieldProps = ZixMediaPickerFieldProps & {
  containerProps?: BaseZixFieldContainerProps
}

export const MediaPickerField: React.FC<MediaPickerFieldProps> = ({
  containerProps = {},
  ...props
}) => {
  const { field, error } = useTsController<MediaTransformer | MediaTransformer[]>()
  const { placeholder } = useFieldInfo();
  return (
    <ZixFieldContainer {...containerProps}>
      <ZixMediaPickerField
        {...props}
        value={field.value}
        onChange={field.onChange}
        hasError={!!error?.errorMessage}
        placeholder={placeholder}
      />
    </ZixFieldContainer>
  )
}

export default MediaPickerField;
