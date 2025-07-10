
import { useFieldInfo, useTsController } from '@ts-react/form';
import ZixFieldContainer, { BaseZixFieldContainerProps } from '../zix-field-container/zix-field-container';

export type BaseFormFieldContainerProps = BaseZixFieldContainerProps & {
  fieldInfo?: typeof useFieldInfo;
  showFieldset?: boolean
};

export const FormFieldContainer: React.FC<BaseFormFieldContainerProps> = ({
  children,
  fieldInfo = useFieldInfo,
  showFieldset = true,
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
      showFieldset={showFieldset}
    >
      {children}
    </ZixFieldContainer>
  )
};

export default FormFieldContainer;
