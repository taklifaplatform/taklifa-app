import { t } from 'i18next';
import { useRouter } from 'solito/router';
import { Button } from 'tamagui';
import BooleanCheckboxField, { BooleanCheckboxFieldProps } from '../boolean-checkbox-field/boolean-checkbox-field';


const AcceptTermsLink: React.FC = () => {
  const router = useRouter()
  return (
    <Button
      theme='accent'
      unstyled
      color='$color1'
      onPress={() => router.push('/terms-of-service')}
    >
      {t('auth:terms_and_conditions')}
    </Button>
  );
};

export const AcceptTermsField: React.FC<BooleanCheckboxFieldProps> = (props) => {
  return (
    <BooleanCheckboxField
      {...props}
      containerProps={{
        labelPrepend: < AcceptTermsLink />,
        ...(props.containerProps || {}),
        stackContainerProps: {
          paddingTop: '$4',
        }
      }}
    />
  )
};

export default AcceptTermsField;
