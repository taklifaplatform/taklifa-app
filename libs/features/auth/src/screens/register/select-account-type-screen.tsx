import { t } from 'i18next';
import { useRouter } from 'solito/router';
import { YStack } from 'tamagui';

import { useAuth } from '@zix/services/auth';
import { AuthHeader } from '../../components/auth-header/auth-header';
import InlineItemSelect from '../../components/inline-item-select/inline-item-select';
import { FormWrapper } from '@zix/ui/forms';

/**
 * Represents the screen for selecting the account type during the registration process.
 * Allows the user to choose between service requestor and service provider account types.
 */
export const SelectAccountTypeScreen: React.FC = () => {
  const router = useRouter();
  const { requestedAccountType, setRequestedAccountType } = useAuth()

  function onRedirectUser(role: string) {
    if (role === 'customer') {
      router.push('/auth/register/create-account');
    } else {
      router.push('/auth/register/user-type');
    }
  }

  return (
    <FormWrapper.Body>
      <AuthHeader
        iconName="avatar"
        canGoNext={!!requestedAccountType}
        onGoNext={() => requestedAccountType && onRedirectUser(requestedAccountType)}
        title={t('auth:create_new_account')}
      />

      <YStack gap="$4" marginHorizontal="$4" marginTop="$10">
        <InlineItemSelect
          icon="looking_for_service"
          title={t('common:account_types.seek.service_requestor')}
          value="customer"
          selectedValue={requestedAccountType}
          onSelect={(value) => {
            setRequestedAccountType(value);
            onRedirectUser(value);
          }}
        />
        <InlineItemSelect
          icon="service_provider"
          title={t('common:account_types.seek.service_provider')}
          value="solo_driver"
          selectedValue={requestedAccountType}
          onSelect={(value) => {
            setRequestedAccountType(value);
            onRedirectUser(value);
          }}
        />
      </YStack>
    </FormWrapper.Body>
  );
};

export default SelectAccountTypeScreen;
