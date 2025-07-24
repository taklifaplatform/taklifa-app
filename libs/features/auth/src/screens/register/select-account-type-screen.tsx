import { AUTH_ROLE_TYPE, useAuth, useMixpanel, USER_ROLES } from '@zix/services/auth';
import { FormWrapper } from '@zix/ui/forms';
import { ScreenLayout } from '@zix/ui/layouts';
import { useRouter } from 'solito/router';
import { YStack } from 'tamagui';
import { AuthHeader } from '../../components/auth-header/auth-header';
import InlineItemSelect from '../../components/inline-item-select/inline-item-select';
import SignInLink from '../../components/signin-link/signin-link';

/**
 * Represents the screen for selecting the account type during the registration process.
 * Allows the user to choose between service requestor and service provider account types.
 */
export const SelectAccountTypeScreen: React.FC = () => {
  useMixpanel('Select Account Type Page view')
  const router = useRouter();
  const { user, requestedAccountType, setRequestedAccountType } = useAuth();

  function onRedirectUser(value: AUTH_ROLE_TYPE) {
    if (user?.id) {
      alert(value)
      //
    } else {
      router.push('/auth/register/select-method-register');
    }
  }

  function checkIfUserHasRole(role: AUTH_ROLE_TYPE) {
    return user?.roles?.find((r) => r.name === role) ? true : false;
  }

  return (
    <ScreenLayout>
      <FormWrapper.Body>
        <AuthHeader
          iconName="logo"
          title='مرحبــــا بك فــــي'
        />

        <YStack gap="$4" marginHorizontal="$4" marginTop="$10">
          {
            !checkIfUserHasRole(USER_ROLES.customer) && (
              <InlineItemSelect
                icon="user_type_customer"
                title='عميل تكلفة'
                subTitle='تسجيل مستخدم'
                value={USER_ROLES.customer}
                selectedValue={requestedAccountType}
                onSelect={(value) => {
                  setRequestedAccountType(value);
                  onRedirectUser(value);
                }}
              />
            )
          }
          {
            !checkIfUserHasRole(USER_ROLES.service_provider) && (
              <InlineItemSelect
                icon="user_type_solo_transporter"
                title='تقدم خدمة'
                subTitle='( يمكنك عرض خدماتك في قسم الخدمات )'
                value={USER_ROLES.service_provider}
                selectedValue={requestedAccountType}
                onSelect={(value) => {
                  setRequestedAccountType(value);
                  onRedirectUser(value);
                }}
              />
            )
          }


          <InlineItemSelect
            icon="user_type_company"
            title='تبيع منتج'
            subTitle='يمكنك إنشاء متجرك وعرض منتجاتك للبيع على الخريطة'
            value={USER_ROLES.company_owner}
            selectedValue={requestedAccountType}
            onSelect={(value) => {
              setRequestedAccountType(value);
              onRedirectUser(value);
            }}
          />
        </YStack>
      </FormWrapper.Body>
      <SignInLink />
    </ScreenLayout>
  );
};

export default SelectAccountTypeScreen;
