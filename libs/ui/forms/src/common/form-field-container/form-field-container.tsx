
import { useFieldInfo, useTsController } from '@ts-react/form';
import ZixFieldContainer, { BaseZixFieldContainerProps } from '../zix-field-container/zix-field-container';

export type BaseFormFieldContainerProps = BaseZixFieldContainerProps & {
  fieldInfo?: typeof useFieldInfo;
};

export const FormFieldContainer: React.FC<BaseFormFieldContainerProps> = ({
  children,
  fieldInfo = useFieldInfo,
  ...props
}) => {
  const { error } = useTsController()
  const { label, isOptional } = fieldInfo()

  return (
    <ZixFieldContainer
      {...props}
      error={error}
      label={label}
      isOptional={isOptional}
    >
      {children}
    </ZixFieldContainer>
  )
};

export default FormFieldContainer;
