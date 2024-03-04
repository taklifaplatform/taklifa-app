import { t } from 'i18next';
import { useRouter } from 'solito/router';
import { YStack } from 'tamagui';

import { useAuth } from '@zix/utils';
import { AuthHeader } from '../../components/auth-header/auth-header';
import InlineItemSelect from '../../components/inline-item-select/inline-item-select';

/**
 * Renders the screen for selecting the user type during the registration process.
 * Allows the user to choose between individual and company user types.
 */
export const SelectUserTypeScreen = () => {
  const router = useRouter();
  const { requestedAccountType, setRequestedAccountType } = useAuth()

  function onRedirectUser() {
    router.push('/auth/register/create-account');
  }

  return (
    <YStack flex={1}>
      <AuthHeader
        iconName="avatar"
        canGoNext={!!requestedAccountType}
        onGoNext={() => requestedAccountType && onRedirectUser()}
        title={t('auth:create_new_account')}
      />

      <YStack gap="$4" marginHorizontal="$4" marginTop="$10">
        <InlineItemSelect
          icon="solo_transporter_car"
          title={t('common:user_types.individual')}
          value="solo_driver"
          selectedValue={requestedAccountType}
          onSelect={(value) => {
            setRequestedAccountType(value);
            onRedirectUser();
          }}
        />
        <InlineItemSelect
          icon="company_cars"
          title={t('common:user_types.company')}
          value="company_owner"
          selectedValue={requestedAccountType}
          onSelect={(value) => {
            setRequestedAccountType(value);
            onRedirectUser();
          }}
        />
      </YStack>
    </YStack>
  );
};

export default SelectUserTypeScreen;
