import { Theme, useStyle } from 'tamagui';
import { BaseZixFieldContainerProps } from '../../common/zix-field-container/zix-field-container';
import BooleanCheckboxField from '../boolean-checkbox-field/boolean-checkbox-field';
import { TextLink } from 'solito/link';
import { t } from 'i18next';


const AcceptTermsLink: React.FC = () => {
  return (
    <Theme inverse>
      <TextLink
        href={`/terms-conditions`}
        textProps={{
          style: useStyle({
            color: '$color5',
          }),
        }}
      >
        {t('auth:terms_and_conditions')}
      </TextLink>
    </Theme>
  );
};

export const AcceptTermsField = (props: BaseZixFieldContainerProps) => {
  return (
    <BooleanCheckboxField
      labelPrepend={
        <AcceptTermsLink />
      }
      {...props}
    />
  )
};

export default AcceptTermsField;
