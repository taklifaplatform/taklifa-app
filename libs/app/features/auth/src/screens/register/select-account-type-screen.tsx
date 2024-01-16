import { YStack } from '@zix/app/ui/core';
import { t } from 'i18next';
import { useAtom } from 'jotai';
import { useRouter } from 'solito/router';

import { authAccountTypeAtom } from '../../atoms';
import { AuthHeader } from '../../components/auth-header/auth-header';
import InlineItemSelect from '../../components/inline-item-select/inline-item-select';

/**
 * Represents the screen for selecting the account type during the registration process.
 * Allows the user to choose between service requestor and service provider account types.
 */
export const SelectAccountTypeScreen: React.FC = () => {
  const router = useRouter();
  const [accountType, setAccountType] = useAtom(authAccountTypeAtom);

  function onRedirectUser(type: string) {
    if (type === 'service_requestor') {
      router.push('/auth/register/create-account');
    }
    if (type === 'service_provider') {
      router.push('/auth/register/user-type');
    }
  }

  return (
    <YStack flex={1}>
      <AuthHeader
        iconName="avatar"
        canGoNext={!!accountType}
        onGoNext={() => accountType && onRedirectUser(accountType)}
        title={t('auth:create_new_account')}
      />

      <YStack space="$4" marginHorizontal="$4" marginTop="$10">
        <InlineItemSelect
          icon="looking_for_service"
          title={t('common:account_types.seek.service_requestor')}
          value="service_requestor"
          selectedValue={accountType}
          onSelect={(value) => {
            setAccountType(value);
            onRedirectUser(value);
          }}
        />
        <InlineItemSelect
          icon="service_provider"
          title={t('common:account_types.seek.service_provider')}
          value="service_provider"
          selectedValue={accountType}
          onSelect={(value) => {
            setAccountType(value);
            onRedirectUser(value);
          }}
        />
      </YStack>
    </YStack>
  );
};

export default SelectAccountTypeScreen;
