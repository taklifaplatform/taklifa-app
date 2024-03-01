import { YStack } from 'tamagui';
import { t } from 'i18next';
import { useAtom } from 'jotai';
import { useRouter } from 'solito/router';

import { authUserTypeAtom } from '../../atoms';
import { AuthHeader } from '../../components/auth-header/auth-header';
import InlineItemSelect from '../../components/inline-item-select/inline-item-select';

/**
 * Renders the screen for selecting the user type during the registration process.
 * Allows the user to choose between individual and company user types.
 */
export const SelectUserTypeScreen = () => {
  const router = useRouter();
  const [userType, setUserType] = useAtom(authUserTypeAtom);

  function onRedirectUser(type: string) {
    router.push('/auth/register/create-account');
  }

  return (
    <YStack flex={1}>
      <AuthHeader
        iconName="avatar"
        canGoNext={!!userType}
        onGoNext={() => userType && onRedirectUser(userType)}
        title={t('auth:create_new_account')}
      />

      <YStack gap="$4" marginHorizontal="$4" marginTop="$10">
        <InlineItemSelect
          icon="solo_transporter_car"
          title={t('common:user_types.individual')}
          value="individual"
          selectedValue={userType}
          onSelect={(value) => {
            setUserType(value);
            onRedirectUser(value);
          }}
        />
        <InlineItemSelect
          icon="company_cars"
          title={t('common:user_types.company')}
          value="company"
          selectedValue={userType}
          onSelect={(value) => {
            setUserType(value);
            onRedirectUser(value);
          }}
        />
      </YStack>
    </YStack>
  );
};

export default SelectUserTypeScreen;
