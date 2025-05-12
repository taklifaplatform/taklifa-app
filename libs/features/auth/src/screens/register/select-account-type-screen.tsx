import { t } from 'i18next';
import { useRouter } from 'solito/router';
import { YStack } from 'tamagui';

import { useToastController } from '@tamagui/toast';
import { UserService } from '@zix/api';
import { useAuth, useMixpanel } from '@zix/services/auth';
import { FormWrapper } from '@zix/ui/forms';
import { ScreenLayout } from '@zix/ui/layouts';
import { AuthHeader } from '../../components/auth-header/auth-header';
import InlineItemSelect from '../../components/inline-item-select/inline-item-select';

/**
 * Represents the screen for selecting the account type during the registration process.
 * Allows the user to choose between service requestor and service provider account types.
 */
export const SelectAccountTypeScreen: React.FC = () => {
  useMixpanel('Select Account Type Page view')
  const router = useRouter();
  const { requestedAccountType, setRequestedAccountType, user, isLoggedIn, redirectUserToActiveDashboard, refetchUser } = useAuth();
  const toast = useToastController();

  function onRedirectUser(role: string) {
    if (isLoggedIn) {
      if (role === 'company_owner') {
        router.push('/auth/create-company');
      } else if (role === 'solo_driver') {
        router.push('/auth/verify-kyc');
      } else if (role === 'customer') {
        UserService.enableCustomerRole()
          .then(() => {
            UserService.changeActiveRole({
              requestBody: {
                name: 'customer',
              },
            }).then((data) => {
              refetchUser();
              redirectUserToActiveDashboard({
                user: data.data,
              })
            }).catch((error) => {
              toast.show(error?.body?.message || t('common:errors.something_went_wrong'));
            });
          })
          .catch((error) => {
            toast.show(error?.body?.message || t('common:errors.something_went_wrong'));
          });
      }
    } else {
      router.push('/auth/register/create-account');
    }

  }

  return (
    <ScreenLayout>
      <FormWrapper.Body>
        <AuthHeader
          iconName="avatar"
          canGoNext={!!requestedAccountType}
          onGoNext={() =>
            requestedAccountType && onRedirectUser(requestedAccountType)
          }
          title={t('auth:create_new_account')}
        />

        <YStack gap="$4" marginHorizontal="$4" marginTop="$10">
          {!user?.roles?.find((role) => role.name === 'customer') && (
            <InlineItemSelect
              icon="user_type_customer"
              title={t('common:user_types.customer')}
              value="customer"
              selectedValue={requestedAccountType}
              onSelect={(value) => {
                setRequestedAccountType(value);
                onRedirectUser(value);
              }}
            />
          )}
          {!user?.roles?.find((role) => role.name === 'solo_driver') && (
            <InlineItemSelect
              icon="user_type_solo_transporter"
              title={t('common:user_types.individual')}
              value="solo_driver"
              showServiceProvider
              selectedValue={requestedAccountType}
              onSelect={(value) => {
                setRequestedAccountType(value);
                onRedirectUser(value);
              }}
            />
          )}
          <InlineItemSelect
            icon="user_type_company"
            title={t('common:user_types.company')}
            value="company_owner"
            showServiceProvider
            selectedValue={requestedAccountType}
            onSelect={(value) => {
              setRequestedAccountType(value);
              onRedirectUser(value);
            }}
          />
        </YStack>
      </FormWrapper.Body>
    </ScreenLayout>
  );
};

export default SelectAccountTypeScreen;
